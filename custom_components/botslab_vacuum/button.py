"""Button platform for Botslab vacuum actions."""
from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
import logging
from pathlib import Path
from typing import Any, Awaitable

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
from .lovelace import MAINTENANCE_ROWS, build_full_dashboard_snippet
from .models import BotslabVacuumDevice

# Where the generated snippet is written inside the Home Assistant config dir.
MAP_CARD_FILENAME = "botslab_map_card.yaml"

# Entities the dashboard cards address, as ``(key, platform, unique id suffix)``.
# The map card needs the first two; the rest fill the maintenance card.
CARD_ENTITIES: tuple[tuple[str, str, str], ...] = (
    ("vacuum", "vacuum", "vacuum"),
    ("camera", "camera", "map_camera"),
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

    # A card without both of these cannot work, and they are absent when the
    # map is disabled and the camera entity was never created.
    missing = [name for name in ("vacuum", "camera") if name not in entity_ids]
    if missing:
        persistent_notification.async_create(
            hass,
            "Botslab map card",
            f"No {', '.join(missing)} entity is registered for "
            f"{device.device_title}, so the card could not be generated. "
            "Check that the robot is loaded and that **Enable live map** is on "
            "in the integration options.",
        )
        return

    snippet = build_full_dashboard_snippet(device, entity_ids)

    try:
        path = Path(hass.config.path(MAP_CARD_FILENAME))
        path.write_text(snippet, encoding="utf-8")
    except OSError as err:
        _LOGGER.warning("Could not write %s: %s", MAP_CARD_FILENAME, err)
        path = None

    room_count = len([r for r in device.rooms if len(r.outline) >= 3])
    if not room_count:
        hint = (
            "Map support is currently disabled in the integration options. "
            "Enable **Enable live map** for this robot, then press this "
            "button again.\n\n"
            if not coordinator.enable_map
            else "Press **Sync Map** on the robot first so it uploads its "
            "floor plan to the cloud, then press this button again.\n\n"
        )
        message = (
            f"No room geometry available yet. {hint}"
            f"Config file: {path if path else '(could not be written)'}"
        )
    else:
        message = (
            f"Map card generated for **{device.device_title}** "
            f"({room_count} rooms).\n\n"
            f"Saved to `{MAP_CARD_FILENAME}` in your Home Assistant config "
            "directory. Open your dashboard editor, add a **Manual** card and "
            "paste the contents.\n\n"
            "Requires the *xiaomi-vacuum-map-card* frontend card."
        )

    persistent_notification.async_create(
        f"Botslab map card - {device.device_title}",
        message,
        notification_id=f"botslab_map_card_{device.device_name}",
    )
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
        press_fn=lambda _hass, coord, dev: coord.api.reset_consumable(dev.device_name, dev.product_key, "filter"),
    ),
    BotslabButtonEntityDescription(
        key="reset_main_brush",
        translation_key="reset_main_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.api.reset_consumable(dev.device_name, dev.product_key, "main_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_side_brush",
        translation_key="reset_side_brush",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.api.reset_consumable(dev.device_name, dev.product_key, "side_brush"),
    ),
    BotslabButtonEntityDescription(
        key="reset_sensors",
        translation_key="reset_sensors",
        icon="mdi:restore",
        entity_category=EntityCategory.CONFIG,
        press_fn=lambda _hass, coord, dev: coord.api.reset_consumable(dev.device_name, dev.product_key, "sensor"),
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
        await self.coordinator.async_request_refresh()
