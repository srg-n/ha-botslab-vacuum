"""Map camera attributes and generated Lovelace configuration."""
from __future__ import annotations

from homeassistant.core import HomeAssistant

from custom_components.botslab_vacuum.const import DOMAIN
from custom_components.botslab_vacuum.lovelace import build_map_card

from .conftest import TEST_SN, make_config_entry, patch_api, setup_entry

MAP_CAMERA = f"camera.{TEST_SN}_map_camera"


async def _setup(hass: HomeAssistant):
    patch_api()
    await setup_entry(hass, make_config_entry())
    return hass


async def test_camera_entity_exists(hass: HomeAssistant) -> None:
    """The map is exposed as a camera entity."""
    await _setup(hass)
    assert hass.states.get(MAP_CAMERA) is not None


async def test_camera_publishes_calibration_points(hass: HomeAssistant) -> None:
    """Calibration corners are published so dashboards need no setup."""
    await _setup(hass)
    state = hass.states.get(MAP_CAMERA)
    assert state is not None

    points = state.attributes.get("calibration_points")
    assert isinstance(points, list) and len(points) == 3
    for point in points:
        assert set(point) == {"vacuum", "map"}
        assert set(point["vacuum"]) == {"x", "y"}
        assert set(point["map"]) == {"x", "y"}


async def test_calibration_corners_match_map_geometry(hass: HomeAssistant) -> None:
    """Corner mapping is consistent with the map's own numbers."""
    await _setup(hass)
    state = hass.states.get(MAP_CAMERA)
    points = state.attributes["calibration_points"]

    width = state.attributes["width"]
    height = state.attributes["height"]
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
    state = hass.states.get(MAP_CAMERA)
    rooms = state.attributes.get("rooms")

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
    rooms = hass.states.get(MAP_CAMERA).attributes["rooms"]

    for room in rooms:
        for x, y in room["outline"]:
            assert isinstance(x, int)
            assert isinstance(y, int)
            assert abs(x) < 100_000 and abs(y) < 100_000


async def test_generated_card_is_valid_yaml(hass: HomeAssistant) -> None:
    """The generated snippet parses and references the real entities."""
    import yaml

    await _setup(hass)
    entry = next(iter(hass.config_entries.async_entries(DOMAIN)))
    coordinator = entry.runtime_data.coordinator
    robot = next(iter(coordinator.data.values()))

    card = build_map_card(robot)
    config = yaml.safe_load(card)

    assert config["type"] == "custom:xiaomi-vacuum-map-card"
    assert config["entity"] == f"vacuum.{TEST_SN}_vacuum"
    assert config["map_source"]["camera"] == MAP_CAMERA
    assert config["calibration_source"] == {"camera": True}


async def test_generated_card_services_are_namespaced(hass: HomeAssistant) -> None:
    """Every map mode calls this integration's own services."""
    import yaml

    await _setup(hass)
    entry = next(iter(hass.config_entries.async_entries(DOMAIN)))
    robot = next(iter(entry.runtime_data.coordinator.data.values()))

    config = yaml.safe_load(build_map_card(robot))
    for mode in config["map_modes"]:
        assert mode["service_call_schema"]["service"].startswith(f"{DOMAIN}.")


async def test_generated_card_lists_every_room(hass: HomeAssistant) -> None:
    """predefined_selections contains one entry per room."""
    import yaml

    await _setup(hass)
    entry = next(iter(hass.config_entries.async_entries(DOMAIN)))
    robot = next(iter(entry.runtime_data.coordinator.data.values()))

    config = yaml.safe_load(build_map_card(robot))
    room_mode = next(
        m for m in config["map_modes"] if m["selection_type"] == "ROOM"
    )
    assert len(room_mode["predefined_selections"]) == len(robot.rooms)


async def test_camera_hidden_when_map_disabled(hass: HomeAssistant) -> None:
    """Disabling the map option removes the camera entity."""
    patch_api()
    entry = make_config_entry()
    entry.add_to_hass(hass)
    hass.config_entries.async_update_entry(entry, options={"enable_map": False})

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()

    assert hass.states.get(MAP_CAMERA) is None
    # The vacuum itself must still be available.
    assert hass.states.get(f"vacuum.{TEST_SN}_vacuum") is not None