"""Switch platform for Botslab vacuum robot toggles."""
from __future__ import annotations

from collections.abc import Callable, Coroutine
from dataclasses import dataclass
from typing import Any

from homeassistant.components.switch import SwitchEntity, SwitchEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice


@dataclass(frozen=True, kw_only=True)
class BotslabSwitchEntityDescription(SwitchEntityDescription):
    """Describes Botslab switch entity."""
    is_on_fn: Callable[[BotslabVacuumDevice], bool]
    set_fn: Callable[[BotslabVacuumCoordinator, BotslabVacuumDevice, bool], Coroutine[Any, Any, None]]


SWITCH_DESCRIPTIONS: tuple[BotslabSwitchEntityDescription, ...] = (
    BotslabSwitchEntityDescription(
        key="auto_boost",
        translation_key="auto_boost",
        icon="mdi:fan-plus",
        is_on_fn=lambda dev: dev.auto_boost,
        set_fn=lambda coord, dev, state: coord.api.set_auto_boost(
            dev.device_name, dev.product_key, state
        ),
    ),
    BotslabSwitchEntityDescription(
        key="button_backlight",
        translation_key="button_backlight",
        icon="mdi:lightbulb-outline",
        entity_category=EntityCategory.CONFIG,
        is_on_fn=lambda dev: dev.button_backlight,
        set_fn=lambda coord, dev, state: coord.api.set_button_backlight(
            dev.device_name, dev.product_key, state
        ),
    ),
    BotslabSwitchEntityDescription(
        key="collision_protection",
        translation_key="collision_protection",
        icon="mdi:shield-car",
        entity_category=EntityCategory.CONFIG,
        is_on_fn=lambda dev: dev.collision_protection,
        set_fn=lambda coord, dev, state: coord.api.set_collision_protection(
            dev.device_name, dev.product_key, state
        ),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab switch entities."""
    coordinator: BotslabVacuumCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    entities = [
        BotslabSwitch(coordinator, device, desc)
        for device in coordinator.data.values()
        for desc in SWITCH_DESCRIPTIONS
    ]
    async_add_entities(entities)


class BotslabSwitch(BotslabVacuumEntity, SwitchEntity):
    """Representation of a Botslab switch toggle."""

    entity_description: BotslabSwitchEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabSwitchEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key

    @property
    def is_on(self) -> bool:
        """Return true if switch is on."""
        if not self.device:
            return False
        return self.entity_description.is_on_fn(self.device)

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn switch on."""
        if not self.device:
            return
        await self.entity_description.set_fn(self.coordinator, self.device, True)
        await self.coordinator.async_request_refresh()

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn switch off."""
        if not self.device:
            return
        await self.entity_description.set_fn(self.coordinator, self.device, False)
        await self.coordinator.async_request_refresh()
