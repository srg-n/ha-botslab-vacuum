"""Service registration and targeting."""
from __future__ import annotations

from unittest.mock import ANY

import pytest
from homeassistant.core import HomeAssistant

from custom_components.botslab_vacuum.const import DOMAIN

from .conftest import TEST_SN, make_config_entry, patch_api, setup_entry

ALL_SERVICES = [
    "clean_rooms",
    "clean_zone",
    "goto_location",
    "locate",
    "refresh_rooms",
    "reset_consumable",
    "set_mop_mode",
    "set_water_flow",
    "sync_map",
]


async def test_services_registered_before_any_entry(hass: HomeAssistant) -> None:
    """Domain services exist as soon as the integration is set up."""
    from custom_components.botslab_vacuum import async_setup

    assert await async_setup(hass, {})

    for service in ALL_SERVICES:
        assert hass.services.has_service(DOMAIN, service), f"{service} missing"


async def test_services_registered_once_with_entry(hass: HomeAssistant) -> None:
    """Setting up an entry exposes the same nine services."""
    patch_api()
    await setup_entry(hass, make_config_entry())

    for service in ALL_SERVICES:
        assert hass.services.has_service(DOMAIN, service)


async def test_locate_targets_selected_robot(hass: HomeAssistant) -> None:
    """A call with entity_id reaches exactly that robot."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    await hass.services.async_call(
        DOMAIN, "locate", {"entity_id": f"vacuum.{TEST_SN}_vacuum"}, blocking=True
    )
    await hass.async_block_till_done()

    entry.runtime_data.api.locate.assert_called_once()
    assert entry.runtime_data.api.locate.call_args[0][0] == TEST_SN


async def test_call_without_target_is_ignored(hass: HomeAssistant) -> None:
    """A call without entity_id must not fan out to every robot."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    await hass.services.async_call(DOMAIN, "locate", {}, blocking=True)
    await hass.async_block_till_done()

    entry.runtime_data.api.locate.assert_not_called()


async def test_clean_rooms_requires_a_target(hass: HomeAssistant) -> None:
    """Room cleaning without a target is a no-op."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    await hass.services.async_call(
        DOMAIN, "clean_rooms", {"room_ids": ["0"]}, blocking=True
    )
    await hass.async_block_till_done()

    entry.runtime_data.api.clean_rooms.assert_not_called()


async def test_clean_rooms_passes_ids_through(hass: HomeAssistant) -> None:
    """Room ids reach the API unchanged."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    await hass.services.async_call(
        DOMAIN,
        "clean_rooms",
        {"entity_id": f"vacuum.{TEST_SN}_vacuum", "room_ids": ["0", "1"]},
        blocking=True,
    )
    await hass.async_block_till_done()

    entry.runtime_data.api.clean_rooms.assert_called_once()


@pytest.mark.parametrize(
    ("service", "payload"),
    [
        ("clean_zone", {"zones": [[-100, -100, 100, 100]]}),
        ("goto_location", {"x": 10, "y": 20}),
        ("set_water_flow", {"water_level": "high"}),
        ("set_mop_mode", {"mop_mode": "vacuum_only"}),
        ("reset_consumable", {"consumable_type": "filter"}),
        ("refresh_rooms", {}),
        ("sync_map", {}),
    ],
)
async def test_service_schemas_accept_payloads(
    hass: HomeAssistant, service: str, payload: dict
) -> None:
    """Each documented payload validates against the service schema."""
    patch_api()
    await setup_entry(hass, make_config_entry())

    await hass.services.async_call(
        DOMAIN, service, {"entity_id": f"vacuum.{TEST_SN}_vacuum", **payload}, blocking=True
    )
    await hass.async_block_till_done()


async def test_goto_location_accepts_negative_coordinates(hass: HomeAssistant) -> None:
    """Map coordinates are negative in practice and must validate."""
    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    await hass.services.async_call(
        DOMAIN,
        "goto_location",
        {"entity_id": f"vacuum.{TEST_SN}_vacuum", "x": -250, "y": -350},
        blocking=True,
    )
    await hass.async_block_till_done()

    entry.runtime_data.api.goto_target.assert_called_once_with(TEST_SN, ANY, -250, -350)


async def test_invalid_zone_payload_is_rejected(hass: HomeAssistant) -> None:
    """A malformed zone must raise rather than reach the cloud."""
    import voluptuous as vol

    patch_api()
    await setup_entry(hass, make_config_entry())

    with pytest.raises(vol.Invalid):
        await hass.services.async_call(
            DOMAIN,
            "clean_zone",
            {"entity_id": f"vacuum.{TEST_SN}_vacuum", "zones": [[1, 2]]},
            blocking=True,
        )