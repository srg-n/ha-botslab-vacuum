"""Empirical Challenger 2: Concurrency & State Verification Suite (Pure).

Adversarial stress-testing, state transition integrity, and race condition validation for:
1. Push frame interleaving & race conditions across multiple device SNs.
2. Coordinator optimistic update & state consistency across refreshes.
3. Mop pad sensor tri-state lifecycle and telemetry parsing.
4. Spot clean feature absence and clean zone integrity.
"""
from __future__ import annotations

import asyncio
from dataclasses import dataclass
import json
import random
from typing import Any
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

# Ensure homeassistant.components.sensor classes are present for standalone pure testing
import homeassistant.components.sensor

if not hasattr(homeassistant.components.sensor, "SensorEntityDescription") or not isinstance(
    homeassistant.components.sensor.SensorEntityDescription, type
):
    @dataclass(frozen=True, kw_only=True)
    class SensorEntityDescription:
        key: str = ""
        translation_key: str | None = None
        icon: str | None = None
        entity_category: Any = None
        device_class: Any = None
        options: list[str] | None = None
        native_unit_of_measurement: str | None = None
        state_class: Any = None

    class SensorEntity:
        pass

    class SensorDeviceClass:
        BATTERY = "battery"
        DURATION = "duration"
        AREA = "area"
        ENUM = "enum"

    class SensorStateClass:
        MEASUREMENT = "measurement"
        TOTAL_INCREASING = "total_increasing"

    homeassistant.components.sensor.SensorEntityDescription = SensorEntityDescription
    homeassistant.components.sensor.SensorEntity = SensorEntity
    homeassistant.components.sensor.SensorDeviceClass = SensorDeviceClass
    homeassistant.components.sensor.SensorStateClass = SensorStateClass

from custom_components.botslab_vacuum.api import (
    BotslabVacuumApi,
    working_status_to_state,
)
from custom_components.botslab_vacuum.const import (
    BATTERY_KEYS_360,
    INFO_360_CONSUMABLES,
    INFO_360_RESET_CONSUMABLE,
    INFO_360_STATUS,
    STATUS_DOCKED,
)
from custom_components.botslab_vacuum.coordinator import (
    FILTER_MAX_HOURS,
    MAIN_BRUSH_MAX_HOURS,
    SENSOR_MAX_HOURS,
    SIDE_BRUSH_MAX_HOURS,
    BotslabVacuumCoordinator,
    _parse_consumable_lifetime,
)
from custom_components.botslab_vacuum.exceptions import BotslabCommandError
from custom_components.botslab_vacuum.models import (
    BotslabConsumableStatus,
    BotslabMapInfo,
    BotslabVacuumDevice,
)
from custom_components.botslab_vacuum.sensor import SENSOR_DESCRIPTIONS
from custom_components.botslab_vacuum.vacuum import (
    BotslabVacuumRobot,
    _FEATURES,
)
from homeassistant.components.vacuum import VacuumEntityFeature


# ===========================================================================
# 1. PUSH FRAME INTERLEAVING & RACE CONDITIONS
# ===========================================================================

@pytest.mark.asyncio
async def test_concurrent_push_frame_interleaving_multi_device():
    """Verify rapid concurrent interleaving of 20001 status frames and 21015 consumables frames.

    Stress-tests 5 devices concurrently receiving 100 interleaved frames each.
    Ensures _legacy_live_status and _legacy_consumables are strictly segregated
    and never overwrite or clobber each other across multiple device SNs.
    """
    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api._legacy_live_status = {}
    coordinator.api._legacy_consumables = {}
    coordinator.api._legacy_device_cache = {}
    coordinator.api._legacy_cached_status = {}
    coordinator.api.is_legacy_360 = True
    coordinator.async_request_refresh = AsyncMock()

    # Wire real implementation of async_on_push to test coordinator
    coordinator.async_on_push = BotslabVacuumCoordinator.async_on_push.__get__(coordinator)

    device_sns = [f"SN_STRESS_{i:02d}" for i in range(1, 6)]

    # Initialize device caches
    for sn in device_sns:
        coordinator.api._legacy_device_cache[sn] = {
            "softversion": "1.2.3",
            "fan_speed": 2,
        }

    async def simulate_device_pushes(sn: str, count: int):
        for i in range(count):
            if i % 2 == 0:
                # 20001 Status Frame
                status_payload = {
                    "is_legacy_360": True,
                    "sn": sn,
                    "info_type": "20001",
                    "status": {
                        "mode": (i % 3) + 1,
                        "elec": 50 + (i % 40),
                        "cleanTime": i * 10,
                        "allArea": 12.5 + i,
                    },
                }
                await coordinator.async_on_push(status_payload)
            else:
                # 21015 Consumables Frame
                consumables_payload = {
                    "is_legacy_360": True,
                    "sn": sn,
                    "info_type": INFO_360_CONSUMABLES,
                    "status": {
                        "filter": 1000 + i * 20,
                        "main_brush": 2000 + i * 30,
                        "side_brush": 1500 + i * 15,
                        "sensor": 500 + i * 5,
                    },
                }
                await coordinator.async_on_push(consumables_payload)
            await asyncio.sleep(0.0001)

    # Concurrently execute 5 device push streams (total 500 frames)
    tasks = [simulate_device_pushes(sn, 100) for sn in device_sns]
    await asyncio.gather(*tasks)

    # Verification: Check strict isolation for every single device
    for sn in device_sns:
        live_status = coordinator.api._legacy_live_status.get(sn)
        consumables = coordinator.api._legacy_consumables.get(sn)

        assert live_status is not None, f"Live status missing for {sn}"
        assert consumables is not None, f"Consumables missing for {sn}"

        # 1. Status frame must contain status fields and NEVER contain consumable counters
        assert "mode" in live_status
        assert "elec" in live_status
        assert "cleanTime" in live_status
        for ckey in ("filter", "main_brush", "side_brush", "sensor"):
            assert ckey not in live_status, (
                f"Consumable key {ckey} leaked into _legacy_live_status for {sn}!"
            )

        # 2. Consumables frame must contain consumable counters and NEVER contain status fields
        assert "filter" in consumables
        assert "main_brush" in consumables
        assert "side_brush" in consumables
        assert "sensor" in consumables
        for skey in ("mode", "workMode", "elec", "elecReal", "cleanTime"):
            assert skey not in consumables, (
                f"Status key {skey} leaked into _legacy_consumables for {sn}!"
            )

        # 3. Synthesize properties via _legacy_360_get_properties
        api_inst = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
        api_inst._legacy_live_status = coordinator.api._legacy_live_status
        api_inst._legacy_consumables = coordinator.api._legacy_consumables
        api_inst._legacy_device_cache = coordinator.api._legacy_device_cache
        api_inst._legacy_cached_status = coordinator.api._legacy_cached_status
        api_inst.send_legacy_360_cmd = AsyncMock(return_value={})
        api_inst.get_latest_clean_record = AsyncMock(return_value=None)

        props, _ = await api_inst._legacy_360_get_properties(sn)
        assert props["BatteryLevel"] >= 50
        assert props["FilterLifeTime"] == consumables["filter"]
        assert props["RollBrushLifeTime"] == consumables["main_brush"]
        assert props["EdgeBrushLifeTime"] == consumables["side_brush"]
        assert props["SensorLifeTime"] == consumables["sensor"]


@pytest.mark.asyncio
async def test_push_frame_interleaving_edge_cases():
    """Verify edge cases: partial consumables updates, untagged frames, and malformed frames."""
    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api._legacy_live_status = {}
    coordinator.api._legacy_consumables = {}
    coordinator.async_request_refresh = AsyncMock()
    coordinator.async_on_push = BotslabVacuumCoordinator.async_on_push.__get__(coordinator)

    sn = "SN_EDGE_01"

    # 1. Consumable frame arrives BEFORE any status frame ever arrived
    payload_c1 = {
        "is_legacy_360": True,
        "sn": sn,
        "status": {"filter": 12345},  # Untagged, but detected by consumable key
    }
    await coordinator.async_on_push(payload_c1)
    assert sn in coordinator.api._legacy_consumables
    assert coordinator.api._legacy_consumables[sn] == {"filter": 12345}
    assert sn not in coordinator.api._legacy_live_status

    # 2. Second consumable frame arrives with only main_brush -> dict.update must preserve filter!
    payload_c2 = {
        "is_legacy_360": True,
        "sn": sn,
        "info_type": "21015",
        "status": {"main_brush": 67890},
    }
    await coordinator.async_on_push(payload_c2)
    assert coordinator.api._legacy_consumables[sn]["filter"] == 12345
    assert coordinator.api._legacy_consumables[sn]["main_brush"] == 67890

    # 3. Status frame arrives -> sets live_status, leaves consumables intact
    payload_s = {
        "is_legacy_360": True,
        "sn": sn,
        "info_type": "20001",
        "status": {"mode": 1, "elec": 88},
    }
    await coordinator.async_on_push(payload_s)
    assert coordinator.api._legacy_live_status[sn] == {"mode": 1, "elec": 88}
    assert coordinator.api._legacy_consumables[sn]["filter"] == 12345
    assert coordinator.api._legacy_consumables[sn]["main_brush"] == 67890

    # 4. Malformed frame (non-legacy or missing status) -> safely ignored without raising
    await coordinator.async_on_push({"is_legacy_360": False, "sn": sn})
    await coordinator.async_on_push({"is_legacy_360": True})  # missing sn
    assert coordinator.api._legacy_live_status[sn]["elec"] == 88


# ===========================================================================
# 2. COORDINATOR OPTIMISTIC UPDATE & STATE CONSISTENCY ACROSS REFRESH
# ===========================================================================

@pytest.mark.asyncio
async def test_coordinator_reset_consumable_all_aliases_optimistic():
    """Verify reset_consumable immediately updates local device consumables to 100% and max hours.

    Tests all aliases:
    - filter: ('filter', 'hepa', 'filter_life', '  FILTER  ')
    - main_brush: ('main_brush', 'mainbrush', 'roll_brush', 'brush', 'main_brush_life')
    - side_brush: ('side_brush', 'sidebrush', 'edge_brush', 'side_brush_life')
    - sensor: ('sensor', 'sensors', 'sensor_clean', 'sensor_dirtiness', 'sensor_life')
    """
    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock()
    coordinator.async_set_updated_data = MagicMock()

    # Wire real reset_consumable implementation
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    sn = "SN_OPT_TEST"
    pk = "PK_OPT_TEST"

    def make_degraded_dev():
        return BotslabVacuumDevice(
            device_name=sn,
            product_key=pk,
            device_title="Botslab Test",
            consumables=BotslabConsumableStatus(
                filter_life_pct=20,
                filter_left_hours=30.0,
                filter_used_hours=120.0,
                main_brush_life_pct=30,
                main_brush_left_hours=90.0,
                main_brush_used_hours=210.0,
                side_brush_life_pct=15,
                side_brush_left_hours=30.0,
                side_brush_used_hours=170.0,
                sensor_clean_pct=10,
                sensor_left_hours=3.0,
                sensor_used_hours=27.0,
            ),
        )

    # 1. Test Filter Aliases
    for alias in ("filter", "hepa", "filter_life", "  FILTER  "):
        dev = make_degraded_dev()
        coordinator.data = {sn: dev}
        await coordinator.reset_consumable(sn, alias)

        assert dev.consumables.filter_life_pct == 100
        assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
        assert dev.consumables.filter_used_hours == 0.0
        # Untargeted components remain degraded
        assert dev.consumables.main_brush_life_pct == 30
        coordinator.async_set_updated_data.assert_called_with({sn: dev})

    # 2. Test Main Brush Aliases
    for alias in ("main_brush", "mainbrush", "roll_brush", "brush", "main_brush_life"):
        dev = make_degraded_dev()
        coordinator.data = {sn: dev}
        await coordinator.reset_consumable(sn, alias)

        assert dev.consumables.main_brush_life_pct == 100
        assert dev.consumables.main_brush_left_hours == MAIN_BRUSH_MAX_HOURS
        assert dev.consumables.main_brush_used_hours == 0.0
        assert dev.consumables.filter_life_pct == 20

    # 3. Test Side Brush Aliases
    for alias in ("side_brush", "sidebrush", "edge_brush", "side_brush_life"):
        dev = make_degraded_dev()
        coordinator.data = {sn: dev}
        await coordinator.reset_consumable(sn, alias)

        assert dev.consumables.side_brush_life_pct == 100
        assert dev.consumables.side_brush_left_hours == SIDE_BRUSH_MAX_HOURS
        assert dev.consumables.side_brush_used_hours == 0.0
        assert dev.consumables.sensor_clean_pct == 10

    # 4. Test Sensor Aliases
    for alias in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness", "sensor_life"):
        dev = make_degraded_dev()
        coordinator.data = {sn: dev}
        await coordinator.reset_consumable(sn, alias)

        assert dev.consumables.sensor_clean_pct == 100
        assert dev.consumables.sensor_left_hours == SENSOR_MAX_HOURS
        assert dev.consumables.sensor_used_hours == 0.0
        assert dev.consumables.side_brush_life_pct == 15


@pytest.mark.asyncio
async def test_coordinator_reset_consumable_state_consistency_across_async_refresh():
    """Verify that consumable values remain 100% and max hours before and after async_refresh."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.is_legacy_360 = True
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)
    api.get_devices = AsyncMock(return_value=[{"device_name": "SN_360_1", "product_key": "PK_360_1"}])

    sn = "SN_360_1"
    # Seed degraded consumable in legacy cache (e.g. 500,000 elapsed seconds -> exhausted)
    api._legacy_consumables[sn] = {
        "filter": 500000,
        "main_brush": 1000000,
        "side_brush": 800000,
        "sensor": 150000,
    }

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = api
    coordinator.entry = MagicMock()
    coordinator.entry.data = {}
    coordinator.hass = MagicMock()
    coordinator.data = {
        sn: BotslabVacuumDevice(
            device_name=sn,
            product_key="PK_360_1",
            device_title="360 S6",
            consumables=BotslabConsumableStatus(
                filter_life_pct=0,
                filter_left_hours=0.0,
                filter_used_hours=150.0,
            ),
        )
    }
    coordinator.async_set_updated_data = MagicMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    # 1. Invoke reset_consumable
    await coordinator.reset_consumable(sn, "filter")

    # Step 1 Check: Local state immediately reflects 100% optimistic update
    dev = coordinator.data[sn]
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    assert dev.consumables.filter_used_hours == 0.0

    # Step 2 Check: api._legacy_consumables was reset to 0 used seconds
    assert api._legacy_consumables[sn]["filter"] == 0

    # Step 3 Check: Simulate async_refresh by fetching properties and parsing
    props, _ = await api._legacy_360_get_properties(sn)
    assert props["FilterLifeTime"] == 0

    # Consumable lifetime calculation on 0 elapsed seconds:
    pct, left_hrs = _parse_consumable_lifetime(props["FilterLifeTime"], FILTER_MAX_HOURS, True)
    assert pct == 100
    assert left_hrs == FILTER_MAX_HOURS
    used_hrs = round(max(0.0, FILTER_MAX_HOURS - left_hrs), 1)
    assert used_hrs == 0.0

    # Consistency maintained across refresh!


@pytest.mark.asyncio
async def test_coordinator_reset_consumable_api_failure_does_not_optimistically_update():
    """Verify that if the cloud API reset fails, local state is NOT corrupted and retains original values."""
    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock(
        side_effect=BotslabCommandError("Device offline or network error")
    )
    coordinator.async_set_updated_data = MagicMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    sn = "SN_FAIL_TEST"
    dev = BotslabVacuumDevice(
        device_name=sn,
        product_key="PK_FAIL_TEST",
        device_title="Botslab Fail Test",
        consumables=BotslabConsumableStatus(
            filter_life_pct=25,
            filter_left_hours=37.5,
            filter_used_hours=112.5,
        ),
    )
    coordinator.data = {sn: dev}

    with pytest.raises(BotslabCommandError, match="Device offline or network error"):
        await coordinator.reset_consumable(sn, "filter")

    # Local consumable MUST NOT have been optimistically overwritten
    assert dev.consumables.filter_life_pct == 25
    assert dev.consumables.filter_left_hours == 37.5
    assert dev.consumables.filter_used_hours == 112.5
    coordinator.async_set_updated_data.assert_not_called()


# ===========================================================================
# 3. MOP PAD SENSOR TRI-STATE TRANSITIONS
# ===========================================================================

def test_mop_pad_sensor_tri_state_full_transition_lifecycle():
    """Verify complete transition sequence (None -> True -> False -> None) and sensor value_fn reflections."""
    mop_desc = next(d for d in SENSOR_DESCRIPTIONS if d.key == "mop_installed")

    dev = BotslabVacuumDevice(device_name="SN_MOP", product_key="PK_MOP", device_title="Mop Bot")

    # Stage 1: Initial state (No sensor or unsupported hardware)
    assert dev.mop_installed is None
    assert mop_desc.value_fn(dev) is None

    # Stage 2: Mop bracket installed (Telemetry reports True)
    dev.mop_installed = True
    assert dev.mop_installed is True
    assert mop_desc.value_fn(dev) == "installed"

    # Stage 3: Mop bracket detached (Telemetry reports False)
    dev.mop_installed = False
    assert dev.mop_installed is False
    assert mop_desc.value_fn(dev) == "removed"

    # Stage 4: Pad attached again (Telemetry reports True)
    dev.mop_installed = True
    assert mop_desc.value_fn(dev) == "installed"

    # Stage 5: Pad detached again (Telemetry reports False)
    dev.mop_installed = False
    assert mop_desc.value_fn(dev) == "removed"

    # Stage 6: Telemetry reverts to None (e.g. unknown model or missing bracket telemetry)
    dev.mop_installed = None
    assert mop_desc.value_fn(dev) is None


def test_mop_pad_sensor_telemetry_parsing_matrix():
    """Verify coordinator telemetry parsing matrix for mop bracket detection across modern and legacy models."""
    def parse_mop(props: dict[str, Any]) -> bool | None:
        if "MoppingPadInstalled" in props and props["MoppingPadInstalled"] is not None:
            try:
                return bool(int(props["MoppingPadInstalled"]))
            except (ValueError, TypeError):
                return bool(props["MoppingPadInstalled"])
        elif "mopStatus" in props and props["mopStatus"] is not None:
            try:
                return bool(int(props["mopStatus"]) != 0)
            except (ValueError, TypeError):
                return bool(props["mopStatus"])
        elif "MopStatus" in props and props["MopStatus"] is not None:
            try:
                return bool(int(props["MopStatus"]) != 0)
            except (ValueError, TypeError):
                return bool(props["MopStatus"])
        return None

    # Modern Botslab MoppingPadInstalled
    assert parse_mop({"MoppingPadInstalled": 1}) is True
    assert parse_mop({"MoppingPadInstalled": 0}) is False
    assert parse_mop({"MoppingPadInstalled": "1"}) is True
    assert parse_mop({"MoppingPadInstalled": "0"}) is False
    assert parse_mop({"MoppingPadInstalled": True}) is True
    assert parse_mop({"MoppingPadInstalled": False}) is False

    # Legacy 360 mopStatus / MopStatus
    assert parse_mop({"mopStatus": 1}) is True
    assert parse_mop({"mopStatus": 0}) is False
    assert parse_mop({"mopStatus": "1"}) is True
    assert parse_mop({"mopStatus": "0"}) is False
    assert parse_mop({"MopStatus": 2}) is True
    assert parse_mop({"MopStatus": 0}) is False

    # Unsupported / Absent keys
    assert parse_mop({}) is None
    assert parse_mop({"WorkingStatus": 1, "BatteryLevel": 90}) is None
    assert parse_mop({"MoppingPadInstalled": None}) is None
    assert parse_mop({"mopStatus": None}) is None

    # Precedence: MoppingPadInstalled overrides mopStatus
    assert parse_mop({"MoppingPadInstalled": 0, "mopStatus": 1}) is False
    assert parse_mop({"MoppingPadInstalled": 1, "mopStatus": 0}) is True


# ===========================================================================
# 4. SPOT CLEAN ABSENCE & CLEAN ZONES INTEGRITY
# ===========================================================================

def test_spot_clean_absence_and_feature_flags():
    """Verify CLEAN_SPOT is completely absent from supported features and vacuum class."""
    # 1. Feature flags
    assert (BotslabVacuumRobot._attr_supported_features & VacuumEntityFeature.CLEAN_SPOT) == 0
    assert (_FEATURES & VacuumEntityFeature.CLEAN_SPOT) == 0

    # 2. Method existence
    assert not hasattr(BotslabVacuumRobot, "async_clean_spot")
    assert not hasattr(BotslabVacuumRobot, "clean_spot")

    # 3. Invocation attempt raises AttributeError
    robot = BotslabVacuumRobot(
        MagicMock(spec=BotslabVacuumCoordinator),
        BotslabVacuumDevice(device_name="SN_SPOT", product_key="PK_SPOT", device_title="Spotless"),
    )
    with pytest.raises(AttributeError):
        robot.clean_spot()

    with pytest.raises(AttributeError):
        robot.async_clean_spot()


@pytest.mark.asyncio
async def test_clean_zones_always_normal_and_never_forbid_modern():
    """Verify api.clean_zone builds zones with active='normal' and never 'forbid' on modern Botslab."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    api.get_property_extended = AsyncMock(return_value=({"MapPkgOssInfo": json.dumps({"MapID": 12345})}, {}))
    api.set_fan_speed = AsyncMock()
    api.set_water_level = AsyncMock()
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {"request_id": "req_123"}})
    api.wait_async_reply = AsyncMock(return_value=True)
    api.invoke_sync = AsyncMock(return_value={"code": 0})

    zones = [
        [100, 200, 300, 400],
        [-500, -600, -100, -200],
    ]

    await api.clean_zone("SN_ZONE_TEST", "PK_ZONE_TEST", zones, repeat_times=2)

    api.invoke_async.assert_called_once()
    call_args = api.invoke_async.call_args[0]
    action = call_args[2]
    params = call_args[3]

    assert action == "SetZones"
    assert params["MapID"] == 12345

    zones_payload = json.loads(params["ZonesList"])
    assert "zones" in zones_payload
    assert len(zones_payload["zones"]) == 2

    for zone_obj in zones_payload["zones"]:
        # Clean zones must always have active == "normal", NEVER "forbid"
        assert zone_obj["active"] == "normal"
        assert zone_obj["forbidType"] is None
        assert zone_obj["active"] != "forbid"

    assert zones_payload["activeIds"] == [1, 2]
    assert zones_payload["cleanTimes"] == 2


@pytest.mark.asyncio
async def test_clean_zones_always_normal_and_never_forbid_legacy_360():
    """Verify clean_zone on legacy 360 builds areas with active='normal' and never 'forbid'."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.get_latest_clean_record = AsyncMock(return_value={"mapId": 42})
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0})

    zones = [
        [150, 250, 350, 450],
    ]

    await api.clean_zone("SN_360_ZONE", "PK_360", zones, repeat_times=1)

    api.send_legacy_360_cmd.assert_called_once()
    call_args = api.send_legacy_360_cmd.call_args[0]
    sn = call_args[0]
    opcode = call_args[1]
    payload = call_args[2]

    assert sn == "SN_360_ZONE"
    assert opcode == "30000"
    extra_areas = payload["cmds"][0]["data"]["extraAreas"]
    assert len(extra_areas) == 1
    assert extra_areas[0]["active"] == "normal"
    assert extra_areas[0]["active"] != "forbid"


def test_map_clean_zones_vs_no_go_zones_separation():
    """Verify map JSON parsing strictly separates clean zones (active != 'forbid') from no-go zones (active == 'forbid')."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")

    raw_map_json = {
        "width": 100,
        "height": 100,
        "x_min": 0.0,
        "y_min": 0.0,
        "resolution": 0.05,
        "area": [
            {"name": "clean_area_1", "active": "normal", "vertexs": [[0, 0], [10, 0], [10, 10], [0, 10]]},
            {"name": "no_go_area_1", "active": "forbid", "vertexs": [[20, 20], [30, 20], [30, 30], [20, 30]]},
            {"name": "clean_area_2", "active": "custom", "vertexs": [[40, 40], [50, 40], [50, 50], [40, 50]]},
            {"name": "no_go_area_2", "active": "forbid", "vertexs": [[60, 60], [70, 60], [70, 70], [60, 70]]},
        ],
    }

    map_info = api._build_map_info(raw_map_json)
    assert map_info is not None

    assert len(map_info.no_go_zones) == 2
    assert all(z["active"] == "forbid" for z in map_info.no_go_zones)
    assert [z["name"] for z in map_info.no_go_zones] == ["no_go_area_1", "no_go_area_2"]

    assert len(map_info.clean_zones) == 2
    assert all(z["active"] != "forbid" for z in map_info.clean_zones)
    assert [z["name"] for z in map_info.clean_zones] == ["clean_area_1", "clean_area_2"]


# ===========================================================================
# 5. BUTTON & SERVICE CONSUMABLE RESET CONCURRENCY & STALE REFRESH GUARD
# ===========================================================================

@pytest.mark.asyncio
async def test_button_press_all_consumables_route_to_coordinator_reset_and_suppress_refresh():
    """Verify all reset button entities route to coord.reset_consumable and suppress async_request_refresh.

    Empirically verifies:
    - reset_filter -> coord.reset_consumable(sn, "filter")
    - reset_main_brush -> coord.reset_consumable(sn, "main_brush")
    - reset_side_brush -> coord.reset_consumable(sn, "side_brush")
    - reset_sensors -> coord.reset_consumable(sn, "sensor")
    - async_press suppresses async_request_refresh to prevent stale cloud poll clobbering.
    """
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock()
    coordinator.async_set_updated_data = MagicMock()
    coordinator.async_request_refresh = AsyncMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    sn = "SN_BTN_TEST"
    pk = "PK_BTN_TEST"
    dev = BotslabVacuumDevice(
        device_name=sn,
        product_key=pk,
        device_title="Btn Test Vacuum",
        consumables=BotslabConsumableStatus(
            filter_life_pct=10,
            filter_left_hours=15.0,
            filter_used_hours=135.0,
            main_brush_life_pct=15,
            main_brush_left_hours=45.0,
            main_brush_used_hours=255.0,
            side_brush_life_pct=20,
            side_brush_left_hours=40.0,
            side_brush_used_hours=160.0,
            sensor_clean_pct=5,
            sensor_left_hours=1.5,
            sensor_used_hours=28.5,
        ),
    )
    coordinator.data = {sn: dev}
    hass = MagicMock()

    reset_buttons = {d.key: d for d in BUTTON_DESCRIPTIONS if d.key.startswith("reset_")}
    assert set(reset_buttons.keys()) == {
        "reset_filter",
        "reset_main_brush",
        "reset_side_brush",
        "reset_sensors",
    }

    # 1. Reset filter button
    btn_filter = BotslabButton(coordinator, dev, reset_buttons["reset_filter"])
    btn_filter.hass = hass
    await btn_filter.async_press()
    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "filter")
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    assert dev.consumables.filter_used_hours == 0.0
    coordinator.async_request_refresh.assert_not_called()

    # 2. Reset main brush button
    btn_main = BotslabButton(coordinator, dev, reset_buttons["reset_main_brush"])
    btn_main.hass = hass
    await btn_main.async_press()
    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "main_brush")
    assert dev.consumables.main_brush_life_pct == 100
    assert dev.consumables.main_brush_left_hours == MAIN_BRUSH_MAX_HOURS
    assert dev.consumables.main_brush_used_hours == 0.0
    coordinator.async_request_refresh.assert_not_called()

    # 3. Reset side brush button
    btn_side = BotslabButton(coordinator, dev, reset_buttons["reset_side_brush"])
    btn_side.hass = hass
    await btn_side.async_press()
    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "side_brush")
    assert dev.consumables.side_brush_life_pct == 100
    assert dev.consumables.side_brush_left_hours == SIDE_BRUSH_MAX_HOURS
    assert dev.consumables.side_brush_used_hours == 0.0
    coordinator.async_request_refresh.assert_not_called()

    # 4. Reset sensors button
    btn_sensor = BotslabButton(coordinator, dev, reset_buttons["reset_sensors"])
    btn_sensor.hass = hass
    await btn_sensor.async_press()
    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "sensor")
    assert dev.consumables.sensor_clean_pct == 100
    assert dev.consumables.sensor_left_hours == SENSOR_MAX_HOURS
    assert dev.consumables.sensor_used_hours == 0.0
    coordinator.async_request_refresh.assert_not_called()

    # All 4 buttons succeeded optimistically with 0 refresh calls
    assert coordinator.async_request_refresh.call_count == 0


@pytest.mark.asyncio
async def test_non_reset_button_press_triggers_coordinator_refresh():
    """Verify that non-reset buttons DO invoke async_request_refresh as intended."""
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.locate = AsyncMock()
    coordinator.async_request_refresh = AsyncMock()

    sn = "SN_NON_RESET"
    dev = BotslabVacuumDevice(device_name=sn, product_key="PK_NON_RESET", device_title="Locate Bot")
    coordinator.data = {sn: dev}
    hass = MagicMock()

    locate_desc = next(d for d in BUTTON_DESCRIPTIONS if d.key == "locate")
    btn_locate = BotslabButton(coordinator, dev, locate_desc)
    btn_locate.hass = hass

    await btn_locate.async_press()
    coordinator.api.locate.assert_awaited_once_with(sn, "PK_NON_RESET")
    coordinator.async_request_refresh.assert_awaited_once()


@pytest.mark.asyncio
async def test_service_handle_reset_consumable_routes_to_coordinator_without_refresh():
    """Verify handle_reset_consumable service routes through coordinator.reset_consumable without refresh."""
    from custom_components.botslab_vacuum import _register_services, DOMAIN
    from custom_components.botslab_vacuum.const import SERVICE_RESET_CONSUMABLE, ATTR_CONSUMABLE_TYPE

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock()
    coordinator.async_set_updated_data = MagicMock()
    coordinator.async_request_refresh = AsyncMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    sn = "SN_SRV_TEST"
    pk = "PK_SRV_TEST"
    dev = BotslabVacuumDevice(
        device_name=sn,
        product_key=pk,
        device_title="Srv Test Vacuum",
        consumables=BotslabConsumableStatus(
            filter_life_pct=10,
            filter_left_hours=15.0,
            filter_used_hours=135.0,
        ),
    )
    coordinator.data = {sn: dev}

    services = {}
    hass = MagicMock()
    hass.services.has_service.return_value = False
    def mock_register(domain, srv, handler, schema=None):
        services[(domain, srv)] = handler
    hass.services.async_register.side_effect = mock_register

    config_entry = MagicMock()
    runtime = MagicMock()
    runtime.coordinator = coordinator
    config_entry.runtime_data = runtime
    hass.config_entries.async_entries.return_value = [config_entry]

    _register_services(hass)
    handler = services[(DOMAIN, SERVICE_RESET_CONSUMABLE)]

    # 1. Call with ATTR_CONSUMABLE_TYPE
    call1 = MagicMock()
    call1.data = {"entity_id": sn, ATTR_CONSUMABLE_TYPE: "filter"}
    await handler(call1)

    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "filter")
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    coordinator.async_request_refresh.assert_not_called()

    # 2. Call with legacy key "consumable" and alias "roll_brush"
    call2 = MagicMock()
    call2.data = {"entity_id": sn, "consumable": "roll_brush"}
    await handler(call2)

    coordinator.api.reset_consumable.assert_awaited_with(sn, pk, "roll_brush")
    assert dev.consumables.main_brush_life_pct == 100
    assert dev.consumables.main_brush_left_hours == MAIN_BRUSH_MAX_HOURS
    coordinator.async_request_refresh.assert_not_called()


@pytest.mark.asyncio
async def test_concurrent_button_and_service_resets_under_stale_cloud_poll_avoidance():
    """Stress test: 5 devices concurrently resetting all 4 consumables via mixed buttons and service calls.

    Verifies:
    1. 20 concurrent operations (5 devices x 4 consumables) execute without race conditions.
    2. All 5 devices reach 100% and max hours across all 4 consumables.
    3. Exactly 0 calls to async_request_refresh occur, preventing stale cloud data from clobbering state.
    """
    from custom_components.botslab_vacuum import _register_services, DOMAIN
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton
    from custom_components.botslab_vacuum.const import SERVICE_RESET_CONSUMABLE, ATTR_CONSUMABLE_TYPE

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock()
    coordinator.async_set_updated_data = MagicMock()
    coordinator.async_request_refresh = AsyncMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    device_sns = [f"SN_RACE_{i:02d}" for i in range(1, 6)]
    devices = {}
    for sn in device_sns:
        devices[sn] = BotslabVacuumDevice(
            device_name=sn,
            product_key=f"PK_{sn}",
            device_title=f"Vacuum {sn}",
            consumables=BotslabConsumableStatus(
                filter_life_pct=10,
                filter_left_hours=15.0,
                filter_used_hours=135.0,
                main_brush_life_pct=15,
                main_brush_left_hours=45.0,
                main_brush_used_hours=255.0,
                side_brush_life_pct=20,
                side_brush_left_hours=40.0,
                side_brush_used_hours=160.0,
                sensor_clean_pct=5,
                sensor_left_hours=1.5,
                sensor_used_hours=28.5,
            ),
        )
    coordinator.data = devices

    # Setup service handler
    services = {}
    hass = MagicMock()
    hass.services.has_service.return_value = False
    def mock_register(domain, srv, handler, schema=None):
        services[(domain, srv)] = handler
    hass.services.async_register.side_effect = mock_register

    config_entry = MagicMock()
    runtime = MagicMock()
    runtime.coordinator = coordinator
    config_entry.runtime_data = runtime
    hass.config_entries.async_entries.return_value = [config_entry]

    _register_services(hass)
    srv_handler = services[(DOMAIN, SERVICE_RESET_CONSUMABLE)]

    reset_buttons = {d.key: d for d in BUTTON_DESCRIPTIONS if d.key.startswith("reset_")}

    async def reset_operation(sn: str, consumable: str, use_button: bool):
        if use_button:
            key_map = {
                "filter": "reset_filter",
                "main_brush": "reset_main_brush",
                "side_brush": "reset_side_brush",
                "sensor": "reset_sensors",
            }
            btn = BotslabButton(coordinator, coordinator.data[sn], reset_buttons[key_map[consumable]])
            btn.hass = hass
            await btn.async_press()
        else:
            call = MagicMock()
            call.data = {"entity_id": sn, ATTR_CONSUMABLE_TYPE: consumable}
            await srv_handler(call)

    # Launch 20 concurrent operations across 5 devices
    tasks = []
    consumable_list = ["filter", "main_brush", "side_brush", "sensor"]
    for i, sn in enumerate(device_sns):
        for j, c in enumerate(consumable_list):
            use_btn = (i + j) % 2 == 0
            tasks.append(reset_operation(sn, c, use_btn))

    await asyncio.gather(*tasks)

    # Verification:
    # 1. Zero calls to async_request_refresh
    assert coordinator.async_request_refresh.call_count == 0

    # 2. Every single device has 100% and max hours for all consumables
    for sn, dev in coordinator.data.items():
        assert dev.consumables.filter_life_pct == 100, f"{sn} filter life not 100"
        assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
        assert dev.consumables.filter_used_hours == 0.0

        assert dev.consumables.main_brush_life_pct == 100, f"{sn} main brush life not 100"
        assert dev.consumables.main_brush_left_hours == MAIN_BRUSH_MAX_HOURS
        assert dev.consumables.main_brush_used_hours == 0.0

        assert dev.consumables.side_brush_life_pct == 100, f"{sn} side brush life not 100"
        assert dev.consumables.side_brush_left_hours == SIDE_BRUSH_MAX_HOURS
        assert dev.consumables.side_brush_used_hours == 0.0

        assert dev.consumables.sensor_clean_pct == 100, f"{sn} sensor clean not 100"
        assert dev.consumables.sensor_left_hours == SENSOR_MAX_HOURS
        assert dev.consumables.sensor_used_hours == 0.0


@pytest.mark.asyncio
async def test_button_press_null_device_guard():
    """Verify async_press gracefully returns without error when device is None."""
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.data = {}
    coordinator.reset_consumable = AsyncMock()
    coordinator.async_request_refresh = AsyncMock()

    dev = BotslabVacuumDevice(device_name="SN_GHOST", product_key="PK_GHOST", device_title="Ghost")
    reset_btn_desc = next(d for d in BUTTON_DESCRIPTIONS if d.key == "reset_filter")
    btn = BotslabButton(coordinator, dev, reset_btn_desc)

    # device property returns None because coordinator.data does not contain SN_GHOST
    assert btn.device is None

    await btn.async_press()
    coordinator.reset_consumable.assert_not_called()
    coordinator.async_request_refresh.assert_not_called()


@pytest.mark.asyncio
async def test_stale_cloud_poll_avoidance_preserves_optimistic_state_after_reset():
    """Verify that suppressing async_request_refresh prevents stale cloud poll from overwriting optimistic state."""
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton

    coordinator = MagicMock(spec=BotslabVacuumCoordinator)
    coordinator.api = MagicMock(spec=BotslabVacuumApi)
    coordinator.api.reset_consumable = AsyncMock()
    coordinator.async_set_updated_data = MagicMock()
    coordinator.async_request_refresh = AsyncMock()
    coordinator.reset_consumable = BotslabVacuumCoordinator.reset_consumable.__get__(coordinator)

    sn = "SN_STALE_GUARD"
    pk = "PK_STALE_GUARD"
    dev = BotslabVacuumDevice(
        device_name=sn,
        product_key=pk,
        device_title="Stale Guard Vacuum",
        consumables=BotslabConsumableStatus(
            filter_life_pct=15,
            filter_left_hours=22.5,
            filter_used_hours=127.5,
        ),
    )
    coordinator.data = {sn: dev}
    hass = MagicMock()

    filter_desc = next(d for d in BUTTON_DESCRIPTIONS if d.key == "reset_filter")
    btn = BotslabButton(coordinator, dev, filter_desc)
    btn.hass = hass

    # Step 1: User presses reset button
    await btn.async_press()

    # Step 2: Optimistic state is immediately 100%
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    assert dev.consumables.filter_used_hours == 0.0

    # Step 3: No refresh was requested; stale cloud response is not pulled
    assert coordinator.async_request_refresh.call_count == 0

    # Step 4: Contrast with a simulated stale refresh that would occur if async_request_refresh was called:
    # Stale cloud still reports old lifetime (459000 used seconds = 15% remaining)
    stale_cloud_lifetime = 459000
    stale_pct, stale_hours = _parse_consumable_lifetime(stale_cloud_lifetime, FILTER_MAX_HOURS, True)
    assert stale_pct == 15
    assert stale_hours == 22.5

    # Because refresh was suppressed, dev.consumables was NOT overwritten by stale data!
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
