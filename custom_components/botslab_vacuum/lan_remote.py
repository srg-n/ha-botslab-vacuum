"""Direct LAN UDP Remote Control for Botslab / 360 Robot Vacuums.

Modern Botslab / 360 LiDAR robots (e.g. S10, S8, P7 platform) do not support
manual driving over cloud TSL RPCs. Instead, directional steering is handled
directly over the local Wi-Fi network using UDP datagrams on port 21020.
"""
from __future__ import annotations

import asyncio
import json
import logging
import socket
from typing import Any

_LOGGER = logging.getLogger(__name__)

LAN_REMOTE_PORT = 21020
INFO_TYPE_REMOTE = 21020
CTRL_CODE_MOVE = 3013
CTRL_CODE_STOP = 4000

# Direction mappings
# 0: Stop (ctrlCode 4000)
# 1: Forward (ctrlCode 3013, direction 1)
# 2: Backward (ctrlCode 3013, direction 2)
# 3: Turn Left (ctrlCode 3013, direction 3)
# 4: Turn Right (ctrlCode 3013, direction 4)
DIR_MAP: dict[str | int, int] = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "stop": 0,
    "pause": 0,
    "forward": 1,
    "fwd": 1,
    "up": 1,
    "backward": 2,
    "back": 2,
    "down": 2,
    "left": 3,
    "turn_left": 3,
    "right": 4,
    "turn_right": 4,
}


class BotslabLanRemoteControl:
    """Manages direct LAN UDP manual steering for Botslab robot vacuums."""

    _pack_id: int = 1000

    @classmethod
    def _next_pack_id(cls) -> int:
        cls._pack_id = (cls._pack_id + 1) % 90000 + 1000
        return cls._pack_id

    @classmethod
    def build_payload(cls, direction: int | str, speed: int = 250) -> dict[str, Any]:
        """Construct the UDP JSON payload for the given direction and speed.

        Args:
            direction: 0=Stop, 1=Forward, 2=Backward, 3=Left, 4=Right (or string equivalents).
            speed: Step duration/speed value (default 250).

        Returns:
            Dictionary matching the robot's expected LAN UDP protocol.
        """
        dir_code = DIR_MAP.get(direction, 0)
        pack_id = cls._next_pack_id()

        if dir_code == 0:
            return {
                "infoType": INFO_TYPE_REMOTE,
                "data": {
                    "ctrlCode": CTRL_CODE_STOP,
                },
                "packId": pack_id,
            }

        return {
            "infoType": INFO_TYPE_REMOTE,
            "data": {
                "ctrlCode": CTRL_CODE_MOVE,
                "ctrlParams": {
                    "speedV": int(speed),
                    "direction": dir_code,
                },
            },
            "packId": pack_id,
        }

    @classmethod
    def send_datagram(
        cls,
        payload: dict[str, Any],
        target_ip: str | None = None,
        port: int = LAN_REMOTE_PORT,
        broadcast_fallback: bool = True,
    ) -> None:
        """Send UDP datagram synchronously to the target IP and/or broadcast address.

        Args:
            payload: JSON payload to transmit.
            target_ip: Specific local IP of the robot, if known.
            port: Target UDP port (default 21020).
            broadcast_fallback: Whether to also broadcast to 255.255.255.255.
        """
        raw_bytes = json.dumps(payload).encode("utf-8")
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        sock.settimeout(1.0)

        targets: list[str] = []
        if target_ip and str(target_ip).strip() not in ("0.0.0.0", "", "-", "None"):
            targets.append(str(target_ip).strip())
        if broadcast_fallback or not targets:
            targets.append("255.255.255.255")

        try:
            for ip in set(targets):
                try:
                    sock.sendto(raw_bytes, (ip, port))
                    _LOGGER.debug("Sent Botslab LAN remote datagram to %s:%d: %s", ip, port, payload)
                except Exception as err:
                    _LOGGER.warning("Failed sending Botslab LAN remote datagram to %s:%d: %s", ip, port, err)
        finally:
            sock.close()

    @classmethod
    async def async_send_drive(
        cls,
        direction: int | str,
        speed: int = 250,
        target_ip: str | None = None,
        port: int = LAN_REMOTE_PORT,
    ) -> dict[str, Any]:
        """Asynchronously build and transmit driving datagrams without blocking the event loop."""
        payload = cls.build_payload(direction, speed)
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(
            None,
            cls.send_datagram,
            payload,
            target_ip,
            port,
            True,
        )
        return payload
