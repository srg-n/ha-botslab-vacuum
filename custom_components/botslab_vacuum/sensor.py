"""Sensor platform for Botslab vacuum robot metrics & consumables."""
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorEntityDescription,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import PERCENTAGE, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice


@dataclass(frozen=True, kw_only=True)
class BotslabSensorEntityDescription(SensorEntityDescription):
    """Describes Botslab sensor entity."""
    value_fn: Callable[[BotslabVacuumDevice], Any]


SENSOR_DESCRIPTIONS: tuple[BotslabSensorEntityDescription, ...] = (
    BotslabSensorEntityDescription(
        key="battery",
        translation_key="battery",
        native_unit_of_measurement=PERCENTAGE,
        device_class=SensorDeviceClass.BATTERY,
        state_class=SensorStateClass.MEASUREMENT,
        value_fn=lambda dev: dev.battery_level,
    ),
    BotslabSensorEntityDescription(
        key="clean_time",
        translation_key="clean_time",
        native_unit_of_measurement=UnitOfTime.MINUTES,
        device_class=SensorDeviceClass.DURATION,
        state_class=SensorStateClass.MEASUREMENT,
        icon="mdi:timer-outline",
        value_fn=lambda dev: dev.cleaning_time_minutes,
    ),
    BotslabSensorEntityDescription(
        key="clean_area",
        translation_key="clean_area",
        native_unit_of_measurement="m²",
        state_class=SensorStateClass.MEASUREMENT,
        icon="mdi:texture-box",
        value_fn=lambda dev: dev.cleaned_area_sqm,
    ),
    BotslabSensorEntityDescription(
        key="filter_life",
        translation_key="filter_life",
        native_unit_of_measurement=PERCENTAGE,
        entity_category=EntityCategory.DIAGNOSTIC,
        icon="mdi:air-filter",
        value_fn=lambda dev: dev.consumables.filter_life_pct,
    ),
    BotslabSensorEntityDescription(
        key="main_brush_life",
        translation_key="main_brush_life",
        native_unit_of_measurement=PERCENTAGE,
        entity_category=EntityCategory.DIAGNOSTIC,
        icon="mdi:brush",
        value_fn=lambda dev: dev.consumables.main_brush_life_pct,
    ),
    BotslabSensorEntityDescription(
        key="side_brush_life",
        translation_key="side_brush_life",
        native_unit_of_measurement=PERCENTAGE,
        entity_category=EntityCategory.DIAGNOSTIC,
        icon="mdi:fan",
        value_fn=lambda dev: dev.consumables.side_brush_life_pct,
    ),
    BotslabSensorEntityDescription(
        key="sensor_dirtiness",
        translation_key="sensor_dirtiness",
        native_unit_of_measurement=PERCENTAGE,
        entity_category=EntityCategory.DIAGNOSTIC,
        icon="mdi:radar",
        value_fn=lambda dev: dev.consumables.sensor_clean_pct,
    ),
    BotslabSensorEntityDescription(
        key="total_clean_area",
        translation_key="total_clean_area",
        native_unit_of_measurement="m²",
        state_class=SensorStateClass.TOTAL_INCREASING,
        icon="mdi:chart-areaspline",
        value_fn=lambda dev: dev.total_cleaning_area_sqm,
    ),
    BotslabSensorEntityDescription(
        key="total_clean_time",
        translation_key="total_clean_time",
        native_unit_of_measurement=UnitOfTime.MINUTES,
        device_class=SensorDeviceClass.DURATION,
        state_class=SensorStateClass.TOTAL_INCREASING,
        icon="mdi:history",
        value_fn=lambda dev: dev.total_cleaning_time_minutes,
    ),
    BotslabSensorEntityDescription(
        key="tasks_count",
        translation_key="tasks_count",
        state_class=SensorStateClass.TOTAL_INCREASING,
        icon="mdi:counter",
        value_fn=lambda dev: dev.tasks_total_count,
    ),
    BotslabSensorEntityDescription(
        key="clean_id",
        translation_key="clean_id",
        icon="mdi:identifier",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda dev: dev.clean_id,
    ),
    BotslabSensorEntityDescription(
        key="error_code",
        translation_key="error_code",
        icon="mdi:alert-circle-outline",
        entity_category=EntityCategory.DIAGNOSTIC,
        value_fn=lambda dev: dev.error_code,
    ),
    BotslabSensorEntityDescription(
        key="mop_installed",
        translation_key="mop_installed",
        icon="mdi:water-check",
        value_fn=lambda dev: "installed" if dev.mop_installed else "removed",
    ),
    BotslabSensorEntityDescription(
        key="water_tank_installed",
        translation_key="water_tank_installed",
        icon="mdi:cup-water",
        value_fn=lambda dev: "installed" if dev.water_tank_installed else "removed",
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab sensor entities."""
    coordinator: BotslabVacuumCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    entities = []
    for device in coordinator.data.values():
        for description in SENSOR_DESCRIPTIONS:
            entities.append(BotslabSensor(coordinator, device, description))
    async_add_entities(entities)


class BotslabSensor(BotslabVacuumEntity, SensorEntity):
    """Botslab sensor entity."""

    entity_description: BotslabSensorEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabSensorEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key

    @property
    def native_value(self) -> Any:
        """Return sensor value."""
        if not self.device:
            return None
        return self.entity_description.value_fn(self.device)
