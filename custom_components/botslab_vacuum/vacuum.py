"""Home Assistant StateVacuumEntity platform for Botslab."""
from __future__ import annotations

import logging
from typing import Any, Final

from homeassistant.components.vacuum import (
    StateVacuumEntity,
    VacuumActivity,
    VacuumEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    FAN_SPEEDS,
    STATUS_CLEANING,
    STATUS_DOCKED,
    STATUS_ERROR,
    STATUS_IDLE,
    STATUS_PAUSED,
    STATUS_RETURNING,
)
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice, floor_map_entries

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES: Final = 0

# Battery is deliberately absent. Home Assistant 2026.10 removed
# VacuumEntityFeature.BATTERY and dropped battery_level from
# StateVacuumEntity entirely, so referencing either one makes this module fail
# to import and takes the whole config entry down with it. The battery is
# published as its own sensor with SensorDeviceClass.BATTERY instead, which is
# how Home Assistant expects battery to be exposed.
_FEATURES = (
    VacuumEntityFeature.START
    | VacuumEntityFeature.STOP
    | VacuumEntityFeature.PAUSE
    | VacuumEntityFeature.RETURN_HOME
    | VacuumEntityFeature.STATE
    | VacuumEntityFeature.FAN_SPEED
    | VacuumEntityFeature.LOCATE
)

_ACTIVITY_MAP: dict[str, VacuumActivity] = {
    STATUS_CLEANING: VacuumActivity.CLEANING,
    STATUS_DOCKED: VacuumActivity.DOCKED,
    STATUS_PAUSED: VacuumActivity.PAUSED,
    STATUS_IDLE: VacuumActivity.IDLE,
    STATUS_RETURNING: VacuumActivity.RETURNING,
    STATUS_ERROR: VacuumActivity.ERROR,
}


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab vacuum entities from config entry."""
    coordinator = entry.runtime_data.coordinator
    entities = [
        BotslabVacuumRobot(coordinator, device)
        for device in coordinator.data.values()
    ]
    async_add_entities(entities)


class BotslabVacuumRobot(BotslabVacuumEntity, StateVacuumEntity):
    """Botslab StateVacuumEntity."""

    _attr_supported_features = _FEATURES
    _attr_fan_speed_list = FAN_SPEEDS

    def __init__(self, coordinator: BotslabVacuumCoordinator, device: BotslabVacuumDevice) -> None:
        super().__init__(coordinator, device)
        self._attr_unique_id = f"{device.device_name}_vacuum"
        self._attr_name = None  # Inherit device name

    @property
    def activity(self) -> VacuumActivity | None:
        """Return the current vacuum activity."""
        if not self.device:
            return None
        return _ACTIVITY_MAP.get(self.device.status, VacuumActivity.IDLE)

    @property
    def fan_speed(self) -> str | None:
        """Return the current suction power mode."""
        return self.device.fan_speed if self.device else None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        if not self.device:
            return {}
        dev = self.device
        return {
            # Battery & live stats for botslab-vacuum-map-card
            "battery": dev.battery_level,
            "battery_level": dev.battery_level,
            "cleaned_area": dev.cleaned_area_sqm,
            "cleaned_area_sqm": dev.cleaned_area_sqm,
            "cleaning_area": dev.cleaned_area_sqm,
            "cleaning_time": dev.cleaning_time_minutes,
            "cleaning_time_minutes": dev.cleaning_time_minutes,
            "total_cleaning_time_minutes": dev.total_cleaning_time_minutes,
            "total_cleaning_area_sqm": dev.total_cleaning_area_sqm,
            "total_cleaned_area": dev.total_cleaning_area_sqm,
            "total_cleaning_time": dev.total_cleaning_time_minutes,
            "tasks_total_count": dev.tasks_total_count,
            "cleaning_count": dev.tasks_total_count,
            # Device Info & Network for botslab-vacuum-map-card
            "firmware_version": dev.props.get("firmware_version") or dev.props.get("sw_version") or dev.raw.get("softversion") or dev.raw.get("version") or "-",
            "sw_version": dev.props.get("firmware_version") or dev.props.get("sw_version") or dev.raw.get("softversion") or dev.raw.get("version") or "-",
            "ap": dev.props.get("ap") or {
                "ssid": dev.props.get("wifi_ssid") or dev.raw.get("ssid") or "-",
                "rssi": dev.props.get("wifi_rssi") or dev.raw.get("rssi") or "-",
                "ip": dev.props.get("ip") or dev.raw.get("ip") or dev.raw.get("devIp") or "-",
            },
            "wifi_ssid": dev.props.get("wifi_ssid") or dev.raw.get("ssid") or "-",
            "wifi_rssi": dev.props.get("wifi_rssi") or dev.raw.get("rssi") or "-",
            "ip_address": dev.ip_address or dev.props.get("ip") or dev.raw.get("ip") or dev.raw.get("devIp") or "-",
            # Consumable percentages (0 - 100)
            "filter_life_pct": dev.consumables.filter_life_pct,
            "main_brush_life_pct": dev.consumables.main_brush_life_pct,
            "side_brush_life_pct": dev.consumables.side_brush_life_pct,
            "sensor_life_pct": dev.consumables.sensor_clean_pct,
            # Card consumable percentage aliases
            "filter_left": dev.consumables.filter_life_pct,
            "main_brush_left": dev.consumables.main_brush_life_pct,
            "side_brush_left": dev.consumables.side_brush_life_pct,
            "sensor_dirty_left": dev.consumables.sensor_clean_pct,
            # Card consumable remaining hours aliases
            "filter_time_left": dev.consumables.filter_left_hours,
            "main_brush_time_left": dev.consumables.main_brush_left_hours,
            "side_brush_time_left": dev.consumables.side_brush_left_hours,
            "sensor_dirty_time_left": dev.consumables.sensor_left_hours,
            # Backward-compatible hour aliases
            "filter_left_hours": dev.consumables.filter_left_hours,
            "main_brush_left_hours": dev.consumables.main_brush_left_hours,
            "side_brush_left_hours": dev.consumables.side_brush_left_hours,
            "sensor_dirty_left_hours": dev.consumables.sensor_left_hours,
            "status": dev.status,
            "water_level": dev.water_level,
            "mop_mode": dev.mop_mode,
            "auto_boost": dev.auto_boost,
            "button_backlight": dev.button_backlight,
            "collision_protection": dev.collision_protection,
            "volume_level": dev.volume_level,
            "mopping_pad_installed": dev.mop_installed,
            "water_tank_installed": dev.water_tank_installed,
            "current_map_id": dev.current_map_id,
            "maps": floor_map_entries(dev.saved_maps, dev.current_map_id),
            "selected_map_id": int(dev.current_map_id) if (dev.current_map_id and str(dev.current_map_id).isdigit()) else dev.current_map_id,
            "selected_map": int(dev.current_map_id) if (dev.current_map_id and str(dev.current_map_id).isdigit()) else dev.current_map_id,
            "clean_id": dev.clean_id,
            "clean_sub_status": dev.clean_sub_status,
            "current_location": dev.current_location,
            "cleaning_path": dev.cleaning_path,
            "robot_pose": dev.robot_pose,
            "dock_position": dev.dock_position,
            "no_go_zones": dev.no_go_zones,
            "error_code": dev.error_code,
            "available_rooms": [
                {"id": r.room_id, "name": r.name, "outline": [list(p) for p in r.outline]}
                for r in dev.rooms
            ],
            "serial_number": dev.device_name,
            "product_key": dev.product_key,
        }

    async def async_start(self) -> None:
        """Start or resume cleaning."""
        if not self.device:
            return
        initial_status = self.device.status
        if self.activity == VacuumActivity.PAUSED and self.device.status == STATUS_PAUSED:
            await self.coordinator.api.resume_clean(self.device.device_name, self.device.product_key)
        else:
            await self.coordinator.api.start_clean(self.device.device_name, self.device.product_key)
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_pause(self) -> None:
        """Pause cleaning."""
        if not self.device:
            return
        initial_status = self.device.status
        await self.coordinator.api.pause_clean(self.device.device_name, self.device.product_key)
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_stop(self, **kwargs: Any) -> None:
        """Stop cleaning and return to charging dock."""
        await self.async_return_to_base(**kwargs)

    async def async_return_to_base(self, **kwargs: Any) -> None:
        """Send the vacuum back to its charging dock."""
        if not self.device:
            return
        initial_status = self.device.status
        await self.coordinator.api.return_to_dock(self.device.device_name, self.device.product_key)
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_locate(self, **kwargs: Any) -> None:
        """Play sound on robot to locate it."""
        if not self.device:
            return
        await self.coordinator.api.locate(self.device.device_name, self.device.product_key)

    async def async_set_fan_speed(self, fan_speed: str, **kwargs: Any) -> None:
        """Set fan speed (quiet, standard, powerful, max)."""
        if not self.device or fan_speed not in FAN_SPEEDS:
            return
        await self.coordinator.api.set_fan_speed(
            self.device.device_name, self.device.product_key, fan_speed
        )
        await self.coordinator.async_request_refresh()

    async def async_clean_rooms(
        self,
        room_ids: list[str] | None = None,
        room_names: list[str] | None = None,
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
        rooms_config: dict[int | str, dict[str, Any]] | list[dict[str, Any]] | None = None,
        auto_order: bool = False,
    ) -> None:
        """Clean specific room(s) by ID or name with optional water level."""
        if not self.device:
            return
        selected_ids = list(room_ids or [])
        if room_names and self.device.rooms:
            name_map = {r.name.lower(): r.room_id for r in self.device.rooms}
            for name in room_names:
                rid = name_map.get(name.lower().strip())
                if rid and rid not in selected_ids:
                    selected_ids.append(rid)

        if not selected_ids:
            raise ServiceValidationError("clean_rooms called with no valid room IDs or matching room names")

        initial_status = self.device.status
        await self.coordinator.api.clean_rooms(
            self.device.device_name,
            self.device.product_key,
            selected_ids,
            repeat_times,
            fan_speed or self.fan_speed,
            water_level,
            rooms_config=rooms_config,
            auto_order=auto_order,
        )
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_clean_zone(
        self,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) with optional water level."""
        if not self.device or not zones:
            return
        initial_status = self.device.status
        await self.coordinator.api.clean_zone(
            self.device.device_name,
            self.device.product_key,
            zones,
            repeat_times,
            fan_speed or self.fan_speed,
            water_level,
        )
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_goto_location(self, x: int, y: int) -> None:
        """Command the vacuum to navigate to specific coordinates."""
        if not self.device:
            return
        initial_status = self.device.status
        await self.coordinator.api.goto_target(
            self.device.device_name, self.device.product_key, x, y
        )
        await self.coordinator.async_request_refresh()
        self.coordinator.watch_state_transition(self.device.device_name, initial_status=initial_status)

    async def async_set_water_level(self, water_level: str) -> None:
        """Set water pump flow rate (low, medium, high)."""
        if not self.device:
            return
        await self.coordinator.api.set_water_level(
            self.device.device_name, self.device.product_key, water_level
        )
        await self.coordinator.async_request_refresh()

    async def async_set_mop_mode(self, mop_mode: str) -> None:
        """Set mop mode switching."""
        if not self.device:
            return
        await self.coordinator.api.set_mop_mode(
            self.device.device_name, self.device.product_key, mop_mode
        )
        await self.coordinator.async_request_refresh()

    async def async_refresh_rooms(self) -> None:
        """Explicitly fetch room segmentation from active map."""
        if not self.device:
            return
        await self.coordinator.async_refresh_rooms(self.device.device_name)


# Alias for backward compatibility
BotslabVacuum = BotslabVacuumRobot
