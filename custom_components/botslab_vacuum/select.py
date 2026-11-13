"""Select platform for Botslab vacuum robot modes and water levels."""
from __future__ import annotations

from collections.abc import Callable, Coroutine
from dataclasses import dataclass
from typing import Any, Final

from homeassistant.components.select import SelectEntity, SelectEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import (
    CARPET_MODES,
    INT_TO_WATER_LEVEL,
    MOP_MODES,
    WATER_LEVELS,
)
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice, floor_map_entries

PARALLEL_UPDATES: Final = 0


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
    BotslabSelectEntityDescription(
        key="carpet_mode",
        translation_key="carpet_mode",
        icon="mdi:rug",
        options=CARPET_MODES,
        current_fn=lambda dev: (
            CARPET_MODES[dev.carpet_mode]
            if isinstance(dev.carpet_mode, int) and 0 <= dev.carpet_mode < len(CARPET_MODES)
            else str(dev.carpet_mode)
        ),
        select_fn=lambda coord, dev, option: coord.async_set_carpet_mode(
            dev.device_name, option
        ),
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab select entities."""
    coordinator = entry.runtime_data.coordinator
    if coordinator.api.is_legacy_360:
        return
    entities = []
    for device in coordinator.data.values():
        for desc in SELECT_DESCRIPTIONS:
            if desc.key == "carpet_mode" and not device.has_carpet_mode:
                continue
            entities.append(BotslabSelect(coordinator, device, desc))
        if device.has_multi_map:
            entities.append(BotslabActiveFloorSelect(coordinator, device))
    async_add_entities(entities)


class BotslabActiveFloorSelect(BotslabVacuumEntity, SelectEntity):
    """Select entity for switching active floor maps."""

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
    ) -> None:
        super().__init__(coordinator, device)
        self._attr_unique_id = f"{device.device_name}_selected_map"
        self._attr_translation_key = "selected_map"
        self._attr_icon = "mdi:layers-triple-outline"

    @property
    def options(self) -> list[str]:
        """Return list of available floor map names."""
        if not self.device:
            return ["Default Map"]
        entries = floor_map_entries(self.device.saved_maps, self.device.current_map_id)
        return [entry["name"] for entry in entries] or ["Default Map"]

    @property
    def current_option(self) -> str | None:
        """Return currently active map name."""
        if not self.device:
            return None
        if not self.device.saved_maps:
            if self.device.current_map_id:
                return f"Map {self.device.current_map_id}"
            return self.options[0]
        cur_id = str(self.device.current_map_id)
        cur_clean_id = str(self.device.clean_id)
        current = None
        for entry, m in zip(floor_map_entries(self.device.saved_maps), self.device.saved_maps):
            m_id = str(m.get("map_id", ""))
            m_clean = str(m.get("clean_id", ""))
            if (cur_id and m_id == cur_id) or (cur_clean_id and m_clean == cur_clean_id) or m.get("is_cur") == 1:
                current = entry["name"]
        return current or self.options[0]

    async def async_select_option(self, option: str) -> None:
        """Switch active floor to selected map."""
        if not self.device:
            return
        target_id = None
        for entry, m in zip(floor_map_entries(self.device.saved_maps), self.device.saved_maps):
            if entry["name"] == option:
                target_id = m.get("clean_id") or m.get("map_id")
                break
        if target_id is not None:
            await self.coordinator.async_switch_floor_map(self.device.device_name, target_id)


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
