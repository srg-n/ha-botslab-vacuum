"""Camera platform exposing the robot's live cleaning map.

The integration decodes the cloud map package and renders a PNG locally.
Serving it as a camera entity (rather than an image entity) is what allows
dashboard map cards to work, because they read the map geometry and room
outlines straight from the camera's attributes:

    calibration_points  corners that map robot coordinates onto the image
    rooms               polygon outlines, for drawing room shapes

Those attributes are produced by :class:`BotslabMapInfo`, which is derived
from the same cloud payload the image is rendered from, so they always agree.
"""
from __future__ import annotations

import logging

from homeassistant.components.camera import Camera
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up map camera entities from a config entry."""
    coordinator: BotslabVacuumCoordinator = hass.data[DOMAIN][entry.entry_id]["coordinator"]
    async_add_entities(
        BotslabMapCamera(coordinator, device)
        for device in coordinator.data.values()
    )


class BotslabMapCamera(BotslabVacuumEntity, Camera):
    """Live cleaning map of a single vacuum."""

    _attr_should_poll = False
    _attr_content_type = "image/png"

    def __init__(
        self,
        coordinator: BotslabVacuumCoordinator,
        device: BotslabVacuumDevice,
    ) -> None:
        super().__init__(coordinator, device)
        self._attr_unique_id = f"{device.device_name}_map_camera"
        self._attr_translation_key = "cleaning_map"

    @property
    def _map_info(self):  # noqa: ANN202 - BotslabMapInfo | None
        """Return map geometry for this robot, if one has been fetched."""
        device = self.device
        if device is None or device.map_info is None:
            return None
        return device.map_info

    @property
    def extra_state_attributes(self) -> dict:
        """Publish map geometry so dashboard cards can calibrate themselves."""
        info = self._map_info
        if info is None:
            return {}
        return {
            "calibration_points": info.calibration_points(),
            "rooms": info.room_attributes(),
            "map_width": info.width,
            "map_height": info.height,
            "x_min": info.x_min,
            "y_min": info.y_min,
            "resolution": info.resolution,
        }

    async def async_camera_image(
        self, width: int | None = None, height: int | None = None
    ) -> bytes | None:
        """Return the rendered map, fetching it on demand if still missing."""
        device = self.device
        if device is None:
            return None
        if device.map_image_bytes:
            return device.map_image_bytes

        # The coordinator only fetches maps for active robots or on first
        # sight. Ask for it directly so a docked robot still shows its map.
        try:
            return await self.coordinator.api.get_live_map(
                device.device_name, device.product_key
            )
        except Exception as err:  # noqa: BLE001 - surfaced through the log
            _LOGGER.debug("Map fetch for camera %s failed: %s", self._attr_unique_id, err)
            return None