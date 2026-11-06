"""Binary sensor platform for Botslab vacuum robots."""
from __future__ import annotations

from typing import Any, Final

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import ERROR_CODE_DESCRIPTIONS, STATUS_ERROR
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice

PARALLEL_UPDATES: Final = 0


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab binary sensor entities."""
    coordinator = entry.runtime_data.coordinator
    async_add_entities(
        BotslabProblemBinarySensor(coordinator, device)
        for device in coordinator.data.values()
    )


class BotslabProblemBinarySensor(BotslabVacuumEntity, BinarySensorEntity):
    """Binary sensor that indicates whether the robot is in an error or problem state."""

    _attr_device_class = BinarySensorDeviceClass.PROBLEM
    _attr_has_entity_name = True
    _attr_translation_key = "problem"

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
    ) -> None:
        super().__init__(coordinator, device)
        self._attr_unique_id = f"{device.device_name}_problem"

    @property
    def is_on(self) -> bool:
        """Return True if the vacuum has an active fault or error."""
        if not self.device:
            return False
        has_error_code = bool(self.device.error_code and self.device.error_code > 0)
        is_error_status = str(self.device.status).lower() in (
            STATUS_ERROR,
            "error",
            "fault",
            "warn",
            "introuble",
        )
        return has_error_code or is_error_status

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return error details as attributes."""
        if not self.device:
            return {"error_code": 0, "error_type": "Normal"}
        code = self.device.error_code or 0
        error_desc = ERROR_CODE_DESCRIPTIONS.get(
            code, f"Error {code}" if code else "Normal"
        )
        return {
            "error_code": code,
            "error_type": error_desc,
            "status": self.device.status,
        }
