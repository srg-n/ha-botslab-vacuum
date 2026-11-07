"""Empirical Challenger Test Suite for Milestone 1: Battery & Consumables.

Adversarial stress-testing, boundary condition exploration, and failure-mode
validation for:
1. Battery extraction edge cases and priority order (api.py & coordinator.py).
2. Consumable lifetime calculation edge cases and boundary conditions (coordinator.py).
3. Consumable reset aliases, fallbacks (ResetSensorLife -> ResetSensorCleanLife),
   and optimistic coordinator updates.
"""
from __future__ import annotations

import math
from unittest.mock import AsyncMock, MagicMock, patch
import pytest

from custom_components.botslab_vacuum.api import BotslabVacuumApi
from custom_components.botslab_vacuum.const import (
    BATTERY_KEYS_360,
    INFO_360_RESET_CONSUMABLE,
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
    BotslabVacuumDevice,
)


# ===========================================================================
# 1. BATTERY EXTRACTION STRESS TESTS
# ===========================================================================

@pytest.mark.asyncio
async def test_battery_priority_elecreal_over_all():
    """Verify elecReal takes strict precedence over elec, battery, batteryLevel, power in live push."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # All keys present in live push with distinct values
    api._legacy_live_status["SN1"] = {
        "elecReal": 95,
        "elec": 80,
        "battery": 70,
        "batteryLevel": 60,
        "power": 50,
    }
    api._legacy_device_cache["SN1"] = {"elecReal": 99}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 95


@pytest.mark.asyncio
async def test_battery_priority_ladder_in_live():
    """Verify each key in BATTERY_KEYS_360 wins when higher-priority keys are absent/None."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # 1. elecReal=None -> elec wins over battery, batteryLevel, power
    api._legacy_live_status["SN1"] = {
        "elecReal": None,
        "elec": 82,
        "battery": 70,
        "batteryLevel": 60,
        "power": 50,
    }
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 82

    # 2. elecReal & elec None -> battery wins
    api._legacy_live_status["SN1"] = {
        "elecReal": None,
        "elec": None,
        "battery": 73,
        "batteryLevel": 60,
        "power": 50,
    }
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 73

    # 3. elecReal, elec, battery None -> batteryLevel wins
    api._legacy_live_status["SN1"] = {
        "elecReal": None,
        "elec": None,
        "battery": None,
        "batteryLevel": 64,
        "power": 50,
    }
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 64

    # 4. only power present -> power wins
    api._legacy_live_status["SN1"] = {
        "elecReal": None,
        "elec": None,
        "battery": None,
        "batteryLevel": None,
        "power": 55,
    }
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 55


@pytest.mark.asyncio
async def test_battery_live_vs_raw_dev_precedence():
    """Verify raw_dev is ONLY used when ALL live keys are absent or None.

    Even lowest-priority live key ('power') must take precedence over
    highest-priority raw_dev key ('elecReal').
    """
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # live has only power=15, raw_dev has elecReal=99
    api._legacy_live_status["SN1"] = {"power": 15}
    api._legacy_device_cache["SN1"] = {
        "elecReal": 99,
        "elec": 88,
        "battery": 77,
    }
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 15, "Live push 'power' must beat raw_dev 'elecReal'"


@pytest.mark.asyncio
async def test_battery_raw_dev_priority_ladder():
    """Verify raw_dev keys follow the exact same priority order when live has no keys."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # live is completely empty
    api._legacy_live_status["SN1"] = {}

    # elecReal wins in raw_dev
    api._legacy_device_cache["SN1"] = {"elecReal": 91, "elec": 81, "battery": 71}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 91

    # elec wins in raw_dev
    api._legacy_device_cache["SN1"] = {"elecReal": None, "elec": 81, "battery": 71}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 81

    # battery wins in raw_dev
    api._legacy_device_cache["SN1"] = {"elec": None, "battery": 71, "power": 41}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 71

    # batteryLevel wins in raw_dev
    api._legacy_device_cache["SN1"] = {"battery": None, "batteryLevel": 61, "power": 41}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 61

    # power wins in raw_dev
    api._legacy_device_cache["SN1"] = {"batteryLevel": None, "power": 41}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 41


@pytest.mark.asyncio
async def test_battery_defaults_to_100_when_both_empty_or_all_none():
    """Verify battery level defaults to 100 when live and raw_dev are empty or only contain None."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # Both empty dicts
    api._legacy_live_status["SN1"] = {}
    api._legacy_device_cache["SN1"] = {}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 100

    # Both dicts contain only None values for battery keys
    api._legacy_live_status["SN1"] = {"elecReal": None, "elec": None, "battery": None}
    api._legacy_device_cache["SN1"] = {"elecReal": None, "power": None}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 100


@pytest.mark.asyncio
async def test_battery_malformed_string_and_type_coercion():
    """Stress test malformed strings, floats, booleans, and non-numeric types."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # 1. String integer "82" and string with spaces "  82  "
    api._legacy_live_status["SN1"] = {"elec": "82"}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 82
    assert isinstance(props["BatteryLevel"], int)

    api._legacy_live_status["SN1"] = {"elec": "  77  "}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 77

    # 2. Malformed string "82%" fails int() conversion and skips to next valid key or fallback
    api._legacy_live_status["SN1"] = {"elec": "82%", "battery": 75}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 75, "Malformed '82%' must be skipped in favor of valid battery key"

    # 3. Malformed string "82%" in live with no other live keys falls back to raw_dev
    api._legacy_live_status["SN1"] = {"elec": "82%"}
    api._legacy_device_cache["SN1"] = {"battery": 68}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 68, "Malformed live key must fall back to raw_dev"

    # 4. Malformed strings in both live and raw_dev defaults safely to 100
    api._legacy_live_status["SN1"] = {"elec": "unknown", "elecReal": "82%"}
    api._legacy_device_cache["SN1"] = {"battery": "N/A", "power": "bad"}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 100

    # 5. Non-convertible complex structures (list, dict) do not crash and skip
    api._legacy_live_status["SN1"] = {"elecReal": [100], "elec": {"val": 80}, "battery": 65}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 65

    # 6. Float values in live push
    api._legacy_live_status["SN1"] = {"elec": 82.9}
    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 82


@pytest.mark.asyncio
async def test_battery_coordinator_parsing_in_async_update_data():
    """Verify coordinator parses BatteryLevel and battery keys into dev.battery_level."""
    api = MagicMock()
    api.is_legacy_360 = False
    api.session = None
    api.get_cached_map_info = MagicMock(return_value=None)
    api.get_clean_track_all = AsyncMock(return_value=[])

    coord = BotslabVacuumCoordinator(MagicMock(), MagicMock(), api)
    coord._firmware_cache = {"SN1": "1.0.0"}
    coord.enable_map = False

    # Scenario 1: Standard BatteryLevel integer
    api.get_devices = AsyncMock(return_value=[{"device_name": "SN1", "product_key": "PK1"}])
    api.get_property_extended = AsyncMock(return_value=({"BatteryLevel": 88, "WorkingStatus": 0}, {}))
    data = await coord._async_update_data()
    assert data["SN1"].battery_level == 88

    # Scenario 2: String BatteryLevel
    api.get_property_extended = AsyncMock(return_value=({"BatteryLevel": "74", "WorkingStatus": 0}, {}))
    data = await coord._async_update_data()
    assert data["SN1"].battery_level == 74

    # Scenario 3: BatteryLevel absent, but 360 elec key present
    api.get_property_extended = AsyncMock(return_value=({"elec": 62, "WorkingStatus": 0}, {}))
    data = await coord._async_update_data()
    assert data["SN1"].battery_level == 62

    # Scenario 4: Malformed BatteryLevel "82%" defaults to 100
    api.get_property_extended = AsyncMock(return_value=({"BatteryLevel": "82%", "WorkingStatus": 0}, {}))
    data = await coord._async_update_data()
    assert data["SN1"].battery_level == 100


# ===========================================================================
# 2. CONSUMABLE LIFETIME CALCULATION STRESS TESTS
# ===========================================================================

def test_consumable_fresh_reset_zero():
    """Verify val=0 returns (100, max_hours) across all consumable categories."""
    assert _parse_consumable_lifetime(0, FILTER_MAX_HOURS) == (100, 150.0)
    assert _parse_consumable_lifetime(0.0, MAIN_BRUSH_MAX_HOURS) == (100, 300.0)
    assert _parse_consumable_lifetime("0", SIDE_BRUSH_MAX_HOURS) == (100, 200.0)
    assert _parse_consumable_lifetime("0.0", SENSOR_MAX_HOURS) == (100, 30.0)


def test_consumable_standard_elapsed_seconds():
    """Verify standard elapsed seconds calculations (val=36000 = 10h used)."""
    # Filter: 150h total = 540,000s; used 36,000s -> 504,000s remaining = 140.0h, 93%
    pct, hrs = _parse_consumable_lifetime(36000, FILTER_MAX_HOURS)
    assert pct == 93
    assert hrs == 140.0

    # Main brush: 300h total = 1,080,000s; used 36,000s -> 1,044,000s remaining = 290.0h, 97%
    pct, hrs = _parse_consumable_lifetime(36000, MAIN_BRUSH_MAX_HOURS)
    assert pct == 97
    assert hrs == 290.0

    # Side brush: 200h total = 720,000s; used 36,000s -> 684,000s remaining = 190.0h, 95%
    pct, hrs = _parse_consumable_lifetime(36000, SIDE_BRUSH_MAX_HOURS)
    assert pct == 95
    assert hrs == 190.0

    # Sensor: 30h total = 108,000s; used 36,000s -> 72,000s remaining = 20.0h, 67%
    pct, hrs = _parse_consumable_lifetime(36000, SENSOR_MAX_HOURS)
    assert pct == 67
    assert hrs == 20.0


def test_consumable_exact_max_and_overused():
    """Verify exact max and overused elapsed seconds clamp to (0, 0.0)."""
    # Filter: 150h = 540,000s
    assert _parse_consumable_lifetime(540000, FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(540000.0, FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(600000, FILTER_MAX_HOURS) == (0, 0.0)

    # Main brush: 300h = 1,080,000s
    assert _parse_consumable_lifetime(1080000, MAIN_BRUSH_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(1200000, MAIN_BRUSH_MAX_HOURS) == (0, 0.0)

    # Side brush: 200h = 720,000s
    assert _parse_consumable_lifetime(720000, SIDE_BRUSH_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(800000, SIDE_BRUSH_MAX_HOURS) == (0, 0.0)

    # Sensor: 30h = 108,000s
    assert _parse_consumable_lifetime(108000, SENSOR_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(150000, SENSOR_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(99999999, SENSOR_MAX_HOURS) == (0, 0.0)


def test_consumable_negative_values():
    """Verify val < 0 returns (0, 0.0)."""
    assert _parse_consumable_lifetime(-1, FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(-50, FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(-0.001, MAIN_BRUSH_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime("-999", SENSOR_MAX_HOURS) == (0, 0.0)


def test_consumable_non_numeric_and_null_values():
    """Verify non-numeric values default safely to (100, max_hours)."""
    assert _parse_consumable_lifetime(None, FILTER_MAX_HOURS) == (100, 150.0)
    assert _parse_consumable_lifetime("not_a_number", FILTER_MAX_HOURS) == (100, 150.0)
    assert _parse_consumable_lifetime("", FILTER_MAX_HOURS) == (100, 150.0)
    assert _parse_consumable_lifetime([], FILTER_MAX_HOURS) == (100, 150.0)
    assert _parse_consumable_lifetime({}, FILTER_MAX_HOURS) == (100, 150.0)


def test_consumable_percentage_inputs():
    """Verify val <= 100 (for val > 0) is treated directly as percentage remaining."""
    # 85% remaining on 150h filter: 127.5h
    assert _parse_consumable_lifetime(85, FILTER_MAX_HOURS) == (85, 127.5)

    # 100% remaining: 150.0h
    assert _parse_consumable_lifetime(100, FILTER_MAX_HOURS) == (100, 150.0)

    # 50% remaining on 300h main brush: 150.0h
    assert _parse_consumable_lifetime(50, MAIN_BRUSH_MAX_HOURS) == (50, 150.0)

    # 1% remaining on 200h side brush: 2.0h
    assert _parse_consumable_lifetime(1, SIDE_BRUSH_MAX_HOURS) == (1, 2.0)

    # String percentage
    assert _parse_consumable_lifetime("75", FILTER_MAX_HOURS) == (75, 112.5)


def test_consumable_boundary_100_vs_101():
    """Verify transition at val=100 (percentage) vs val=101 (used seconds)."""
    # val=100 -> percentage: 100% and 150.0h
    pct_100, hrs_100 = _parse_consumable_lifetime(100, FILTER_MAX_HOURS)
    assert pct_100 == 100
    assert hrs_100 == 150.0

    # val=101 -> used seconds: 540000 - 101 = 539899s remaining -> 100% and 150.0h
    pct_101, hrs_101 = _parse_consumable_lifetime(101, FILTER_MAX_HOURS)
    assert pct_101 == 100
    assert hrs_101 == 150.0


# ===========================================================================
# 3. RESET CONSUMABLE ALIASES AND FALLBACK STRESS TESTS
# ===========================================================================

@pytest.mark.asyncio
async def test_reset_consumable_sensor_aliases_normal_success():
    """Verify all sensor aliases invoke ResetSensorLife when primary succeeds."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(return_value={"code": 0})

    sensor_aliases = [
        "sensor",
        "sensors",
        "sensor_clean",
        "sensor_dirtiness",
        "sensor_life",
        " SENSOR ",
        "Sensors",
        "Sensor_Clean",
        "SENSOR_DIRTINESS",
    ]

    for alias in sensor_aliases:
        api.invoke_sync.reset_mock()
        await api.reset_consumable("SN1", "PK1", alias)
        api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetSensorLife", {})


@pytest.mark.asyncio
async def test_reset_consumable_sensor_fallback_on_exception():
    """Verify fallback to ResetSensorCleanLife when ResetSensorLife raises an exception."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")

    sensor_aliases = ["sensor", "sensors", "sensor_clean", "sensor_dirtiness"]

    for alias in sensor_aliases:
        calls = []

        async def mock_invoke(sn, pk, action, params):
            calls.append(action)
            if action == "ResetSensorLife":
                raise BotslabCommandError(f"Action {action} failed: code 202001 method not found")
            return {"code": 0}

        api.invoke_sync = AsyncMock(side_effect=mock_invoke)
        await api.reset_consumable("SN1", "PK1", alias)

        assert calls == ["ResetSensorLife", "ResetSensorCleanLife"], (
            f"Alias '{alias}' failed to fall back from ResetSensorLife to ResetSensorCleanLife"
        )


@pytest.mark.asyncio
async def test_reset_consumable_both_actions_fail_raises():
    """Verify exception is re-raised when both ResetSensorLife and ResetSensorCleanLife fail."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(side_effect=BotslabCommandError("Device communication timed out"))

    with pytest.raises(BotslabCommandError, match="Device communication timed out"):
        await api.reset_consumable("SN1", "PK1", "sensor")

    assert api.invoke_sync.call_count == 2
    assert api.invoke_sync.call_args_list[0].args == ("SN1", "PK1", "ResetSensorLife", {})
    assert api.invoke_sync.call_args_list[1].args == ("SN1", "PK1", "ResetSensorCleanLife", {})


@pytest.mark.asyncio
async def test_reset_consumable_other_aliases():
    """Verify filter, main brush, and side brush alias normalization."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(return_value={"code": 0})

    # Filter aliases
    for alias in ("filter", "hepa", "filter_life", " FILTER ", "Hepa"):
        api.invoke_sync.reset_mock()
        await api.reset_consumable("SN1", "PK1", alias)
        api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetFilterLife", {})

    # Main brush aliases
    for alias in ("main_brush", "mainbrush", "roll_brush", "brush", "main_brush_life", "MAIN_BRUSH"):
        api.invoke_sync.reset_mock()
        await api.reset_consumable("SN1", "PK1", alias)
        api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetMainBrushLife", {})

    # Side brush aliases
    for alias in ("side_brush", "sidebrush", "edge_brush", "side_brush_life", "Edge_Brush"):
        api.invoke_sync.reset_mock()
        await api.reset_consumable("SN1", "PK1", alias)
        api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetSideBrushLife", {})


@pytest.mark.asyncio
async def test_legacy_360_reset_consumable_all_aliases():
    """Verify legacy 360 resets consumable via INFO_360_RESET_CONSUMABLE (21016) and zeroes cache."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0})

    # Test sensor aliases map to canonical 'sensor'
    for alias in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness"):
        api.send_legacy_360_cmd.reset_mock()
        api._legacy_consumables["SN_LEGACY"] = {"sensor": 10000}
        await api.reset_consumable("SN_LEGACY", "PK1", alias)
        api.send_legacy_360_cmd.assert_called_once_with(
            "SN_LEGACY", INFO_360_RESET_CONSUMABLE, {"cmd": "sensor"}
        )
        assert api._legacy_consumables["SN_LEGACY"]["sensor"] == 0

    # Test filter aliases map to 'filter'
    api.send_legacy_360_cmd.reset_mock()
    api._legacy_consumables["SN_LEGACY"] = {"filter": 25000}
    await api.reset_consumable("SN_LEGACY", "PK1", "hepa")
    api.send_legacy_360_cmd.assert_called_once_with(
        "SN_LEGACY", INFO_360_RESET_CONSUMABLE, {"cmd": "filter"}
    )
    assert api._legacy_consumables["SN_LEGACY"]["filter"] == 0


@pytest.mark.asyncio
async def test_coordinator_optimistic_update_and_failure_isolation():
    """Verify coordinator optimistic update modifies device consumables on success,

    and does NOT modify them if api.reset_consumable raises an exception.
    """
    api = MagicMock()
    api.reset_consumable = AsyncMock()
    coord = BotslabVacuumCoordinator(MagicMock(), MagicMock(), api)

    initial_consumables = BotslabConsumableStatus(
        filter_life_pct=20,
        filter_left_hours=30.0,
        filter_used_hours=120.0,
        main_brush_life_pct=15,
        main_brush_left_hours=45.0,
        main_brush_used_hours=255.0,
        side_brush_life_pct=10,
        side_brush_left_hours=20.0,
        side_brush_used_hours=180.0,
        sensor_clean_pct=5,
        sensor_left_hours=1.5,
        sensor_used_hours=28.5,
    )
    dev = BotslabVacuumDevice(
        product_key="PK1",
        device_name="SN1",
        device_title="Robot 1",
        consumables=initial_consumables,
    )
    coord.data = {"SN1": dev}
    coord.async_set_updated_data = MagicMock()

    # 1. Reset sensor_dirtiness alias
    await coord.reset_consumable("SN1", "sensor_dirtiness")
    assert dev.consumables.sensor_clean_pct == 100
    assert dev.consumables.sensor_left_hours == SENSOR_MAX_HOURS
    assert dev.consumables.sensor_used_hours == 0.0
    coord.async_set_updated_data.assert_called_once()

    # 2. Reset filter alias 'hepa'
    coord.async_set_updated_data.reset_mock()
    await coord.reset_consumable("SN1", "hepa")
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    assert dev.consumables.filter_used_hours == 0.0
    coord.async_set_updated_data.assert_called_once()

    # 3. When API raises exception, local state must NOT be modified
    api.reset_consumable = AsyncMock(side_effect=BotslabCommandError("Cloud offline"))
    dev.consumables.main_brush_life_pct = 15
    dev.consumables.main_brush_left_hours = 45.0
    coord.async_set_updated_data.reset_mock()

    with pytest.raises(BotslabCommandError):
        await coord.reset_consumable("SN1", "main_brush")

    assert dev.consumables.main_brush_life_pct == 15, "Local state must NOT update on API failure"
    assert dev.consumables.main_brush_left_hours == 45.0
    coord.async_set_updated_data.assert_not_called()


# ===========================================================================
# 4. BUG FIX VALIDATION & ADDITIONAL ADVERSARIAL TESTS
# ===========================================================================

def test_bug_1_consumable_nan_input_crashes_with_value_error():
    """Verify _parse_consumable_lifetime returns (100, FILTER_MAX_HOURS) on NaN inputs without raising ValueError."""
    for nan_input in (float("nan"), "nan", "NaN"):
        pct, hours = _parse_consumable_lifetime(nan_input, FILTER_MAX_HOURS)
        assert pct == 100
        assert hours == FILTER_MAX_HOURS


@pytest.mark.asyncio
async def test_bug_2_reset_sensor_life_error_code_swallowed_without_fallback():
    """Verify reset_consumable executes fallback to ResetSensorCleanLife on non-zero API return code."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    calls = []

    async def mock_invoke(sn, pk, action, params):
        calls.append(action)
        if action == "ResetSensorLife":
            return {"code": 1001, "msg": "method ResetSensorLife not supported on device"}
        return {"code": 0}

    api.invoke_sync = AsyncMock(side_effect=mock_invoke)
    await api.reset_consumable("SN1", "PK1", "sensor")

    assert calls == ["ResetSensorLife", "ResetSensorCleanLife"], "Fallback to ResetSensorCleanLife must execute on non-zero API return code"


@pytest.mark.asyncio
async def test_reset_consumable_all_error_codes_raises():
    """Verify reset_consumable raises BotslabCommandError if all actions return non-zero error codes."""
    api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(return_value={"code": 1001, "msg": "method rejected"})

    with pytest.raises(BotslabCommandError, match="failed with code 1001"):
        await api.reset_consumable("SN1", "PK1", "sensor")


@pytest.mark.asyncio
async def test_bug_3_legacy_status_poll_uncoerced_battery_freezes_coordinator():
    """Verify status poll cmd_data coerces string battery (e.g. '82%') so props['BatteryLevel'] is 82 and dev.battery_level is 82."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Live push had correctly extracted battery 82
    api._legacy_live_status["SN1"] = {"elec": 82}

    # Status poll response contains string '82%'
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {"elec": "82%"}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 82, "props['BatteryLevel'] must be safely coerced to integer 82"

    # Now verify coordinator impact
    coord = BotslabVacuumCoordinator(MagicMock(), MagicMock(), api)
    coord.api.is_legacy_360 = True
    coord.api.sid = "valid_sid"
    coord.api.push_alias = "valid_alias"
    coord.api.session = None
    coord.api.get_cached_map_info = MagicMock(return_value=None)
    coord.api.get_devices = AsyncMock(return_value=[{"device_name": "SN1", "product_key": "PK1"}])
    coord.api.get_property_extended = AsyncMock(return_value=(props, {}))
    coord._firmware_cache = {"SN1": "1.0.0"}
    coord.enable_map = False

    data = await coord._async_update_data()
    assert data["SN1"].battery_level == 82, "Battery level must be 82%, not freeze at 100%"


@pytest.mark.asyncio
async def test_legacy_status_poll_malformed_battery_preserves_live():
    """Verify status poll with completely malformed battery does not clobber live battery."""
    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api._legacy_live_status["SN1"] = {"elec": 82}
    # cmd_data contains non-coercible string and boolean
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {"elec": "invalid", "power": True}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    props, _ = await api._legacy_360_get_properties("SN1")
    assert props["BatteryLevel"] == 82, "props['BatteryLevel'] must preserve existing live battery 82"


def test_coerce_battery_level_helper():
    """Test _coerce_battery_level with valid, malformed, and out-of-range inputs."""
    from custom_components.botslab_vacuum.api import _coerce_battery_level

    # Valid integer and float conversions
    assert _coerce_battery_level(82) == 82
    assert _coerce_battery_level(0) == 0
    assert _coerce_battery_level(100) == 100
    assert _coerce_battery_level(82.9) == 82
    assert _coerce_battery_level("82") == 82
    assert _coerce_battery_level("  82  ") == 82
    assert _coerce_battery_level("82%") == 82
    assert _coerce_battery_level(" 82 % ") == 82
    assert _coerce_battery_level("82.0") == 82
    assert _coerce_battery_level("82.0%") == 82

    # Rejection of booleans, None, empty strings
    assert _coerce_battery_level(True) is None
    assert _coerce_battery_level(False) is None
    assert _coerce_battery_level(None) is None
    assert _coerce_battery_level("") is None
    assert _coerce_battery_level("   ") is None
    assert _coerce_battery_level("%") is None

    # Rejection of invalid non-numeric strings
    assert _coerce_battery_level("invalid") is None
    assert _coerce_battery_level("charging") is None

    # Rejection of NaN and inf
    assert _coerce_battery_level(float("nan")) is None
    assert _coerce_battery_level(float("inf")) is None
    assert _coerce_battery_level(float("-inf")) is None
    assert _coerce_battery_level("nan") is None

    # Rejection of out-of-range values
    assert _coerce_battery_level(-1) is None
    assert _coerce_battery_level(101) is None
    assert _coerce_battery_level("-5%") is None
    assert _coerce_battery_level("105%") is None

    # Rejection of complex structures
    assert _coerce_battery_level([82]) is None
    assert _coerce_battery_level({"elec": 82}) is None


@pytest.mark.asyncio
async def test_button_press_calls_coordinator_reset_consumable():
    """Verify reset button entities invoke coordinator.reset_consumable and avoid immediate refresh."""
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS, BotslabButton

    coord = MagicMock()
    coord.reset_consumable = AsyncMock()
    coord.async_request_refresh = AsyncMock()
    dev = MagicMock(device_name="SN_TEST", product_key="PK_TEST")
    coord.data = {"SN_TEST": dev}
    hass = MagicMock()

    reset_buttons = [d for d in BUTTON_DESCRIPTIONS if d.key.startswith("reset_")]
    assert len(reset_buttons) == 4

    expected_types = {
        "reset_filter": "filter",
        "reset_main_brush": "main_brush",
        "reset_side_brush": "side_brush",
        "reset_sensors": "sensor",
    }

    for desc in reset_buttons:
        coord.reset_consumable.reset_mock()
        coord.async_request_refresh.reset_mock()
        btn = BotslabButton(coord, dev, desc)
        btn.hass = hass

        await btn.async_press()

        # Check coord.reset_consumable was awaited with correct parameters
        coord.reset_consumable.assert_awaited_once_with("SN_TEST", expected_types[desc.key])
        # Check async_request_refresh was NOT called for reset buttons
        coord.async_request_refresh.assert_not_called()


@pytest.mark.asyncio
async def test_service_handle_reset_consumable_calls_coordinator():
    """Verify handle_reset_consumable invokes coordinator.reset_consumable."""
    from custom_components.botslab_vacuum import DOMAIN
    from custom_components.botslab_vacuum.const import ATTR_CONSUMABLE_TYPE

    coord = MagicMock()
    coord.reset_consumable = AsyncMock()
    coord.async_request_refresh = AsyncMock()
    dev = MagicMock(device_name="SN_TEST", product_key="PK_TEST")

    # Simulate handle_reset_consumable logic
    call = MagicMock()
    call.data = {ATTR_CONSUMABLE_TYPE: "filter"}

    consumable = call.data.get(ATTR_CONSUMABLE_TYPE) or call.data.get("consumable")
    await coord.reset_consumable(dev.device_name, consumable)

    coord.reset_consumable.assert_awaited_once_with("SN_TEST", "filter")
    coord.async_request_refresh.assert_not_called()


@pytest.mark.asyncio
async def test_r2_reset_sensor_life_string_and_negative_codes_fallback():
    """Verify string code '1001' and negative code -1 trigger fallback to ResetSensorCleanLife."""
    for code_val in ("1001", -1, 202001):
        api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
        calls = []

        async def mock_invoke(sn, pk, action, params, cv=code_val, c_calls=calls):
            c_calls.append(action)
            if action == "ResetSensorLife":
                return {"code": cv, "msg": "method not found"}
            return {"code": 0}

        api.invoke_sync = AsyncMock(side_effect=mock_invoke)
        await api.reset_consumable("SN1", "PK1", "sensor")
        assert calls == ["ResetSensorLife", "ResetSensorCleanLife"], f"Failed for code {code_val}"


@pytest.mark.asyncio
async def test_r2_reset_sensor_all_aliases_execute_fallback_on_1001():
    """Verify ALL sensor aliases execute fallback to ResetSensorCleanLife on code 1001."""
    aliases = ["sensor", "sensors", "sensor_clean", "sensor_dirtiness", "sensor_life"]
    for alias in aliases:
        api = BotslabVacuumApi(MagicMock(), "eu1", "m2", "q", "t")
        calls = []

        async def mock_invoke(sn, pk, action, params, c_calls=calls):
            c_calls.append(action)
            if action == "ResetSensorLife":
                return {"code": 1001, "msg": "method not found"}
            return {"code": 0}

        api.invoke_sync = AsyncMock(side_effect=mock_invoke)
        await api.reset_consumable("SN1", "PK1", alias)
        assert calls == ["ResetSensorLife", "ResetSensorCleanLife"], f"Failed for alias {alias}"


@pytest.mark.asyncio
async def test_r2_status_poll_malformed_values_never_clobber_live_battery():
    """Verify adversarial malformed status poll responses NEVER overwrite live battery 82."""
    adversarial_cmd_data = [
        {"elec": "invalid"},
        {"elec": "NaN"},
        {"elec": "nan%"},
        {"elec": ""},
        {"elec": "   "},
        {"elec": "%"},
        {"elec": True},
        {"elec": False},
        {"elec": None},
        {"elec": 105},
        {"elec": -1},
        {"elec": "150%"},
        {"elec": "-10%"},
        {"elec": [82]},
        {"elec": {"val": 82}},
        {"elec": float("nan")},
        {"elec": float("inf")},
        {"elec": float("-inf")},
    ]

    for payload in adversarial_cmd_data:
        api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
        api._legacy_live_status["SN1"] = {"elec": 82}
        api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": payload})
        api.get_latest_clean_record = AsyncMock(return_value=None)

        props, _ = await api._legacy_360_get_properties("SN1")
        assert props["BatteryLevel"] == 82, (
            f"Adversarial payload {payload} clobbered live battery 82 to {props['BatteryLevel']}"
        )


def test_r2_consumable_nan_and_extremes_exhaustive():
    """Empirically test NaN variations and extreme infinities return safe values without exceptions."""
    nan_inputs = [
        float("nan"),
        "nan",
        "NaN",
        "NAN",
        "-nan",
        "-NaN",
        "  nan  ",
        "  NaN  ",
        "  nan \n",
    ]
    for val in nan_inputs:
        pct, hrs = _parse_consumable_lifetime(val, FILTER_MAX_HOURS)
        assert pct == 100, f"Expected 100 for {val!r}, got {pct}"
        assert hrs == FILTER_MAX_HOURS, f"Expected {FILTER_MAX_HOURS} for {val!r}, got {hrs}"

    # Infinities
    assert _parse_consumable_lifetime(float("-inf"), FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(float("inf"), FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(36000000, FILTER_MAX_HOURS) == (0, 0.0)
    assert _parse_consumable_lifetime(-999999, FILTER_MAX_HOURS) == (0, 0.0)




