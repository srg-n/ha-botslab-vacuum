"""Home Assistant integration for Botslab Vacuum Robots."""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.aiohttp_client import async_get_clientsession
import voluptuous as vol

from .api import BotslabVacuumApi
from .const import (
    ATTR_CONSUMABLE_TYPE,
    ATTR_ENTITY_ID,
    ATTR_FAN_SPEED,
    ATTR_MOP_MODE,
    ATTR_REPEAT_TIMES,
    ATTR_ROOM_IDS,
    ATTR_ROOM_NAMES,
    ATTR_WATER_LEVEL,
    ATTR_X,
    ATTR_Y,
    ATTR_ZONES,
    CONF_ENABLE_MAP,
    CONF_M2,
    CONF_POLL_INTERVAL_ACTIVE,
    CONF_POLL_INTERVAL_IDLE,
    CONF_Q,
    CONF_REGION,
    CONF_T,
    DEFAULT_POLL_INTERVAL_ACTIVE,
    DEFAULT_POLL_INTERVAL_IDLE,
    DEFAULT_REGION,
    DOMAIN,
    PLATFORMS,
    SERVICE_CLEAN_ROOMS,
    SERVICE_CLEAN_ZONE,
    SERVICE_GOTO_LOCATION,
    SERVICE_LOCATE,
    SERVICE_REFRESH_ROOMS,
    SERVICE_RESET_CONSUMABLE,
    SERVICE_SET_MOP_MODE,
    SERVICE_SET_WATER_LEVEL,
    SERVICE_SYNC_MAP,
)
from .coordinator import BotslabVacuumCoordinator
from .qpush import BotslabQPush

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Botslab Vacuum from a config entry."""
    session = async_get_clientsession(hass)
    region = entry.data.get(CONF_REGION, DEFAULT_REGION)
    m2 = entry.data[CONF_M2]
    q = entry.data.get(CONF_Q, "")
    t = entry.data.get(CONF_T, "")

    poll_interval_active = entry.options.get(
        CONF_POLL_INTERVAL_ACTIVE,
        entry.data.get(CONF_POLL_INTERVAL_ACTIVE, DEFAULT_POLL_INTERVAL_ACTIVE),
    )
    poll_interval_idle = entry.options.get(
        CONF_POLL_INTERVAL_IDLE,
        entry.data.get(CONF_POLL_INTERVAL_IDLE, DEFAULT_POLL_INTERVAL_IDLE),
    )
    enable_map = entry.options.get(
        CONF_ENABLE_MAP, entry.data.get(CONF_ENABLE_MAP, True)
    )

    api = BotslabVacuumApi(
        session=session,
        region=region,
        m2=m2,
        q=q,
        t=t,
    )

    coordinator = BotslabVacuumCoordinator(
        hass=hass,
        entry=entry,
        api=api,
        poll_interval_active=poll_interval_active,
        poll_interval_idle=poll_interval_idle,
        enable_map=enable_map,
    )

    # Initial data load
    await coordinator.async_config_entry_first_refresh()

    # Launch QPush real-time socket listener in background
    qpush = BotslabQPush(
        session=session,
        device_id=m2,
        get_alias=lambda: api.push_alias,
        on_push=lambda payload: hass.async_create_task(coordinator.async_on_push(payload)),
        ensure_session=coordinator.ensure_valid_session,
    )
    qpush_task = hass.async_create_background_task(
        qpush.run(), name=f"qpush_{entry.entry_id}"
    )

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        "coordinator": coordinator,
        "api": api,
        "qpush": qpush,
        "qpush_task": qpush_task,
    }

    # Register platforms
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Register custom domain services
    _register_services(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        data = hass.data[DOMAIN].pop(entry.entry_id)
        qpush: BotslabQPush = data.get("qpush")
        if qpush:
            await qpush.stop()
        task = data.get("qpush_task")
        if task and not task.done():
            task.cancel()

    return unload_ok


def _register_services(hass: HomeAssistant) -> None:
    """Register custom vacuum services in Home Assistant."""
    if hass.services.has_service(DOMAIN, SERVICE_CLEAN_ROOMS):
        return

    def _targets(call: ServiceCall) -> list[tuple[BotslabVacuumCoordinator, Any]]:
        """Resolve a service call to the devices it should affect.

        Dashboard map cards address a single robot via ``entity_id``; a plain
        service call without a target applies to every configured robot.
        """
        entity_ids = call.data.get(ATTR_ENTITY_ID)
        selected: list[tuple[BotslabVacuumCoordinator, Any]] = []

        for entry_data in hass.data.get(DOMAIN, {}).values():
            coordinator: BotslabVacuumCoordinator = entry_data["coordinator"]
            for dev in (coordinator.data or {}).values():
                if entity_ids and dev.unique_id not in entity_ids:
                    continue
                selected.append((coordinator, dev))

        if entity_ids:
            found = {d.unique_id for _, d in selected}
            unknown = [e for e in entity_ids if e not in found]
            if unknown:
                _LOGGER.warning(
                    "Service called for unknown or offline entity id(s): %s",
                    ", ".join(unknown),
                )
        return selected

    async def handle_clean_rooms(call: ServiceCall) -> None:
        room_ids = call.data.get(ATTR_ROOM_IDS)
        room_names = call.data.get(ATTR_ROOM_NAMES)
        repeat = call.data.get(ATTR_REPEAT_TIMES, 1)
        speed = call.data.get(ATTR_FAN_SPEED)
        water = call.data.get(ATTR_WATER_LEVEL)

        wanted_names = [n.strip().lower() for n in (room_names or []) if n and n.strip()]
        if not room_ids and not wanted_names:
            _LOGGER.warning("clean_rooms called without room IDs or room names")
            return

        for coordinator, dev in _targets(call):
            target_ids = list(room_ids or [])
            if wanted_names:
                name_map = {r.name.lower(): r.room_id for r in dev.rooms}
                missing = [n for n in wanted_names if n not in name_map]
                if missing:
                    _LOGGER.warning(
                        "Unknown room name(s) for %s: %s", dev.device_name, ", ".join(missing)
                    )
                for name in wanted_names:
                    rid = name_map.get(name)
                    if rid and rid not in target_ids:
                        target_ids.append(rid)

            if not target_ids:
                continue

            await coordinator.api.clean_rooms(
                sn=dev.device_name,
                product_key=dev.product_key,
                room_ids=target_ids,
                repeat_times=repeat,
                fan_speed=speed,
                water_level=water,
            )
            await coordinator.async_request_refresh()

    async def handle_clean_zone(call: ServiceCall) -> None:
        zones = call.data.get(ATTR_ZONES, [])
        repeat = call.data.get(ATTR_REPEAT_TIMES, 1)
        speed = call.data.get(ATTR_FAN_SPEED)
        water = call.data.get(ATTR_WATER_LEVEL)

        if not zones:
            _LOGGER.warning("clean_zone called without zones")
            return

        for coordinator, dev in _targets(call):
            await coordinator.api.clean_zone(
                sn=dev.device_name,
                product_key=dev.product_key,
                zones=zones,
                repeat_times=repeat,
                fan_speed=speed,
                water_level=water,
            )
            await coordinator.async_request_refresh()

    async def handle_set_water_level(call: ServiceCall) -> None:
        water = call.data.get(ATTR_WATER_LEVEL)
        for coordinator, dev in _targets(call):
            await coordinator.api.set_water_level(dev.device_name, dev.product_key, water)
            await coordinator.async_request_refresh()

    async def handle_set_mop_mode(call: ServiceCall) -> None:
        mode = call.data.get(ATTR_MOP_MODE)
        for coordinator, dev in _targets(call):
            await coordinator.api.set_mop_mode(dev.device_name, dev.product_key, mode)
            await coordinator.async_request_refresh()

    async def handle_refresh_rooms(call: ServiceCall) -> None:
        for coordinator, dev in _targets(call):
            await coordinator.async_refresh_rooms(dev.device_name)

    async def handle_sync_map(call: ServiceCall) -> None:
        for coordinator, dev in _targets(call):
            await coordinator.api.start_map_sync(dev.device_name, dev.product_key, 60)

    async def handle_goto_location(call: ServiceCall) -> None:
        x = int(call.data[ATTR_X])
        y = int(call.data[ATTR_Y])
        for coordinator, dev in _targets(call):
            await coordinator.api.goto_target(dev.device_name, dev.product_key, x, y)
            await coordinator.async_request_refresh()

    async def handle_locate(call: ServiceCall) -> None:
        for coordinator, dev in _targets(call):
            await coordinator.api.locate(dev.device_name, dev.product_key)

    async def handle_reset_consumable(call: ServiceCall) -> None:
        consumable = call.data.get(ATTR_CONSUMABLE_TYPE)
        for coordinator, dev in _targets(call):
            await coordinator.api.reset_consumable(dev.device_name, dev.product_key, consumable)
            await coordinator.async_request_refresh()

    hass.services.async_register(
        DOMAIN,
        SERVICE_CLEAN_ROOMS,
        handle_clean_rooms,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Optional(ATTR_ROOM_IDS): vol.All(cv.ensure_list, [cv.string]),
                vol.Optional(ATTR_ROOM_NAMES): vol.All(cv.ensure_list, [cv.string]),
                vol.Optional(ATTR_REPEAT_TIMES, default=1): vol.All(vol.Coerce(int), vol.Range(min=1, max=10)),
                vol.Optional(ATTR_FAN_SPEED): cv.string,
                vol.Optional(ATTR_WATER_LEVEL): cv.string,
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_CLEAN_ZONE,
        handle_clean_zone,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_ZONES): vol.All(
                    cv.ensure_list,
                    [
                        vol.All(
                            vol.Coerce(float),
                            vol.ExactSequence((vol.Coerce(float),) * 4),
                        )
                    ],
                ),
                vol.Optional(ATTR_REPEAT_TIMES, default=1): vol.All(vol.Coerce(int), vol.Range(min=1, max=10)),
                vol.Optional(ATTR_FAN_SPEED): cv.string,
                vol.Optional(ATTR_WATER_LEVEL): cv.string,
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_WATER_LEVEL,
        handle_set_water_level,
        schema=vol.Schema(
            {vol.Optional(ATTR_ENTITY_ID): cv.ensure_list, vol.Required(ATTR_WATER_LEVEL): cv.string}
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_MOP_MODE,
        handle_set_mop_mode,
        schema=vol.Schema(
            {vol.Optional(ATTR_ENTITY_ID): cv.ensure_list, vol.Required(ATTR_MOP_MODE): cv.string}
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_REFRESH_ROOMS,
        handle_refresh_rooms,
        schema=vol.Schema({vol.Optional(ATTR_ENTITY_ID): cv.ensure_list}),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SYNC_MAP,
        handle_sync_map,
        schema=vol.Schema({vol.Optional(ATTR_ENTITY_ID): cv.ensure_list}),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_GOTO_LOCATION,
        handle_goto_location,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_X): vol.Coerce(int),
                vol.Required(ATTR_Y): vol.Coerce(int),
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_LOCATE,
        handle_locate,
        schema=vol.Schema({vol.Optional(ATTR_ENTITY_ID): cv.ensure_list}),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_RESET_CONSUMABLE,
        handle_reset_consumable,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_CONSUMABLE_TYPE): cv.string,
            }
        ),
    )
