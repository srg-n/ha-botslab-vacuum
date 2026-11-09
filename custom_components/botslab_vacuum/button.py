"""Button platform for Botslab vacuum actions."""
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
import logging
from typing import Any, Awaitable, Final

from homeassistant.components.button import ButtonEntity, ButtonEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.entity_platform import AddEntitiesCallback

_LOGGER = logging.getLogger(__name__)

from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice

PARALLEL_UPDATES: Final = 0


@dataclass(frozen=True, kw_only=True)
class BotslabButtonEntityDescription(ButtonEntityDescription):
    """Describes a Botslab button entity."""
    press_fn: Callable[
        [HomeAssistant, BotslabVacuumCoordinator, BotslabVacuumDevice], Awaitable[Any]
    ]


BUTTON_DESCRIPTIONS: tuple[BotslabButtonEntityDescription, ...] = (
    BotslabButtonEntityDescription(
        key="locate",
        translation_key="locate",
        icon="mdi:map-marker-question",
        press_fn=lambda _hass, coord, dev: coord.api.locate(dev.device_name, dev.product_key),
    ),
    BotslabButtonEntityDescription(
        key="refresh_rooms",
        translation_key="refresh_rooms",
        icon="mdi:floor-plan",
        press_fn=lambda _hass, coord, dev: coord.async_refresh_rooms(dev.device_name),
    ),
    BotslabButtonEntityDescription(
        key="sync_map",
        translation_key="sync_map",
        icon="mdi:cloud-sync",
        press_fn=lambda _hass, coord, dev: coord.api.start_map_sync(dev.device_name, dev.product_key, 60),
    ),
    BotslabButtonEntityDescription(
        key="reset_filter",
        translation_key="reset_filter",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "filter"),
    ),
    BotslabButtonEntityDescription(
        key="reset_main_brush",
        translation_key="reset_main_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "main_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_side_brush",
        translation_key="reset_side_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "side_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_sensors",
        translation_key="reset_sensors",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "sensor"),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab button entities."""
    coordinator = entry.runtime_data.coordinator
    entities = []
    for device in coordinator.data.values():
        for desc in BUTTON_DESCRIPTIONS:
            entities.append(BotslabButton(coordinator, device, desc))
    async_add_entities(entities)


class BotslabButton(BotslabVacuumEntity, ButtonEntity):
    """Botslab button entity."""

    entity_description: BotslabButtonEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabButtonEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key

    async def async_press(self) -> None:
        """Handle button press."""
        if not self.device:
            return
        await self.entity_description.press_fn(self.hass, self.coordinator, self.device)
        if not self.entity_description.key.startswith("reset_"):
            await self.coordinator.async_request_refresh()
