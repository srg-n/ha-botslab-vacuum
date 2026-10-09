"""QPush realtime client (Qihoo / Botslab Push Gateway).

Wire protocol (big-endian, length-prefixed):
  dispatcher HTTPS GET -> {ip, port} -> raw TCP
  -> op2 bind (u=deviceId@appId) -> op6 bind-ACK
  -> op17 alias (sa=push_alias)
  -> heartbeat op0 (every 30s) / recv op3 push, ack op4.
"""
from __future__ import annotations

import asyncio
from collections.abc import Awaitable, Callable
import json
import logging
import struct
import time
from typing import Any
import aiohttp

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
