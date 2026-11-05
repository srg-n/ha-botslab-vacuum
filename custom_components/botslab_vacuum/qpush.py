"""QPush realtime client (Qihoo / Botslab Push Gateway).

Wire protocol (big-endian, length-prefixed):
  dispatcher HTTPS GET -> {ip, port} -> raw TCP
  -> op2 bind (u=deviceId@appId) -> op6 bind-ACK
  -> op17 alias (sa=push_alias)
  -> heartbeat op0 (every 30s) / recv op3 push, ack op4.
"""
from __future__ import annotations

import asyncio
import base64
from collections.abc import Awaitable, Callable
import json
import logging
import re
import struct
import time
from typing import Any
import aiohttp

try:
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    from cryptography.hazmat.primitives import padding
    HAVE_CRYPTOGRAPHY = True
except ImportError:
    HAVE_CRYPTOGRAPHY = False

_LOGGER = logging.getLogger(__name__)

QPUSH_APPID = "gqrwex6nq54m"
QPUSH_DISPATCHER = "https://dp.push.dc.360.cn/v1/list/ip"
QPUSH_PROTO_VERSION = 5
QPUSH_OP_PING = 0
QPUSH_OP_BIND = 2
QPUSH_OP_PUSH = 3
QPUSH_OP_ACK = 4
QPUSH_OP_BIND_ACK = 6
QPUSH_OP_ALIAS = 17
QPUSH_HEARTBEAT = 30
REQUEST_TIMEOUT = 10
_RECONNECT_MIN = 5
_RECONNECT_MAX = 180


def _encode(op: int, header: dict[str, str] | None = None) -> bytes:
    """Encode a QPush binary frame."""
    frame = struct.pack(">hh", QPUSH_PROTO_VERSION, op)
    if op == QPUSH_OP_PING:
        return frame
    hb = "\n".join(f"{k}:{v}" for k, v in (header or {}).items()).encode("utf-8")
    return frame + struct.pack(">H", len(hb)) + hb


def _parse_header(raw: str) -> dict[str, str]:
    """Parse colon-separated header lines."""
    out: dict[str, str] = {}
    for line in raw.split("\n"):
        if ":" in line:
            key, val = line.split(":", 1)
            out[key] = val
    return out


class BotslabQPush:
    """Maintains a persistent QPush TCP connection and delivers push events."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        device_id: str,
        get_alias: Callable[[], str],
        on_push: Callable[[dict[str, Any]], None],
        ensure_session: Callable[[], Awaitable[None]],
    ) -> None:
        self._session = session
        self._device_id = device_id
        self._get_alias = get_alias
        self._on_push = on_push
        self._ensure_session = ensure_session
        self._writer: asyncio.StreamWriter | None = None
        self._closing = False

    async def stop(self) -> None:
        """Stop the client and close the TCP connection."""
        self._closing = True
        self._close_writer()

    def _close_writer(self) -> None:
        if self._writer:
            try:
                self._writer.close()
            except Exception:
                pass
            self._writer = None

    async def run(self) -> None:
        """Background connection loop with exponential backoff reconnect."""
        backoff = _RECONNECT_MIN
        while not self._closing:
            try:
                await self._session_once()
                backoff = _RECONNECT_MIN
            except asyncio.CancelledError:
                break
            except Exception as err:
                _LOGGER.debug("QPush connection error: %s (retry in %ss)", err, backoff)
            finally:
                self._close_writer()

            if self._closing:
                break
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, _RECONNECT_MAX)

    async def _get_server(self) -> tuple[str, int]:
        """Fetch push gateway (IP and port) from the Qihoo dispatcher."""
        params = {
            "appId": QPUSH_APPID,
            "source": QPUSH_APPID,
            "version": "2.5.23",
            "retry": "0",
            "device_id": self._device_id,
        }
        try:
            async with self._session.get(
                QPUSH_DISPATCHER,
                params=params,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise ConnectionError(f"Dispatcher error: {err}") from err

        servers = data.get("data") or []
        if not servers:
            raise ConnectionError("Dispatcher returned no push servers")
        first = servers[0]
        return first["ip"], int(first.get("p") or 443)

    async def _session_once(self) -> None:
        """Single connection lifecycle: connect, bind, alias, listen."""
        await self._ensure_session()
        alias = self._get_alias()
        if not alias:
            raise ConnectionError("No push_alias available yet")

        ip, port = await self._get_server()
        _LOGGER.debug("QPush connecting to %s:%s", ip, port)
        reader, writer = await asyncio.open_connection(ip, port)
        self._writer = writer

        # OP_BIND
        bind_hdr = {
            "u": f"{self._device_id}@{QPUSH_APPID}",
            "ts": str(int(time.time() * 1000)),
            "t": "180",
            "di": "home-assistant",
            "db": "GOOGLE",
            "net": "1",
        }
        writer.write(_encode(QPUSH_OP_BIND, bind_hdr))
        await writer.drain()

        hb_task: asyncio.Task | None = None
        try:
            while not self._closing:
                op, header, body = await self._read_msg(reader)
                if op == QPUSH_OP_BIND_ACK:
                    if header.get("r") != "0":
                        raise ConnectionError(f"QPush bind rejected: {header}")
                    # OP_ALIAS
                    writer.write(_encode(QPUSH_OP_ALIAS, {"sa": alias}))
                    await writer.drain()
                    hb_task = asyncio.create_task(self._heartbeat(writer))
                elif op == QPUSH_OP_ALIAS:
                    _LOGGER.info("QPush connected and successfully bound to Botslab account")
                elif op == QPUSH_OP_PUSH:
                    await self._handle_push(header, body, writer)
        finally:
            if hb_task:
                hb_task.cancel()

    async def _heartbeat(self, writer: asyncio.StreamWriter) -> None:
        """Send periodic ping frames to keep connection alive."""
        while True:
            await asyncio.sleep(QPUSH_HEARTBEAT)
            writer.write(_encode(QPUSH_OP_PING))
            await writer.drain()

    async def _read_msg(
        self, reader: asyncio.StreamReader
    ) -> tuple[int, dict[str, str], bytes]:
        """Read and decode a QPush binary frame."""
        head = await reader.readexactly(4)
        _ver, op = struct.unpack(">hh", head)
        hlen = struct.unpack(">H", await reader.readexactly(2))[0]
        header = _parse_header(
            (await reader.readexactly(hlen)).decode("utf-8", "replace")
        )
        body = b""
        if op == QPUSH_OP_PUSH:
            blen = struct.unpack(">I", await reader.readexactly(4))[0]
            if blen:
                body = await reader.readexactly(blen)
        return op, header, body

    async def _handle_push(
        self, header: dict[str, str], body: bytes, writer: asyncio.StreamWriter
    ) -> None:
        """Parse incoming push payload, notify callback, and acknowledge."""
        text = body.decode("utf-8", "replace")
        _LOGGER.debug("QPush received payload: %s", text)
        try:
            payload = json.loads(text)
        except ValueError:
            payload = {"raw": text}

        try:
            self._on_push(payload)
        except Exception:
            _LOGGER.exception("Error in QPush callback")

        ack = header.get("ack")
        if ack:
            writer.write(_encode(QPUSH_OP_ACK, {"ack": ack}))
            await writer.drain()


# ---------------------------------------------------------------------------
# Legacy Qihoo 360 China Realtime Push Gateway (q.smart.360.cn / 360 S6 / S7)
# ---------------------------------------------------------------------------
CHINA_PUSH_HOST = "47.254.151.104"
CHINA_PUSH_PORT = 443
CHINA_PUSH_PRODUCT = "60009"
CHINA_PUSH_HEARTBEAT = 25


def decode_china_push(data_str: str, push_key: str) -> tuple[str, dict[str, Any]] | None:
    """Decode and decrypt a 360 China push frame payload (AES-128-CBC)."""
    if not data_str or not push_key:
        return None
    match = re.search(r'"data"\s*:\s*"([^"]*)"', data_str)
    if not match:
        return None
    raw_b64 = match.group(1)
    if not raw_b64:
        return None
    key_iv = push_key.encode("utf-8")[:16]
    if len(key_iv) != 16:
        return None
    try:
        cipher_bytes = base64.b64decode(raw_b64)
        if HAVE_CRYPTOGRAPHY:
            decipher = Cipher(algorithms.AES(key_iv), modes.CBC(key_iv)).decryptor()
            padded = decipher.update(cipher_bytes) + decipher.finalize()
            unpadder = padding.PKCS7(128).unpadder()
            plain = unpadder.update(padded) + unpadder.finalize()
        else:
            return None
        frame = json.loads(plain.decode("utf-8"))
        if not isinstance(frame, dict) or not frame.get("sn"):
            return None
        body = frame.get("data")
        if isinstance(body, str):
            body = json.loads(body)
        status = (
            body.get("data")
            if isinstance(body, dict) and body.get("data") is not None
            else body
        )
        if isinstance(status, dict):
            return str(frame["sn"]), status
    except Exception as err:
        _LOGGER.debug("Could not decrypt or parse China push frame: %s", err)
    return None


class BotslabChinaQPush:
    """Maintains a persistent TCP push connection to Qihoo 360 China push gateway."""

    def __init__(
        self,
        get_sid: Callable[[], str | None],
        get_push_key: Callable[[], str | None],
        on_push: Callable[[dict[str, Any]], None],
        ensure_session: Callable[[], Awaitable[None]],
        host: str = CHINA_PUSH_HOST,
        port: int = CHINA_PUSH_PORT,
    ) -> None:
        self._get_sid = get_sid
        self._get_push_key = get_push_key
        self._on_push = on_push
        self._ensure_session = ensure_session
        self._host = host
        self._port = port
        self._writer: asyncio.StreamWriter | None = None
        self._closing = False

    async def stop(self) -> None:
        """Stop the client and close the TCP connection."""
        self._closing = True
        self._close_writer()

    def _close_writer(self) -> None:
        if self._writer:
            try:
                self._writer.close()
            except Exception:
                pass
            self._writer = None

    async def run(self) -> None:
        """Background connection loop with exponential backoff reconnect."""
        backoff = _RECONNECT_MIN
        while not self._closing:
            try:
                await self._session_once()
                backoff = _RECONNECT_MIN
            except asyncio.CancelledError:
                break
            except Exception as err:
                _LOGGER.debug("China QPush connection error: %s (retry in %ss)", err, backoff)
            finally:
                self._close_writer()

            if self._closing:
                break
            await asyncio.sleep(backoff)
            backoff = min(backoff * 2, _RECONNECT_MAX)

    async def _session_once(self) -> None:
        """Single connection lifecycle: connect, handshake, keepalive, dispatch."""
        await self._ensure_session()
        sid = self._get_sid()
        push_key = self._get_push_key()
        if not sid or not push_key:
            _LOGGER.debug("China QPush waiting for active sid and pushKey")
            await asyncio.sleep(5)
            return

        _LOGGER.debug("China QPush connecting to %s:%s", self._host, self._port)
        reader, writer = await asyncio.open_connection(self._host, self._port)
        self._writer = writer

        # Handshake: \x00\x05\x00\x02 + length + cv:1.7\nt:30\nu:{sid}@60009\nts:{timestamp}
        ts = str(int(time.time() * 1000))
        handshake_text = f"cv:1.7\nt:30\nu:{sid}@{CHINA_PUSH_PRODUCT}\nts:{ts}".encode("ascii")
        handshake = struct.pack(">hhH", 5, 2, len(handshake_text)) + handshake_text
        writer.write(handshake)
        await writer.drain()

        hb_task = asyncio.create_task(self._heartbeat(writer))
        try:
            buffer = bytearray()
            while not self._closing:
                chunk = await reader.read(65536)
                if not chunk:
                    break
                buffer.extend(chunk)
                self._process_buffer(buffer, writer, push_key)
        finally:
            hb_task.cancel()

    async def _heartbeat(self, writer: asyncio.StreamWriter) -> None:
        """Send periodic ping frames to keep connection alive."""
        while True:
            await asyncio.sleep(CHINA_PUSH_HEARTBEAT)
            writer.write(struct.pack(">hh", 5, 0))
            await writer.drain()

    def _process_buffer(
        self, buffer: bytearray, writer: asyncio.StreamWriter, push_key: str
    ) -> None:
        """Extract complete push frames from buffer and dispatch state updates."""
        text = buffer.decode("latin1", "replace")
        last_brace = text.rfind("}")
        while last_brace >= 0:
            first_brace = text.find("{")
            if first_brace < 0 or first_brace > last_brace:
                del buffer[: last_brace + 1]
                return
            frame = buffer[: last_brace + 1]
            del buffer[: last_brace + 1]

            # Acknowledge: copy header up to nul (0x00) and set byte 3 to 4 (QPUSH_OP_ACK)
            nul = frame.find(0x00, 5)
            if nul > 0:
                ack = bytearray(frame[:nul])
                if len(ack) >= 4:
                    ack[3] = 4
                    try:
                        writer.write(bytes(ack))
                    except Exception:
                        pass

            decoded = decode_china_push(frame.decode("latin1", "replace"), push_key)
            if decoded:
                sn, status = decoded
                try:
                    self._on_push({"sn": sn, "status": status, "is_legacy_360": True})
                except Exception:
                    _LOGGER.exception("Error in China QPush on_push callback")

            text = buffer.decode("latin1", "replace")
            last_brace = text.rfind("}")

