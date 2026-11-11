"""Base API client for Botslab / Qihoo 360 robot vacuums."""
from __future__ import annotations

import asyncio
import base64
import hashlib
import json
import logging
import math
import random
import time
from typing import Any
import aiohttp

from .const import (
    APP_KEY,
    APP_SECRET,
    APP_VER,
    COOKIE_Q_360,
    LEGACY_360_USER_AGENT,
    REGIONS,
    STATUS_CLEANING,
    STATUS_DOCKED,
    STATUS_ERROR,
    STATUS_IDLE,
    STATUS_PAUSED,
    STATUS_RETURNING,
    USER_AGENT,
)
from .quc_login import derive_qid

_LOGGER = logging.getLogger(__name__)

_ROOM_COLORS: tuple[tuple[int, int, int], ...] = (
    (38, 62, 104),
    (44, 78, 92),
    (62, 58, 96),
    (46, 88, 74),
    (96, 66, 52),
    (58, 72, 116),
    (88, 60, 84),
)


def _room_color(index: int) -> tuple[int, int, int]:
    """Return a stable fill colour for the nth room."""
    return _ROOM_COLORS[index % len(_ROOM_COLORS)]


def working_status_to_state(status_code: Any) -> str:
    """Map Botslab / 360 working status code to standard status string."""
    code_str = str(status_code).strip().lower()
    # Cleaning states
    # TSL numeric: 1: DefaultClean, 2: CleanInAreas, 3: CleanInZones, 10: InRemoteControl
    if code_str in (
        "1",
        "2",
        "3",
        "10",
        "clean",
        "cleaning",
        "sweep",
        "sweeping",
        "smartclean",
        "reappointclean",
        "aroundclean",
        "spotclean",
        "totalclean",
        "mop",
        "defaultclean",
        "cleaninareas",
        "cleaninzones",
        "inremotecontrol",
    ):
        return STATUS_CLEANING

    # Docked states
    # TSL numeric: 6: Charging, 7: ChargeDone, 11: InDustCollecting
    if code_str in (
        "6",
        "7",
        "11",
        "charge",
        "charging",
        "docked",
        "dock",
        "fullcharge",
        "chargedone",
        "industcollecting",
    ):
        return STATUS_DOCKED

    # Paused states
    # TSL numeric: 4: Paused
    if code_str in ("4", "pause", "paused"):
        return STATUS_PAUSED

    # Returning states
    # TSL numeric: 5: GotoChargeBase
    if code_str in (
        "5",
        "goback",
        "go_charging",
        "returning",
        "chargeback",
        "backcharge",
        "return",
        "gocharge",
        "gotochargebase",
    ):
        return STATUS_RETURNING

    # Error states
    # TSL numeric: 9: InTrouble
    if code_str in ("9", "error", "fault", "warn", "introuble"):
        return STATUS_ERROR

    # Idle states
    # TSL numeric: 0: StandBy, 8: Dormant
    if code_str in ("0", "8", "idle", "standby", "dormant"):
        return STATUS_IDLE

    return STATUS_IDLE


def _coerce_battery_level(val: Any) -> int | None:
    """Safely coerce raw battery value (int, float, or string like '82' or '82%') to integer 0-100."""
    if val is None or isinstance(val, bool):
        return None
    if isinstance(val, (int, float)):
        try:
            if isinstance(val, float) and (math.isnan(val) or math.isinf(val)):
                return None
            b_val = int(val)
            return b_val if 0 <= b_val <= 100 else None
        except (ValueError, OverflowError):
            return None
    if isinstance(val, str):
        cleaned = val.strip().rstrip("%").strip()
        if not cleaned:
            return None
        try:
            b_val = int(cleaned)
            return b_val if 0 <= b_val <= 100 else None
        except (ValueError, TypeError):
            try:
                fb_val = float(cleaned)
                if not math.isnan(fb_val) and not math.isinf(fb_val):
                    b_val = int(fb_val)
                    return b_val if 0 <= b_val <= 100 else None
            except (ValueError, TypeError):
                return None
    return None


class BotslabBaseApiClient:
    """Shared HTTP session, query signing, and credentials base client."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        region: str,
        m2: str,
        q: str,
        t: str,
        qid: str | None = None,
    ) -> None:
        self.session = session
        self.region = region
        self.m2 = m2
        self.q = q
        self.t = t
        self.qid: str | None = qid or derive_qid(q)
        self.sid: str | None = None
        self.push_alias: str = ""
        self.push_key: str | None = None

        reg_info = REGIONS.get(region, REGIONS["eu1"])
        self.base_url = f"https://{reg_info['api']}"
        self.is_legacy_360: bool = bool(reg_info.get("legacy", False))
        self._auth_lock: asyncio.Lock = asyncio.Lock()

        # Shared caching dictionaries
        self._cached_upload_id: str = ""
        self._cached_map_bytes: bytes | None = None
        self._cached_robot_pose: list[float] | None = None
        self._cached_is_active: bool = False
        self._cached_rooms: dict[str, Any] = {}
        self._cached_map_info: dict[str, Any] = {}
        self.cached_s3_signs: dict[str, str] = {}
        self._firmware_cache: dict[str, str] = {}

        # Legacy 360 caches
        self._legacy_cached_status: dict[str, str] = {}
        self._legacy_live_status: dict[str, dict[str, Any]] = {}
        self._legacy_consumables: dict[str, dict[str, Any]] = {}
        self._legacy_device_cache: dict[str, dict[str, Any]] = {}

    def _sign(self) -> tuple[str, str, str]:
        """Generate timestamp, nonce, and MD5 signature for API requests."""
        ts = str(int(time.time()))
        nonce = "".join(random.choices("0123456789abcdef", k=32))
        raw = f"{APP_KEY}{self.m2}{ts}{nonce}{APP_SECRET}".encode("utf-8")
        sig = hashlib.md5(raw).hexdigest()
        return ts, nonce, sig

    def _base_query(self, ts: str, nonce: str, sig: str) -> dict[str, str]:
        """Return standard base query dictionary attached to Botslab API requests."""
        return {
            "appkey": APP_KEY,
            "m2": self.m2,
            "sign": sig,
            "sign_ts": ts,
            "sign_no": nonce,
            "ts": ts,
            "no": nonce,
            "appver": APP_VER,
            "app_ver": APP_VER,
            "os": "android",
            "ci_model": "Pixel 7",
            "ci_brand": "Google",
            "ci_net": "wifi",
            "ci_osver": "33",
            "appch": "botslabadr",
            "ci_lang": "en-US",
            "ci_tz": "UTC+3",
            "app_type_id": "1",
            "ci_cy": "DE",
            "appflag": "online",
        }

    def _headers(self, content_type: str | None = None) -> dict[str, str]:
        """Build request headers for legacy Qihoo 360 or modern Botslab API."""
        if self.is_legacy_360:
            q_val = self.q if self.q else COOKIE_Q_360
            cookie_parts = [f"q={q_val}"]
            if self.t:
                cookie_parts.append(f"t={self.t}")
            if self.qid:
                cookie_parts.append(f"qid={self.qid}")
            if self.sid:
                cookie_parts.append(f"sid={self.sid}")
            cookie_str = "; ".join(cookie_parts)
            hdrs: dict[str, str] = {
                "User-Agent": LEGACY_360_USER_AGENT,
                "Accept": "*/*",
                "Cookie": cookie_str,
            }
            if content_type:
                hdrs["Content-Type"] = content_type
            return hdrs

        hdrs = {
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
        }
        if self.q and self.t:
            payload: dict[str, str] = {"Q": self.q, "T": self.t}
            if self.sid:
                payload["sid"] = self.sid
            blob = base64.b64encode(
                json.dumps(payload, separators=(",", ":")).encode("utf-8")
            ).decode("utf-8")
            hdrs["Authorization"] = f"jws {blob}"

        cookies: list[str] = []
        if self.sid:
            cookies.append(f"sid={self.sid}")
        if self.q:
            cookies.append(f"q={self.q}")
        if self.t:
            cookies.append(f"t={self.t}")
        if cookies:
            hdrs["Cookie"] = "; ".join(cookies)

        if content_type:
            hdrs["Content-Type"] = content_type
        return hdrs
