"""Config flow, reauth and options flow."""
from __future__ import annotations

from unittest.mock import AsyncMock, patch

import voluptuous as vol
from homeassistant import config_entries, data_entry_flow
from homeassistant.core import HomeAssistant

from custom_components.botslab_vacuum.const import (
    CONF_EMAIL,
    CONF_PASSWORD,
    CONF_REGION,
    DOMAIN,
)

from .conftest import TEST_EMAIL, TEST_PASSWORD, make_config_entry, patch_api

LOGIN_RESULT = {"q": "qtok", "t": "ttok", "qid": "1000103000000064241"}


async def test_user_flow_succeeds(hass: HomeAssistant) -> None:
    """Valid credentials create an entry."""
    patch_api()
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    assert result["type"] is data_entry_flow.FlowResultType.FORM

    with patch(
        "custom_components.botslab_vacuum.config_flow.async_login",
        AsyncMock(return_value=LOGIN_RESULT),
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {CONF_EMAIL: TEST_EMAIL, CONF_PASSWORD: TEST_PASSWORD, CONF_REGION: "eu1"},
        )
        await hass.async_block_till_done()

    assert result["type"] is data_entry_flow.FlowResultType.CREATE_ENTRY
    assert result["data"][CONF_EMAIL] == TEST_EMAIL.lower()
    assert result["title"].startswith("Botslab Vacuum")


async def test_user_flow_rejects_bad_credentials(hass: HomeAssistant) -> None:
    """An auth error shows the form again with an error."""
    from custom_components.botslab_vacuum.quc_login import BotslabAuthError

    patch_api()
    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )

    with patch(
        "custom_components.botslab_vacuum.config_flow.async_login",
        AsyncMock(side_effect=BotslabAuthError("nope")),
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {CONF_EMAIL: TEST_EMAIL, CONF_PASSWORD: "wrong", CONF_REGION: "eu1"},
        )

    assert result["type"] is data_entry_flow.FlowResultType.FORM
    assert result["errors"] == {"base": "invalid_auth"}


async def test_duplicate_account_is_rejected(hass: HomeAssistant) -> None:
    """The same account cannot be added twice."""
    patch_api()
    make_config_entry().add_to_hass(hass)

    result = await hass.config_entries.flow.async_init(
        DOMAIN, context={"source": config_entries.SOURCE_USER}
    )
    with patch(
        "custom_components.botslab_vacuum.config_flow.async_login",
        AsyncMock(return_value=LOGIN_RESULT),
    ):
        result = await hass.config_entries.flow.async_configure(
            result["flow_id"],
            {CONF_EMAIL: TEST_EMAIL, CONF_PASSWORD: TEST_PASSWORD, CONF_REGION: "eu1"},
        )

    assert result["type"] is data_entry_flow.FlowResultType.ABORT, (
        f"beklenen ABORT, gelen {result['type']}; "
        f"errors={result.get('errors')}; "
        f"qid={LOGIN_RESULT['qid']}; "
        f"kayitlar={[(e.domain, e.unique_id) for e in hass.config_entries.async_entries(DOMAIN)]}"
    )
    assert result["reason"] == "already_configured"


async def test_options_flow_saves_values(hass: HomeAssistant) -> None:
    """Options can be changed through the UI."""
    patch_api()
    entry = make_config_entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is data_entry_flow.FlowResultType.FORM

    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"poll_interval_active": 90, "poll_interval_idle": 300}
    )
    await hass.async_block_till_done()

    assert result["type"] is data_entry_flow.FlowResultType.CREATE_ENTRY
    assert entry.options["poll_interval_active"] == 90


async def test_options_flow_does_not_assign_config_entry(hass: HomeAssistant) -> None:
    """Assigning config_entry directly is deprecated and must be absent.

    Home Assistant 2025.12 turns OptionsFlow.config_entry into a read-only
    property, so an explicit assignment breaks the options flow entirely.
    """
    import inspect

    from custom_components.botslab_vacuum.config_flow import BotslabVacuumOptionsFlowHandler

    source = inspect.getsource(BotslabVacuumOptionsFlowHandler)
    assert "__init__" not in source, "options flow must not define __init__"
    assert "self.config_entry =" not in source, "options flow must not assign config_entry"


async def test_options_flow_uses_suggested_values(hass: HomeAssistant) -> None:
    """Current values are offered as suggestions in the form."""
    patch_api()
    entry = make_config_entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is data_entry_flow.FlowResultType.FORM

    schema = result["data_schema"].schema
    # voluptuous markers only have a usable default when one was set; the
    # sentinel is not callable, so it has to be filtered out.
    defaults = {
        str(key.schema): key.default()
        for key in schema
        if hasattr(key, "default") and key.default is not vol.UNDEFINED
    }
    assert defaults.get("poll_interval_active") == 30
    assert defaults.get("poll_interval_idle") == 120


async def test_reauth_flow_available(hass: HomeAssistant) -> None:
    """A re-authentication step is offered for an existing entry."""
    patch_api()
    entry = make_config_entry()
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    result = await entry.start_reauth_flow(hass)
    assert result["type"] is data_entry_flow.FlowResultType.FORM
    assert result["step_id"] == "reauth_confirm"