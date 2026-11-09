"""Map camera attributes and geometry."""
from __future__ import annotations

from homeassistant.core import HomeAssistant

from .conftest import (
    entity_id_for,
    make_config_entry,
    patch_api,
    setup_entry,
    state_for,
)


async def _setup(hass: HomeAssistant):
    patch_api()
    await setup_entry(hass, make_config_entry())
    return hass


def _map_state(hass: HomeAssistant):
    state = state_for(hass, "camera", "map_camera")
    assert state is not None, "harita kamera entity'si oluşturulmadı"
    return state


async def test_camera_entity_exists(hass: HomeAssistant) -> None:
    """The map is exposed as a camera entity."""
    await _setup(hass)
    assert _map_state(hass) is not None


async def test_camera_publishes_calibration_points(hass: HomeAssistant) -> None:
    """Calibration corners are published so dashboards need no setup."""
    await _setup(hass)
    points = _map_state(hass).attributes.get("calibration_points")
    assert isinstance(points, list) and len(points) == 3
    for point in points:
        assert set(point) == {"vacuum", "map"}
        assert set(point["vacuum"]) == {"x", "y"}
        assert set(point["map"]) == {"x", "y"}


async def test_calibration_corners_match_map_geometry(hass: HomeAssistant) -> None:
    """Corner mapping is consistent with the map's own numbers."""
    await _setup(hass)
    state = _map_state(hass)
    points = state.attributes["calibration_points"]

    width = state.attributes["map_width"]
    height = state.attributes["map_height"]
    resolution = state.attributes["resolution"]
    x_min = state.attributes["x_min"]
    y_min = state.attributes["y_min"]

    # Image origin must map to the map's minimum corner.
    origin = points[0]["map"]
    assert origin["x"] == 0 and origin["y"] == 0
    bottom_left = points[0]["vacuum"]
    assert bottom_left["x"] == round(x_min * 1000)
    assert bottom_left["y"] == round((y_min + height * resolution) * 1000)

    # Opposite corner sits on the far edge.
    far = points[1]["map"]
    assert far["x"] == width


async def test_camera_publishes_room_outlines(hass: HomeAssistant) -> None:
    """Room polygons are published in the shape map cards consume."""
    await _setup(hass)
    rooms = _map_state(hass).attributes.get("rooms")

    assert isinstance(rooms, list)
    assert len(rooms) == 2
    for room in rooms:
        assert set(room) >= {"id", "name", "outline", "label", "icon"}
        assert room["id"]
        assert room["name"]
        assert len(room["outline"]) >= 3
        assert len(room["label"]) >= 3


async def test_room_outline_is_in_robot_coordinates(hass: HomeAssistant) -> None:
    """Outlines stay in millimetres, which is what the card expects."""
    await _setup(hass)
    rooms = _map_state(hass).attributes["rooms"]

    for room in rooms:
        for x, y in room["outline"]:
            assert isinstance(x, int)
            assert isinstance(y, int)
            assert abs(x) < 100_000 and abs(y) < 100_000


async def test_camera_hidden_when_map_disabled(hass: HomeAssistant) -> None:
    """Disabling the map option removes the camera entity."""
    patch_api()
    entry = make_config_entry()
    entry.add_to_hass(hass)
    hass.config_entries.async_update_entry(entry, options={"enable_map": False})

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert entity_id_for(hass, "camera", "map_camera") is None
    # The vacuum itself must still be available.
    assert state_for(hass, "vacuum", "vacuum") is not None