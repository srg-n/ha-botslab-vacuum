"""Diagnostics support for Botslab Vacuum integration (secrets redacted)."""
from __future__ import annotations

from typing import Any
from homeassistant.components.diagnostics import async_redact_data
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntry

from .const import (
    CONF_EMAIL,
    CONF_M2,
    CONF_PASSWORD,
    CONF_Q,
    CONF_QID,
    CONF_T,
    DOMAIN,
)

_REDACT = {CONF_PASSWORD, CONF_Q, CONF_T, CONF_EMAIL, CONF_M2, CONF_QID, "qid", "push_alias", "sid"}

# Device/account identifiers that must never appear in a shared diagnostics download
_DEVICE_REDACT = ("product_key", "device_title", "device_name", "serial_number")


def _serialize_device(dev: Any) -> dict[str, Any]:
    """Serialize a BotslabVacuumDevice snapshot with all identifiers redacted."""
    return async_redact_data(
        {
            "product_key": dev.product_key,
            "device_title": dev.device_title,
            "online": dev.online,
            "model": dev.model,
            "status": dev.status,
            "error_code": dev.error_code,
            "battery_level": dev.battery_level,
            "cleaning_time_minutes": dev.cleaning_time_minutes,
            "cleaned_area_sqm": dev.cleaned_area_sqm,
            "fan_speed": dev.fan_speed,
            "mop_mode": dev.mop_mode,
            "water_level": dev.water_level,
            "rooms_count": len(dev.rooms),
            "saved_maps_count": len(dev.saved_maps),
            "current_map_id": dev.current_map_id,
            "no_go_zones_count": len(dev.no_go_zones),
            "has_map": dev.map_image_bytes is not None,
            "has_base_station": dev.has_base_station,
            "has_multi_map": dev.has_multi_map,
        },
        _DEVICE_REDACT,
    )


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return redacted diagnostics for a config entry."""
    runtime = getattr(entry, "runtime_data", None)
    coordinator = runtime.coordinator if runtime else None
    devices = []

    if coordinator and coordinator.data:
        for dev in coordinator.data.values():
            devices.append(_serialize_device(dev))

    return {
        "entry_data": async_redact_data(dict(entry.data), _REDACT),
        "options": dict(entry.options),
        "device_count": len(devices),
        "devices": devices,
        "qpush_active": runtime.qpush is not None if runtime else False,
    }


async def async_get_device_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry, device: DeviceEntry
) -> dict[str, Any]:
    """Return redacted diagnostics for a single Botslab vacuum device."""
    runtime = getattr(entry, "runtime_data", None)
    coordinator = runtime.coordinator if runtime else None
    serial = next(
        (identifier for domain, identifier in device.identifiers if domain == DOMAIN),
        None,
    )
    dev = coordinator.data.get(serial) if (coordinator and coordinator.data and serial) else None
    return {
        "options": dict(entry.options),
        "qpush_active": runtime.qpush is not None if runtime else False,
        "device": _serialize_device(dev) if dev is not None else None,
    }
