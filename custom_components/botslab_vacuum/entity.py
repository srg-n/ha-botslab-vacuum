"""Base entity for Botslab vacuum devices."""
from __future__ import annotations

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, MANUFACTURER
from .coordinator import BotslabVacuumCoordinator
from .models import BotslabVacuumDevice


class BotslabVacuumEntity(CoordinatorEntity[BotslabVacuumCoordinator]):
    """Common base for all Botslab vacuum entities."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: BotslabVacuumCoordinator, device: BotslabVacuumDevice) -> None:
        """Initialize the entity."""
        super().__init__(coordinator)
        self._device_sn = device.device_name
        sw_version = (
            device.props.get("firmware_version")
            or device.props.get("sw_version")
            or device.raw.get("softversion")
            or device.raw.get("version")
            or None
        )
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, self._device_sn)},
            manufacturer=MANUFACTURER,
            name=device.device_title,
            model=device.model,
            serial_number=self._device_sn,
            sw_version=str(sw_version) if sw_version else None,
        )

    @property
    def device(self) -> BotslabVacuumDevice | None:
        """Return the current device snapshot from coordinator data."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get(self._device_sn)

    @property
    def available(self) -> bool:
        """Return True if coordinator is successful and device is known."""
        return super().available and self.device is not None and self.device.online
