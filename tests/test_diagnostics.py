"""Diagnostics must never leak secrets or device identifiers."""
from __future__ import annotations

import json

from homeassistant.core import HomeAssistant

from .conftest import TEST_SN, make_config_entry, patch_api, setup_entry

SECRET_VALUES = [
    "hunter2",
    "qtok",
    "ttok",
    "a" * 32,  # the m2 device identifier
]

IDENTIFIER_KEYS = {"product_key", "device_title", "serial_number", "device_name"}


async def test_diagnostics_redacts_secrets(hass: HomeAssistant) -> None:
    """Downloading diagnostics must not expose credentials."""
    from custom_components.botslab_vacuum.diagnostics import (
        async_get_config_entry_diagnostics,
    )

    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    dump = await async_get_config_entry_diagnostics(hass, entry)
    serialised = json.dumps(dump, default=str)

    for secret in SECRET_VALUES:
        assert secret not in serialised, f"secret leaked into diagnostics: {secret[:8]}..."


async def test_diagnostics_redacts_device_identifiers(hass: HomeAssistant) -> None:
    """Device serials and product keys are redacted too."""
    from custom_components.botslab_vacuum.diagnostics import (
        async_get_config_entry_diagnostics,
    )

    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    dump = await async_get_config_entry_diagnostics(hass, entry)

    def walk(node):
        if isinstance(node, dict):
            for key, value in node.items():
                if key in IDENTIFIER_KEYS:
                    assert value == "**REDACTED**", f"{key} not redacted: {value!r}"
                walk(value)
        elif isinstance(node, list):
            for item in node:
                walk(item)

    walk(dump)
    assert TEST_SN not in json.dumps(dump, default=str)


async def test_diagnostics_survives_unloaded_entry(hass: HomeAssistant) -> None:
    """Requesting diagnostics after unload must not raise."""
    from custom_components.botslab_vacuum.diagnostics import (
        async_get_config_entry_diagnostics,
    )

    patch_api()
    entry = await setup_entry(hass, make_config_entry())
    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()

    dump = await async_get_config_entry_diagnostics(hass, entry)
    assert dump["device_count"] == 0


async def test_diagnostics_reports_qpush_state(hass: HomeAssistant) -> None:
    """The push listener state is reported without leaking anything."""
    from custom_components.botslab_vacuum.diagnostics import (
        async_get_config_entry_diagnostics,
    )

    patch_api()
    entry = await setup_entry(hass, make_config_entry())

    dump = await async_get_config_entry_diagnostics(hass, entry)
    assert isinstance(dump["qpush_active"], bool)
    assert dump["device_count"] == 1