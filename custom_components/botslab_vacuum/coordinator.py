"""DataUpdateCoordinator for Botslab Vacuum Robot integration."""
from __future__ import annotations

import asyncio
import base64
from dataclasses import dataclass
from datetime import timedelta
import json
import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed

from .api import BotslabVacuumApi, working_status_to_state
from .const import (
    ACTIVE_STATUSES,
    CONF_EMAIL,
    CONF_M2,
    CONF_PASSWORD,
    CONF_Q,
    CONF_REGION,
    CONF_T,
    DEFAULT_POLL_INTERVAL_ACTIVE,
    DEFAULT_POLL_INTERVAL_IDLE,
    DOMAIN,
    INT_TO_MOP_MODE,
    MODE_TO_FAN_SPEED,
)
from .models import BotslabConsumableStatus, BotslabMapInfo, BotslabRoom, BotslabVacuumDevice
from .qpush import BotslabQPush
from .quc_login import BotslabAuthError, async_login

_LOGGER = logging.getLogger(__name__)


@dataclass(slots=True)
class BotslabRuntimeData:
    """Objects created for a config entry and shared with its platforms.

    Stored on ``ConfigEntry.runtime_data`` so platforms receive them through
    their own config entry instead of reaching into ``hass.data``.
    """

    api: BotslabVacuumApi
    coordinator: BotslabVacuumCoordinator
    qpush: BotslabQPush
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
        self._last_active_state: bool | None = None

    async def ensure_valid_session(self) -> None:
        """Ensure API has a valid session id and push alias, re-authenticating if necessary."""
        if self.api.sid and self.api.push_alias:
            return

        email = self.entry.data.get(CONF_EMAIL)
        password = self.entry.data.get(CONF_PASSWORD)
        region = self.entry.data.get(CONF_REGION, "eu1")
        m2 = self.entry.data.get(CONF_M2, self.api.m2)

        if email and password:
            _LOGGER.info("Refreshing Botslab session tokens using email/password...")
            tokens = await async_login(self.api.session, region, email, password, m2)
            self.api.q = tokens["q"]
            self.api.t = tokens["t"]

            # Update persisted tokens in config entry without triggering reload
            new_data = dict(self.entry.data)
            new_data[CONF_Q] = tokens["q"]
            new_data[CONF_T] = tokens["t"]
            self.hass.config_entries.async_update_entry(self.entry, data=new_data)
        else:
            _LOGGER.debug("Refreshing Botslab session sid using existing tokens...")

        await self.api.app_login()

    async def _async_update_data(self) -> dict[str, BotslabVacuumDevice]:
        """Fetch data from Botslab IoT Cloud."""
        try:
            await self.ensure_valid_session()
        except BotslabAuthError as err:
            raise UpdateFailed(f"Authentication failed: {err}") from err
        except Exception as err:
            raise UpdateFailed(f"Session setup failed: {err}") from err

        try:
            device_list = await self.api.get_devices()
        except BotslabAuthError:
            self.api.sid = None
            await self.ensure_valid_session()
            device_list = await self.api.get_devices()
        except Exception as err:
            raise UpdateFailed(f"Error fetching device list: {err}") from err

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

            # Status and activity
            raw_status = (
                props.get("WorkingStatus")
                or props.get("TEST_WorkingStatus")
                or props.get("working_status")
                or props.get("status")
                or "0"
            )
            status = working_status_to_state(raw_status)

            # Battery
            battery = int(props.get("BatteryLevel", props.get("battery", 100)) or 100)

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
            suction_level = int(
                props.get("SuctionPowLevel", props.get("suction_pow_level", props.get("fan_speed", 2)))
                or 2
            )
            fan_speed = MODE_TO_FAN_SPEED.get(suction_level, "standard")

            # Mop & Water Settings
            water_level_int = int(props.get("PadWetness", 1) or 1)
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

            raw_oss = props.get("MapPkgOssInfo")
            oss_dict = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
            map_id = str(oss_dict.get("MapID", ""))
            clean_id = str(oss_dict.get("CleanID", ""))

            # Consumables
            consumables = BotslabConsumableStatus(
                filter_life_pct=int(props.get("FilterLifeTime", props.get("filter_life", 100)) or 100),
                main_brush_life_pct=int(props.get("RollBrushLifeTime", props.get("main_brush_life", 100)) or 100),
                side_brush_life_pct=int(props.get("EdgeBrushLifeTime", props.get("side_brush_life", 100)) or 100),
                sensor_clean_pct=int(props.get("SensorLifeTime", props.get("sensor_life", 100)) or 100),
            )

            # Live Map Image with Smart Adaptive Fetching
            map_bytes: bytes | None = None
            dev_map_info: BotslabMapInfo | None = None
            if self.enable_map:
                dev_is_active = status in ACTIVE_STATUSES
                if dev_is_active or (sn not in self._map_cache):
                    try:
                        map_bytes = await self.api.get_live_map(sn, pk)
                        if map_bytes:
                            self._map_cache[sn] = map_bytes
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
                cleaning_time_minutes=clean_time,
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
                error_code=err_code,
                total_cleaning_area_sqm=round(total_area / 100.0 if total_area > 500 else total_area, 1),
                total_cleaning_time_minutes=total_time,
                tasks_total_count=tasks_count,
                clean_sub_status=str(clean_sub_status) if clean_sub_status is not None else None,
                current_location=current_loc if isinstance(current_loc, list) else None,
                map_image_bytes=map_bytes,
                map_info=dev_map_info,
            )
            device_map[sn] = dev

        # Adaptive Polling Interval Adjustment
        any_active = any(d.status in ACTIVE_STATUSES for d in device_map.values())
        if any_active != self._last_active_state:
            self._last_active_state = any_active
            new_interval = timedelta(
                seconds=self.poll_interval_active if any_active else self.poll_interval_idle
            )
            self.update_interval = new_interval
            _LOGGER.info(
                "Botslab vacuum state changed (active=%s). "
                "Adaptive polling interval adjusted to %s seconds.",
                any_active,
                int(new_interval.total_seconds()),
            )

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
        # When a push event arrives (status change, map update, etc.), immediately refresh coordinator
        await self.async_request_refresh()
