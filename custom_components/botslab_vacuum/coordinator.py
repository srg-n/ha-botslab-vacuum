"""DataUpdateCoordinator for Botslab Vacuum Robot integration."""
from __future__ import annotations

import asyncio
import base64
from dataclasses import dataclass
from datetime import timedelta
import json
import logging
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
    INT_TO_MOP_MODE,
    MAP_SYNC_DURATION,
    MAP_SYNC_KEEPALIVE_INTERVAL,
    MODE_TO_FAN_SPEED,
    STATUS_CLEANING,
    STATUS_ERROR,
)
from .models import BotslabConsumableStatus, BotslabMapInfo, BotslabRoom, BotslabVacuumDevice
from .qpush import BotslabChinaQPush, BotslabQPush
from .quc_login import BotslabAuthError, async_login

_LOGGER = logging.getLogger(__name__)

# Standard total lifespans in hours for vacuum robot consumables
FILTER_MAX_HOURS = 150.0
MAIN_BRUSH_MAX_HOURS = 300.0
SIDE_BRUSH_MAX_HOURS = 200.0
SENSOR_MAX_HOURS = 30.0


def _parse_consumable_lifetime(
    raw_val: Any, max_hours: float, is_legacy_360: bool = False
) -> tuple[int, float]:
    """Parse raw consumable value from robot into (life_pct, remaining_hours).

    If raw_val is in seconds (> 100):
      remaining_hours = round(val / 3600.0, 1)
      life_pct = clamp(round((val / (max_hours * 3600.0)) * 100), 0, 100)
    If raw_val is already a percentage (<= 100):
      life_pct = clamp(round(val), 0, 100)
      remaining_hours = round((life_pct / 100.0) * max_hours, 1)
    """
    try:
        val = float(raw_val)
    except (ValueError, TypeError):
        return 100, max_hours

    if val < 0:
        return 0, 0.0

    if val > 100:
        remaining_hours = round(val / 3600.0, 1)
        total_seconds = max_hours * 3600.0
        life_pct = int(max(0, min(100, round((val / total_seconds) * 100))))
        return life_pct, remaining_hours

    life_pct = int(max(0, min(100, round(val))))
    remaining_hours = round((life_pct / 100.0) * max_hours, 1)
    return life_pct, remaining_hours


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
            mop_installed = bool(props.get("MoppingPadInstalled", False))
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
            raw_filter = props.get("FilterLifeTime", props.get("filter_life", 100))
            raw_main = props.get("RollBrushLifeTime", props.get("main_brush_life", 100))
            raw_side = props.get("EdgeBrushLifeTime", props.get("side_brush_life", 100))
            raw_sensor = props.get("SensorLifeTime", props.get("sensor_life", 100))

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
            cleaning_path: list[list[int]] = []

            if dev_is_active:
                try:
                    cleaning_path = await self.api.get_clean_track_all(sn, pk)
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

            if self.enable_map:
                if (
                    dev_is_active
                    or pose_changed
                    or (sn not in self._map_cache)
                    or (dev_map_info is None)
                ):
                    try:
                        map_bytes = await self.api.get_live_map(
                            sn, pk, robot_pose=robot_pose, cleaning_path=cleaning_path
                        )
                        if map_bytes:
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
                    round(clean_time / 60)
                    if self.api.is_legacy_360 and clean_time > 0
                    else clean_time
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
            self.api._legacy_live_status[sn] = status_data
            _LOGGER.debug("Legacy 360 push status stored for %s: %s", sn, status_data)
        # When a push event arrives (status change, map update, etc.), immediately refresh coordinator
        await self.async_request_refresh()

    def watch_state_transition(
        self,
        sn: str,
        initial_status: str | None = None,
        max_attempts: int = 8,
        interval: float = 1.5,
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
