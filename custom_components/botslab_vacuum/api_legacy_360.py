"""Isolated & frozen Legacy Qihoo 360 cloud backend client (S6, S7, S7 Pro, X90, X95)."""
from __future__ import annotations

import copy
import json
import logging
import time
import uuid
from typing import Any
import aiohttp

from .api_base import (
    BotslabBaseApiClient,
    _coerce_battery_level,
    working_status_to_state,
)
from .const import (
    AUTH_EXPIRED_ERRNOS_360,
    BATTERY_KEYS_360,
    EP_360_CMD_SEND,
    EP_360_DEV_LIST,
    EP_360_LOGIN,
    EP_360_RECORD_GET_ONE,
    EP_360_RECORD_LIST,
    EP_360_SET_AREA_AND_CLEANING,
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
    LEGACY_360_ROOM_UA,
    REQUEST_TIMEOUT,
    STATUS_CLEANING,
    STATUS_DOCKED,
    STATUS_PAUSED,
    STATUS_RETURNING,
    WATER_LEVEL_TO_INT,
)
from .exceptions import BotslabCommandError
from .quc_login import BotslabApiError, BotslabAuthError

_LOGGER = logging.getLogger(__name__)


class BotslabLegacy360Client(BotslabBaseApiClient):
    """Isolated backend for Qihoo 360 legacy vacuum robots."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        region: str,
        m2: str,
        q: str,
        t: str,
        qid: str | None = None,
        facade: Any = None,
    ) -> None:
        super().__init__(session=session, region=region, m2=m2, q=q, t=t, qid=qid)
        self._facade = facade

    @property
    def target(self) -> Any:
        """Return the facade instance if bound, otherwise self."""
        return self._facade if self._facade is not None else self

    def _check_360_errno(self, result: dict[str, Any], label: str) -> None:
        """Check response status code from 360 cloud and map auth/command errors."""
        try:
            errno = int(result.get("errno", 0))
        except (ValueError, TypeError):
            errno = -1

        # Placix compatibility: non-zero errorCode overrides errno
        if "errorCode" in result:
            try:
                error_code = int(result["errorCode"])
                if error_code != 0:
                    errno = error_code
            except (ValueError, TypeError):
                pass

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

        self.target._check_360_errno(data, "login")

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

    async def login(self) -> dict[str, Any]:
        """Public alias for _legacy_360_login."""
        return await self.target._legacy_360_login()

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

        self.target._check_360_errno(data, "GetList")

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

    async def get_devices(self) -> list[dict[str, Any]]:
        """Public alias for legacy 360 get_devices."""
        return await self.target._legacy_360_get_devices()

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

        self.target._check_360_errno(res, f"cmd/{info_type}")
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
            self.target._check_360_errno(result, path)
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
        self, sn: str, product_key: str = ""
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch and synthesize telemetry for legacy 360 robot."""
        raw_dev = self._legacy_device_cache.get(sn, {})
        live = self._legacy_live_status.get(sn, {})

        current_status = live.get("mode") or self._legacy_cached_status.get(sn, STATUS_DOCKED)

        battery_level = None
        for bkey in BATTERY_KEYS_360:
            if bkey in live and live[bkey] is not None:
                try:
                    battery_level = int(live[bkey])
                    break
                except (ValueError, TypeError):
                    continue
        if battery_level is None:
            for bkey in BATTERY_KEYS_360:
                if bkey in raw_dev and raw_dev[bkey] is not None:
                    try:
                        battery_level = int(raw_dev[bkey])
                        break
                    except (ValueError, TypeError):
                        continue
        if battery_level is None:
            battery_level = 100

        props: dict[str, Any] = {
            "WorkingStatus": current_status,
            "BatteryLevel": battery_level,
            "SuctionPowLevel": live.get("workNoisy") or raw_dev.get("fan_speed", 2),
            "TotalCleaningArea": live.get("allArea") if live.get("allArea") is not None else (raw_dev.get("allArea") or raw_dev.get("total_area") or raw_dev.get("all_area") or 0.0),
            "TotalCleaningTime": live.get("allTime") if live.get("allTime") is not None else (raw_dev.get("allTime") or raw_dev.get("total_time") or raw_dev.get("all_time") or 0),
            "TasksTotalCount": raw_dev.get("tasks_count") or raw_dev.get("clean_count") or raw_dev.get("allCount") or 0,
            "ErrorCode": 0,
            "firmware_version": (
                raw_dev.get("softversion")
                or raw_dev.get("version")
                or raw_dev.get("software_version")
                or raw_dev.get("firmware_version")
                or raw_dev.get("rom_version")
                or raw_dev.get("firmware")
                or "-"
            ),
            "wifi_ssid": raw_dev.get("ssid") or raw_dev.get("wifi_ssid") or raw_dev.get("wifiSsid") or live.get("ssid") or "-",
            "wifi_rssi": raw_dev.get("rssi") or raw_dev.get("wifi_rssi") or raw_dev.get("wifiSignal") or raw_dev.get("signal") or live.get("rssi") or "-",
            "ip": raw_dev.get("ip") or raw_dev.get("devIp") or raw_dev.get("ip_address") or raw_dev.get("lanIp") or live.get("ip") or "-",
        }
        props["sw_version"] = props["firmware_version"]
        props["ap"] = {
            "ssid": props["wifi_ssid"],
            "rssi": props["wifi_rssi"],
            "ip": props["ip"],
        }

        if "workNoisy" in live:
            props["workNoisy"] = live["workNoisy"]
        elif "workNoisy" in raw_dev:
            props["workNoisy"] = raw_dev["workNoisy"]

        if "vol" in live and isinstance(live["vol"], (int, float)):
            props["VolumeLevel"] = int(live["vol"]) * 10
        elif "vol" in raw_dev and isinstance(raw_dev["vol"], (int, float)):
            props["VolumeLevel"] = int(raw_dev["vol"]) * 10

        clean_time = live.get("cleanTime") if live.get("cleanTime") is not None else live.get("clean_time")
        if clean_time is not None:
            props["TEST_CleaningTime"] = clean_time
        clean_area = live.get("cleanArea") if live.get("cleanArea") is not None else live.get("clean_area")
        if clean_area is not None:
            props["CleaningArea"] = clean_area

        error_state = live.get("errorState")
        if isinstance(error_state, list) and error_state:
            props["ErrorCode"] = error_state[-1]
        elif isinstance(error_state, (int, float)):
            props["ErrorCode"] = int(error_state)
        elif "error_code" in raw_dev:
            props["ErrorCode"] = raw_dev["error_code"]

        if "mopStatus" in live and live["mopStatus"] is not None:
            props["mopStatus"] = live["mopStatus"]
            props["MopStatus"] = live["mopStatus"]

        pos = live.get("pos") or raw_dev.get("pos")
        phi = live.get("phi") if live.get("phi") is not None else raw_dev.get("phi", 0)
        if isinstance(pos, (list, tuple)) and len(pos) >= 2:
            props["CurrentLocation"] = [pos[0], pos[1], phi or 0]

        if "autoBoost" in live and live["autoBoost"] is not None:
            props["AutoBoost"] = bool(live["autoBoost"])
        elif "autoBoost" in raw_dev and raw_dev["autoBoost"] is not None:
            props["AutoBoost"] = bool(raw_dev["autoBoost"])

        try:
            res = await self.target.send_legacy_360_cmd(sn, INFO_360_STATUS, "")
            cmd_data = res.get("data")
            if isinstance(cmd_data, str) and cmd_data.startswith("{"):
                try:
                    cmd_data = json.loads(cmd_data)
                except Exception:
                    pass
            if isinstance(cmd_data, dict):
                for bkey in BATTERY_KEYS_360:
                    if bkey in cmd_data and cmd_data[bkey] is not None:
                        b_val = _coerce_battery_level(cmd_data[bkey])
                        if b_val is not None:
                            props["BatteryLevel"] = b_val
                            break
                for skey in ("mode", "workMode", "runStatus", "cleanMode"):
                    if skey in cmd_data and cmd_data[skey] is not None:
                        props["WorkingStatus"] = cmd_data[skey]
                        props[skey] = cmd_data[skey]
                        break
                if "workNoisy" in cmd_data:
                    props["workNoisy"] = cmd_data["workNoisy"]
                if "vol" in cmd_data and isinstance(cmd_data["vol"], (int, float)):
                    props["VolumeLevel"] = int(cmd_data["vol"]) * 10

                c_time = cmd_data.get("cleanTime") if cmd_data.get("cleanTime") is not None else cmd_data.get("clean_time")
                if c_time is not None:
                    props["TEST_CleaningTime"] = c_time
                c_area = cmd_data.get("cleanArea") if cmd_data.get("cleanArea") is not None else cmd_data.get("clean_area")
                if c_area is not None:
                    props["CleaningArea"] = c_area
                if "allTime" in cmd_data and cmd_data["allTime"] is not None:
                    props["TotalCleaningTime"] = cmd_data["allTime"]
                if "allArea" in cmd_data and cmd_data["allArea"] is not None:
                    props["TotalCleaningArea"] = cmd_data["allArea"]

                err_st = cmd_data.get("errorState")
                if isinstance(err_st, list) and err_st:
                    props["ErrorCode"] = err_st[-1]
                elif isinstance(err_st, (int, float)):
                    props["ErrorCode"] = int(err_st)

                if "mopStatus" in cmd_data and cmd_data["mopStatus"] is not None:
                    props["mopStatus"] = cmd_data["mopStatus"]
                    props["MopStatus"] = cmd_data["mopStatus"]

                if "pos" in cmd_data and isinstance(cmd_data["pos"], (list, tuple)) and len(cmd_data["pos"]) >= 2:
                    props["CurrentLocation"] = [cmd_data["pos"][0], cmd_data["pos"][1], cmd_data.get("phi", 0) or 0]
                if "autoBoost" in cmd_data and cmd_data["autoBoost"] is not None:
                    props["AutoBoost"] = bool(cmd_data["autoBoost"])
        except BotslabAuthError:
            raise
        except Exception as err:
            _LOGGER.debug("Legacy 360 status poll (20001) error: %s", err)

        consumables = self._legacy_consumables.get(sn, {})
        if "filter" in consumables:
            props["FilterLifeTime"] = consumables["filter"]
        if "main_brush" in consumables:
            props["RollBrushLifeTime"] = consumables["main_brush"]
        if "side_brush" in consumables:
            props["EdgeBrushLifeTime"] = consumables["side_brush"]
        if "sensor" in consumables:
            props["SensorLifeTime"] = consumables["sensor"]

        try:
            res_c = await self.target.send_legacy_360_cmd(sn, INFO_360_CONSUMABLES, "")
            c_data = res_c.get("data")
            if isinstance(c_data, dict):
                self._legacy_consumables.setdefault(sn, {}).update(c_data)
                if "filter" in c_data:
                    props["FilterLifeTime"] = c_data["filter"]
                if "main_brush" in c_data:
                    props["RollBrushLifeTime"] = c_data["main_brush"]
                if "side_brush" in c_data:
                    props["EdgeBrushLifeTime"] = c_data["side_brush"]
                if "sensor" in c_data:
                    props["SensorLifeTime"] = c_data["sensor"]
        except BotslabAuthError:
            raise
        except Exception:
            pass

        st = working_status_to_state(props["WorkingStatus"])
        self._legacy_cached_status[sn] = st

        try:
            record = await self.target.get_latest_clean_record(sn)
            if record:
                if "cleanTime" in record or "clean_time" in record:
                    props.setdefault("TEST_CleaningTime", record.get("cleanTime") or record.get("clean_time"))
                if "cleanArea" in record or "clean_area" in record:
                    props.setdefault("CleaningArea", record.get("cleanArea") or record.get("clean_area"))
                if "totalArea" in record:
                    props.setdefault("TotalCleaningArea", record.get("totalArea"))
                if "totalTime" in record:
                    props.setdefault("TotalCleaningTime", record.get("totalTime"))
        except BotslabAuthError:
            raise
        except Exception as err:
            _LOGGER.debug("Legacy 360 clean record poll error: %s", err)

        return props, {}

    async def get_properties(self, sn: str, product_key: str = "") -> tuple[dict[str, Any], dict[str, str]]:
        """Public alias for _legacy_360_get_properties."""
        return await self._legacy_360_get_properties(sn, product_key)

    async def _clean_rooms_legacy_360(
        self,
        sn: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Start room cleaning on legacy Qihoo 360 robot using /clean/record/setAreaAndCleaning."""
        int_room_ids: list[int] = []
        for r in room_ids:
            try:
                rid = int(str(r).strip())
                if rid not in int_room_ids:
                    int_room_ids.append(rid)
            except (ValueError, TypeError):
                continue
        if not int_room_ids:
            raise BotslabCommandError(f"No valid integer room IDs for legacy 360: {room_ids}")

        record = await self.target.get_latest_clean_record(sn)
        if not record:
            raise BotslabCommandError("Cannot clean rooms: no clean record available from 360 cloud")

        smart_area = record.get("smartArea")
        if not isinstance(smart_area, dict) or not smart_area.get("value"):
            raise BotslabCommandError(
                "Room partitioning (smartArea) is not supported by 360 S6 / legacy firmware. "
                "Please use full cleaning or zone cleaning (clean_zone) instead."
            )

        area_setting = copy.deepcopy(smart_area)
        area_setting["activeIds"] = int_room_ids
        area_setting["cleanTimes"] = repeat_times

        for room in area_setting.get("value", []):
            if room.get("id") in int_room_ids:
                room["cleanTimes"] = repeat_times
                if fan_speed and fan_speed in FAN_SPEEDS_HA_TO_360:
                    room["windMode"] = FAN_SPEEDS_HA_TO_360[fan_speed]
                if water_level and water_level in WATER_LEVEL_TO_INT:
                    room["waterPump"] = WATER_LEVEL_TO_INT[water_level]

        clean_id = str(record.get("cleanId") or f"{sn}-{int(time.time())}")
        task_id = str(uuid.uuid4())
        area_str = json.dumps(area_setting, separators=(",", ":"))

        url = f"{self.base_url}{EP_360_SET_AREA_AND_CLEANING}"
        headers = {
            **self._headers("application/x-www-form-urlencoded"),
            "User-Agent": LEGACY_360_ROOM_UA,
        }
        body = {
            "sn": sn,
            "cleanId": clean_id,
            "areaSetting": area_str,
            "taskid": task_id,
            "from": "mpc_and",
            "devType": "3",
            "channel_id": "Overseas",
            "appVer": "11.1.7",
            "lang": "en_US",
            "model": "sdk_gphone64_x86_64",
            "manufacturer": "Google",
        }

        try:
            async with self.session.post(
                url,
                data=body,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                res = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"Legacy 360 room cleaning request failed: {err}") from err

        self.target._check_360_errno(res, "setAreaAndCleaning")
        self._legacy_cached_status[sn] = STATUS_CLEANING
        _LOGGER.info(
            "Legacy 360 room cleaning started successfully on %s for rooms %s",
            sn,
            int_room_ids,
        )

    async def _clean_zone_legacy_360(
        self,
        sn: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) on legacy 360 via composite 30000 cmd (21023 + 21005)."""
        if fan_speed:
            await self.target.set_fan_speed(sn, "", fan_speed)

        record = await self.target.get_latest_clean_record(sn)
        map_id = int(record.get("mapId", 1)) if record else 1

        areas = []
        for i, z in enumerate(zones):
            x1, y1, x2, y2 = int(z[0]), int(z[1]), int(z[2]), int(z[3])
            vertices = [[x1, y1], [x1, y2], [x2, y2], [x2, y1]]
            areas.append({
                "vertexs": vertices,
                "active": "normal",
                "name": f"Area {i + 1}",
                "tag": "",
                "id": i + 1,
                "mode": "default",
            })

        payload = {
            "cmds": [
                {
                    "infoType": "21023",
                    "data": {
                        "mapId": map_id,
                        "cleanId": [-2],
                        "extraAreas": areas,
                    },
                },
                {
                    "infoType": "21005",
                    "data": {"mode": "reAppointClean"},
                },
            ],
            "mainCmds": ["21005"],
        }
        await self.target.send_legacy_360_cmd(sn, "30000", payload)
        self._legacy_cached_status[sn] = STATUS_CLEANING
        _LOGGER.info("Legacy 360 zone cleaning started on %s for %d zone(s)", sn, len(areas))

    async def start_clean(self, sn: str, product_key: str = "") -> None:
        """Start full/default cleaning operation on legacy 360."""
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_START, {"mode": "smartClean", "globalCleanTimes": 1}
        )
        self._legacy_cached_status[sn] = STATUS_CLEANING

    async def pause_clean(self, sn: str, product_key: str = "") -> None:
        """Pause current cleaning operation on legacy 360."""
        await self.target.send_legacy_360_cmd(sn, INFO_360_PAUSE, {"cmd": "pause"})
        self._legacy_cached_status[sn] = STATUS_PAUSED

    async def stop_clean(self, sn: str, product_key: str = "") -> None:
        """Stop cleaning and return to dock on legacy 360."""
        await self.target.return_to_dock(sn, product_key)

    async def resume_clean(self, sn: str, product_key: str = "") -> None:
        """Resume cleaning from pause on legacy 360."""
        await self.target.send_legacy_360_cmd(sn, INFO_360_PAUSE, {"cmd": "continue"})
        self._legacy_cached_status[sn] = STATUS_CLEANING

    async def return_to_dock(self, sn: str, product_key: str = "") -> None:
        """Send robot back to charging dock on legacy 360."""
        await self.target.send_legacy_360_cmd(sn, INFO_360_RETURN, {"cmd": "start"})
        self._legacy_cached_status[sn] = STATUS_RETURNING

    async def locate(self, sn: str, product_key: str = "") -> None:
        """Play locate sound on legacy 360 robot."""
        await self.target.send_legacy_360_cmd(sn, INFO_360_LOCATE, {"ctrlCode": 3010})

    async def set_fan_speed(self, sn: str, product_key: str, fan_speed: str) -> None:
        """Set vacuum suction power on legacy 360."""
        speed_cmd = FAN_SPEEDS_HA_TO_360.get(fan_speed, "auto")
        await self.target.send_legacy_360_cmd(sn, INFO_360_FAN_SPEED, {"cmd": speed_cmd})

    async def reset_consumable(self, sn: str, product_key: str, consumable: str) -> None:
        """Reset consumable life counter on legacy 360."""
        c_norm = str(consumable).lower().strip()
        if c_norm in ("filter", "hepa", "filter_life"):
            canonical = "filter"
        elif c_norm in ("main_brush", "mainbrush", "roll_brush", "brush", "main_brush_life"):
            canonical = "main_brush"
        elif c_norm in ("side_brush", "sidebrush", "edge_brush", "side_brush_life"):
            canonical = "side_brush"
        elif c_norm in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness", "sensor_life"):
            canonical = "sensor"
        else:
            canonical = c_norm

        await self.target.send_legacy_360_cmd(sn, INFO_360_RESET_CONSUMABLE, {"cmd": canonical})
        self._legacy_consumables.setdefault(sn, {})[canonical] = 0

    async def clean_rooms(
        self,
        sn: str,
        product_key: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
        **kwargs: Any,
    ) -> None:
        """Clean room(s) on legacy 360."""
        await self.target._clean_rooms_legacy_360(sn, room_ids, repeat_times, fan_speed, water_level)

    async def clean_zone(
        self,
        sn: str,
        product_key: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) on legacy 360."""
        await self.target._clean_zone_legacy_360(sn, zones, repeat_times, fan_speed, water_level)

    async def goto_target(self, sn: str, product_key: str, x: int, y: int) -> None:
        """Goto target on legacy 360 is unsupported."""
        raise BotslabCommandError(
            "Go to target is not supported on the legacy 360 cloud server"
        )

    async def set_water_level(self, sn: str, product_key: str, level: str | int) -> None:
        """Set water level on legacy 360."""
        val = WATER_LEVEL_TO_INT.get(str(level).lower(), int(level) if str(level).isdigit() else 2)
        try:
            await self.target.send_legacy_360_cmd(
                sn, INFO_360_SETTINGS, {"cmd": "setWaterPump", "value": val}
            )
        except Exception as err:
            _LOGGER.debug("Legacy 360 setWaterPump error: %s", err)

    async def set_mop_mode(self, sn: str, product_key: str, mode: str | int) -> None:
        """Set mop mode switching on legacy 360 (cmd 21024 setMopSwitch)."""
        mode_str = str(mode).lower()
        val = 2 if mode_str in ("2", "mop", "mop_only") else 1
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_SETTINGS, {"cmd": "setMopSwitch", "value": val}
        )

    async def set_auto_boost(self, sn: str, product_key: str, state: bool) -> None:
        """Set auto boost on legacy 360."""
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_SETTINGS, {"cmd": "setAutoBoost", "value": 1 if state else 0}
        )

    async def set_button_backlight(self, sn: str, product_key: str, state: bool) -> None:
        """Set button backlight on legacy 360."""
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_SETTINGS, {"cmd": "setLed", "value": 1 if state else 0}
        )

    async def set_collision_protection(self, sn: str, product_key: str, state: bool) -> None:
        """Set collision protection on legacy 360."""
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_SETTINGS, {"cmd": "setAntiCollision", "value": 1 if state else 0}
        )

    async def set_volume_level(self, sn: str, product_key: str, volume: int) -> None:
        """Set speaker voice volume on legacy 360."""
        level = max(0, min(10, round(volume / 10)))
        await self.target.send_legacy_360_cmd(
            sn, INFO_360_SETTINGS, {"cmd": "setVolume", "value": level}
        )

    async def set_no_go_zones(
        self,
        sn: str,
        product_key: str,
        map_id: int | str,
        places: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """No-go zones configuration is unsupported on legacy 360 cloud."""
        raise BotslabCommandError(
            "No-go zones configuration is not supported on the legacy 360 cloud server"
        )

    async def get_clean_track(
        self, sn: str, product_key: str, start_idx: int = 0
    ) -> dict[str, Any]:
        """Cleaning track is unsupported on legacy 360."""
        return {}

    async def get_clean_track_all(
        self, sn: str, product_key: str, max_points: int = 20000
    ) -> list[list[int]]:
        """Cleaning track all is unsupported on legacy 360."""
        return []

    async def get_firmware_version(self, sn: str, product_key: str) -> str:
        """Get firmware version from legacy device cache."""
        dev = self._legacy_device_cache.get(sn) or {}
        return str(
            dev.get("softversion")
            or dev.get("version")
            or dev.get("software_version")
            or dev.get("firmware_version")
            or "-"
        )
