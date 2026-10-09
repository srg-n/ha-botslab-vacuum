"""Number platform for Botslab vacuum robot configuration."""
from __future__ import annotations

from collections.abc import Callable, Coroutine
from dataclasses import dataclass
from typing import Any

from homeassistant.components.number import NumberEntity, NumberEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice


@dataclass(frozen=True, kw_only=True)
class BotslabNumberEntityDescription(NumberEntityDescription):
    """Describes Botslab number entity."""
    value_fn: Callable[[BotslabVacuumDevice], float | None]
    set_fn: Callable[[BotslabVacuumCoordinator, BotslabVacuumDevice, float], Coroutine[Any, Any, None]]


NUMBER_DESCRIPTIONS: tuple[BotslabNumberEntityDescription, ...] = (
    BotslabNumberEntityDescription(
        key="volume_level",
        translation_key="volume_level",
        native_min_value=0,
        native_max_value=100,
        native_step=5,
        native_unit_of_measurement=PERCENTAGE,
        icon="mdi:volume-high",
        entity_category=EntityCategory.CONFIG,
        value_fn=lambda dev: float(dev.volume_level),
        set_fn=lambda coord, dev, val: coord.api.set_volume_level(
            dev.device_name, dev.product_key, int(val)
        ),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab number entities."""
    coordinator = entry.runtime_data.coordinator
    entities = [
        BotslabNumber(coordinator, device, desc)
        for device in coordinator.data.values()
        for desc in NUMBER_DESCRIPTIONS
    ]
    async_add_entities(entities)


class BotslabNumber(BotslabVacuumEntity, NumberEntity):
    """Representation of a Botslab numeric setting."""

    entity_description: BotslabNumberEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabNumberEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key

    @property
    def native_value(self) -> float | None:
        """Return the entity value."""
        if not self.device:
            return None
        return self.entity_description.value_fn(self.device)

    async def async_set_native_value(self, value: float) -> None:
        """Set new value."""
        if not self.device:
            return
        await self.entity_description.set_fn(self.coordinator, self.device, value)
        await self.coordinator.async_request_refresh()
