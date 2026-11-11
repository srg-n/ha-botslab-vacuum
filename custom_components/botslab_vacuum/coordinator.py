"""DataUpdateCoordinator for Botslab Vacuum Robot integration."""
from __future__ import annotations

import asyncio
import base64
from dataclasses import dataclass
from datetime import timedelta
import json
import logging
import math
import time
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.issue_registry import IssueSeverity, async_create_issue, async_delete_issue
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import BotslabVacuumApi, working_status_to_state
from .const import (
    ACTIVE_SCAN_INTERVAL,
    ACTIVE_STATUSES,
    BATTERY_KEYS_360,
    CARPET_MODES,
    CONF_EMAIL,
    CONF_M2,
    CONF_PASSWORD,
    CONF_Q,
    CONF_QID,
    CONF_REGION,
    CONF_T,
    DEFAULT_POLL_INTERVAL_ACTIVE,
    DEFAULT_POLL_INTERVAL_IDLE,
    DEFAULT_SCAN_INTERVAL,
    DOMAIN,
    FAN_SPEEDS_360_TO_HA,
    INFO_360_CONSUMABLES,
    INT_TO_MOP_MODE,
    MAP_SYNC_DURATION,
    MAP_SYNC_KEEPALIVE_INTERVAL,
    MODE_TO_FAN_SPEED,
    STATION_STATUS_DRYING_MOP,
    STATION_STATUS_DUST_COLLECTING,
    STATION_STATUS_ERROR,
    STATION_STATUS_IDLE,
    STATION_STATUS_WASHING_MOP,
    STATUS_CLEANING,
    STATUS_ERROR,
    TANK_STATE_EMPTY,
    TANK_STATE_FULL,
    TANK_STATE_MISSING,
    TANK_STATE_OK,
)
from .models import (
    BotslabBaseStation,
    BotslabConsumableStatus,
    BotslabMapInfo,
    BotslabRoom,
    BotslabVacuumDevice,
)
from .qpush import BotslabChinaQPush, BotslabQPush
from .quc_login import BotslabAuthError, async_login

_LOGGER = logging.getLogger(__name__)

# Standard total lifespans in hours for vacuum robot consumables
FILTER_MAX_HOURS = 150.0
MAIN_BRUSH_MAX_HOURS = 300.0
SIDE_BRUSH_MAX_HOURS = 200.0
SENSOR_MAX_HOURS = 30.0


def _find_first_prop(
    props: dict[str, Any], keys: tuple[str, ...], default: Any = 100
) -> Any:
    """Return the first non-None property matching any candidate key."""
    for k in keys:
        if k in props and props[k] is not None:
            return props[k]
    return default


def _parse_consumable_lifetime(
    raw_val: Any, max_hours: float, is_legacy_360: bool | None = None
) -> tuple[int, float]:
    """Parse raw consumable value from robot into (life_pct, remaining_hours).

    Values > 100 represent elapsed (used) seconds since reset.
    Values <= 100 represent percentage remaining (or 0 for freshly reset counters in legacy 360).
    """
    try:
        val = float(raw_val)
    except (ValueError, TypeError):
        return 100, max_hours

    if math.isnan(val):
        return 100, max_hours

    if val < 0:
        return 0, 0.0

    # 0 handling: in legacy 360, 0 means 0 used seconds (freshly reset -> 100% remaining).
    # In modern Botslab, 0 means 0% life remaining (depleted).
    if val == 0:
        if is_legacy_360 is False:
            return 0, 0.0
        return 100, max_hours

    total_seconds = max_hours * 3600.0

    if val > 100:
        used_seconds = val
        remaining_seconds = max(0.0, total_seconds - used_seconds)
        life_pct = int(max(0, min(100, round((remaining_seconds / total_seconds) * 100))))
        remaining_hours = round(remaining_seconds / 3600.0, 1)
        return life_pct, remaining_hours

    # 0 < val <= 100: treated directly as percentage remaining
    life_pct = int(max(0, min(100, round(val))))
    remaining_hours = round((life_pct / 100.0) * max_hours, 1)
    return life_pct, remaining_hours


def _parse_base_station(info: Any) -> BotslabBaseStation:
    """Parse base station telemetry dictionary into BotslabBaseStation model."""
    if not info or not isinstance(info, dict):
        return BotslabBaseStation()

    res = info.get("data", {}).get("result") or info.get("result") or info
    if isinstance(res, str):
        try:
            res = json.loads(res)
        except Exception:
            res = {}
    if not isinstance(res, dict):
        res = {}

    raw_status = res.get("station_status", res.get("StationStatus", res.get("status", 0)))
    status_map = {
        0: STATION_STATUS_IDLE,
        1: STATION_STATUS_WASHING_MOP,
        2: STATION_STATUS_DRYING_MOP,
        3: STATION_STATUS_DUST_COLLECTING,
        4: STATION_STATUS_ERROR,
    }
    st_val = status_map.get(raw_status, str(raw_status).lower())
    if st_val not in (
        STATION_STATUS_IDLE,
        STATION_STATUS_WASHING_MOP,
        STATION_STATUS_DRYING_MOP,
        STATION_STATUS_DUST_COLLECTING,
        STATION_STATUS_ERROR,
    ):
        st_val = STATION_STATUS_IDLE

    # Clean water tank: 1=OK, 0=Empty, 2=Missing
    raw_cwt = res.get("clean_water_tank", res.get("CleanWaterTank", 1))
    cwt_map = {1: TANK_STATE_OK, 0: TANK_STATE_EMPTY, 2: TANK_STATE_MISSING}
    cwt_val = cwt_map.get(raw_cwt, TANK_STATE_OK if raw_cwt not in (0, 2) else str(raw_cwt))

    # Dirty water tank: 1=OK, 0=Full, 2=Missing
    raw_dwt = res.get("dirty_water_tank", res.get("DirtyWaterTank", 1))
    dwt_map = {1: TANK_STATE_OK, 0: TANK_STATE_FULL, 2: TANK_STATE_MISSING}
    dwt_val = dwt_map.get(raw_dwt, TANK_STATE_OK if raw_dwt not in (0, 2) else str(raw_dwt))

    # Dust bag status: 1=OK, 0=Full, 2=Missing
    raw_db = res.get("dust_bag_status", res.get("DustBagStatus", 1))
    db_map = {1: TANK_STATE_OK, 0: TANK_STATE_FULL, 2: TANK_STATE_MISSING}
    db_val = db_map.get(raw_db, TANK_STATE_OK if raw_db not in (0, 2) else str(raw_db))

    dry_remain = int(res.get("mop_dry_remain_time", res.get("MopDryRemainSeconds", 0)) or 0)

    return BotslabBaseStation(
        status=st_val,
        clean_water_tank=cwt_val,
        dirty_water_tank=dwt_val,
        dust_bag_status=db_val,
        mop_dry_remain_seconds=dry_remain,
    )


@dataclass(slots=True)
class BotslabRuntimeData:
    """Objects created for a config entry and shared with its platforms.

    Stored on ``ConfigEntry.runtime_data`` so platforms receive them through
    their own config entry instead of reaching into ``hass.data``.
    """

    api: BotslabVacuumApi
    coordinator: BotslabVacuumCoordinator
    qpush: BotslabQPush | BotslabChinaQPush | None = None
    qpush_task: asyncio.Task[None] | None = None


def _decode_room_name(raw_name: str) -> str:
    """Decode base64 encoded room names."""
    if not raw_name:
        return ""
    try:
        decoded = base64.b64decode(raw_name + "==").decode("utf-8").strip()
        return decoded or raw_name
    except Exception:
        return raw_name


class BotslabVacuumCoordinator(DataUpdateCoordinator[dict[str, BotslabVacuumDevice]]):
    """Coordinator to manage fetching data from Botslab cloud."""

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        api: BotslabVacuumApi,
        poll_interval_active: int = DEFAULT_POLL_INTERVAL_ACTIVE,
        poll_interval_idle: int = DEFAULT_POLL_INTERVAL_IDLE,
        enable_map: bool = True,
    ) -> None:
        # Start with active interval until first refresh determines robot state
        try:
            super().__init__(
                hass,
                _LOGGER,
                config_entry=entry,
                name=DOMAIN,
                update_interval=timedelta(seconds=poll_interval_active),
            )
        except TypeError:
            super().__init__(
                hass,
                _LOGGER,
                name=DOMAIN,
                update_interval=timedelta(seconds=poll_interval_active),
            )
        self.entry = entry
        self.api = api
        self.poll_interval_active = poll_interval_active
        self.poll_interval_idle = poll_interval_idle
        self.enable_map = enable_map
        self._rooms_cache: dict[str, list[BotslabRoom]] = {}
        self._map_cache: dict[str, bytes] = {}
        self._last_rendered_pose: dict[str, list[float] | None] = {}
        self._last_active_state: bool | None = None
        self._burst_poll_tasks: dict[str, asyncio.Task] = {}
        self._last_map_sync_time: dict[str, float] = {}
        self._firmware_cache: dict[str, str] = {}
        self._cleaning_paths: dict[str, list[list[int]]] = {}
        self._last_clean_status: dict[str, str] = {}
        self._map_version: dict[str, int] = {}
        self._dsl_cache: dict[str, dict[str, Any]] = {}
        self._saved_carpets: dict[str, list[dict[str, Any]]] = {}
        self._multi_maps_cache: dict[str, list[dict[str, Any]]] = {}

    def get_map_version(self, sn: str) -> int:
        """Return the current rendered map revision counter for a device."""
        return self._map_version.get(sn, 0)

    async def ensure_valid_session(self) -> None:
        """Ensure API has a valid session id and push alias, re-authenticating if necessary."""
        if self.api.sid and self.api.push_alias:
            return

        # 1. Try to mint a new session id using existing Q and T tokens first
        if self.api.q and self.api.t:
            try:
                _LOGGER.debug("Obtaining session sid using existing Q/T tokens...")
                await self.api.app_login()
                if self.api.sid and self.api.push_alias:
                    return
            except BotslabAuthError as err:
                _LOGGER.debug("Existing Q/T tokens expired or rejected: %s", err)
                self.api.sid = None
                self.api.push_alias = None

        # 2. Existing tokens are missing or expired; refresh them using email and password
        email = self.entry.data.get(CONF_EMAIL)
        password = self.entry.data.get(CONF_PASSWORD)
        region = self.entry.data.get(CONF_REGION, "eu1")
        m2 = self.entry.data.get(CONF_M2, self.api.m2)

        if email and password:
            _LOGGER.info("Refreshing Botslab session tokens using email/password...")
            tokens = await async_login(self.api.session, region, email, password, m2)
            self.api.q = tokens["q"]
            self.api.t = tokens["t"]
            if tokens.get("qid"):
                self.api.qid = tokens["qid"]

            # Update persisted tokens in config entry without triggering reload
            new_data = dict(self.entry.data)
            new_data[CONF_Q] = tokens["q"]
            new_data[CONF_T] = tokens["t"]
            if tokens.get("qid"):
                new_data[CONF_QID] = tokens["qid"]
            self.hass.config_entries.async_update_entry(self.entry, data=new_data)
        else:
            raise BotslabAuthError("No valid session tokens or credentials available")

        await self.api.app_login()

    async def _async_update_data(self) -> dict[str, BotslabVacuumDevice]:
        """Fetch data from Botslab IoT Cloud."""
        try:
            await self.ensure_valid_session()
        except BotslabAuthError as err:
            async_create_issue(
                self.hass,
                DOMAIN,
                f"reauth_required_{self.entry.entry_id}",
                is_fixable=True,
                issue_domain=DOMAIN,
                severity=IssueSeverity.ERROR,
                translation_key="reauth_required",
                translation_placeholders={"email": self.entry.data.get(CONF_EMAIL, "")},
                data={"entry_id": self.entry.entry_id},
            )
            raise ConfigEntryAuthFailed(f"Authentication failed: {err}") from err
        except Exception as err:
            raise UpdateFailed(f"Session setup failed: {err}") from err

        try:
            device_list = await self.api.get_devices()
        except BotslabAuthError as err:
            self.api.sid = None
            try:
                await self.ensure_valid_session()
                device_list = await self.api.get_devices()
            except BotslabAuthError:
                async_create_issue(
                    self.hass,
                    DOMAIN,
                    f"reauth_required_{self.entry.entry_id}",
                    is_fixable=True,
                    issue_domain=DOMAIN,
                    severity=IssueSeverity.ERROR,
                    translation_key="reauth_required",
                    translation_placeholders={"email": self.entry.data.get(CONF_EMAIL, "")},
                    data={"entry_id": self.entry.entry_id},
                )
                raise ConfigEntryAuthFailed(f"Authentication failed: {err}") from err
        except Exception as err:
            raise UpdateFailed(f"Error fetching device list: {err}") from err

        # Clear reauth issue on successful authentication
        async_delete_issue(self.hass, DOMAIN, f"reauth_required_{self.entry.entry_id}")

        device_map: dict[str, BotslabVacuumDevice] = {}

        for d in device_list:
            sn = str(d.get("device_name") or d.get("sn") or "")
            pk = str(d.get("product_key") or "")
            if not sn:
                continue

            try:
                props, _ = await self.api.get_property_extended(sn, pk)
            except Exception as err:
                _LOGGER.warning("Could not fetch properties for %s: %s", sn, err)
                props = {}

            # Fetch/cache firmware version for modern Botslab devices
            if (
                not self.api.is_legacy_360
                and self.api.session is not None
                and not getattr(self.api.session, "closed", False)
                and (sn not in self._firmware_cache or self._firmware_cache[sn] == "-")
            ):
                try:
                    self._firmware_cache[sn] = await self.api.get_firmware_version(sn, pk)
                except Exception:
                    self._firmware_cache[sn] = "-"
            if self._firmware_cache.get(sn) and self._firmware_cache[sn] != "-":
                props["firmware_version"] = self._firmware_cache[sn]
                props["sw_version"] = self._firmware_cache[sn]

            # Status and activity
            raw_status = None
            for skey in (
                "WorkingStatus",
                "TEST_WorkingStatus",
                "working_status",
                "mode",
                "workMode",
                "runStatus",
                "cleanMode",
            ):
                if skey in props and props[skey] is not None:
                    raw_status = props[skey]
                    break
            if raw_status is None and not self.api.is_legacy_360 and "status" in props:
                raw_status = props["status"]
            if raw_status is None:
                raw_status = "0"
            status = working_status_to_state(raw_status)

            # Battery (check standard BatteryLevel first, then 360 keys)
            battery = 100
            for bkey in ("BatteryLevel", *BATTERY_KEYS_360):
                if bkey in props and props[bkey] is not None:
                    try:
                        battery = int(props[bkey])
                        break
                    except (TypeError, ValueError):
                        continue

            # Clean time & area
            clean_time = int(
                props.get("TEST_CleaningTime", props.get("clean_time", props.get("clean_duration", 0)))
                or 0
            )
            clean_area = float(
                props.get("CleaningArea", props.get("clean_area", props.get("sweep_area", 0.0)))
                or 0.0
            )

            # Fan speed / Suction mode
            if "workNoisy" in props and props["workNoisy"] in FAN_SPEEDS_360_TO_HA:
                fan_speed = FAN_SPEEDS_360_TO_HA[props["workNoisy"]]
            else:
                suction_level = int(
                    props.get("SuctionPowLevel", props.get("suction_pow_level", props.get("fan_speed", 2)))
                    or 2
                )
                fan_speed = MODE_TO_FAN_SPEED.get(suction_level, "standard")

            # Mop & Water Settings
            water_level_int = int(props.get("PadWetness") or props.get("water_level") or 1)
            mop_mode_int = int(props.get("MopModeSwitching", 0) or 0)
            mop_mode_str = INT_TO_MOP_MODE.get(mop_mode_int, "vacuum_and_mop")
            if "MoppingPadInstalled" in props and props["MoppingPadInstalled"] is not None:
                try:
                    mop_installed: bool | None = bool(int(props["MoppingPadInstalled"]))
                except (ValueError, TypeError):
                    mop_installed = bool(props["MoppingPadInstalled"])
            elif "mopStatus" in props and props["mopStatus"] is not None:
                try:
                    mop_installed = bool(int(props["mopStatus"]) != 0)
                except (ValueError, TypeError):
                    mop_installed = bool(props["mopStatus"])
            elif "MopStatus" in props and props["MopStatus"] is not None:
                try:
                    mop_installed = bool(int(props["MopStatus"]) != 0)
                except (ValueError, TypeError):
                    mop_installed = bool(props["MopStatus"])
            else:
                mop_installed = None
            water_tank_installed = bool(props.get("WaterTankInstalled", True))

            # Hardware toggles
            auto_boost = bool(props.get("AutoBoost", True))
            button_backlight = bool(props.get("ButtonBacklight", True))
            collision_protection = bool(props.get("CollisionProtection", False))
            volume_level = int(props.get("VolumeLevel", 80) or 80)

            # Lifetime Metrics & Telemetry
            total_area = float(props.get("TotalCleaningArea", 0.0) or 0.0)
            total_time = int(props.get("TotalCleaningTime", 0) or 0)
            tasks_count = int(props.get("TasksTotalCount", 0) or 0)
            clean_sub_status = props.get("CleanSubStatus")
            current_loc = props.get("CurrentLocation")
            err_code = int(props.get("ErrorCode", 0) or 0)
            if self.api.is_legacy_360:
                if err_code > 0:
                    status = STATUS_ERROR
            else:
                if err_code > 0 or str(raw_status).strip().lower() in ("9", "introuble"):
                    status = STATUS_ERROR
            active_error_code = err_code if err_code > 0 else 0

            # Parse robot pose [x, y, angle]
            robot_pose: list[float] | None = None
            if isinstance(current_loc, str):
                try:
                    current_loc = json.loads(current_loc)
                except Exception:
                    pass
            if isinstance(current_loc, (list, tuple)):
                current_loc = list(current_loc)
                if len(current_loc) >= 2:
                    robot_pose = [float(x) for x in current_loc]

            raw_oss = props.get("MapPkgOssInfo")
            oss_dict = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
            map_id = str(oss_dict.get("MapID", ""))
            clean_id = str(oss_dict.get("CleanID", ""))

            # Consumables
            raw_filter = _find_first_prop(
                props,
                ("FilterLifeTime", "FilterLife", "filter_life", "filter_lifetime", "filter", "Filter"),
                100,
            )
            raw_main = _find_first_prop(
                props,
                (
                    "RollBrushLifeTime",
                    "MainBrushLifeTime",
                    "RollBrushLife",
                    "MainBrushLife",
                    "roll_brush_life",
                    "main_brush_life",
                    "main_brush",
                    "roll_brush",
                    "RollBrush",
                    "MainBrush",
                    "brush",
                ),
                100,
            )
            raw_side = _find_first_prop(
                props,
                (
                    "EdgeBrushLifeTime",
                    "SideBrushLifeTime",
                    "EdgeBrushLife",
                    "SideBrushLife",
                    "edge_brush_life",
                    "side_brush_life",
                    "side_brush",
                    "edge_brush",
                    "EdgeBrush",
                    "SideBrush",
                ),
                100,
            )
            raw_sensor = _find_first_prop(
                props,
                (
                    "SensorLifeTime",
                    "SensorCleanLife",
                    "SensorLife",
                    "sensor_life",
                    "sensor_clean_life",
                    "sensor",
                    "sensors",
                    "Sensor",
                ),
                100,
            )

            f_pct, f_hrs = _parse_consumable_lifetime(raw_filter, FILTER_MAX_HOURS, self.api.is_legacy_360)
            m_pct, m_hrs = _parse_consumable_lifetime(raw_main, MAIN_BRUSH_MAX_HOURS, self.api.is_legacy_360)
            s_pct, s_hrs = _parse_consumable_lifetime(raw_side, SIDE_BRUSH_MAX_HOURS, self.api.is_legacy_360)
            sens_pct, sens_hrs = _parse_consumable_lifetime(raw_sensor, SENSOR_MAX_HOURS, self.api.is_legacy_360)

            consumables = BotslabConsumableStatus(
                filter_life_pct=f_pct,
                main_brush_life_pct=m_pct,
                side_brush_life_pct=s_pct,
                sensor_clean_pct=sens_pct,
                filter_left_hours=f_hrs,
                main_brush_left_hours=m_hrs,
                side_brush_left_hours=s_hrs,
                sensor_left_hours=sens_hrs,
                filter_used_hours=round(max(0.0, FILTER_MAX_HOURS - f_hrs), 1),
                main_brush_used_hours=round(max(0.0, MAIN_BRUSH_MAX_HOURS - m_hrs), 1),
                side_brush_used_hours=round(max(0.0, SIDE_BRUSH_MAX_HOURS - s_hrs), 1),
                sensor_used_hours=round(max(0.0, SENSOR_MAX_HOURS - sens_hrs), 1),
            )

            # Live Map Image with Smart Adaptive Fetching & Live Overlays
            map_bytes: bytes | None = None
            dev_map_info: BotslabMapInfo | None = None
            dev_is_active = status in ACTIVE_STATUSES

            # Manage continuous live cleaning path accumulation (Dreame/Roborock style)
            prev_status = self._last_clean_status.get(sn)
            if dev_is_active and prev_status not in ACTIVE_STATUSES:
                # Started a fresh cleaning session: reset accumulated trail
                self._cleaning_paths[sn] = []
            self._last_clean_status[sn] = status

            # Accumulate current robot pose into running trail
            trail = self._cleaning_paths.setdefault(sn, [])
            if robot_pose and len(robot_pose) >= 2 and dev_is_active:
                rx_i, ry_i = int(round(robot_pose[0])), int(round(robot_pose[1]))
                if not trail:
                    trail.append([rx_i, ry_i])
                else:
                    lx, ly = trail[-1]
                    # Append if moved at least 20mm (2cm)
                    if (rx_i - lx) ** 2 + (ry_i - ly) ** 2 >= 400:
                        trail.append([rx_i, ry_i])
                        if len(trail) > 50000:
                            trail.pop(0)

            cleaning_path: list[list[int]] = list(trail)

            if dev_is_active:
                try:
                    cloud_track = await self.api.get_clean_track_all(sn, pk)
                    if cloud_track and len(cloud_track) > len(cleaning_path):
                        cleaning_path = cloud_track
                        self._cleaning_paths[sn] = list(cloud_track)
                except Exception as err:
                    _LOGGER.debug("Cleaning track fetch error for %s: %s", sn, err)

            pose_changed = False
            last_pose = self._last_rendered_pose.get(sn)
            if robot_pose is not None:
                if last_pose is None or any(
                    abs(a - b) > 5 for a, b in zip(robot_pose[:2], last_pose[:2])
                ):
                    pose_changed = True

            dev_map_info = self.api.get_cached_map_info(sn)

            is_zone_cleaning = (
                str(raw_status).strip().lower() in ("3", "cleaninzones")
                or str(props.get("WorkingStatus", "")).strip().lower() in ("3", "cleaninzones")
            )

            if self.enable_map:
                if (
                    dev_is_active
                    or pose_changed
                    or (sn not in self._map_cache)
                    or (dev_map_info is None)
                ):
                    try:
                        map_bytes = await self.api.get_live_map(
                            sn,
                            pk,
                            robot_pose=robot_pose,
                            cleaning_path=cleaning_path,
                            is_active=dev_is_active,
                            is_zone_cleaning=is_zone_cleaning,
                        )
                        if map_bytes:
                            if self._map_cache.get(sn) != map_bytes:
                                self._map_version[sn] = self._map_version.get(sn, 0) + 1
                            self._map_cache[sn] = map_bytes
                            if robot_pose:
                                self._last_rendered_pose[sn] = list(robot_pose)
                        else:
                            map_bytes = self._map_cache.get(sn)
                    except Exception as err:
                        _LOGGER.debug("Live map fetch error for %s: %s", sn, err)
                        map_bytes = self._map_cache.get(sn)
                else:
                    map_bytes = self._map_cache.get(sn)

            # Geometry is cached by the API even when the image was reused,
            # so map cards keep their calibration between refreshes.
            dev_map_info = self.api.get_cached_map_info(sn)

            # Synchronize Rooms from API cache or Map
            cached_rooms = self.api.get_cached_rooms(sn)
            if cached_rooms:
                self._rooms_cache[sn] = cached_rooms

            # 4-Tier Dynamic Capability Detection
            has_child_lock = False
            has_carpet_mode = False
            has_base_station = False
            has_dust_collection = False
            has_mop_wash = False
            has_mop_drying = False
            has_multi_map = False
            has_dnd = False

            if not self.api.is_legacy_360:
                # Tier 1: Shadow Properties Introspection
                if any(k in props for k in ("childLock", "ChildLock")):
                    has_child_lock = True
                if any(k in props for k in ("carpetMode", "CarpetMode", "AutoBoost")):
                    has_carpet_mode = True
                if any(k in props for k in ("notDisturb", "NotDisturb")):
                    has_dnd = True
                if any(k in props for k in ("multiMap", "multi_map", "MultiMap", "MapPkgOssInfo")):
                    has_multi_map = True

                if any(k in props for k in ("StartInDust", "dustCollectionMode", "autoDust", "DustBagStatus")):
                    has_dust_collection = True
                    has_base_station = True
                if any(k in props for k in ("StartMopWash", "mopWashInterval", "selfCleanMode", "CleanWaterTankState", "DirtyWaterTankState")):
                    has_mop_wash = True
                    has_base_station = True
                if any(k in props for k in ("StartDryMop", "dryingStatus", "hotAirDrying", "MopDryRemainSeconds")):
                    has_mop_drying = True
                    has_base_station = True
                if "BaseStationStatus" in props or "StationStatus" in props:
                    has_base_station = True

                # Tier 2: TSL DSL Schema Query
                if pk and pk not in self._dsl_cache:
                    try:
                        self._dsl_cache[pk] = await self.api.get_dsl(pk)
                    except Exception as dsl_err:
                        _LOGGER.debug("TSL DSL query failed for %s: %s", pk, dsl_err)
                        self._dsl_cache[pk] = {}

                dsl = self._dsl_cache.get(pk, {})
                services = [s.get("identifier") for s in dsl.get("services", [])] if isinstance(dsl.get("services"), list) else []
                properties = [p.get("identifier") for p in dsl.get("properties", [])] if isinstance(dsl.get("properties"), list) else []

                if "childLock" in properties:
                    has_child_lock = True
                if "carpetMode" in properties:
                    has_carpet_mode = True
                if "notDisturb" in properties:
                    has_dnd = True
                if "SetFromMap" in services or "multi_map_room_list" in services:
                    has_multi_map = True

                if "StartInDust" in services:
                    has_dust_collection = True
                    has_base_station = True
                if "StartMopWash" in services:
                    has_mop_wash = True
                    has_base_station = True
                if "StartDryMop" in services:
                    has_mop_drying = True
                    has_base_station = True
                if "GetStationInfo" in services or "BaseStationStatus" in properties:
                    has_base_station = True

                # Tier 3: Model-based heuristics fallback
                m_lower = str(d.get("model", "")).lower()
                title_lower = str(d.get("device_title", "")).lower()
                comb_name = f"{m_lower} {title_lower}"
                if any(w in comb_name for w in ("+", "plus", "k7", "s10 pro", "ultra")):
                    has_dust_collection = True
                    has_base_station = True
                if any(w in comb_name for w in ("k7", "s10")):
                    has_mop_wash = True
                    has_mop_drying = True
                    has_base_station = True
                # Modern sweepers default support for child_lock, carpet_mode, multi_map, dnd if not explicitly disproven
                if not dsl:
                    has_child_lock = True
                    has_carpet_mode = True
                    has_multi_map = True
                    has_dnd = True
            else:
                # Tier 4: Legacy 360 Models
                has_multi_map = True
                has_dnd = True

            # Query Base Station Telemetry if present
            base_station_telemetry = BotslabBaseStation()
            if has_base_station:
                try:
                    st_resp = await self.api.get_station_info(sn, pk)
                    base_station_telemetry = _parse_base_station(st_resp or props)
                except Exception as st_err:
                    _LOGGER.debug("Station info query failed for %s: %s", sn, st_err)
                    base_station_telemetry = _parse_base_station(props)

            # Query Multi-Floor Maps
            saved_maps: list[dict[str, Any]] = []
            if has_multi_map and not self.api.is_legacy_360:
                try:
                    mm_dict = await self.api.get_multi_maps(sn, pk)
                    if isinstance(mm_dict, dict) and "map_list" in mm_dict:
                        saved_maps = mm_dict["map_list"]
                        self._multi_maps_cache[sn] = saved_maps
                except Exception as mm_err:
                    _LOGGER.debug("Multi-map fetch failed for %s: %s", sn, mm_err)
                    saved_maps = self._multi_maps_cache.get(sn, [])

            # Child lock, DND, Carpet Mode
            child_lock = bool(props.get("childLock", props.get("ChildLock", False)))
            raw_dnd = props.get("notDisturb", props.get("NotDisturb", False))
            if isinstance(raw_dnd, dict):
                dnd_enabled = bool(raw_dnd.get("enabled", True))
                dnd_start = str(raw_dnd.get("start", "22:00"))
                dnd_end = str(raw_dnd.get("end", "08:00"))
            else:
                dnd_enabled = bool(raw_dnd)
                dnd_start = "22:00"
                dnd_end = "08:00"

            raw_c_mode = props.get("carpetMode", props.get("CarpetMode", 0))
            if isinstance(raw_c_mode, int):
                c_mode_int = raw_c_mode
            elif str(raw_c_mode).isdigit():
                c_mode_int = int(raw_c_mode)
            else:
                c_mode_int = 0

            dev = BotslabVacuumDevice(
                product_key=pk,
                device_name=sn,
                device_title=str(d.get("device_title") or d.get("name") or f"Botslab {sn[-4:]}"),
                online=bool(d.get("online", True)),
                category_key=str(d.get("category_key") or "clean"),
                model=str(d.get("model") or "Botslab S8"),
                raw=d,
                props=props,
                battery_level=battery,
                cleaning_time_minutes=(
                    int(clean_time // 60)
                    if clean_time > 0
                    else 0
                ),
                cleaned_area_sqm=round(clean_area / 100.0 if clean_area > 500 else clean_area, 1),
                status=status,
                fan_speed=fan_speed,
                consumables=consumables,
                rooms=self._rooms_cache.get(sn, []),
                mop_installed=mop_installed,
                water_tank_installed=water_tank_installed,
                water_level=water_level_int,
                mop_mode=mop_mode_str,
                auto_boost=auto_boost,
                button_backlight=button_backlight,
                collision_protection=collision_protection,
                volume_level=volume_level,
                current_map_id=map_id,
                clean_id=clean_id,
                error_code=active_error_code,
                total_cleaning_area_sqm=round(total_area, 1),
                total_cleaning_time_minutes=(
                    round(total_time / 60)
                    if total_time > 3600
                    else total_time
                ),
                tasks_total_count=tasks_count,
                clean_sub_status=str(clean_sub_status) if clean_sub_status is not None else None,
                current_location=current_loc if isinstance(current_loc, list) else None,
                dock_position=dev_map_info.dock_position if dev_map_info else None,
                no_go_zones=dev_map_info.no_go_zones if dev_map_info else [],
                cleaning_path=cleaning_path,
                robot_pose=robot_pose,
                map_image_bytes=map_bytes,
                map_info=dev_map_info,
                has_base_station=has_base_station,
                has_dust_collection=has_dust_collection,
                has_mop_wash=has_mop_wash,
                has_mop_drying=has_mop_drying,
                has_child_lock=has_child_lock,
                has_carpet_mode=has_carpet_mode,
                has_multi_map=has_multi_map,
                has_dnd=has_dnd,
                base_station=base_station_telemetry,
                child_lock=child_lock,
                dnd_enabled=dnd_enabled,
                dnd_start=dnd_start,
                dnd_end=dnd_end,
                carpet_mode=c_mode_int,
                saved_maps=saved_maps,
                saved_carpets=self._saved_carpets.get(sn, []),
            )
            device_map[sn] = dev

        # Two-stage dynamic polling interval & map sync keepalive watchdog
        now = time.time()
        any_active = any(d.status in ACTIVE_STATUSES for d in device_map.values())
        if any_active:
            self.update_interval = timedelta(seconds=ACTIVE_SCAN_INTERVAL)
        else:
            self.update_interval = timedelta(seconds=DEFAULT_SCAN_INTERVAL)

        if any_active != self._last_active_state:
            self._last_active_state = any_active
            _LOGGER.info(
                "Botslab vacuum active state changed (active=%s). "
                "Polling interval adjusted to %s seconds.",
                any_active,
                int(self.update_interval.total_seconds()),
            )

        for sn, dev in device_map.items():
            pk = dev.product_key
            if dev.status == STATUS_CLEANING:
                last_sync = self._last_map_sync_time.get(sn, 0.0)
                if now - last_sync >= MAP_SYNC_KEEPALIVE_INTERVAL:
                    try:
                        await self.api.start_sync_map_to_oss(
                            sn, pk, sync_duration=MAP_SYNC_DURATION
                        )
                        self._last_map_sync_time[sn] = now
                        _LOGGER.debug(
                            "Sent map sync keepalive to %s (watchdog=%ss)",
                            sn,
                            MAP_SYNC_DURATION,
                        )
                    except Exception as err:
                        _LOGGER.debug(
                            "Failed sending map sync keepalive for %s: %s", sn, err
                        )
            else:
                if self._last_map_sync_time.get(sn, 0.0) > 0:
                    try:
                        await self.api.stop_sync_map_to_oss(sn, pk)
                        _LOGGER.debug("Sent stop map sync to %s", sn)
                    except Exception as err:
                        _LOGGER.debug("Failed sending stop map sync for %s: %s", sn, err)
                    self._last_map_sync_time[sn] = 0.0

        # Remove stale devices from device registry
        try:
            device_registry = dr.async_get(self.hass)
            entry_devices = dr.async_entries_for_config_entry(
                device_registry, self.entry.entry_id
            )
            for dev_entry in entry_devices:
                for domain, sn in dev_entry.identifiers:
                    if domain == DOMAIN and sn not in device_map:
                        _LOGGER.info("Removing stale device %s from device registry", sn)
                        device_registry.async_remove_device(dev_entry.id)
                        break
        except Exception as err:
            _LOGGER.debug("Device registry cleanup skipped: %s", err)

        return device_map

    async def async_refresh_rooms(self, sn: str) -> list[BotslabRoom]:
        """Explicitly fetch latest room segmentation from active cloud map."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        rooms = await self.api.fetch_rooms(sn, pk)
        if rooms:
            self._rooms_cache[sn] = rooms
            if dev:
                dev.rooms = rooms
            self.async_set_updated_data(self.data)
        return rooms

    async def async_on_push(self, payload: dict[str, Any]) -> None:
        """Handle incoming real-time push event from QPush TCP socket."""
        _LOGGER.debug("QPush real-time event received: %s", payload)
        if payload.get("is_legacy_360") and "sn" in payload and "status" in payload:
            sn = str(payload["sn"])
            status_data = payload["status"]
            info_type = str(payload.get("info_type") or status_data.get("infoType") or "")

            # Detect consumables frame (21015) vs status frame (20001)
            is_consumables = (
                info_type == INFO_360_CONSUMABLES
                or any(k in status_data for k in ("filter", "main_brush", "side_brush", "sensor"))
            ) and not any(k in status_data for k in ("mode", "workMode", "elec", "elecReal", "cleanTime"))

            if is_consumables:
                if not hasattr(self.api, "_legacy_consumables"):
                    self.api._legacy_consumables = {}
                self.api._legacy_consumables.setdefault(sn, {}).update(status_data)
                _LOGGER.debug("Legacy 360 consumables frame stored for %s: %s", sn, status_data)
            else:
                self.api._legacy_live_status[sn] = status_data
                _LOGGER.debug("Legacy 360 push status frame stored for %s: %s", sn, status_data)

        # When a push event arrives (status change, map update, etc.), immediately refresh coordinator
        await self.async_request_refresh()

    async def reset_consumable(self, sn: str, consumable: str) -> None:
        """Reset consumable counter and optimistically update local device state."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.reset_consumable(sn, pk, consumable)

        # Optimistically update in-memory consumables
        if dev and dev.consumables:
            c_norm = str(consumable).lower().strip()
            if c_norm in ("filter", "hepa", "filter_life"):
                dev.consumables.filter_life_pct = 100
                dev.consumables.filter_left_hours = FILTER_MAX_HOURS
                dev.consumables.filter_used_hours = 0.0
            elif c_norm in ("main_brush", "mainbrush", "roll_brush", "brush", "main_brush_life"):
                dev.consumables.main_brush_life_pct = 100
                dev.consumables.main_brush_left_hours = MAIN_BRUSH_MAX_HOURS
                dev.consumables.main_brush_used_hours = 0.0
            elif c_norm in ("side_brush", "sidebrush", "edge_brush", "side_brush_life"):
                dev.consumables.side_brush_life_pct = 100
                dev.consumables.side_brush_left_hours = SIDE_BRUSH_MAX_HOURS
                dev.consumables.side_brush_used_hours = 0.0
            elif c_norm in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness", "sensor_life"):
                dev.consumables.sensor_clean_pct = 100
                dev.consumables.sensor_left_hours = SENSOR_MAX_HOURS
                dev.consumables.sensor_used_hours = 0.0
            self.async_set_updated_data(self.data)

    def watch_state_transition(
        self,
        sn: str,
        initial_status: str | None = None,
        max_attempts: int = 15,
        interval: float = 2.0,
    ) -> None:
        """Rapidly poll coordinator until robot status genuinely changes in the cloud."""
        old_task = self._burst_poll_tasks.get(sn)
        if old_task and not old_task.done():
            old_task.cancel()

        async def _loop() -> None:
            try:
                _LOGGER.debug(
                    "Watching state transition for %s (initial=%s, interval=%.1fs, max_attempts=%d)",
                    sn,
                    initial_status,
                    interval,
                    max_attempts,
                )
                for attempt in range(1, max_attempts + 1):
                    await asyncio.sleep(interval)
                    await self.async_refresh()
                    dev = self.data.get(sn) if self.data else None
                    cur_status = dev.status if dev else None
                    if initial_status and cur_status and cur_status != initial_status:
                        _LOGGER.debug(
                            "Transition detected for %s at attempt %d: %s -> %s",
                            sn,
                            attempt,
                            initial_status,
                            cur_status,
                        )
                        break
            except asyncio.CancelledError:
                _LOGGER.debug("State transition watch cancelled for %s", sn)
            except Exception as err:
                _LOGGER.debug("State transition watch error for %s: %s", sn, err)
            finally:
                self._burst_poll_tasks.pop(sn, None)

        self._burst_poll_tasks[sn] = self.hass.async_create_task(
            _loop(), name=f"watch_state_{sn}"
        )

    @property
    def routines(self) -> list[dict[str, Any]]:
        """Return list of saved cleaning routines from config entry options."""
        return list(self.entry.options.get("routines", []))

    async def save_routines(self, routines: list[dict[str, Any]]) -> None:
        """Persist updated routines to config entry options."""
        self.hass.config_entries.async_update_entry(
            self.entry, options={**self.entry.options, "routines": routines}
        )
        self.async_update_listeners()

    async def async_run_routine(self, routine: dict[str, Any]) -> None:
        """Execute a routine now (rooms+order+passes+suction, or whole-house)."""
        suction = routine.get("suction")
        passes = int(routine.get("passes") or 1)
        room_ids = [str(x) for x in (routine.get("room_ids") or [])]
        first_dev = next(iter(self.data.values()), None) if self.data else None
        if not first_dev:
            _LOGGER.warning("No vacuum available to run routine")
            return
        sn = first_dev.device_name
        pk = first_dev.product_key
        initial_status = first_dev.status
        if room_ids:
            await self.api.clean_rooms(
                sn=sn,
                product_key=pk,
                room_ids=room_ids,
                repeat_times=passes,
                fan_speed=suction if suction and suction != "auto" else None,
            )
        else:
            if suction and suction != "auto":
                await self.api.set_fan_speed(sn, pk, suction)
            await self.api.start_clean(sn, pk)
        await self.async_request_refresh()
        self.watch_state_transition(sn, initial_status=initial_status)

    def clear_map_cache(self, sn: str | None = None) -> None:
        """Invalidate map caches in both coordinator and API."""
        if sn:
            self._map_cache.pop(sn, None)
            self._last_rendered_pose.pop(sn, None)
            self._rooms_cache.pop(sn, None)
        else:
            self._map_cache.clear()
            self._last_rendered_pose.clear()
            self._rooms_cache.clear()
        self.api.clear_map_cache(sn)

    async def async_empty_dust_bin(self, sn: str) -> None:
        """Trigger base station dust collection."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.start_dust_collection(sn, pk)
        await self.async_request_refresh()

    async def async_wash_mop(self, sn: str, wash_type: int = 0) -> None:
        """Trigger base station mop washing."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.start_mop_wash(sn, pk, wash_type)
        await self.async_request_refresh()

    async def async_dry_mop(self, sn: str, duration_minutes: int = 120) -> None:
        """Trigger base station mop drying."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.start_mop_drying(sn, pk, duration_minutes)
        await self.async_request_refresh()

    async def async_set_carpet_mode(self, sn: str, mode: str | int) -> None:
        """Set carpet behavior mode (0: boost, 1: avoid while mopping, 2: ignore)."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        if isinstance(mode, str):
            c_int = CARPET_MODES.index(mode) if mode in CARPET_MODES else 0
        else:
            c_int = int(mode)
        await self.api.set_carpet_mode(sn, pk, c_int)
        if dev:
            dev.carpet_mode = c_int
            self.async_set_updated_data(self.data)
            # Re-sync virtual carpet bridge with the new carpet mode
            if dev.saved_carpets:
                await self.async_set_carpet_areas(sn, dev.saved_carpets)

    async def async_set_carpet_areas(self, sn: str, carpets: list[dict[str, Any]]) -> None:
        """Store virtual carpet polygons and bridge to no-go zones when mopping."""
        old_carpets = self._saved_carpets.get(sn, [])
        self._saved_carpets[sn] = carpets
        dev = self.data.get(sn) if self.data else None
        if dev:
            dev.saved_carpets = carpets
            if dev.current_map_id:
                # Helper to check if a zone matches a saved carpet
                def _matches_carpet(z: dict[str, Any], c_list: list[dict[str, Any]]) -> bool:
                    if z.get("type") != "mop":
                        return False
                    z_pts = z.get("points")
                    for c in c_list:
                        c_pts = c.get("points") or [c.get("x1", 0), c.get("y1", 0), c.get("x2", 0), c.get("y2", 0)]
                        if z_pts == c_pts:
                            return True
                    return False

                # Retain existing user non-carpet forbidden zones
                existing_zones = [
                    z for z in dev.no_go_zones
                    if not _matches_carpet(z, old_carpets)
                ]
                if dev.carpet_mode == 1 and dev.mop_mode in ("vacuum_and_mop", "mop_only"):
                    carpet_places = [
                        {
                            "type": "mop",
                            "points": c.get("points") or [c.get("x1", 0), c.get("y1", 0), c.get("x2", 0), c.get("y2", 0)],
                        }
                        for c in carpets
                    ]
                    to_send = existing_zones + carpet_places
                else:
                    # In dry vacuum mode or boost/ignore mode: remove virtual carpet no-mop zones
                    to_send = existing_zones
                try:
                    await self.api.set_no_go_zones(sn, dev.product_key, dev.current_map_id, to_send)
                except Exception as err:
                    _LOGGER.debug("Failed to bridge carpets into no-go zones for %s: %s", sn, err)
            self.async_set_updated_data(self.data)

    async def async_clear_carpet_areas(self, sn: str) -> None:
        """Clear all virtual carpet zones and restore original no-go zones."""
        old_carpets = self._saved_carpets.get(sn, [])
        self._saved_carpets[sn] = []
        dev = self.data.get(sn) if self.data else None
        if dev:
            dev.saved_carpets = []
            if dev.current_map_id:
                def _matches_carpet(z: dict[str, Any], c_list: list[dict[str, Any]]) -> bool:
                    if z.get("type") != "mop":
                        return False
                    z_pts = z.get("points")
                    for c in c_list:
                        c_pts = c.get("points") or [c.get("x1", 0), c.get("y1", 0), c.get("x2", 0), c.get("y2", 0)]
                        if z_pts == c_pts:
                            return True
                    return False

                non_carpet_zones = [
                    z for z in dev.no_go_zones
                    if not _matches_carpet(z, old_carpets)
                ]
                try:
                    await self.api.set_no_go_zones(
                        sn, dev.product_key, dev.current_map_id, non_carpet_zones
                    )
                except Exception as err:
                    _LOGGER.debug("Failed to clear bridged carpets on robot for %s: %s", sn, err)
            self.async_set_updated_data(self.data)

    async def async_set_child_lock(self, sn: str, enabled: bool) -> None:
        """Toggle physical button child lock."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.set_child_lock(sn, pk, enabled)
        if dev:
            dev.child_lock = enabled
            self.async_set_updated_data(self.data)

    async def async_set_dnd(
        self, sn: str, enabled: bool, start: str = "22:00", end: str = "08:00"
    ) -> None:
        """Configure Do Not Disturb quiet hours schedule."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.set_dnd(sn, pk, enabled, start=start, end=end)
        if dev:
            dev.dnd_enabled = enabled
            dev.dnd_start = start
            dev.dnd_end = end
            self.async_set_updated_data(self.data)

    async def async_switch_floor_map(self, sn: str, map_id: int | str) -> None:
        """Switch active floor map."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.switch_floor_map(sn, pk, map_id)
        await self.async_request_refresh()

    async def async_save_floor_map(self, sn: str, name: str) -> None:
        """Save current floor map."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.save_map(sn, pk, name)
        await self.async_request_refresh()

    async def async_delete_floor_map(self, sn: str, map_id: int | str) -> None:
        """Delete saved floor map."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.delete_map(sn, pk, map_id)
        await self.async_request_refresh()

    async def async_custom_clean_sequencing(
        self,
        sn: str,
        clean_order: list[dict[str, Any]],
        kitchen_toilet_last: bool = True,
    ) -> None:
        """Start custom clean in specified room order."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.start_custom_clean_sequencing(sn, pk, clean_order, kitchen_toilet_last)
        await self.async_request_refresh()

    async def async_remote_control_drive(
        self, sn: str, direction: int, speed: int = 250
    ) -> None:
        """Send directional movement pulse."""
        dev = self.data.get(sn) if self.data else None
        pk = dev.product_key if dev else ""
        await self.api.set_remote_control_mode(sn, pk, True)
        await self.api.send_remote_drive(sn, pk, direction, speed)
