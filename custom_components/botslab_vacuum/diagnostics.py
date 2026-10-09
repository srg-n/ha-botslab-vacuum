"""Diagnostics support for Botslab Vacuum integration (secrets redacted)."""
from __future__ import annotations

from typing import Any
from homeassistant.components.diagnostics import async_redact_data
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_EMAIL,
    CONF_M2,
    CONF_PASSWORD,
    CONF_Q,
    CONF_T,
)

_REDACT = {CONF_PASSWORD, CONF_Q, CONF_T, CONF_EMAIL, CONF_M2, "push_alias", "sid"}

# Device/account identifiers that must never appear in a shared diagnostics download
_DEVICE_REDACT = ("product_key", "device_title", "device_name", "serial_number")


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: ConfigEntry
) -> dict[str, Any]:
    """Return redacted diagnostics for a config entry."""
    runtime = getattr(entry, "runtime_data", None)
    coordinator = runtime.coordinator if runtime else None
    devices = []

    if coordinator and coordinator.data:
        for dev in coordinator.data.values():
            devices.append(
                async_redact_data(
                    {
                        "product_key": dev.product_key,
                        "device_title": dev.device_title,
                        "online": dev.online,
                        "model": dev.model,
                        "status": dev.status,
                        "battery_level": dev.battery_level,
                        "cleaning_time_minutes": dev.cleaning_time_minutes,
                        "cleaned_area_sqm": dev.cleaned_area_sqm,
                        "fan_speed": dev.fan_speed,
                        "rooms_count": len(dev.rooms),
                        "has_map": dev.map_image_bytes is not None,
                    },
                    _DEVICE_REDACT,
                )
            )

    return {
        "entry_data": async_redact_data(dict(entry.data), _REDACT),
        "options": dict(entry.options),
        "device_count": len(devices),
        "devices": devices,
        "qpush_active": runtime.qpush is not None if runtime else False,
    }
