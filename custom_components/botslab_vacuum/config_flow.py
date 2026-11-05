"""Config flow and Options flow for Botslab Vacuum Robot integration."""
from __future__ import annotations

from collections.abc import Mapping
import logging
import time
from typing import Any
import uuid

from aiohttp import web
import voluptuous as vol
from homeassistant import data_entry_flow
from homeassistant.components.http import HomeAssistantView
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
    CONF_QID,
    CONF_REGION,
    CONF_T,
    DEFAULT_POLL_INTERVAL_ACTIVE,
    DEFAULT_POLL_INTERVAL_IDLE,
    DEFAULT_REGION,
    DOMAIN,
    REGIONS,
)
from .exceptions import BotslabCaptchaRequired
from .quc_login import BotslabApiError, BotslabAuthError, async_get_captcha, async_login

_LOGGER = logging.getLogger(__name__)

_PASSWORD_SELECTOR = TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD))


class BotslabCaptchaView(HomeAssistantView):
    """View to serve captcha images locally for active config flows."""

    url = "/api/botslab_vacuum/captcha/{flow_id}"
    name = "api:botslab_vacuum:captcha"
    requires_auth = False

    def __init__(self) -> None:
        self.captchas: dict[str, bytes] = {}

    async def get(self, request: web.Request, flow_id: str) -> web.Response:
        """Return captcha image bytes if available."""
        image = self.captchas.get(flow_id)
        if not image:
            return web.Response(status=404)
        c_type = "image/png" if image.startswith(b"\x89PNG") else "image/jpeg"
        return web.Response(
            body=image,
            content_type=c_type,
            headers={"Cache-Control": "no-cache, no-store, must-revalidate"},
        )


class BotslabVacuumConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Botslab Vacuum Robot."""

    VERSION = 1

    def __init__(self) -> None:
        self._reauth_entry: ConfigEntry | None = None
        self._captcha_data: dict[str, Any] | None = None

    def _get_or_register_captcha_view(self) -> BotslabCaptchaView:
        """Get or register the local captcha view on Home Assistant web server."""
        data = self.hass.data.setdefault(DOMAIN, {})
        view = data.get("_captcha_view")
        if view is None:
            view = BotslabCaptchaView()
            self.hass.http.register_view(view)
            data["_captcha_view"] = view
        return view

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
                qid = tokens.get("qid", "")
                api = BotslabVacuumApi(
                    session=session,
                    region=region,
                    m2=m2,
                    q=tokens["q"],
                    t=tokens["t"],
                    qid=qid,
                )
                await api.app_login()
                devices = await api.get_devices()

                if not devices:
                    _LOGGER.warning(
                        "No vacuum devices found for %s in region %s. If your robot is registered in another server, try selecting another region (e.g. Asia Pacific or North America).",
                        email,
                        region,
                    )
                    errors["base"] = "no_devices_found"
                else:
                    await self.async_set_unique_id(f"botslab_{qid or email}")
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
                            CONF_QID: qid,
                        },
                    )
            except BotslabCaptchaRequired:
                try:
                    view = self._get_or_register_captcha_view()
                    image_bytes, sc = await async_get_captcha(session, region, m2)
                    view.captchas[self.flow_id] = image_bytes
                    self._captcha_data = {
                        "email": email,
                        "password": password,
                        "region": region,
                        "m2": m2,
                        "sc": sc,
                        "origin_step": "user",
                    }
                    return await self.async_step_captcha()
                except Exception as err:
                    _LOGGER.exception("Failed to fetch captcha challenge: %s", err)
                    errors["base"] = "cannot_connect"
            except BotslabAuthError:
                errors["base"] = "invalid_auth"
            except BotslabApiError:
                errors["base"] = "cannot_connect"
            except data_entry_flow.AbortFlow:
                # Raised by _abort_if_unique_id_configured when the account is
                # already set up. It signals a deliberate outcome, so it has to
                # escape: swallowing it would tell the user "unknown error" and
                # show the form again instead of reporting the duplicate.
                raise
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
                qid = tokens.get("qid") or self._reauth_entry.data.get(CONF_QID, "")
                self.hass.config_entries.async_update_entry(
                    self._reauth_entry,
                    data={
                        **self._reauth_entry.data,
                        CONF_PASSWORD: password,
                        CONF_Q: tokens["q"],
                        CONF_T: tokens["t"],
                        CONF_QID: qid,
                    },
                )
                await self.hass.config_entries.async_reload(self._reauth_entry.entry_id)
                return self.async_abort(reason="reauth_successful")
            except BotslabCaptchaRequired:
                try:
                    view = self._get_or_register_captcha_view()
                    image_bytes, sc = await async_get_captcha(session, region, m2)
                    view.captchas[self.flow_id] = image_bytes
                    self._captcha_data = {
                        "email": email,
                        "password": password,
                        "region": region,
                        "m2": m2,
                        "sc": sc,
                        "origin_step": "reauth_confirm",
                    }
                    return await self.async_step_captcha()
                except Exception as err:
                    _LOGGER.exception("Failed to fetch captcha challenge: %s", err)
                    errors["base"] = "cannot_connect"
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

    async def async_step_reconfigure(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle reconfiguration of the integration."""
        entry = self.hass.config_entries.async_get_entry(self.context["entry_id"])
        assert entry is not None
        errors: dict[str, str] = {}

        if user_input is not None:
            email = user_input[CONF_EMAIL].strip().lower()
            password = user_input[CONF_PASSWORD]
            region = user_input.get(CONF_REGION, DEFAULT_REGION)
            m2 = entry.data.get(CONF_M2) or uuid.uuid4().hex

            session = async_get_clientsession(self.hass)
            try:
                tokens = await async_login(session, region, email, password, m2)
                qid = tokens.get("qid") or entry.data.get(CONF_QID, "")
                api = BotslabVacuumApi(
                    session=session,
                    region=region,
                    m2=m2,
                    q=tokens["q"],
                    t=tokens["t"],
                    qid=qid,
                )
                await api.app_login()
                devices = await api.get_devices()

                if not devices:
                    _LOGGER.warning(
                        "No vacuum devices found for %s in region %s. If your robot is registered in another server, try selecting another region (e.g. Asia Pacific or North America).",
                        email,
                        region,
                    )
                    errors["base"] = "no_devices_found"
                else:
                    await self.async_set_unique_id(f"botslab_{qid or email}")
                    self._abort_if_unique_id_mismatch()

                    return self.async_update_reload_and_abort(
                        entry,
                        data={
                            **entry.data,
                            CONF_EMAIL: email,
                            CONF_PASSWORD: password,
                            CONF_REGION: region,
                            CONF_M2: m2,
                            CONF_Q: tokens["q"],
                            CONF_T: tokens["t"],
                            CONF_QID: qid,
                        },
                    )
            except BotslabCaptchaRequired:
                try:
                    view = self._get_or_register_captcha_view()
                    image_bytes, sc = await async_get_captcha(session, region, m2)
                    view.captchas[self.flow_id] = image_bytes
                    self._captcha_data = {
                        "email": email,
                        "password": password,
                        "region": region,
                        "m2": m2,
                        "sc": sc,
                        "origin_step": "reconfigure",
                    }
                    return await self.async_step_captcha()
                except Exception as err:
                    _LOGGER.exception("Failed to fetch captcha challenge: %s", err)
                    errors["base"] = "cannot_connect"
            except BotslabAuthError:
                errors["base"] = "invalid_auth"
            except BotslabApiError:
                errors["base"] = "cannot_connect"
            except data_entry_flow.AbortFlow:
                raise
            except Exception as err:
                _LOGGER.exception("Unexpected error during reconfiguration: %s", err)
                errors["base"] = "unknown"

        region_options = [
            {"value": k, "label": v["name"]} for k, v in REGIONS.items()
        ]

        schema = vol.Schema(
            {
                vol.Required(CONF_EMAIL, default=entry.data.get(CONF_EMAIL, "")): TextSelector(
                    TextSelectorConfig(type=TextSelectorType.EMAIL)
                ),
                vol.Required(CONF_PASSWORD): _PASSWORD_SELECTOR,
                vol.Required(
                    CONF_REGION, default=entry.data.get(CONF_REGION, DEFAULT_REGION)
                ): SelectSelector(SelectSelectorConfig(options=region_options)),
            }
        )

        return self.async_show_form(
            step_id="reconfigure",
            data_schema=schema,
            errors=errors,
        )

    async def async_step_captcha(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Handle graphic captcha verification step."""
        errors: dict[str, str] = {}
        if self._captcha_data is None:
            return self.async_abort(reason="unknown")

        email = self._captcha_data["email"]
        password = self._captcha_data["password"]
        region = self._captcha_data["region"]
        m2 = self._captcha_data["m2"]
        origin_step = self._captcha_data["origin_step"]

        if user_input is not None:
            captcha_code = user_input.get("captcha_code", "").strip()
            session = async_get_clientsession(self.hass)
            try:
                tokens = await async_login(
                    session,
                    region,
                    email,
                    password,
                    m2,
                    captcha_sc=self._captcha_data["sc"],
                    captcha_code=captcha_code,
                )
                view = self._get_or_register_captcha_view()
                view.captchas.pop(self.flow_id, None)

                if origin_step == "user":
                    qid = tokens.get("qid", "")
                    api = BotslabVacuumApi(
                        session=session,
                        region=region,
                        m2=m2,
                        q=tokens["q"],
                        t=tokens["t"],
                        qid=qid,
                    )
                    await api.app_login()
                    devices = await api.get_devices()

                    if not devices:
                        errors["base"] = "no_devices_found"
                    else:
                        await self.async_set_unique_id(f"botslab_{qid or email}")
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
                                CONF_QID: qid,
                            },
                        )

                elif origin_step == "reauth_confirm":
                    assert self._reauth_entry is not None
                    qid = tokens.get("qid") or self._reauth_entry.data.get(CONF_QID, "")
                    self.hass.config_entries.async_update_entry(
                        self._reauth_entry,
                        data={
                            **self._reauth_entry.data,
                            CONF_PASSWORD: password,
                            CONF_Q: tokens["q"],
                            CONF_T: tokens["t"],
                            CONF_QID: qid,
                        },
                    )
                    await self.hass.config_entries.async_reload(self._reauth_entry.entry_id)
                    return self.async_abort(reason="reauth_successful")

                elif origin_step == "reconfigure":
                    entry = self.hass.config_entries.async_get_entry(self.context["entry_id"])
                    assert entry is not None
                    qid = tokens.get("qid") or entry.data.get(CONF_QID, "")
                    api = BotslabVacuumApi(
                        session=session,
                        region=region,
                        m2=m2,
                        q=tokens["q"],
                        t=tokens["t"],
                        qid=qid,
                    )
                    await api.app_login()
                    devices = await api.get_devices()

                    if not devices:
                        errors["base"] = "no_devices_found"
                    else:
                        await self.async_set_unique_id(f"botslab_{qid or email}")
                        self._abort_if_unique_id_mismatch()

                        return self.async_update_reload_and_abort(
                            entry,
                            data={
                                **entry.data,
                                CONF_EMAIL: email,
                                CONF_PASSWORD: password,
                                CONF_REGION: region,
                                CONF_M2: m2,
                                CONF_Q: tokens["q"],
                                CONF_T: tokens["t"],
                                CONF_QID: qid,
                            },
                        )

            except BotslabCaptchaRequired:
                errors["base"] = "invalid_captcha"
                try:
                    view = self._get_or_register_captcha_view()
                    image_bytes, sc = await async_get_captcha(session, region, m2)
                    view.captchas[self.flow_id] = image_bytes
                    self._captcha_data["sc"] = sc
                except Exception as err:
                    _LOGGER.exception("Failed to refresh captcha: %s", err)
                    errors["base"] = "cannot_connect"
            except BotslabAuthError:
                errors["base"] = "invalid_auth"
            except BotslabApiError:
                errors["base"] = "cannot_connect"
            except data_entry_flow.AbortFlow:
                raise
            except Exception as err:
                _LOGGER.exception("Unexpected error during captcha verification: %s", err)
                errors["base"] = "unknown"

        schema = vol.Schema({vol.Required("captcha_code"): TextSelector()})
        ts = int(time.time() * 1000)
        img_url = f"/api/botslab_vacuum/captcha/{self.flow_id}?t={ts}"
        markdown_img = f"![Captcha]({img_url})"

        return self.async_show_form(
            step_id="captcha",
            data_schema=schema,
            errors=errors,
            description_placeholders={"captcha_img": markdown_img},
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Get options flow."""
        return BotslabVacuumOptionsFlowHandler()


class BotslabVacuumOptionsFlowHandler(OptionsFlow):
    """Handle options for Botslab Vacuum.

    ``config_entry`` is supplied by Home Assistant as a read-only property; it
    must not be assigned here or the options flow fails from HA 2025.12.
    """

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self.config_entry.options
        defaults = {
            CONF_POLL_INTERVAL_ACTIVE: options.get(CONF_POLL_INTERVAL_ACTIVE, DEFAULT_POLL_INTERVAL_ACTIVE),
            CONF_POLL_INTERVAL_IDLE: options.get(CONF_POLL_INTERVAL_IDLE, DEFAULT_POLL_INTERVAL_IDLE),
            CONF_ENABLE_MAP: options.get(CONF_ENABLE_MAP, True),
        }

        schema = vol.Schema(
            {
                vol.Optional(CONF_POLL_INTERVAL_ACTIVE): NumberSelector(
                    NumberSelectorConfig(
                        min=10,
                        max=120,
                        step=5,
                        mode=NumberSelectorMode.BOX,
                    )
                ),
                vol.Optional(CONF_POLL_INTERVAL_IDLE): NumberSelector(
                    NumberSelectorConfig(
                        min=30,
                        max=600,
                        step=15,
                        mode=NumberSelectorMode.BOX,
                    )
                ),
                vol.Optional(CONF_ENABLE_MAP): BooleanSelector(),
            }
        )

        return self.async_show_form(
            step_id="init",
            data_schema=self.add_suggested_values_to_schema(schema, defaults),
        )
