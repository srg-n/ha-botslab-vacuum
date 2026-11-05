"""Botslab Vacuum API client for Home Assistant."""
from __future__ import annotations

import asyncio
import base64
import copy
import hashlib
import hmac
import json
import logging
import random
import time
import urllib.parse
import uuid
from typing import Any
import aiohttp

from .const import (
    APP_KEY,
    APP_SECRET,
    APP_VER,
    AUTH_EXPIRED_ERRNOS_360,
    BATTERY_KEYS_360,
    COOKIE_Q_360,
    EP_360_CMD_SEND,
    EP_360_DEV_LIST,
    EP_360_LOGIN,
    EP_360_RECORD_GET_ONE,
    EP_360_RECORD_LIST,
    FAN_SPEED_TO_MODE,
    FAN_SPEEDS_HA_TO_360,
    INFO_360_CONSUMABLES,
    INFO_360_FAN_SPEED,
    INFO_360_LOCATE,
    INFO_360_PAUSE,
    INFO_360_RESET_CONSUMABLE,
    INFO_360_RETURN,
    INFO_360_SETTINGS,
    INFO_360_START,
    INFO_360_STATUS,
    LEGACY_360_MINT_UA,
    LEGACY_360_USER_AGENT,
    MOP_MODE_TO_INT,
    REGIONS,
    REQUEST_TIMEOUT,
    STATUS_CLEANING,
    STATUS_DOCKED,
    STATUS_ERROR,
    STATUS_IDLE,
    STATUS_PAUSED,
    STATUS_RETURNING,
    USER_AGENT,
    WATER_LEVEL_TO_INT,
)
from .exceptions import BotslabCommandError
from .map_util import (
    decompress_lz4_block,
    render_map_advanced,
    room_cover_rects,
)
from .models import BotslabMapInfo, BotslabRoom
from .quc_login import BotslabApiError, BotslabAuthError

_LOGGER = logging.getLogger(__name__)

# Distinct, muted fills so adjacent rooms stay readable on the dark map.
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
    code_str = str(status_code).lower()
    if code_str in (
        "clean",
        "cleaning",
        "sweep",
        "sweeping",
        "smartclean",
        "reappointclean",
        "aroundclean",
        "spotclean",
        "totalclean",
        "1",
        "2",
    ):
        return STATUS_CLEANING
    if code_str in ("charge", "charging", "docked", "dock", "fullcharge", "5", "6"):
        return STATUS_DOCKED
    if code_str in ("pause", "paused", "3"):
        return STATUS_PAUSED
    if code_str in (
        "goback",
        "go_charging",
        "returning",
        "chargeback",
        "return",
        "gocharge",
        "4",
    ):
        return STATUS_RETURNING
    if code_str in ("error", "fault", "warn"):
        return STATUS_ERROR
    return STATUS_IDLE


class BotslabVacuumApi:
    """Async API client for Botslab IoT Cloud."""

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
        self.sid: str | None = None
        self.push_alias: str = ""
        self.qid: str | None = qid
        self._legacy_cached_status: dict[str, str] = {}

        reg_info = REGIONS.get(region, REGIONS["eu1"])
        self.base_url = f"https://{reg_info['api']}"
        self.is_legacy_360: bool = bool(reg_info.get("legacy", False))
        self.push_key: str | None = None
        self._legacy_device_cache: dict[str, dict[str, Any]] = {}
        self.cached_s3_signs: dict[str, str] = {}
        self._cached_upload_id: str = ""
        self._cached_map_bytes: bytes | None = None
        self._cached_rooms: dict[str, list[BotslabRoom]] = {}
        self._cached_map_info: dict[str, BotslabMapInfo | None] = {}

    def _sign(self) -> tuple[str, str, str]:
        """Generate timestamp, nonce, and MD5 signature for API requests."""
        ts = str(int(time.time()))
        nonce = "".join(random.choices("0123456789abcdef", k=32))
        raw = f"{APP_KEY}{self.m2}{ts}{nonce}{APP_SECRET}".encode("utf-8")
        sig = hashlib.md5(raw).hexdigest()
        return ts, nonce, sig

    def _base_query(self, ts: str, nonce: str, sig: str) -> dict[str, str]:
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
        # Attach jws Authorization header (standard across all modern Botslab services)
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

    def _check_360_errno(self, result: dict[str, Any], label: str) -> None:
        """Check response status code from 360 cloud and map auth/command errors."""
        try:
            errno = int(result.get("errno", 0))
        except (ValueError, TypeError):
            errno = -1
        if errno == 0:
            return
        errmsg = result.get("errmsg") or result.get("msg") or "unknown error"
        if errno in AUTH_EXPIRED_ERRNOS_360:
            raise BotslabAuthError(
                f"Legacy 360 {label}: session expired or invalid (errno {errno}): {errmsg}"
            )
        raise BotslabCommandError(
            f"Legacy 360 {label}: rejected (errno {errno}): {errmsg}"
        )

    async def _legacy_360_login(self) -> dict[str, Any]:
        """Mint session id (sid) and pushKey for legacy Qihoo 360 cloud servers."""
        url = f"{self.base_url}{EP_360_LOGIN}"
        client_info = {
            "release": "appstore",
            "brand": "iPhone",
            "model": "iPhone10,5",
            "notifyId": "aa0ad645269de676a5ee6a728ba13b777ed3d4aa4d0e08a578097fbe78768b02",
            "lang": "en_US",
            "imei": "f3bc82b802bd91a51d0dcc6499efeba3",
        }
        body = {
            "clientInfo": json.dumps(client_info, separators=(",", ":")),
            "lang": "en_US",
            "phoneNum": "",
            "taskid": str(uuid.uuid4()),
        }
        cookie_parts = [f"q={self.q}", f"t={self.t}"]
        if self.qid:
            cookie_parts.append(f"qid={self.qid}")
        headers = {
            "Cookie": "; ".join(cookie_parts),
            "User-Agent": LEGACY_360_MINT_UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*",
        }
        try:
            async with self.session.post(
                url,
                data=body,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"Legacy 360 login failed: {err}") from err

        self._check_360_errno(data, "login")

        res = data.get("data") or {}
        sid = res.get("sid")
        if not sid:
            raise BotslabAuthError("Legacy 360 login response missing sid")

        self.sid = sid
        self.push_key = res.get("pushKey")
        self.push_alias = sid
        _LOGGER.debug(
            "Legacy 360 login successful. sid: %s..., pushKey: %s...",
            sid[:8],
            (self.push_key or "")[:8],
        )
        return res

    async def _legacy_360_get_devices(self) -> list[dict[str, Any]]:
        """Fetch device list from legacy Qihoo 360 cloud."""
        url = f"{self.base_url}{EP_360_DEV_LIST}"
        body = {
            "countryId": "US",
            "devType": "3",
            "from": "mpc_ios",
            "lang": "en_US",
            "taskid": str(uuid.uuid4()),
        }
        try:
            async with self.session.post(
                url,
                data=body,
                headers=self._headers("application/x-www-form-urlencoded"),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"Legacy 360 get_devices failed: {err}") from err

        self._check_360_errno(data, "GetList")

        data_dict = data.get("data") or {}
        raw_list = (
            data_dict.get("list")
            or data_dict.get("devList")
            or data_dict.get("devices")
            or data_dict.get("cleanDevList")
            or []
        )
        if isinstance(data_dict, list):
            raw_list = data_dict

        normalized_devices: list[dict[str, Any]] = []
        for item in raw_list:
            if not isinstance(item, dict):
                continue
            sn = str(item.get("sn") or item.get("device_name") or item.get("devSn") or "").strip()
            if not sn:
                continue
            self._legacy_device_cache[sn] = item
            title = str(item.get("title") or item.get("name") or f"360 Vacuum {sn[-4:]}").strip()
            model = str(item.get("hardware") or item.get("subType") or "Qihoo 360 Vacuum").strip()
            normalized_devices.append(
                {
                    "device_name": sn,
                    "sn": sn,
                    "product_key": str(item.get("subType") or item.get("hardware") or "legacy_360"),
                    "name": title,
                    "device_title": title,
                    "model": model,
                    "category_key": "clean",
                    "online": bool(item.get("online", 1)),
                    "status": item.get("status", 1),
                    "raw_360": item,
                }
            )
        return normalized_devices

    async def send_legacy_360_cmd(
        self, sn: str, info_type: str, data: Any = ""
    ) -> dict[str, Any]:
        """Send command to legacy Qihoo 360 vacuum cloud (q.smart.360.cn)."""
        url = f"{self.base_url}{EP_360_CMD_SEND}"
        if isinstance(data, (dict, list)):
            data_str = json.dumps(data, separators=(",", ":"))
        else:
            data_str = str(data)

        body = {
            "countryId": "US",
            "data": data_str,
            "devType": "3",
            "from": "mpc_ios",
            "infoType": str(info_type),
            "lang": "en_US",
            "sn": sn,
            "taskid": str(uuid.uuid4()),
        }
        try:
            async with self.session.post(
                url,
                data=body,
                headers=self._headers("application/x-www-form-urlencoded"),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                res = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"Legacy 360 cmd {info_type} network failed: {err}") from err

        self._check_360_errno(res, f"cmd/{info_type}")
        return res

    async def get_latest_clean_record(self, sn: str) -> dict[str, Any] | None:
        """Fetch latest clean record map and metrics from legacy 360 cloud."""
        async def _post(path: str, payload: dict[str, Any]) -> dict[str, Any]:
            url = f"{self.base_url}{path}"
            body = {
                "sn": sn,
                "devType": "3",
                "from": "mpc_and",
                "taskid": str(uuid.uuid4()),
                "appVer": "11.0.0",
                "lang": "de_DE",
                **payload,
            }
            try:
                async with self.session.post(
                    url,
                    headers=self._headers("application/x-www-form-urlencoded"),
                    data=body,
                    timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
                ) as resp:
                    result = await resp.json(content_type=None)
            except Exception as err:
                raise BotslabApiError(f"Legacy 360 record error ({path}): {err}") from err
            self._check_360_errno(result, path)
            return result.get("data") or {}

        try:
            listing = await _post(EP_360_RECORD_LIST, {"lastId": "", "pageSize": "5"})
            records = listing.get("list") or listing.get("records") or []
            for item in records:
                clean_id = item.get("cleanId")
                if not clean_id:
                    continue
                record = await _post(EP_360_RECORD_GET_ONE, {"cleanId": clean_id})
                rec = record.get("record") or record
                if rec.get("map") and rec.get("width") and rec.get("height"):
                    return rec
        except Exception as err:
            _LOGGER.debug("Legacy 360 latest clean record fetch failed: %s", err)
        return None

    async def _legacy_360_get_properties(
        self, sn: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch and synthesize telemetry for legacy 360 robot."""
        raw_dev = self._legacy_device_cache.get(sn, {})
        props: dict[str, Any] = {
            "WorkingStatus": raw_dev.get("status", 1),
            "BatteryLevel": raw_dev.get("battery", 100),
            "SuctionPowLevel": raw_dev.get("fan_speed", 2),
            "TotalCleaningArea": raw_dev.get("total_area", 0.0),
            "TotalCleaningTime": raw_dev.get("total_time", 0),
            "TasksTotalCount": raw_dev.get("tasks_count", 0),
            "ErrorCode": raw_dev.get("error_code", 0),
        }

        # Check raw device for battery keys
        for bkey in BATTERY_KEYS_360:
            if bkey in raw_dev and raw_dev[bkey] is not None:
                props["BatteryLevel"] = raw_dev[bkey]
                break

        # Check raw device for fan speed
        if "workNoisy" in raw_dev:
            props["workNoisy"] = raw_dev["workNoisy"]

        # Check raw device for volume
        if "vol" in raw_dev and isinstance(raw_dev["vol"], (int, float)):
            props["VolumeLevel"] = int(raw_dev["vol"]) * 10

        # Trigger status poll on legacy 360 cloud (infoType 20001)
        try:
            res = await self.send_legacy_360_cmd(sn, INFO_360_STATUS, "")
            cmd_data = res.get("data")
            if isinstance(cmd_data, dict):
                for bkey in BATTERY_KEYS_360:
                    if bkey in cmd_data and cmd_data[bkey] is not None:
                        props["BatteryLevel"] = cmd_data[bkey]
                        break
                for skey in ("mode", "workMode", "runStatus", "cleanMode", "status"):
                    if skey in cmd_data and cmd_data[skey] is not None:
                        props["WorkingStatus"] = cmd_data[skey]
                        props[skey] = cmd_data[skey]
                        break
                if "workNoisy" in cmd_data:
                    props["workNoisy"] = cmd_data["workNoisy"]
                if "vol" in cmd_data and isinstance(cmd_data["vol"], (int, float)):
                    props["VolumeLevel"] = int(cmd_data["vol"]) * 10
                if "clean_time" in cmd_data:
                    props["TEST_CleaningTime"] = cmd_data["clean_time"]
                if "clean_area" in cmd_data:
                    props["CleaningArea"] = cmd_data["clean_area"]
        except BotslabAuthError:
            raise
        except Exception as err:
            _LOGGER.debug("Legacy 360 status poll (20001) error: %s", err)

        # Trigger consumables poll (infoType 21015)
        try:
            res_c = await self.send_legacy_360_cmd(sn, INFO_360_CONSUMABLES, "")
            c_data = res_c.get("data")
            if isinstance(c_data, dict):
                if "filter" in c_data:
                    props["FilterLifeTime"] = c_data["filter"]
                if "main_brush" in c_data:
                    props["RollBrushLifeTime"] = c_data["main_brush"]
                if "side_brush" in c_data:
                    props["EdgeBrushLifeTime"] = c_data["side_brush"]
        except BotslabAuthError:
            raise
        except Exception:
            pass

        # Update cached status for smart resume/pause
        st = working_status_to_state(props["WorkingStatus"])
        self._legacy_cached_status[sn] = st

        # Read latest clean record for area, time and map info
        try:
            record = await self.get_latest_clean_record(sn)
            if record:
                if "cleanTime" in record or "clean_time" in record:
                    props["TEST_CleaningTime"] = record.get("cleanTime") or record.get("clean_time")
                if "cleanArea" in record or "clean_area" in record:
                    props["CleaningArea"] = record.get("cleanArea") or record.get("clean_area")
                if "totalArea" in record:
                    props["TotalCleaningArea"] = record.get("totalArea")
                if "totalTime" in record:
                    props["TotalCleaningTime"] = record.get("totalTime")
        except BotslabAuthError:
            raise
        except Exception as err:
            _LOGGER.debug("Legacy 360 clean record poll error: %s", err)

        return props, {}

    async def app_login(self) -> dict[str, Any]:
        """Perform app login to exchange QUC cookies for sid and push_alias."""
        if self.is_legacy_360:
            return await self._legacy_360_login()

        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/app/login"
        params = self._base_query(ts, nonce, sig)
        headers = self._headers("application/x-www-form-urlencoded")

        try:
            async with self.session.post(
                url,
                params=params,
                headers=headers,
                data={"m2": self.m2},
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"app_login network failed: {err}") from err

        code = data.get("code")
        try:
            code_int = int(code) if code is not None else -1
        except (ValueError, TypeError):
            code_int = -1
        if code_int != 0:
            raise BotslabAuthError(f"app_login failed code {code}: {data.get('message') or data.get('msg')}")

        result = data.get("data") or data.get("result") or {}
        sid = result.get("sid") or result.get("home_sid")
        if not sid:
            raise BotslabAuthError("app_login succeeded but sid was missing in response")

        self.sid = sid
        self.push_alias = result.get("push_alias") or ""
        self.qid = str(result.get("qid") or "")
        _LOGGER.debug("app_login successful. sid: %s..., push_alias: %s", sid[:8], self.push_alias)
        return result

    async def get_devices(self) -> list[dict[str, Any]]:
        """Fetch all user devices from IoT Device List."""
        if self.is_legacy_360:
            return await self._legacy_360_get_devices()

        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/list"
        params = self._base_query(ts, nonce, sig)

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_devices failed: {err}") from err

        code = data.get("code")
        if code != 0:
            raise BotslabApiError(f"get_devices code {code}: {data.get('message')}")

        _LOGGER.debug("get_devices raw response from %s: %s", url, data)

        res = (
            data.get("data")
            or data.get("result")
            or data.get("list")
            or data.get("devices")
            or []
        )
        if isinstance(res, dict):
            raw_list = (
                res.get("list")
                or res.get("devices")
                or res.get("device_list")
                or res.get("devList")
                or res.get("bind_list")
                or res.get("cleanDevList")
                or []
            )
            return raw_list if isinstance(raw_list, list) else []
        return res if isinstance(res, list) else []

    async def get_desired_property(self, sn: str, product_key: str) -> dict[str, Any]:
        """Fetch properties for a specific device."""
        props, _ = await self.get_property_extended(sn, product_key)
        return props

    async def get_property_extended(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch extended properties including signed OSS map URLs and all telemetry."""
        if self.is_legacy_360:
            return await self._legacy_360_get_properties(sn)

        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/get_property"
        params = self._base_query(ts, nonce, sig)
        params.update({"product_key": product_key, "device_name": sn, "extend": "1"})

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_property failed: {err}") from err

        code = data.get("code")
        if code in (100003, 102008, 102003, 1002, 1003, 401):
            raise BotslabAuthError(f"Auth expired: code {code}")
        if code != 0:
            # Fallback to get_desired_property if get_property is rejected
            return await self._get_desired_property_fallback(sn, product_key)

        inner = data.get("data") or data.get("result") or {}
        signs = inner.get("extend", {}).get("s3_signs", {})
        if signs:
            self.cached_s3_signs.update(signs)

        result_raw = inner.get("result")
        props: dict[str, Any] = {}
        if isinstance(result_raw, str):
            try:
                props = json.loads(result_raw)
            except ValueError:
                props = {}
        elif isinstance(result_raw, dict):
            props = result_raw

        return props, signs

    async def _get_desired_property_fallback(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fallback property fetcher."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/get_desired_property"
        params = self._base_query(ts, nonce, sig)
        params.update({"product_key": product_key, "device_name": sn})

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_desired_property fallback failed: {err}") from err

        inner = data.get("data") or data.get("result") or {}
        signs = inner.get("s3_signs") or {}
        if signs:
            self.cached_s3_signs.update(signs)

        props: dict[str, Any] = {}
        for item in inner.get("properties") or []:
            if isinstance(item, dict) and "identifier" in item:
                props[item["identifier"]] = item.get("value")
        return props, signs

    async def get_upload_config(self, sn: str, product_key: str) -> dict[str, Any] | None:
        """Fetch OSS upload configuration and STS tokens for sweep_areas."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/user/get_upload_config"
        q = self._base_query(ts, nonce, sig)
        q.update({
            "product_key": product_key,
            "device_name": sn,
            "file_type": "txt",
            "scene_id": "robot_config",
            "scene_info": json.dumps({"id": "sweep_areas"}, separators=(",", ":")),
        })
        try:
            async with self.session.get(
                url,
                params=q,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
                if data.get("code") == 0:
                    return data.get("data", {}).get("upload_info")
        except Exception as err:
            _LOGGER.error("Failed to get upload config: %s", err)
        return None

    async def _upload_to_oss(self, upload_info: dict[str, Any], payload: dict[str, Any]) -> str | None:
        """Upload sweep payload to Alibaba Cloud OSS using STS token and HMAC-SHA1 signature."""
        try:
            sts = upload_info.get("sts", {})
            bucket = upload_info.get("bucket", "")
            ep = upload_info.get("endpoint", "")
            path = upload_info.get("path", "")
            key_id = sts.get("accesskey_id", "")
            secret = sts.get("accesskey_secret", "")
            token = sts.get("security_token", "")
            if not all([key_id, secret, token, bucket, ep, path]):
                return None

            content = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
            md5_val = base64.b64encode(hashlib.md5(content).digest()).decode("utf-8")
            date_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT", time.gmtime())
            sts_str = f"PUT\n{md5_val}\napplication/octet-stream\n{date_str}\nx-oss-security-token:{token}\n/{bucket}/{path}"
            sig = base64.b64encode(
                hmac.new(secret.encode("utf-8"), sts_str.encode("utf-8"), hashlib.sha1).digest()
            ).decode("utf-8")

            put_url = f"https://{bucket}.{ep}/{urllib.parse.quote(path, safe='')}"
            headers = {
                "x-oss-security-token": token,
                "Date": date_str,
                "Content-Type": "application/octet-stream",
                "Content-MD5": md5_val,
                "Authorization": f"OSS {key_id}:{sig}",
                "Content-Length": str(len(content)),
            }
            async with self.session.put(
                put_url,
                data=content,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                if resp.status in (200, 201):
                    return f"aliyun://{bucket}.{ep}/{path}"
                _LOGGER.error("OSS PUT failed with status %s", resp.status)
        except Exception as err:
            _LOGGER.error("OSS upload exception: %s", err)
        return None

    @staticmethod
    def _parse_oss_info(raw: Any) -> dict[str, Any]:
        """Parse the MapPkgOssInfo property into a dict."""
        if isinstance(raw, dict):
            return raw
        if isinstance(raw, str):
            try:
                parsed = json.loads(raw)
            except (TypeError, ValueError):
                return {}
            return parsed if isinstance(parsed, dict) else {}
        return {}

    async def _fetch_signed_json(
        self, url: str | None, signed: str | None
    ) -> dict[str, Any] | None:
        """Download and decode a JSON document from a signed OSS URL."""
        if not signed:
            return None
        try:
            async with self.session.get(
                signed, timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)
            ) as resp:
                if resp.status in (200, 206):
                    return await resp.json(content_type=None)
        except Exception as err:
            _LOGGER.debug("Map JSON fetch error for %s: %s", url, err)
        return None

    @staticmethod
    def _map_quality(map_json: dict[str, Any]) -> tuple[int, int]:
        """Rank a map candidate by how useful it is.

        Returns ``(total_outline_vertices, room_count)``. Room polygons with
        more vertices describe the floor plan more accurately, and a larger
        set of rooms is preferable, so the best available candidate is chosen
        instead of simply the first one that downloads.
        """
        rooms = BotslabVacuumApi._parse_rooms(map_json)
        return (
            sum(len(room.outline) for room in rooms),
            len(rooms),
        )

    async def get_map_json(self, sn: str, product_key: str) -> tuple[dict[str, Any] | None, dict[str, Any]]:
        """Return the best available map document plus device properties.

        The cloud exposes room geometry through several OSS objects that are
        refreshed at different times: the current map package, the room
        segmentation (``sweep_areas``) and older map archives. They can
        disagree, so each candidate is scored and the most detailed one wins.
        Falls back gracefully when a candidate is missing or unsigned.
        """
        if self.is_legacy_360:
            props, _ = await self.get_property_extended(sn, product_key)
            record = await self.get_latest_clean_record(sn)
            if record:
                return record, props
            return None, props

        props, signs = await self.get_property_extended(sn, product_key)

        def usable(document: dict[str, Any]) -> bool:
            """A candidate is only useful if it has a drawable raster."""
            return bool(
                document.get("width") and document.get("height") and document.get("map")
            )

        # The device advertises the current map package; its signed URL keys the
        # cache. Signatures for several related objects (older map archives and
        # the room segmentation) arrive in the same payload.
        map_url = self._parse_oss_info(props.get("MapPkgOssInfo")).get("Url")

        candidates: list[tuple[dict[str, Any], str]] = []

        async def consider(url: str, label: str) -> None:
            signed = signs.get(url) or self.cached_s3_signs.get(url)
            document = await self._fetch_signed_json(url, signed)
            if document and (document.get("smartArea") or document.get("map")):
                candidates.append((document, label))

        if map_url:
            await consider(map_url, "current map")

        # Related objects arrive signed alongside the current one. Try the ones
        # that look like maps or room definitions; there are usually few.
        for url in self.cached_s3_signs:
            if url == map_url:
                continue
            tail = url.rsplit("/", 2)
            folder = tail[-2] if len(tail) >= 2 else ""
            if folder in ("temp", "robot_config", "180days", "90days", "long"):
                await consider(url, folder or "related object")

        if not candidates:
            return None, props

        # Prefer documents that carry a raster, then rank by geometry detail.
        with_raster = [c for c in candidates if usable(c[0])]
        pool = with_raster or candidates

        best_doc, best_source = max(pool, key=lambda c: self._map_quality(c[0]))
        vertices, room_count = self._map_quality(best_doc)

        if len(pool) > 1:
            others = ", ".join(
                f"{src} ({self._map_quality(doc)[0]} vertices)"
                for doc, src in pool
                if src != best_source
            )
            _LOGGER.debug(
                "Map candidates: chose %s (%d vertices, %d rooms) over %s",
                best_source,
                vertices,
                room_count,
                others,
            )

        # A room-only document carries no raster, so borrow the grid from a
        # document that has one to keep geometry and image consistent.
        if not usable(best_doc):
            for doc, _ in pool:
                if usable(doc):
                    merged = dict(doc)
                    for key in ("map", "width", "height", "x_min", "y_min", "resolution"):
                        if key in doc:
                            merged[key] = doc[key]
                    best_doc = merged
                    break

        return best_doc, props

    @staticmethod
    def _parse_rooms(map_json: dict[str, Any]) -> list[BotslabRoom]:
        """Parse room definitions, including polygon outlines, from map JSON."""
        rooms: list[BotslabRoom] = []
        smart_area = map_json.get("smartArea") or {}
        for entry in smart_area.get("value") or []:
            if not isinstance(entry, dict):
                continue
            rid = str(entry.get("id", ""))
            raw_name = str(entry.get("name", ""))
            try:
                name = base64.b64decode(raw_name).decode("utf-8").strip()
            except Exception:
                name = raw_name
            if not name:
                name = f"Room {rid}"

            outline: list[tuple[int, int]] = []
            for vertex in entry.get("vertexs") or []:
                try:
                    x, y = vertex[0], vertex[1]
                    outline.append((int(x), int(y)))
                except (TypeError, ValueError, IndexError):
                    continue

            rooms.append(
                BotslabRoom(
                    room_id=rid,
                    name=name,
                    clean_state=int(entry.get("cleanTimes") or 0),
                    color=str(entry.get("color") or ""),
                    outline=tuple(outline),
                    wind_mode=str(entry.get("windMode") or "auto"),
                    water_pump=int(entry.get("waterPump") or 0),
                )
            )
        return rooms

    def _build_map_info(self, map_json: dict[str, Any]) -> BotslabMapInfo | None:
        """Assemble map geometry (grid size, origin, resolution, rooms, dock, no-go)."""
        width = map_json.get("width")
        height = map_json.get("height")
        if not width or not height:
            return None
        try:
            resolution = float(map_json.get("resolution") or 0.05) or 0.05
        except (TypeError, ValueError):
            resolution = 0.05
        try:
            x_min = float(map_json.get("x_min") or 0)
            y_min = float(map_json.get("y_min") or 0)
        except (TypeError, ValueError):
            x_min = y_min = 0.0

        dock = map_json.get("chargeHandlePos")
        dock_pos = (
            (float(dock[0]), float(dock[1]))
            if isinstance(dock, (list, tuple)) and len(dock) >= 2
            else None
        )
        no_go = map_json.get("area") or []

        return BotslabMapInfo(
            width=int(width),
            height=int(height),
            x_min=x_min,
            y_min=y_min,
            resolution=resolution,
            rooms=self._parse_rooms(map_json),
            dock_position=dock_pos,
            no_go_zones=no_go if isinstance(no_go, list) else [],
        )

    async def fetch_rooms(self, sn: str, product_key: str) -> list[BotslabRoom]:
        """Fetch and decode rooms from the current cloud map."""
        map_json, _ = await self.get_map_json(sn, product_key)
        if not map_json:
            return self._cached_rooms.get(sn, [])
        rooms = self._parse_rooms(map_json)
        if rooms:
            self._cached_rooms[sn] = rooms
        return rooms

    def get_cached_rooms(self, sn: str) -> list[BotslabRoom]:
        """Return cached rooms for device."""
        return self._cached_rooms.get(sn, [])

    def get_cached_map_info(self, sn: str) -> BotslabMapInfo | None:
        """Return cached map geometry for a device, if already fetched."""
        return self._cached_map_info.get(sn)

    def clear_map_cache(self, sn: str | None = None) -> None:
        """Invalidate map caches so the next poll fetches a fresh map."""
        self._cached_upload_id = None
        self._cached_map_bytes = None
        if sn:
            self._cached_map_info.pop(sn, None)
            self._cached_rooms.pop(sn, None)
        else:
            self._cached_map_info.clear()
            self._cached_rooms.clear()

    async def get_live_map(
        self,
        sn: str,
        product_key: str,
        robot_pose: list[float] | tuple[float, ...] | None = None,
        cleaning_path: list[list[int]] | None = None,
    ) -> bytes | None:
        """Fetch, decompress and render high-resolution map with live overlays."""
        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            return self._cached_map_bytes

        map_info = self._build_map_info(map_json)
        if map_info and map_info.rooms:
            self._cached_rooms[sn] = map_info.rooms
        self._cached_map_info[sn] = map_info

        oss_info = self._parse_oss_info(props.get("MapPkgOssInfo"))
        upload_id = str(
            oss_info.get("UploadID")
            or oss_info.get("CleanID")
            or map_json.get("cleanId")
            or map_json.get("clean_id")
            or ""
        )

        # In legacy 360 maps, cleaning path is stored in record posArray
        if not cleaning_path and isinstance(map_json.get("posArray"), list):
            cleaning_path = map_json["posArray"]

        # Re-use cached map only if neither layout, robot pose, nor path changed
        if (
            upload_id
            and upload_id == self._cached_upload_id
            and self._cached_map_bytes
            and not robot_pose
            and not cleaning_path
        ):
            return self._cached_map_bytes

        try:
            width = map_json["width"]
            height = map_json["height"]
            compressed = base64.b64decode(map_json["map"])
            pixels = decompress_lz4_block(compressed, width * height)
            if len(pixels) != width * height:
                raise ValueError(
                    f"decompressed size {len(pixels)} != expected {width * height}"
                )

            png_bytes, geom = render_map_advanced(
                width=width,
                height=height,
                pixels=pixels,
                resolution=map_info.resolution if map_info else 0.05,
                x_min=map_info.x_min if map_info else 0.0,
                y_min=map_info.y_min if map_info else 0.0,
                rooms=map_info.rooms if map_info else [],
                no_go_zones=map_info.no_go_zones if map_info else [],
                dock_pos=map_info.dock_position if map_info else None,
                robot_pose=robot_pose,
                cleaning_path=cleaning_path,
                scale=4,
            )
            if map_info:
                map_info.cmin = geom[0]
                map_info.cmax = geom[1]
                map_info.rmin = geom[2]
                map_info.rmax = geom[3]
                map_info.scale = geom[4]

            self._cached_upload_id = upload_id
            self._cached_map_bytes = png_bytes
            return png_bytes
        except Exception as err:
            _LOGGER.warning("Map decoding failed: %s", err)
            return self._cached_map_bytes

    async def get_map_info(self, sn: str, product_key: str) -> BotslabMapInfo | None:
        """Return cached map geometry, fetching it if the cache is empty."""
        cached = self._cached_map_info.get(sn)
        if cached is not None:
            return cached
        await self.get_live_map(sn, product_key)
        return self._cached_map_info.get(sn)

    async def invoke_sync(
        self, sn: str, product_key: str, action: str, params: dict[str, Any]
    ) -> dict[str, Any]:
        """Invoke synchronous device action."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/invoke_service"
        q = self._base_query(ts, nonce, sig)
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                return await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"invoke_sync {action} failed: {err}") from err

    async def invoke_async(
        self, sn: str, product_key: str, action: str, params: dict[str, Any]
    ) -> dict[str, Any]:
        """Invoke asynchronous device action."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/invoke_service_async"
        q = self._base_query(ts, nonce, sig)
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                return await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"invoke_async {action} failed: {err}") from err

    async def wait_async_reply(self, request_id: str, timeout: int = 12) -> bool:
        """Wait for asynchronous command confirmation. Re-signs on every poll iteration."""
        url = f"{self.base_url}/v1/iot/device/invoke_service_reply"
        start_t = time.time()
        while time.time() - start_t < timeout:
            ts, nonce, sig = self._sign()
            q = self._base_query(ts, nonce, sig)
            q["request_id"] = request_id
            try:
                async with self.session.get(
                    url,
                    params=q,
                    headers=self._headers(),
                    timeout=aiohttp.ClientTimeout(total=5),
                ) as resp:
                    data = await resp.json(content_type=None)
                    code = data.get("code")
                    if code == 0:
                        res_str = data.get("data", {}).get("result", "")
                        if isinstance(res_str, str) and res_str:
                            try:
                                res_obj = json.loads(res_str)
                                if res_obj.get("ErrorNO", 0) != 0:
                                    _LOGGER.warning("Async reply ErrorNO=%s: %s", res_obj.get("ErrorNO"), res_str)
                                    return False
                            except (ValueError, TypeError):
                                pass
                        return True
                    if code == 202016:
                        # Device async command not reply now, please wait
                        pass
                    else:
                        _LOGGER.debug("wait_async_reply status code=%s: %s", code, data.get("msg"))
            except Exception as err:
                _LOGGER.debug("wait_async_reply request error: %s", err)
            await asyncio.sleep(1)
        return False

    async def start_clean(self, sn: str, product_key: str) -> None:
        """Start or resume default cleaning."""
        if self.is_legacy_360:
            if self._legacy_cached_status.get(sn) == STATUS_PAUSED:
                await self.send_legacy_360_cmd(sn, INFO_360_PAUSE, {"cmd": "continue"})
            else:
                await self.send_legacy_360_cmd(
                    sn, INFO_360_START, {"mode": "smartClean", "globalCleanTimes": 1}
                )
            self._legacy_cached_status[sn] = STATUS_CLEANING
            return
        await self.invoke_sync(sn, product_key, "StartDefaultClean", {"CleanTimes": 1})

    async def pause_clean(self, sn: str, product_key: str) -> None:
        """Pause current cleaning operation."""
        if self.is_legacy_360:
            await self.send_legacy_360_cmd(sn, INFO_360_PAUSE, {"cmd": "pause"})
            self._legacy_cached_status[sn] = STATUS_PAUSED
            return
        await self.invoke_sync(sn, product_key, "PauseRobot", {})

    async def stop_clean(self, sn: str, product_key: str) -> None:
        """Stop current cleaning operation."""
        if self.is_legacy_360:
            await self.send_legacy_360_cmd(sn, INFO_360_RETURN, {"cmd": "start"})
            self._legacy_cached_status[sn] = STATUS_RETURNING
            return
        await self.invoke_sync(sn, product_key, "PauseRobot", {})

    async def return_to_dock(self, sn: str, product_key: str) -> None:
        """Send robot back to charging dock."""
        if self.is_legacy_360:
            await self.send_legacy_360_cmd(sn, INFO_360_RETURN, {"cmd": "start"})
            self._legacy_cached_status[sn] = STATUS_RETURNING
            return
        await self.invoke_sync(sn, product_key, "ReturnChargeBase", {})

    async def locate(self, sn: str, product_key: str) -> None:
        """Play sound on robot to locate it."""
        if self.is_legacy_360:
            await self.send_legacy_360_cmd(sn, INFO_360_LOCATE, {"ctrlCode": 3010})
            return
        await self.invoke_sync(sn, product_key, "SeekRobot", {})

    async def set_fan_speed(self, sn: str, product_key: str, fan_speed: str) -> None:
        """Set vacuum suction power."""
        if self.is_legacy_360:
            speed_cmd = FAN_SPEEDS_HA_TO_360.get(fan_speed, "auto")
            await self.send_legacy_360_cmd(sn, INFO_360_FAN_SPEED, {"cmd": speed_cmd})
            return
        mode = FAN_SPEED_TO_MODE.get(fan_speed, 2)
        await self.invoke_sync(sn, product_key, "SetSuctionPowLevel", {"SuctionPowLevel": mode})

    async def reset_consumable(self, sn: str, product_key: str, consumable: str) -> None:
        """Reset consumable life counter."""
        if self.is_legacy_360:
            await self.send_legacy_360_cmd(sn, INFO_360_RESET_CONSUMABLE, {"cmd": consumable})
            return
        cmd_map = {
            "filter": "ResetFilterLife",
            "main_brush": "ResetMainBrushLife",
            "side_brush": "ResetSideBrushLife",
            "sensor": "ResetSensorCleanLife",
        }
        action = cmd_map.get(consumable)
        if action:
            await self.invoke_sync(sn, product_key, action, {})

    async def clean_rooms(
        self,
        sn: str,
        product_key: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean specific room(s) by ID via StartCleanInAreas."""
        if self.is_legacy_360:
            raise BotslabCommandError(
                "Room cleaning is not supported on the legacy 360 cloud server"
            )
        if fan_speed:
            await self.set_fan_speed(sn, product_key, fan_speed)
        if water_level:
            await self.set_water_level(sn, product_key, water_level)

        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            raise BotslabApiError("Cannot clean rooms: current map could not be downloaded")

        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))
        clean_id = (
            oss_info.get("CleanID")
            or map_json.get("cleanId")
            or props.get("CleanID")
            or f"{sn}-{int(time.time())}"
        )

        sa = map_json.get("smartArea") or {}
        room_list = copy.deepcopy(sa.get("value", []))
        if not room_list:
            room_list = copy.deepcopy(map_json.get("value", []))

        int_room_ids: list[int] = []
        str_room_ids: set[str] = set()
        for r in room_ids:
            s = str(r).strip()
            if s and s not in str_room_ids:
                str_room_ids.add(s)
                try:
                    rid = int(s)
                    if rid not in int_room_ids:
                        int_room_ids.append(rid)
                except (ValueError, TypeError):
                    pass

        if not int_room_ids and not str_room_ids:
            raise BotslabApiError(f"No valid room IDs found in input: {room_ids}")

        _LOGGER.info(
            "Starting clean_rooms on %s (map_id=%s, target_rooms=%s, repeats=%d, speed=%s, water=%s)",
            sn,
            map_id,
            int_room_ids,
            repeat_times,
            fan_speed,
            water_level,
        )

        for r in room_list:
            rid = r.get("id")
            if rid in int_room_ids or str(rid) in str_room_ids:
                r["cleanTimes"] = repeat_times
                if water_level and water_level in WATER_LEVEL_TO_INT:
                    r["waterPump"] = WATER_LEVEL_TO_INT[water_level]

        # 1. Invoke SetCleanPolicyList first (as required by Botslab / 360 protocol)
        policy = {
            "value": [
                {
                    "workNoisy": "auto",
                    "active": False,
                    "unlock": False,
                    "period": [],
                    "smartAreaIds": int_room_ids,
                    "cleanWater": None,
                    "index": None,
                    "cleanWorkType": None,
                    "cleanTimeType": None,
                    "cleanTimeTypeCustomStr": None,
                    "strWorkMode": None,
                    "strSweepType": None,
                    "cleaningPreference": None,
                    "hour": None,
                    "minute": None,
                    "endHour": None,
                    "endMinute": None,
                    "isMorning": None,
                    "isNotDisturb": None,
                    "isTomorrow": None,
                    "isSelectCleanTime": None,
                    "cleanMode": 0,
                    "priority": 1,
                    "orderClean": True,
                    "endTime": 28800,
                    "mapId": map_id,
                    "cleanAreas": [],
                    "activeIdAttr": None,
                    "cleanTimes": repeat_times,
                    "startTime": 79200,
                    "alternateStartTime": 79200,
                    "isAttrOn": None,
                    "msgID": None,
                }
            ],
            "timeZone": 3.0,
            "appendMode": False,
        }

        try:
            _LOGGER.debug("Sending SetCleanPolicyList for %s: %s", sn, int_room_ids)
            res_pol = await self.invoke_async(
                sn,
                product_key,
                "SetCleanPolicyList",
                {"CleanPolicyList": json.dumps(policy, separators=(",", ":"))},
            )
            req_id_pol = res_pol.get("data", {}).get("request_id")
            if req_id_pol:
                await self.wait_async_reply(req_id_pol, timeout=5)
        except Exception as pol_err:
            _LOGGER.warning("SetCleanPolicyList error for %s: %s", sn, pol_err)

        await asyncio.sleep(1)

        sweep_payload = {
            "mapId": map_id,
            "value": room_list,
            "activeIds": int_room_ids,
            "areaCleanActiveId": None,
            "autoOrder": False,
            "cleanTimes": 1,
            "isAttrOn": 1,
        }

        try:
            upload_info = await self.get_upload_config(sn, product_key)
            if not upload_info:
                raise BotslabApiError("Cannot clean rooms: OSS upload config unavailable")

            uploaded_url = await self._upload_to_oss(upload_info, sweep_payload)
            if not uploaded_url:
                raise BotslabApiError("Cannot clean rooms: OSS upload failed")

            _LOGGER.debug("Sending StartCleanInAreas for %s with map %s, url: %s", sn, map_id, uploaded_url)
            res = await self.invoke_async(
                sn,
                product_key,
                "StartCleanInAreas",
                {
                    "MapID": map_id,
                    "CleanID": clean_id,
                    "Url": uploaded_url,
                },
            )
            req_id = res.get("data", {}).get("request_id")
            if req_id:
                reply_ok = await self.wait_async_reply(req_id, timeout=12)
                _LOGGER.debug("StartCleanInAreas reply for %s: ok=%s", sn, reply_ok)
                if not reply_ok:
                    raise BotslabCommandError(
                        f"StartCleanInAreas not confirmed by robot {sn} (timeout or rejected)"
                    )
            _LOGGER.info("Room cleaning started successfully on %s for rooms %s", sn, int_room_ids)
        except Exception as err:
            _LOGGER.warning(
                "Native StartCleanInAreas failed for %s (%s). Attempting room_cover_rects fallback...",
                sn,
                err,
            )
            fallback_zones: list[list[float]] = []
            for r in room_list:
                rid = r.get("id")
                if (rid in int_room_ids or str(rid) in str_room_ids) and r.get("vertexs"):
                    rects = room_cover_rects(r["vertexs"], cell=100, max_rects=6)
                    for rect in rects:
                        fallback_zones.append([float(c) for c in rect])

            if not fallback_zones:
                raise BotslabApiError(f"Room cleaning failed and no fallback zones found: {err}") from err

            _LOGGER.info(
                "Executing room cleaning fallback with %d tiled rectangles for %s",
                len(fallback_zones),
                sn,
            )
            await self.clean_zone(
                sn=sn,
                product_key=product_key,
                zones=fallback_zones,
                repeat_times=repeat_times,
                fan_speed=fan_speed,
                water_level=water_level,
            )

    async def clean_zone(
        self,
        sn: str,
        product_key: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) via SetZones + StartCleanInZones."""
        if self.is_legacy_360:
            raise BotslabCommandError(
                "Zone cleaning is not supported on the legacy 360 cloud server"
            )
        if fan_speed:
            await self.set_fan_speed(sn, product_key, fan_speed)
        if water_level:
            await self.set_water_level(sn, product_key, water_level)

        props, _ = await self.get_property_extended(sn, product_key)
        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))

        wp = WATER_LEVEL_TO_INT.get(water_level, 0) if water_level else 0
        zone_objs = []
        for i, z in enumerate(zones):
            x1, y1, x2, y2 = int(z[0]), int(z[1]), int(z[2]), int(z[3])
            zone_objs.append({
                "name": f"rect{i+1}",
                "id": i + 1,
                "mode": None,
                "active": "normal",
                "forbidType": None,
                "windMode": "auto",
                "cleanTimes": repeat_times,
                "waterPump": wp,
                "material": 0,
                "roomType": None,
                "vertexs": [[x2, y1], [x1, y1], [x1, y2], [x2, y2]],
                "radius": 0,
                "tag": None,
                "relativeRoom": -1,
            })

        active_ids = [z["id"] for z in zone_objs]
        zones_payload = {
            "zones": zone_objs,
            "activeIds": active_ids,
            "cleanTimes": repeat_times,
            "isAttrOn": 0,
        }

        res = await self.invoke_async(
            sn,
            product_key,
            "SetZones",
            {
                "MapID": map_id,
                "ZonesList": json.dumps(zones_payload, separators=(",", ":")),
            },
        )
        req_id = res.get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

        await self.invoke_sync(sn, product_key, "StartCleanInZones", {})

    async def goto_target(self, sn: str, product_key: str, x: int, y: int) -> None:
        """Send robot to target point coordinates."""
        if self.is_legacy_360:
            raise BotslabCommandError(
                "Go to target is not supported on the legacy 360 cloud server"
            )
        props, _ = await self.get_property_extended(sn, product_key)
        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))
        await self.invoke_sync(
            sn, product_key, "SetTargetPos", {"MapID": map_id, "Pos_X": int(x), "Pos_Y": int(y)}
        )
        await asyncio.sleep(0.5)
        await self.invoke_sync(sn, product_key, "StartGotoTarget", {})

    async def set_water_level(self, sn: str, product_key: str, level: str | int) -> None:
        """Set pad wetness / water pump flow rate."""
        if self.is_legacy_360:
            return
        val = WATER_LEVEL_TO_INT.get(str(level).lower(), int(level) if str(level).isdigit() else 2)
        await self.invoke_sync(sn, product_key, "SetPadWetness", {"PadWetness": val})

    async def set_mop_mode(self, sn: str, product_key: str, mode: str | int) -> None:
        """Set mop mode switching (0: Vacuum & Mop, 1: Vacuum Only, 2: Mop Only)."""
        if self.is_legacy_360:
            return
        val = MOP_MODE_TO_INT.get(str(mode).lower(), int(mode) if str(mode).isdigit() else 0)
        await self.invoke_sync(sn, product_key, "SetMopModeSwitching", {"MopModeSwitching": val})

    async def set_auto_boost(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle carpet auto suction boost."""
        if self.is_legacy_360:
            return
        await self.invoke_sync(sn, product_key, "SetAutoBoost", {"AutoBoost": bool(state)})

    async def set_button_backlight(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle physical button LED light."""
        if self.is_legacy_360:
            return
        await self.invoke_sync(sn, product_key, "SetButtonBacklight", {"ButtonBacklight": bool(state)})

    async def set_collision_protection(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle collision protection sensor sensitivity."""
        if self.is_legacy_360:
            return
        await self.invoke_sync(sn, product_key, "SetCollisionProtection", {"CollisionProtection": bool(state)})

    async def set_volume_level(self, sn: str, product_key: str, volume: int) -> None:
        """Set speaker voice volume (0-100)."""
        if self.is_legacy_360:
            level = max(0, min(10, round(volume / 10)))
            await self.send_legacy_360_cmd(
                sn, INFO_360_SETTINGS, {"cmd": "setVolume", "value": level}
            )
            return
        vol = max(0, min(100, int(volume)))
        await self.invoke_sync(sn, product_key, "SetVolumeLevel", {"VolumeLevel": vol})

    async def start_map_sync(self, sn: str, product_key: str, duration_s: int = 60) -> None:
        """Tell robot to sync live map package to OSS."""
        if self.is_legacy_360:
            return
        res = await self.invoke_async(
            sn, product_key, "StartSyncMapPkgToOss", {"SyncDuration": int(duration_s)}
        )
        req_id = res.get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

    async def stop_map_sync(self, sn: str, product_key: str) -> None:
        """Tell robot to stop syncing live map to OSS."""
        if self.is_legacy_360:
            return
        await self.invoke_sync(sn, product_key, "StopSyncMapPkgToOss", {})

    async def set_no_go_zones(
        self,
        sn: str,
        product_key: str,
        map_id: int | str,
        places: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """Set/replace/clear the forbidden (no-go) zones via SetFbdPlaces."""
        if self.is_legacy_360:
            raise BotslabCommandError(
                "No-go zones configuration is not supported on the legacy 360 cloud server"
            )
        return await self.invoke_sync(
            sn,
            product_key,
            "SetFbdPlaces",
            {
                "MapID": int(map_id),
                "FbdPlacesList": json.dumps(places, separators=(",", ":")),
            },
        )

    async def get_clean_track(
        self, sn: str, product_key: str, start_idx: int = 0
    ) -> dict[str, Any]:
        """Fetch one page of the live cleaning track."""
        res = await self.invoke_sync(
            sn,
            product_key,
            "GetCleanTrackWithPosIdx",
            {"StartPosIndex": int(start_idx)},
        )
        raw = res.get("data", {}).get("result") or res.get("result")
        outer = json.loads(raw) if isinstance(raw, str) else (raw or {})
        tk = outer.get("Track", outer)
        return json.loads(tk) if isinstance(tk, str) else (tk or {})

    async def get_clean_track_all(
        self, sn: str, product_key: str, max_points: int = 20000
    ) -> list[list[int]]:
        """Paginate the cleaning track into a list of [x, y] coordinates (mm)."""
        if self.is_legacy_360:
            return []
        pts: list[list[int]] = []
        idx = 0
        while len(pts) < max_points:
            try:
                tk = await self.get_clean_track(sn, product_key, idx)
            except Exception:
                break
            seg = tk.get("posArray") or tk.get("PosArray") or []
            if not seg:
                break
            pts.extend(seg)
            total = int(tk.get("totalPoints") or tk.get("TotalPoints") or len(pts))
            idx = len(pts)
            if idx >= total:
                break
        return pts
