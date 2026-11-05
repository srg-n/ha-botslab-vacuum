"""Home Assistant integration for Botslab Vacuum Robots."""
from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration
import voluptuous as vol

from .api import BotslabVacuumApi
from .const import (
    ACTIVE_STATUSES,
    ATTR_ACTIVE,
    ATTR_CONSUMABLE_TYPE,
    ATTR_DAYS,
    ATTR_ENTITY_ID,
    ATTR_FAN_SPEED,
    ATTR_MODE,
    ATTR_MOP_MODE,
    ATTR_PASSES,
    ATTR_REPEAT_TIMES,
    ATTR_ROOM_IDS,
    ATTR_ROOM_NAMES,
    ATTR_SLOT,
    ATTR_SUCTION,
    ATTR_TIME,
    ATTR_WATER_LEVEL,
    ATTR_X,
    ATTR_Y,
    ATTR_ZONES,
    CONF_ENABLE_MAP,
    CONF_M2,
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
    PLATFORMS,
    SERVICE_CLEAN_ROOMS,
    SERVICE_CLEAN_ZONE,
    SERVICE_DELETE_SCHEDULE,
    SERVICE_GOTO_LOCATION,
    SERVICE_LOCATE,
    SERVICE_REFRESH_ROOMS,
    SERVICE_RESET_CONSUMABLE,
    SERVICE_RUN_SCHEDULE,
    SERVICE_SET_MOP_MODE,
    SERVICE_SET_NO_GO_ZONES,
    SERVICE_SET_SCHEDULE,
    SERVICE_SET_WATER_LEVEL,
    SERVICE_SYNC_MAP,
    STATUS_CLEANING,
)
from .coordinator import BotslabRuntimeData, BotslabVacuumCoordinator
from .qpush import BotslabChinaQPush, BotslabQPush

_LOGGER = logging.getLogger(__name__)

# Frontend cards bundled in ./www and auto-registered so dashboards work zero-config
_CARDS = ["botslab-routines-card.js", "xiaomi-vacuum-map-card.js"]


async def _register_resources(hass: HomeAssistant, base: str, ver: str) -> bool:
    """Register bundled frontend cards in Lovelace resources."""
    data = hass.data.get("lovelace")
    resources = getattr(data, "resources", None)
    if resources is None and isinstance(data, dict):
        resources = data.get("resources")
    if resources is None or not hasattr(resources, "async_create_item"):
        return False
    try:
        if not getattr(resources, "loaded", True):
            await resources.async_load()
            resources.loaded = True
        by_base = {item["url"].split("?")[0]: item for item in resources.async_items()}
        for c in _CARDS:
            url = f"{base}/{c}"
            full = f"{url}?v={ver}"
            item = by_base.get(url)
            if item is None:
                await resources.async_create_item({"res_type": "module", "url": full})
            elif item.get("url") != full:
                await resources.async_update_item(
                    item["id"], {"res_type": "module", "url": full}
                )
        return True
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("Botslab resource registration failed: %s", err)
        return False


async def _register_frontend(hass: HomeAssistant) -> None:
    """Register static path and Lovelace resources for bundled frontend cards."""
    store = hass.data.setdefault(DOMAIN, {})
    if store.get("_frontend_registered"):
        return
    store["_frontend_registered"] = True
    www = Path(__file__).parent / "www"
    base = f"/{DOMAIN}/www"
    try:
        await hass.http.async_register_static_paths(
            [StaticPathConfig(f"{base}/{c}", str(www / c), True) for c in _CARDS]
        )
    except Exception as err:  # noqa: BLE001
        _LOGGER.warning("Botslab static path registration failed: %s", err)
        return
    try:
        ver = (await async_get_integration(hass, DOMAIN)).version or "0"
    except Exception:  # noqa: BLE001
        ver = "0"
    if not await _register_resources(hass, base, ver):
        for c in _CARDS:
            add_extra_js_url(hass, f"{base}/{c}?v={ver}")
    _LOGGER.debug("Botslab bundled frontend cards registered")


async def _run_due_routines(
    hass: HomeAssistant, coordinator: BotslabVacuumCoordinator, now: Any
) -> None:
    """Evaluate and run scheduled HA-driven routines matching current time."""
    day = (now.weekday() + 1) % 7  # 0=Sunday .. 6=Saturday
    hhmm = now.strftime("%H:%M")
    for r in coordinator.routines:
        if not r.get("active") or r.get("time") != hhmm:
            continue
        days = r.get("days") or []
        if days and day not in days:
            continue
        if any(d.status in ACTIVE_STATUSES for d in coordinator.data.values()):
            _LOGGER.info("Botslab routine '%s' skipped: vacuum is already active", hhmm)
            continue
        try:
            await coordinator.async_run_routine(r)
            _LOGGER.info("Botslab routine fired at %s (rooms=%s)", hhmm, r.get("room_ids"))
        except Exception as err:  # noqa: BLE001
            _LOGGER.warning("Botslab routine run failed: %s", err)


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
    await _register_frontend(hass)
    session = async_get_clientsession(hass)
    region = entry.data.get(CONF_REGION, DEFAULT_REGION)
    m2 = entry.data[CONF_M2]
    q = entry.data.get(CONF_Q, "")
    t = entry.data.get(CONF_T, "")
    qid = entry.data.get(CONF_QID, "")

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
        qid=qid,
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

    # Launch real-time push socket listener in background
    qpush: BotslabQPush | BotslabChinaQPush | None = None
    qpush_task = None
    if api.is_legacy_360:
        qpush = BotslabChinaQPush(
            get_sid=lambda: api.sid,
            get_push_key=lambda: api.push_key,
            on_push=lambda payload: hass.async_create_task(coordinator.async_on_push(payload)),
            ensure_session=coordinator.ensure_valid_session,
        )
        qpush_task = hass.async_create_background_task(
            qpush.run(), name=f"china_qpush_{entry.entry_id}"
        )
    else:
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

    # HA-driven routine runner: evaluate once every minute
    @callback
    def _tick(now: Any) -> None:
        hass.async_create_task(_run_due_routines(hass, coordinator, now))

    entry.async_on_unload(async_track_time_change(hass, _tick, second=0))

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
        if runtime.qpush is not None:
            await runtime.qpush.stop()
        if runtime.qpush_task and not runtime.qpush_task.done():
            runtime.qpush_task.cancel()
        entry.runtime_data = None

    return unload_ok


def _parse_room_ids(raw: Any) -> list[str]:
    """Normalize various room ID inputs (int, str, JSON list, dict list) into list of str IDs."""
    if raw is None:
        return []
    if isinstance(raw, (int, float)):
        return [str(int(raw))]
    if isinstance(raw, str):
        trimmed = raw.strip()
        if not trimmed:
            return []
        if trimmed.startswith("[") and trimmed.endswith("]"):
            try:
                parsed = json.loads(trimmed)
                return _parse_room_ids(parsed)
            except Exception:
                pass
        return [
            part.strip().strip("'\"")
            for part in trimmed.replace("[", "").replace("]", "").split(",")
            if part.strip().strip("'\"")
        ]
    if isinstance(raw, (list, tuple, set)):
        result: list[str] = []
        for item in raw:
            if isinstance(item, dict):
                rid = item.get("id") if item.get("id") is not None else item.get("room_id")
                if rid is not None:
                    result.append(str(rid).strip())
            elif isinstance(item, (list, tuple)):
                result.extend(_parse_room_ids(item))
            elif item is not None:
                s = str(item).strip().strip("'\"")
                if s:
                    result.append(s)
        return list(dict.fromkeys(result))
    return [str(raw).strip()]


def _parse_zones(raw: Any) -> list[list[float]]:
    """Normalize zone inputs (nested list, flat 4-tuple, JSON string, dict) into list of [x1, y1, x2, y2]."""
    if raw is None:
        return []
    if isinstance(raw, str):
        trimmed = raw.strip()
        if not trimmed:
            return []
        try:
            parsed = json.loads(trimmed)
            return _parse_zones(parsed)
        except Exception:
            return []
    if isinstance(raw, (list, tuple)):
        if not raw:
            return []
        if len(raw) == 4 and all(isinstance(c, (int, float)) for c in raw):
            return [[float(c) for c in raw]]
        zones: list[list[float]] = []
        for item in raw:
            if isinstance(item, (list, tuple)) and len(item) >= 4:
                try:
                    zones.append([float(item[0]), float(item[1]), float(item[2]), float(item[3])])
                except (ValueError, TypeError):
                    pass
            elif isinstance(item, dict):
                x1 = item.get("x1", item.get("x_min", item.get("p1_x")))
                y1 = item.get("y1", item.get("y_min", item.get("p1_y")))
                x2 = item.get("x2", item.get("x_max", item.get("p2_x")))
                y2 = item.get("y2", item.get("y_max", item.get("p2_y")))
                if None not in (x1, y1, x2, y2):
                    try:
                        zones.append([float(x1), float(y1), float(x2), float(y2)])
                    except (ValueError, TypeError):
                        pass
        return zones
    return []


def _register_services(hass: HomeAssistant) -> None:
    """Register custom vacuum services in Home Assistant."""
    if hass.services.has_service(DOMAIN, SERVICE_CLEAN_ROOMS):
        return

    def _targets(call: ServiceCall) -> list[tuple[BotslabVacuumCoordinator, Any]]:
        """Resolve a service call to the devices it should affect."""
        raw_entity_ids = (
            call.data.get(ATTR_ENTITY_ID)
            or call.data.get("entity_ids")
            or call.data.get("entity")
            or []
        )
        if isinstance(raw_entity_ids, str):
            entity_ids = [e.strip() for e in raw_entity_ids.split(",") if e.strip()]
        elif isinstance(raw_entity_ids, (list, tuple, set)):
            entity_ids = [str(e).strip() for e in raw_entity_ids if e]
        else:
            entity_ids = []

        if not entity_ids:
            _LOGGER.warning(
                "%s was called without a target entity, so it was ignored. "
                "Pass entity_id to choose which robot should run the command.",
                call.service,
            )
            return []

        all_vacuums: list[tuple[BotslabVacuumCoordinator, Any]] = []
        for entry in hass.config_entries.async_entries(DOMAIN):
            runtime: BotslabRuntimeData | None = getattr(entry, "runtime_data", None)
            if runtime and runtime.coordinator and runtime.coordinator.data:
                for dev in runtime.coordinator.data.values():
                    all_vacuums.append((runtime.coordinator, dev))

        entities = er.async_get(hass)
        devices = dr.async_get(hass)

        selected: list[tuple[BotslabVacuumCoordinator, Any]] = []
        unknown: list[str] = []

        for entity_id in entity_ids:
            matched = False
            registry_entry = entities.async_get(entity_id)
            if registry_entry and registry_entry.device_id:
                device_entry = devices.async_get(registry_entry.device_id)
                serial = next(
                    (
                        identifier
                        for domain, identifier in (device_entry.identifiers if device_entry else ())
                        if domain == DOMAIN
                    ),
                    None,
                )
                entry = hass.config_entries.async_get_entry(registry_entry.config_entry_id)
                runtime = getattr(entry, "runtime_data", None)
                device = runtime.coordinator.data.get(serial) if runtime and serial else None
                if runtime and device:
                    selected.append((runtime.coordinator, device))
                    matched = True

            if not matched:
                low_id = entity_id.lower()
                for coord, dev in all_vacuums:
                    sn = dev.device_name.lower()
                    title = dev.device_title.lower()
                    if (
                        entity_id == dev.device_name
                        or low_id == sn
                        or low_id == title
                        or low_id.endswith(sn)
                        or sn in low_id
                    ):
                        selected.append((coord, dev))
                        matched = True
                        break

            if not matched:
                unknown.append(entity_id)

        if unknown:
            _LOGGER.error(
                "%s failed: could not resolve target entity/device: %s",
                call.service,
                ", ".join(unknown),
            )
            raise ServiceValidationError(
                f"Unknown or offline target entity for {call.service}: {', '.join(unknown)}"
            )

        return selected

    async def handle_clean_rooms(call: ServiceCall) -> None:
        raw_rooms = (
            call.data.get(ATTR_ROOM_IDS)
            or call.data.get("room_id")
            or call.data.get("rooms")
            or call.data.get("selection")
        )
        room_names = call.data.get(ATTR_ROOM_NAMES)
        repeat = call.data.get(ATTR_REPEAT_TIMES) or call.data.get("repeats") or 1
        try:
            repeat = int(repeat)
        except (ValueError, TypeError):
            repeat = 1
        speed = call.data.get(ATTR_FAN_SPEED)
        water = call.data.get(ATTR_WATER_LEVEL)

        room_ids = _parse_room_ids(raw_rooms)
        wanted_names = [n.strip().lower() for n in (room_names or []) if n and n.strip()]

        if not room_ids and not wanted_names:
            raise ServiceValidationError("clean_rooms called without room IDs or room names")

        targets = _targets(call)
        for coordinator, dev in targets:
            target_ids = list(room_ids)
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

            target_ids = list(dict.fromkeys(target_ids))
            if not target_ids:
                continue

            _LOGGER.info(
                "handle_clean_rooms dispatching to %s (%s): rooms=%s, repeats=%d, speed=%s, water=%s",
                dev.device_title,
                dev.device_name,
                target_ids,
                repeat,
                speed,
                water,
            )
            coordinator.set_optimistic_status(dev.device_name, STATUS_CLEANING)
            coordinator.schedule_followup_refreshes()
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
        raw_zones = (
            call.data.get(ATTR_ZONES)
            or call.data.get("zone")
            or call.data.get("selection")
            or []
        )
        zones = _parse_zones(raw_zones)
        repeat = call.data.get(ATTR_REPEAT_TIMES) or call.data.get("repeats") or 1
        try:
            repeat = int(repeat)
        except (ValueError, TypeError):
            repeat = 1
        speed = call.data.get(ATTR_FAN_SPEED)
        water = call.data.get(ATTR_WATER_LEVEL)

        if not zones:
            raise ServiceValidationError(f"clean_zone called without valid zones: {raw_zones}")

        targets = _targets(call)
        for coordinator, dev in targets:
            _LOGGER.info(
                "handle_clean_zone dispatching to %s (%s): zones=%s, repeats=%d, speed=%s, water=%s",
                dev.device_title,
                dev.device_name,
                zones,
                repeat,
                speed,
                water,
            )
            coordinator.set_optimistic_status(dev.device_name, STATUS_CLEANING)
            coordinator.schedule_followup_refreshes()
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
        raw_x = call.data.get(ATTR_X) or call.data.get("point_x") or 0
        raw_y = call.data.get(ATTR_Y) or call.data.get("point_y") or 0
        try:
            x = int(round(float(raw_x)))
            y = int(round(float(raw_y)))
        except (ValueError, TypeError):
            raise ServiceValidationError(f"Invalid x/y coordinates: x={raw_x}, y={raw_y}")

        targets = _targets(call)
        for coordinator, dev in targets:
            _LOGGER.info(
                "handle_goto_location dispatching to %s (%s): (%d, %d)",
                dev.device_title,
                dev.device_name,
                x,
                y,
            )
            coordinator.set_optimistic_status(dev.device_name, STATUS_CLEANING)
            coordinator.schedule_followup_refreshes()
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

    async def handle_set_no_go_zones(call: ServiceCall) -> None:
        zones = call.data.get(ATTR_ZONES, [])
        mode = call.data.get(ATTR_MODE, "replace")

        for coordinator, dev in _targets(call):
            map_id = dev.current_map_id
            if not map_id:
                map_json, props = await coordinator.api.get_map_json(dev.device_name, dev.product_key)
                raw_oss = props.get("MapPkgOssInfo") if props else None
                oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
                map_id = int(oss_info.get("MapID", 28239))

            existing = []
            if dev.map_info and dev.map_info.no_go_zones:
                existing = list(dev.map_info.no_go_zones)

            new_zones = []
            for z in zones or []:
                if len(z) >= 4:
                    x1, y1, x2, y2 = (
                        int(round(z[0])),
                        int(round(z[1])),
                        int(round(z[2])),
                        int(round(z[3])),
                    )
                    new_zones.append({
                        "vertexs": [[x1, y1], [x2, y1], [x2, y2], [x1, y2]],
                        "active": "forbid",
                        "forbidType": "all",
                        "tag": "",
                    })

            if mode == "clear":
                result = []
            elif mode == "add":
                result = existing + new_zones
            else:  # replace
                result = new_zones

            for i, a in enumerate(result):
                a["id"] = i
                a.setdefault("name", f"rect{i}")

            await coordinator.api.set_no_go_zones(
                sn=dev.device_name,
                product_key=dev.product_key,
                map_id=map_id,
                places=result,
            )
            coordinator.api.clear_map_cache(dev.device_name)
            await coordinator.async_request_refresh()

    async def handle_set_schedule(call: ServiceCall) -> None:
        time_str = call.data[ATTR_TIME]
        days = call.data[ATTR_DAYS]
        room_ids = call.data.get(ATTR_ROOM_IDS, [])
        suction = call.data.get(ATTR_SUCTION, "auto")
        passes = call.data.get(ATTR_PASSES, 1)
        active = call.data.get(ATTR_ACTIVE, True)
        slot = call.data.get(ATTR_SLOT, -1)

        routine = {
            "time": time_str,
            "days": [int(d) for d in (days or [])],
            "room_ids": [str(r) for r in (room_ids or [])],
            "suction": suction,
            "passes": 2 if int(passes) == 2 else 1,
            "active": bool(active),
        }

        for coordinator, _ in _targets(call):
            routines = list(coordinator.routines)
            if 0 <= slot < len(routines):
                routines[slot] = routine
            else:
                routines.append(routine)
            await coordinator.save_routines(routines)

    async def handle_delete_schedule(call: ServiceCall) -> None:
        slot = int(call.data[ATTR_SLOT])
        for coordinator, _ in _targets(call):
            routines = list(coordinator.routines)
            if 0 <= slot < len(routines):
                routines.pop(slot)
                await coordinator.save_routines(routines)
            else:
                _LOGGER.warning("delete_schedule: slot %d out of range", slot)

    async def handle_run_schedule(call: ServiceCall) -> None:
        slot = int(call.data[ATTR_SLOT])
        for coordinator, _ in _targets(call):
            routines = coordinator.routines
            if 0 <= slot < len(routines):
                await coordinator.async_run_routine(routines[slot])
            else:
                _LOGGER.warning("run_schedule: slot %d out of range", slot)

    hass.services.async_register(
        DOMAIN,
        SERVICE_CLEAN_ROOMS,
        handle_clean_rooms,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Optional(ATTR_ROOM_IDS): cv.ensure_list,
                vol.Optional(ATTR_ROOM_NAMES): vol.All(cv.ensure_list, [cv.string]),
                vol.Optional(ATTR_REPEAT_TIMES, default=1): vol.Coerce(int),
                vol.Optional(ATTR_FAN_SPEED): cv.string,
                vol.Optional(ATTR_WATER_LEVEL): cv.string,
            },
            extra=vol.ALLOW_EXTRA,
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
            },
            extra=vol.ALLOW_EXTRA,
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
                vol.Optional(ATTR_X): vol.Coerce(float),
                vol.Optional(ATTR_Y): vol.Coerce(float),
            },
            extra=vol.ALLOW_EXTRA,
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

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_NO_GO_ZONES,
        handle_set_no_go_zones,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Optional(ATTR_ZONES, default=[]): vol.All(
                    cv.ensure_list,
                    [vol.ExactSequence((vol.Coerce(float),) * 4)],
                ),
                vol.Optional(ATTR_MODE, default="replace"): vol.In(["replace", "add", "clear"]),
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET_SCHEDULE,
        handle_set_schedule,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_TIME): cv.string,
                vol.Required(ATTR_DAYS): vol.All(cv.ensure_list, [vol.All(vol.Coerce(int), vol.Range(min=0, max=6))]),
                vol.Optional(ATTR_ROOM_IDS, default=[]): vol.All(cv.ensure_list, [cv.string]),
                vol.Optional(ATTR_SUCTION, default="auto"): vol.In(
                    ["quiet", "standard", "powerful", "max", "auto"]
                ),
                vol.Optional(ATTR_PASSES, default=1): vol.In([1, 2]),
                vol.Optional(ATTR_ACTIVE, default=True): cv.boolean,
                vol.Optional(ATTR_SLOT, default=-1): vol.Coerce(int),
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_DELETE_SCHEDULE,
        handle_delete_schedule,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_SLOT): vol.Coerce(int),
            }
        ),
    )

    hass.services.async_register(
        DOMAIN,
        SERVICE_RUN_SCHEDULE,
        handle_run_schedule,
        schema=vol.Schema(
            {
                vol.Optional(ATTR_ENTITY_ID): cv.ensure_list,
                vol.Required(ATTR_SLOT): vol.Coerce(int),
            }
        ),
    )
