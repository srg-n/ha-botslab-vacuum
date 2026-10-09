"""Select platform for Botslab vacuum robot modes and water levels."""
from __future__ import annotations

from collections.abc import Callable, Coroutine
from dataclasses import dataclass
from typing import Any

from homeassistant.components.select import SelectEntity, SelectEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    DOMAIN,
    INT_TO_WATER_LEVEL,
    MOP_MODES,
    WATER_LEVELS,
)
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice


@dataclass(frozen=True, kw_only=True)
class BotslabSelectEntityDescription(SelectEntityDescription):
    """Describes Botslab select entity."""
    current_fn: Callable[[BotslabVacuumDevice], str | None]
    select_fn: Callable[[BotslabVacuumCoordinator, BotslabVacuumDevice, str], Coroutine[Any, Any, None]]


SELECT_DESCRIPTIONS: tuple[BotslabSelectEntityDescription, ...] = (
    BotslabSelectEntityDescription(
        key="water_level",
        translation_key="water_level",
        icon="mdi:water",
        options=WATER_LEVELS,
        current_fn=lambda dev: INT_TO_WATER_LEVEL.get(dev.water_level, "low"),
        select_fn=lambda coord, dev, option: coord.api.set_water_level(
            dev.device_name, dev.product_key, option
        ),
    ),
    BotslabSelectEntityDescription(
        key="mop_mode",
        translation_key="mop_mode",
        icon="mdi:spray-bottle",
        options=MOP_MODES,
        current_fn=lambda dev: dev.mop_mode,
        select_fn=lambda coord, dev, option: coord.api.set_mop_mode(
            dev.device_name, dev.product_key, option
        ),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab select entities."""
    coordinator: BotslabVacuumCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    entities = [
        BotslabSelect(coordinator, device, desc)
        for device in coordinator.data.values()
        for desc in SELECT_DESCRIPTIONS
    ]
    async_add_entities(entities)


class BotslabSelect(BotslabVacuumEntity, SelectEntity):
    """Representation of a Botslab select control."""

    entity_description: BotslabSelectEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabSelectEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key
        self._attr_options = description.options

    @property
    def current_option(self) -> str | None:
        """Return the selected entity option."""
        if not self.device:
            return None
        return self.entity_description.current_fn(self.device)

    async def async_select_option(self, option: str) -> None:
        """Change the selected option."""
        if not self.device or option not in self.entity_description.options:
            return
        await self.entity_description.select_fn(self.coordinator, self.device, option)
        await self.coordinator.async_request_refresh()
