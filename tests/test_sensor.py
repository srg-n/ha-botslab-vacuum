"""Sensor platform: values, device classes and statistics metadata."""
from __future__ import annotations

import pytest
from homeassistant.const import PERCENTAGE, UnitOfArea, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from custom_components.botslab_vacuum.const import DOMAIN

from .conftest import TEST_SN, make_config_entry, patch_api, setup_entry, state_for

EXPECTED_STATE_CLASS = {
    "battery": "measurement",
    "clean_time": "measurement",
    "clean_area": "measurement",
    "total_clean_area": "total_increasing",
    "total_clean_time": "total_increasing",
    # A bare counter has no unit, so it must not opt into statistics.
    "tasks_count": None,
}


async def _setup(hass: HomeAssistant):
    patch_api()
    await setup_entry(hass, make_config_entry())
    return hass


async def test_vacuum_entity_present(hass: HomeAssistant) -> None:
    """The robot shows up as a vacuum entity."""
    await _setup(hass)
    state = state_for(hass, "vacuum", "vacuum")
    assert state is not None
    assert state.state == "docked"


@pytest.mark.parametrize("key,expected_state", EXPECTED_STATE_CLASS.items())
async def test_state_classes(
    hass: HomeAssistant, key: str, expected_state: str
) -> None:
    """State classes match what the values actually represent."""
    await _setup(hass)
    state = state_for(hass, "sensor", key)
    assert state is not None

    # A sensor opted into long-term statistics exposes state_class; one that is
    # not opted in must not claim one.
    if expected_state is None:
        assert "state_class" not in state.attributes
    else:
        assert state.attributes.get("state_class") == expected_state


async def test_area_sensors_expose_area_device_class(hass: HomeAssistant) -> None:
    """Area sensors declare the AREA device class so units convert."""
    await _setup(hass)
    registry = er.async_get(hass)

    for key in ("clean_area", "total_clean_area"):
        entity_id = registry.async_get_entity_id("sensor", DOMAIN, f"{TEST_SN}_{key}")
        assert entity_id is not None, f"{key} missing"

        state = hass.states.get(entity_id)
        assert state is not None
        assert state.attributes.get("device_class") == "area"
        assert state.attributes.get("unit_of_measurement") == UnitOfArea.SQUARE_METERS


async def test_duration_sensor_uses_minutes(hass: HomeAssistant) -> None:
    """Duration sensors report minutes with the DURATION device class."""
    await _setup(hass)
    state = state_for(hass, "sensor", "total_clean_time")
    assert state is not None
    assert state.state == "900"
    assert state.attributes.get("device_class") == "duration"
    assert state.attributes.get("unit_of_measurement") == UnitOfTime.MINUTES


async def test_counter_has_no_state_class(hass: HomeAssistant) -> None:
    """A bare counter must not claim a total, because it has no unit."""
    await _setup(hass)
    state = state_for(hass, "sensor", "tasks_count")
    assert state is not None
    assert state.state == "12"
    assert "state_class" not in state.attributes
    assert "unit_of_measurement" not in state.attributes


async def test_battery_value_and_class(hass: HomeAssistant) -> None:
    """Battery reports the cloud value with the battery device class."""
    await _setup(hass)
    state = state_for(hass, "sensor", "battery")
    assert state is not None
    assert state.state == "88"
    assert state.attributes.get("device_class") == "battery"
    assert state.attributes.get("unit_of_measurement") == PERCENTAGE


async def test_consumables_reported(hass: HomeAssistant) -> None:
    """Each consumable lifetime is exposed separately."""
    await _setup(hass)
    expected = {
        "filter_life": "80",
        "main_brush_life": "70",
        "side_brush_life": "60",
        "sensor_dirtiness": "50",
    }
    for key, value in expected.items():
        state = state_for(hass, "sensor", key)
        assert state is not None, f"{key} missing"
        assert state.state == value


async def test_entities_have_unique_ids(hass: HomeAssistant) -> None:
    """Every entity is uniquely identified."""
    await _setup(hass)
    entry = next(iter(hass.config_entries.async_entries(DOMAIN)))
    registry = er.async_get(hass)

    entities = er.async_entries_for_config_entry(registry, entry.entry_id)
    assert entities, "no entities were registered"
    for entity in entities:
        assert entity.unique_id, f"{entity.entity_id} has no unique id"

    unique_ids = [e.unique_id for e in entities]
    assert len(unique_ids) == len(set(unique_ids)), "duplicate unique ids"