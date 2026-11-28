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
from typing import Final

from homeassistant.components.camera import Camera
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .coordinator import BotslabVacuumCoordinator
from .entity import BotslabVacuumEntity
from .models import BotslabVacuumDevice, ensure_safe_attribute_size, simplify_points

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES: Final = 0


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up map camera entities from a config entry."""
    coordinator = entry.runtime_data.coordinator
    if not coordinator.enable_map:
        # The user turned maps off to save bandwidth and CPU; do not create
        # camera entities that would immediately start fetching again.
        return
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
        # Camera.__init__ has to run explicitly. The coordinator base class in
        # the middle of the MRO does not chain upwards, so Camera's own setup
        # would never happen and the entity fails to be added with
        # "no attribute '_webrtc_provider'".
        Camera.__init__(self)
        BotslabVacuumEntity.__init__(self, coordinator, device)
        self._attr_unique_id = f"{device.device_name}_map_camera"
        self._attr_translation_key = "cleaning_map"
        self._attr_entity_registry_enabled_default = coordinator.enable_map

    @property
    def entity_picture(self) -> str | None:
        """Return dynamic entity picture with revision counter for live map updates."""
        try:
            base = super().entity_picture
        except AttributeError:
            base = f"/api/camera_proxy/{self.entity_id}?token={getattr(self, 'access_token', '')}"
        if not base:
            return None
        version = self.coordinator.get_map_version(self._device_sn)
        if version > 0:
            return f"{base}&v={version}"
        return base

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
        sc = info.scale if info.scale > 0 else 4
        cmin, cmax = info.cmin, info.cmax
        rmin, rmax = info.rmin, info.rmax
        if cmax > cmin and rmax > rmin:
            img_w = (cmax - cmin + 1) * sc
            img_h = (rmax - rmin + 1) * sc
        else:
            img_w = info.width * sc
            img_h = info.height * sc
        attrs = {
            "calibration_points": info.calibration_points(),
            "rooms": info.room_attributes(),
            "map_width": img_w,
            "map_height": img_h,
            "image_width": img_w,
            "image_height": img_h,
            "grid_width": info.width,
            "grid_height": info.height,
            "x_min": info.x_min,
            "y_min": info.y_min,
            "resolution": info.resolution,
        }
        device = self.device
        map_id_val = (
            str(info.map_id).strip()
            if getattr(info, "map_id", "")
            else ((device.current_map_id or device.clean_id) if device else "")
        )
        if not map_id_val:
            map_id_val = "live"
        attrs["map_id"] = map_id_val
        attrs["saved_map_id"] = map_id_val
        attrs["selected_map_id"] = map_id_val
        attrs["selected_map"] = map_id_val
        if info.dock_position:
            attrs["dock"] = list(info.dock_position)
            if len(info.dock_position) >= 2:
                attrs["charger_position"] = {
                    "x": float(info.dock_position[0]),
                    "y": float(info.dock_position[1]),
                    "a": 0.0,
                }
        if device and device.robot_pose and len(device.robot_pose) >= 2:
            attrs["vacuum_position"] = {
                "x": float(device.robot_pose[0]),
                "y": float(device.robot_pose[1]),
                "a": float(device.robot_pose[2]) if len(device.robot_pose) >= 3 else 0.0,
            }
        if device and device.cleaning_path:
            simp_path = simplify_points(device.cleaning_path, epsilon=100.0, max_points=100)
            attrs["cleaning_path"] = simp_path
            attrs["path"] = simp_path
        active_no_go = (
            info.no_go_zones
            if info.no_go_zones
            else (device.no_go_zones if device and device.no_go_zones else [])
        )
        attrs["no_go_zones"] = active_no_go
        ws = ""
        if device and device.props:
            ws = str(device.props.get("WorkingStatus", "")).strip().lower()
        if info.clean_zones and ws in ("3", "cleaninzones"):
            attrs["clean_zones"] = info.clean_zones
            attrs["zones"] = info.clean_zones
        if info.scale > 1:
            attrs["crop"] = {
                "cmin": info.cmin,
                "cmax": info.cmax,
                "rmin": info.rmin,
                "rmax": info.rmax,
                "scale": info.scale,
            }
        return ensure_safe_attribute_size(attrs)

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
            map_bytes = await self.coordinator.api.get_live_map(
                device.device_name,
                device.product_key,
                robot_pose=device.robot_pose,
                cleaning_path=device.cleaning_path,
            )
            if map_bytes:
                device.map_image_bytes = map_bytes
                map_info = self.coordinator.api.get_cached_map_info(device.device_name)
                device.map_info = map_info
                if map_info and map_info.rooms:
                    device.rooms = map_info.rooms
                    self.coordinator._rooms_cache[device.device_name] = map_info.rooms
                if self.coordinator._map_cache.get(device.device_name) != map_bytes:
                    self.coordinator._map_version[device.device_name] = (
                        self.coordinator._map_version.get(device.device_name, 0) + 1
                    )
                self.coordinator._map_cache[device.device_name] = map_bytes
                if getattr(self, "hass", None) is not None and getattr(self, "entity_id", None):
                    self.async_write_ha_state()
            return map_bytes
        except Exception as err:  # noqa: BLE001 - surfaced through the log
            _LOGGER.debug("Map fetch for camera %s failed: %s", self._attr_unique_id, err)
            return None