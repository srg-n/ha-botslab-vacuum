"""Shared fixtures for the botslab_vacuum test suite.

Every test runs against a real Home Assistant instance provided by
pytest-homeassistant-custom-component. All cloud access is mocked; no test
performs network I/O.
"""
from __future__ import annotations

import base64
import json
from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
import sys
import types

try:
    from homeassistant.core import HomeAssistant, State
    from homeassistant.helpers import entity_registry as er
    from pytest_homeassistant_custom_component.common import MockConfigEntry
    HAVE_HA = True
except ModuleNotFoundError:
    HAVE_HA = False
    import enum

    class _HAFinder:
        def find_spec(self, fullname, path, target=None):
            if fullname.startswith(("homeassistant", "pytest_homeassistant_custom_component")):
                from importlib.machinery import ModuleSpec
                return ModuleSpec(fullname, _HALoader())
            return None

    class _HALoader:
        def create_module(self, spec):
            m = types.ModuleType(spec.name)
            m.__path__ = []
            return m
        def exec_module(self, module):
            module.__getattr__ = lambda name: MagicMock()

    sys.meta_path.insert(0, _HAFinder())

    class Platform(str, enum.Enum):
        VACUUM = "vacuum"
        SENSOR = "sensor"
        BINARY_SENSOR = "binary_sensor"
        BUTTON = "button"
        SWITCH = "switch"
        SELECT = "select"
        NUMBER = "number"
        CAMERA = "camera"

    import homeassistant.const
    homeassistant.const.Platform = Platform

    import homeassistant.core
    class HomeAssistant:
        pass
    class State:
        pass
    homeassistant.core.HomeAssistant = HomeAssistant
    homeassistant.core.State = State

    import homeassistant.config_entries
    class ConfigEntry:
        pass
    homeassistant.config_entries.ConfigEntry = ConfigEntry

    import homeassistant.exceptions
    class HomeAssistantError(Exception):
        pass
    class ConfigEntryAuthFailed(HomeAssistantError):
        pass
    class ConfigEntryNotReady(HomeAssistantError):
        pass
    homeassistant.exceptions.HomeAssistantError = HomeAssistantError
    homeassistant.exceptions.ConfigEntryAuthFailed = ConfigEntryAuthFailed
    homeassistant.exceptions.ConfigEntryNotReady = ConfigEntryNotReady

    import homeassistant.components.http
    class HomeAssistantView:
        requires_auth = True
        url = ""
        name = ""
    homeassistant.components.http.HomeAssistantView = HomeAssistantView

    from dataclasses import dataclass

    import homeassistant.components.button
    @dataclass(frozen=True, kw_only=True)
    class ButtonEntityDescription:
        key: str = ""
        translation_key: str | None = None
        icon: str | None = None
        entity_category: Any = None
    class ButtonEntity:
        pass
    class ButtonDeviceClass:
        pass
    homeassistant.components.button.ButtonEntityDescription = ButtonEntityDescription
    homeassistant.components.button.ButtonEntity = ButtonEntity
    homeassistant.components.button.ButtonDeviceClass = ButtonDeviceClass

    import homeassistant.helpers.update_coordinator
    class CoordinatorEntity:
        __class_getitem__ = classmethod(lambda cls, key: cls)
        def __init__(self, coordinator=None, *args, **kwargs):
            self.coordinator = coordinator
    class DataUpdateCoordinator:
        __class_getitem__ = classmethod(lambda cls, key: cls)
        def __init__(self, hass, logger, *, config_entry=None, name=None, update_interval=None, update_method=None, **kwargs):
            self.config_entry = config_entry
            self.hass = hass
            self.logger = logger
            self.name = name
            self.update_interval = update_interval
            self.update_method = update_method
            self.data = None
    class UpdateFailed(Exception):
        pass
    homeassistant.helpers.update_coordinator.CoordinatorEntity = CoordinatorEntity
    homeassistant.helpers.update_coordinator.DataUpdateCoordinator = DataUpdateCoordinator
    homeassistant.helpers.update_coordinator.UpdateFailed = UpdateFailed

    import homeassistant.components.vacuum
    class StateVacuumEntity:
        pass
    class VacuumEntityFeature(enum.IntFlag):
        STATE = 1
        PAUSE = 2
        STOP = 4
        RETURN_HOME = 8
        FAN_SPEED = 16
        BATTERY = 32
        CLEAN_SPOT = 64
        LOCATE = 128
        START = 256
        SEND_COMMAND = 512
    class VacuumActivity(str, enum.Enum):
        CLEANING = "cleaning"
        DOCKED = "docked"
        PAUSED = "paused"
        IDLE = "idle"
        RETURNING = "returning"
        ERROR = "error"
    homeassistant.components.vacuum.StateVacuumEntity = StateVacuumEntity
    homeassistant.components.vacuum.VacuumEntityFeature = VacuumEntityFeature
    homeassistant.components.vacuum.VacuumActivity = VacuumActivity

    import homeassistant.components.camera
    class Camera:
        pass
    homeassistant.components.camera.Camera = Camera

    class MockConfigEntry:
        def __init__(self, domain="", title="", data=None, options=None, unique_id=None, entry_id="mock_id"):
            self.domain = domain
            self.title = title
            self.data = data or {}
            self.options = options or {}
            self.unique_id = unique_id
            self.entry_id = entry_id
    er = MagicMock()

if HAVE_HA:
    @pytest.fixture(autouse=True)
    def auto_enable_custom_integrations(enable_custom_integrations):
        """Make the integration in custom_components/ loadable by the test instance."""
        yield
else:
    @pytest.fixture(autouse=True)
    def auto_enable_custom_integrations():
        """No-op fixture when running pure unit tests without HA."""
        yield


from custom_components.botslab_vacuum.const import (
    CONF_EMAIL,
    CONF_M2,
    CONF_PASSWORD,
    CONF_Q,
    CONF_REGION,
    CONF_T,
    DOMAIN,
)

TEST_EMAIL = "user@example.com"
TEST_PASSWORD = "hunter2"
TEST_M2 = "a" * 32
TEST_SN = "SN12345"


MAP_WIDTH = 40
MAP_HEIGHT = 30
MAP_RESOLUTION = 0.05
MAP_X_MIN = -1.0
MAP_Y_MIN = -0.75


def room_payload(index: int) -> dict:
    """One room entry shaped like the cloud's smartArea item."""
    return {
        "id": str(index),
        "name": base64.b64encode(f"Room {index}".encode()).decode(),
        "cleanTimes": 1,
        "waterPump": 2,
        "windMode": "auto",
        "color": "",
        "vertexs": [
            [100, 100],
            [900, 100],
            [900, 600],
            [100, 600],
        ],
    }


def map_document(room_count: int = 2) -> dict:
    """A decoded cloud map document with real room geometry."""
    return {
        "width": MAP_WIDTH,
        "height": MAP_HEIGHT,
        "x_min": MAP_X_MIN,
        "y_min": MAP_Y_MIN,
        "resolution": MAP_RESOLUTION,
        "map": "",
        "smartArea": {"value": [room_payload(i) for i in range(room_count)]},
    }


def sample_map_png(width: int = MAP_WIDTH, height: int = MAP_HEIGHT) -> bytes:
    """A real PNG of a synthetic floor plan.

    Handing the camera a bare PNG signature instead of a decodable image would
    let a test pass while the renderer was broken, so the fixture goes through
    the same code path production uses.
    """
    from custom_components.botslab_vacuum import map_util

    pixels = bytes(
        0 if (x + y) % 7 == 0 else 127 for y in range(height) for x in range(width)
    )
    return map_util.render_map_png(width, height, pixels)


MAP_PNG = sample_map_png()


def device_properties() -> dict:
    return {
        "BatteryLevel": 88,
        "WorkingStatus": "7",
        "SuctionPowLevel": 2,
        "PadWetness": 1,
        "MopModeSwitching": 0,
        "MoppingPadInstalled": True,
        "WaterTankInstalled": True,
        "AutoBoost": True,
        "ButtonBacklight": False,
        "CollisionProtection": True,
        "VolumeLevel": 70,
        "FilterLifeTime": 80,
        "RollBrushLifeTime": 70,
        "EdgeBrushLifeTime": 60,
        "SensorLifeTime": 50,
        "TasksTotalCount": 12,
        "ErrorCode": 0,
        "TotalCleaningArea": 12345,
        "TotalCleaningTime": 900,
        "TEST_CleaningTime": 30,
        "CleaningArea": 1200,
        "MapPkgOssInfo": json.dumps({"Url": "aliyun://bucket/map", "UploadID": "u1"}),
    }


def make_config_entry(*, unique_id: str | None = None, **kwargs) -> MockConfigEntry:
    """Build a config entry that has not been set up yet."""
    data = {
        CONF_EMAIL: TEST_EMAIL,
        CONF_PASSWORD: TEST_PASSWORD,
        CONF_REGION: "eu1",
        CONF_M2: TEST_M2,
        CONF_Q: "qtok",
        CONF_T: "ttok",
    }
    data.update(kwargs)
    return MockConfigEntry(
        domain=DOMAIN,
        title="Botslab S8",
        data=data,
        options={},
        unique_id=unique_id or "botslab_1000103000000064241",
    )


def patch_api(room_count: int = 2, login_error: Exception | None = None) -> None:
    """Replace every cloud call on the API client with a canned response.

    Three separate things have to be neutralised, and missing any one of them
    makes the config entry fail to load rather than fail the test loudly:

    * ``async_login`` is imported into both ``coordinator`` and
      ``config_flow``, so it has to be patched in each of them. Leaving it
      real makes ``ensure_valid_session`` reach the network on every setup.
    * ``app_login`` has to set ``sid`` and ``push_alias`` on the instance.
      The real method does, and ``ensure_valid_session`` returns early when
      both are present; a bare ``AsyncMock`` leaves them empty, which sends
      every refresh down the re-authentication path instead.
    * ``BotslabQPush.run`` opens a real TCP connection in a background task.
    """
    from custom_components.botslab_vacuum import api as api_module
    from custom_components.botslab_vacuum import config_flow as config_flow_module
    from custom_components.botslab_vacuum import coordinator as coordinator_module
    from custom_components.botslab_vacuum import qpush as qpush_module
    from custom_components.botslab_vacuum.models import BotslabMapInfo

    props = device_properties()
    document = map_document(room_count)

    def build_map_info():
        info = BotslabMapInfo(
            width=MAP_WIDTH,
            height=MAP_HEIGHT,
            x_min=MAP_X_MIN,
            y_min=MAP_Y_MIN,
            resolution=MAP_RESOLUTION,
        )
        info.rooms = api_module.BotslabVacuumApi._parse_rooms(document)
        return info

    async def get_devices(*_args, **_kwargs):
        return [
            {
                "device_name": TEST_SN,
                "product_key": "7347e727042a",
                "device_title": "Botslab S8",
                "online": True,
                "model": "Botslab S8",
            }
        ]

    async def app_login(api_self) -> dict:
        """Mirror the real method, which stores the session on the instance."""
        api_self.sid = "sid-test"
        api_self.push_alias = "alias-test"
        api_self.qid = "qid-test"
        return {"sid": "sid-test", "push_alias": "alias-test", "qid": "qid-test"}

    replacements = {
        "app_login": app_login,
        "get_devices": get_devices,
        "get_property_extended": AsyncMock(return_value=(props, {})),
        "get_map_json": AsyncMock(return_value=(document, props)),
        "get_live_map": AsyncMock(return_value=MAP_PNG),
        "get_map_info": AsyncMock(side_effect=lambda *a, **k: build_map_info()),
        "get_cached_map_info": lambda _self, *_a, **_k: build_map_info(),
        "get_cached_rooms": lambda _self, *_a, **_k: api_module.BotslabVacuumApi._parse_rooms(
            document
        ),
        # Commands must never reach the network in tests.
        "locate": AsyncMock(),
        "start_clean": AsyncMock(),
        "pause_clean": AsyncMock(),
        "stop_clean": AsyncMock(),
        "resume_clean": AsyncMock(),
        "return_to_dock": AsyncMock(),
        "set_fan_speed": AsyncMock(),
        "clean_rooms": AsyncMock(),
        "clean_zone": AsyncMock(),
        "goto_target": AsyncMock(),
        "set_water_level": AsyncMock(),
        "set_mop_mode": AsyncMock(),
        "set_auto_boost": AsyncMock(),
        "set_button_backlight": AsyncMock(),
        "set_collision_protection": AsyncMock(),
        "set_volume_level": AsyncMock(),
        "reset_consumable": AsyncMock(),
        "get_firmware_version": AsyncMock(return_value="1.8.9.2976"),
        "start_map_sync": AsyncMock(),
        "stop_map_sync": AsyncMock(),
        "start_sync_map_to_oss": AsyncMock(),
        "stop_sync_map_to_oss": AsyncMock(),
        "set_no_go_zones": AsyncMock(),
        "set_desired_property": AsyncMock(return_value={"code": 0, "data": {}}),
        "get_desired_property": AsyncMock(return_value={}),
        "get_clean_track": AsyncMock(return_value={}),
        "get_clean_track_all": AsyncMock(return_value=[]),
        "fetch_rooms": AsyncMock(
            return_value=api_module.BotslabVacuumApi._parse_rooms(document)
        ),
        "get_latest_clean_record": AsyncMock(return_value=None),
        "invoke_sync": AsyncMock(return_value={"code": 0, "data": {}}),
        "invoke_async": AsyncMock(return_value={"code": 0, "data": {"request_id": "test_req"}}),
        "wait_async_reply": AsyncMock(return_value=True),
        "send_legacy_360_cmd": AsyncMock(return_value=True),
    }

    for name, impl in replacements.items():
        if not hasattr(api_module.BotslabVacuumApi, name):
            continue
        patch.object(api_module.BotslabVacuumApi, name, impl).start()

    tokens = {"q": "q-token", "t": "t-token", "qid": "qid-test"}
    login_mock = (
        AsyncMock(side_effect=login_error)
        if login_error is not None
        else AsyncMock(return_value=dict(tokens))
    )
    patch.object(coordinator_module, "async_login", login_mock).start()
    patch.object(config_flow_module, "async_login", login_mock).start()

    # The listener runs forever in production; tests only care that it starts
    # and stops, so the socket itself is replaced.
    patch.object(qpush_module.BotslabQPush, "run", AsyncMock(return_value=None)).start()
    patch.object(qpush_module.BotslabChinaQPush, "run", AsyncMock(return_value=None)).start()
    patch.object(
        coordinator_module.BotslabVacuumCoordinator,
        "watch_state_transition",
        MagicMock(),
    ).start()


@pytest.fixture(autouse=True)
def offline_hass(request):
    """Keep every test off the network, then undo the patches.

    Home Assistant's shared aiohttp connector is built on a zeroconf backed DNS
    resolver, and building a real resolver binds UDP sockets, which pytest
    socket blocks. Since nothing here resolves a ``.local`` name, the resolver
    is handed a stand-in instead. Patching the attribute on the zeroconf
    module works because aiohttp_client imports the module and looks the
    function up at call time.

    The camera platform depends on ``http``, which depends on ``network``, and
    network probes for the source address by opening a UDP socket. That is a
    second, unrelated socket, so the probe is replaced too. Without it the
    camera platform fails to set up and every test that touches any entity is
    reported as an unrelated failure.
    """
    if "test_pure" in request.node.nodeid:
        yield
        return

    patch(
        "homeassistant.components.zeroconf.async_get_async_zeroconf",
        return_value=MagicMock(),
    ).start()
    patch(
        "homeassistant.components.network.util.async_get_source_ip",
        return_value="127.0.0.1",
    ).start()
    patch_api()
    yield
    patch.stopall()


async def setup_entry(hass: HomeAssistant, entry: MockConfigEntry) -> MockConfigEntry:
    """Register and set up a config entry, then wait for it to settle."""
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def entity_id_for(hass: HomeAssistant, platform: str, suffix: str) -> str | None:
    """Return the real entity id for one of this robot's entities.

    Entity ids cannot be spelled out in a test. Home Assistant builds them from
    the entity and device names, so ``vacuum.<serial>_vacuum`` does not exist;
    the only reliable way to address an entity the way Home Assistant does is
    to ask the entity registry for it.
    """
    return er.async_get(hass).async_get_entity_id(platform, DOMAIN, f"{TEST_SN}_{suffix}")


def state_for(hass: HomeAssistant, platform: str, suffix: str) -> State | None:
    """Return the state object for one of this robot's entities."""
    entity_id = entity_id_for(hass, platform, suffix)
    return hass.states.get(entity_id) if entity_id else None


def entity_ids_for_all_robots(hass: HomeAssistant) -> list[str]:
    """Return every entity id that belongs to this integration."""
    return [
        entry.entity_id
        for entry in er.async_get(hass).entities.values()
        if entry.platform == DOMAIN
    ]


@pytest.fixture
async def init_integration(hass: HomeAssistant) -> MockConfigEntry:
    """A fully set up integration with one robot and two rooms."""
    patch_api(room_count=2)
    entry = make_config_entry()
    return await setup_entry(hass, entry)


@pytest.fixture
def config_entry() -> MockConfigEntry:
    """An unstarted config entry."""
    return make_config_entry()