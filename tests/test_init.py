"""Setup, unload and runtime_data behaviour."""
from __future__ import annotations

from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant

from custom_components.botslab_vacuum.const import DOMAIN, PLATFORMS

from .conftest import TEST_SN, make_config_entry, patch_api, setup_entry


async def test_setup_creates_runtime_data(hass: HomeAssistant) -> None:
    """A set up entry exposes its shared objects on runtime_data."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    runtime = entry.runtime_data
    assert runtime is not None
    assert runtime.coordinator is not None
    assert runtime.api is not None
    assert runtime.qpush is not None


async def test_setup_registers_all_platforms(hass: HomeAssistant) -> None:
    """Every platform declared in const is actually forwarded."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    # Loading succeeded, which only happens if all platforms resolve.
    assert entry.state is ConfigEntryState.LOADED
    assert len(PLATFORMS) == 7


async def test_entities_created_for_every_platform(hass: HomeAssistant) -> None:
    """Each platform contributes at least one entity for the robot."""
    patch_api()
    await setup_entry(hass, make_config_entry())

    states = hass.states.async_all()
    domains = {s.domain for s in states if f"_{TEST_SN}" in s.entity_id or TEST_SN in s.entity_id}

    assert "vacuum" in domains, "no vacuum entity"
    assert "sensor" in domains, "no sensor entities"
    assert "button" in domains, "no button entities"
    assert "switch" in domains, "no switch entities"
    assert "select" in domains, "no select entities"
    assert "number" in domains, "no number entities"
    assert "camera" in domains, "no camera entity"


async def test_device_registered(hass: HomeAssistant) -> None:
    """Entities are grouped under a single device."""
    from homeassistant.helpers import device_registry as dr

    patch_api()
    await setup_entry(hass, make_config_entry())

    registry = dr.async_get(hass)
    device = registry.async_get_device(identifiers={(DOMAIN, TEST_SN)})
    assert device is not None
    assert device.manufacturer == "Botslab / 360"


async def test_unload_stops_push_listener(hass: HomeAssistant) -> None:
    """Unloading stops the QPush client and clears runtime data."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())
    qpush = entry.runtime_data.qpush

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    assert qpush._closing is True
    assert entry.runtime_data is None
    assert not hass.states.async_entity_ids("vacuum")


async def test_reload_after_options_change(hass: HomeAssistant) -> None:
    """Changing options reloads the entry instead of being ignored."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    first_coordinator = entry.runtime_data.coordinator
    hass.config_entries.async_update_entry(entry, options={"poll_interval_active": 60})

    await hass.async_block_till_done()

    assert entry.runtime_data is not None
    assert entry.runtime_data.coordinator is not first_coordinator


async def test_second_entry_does_not_duplicate_services(hass: HomeAssistant) -> None:
    """A second account must not re-register the domain services."""
    patch_api()
    await setup_entry(hass, make_config_entry())

    second = make_config_entry()
    second.add_to_hass(hass)
    # Same unique id would abort; use a different one.
    second.unique_id = "botslab_second_account"
    await hass.config_entries.async_setup(second.entry_id)
    await hass.async_block_till_done()

    assert hass.services.has_service(DOMAIN, "clean_rooms")