"""Config flow and Options flow for Botslab Vacuum Robot integration."""
from __future__ import annotations

from collections.abc import Mapping
import logging
from typing import Any
import uuid

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    BooleanSelector,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from .api import BotslabVacuumApi
from .const import (
    CONF_EMAIL,
    CONF_ENABLE_MAP,
    CONF_M2,
    CONF_PASSWORD,
    CONF_POLL_INTERVAL_ACTIVE,
    CONF_POLL_INTERVAL_IDLE,
    CONF_Q,
    CONF_REGION,
    CONF_T,
    DEFAULT_POLL_INTERVAL_ACTIVE,
    DEFAULT_POLL_INTERVAL_IDLE,
    DEFAULT_REGION,
    DOMAIN,
    REGIONS,
)
from .quc_login import BotslabApiError, BotslabAuthError, async_login

_LOGGER = logging.getLogger(__name__)

_PASSWORD_SELECTOR = TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))


class BotslabVacuumConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Botslab Vacuum Robot."""

    VERSION = 1

    def __init__(self) -> None:
        self._reauth_entry: ConfigEntry | None = None

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle initial step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            email = user_input[CONF_EMAIL].strip().lower()
            password = user_input[CONF_PASSWORD]
            region = user_input.get(CONF_REGION, DEFAULT_REGION)
            m2 = uuid.uuid4().hex

            session = async_get_clientsession(self.hass)
            try:
                tokens = await async_login(session, region, email, password, m2)
                api = BotslabVacuumApi(
                    session=session,
                    region=region,
                    m2=m2,
                    q=tokens["q"],
                    t=tokens["t"],
                )
                await api.app_login()
                devices = await api.get_devices()

                if not devices:
                    errors["base"] = "no_devices_found"
                else:
                    await self.async_set_unique_id(f"botslab_{tokens['qid']}")
                    self._abort_if_unique_id_configured()

                    return self.async_create_entry(
                        title=f"Botslab Vacuum ({email})",
                        data={
                            CONF_EMAIL: email,
                            CONF_PASSWORD: password,
                            CONF_REGION: region,
                            CONF_M2: m2,
                            CONF_Q: tokens["q"],
                            CONF_T: tokens["t"],
                        },
                    )
            except BotslabAuthError:
                errors["base"] = "invalid_auth"
            except BotslabApiError:
                errors["base"] = "cannot_connect"
            except Exception as err:
                _LOGGER.exception("Unexpected error during setup: %s", err)
                errors["base"] = "unknown"

        region_options = [
            {"value": k, "label": v["name"]} for k, v in REGIONS.items()
        ]

        schema = vol.Schema(
            {
                vol.Required(CONF_EMAIL): TextSelector(
                    TextSelectorConfig(type=TextSelectorType.EMAIL)
                ),
                vol.Required(CONF_PASSWORD): _PASSWORD_SELECTOR,
                vol.Required(CONF_REGION, default=DEFAULT_REGION): SelectSelector(
                    SelectSelectorConfig(options=region_options)
                ),
            }
        )

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )

    async def async_step_reauth(
        self, entry_data: Mapping[str, Any]
    ) -> ConfigFlowResult:
        """Handle re-authentication."""
        self._reauth_entry = self.hass.config_entries.async_get_entry(
            self.context["entry_id"]
        )
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Confirm re-authentication dialog."""
        errors: dict[str, str] = {}
        assert self._reauth_entry is not None

        if user_input is not None:
            email = self._reauth_entry.data[CONF_EMAIL]
            password = user_input[CONF_PASSWORD]
            region = self._reauth_entry.data.get(CONF_REGION, DEFAULT_REGION)
            m2 = self._reauth_entry.data[CONF_M2]

            session = async_get_clientsession(self.hass)
            try:
                tokens = await async_login(session, region, email, password, m2)
                self.hass.config_entries.async_update_entry(
                    self._reauth_entry,
                    data={
                        **self._reauth_entry.data,
                        CONF_PASSWORD: password,
                        CONF_Q: tokens["q"],
                        CONF_T: tokens["t"],
                    },
                )
                await self.hass.config_entries.async_reload(self._reauth_entry.entry_id)
                return self.async_abort(reason="reauth_successful")
            except BotslabAuthError:
                errors["base"] = "invalid_auth"
            except Exception:
                errors["base"] = "cannot_connect"

        schema = vol.Schema({vol.Required(CONF_PASSWORD): _PASSWORD_SELECTOR})
        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=schema,
            errors=errors,
            description_placeholders={"email": self._reauth_entry.data[CONF_EMAIL]},
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Get options flow."""
        return BotslabVacuumOptionsFlowHandler(config_entry)


class BotslabVacuumOptionsFlowHandler(OptionsFlow):
    """Handle options for Botslab Vacuum."""

    def __init__(self, config_entry: ConfigEntry) -> None:
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_POLL_INTERVAL_ACTIVE,
                    default=self.config_entry.options.get(
                        CONF_POLL_INTERVAL_ACTIVE,
                        self.config_entry.data.get(
                            CONF_POLL_INTERVAL_ACTIVE, DEFAULT_POLL_INTERVAL_ACTIVE
                        ),
                    ),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=10,
                        max=120,
                        step=5,
                        mode=NumberSelectorMode.BOX,
                    )
                ),
                vol.Optional(
                    CONF_POLL_INTERVAL_IDLE,
                    default=self.config_entry.options.get(
                        CONF_POLL_INTERVAL_IDLE,
                        self.config_entry.data.get(
                            CONF_POLL_INTERVAL_IDLE, DEFAULT_POLL_INTERVAL_IDLE
                        ),
                    ),
                ): NumberSelector(
                    NumberSelectorConfig(
                        min=30,
                        max=600,
                        step=15,
                        mode=NumberSelectorMode.BOX,
                    )
                ),
                vol.Optional(
                    CONF_ENABLE_MAP,
                    default=self.config_entry.options.get(CONF_ENABLE_MAP, True),
                ): BooleanSelector(),
            }
        )

        return self.async_show_form(step_id="init", data_schema=schema)
