"""Shared fixtures for the botslab_vacuum test suite.

Every test runs against a real Home Assistant instance provided by
pytest-homeassistant-custom-component. All cloud access is mocked; no test
performs network I/O.
"""
from __future__ import annotations

import base64
import json
from unittest.mock import AsyncMock, patch

import pytest
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

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


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Make the integration in custom_components/ loadable by the test instance.

    This has to be an autouse fixture: a module level ``pytestmark`` inside
    conftest.py is only applied to conftest itself, never to the test modules,
    so the integration would stay invisible and every test would fail with
    "Integration not found".
    """
    yield


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


def device_properties() -> dict:
    return {
        "BatteryLevel": 88,
        "WorkingStatus": "5",
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


def make_config_entry(**kwargs) -> MockConfigEntry:
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
        unique_id="botslab_1000103000000064241",
    )


def patch_api(room_count: int = 2) -> None:
    """Replace every cloud call on the API client with a canned response."""
    from custom_components.botslab_vacuum import api as api_module
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

    replacements = {
        "app_login": AsyncMock(return_value={}),
        "get_devices": get_devices,
        "get_property_extended": AsyncMock(return_value=(props, {})),
        "get_map_json": AsyncMock(return_value=(document, props)),
        "get_live_map": AsyncMock(return_value=b"\x89PNG\r\n\x1a\n"),
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
        "start_map_sync": AsyncMock(),
    }

    for name, impl in replacements.items():
        if not hasattr(api_module.BotslabVacuumApi, name):
            continue
        if isinstance(impl, AsyncMock) or callable(impl):
            patch.object(api_module.BotslabVacuumApi, name, impl).start()


@pytest.fixture(autouse=True)
def auto_mock_api():
    """Mock the cloud for every test unless it opts out."""
    yield
    patch.stopall()


async def setup_entry(hass: HomeAssistant, entry: MockConfigEntry) -> MockConfigEntry:
    """Register and set up a config entry, then wait for it to settle."""
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


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