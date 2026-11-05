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

    is_tr = (getattr(hass.config, "language", "en") or "en").startswith("tr")

    # A card without both of these cannot work for modern robots, and they are absent when the
    # map is disabled and the camera entity was never created. For legacy 360, vacuum entity is sufficient.
    if is_legacy:
        if "vacuum" not in entity_ids:
            persistent_notification.async_create(
                hass,
                message=(
                    f"{device.device_title} için kayıtlı bir vakum (vacuum) varlığı bulunamadı."
                    if is_tr
                    else f"No vacuum entity is registered for {device.device_title}."
                ),
                title="Botslab Kontrol Paneli" if is_tr else "Botslab dashboard card",
                notification_id=f"botslab_map_card_error_{device.device_name}",
            )
            return
    else:
        missing = [name for name in ("vacuum", "camera") if name not in entity_ids]
        if missing:
            persistent_notification.async_create(
                hass,
                message=(
                    f"{device.device_title} için gerekli ({', '.join(missing)}) varlıkları bulunamadı. "
                    "Robotun yüklü olduğundan ve entegrasyon ayarlarında **Canlı haritayı etkinleştir** seçeneğinin açık olduğundan emin olun."
                    if is_tr
                    else (
                        f"No {', '.join(missing)} entity is registered for "
                        f"{device.device_title}, so the card could not be generated. "
                        "Check that the robot is loaded and that **Enable live map** is on "
                        "in the integration options."
                    )
                ),
                title="Botslab Harita Kartı" if is_tr else "Botslab map card",
                notification_id=f"botslab_map_card_error_{device.device_name}",
            )
            return

    snippet = build_full_dashboard_snippet(device, entity_ids, is_legacy=is_legacy, is_tr=is_tr)

    try:
        path = Path(hass.config.path(MAP_CARD_FILENAME))
        path.write_text(snippet, encoding="utf-8")
    except OSError as err:
        _LOGGER.warning("Could not write %s: %s", MAP_CARD_FILENAME, err)
        path = None

    if is_tr:
        title = f"Botslab Harita Kartı - {device.device_title}"
        if is_legacy:
            message = (
                f"Kontrol paneli kartı **{device.device_title}** (Legacy 360 / S6) için oluşturuldu.\n\n"
                f"Kayıt konumu: `{MAP_CARD_FILENAME}` (Home Assistant yapılandırma klasörü).\n\n"
                "📋 **Hemen Kullanın**: Dosya yöneticisine gerek olmadan, aşağıdaki kodu kopyalayıp panonuzda **+ Kart Ekle ➔ Manuel** (en altta) alanına yapıştırın:\n\n"
                f"```yaml\n{snippet}\n```"
            )
        elif not room_count:
            hint = (
                "Harita desteği eklenti ayarlarında kapalı olabilir. Ayarlardan **Canlı haritayı etkinleştir** seçeneğini açıp tekrar deneyin.\n\n"
                if not coordinator.enable_map
                else "Robot henüz buluta kat planını yüklememiş olabilir. Önce robota **Sync Map** yapıp tekrar deneyin.\n\n"
            )
            message = (
                f"Henüz oda geometrisi bulunamadı. {hint}"
                "📋 Yine de temel kontrol ve bakım kartını kullanmak için aşağıdaki kodu panonuza yapıştırabilirsiniz:\n\n"
                f"```yaml\n{snippet}\n```"
            )
        else:
            message = (
                f"Harita kartı **{device.device_title}** ({room_count} oda) için başarıyla oluşturuldu.\n\n"
                f"Kayıt konumu: `{MAP_CARD_FILENAME}` (Home Assistant yapılandırma klasörü).\n\n"
                "📋 **Hemen Kullanın**: Dosya yöneticisine gerek olmadan, aşağıdaki kodu kopyalayıp panonuzda **+ Kart Ekle ➔ Manuel** (en altta) alanına yapıştırın:\n\n"
                f"```yaml\n{snippet}\n```"
            )
    else:
        title = f"Botslab Map Card - {device.device_title}"
        if is_legacy:
            message = (
                f"Dashboard card configuration generated for **{device.device_title}** (Legacy 360 / S6).\n\n"
                f"Saved to: `{MAP_CARD_FILENAME}` in your Home Assistant configuration directory.\n\n"
                "📋 **Direct Setup**: No file manager needed! Copy the YAML snippet below and paste it into **Edit Dashboard ➔ + Add Card ➔ Manual** (at the bottom):\n\n"
                f"```yaml\n{snippet}\n```"
            )
        elif not room_count:
            hint = (
                "Map support is currently disabled in the integration options. "
                "Enable **Enable live map** for this robot, then press this button again.\n\n"
                if not coordinator.enable_map
                else "Robot may not have synced its floor plan to the cloud yet. "
                "Press **Sync Map** on the robot first, then press this button again.\n\n"
            )
            message = (
                f"No room geometry available yet. {hint}"
                "📋 You can still use the control and maintenance card below by pasting it into your dashboard:\n\n"
                f"```yaml\n{snippet}\n```"
            )
        else:
            message = (
                f"Map card configuration generated for **{device.device_title}** ({room_count} rooms).\n\n"
                f"Saved to: `{MAP_CARD_FILENAME}` in your Home Assistant configuration directory.\n\n"
                "📋 **Direct Setup**: No file manager needed! Copy the YAML snippet below and paste it into **Edit Dashboard ➔ + Add Card ➔ Manual** (at the bottom):\n\n"
                f"```yaml\n{snippet}\n```\n\n"
                "Requires the bundled *xiaomi-vacuum-map-card* frontend card."
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
