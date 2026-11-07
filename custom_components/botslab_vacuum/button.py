"""Button platform for Botslab vacuum actions."""
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
import logging
from pathlib import Path
from typing import Any, Awaitable, Final

from homeassistant.components.button import ButtonEntity, ButtonEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity import EntityCategory
from homeassistant.helpers.entity_platform import AddEntitiesCallback

_LOGGER = logging.getLogger(__name__)

from .const import DOMAIN
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .i18n import translate
from .lovelace import MAINTENANCE_ROWS, build_full_dashboard_snippet
from .models import BotslabVacuumDevice

PARALLEL_UPDATES: Final = 0

# Where the generated snippet is written inside the Home Assistant config dir.
MAP_CARD_FILENAME = "botslab_map_card.yaml"

# Entities the dashboard cards address, as ``(key, platform, unique id suffix)``.
# The map card needs the first two; the rest fill the maintenance card.
CARD_ENTITIES: tuple[tuple[str, str, str], ...] = (
    ("vacuum", "vacuum", "vacuum"),
    ("camera", "camera", "map_camera"),
    ("battery", "sensor", "battery"),
    ("schedules", "sensor", "schedules"),
    *((key, platform, suffix) for key, platform, suffix, _ in MAINTENANCE_ROWS),
)


def _resolve_card_entity_ids(
    hass: HomeAssistant, device: BotslabVacuumDevice
) -> dict[str, str]:
    """Return the real entity ids for one robot's dashboard cards.

    Entity ids cannot be guessed from a unique id: Home Assistant builds them
    from the entity and device names, so ``camera.<serial>_map_camera`` does not
    exist. Every id is therefore looked up in the entity registry, and
    entities that are not registered are left out.
    """
    registry = er.async_get(hass)
    resolved: dict[str, str] = {}
    for key, platform, suffix in CARD_ENTITIES:
        entity_id = registry.async_get_entity_id(
            platform, DOMAIN, f"{device.device_name}_{suffix}"
        )
        if entity_id:
            resolved[key] = entity_id
    return resolved


async def _async_generate_map_card(
    hass: HomeAssistant,
    coordinator: BotslabVacuumCoordinator,
    device: BotslabVacuumDevice,
) -> None:
    """Render a ready-to-paste Lovelace card from the robot's live map.

    Room outlines are device specific and change whenever rooms are edited in
    the Botslab app, so the configuration is generated on demand. It is shown
    as a notification and written to the Home Assistant config directory so it
    can be copied or included in a dashboard.
    """
    from homeassistant.components import persistent_notification

    # Pull fresh geometry: a cached map may predate a room rename.
    try:
        await coordinator.async_refresh_rooms(device.device_name)
    except Exception as err:  # noqa: BLE001 - surfaced to the user
        _LOGGER.debug("Room refresh before card generation failed: %s", err)
    await coordinator.async_request_refresh()

    device = coordinator.data.get(device.device_name) if coordinator.data else device
    entity_ids = _resolve_card_entity_ids(hass, device)
    is_legacy = getattr(coordinator.api, "is_legacy_360", False) is True
    room_count = len([r for r in device.rooms if len(r.outline) >= 3])

    lang = getattr(hass.config, "language", "en") or "en"

    # A card without both of these cannot work for modern robots, and they are absent when the
    # map is disabled and the camera entity was never created. For legacy 360, vacuum entity is sufficient.
    if is_legacy:
        if "vacuum" not in entity_ids:
            persistent_notification.async_create(
                hass,
                message=translate("err_no_vacuum", lang, title=device.device_title),
                title=translate("legacy_card_title", lang, title=device.device_title),
                notification_id=f"botslab_map_card_error_{device.device_name}",
            )
            return
    else:
        missing = [name for name in ("vacuum", "camera") if name not in entity_ids]
        if missing:
            persistent_notification.async_create(
                hass,
                message=translate(
                    "err_missing_entities",
                    lang,
                    title=device.device_title,
                    entities=", ".join(missing),
                ),
                title=translate("map_card_title", lang, title=device.device_title),
                notification_id=f"botslab_map_card_error_{device.device_name}",
            )
            return

    snippet = build_full_dashboard_snippet(device, entity_ids, is_legacy=is_legacy, lang=lang)

    try:
        path = Path(hass.config.path(MAP_CARD_FILENAME))
        path.write_text(snippet, encoding="utf-8")
    except OSError as err:
        _LOGGER.warning("Could not write %s: %s", MAP_CARD_FILENAME, err)
        path = None

    if is_legacy:
        title = translate("legacy_card_title", lang, title=device.device_title)
        message = translate(
            "legacy_card_msg",
            lang,
            title=device.device_title,
            filename=MAP_CARD_FILENAME,
            snippet=snippet,
        )
    elif not room_count:
        title = translate("map_card_title", lang, title=device.device_title)
        hint = translate(
            "map_disabled_hint" if not coordinator.enable_map else "map_sync_hint",
            lang,
        )
        message = translate("map_card_no_rooms", lang, hint=hint, snippet=snippet)
    else:
        title = translate("map_card_title", lang, title=device.device_title)
        message = translate(
            "map_card_success",
            lang,
            title=device.device_title,
            room_count=room_count,
            filename=MAP_CARD_FILENAME,
            snippet=snippet,
        )

    persistent_notification.async_create(
        hass,
        message,
        title=title,
        notification_id=f"botslab_map_card_{device.device_name}",
    )
    if is_legacy:
        _LOGGER.info(
            "Generated Lovelace dashboard card for legacy 360 robot %s",
            device.device_title,
        )
    else:
        _LOGGER.info(
            "Generated Lovelace map card for %s with %d rooms",
            device.device_title,
            room_count,
        )


@dataclass(frozen=True, kw_only=True)
class BotslabButtonEntityDescription(ButtonEntityDescription):
    """Describes a Botslab button entity."""
    press_fn: Callable[
        [HomeAssistant, BotslabVacuumCoordinator, BotslabVacuumDevice], Awaitable[Any]
    ]


BUTTON_DESCRIPTIONS: tuple[BotslabButtonEntityDescription, ...] = (
    BotslabButtonEntityDescription(
        key="locate",
        translation_key="locate",
        icon="mdi:map-marker-question",
        press_fn=lambda _hass, coord, dev: coord.api.locate(dev.device_name, dev.product_key),
    ),
    BotslabButtonEntityDescription(
        key="refresh_rooms",
        translation_key="refresh_rooms",
        icon="mdi:floor-plan",
        press_fn=lambda _hass, coord, dev: coord.async_refresh_rooms(dev.device_name),
    ),
    BotslabButtonEntityDescription(
        key="sync_map",
        translation_key="sync_map",
        icon="mdi:cloud-sync",
        press_fn=lambda _hass, coord, dev: coord.api.start_map_sync(dev.device_name, dev.product_key, 60),
    ),
    BotslabButtonEntityDescription(
        key="reset_filter",
        translation_key="reset_filter",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "filter"),
    ),
    BotslabButtonEntityDescription(
        key="reset_main_brush",
        translation_key="reset_main_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "main_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_side_brush",
        translation_key="reset_side_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "side_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_sensors",
        translation_key="reset_sensors",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.reset_consumable(dev.device_name, "sensor"),
    ),
    BotslabButtonEntityDescription(
        key="generate_map_card",
        translation_key="generate_map_card",
        icon="mdi:file-code-outline",
        press_fn=_async_generate_map_card,
    ),
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Botslab button entities."""
    coordinator = entry.runtime_data.coordinator
    entities = []
    for device in coordinator.data.values():
        for desc in BUTTON_DESCRIPTIONS:
            entities.append(BotslabButton(coordinator, device, desc))
    async_add_entities(entities)


class BotslabButton(BotslabVacuumEntity, ButtonEntity):
    """Botslab button entity."""

    entity_description: BotslabButtonEntityDescription

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
        description: BotslabButtonEntityDescription,
    ) -> None:
        super().__init__(coordinator, device)
        self.entity_description = description
        self._attr_unique_id = f"{device.device_name}_{description.key}"
        self._attr_translation_key = description.translation_key

    async def async_press(self) -> None:
        """Handle button press."""
        if not self.device:
            return
        await self.entity_description.press_fn(self.hass, self.coordinator, self.device)
        if not self.entity_description.key.startswith("reset_"):
            await self.coordinator.async_request_refresh()
