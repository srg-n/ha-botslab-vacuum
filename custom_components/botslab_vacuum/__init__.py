"""Home Assistant integration for Botslab Vacuum Robots."""
from __future__ import annotations

import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.typing import ConfigType
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
from .coordinator import BotslabRuntimeData, BotslabVacuumCoordinator
from .qpush import BotslabQPush

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Botslab Vacuum domain.

    Services are registered once per Home Assistant instance rather than once
    per config entry, so they exist before an account is configured and are
    not re-registered when another entry is added.
    """
    _register_services(hass)
    return True


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

    # Platforms read their shared objects from here instead of hass.data.
    entry.runtime_data = BotslabRuntimeData(
        api=api,
        coordinator=coordinator,
        qpush=qpush,
        qpush_task=qpush_task,
    )

    # Register platforms
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Reload when the user changes options so polling intervals and the map
    # toggle take effect without restarting Home Assistant.
    entry.async_on_unload(entry.add_update_listener(_async_options_updated))

    return True


async def _async_options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload the entry after its options changed."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        runtime: BotslabRuntimeData = entry.runtime_data
        await runtime.qpush.stop()
        if runtime.qpush_task and not runtime.qpush_task.done():
            runtime.qpush_task.cancel()
        entry.runtime_data = None

    return unload_ok


def _register_services(hass: HomeAssistant) -> None:
    """Register custom vacuum services in Home Assistant."""
    if hass.services.has_service(DOMAIN, SERVICE_CLEAN_ROOMS):
        return

    def _targets(call: ServiceCall) -> list[tuple[BotslabVacuumCoordinator, Any]]:
        """Resolve a service call to the devices it should affect.

        ``entity_id`` carries real Home Assistant entity ids, which is what
        dashboard map cards and the UI send. They cannot be compared against a
        device serial directly: Home Assistant derives an entity id from the
        entity and device names, so ``vacuum.<serial>_vacuum`` does not exist.
        Each id is walked back through the entity and device registries to the
        serial the coordinator stores its data under.

        A call without a target is only accepted from the UI, where Home
        Assistant fills in the selected entity; scripted calls must name a
        target explicitly so a command never fans out to every robot on every
        account by accident.
        """
        entity_ids = call.data.get(ATTR_ENTITY_ID) or []
        if not entity_ids:
            _LOGGER.warning(
                "%s was called without a target entity, so it was ignored. "
                "Pass entity_id to choose which robot should run the command.",
                call.service,
            )
            return []

        entities = er.async_get(hass)
        devices = dr.async_get(hass)

        selected: list[tuple[BotslabVacuumCoordinator, Any]] = []
        unknown: list[str] = []
        for entity_id in entity_ids:
            registry_entry = entities.async_get(entity_id)
            device_entry = (
                devices.async_get(registry_entry.device_id)
                if registry_entry and registry_entry.device_id
                else None
            )
            serial = next(
                (
                    identifier
                    for domain, identifier in (device_entry.identifiers if device_entry else ())
                    if domain == DOMAIN
                ),
                None,
            )
            entry = (
                hass.config_entries.async_get_entry(registry_entry.config_entry_id)
                if registry_entry
                else None
            )
            runtime: BotslabRuntimeData | None = getattr(entry, "runtime_data", None)
            device = runtime.coordinator.data.get(serial) if runtime and serial else None

            if runtime is None or device is None:
                unknown.append(entity_id)
                continue
            selected.append((runtime.coordinator, device))

        if unknown:
            _LOGGER.warning(
                "%s called for unknown or offline entity id(s): %s",
                call.service,
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
                    # Each zone is an (x1, y1, x2, y2) rectangle. Coercing the
                    # whole list to float would reject every valid zone, so the
                    # coercion belongs on the individual coordinates.
                    [vol.ExactSequence((vol.Coerce(float),) * 4)],
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
