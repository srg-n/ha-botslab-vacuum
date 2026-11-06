"""Empirical Challenger Pure Test Suite for Milestone 1: R1 & R2 Verification.

Adversarial stress-testing, boundary condition mining, and failure-mode validation for:
- R1: Dynamic QPush IP Resolution (qpush.py)
- R2: Map Sync & 1days Bucket Prioritization (api.py)
"""
from __future__ import annotations

import asyncio
import json
from unittest.mock import AsyncMock, MagicMock, patch
import aiohttp
import pytest

from custom_components.botslab_vacuum.api import BotslabVacuumApi
from custom_components.botslab_vacuum.qpush import (
    CHINA_PUSH_HOST,
    CHINA_PUSH_PORT,
    QPUSH_DISPATCHER,
    QPUSH_FALLBACK_ENDPOINTS,
    BotslabChinaQPush,
    BotslabQPush,
    resolve_qpush_gateway,
)


# ===========================================================================
# R1 EMPIRICAL TESTS: Dynamic QPush IP Resolution
# ===========================================================================

@pytest.mark.asyncio
async def test_r1_resolve_qpush_gateway_normal_dispatcher_responses():
    """Verify normal dispatcher responses with various valid JSON schemas."""
    session = MagicMock(spec=aiohttp.ClientSession)
    mock_resp = MagicMock()
    mock_resp.status = 200
    session.get.return_value.__aenter__.return_value = mock_resp

    # 1. Standard multi-endpoint response (Port 443 and Port 80)
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [
                {"ip": "1.2.3.4", "p": 443},
                {"ip": "1.2.3.4", "p": 80},
                {"ip": "5.6.7.8", "p": 443},
            ],
        }
    )
    endpoints = await resolve_qpush_gateway(session, "gqrwex6nq54m")
    assert endpoints == [("1.2.3.4", 443), ("1.2.3.4", 80), ("5.6.7.8", 443)]

    # 2. String errno "0" and missing port (defaults to 443)
    mock_resp.json = AsyncMock(
        return_value={
            "errno": "0",
            "data": [
                {"ip": "10.0.0.1"},
                {"ip": "10.0.0.2", "p": "8080"},
            ],
        }
    )
    endpoints = await resolve_qpush_gateway(session, "gqrwex6nq54m")
    assert endpoints == [("10.0.0.1", 443), ("10.0.0.2", 8080)]

    # 3. Deduplication and whitespace trimming
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [
                {"ip": "  192.168.1.1  ", "p": 443},
                {"ip": "192.168.1.1", "p": 443},
                {"ip": "192.168.1.1", "p": 80},
            ],
        }
    )
    endpoints = await resolve_qpush_gateway(session, "gqrwex6nq54m")
    assert endpoints == [("192.168.1.1", 443), ("192.168.1.1", 80)]

    # 4. Custom AppID query string check
    session.get.reset_mock()
    await resolve_qpush_gateway(session, app_id="custom_app_123")
    session.get.assert_called_once()
    assert session.get.call_args[0][0] == f"{QPUSH_DISPATCHER}?appId=custom_app_123"


@pytest.mark.asyncio
async def test_r1_resolve_qpush_gateway_dispatcher_fallbacks():
    """Verify fallback to Frankfurt [('8.211.52.133', 443), ('8.211.52.133', 80)] under standard failure modes."""
    session = MagicMock(spec=aiohttp.ClientSession)
    mock_resp = MagicMock()
    session.get.return_value.__aenter__.return_value = mock_resp

    expected_fallback = [("8.211.52.133", 443), ("8.211.52.133", 80)]

    # 1. Network exceptions
    for exc in [
        aiohttp.ClientConnectionError("Connection refused"),
        asyncio.TimeoutError("GSLB lookup timed out"),
        OSError("Network unreachable"),
        aiohttp.ClientPayloadError("Corrupt body"),
    ]:
        session.get.side_effect = exc
        res = await resolve_qpush_gateway(session)
        assert res == expected_fallback, f"Failed on network error: {exc}"

    session.get.side_effect = None

    # 2. HTTP non-200 status codes
    for status in [400, 403, 404, 500, 502, 503, 504]:
        mock_resp.status = status
        mock_resp.json = AsyncMock(return_value={"errno": 0, "data": [{"ip": "1.2.3.4"}]})
        res = await resolve_qpush_gateway(session)
        assert res == expected_fallback, f"Failed on HTTP status: {status}"

    mock_resp.status = 200

    # 3. Non-zero errno
    for bad_errno in [1, 1001, -1, "1001", "error"]:
        mock_resp.json = AsyncMock(return_value={"errno": bad_errno, "data": [{"ip": "1.2.3.4"}]})
        res = await resolve_qpush_gateway(session)
        assert res == expected_fallback, f"Failed on errno: {bad_errno}"

    # 4. Empty data list or None data
    for empty_data in [[], None, "", {}]:
        mock_resp.json = AsyncMock(return_value={"errno": 0, "data": empty_data})
        res = await resolve_qpush_gateway(session)
        assert res == expected_fallback, f"Failed on empty data: {empty_data}"

    # 5. Invalid candidate objects without valid ip string
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [
                {"bad_key": "no_ip"},
                {"ip": ""},
                {"ip": "   "},
                "not_a_dict",
            ],
        }
    )
    res = await resolve_qpush_gateway(session)
    assert res == expected_fallback

    # 6. JSON parse / decoding exception
    mock_resp.json = AsyncMock(side_effect=aiohttp.ContentTypeError(None, None))
    res = await resolve_qpush_gateway(session)
    assert res == expected_fallback

    # 7. Fallback list immutability: mutating returned list should not alter constant
    res.append(("9.9.9.9", 999))
    fresh = await resolve_qpush_gateway(session)
    assert fresh == [("8.211.52.133", 443), ("8.211.52.133", 80)]
    assert QPUSH_FALLBACK_ENDPOINTS == [("8.211.52.133", 443), ("8.211.52.133", 80)]


@pytest.mark.asyncio
async def test_r1_resolve_qpush_gateway_null_ip_stress_challenge():
    """Empirical challenge: verify whether dispatcher response with null IP is properly handled or returns [('None', 443)]."""
    session = MagicMock(spec=aiohttp.ClientSession)
    mock_resp = MagicMock()
    mock_resp.status = 200
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [
                {"ip": None, "p": 443},
            ],
        }
    )
    session.get.return_value.__aenter__.return_value = mock_resp

    res = await resolve_qpush_gateway(session)
    # If the bug exists, res will be [('None', 443)] instead of the Frankfurt fallback.
    return res


@pytest.mark.asyncio
async def test_r1_tcp_connection_raw_binary_and_fallback_sequence():
    """Verify Port 443 is raw TCP (ssl=None), Port 80 is fallback, and ConnectionError on total failure."""
    session = MagicMock()
    qpush = BotslabQPush(
        session=session,
        device_id="test_dev_emp",
        get_alias=lambda: "alias_emp",
        on_push=lambda p: None,
        ensure_session=AsyncMock(),
    )

    mock_reader = AsyncMock()
    mock_writer = MagicMock()
    mock_writer.write = MagicMock()
    mock_writer.drain = AsyncMock()

    # Scenario A: Port 443 succeeds immediately
    calls_a = []
    async def mock_open_a(ip, port, ssl=None):
        assert ssl is None, "Port 443 must connect with ssl=None (raw binary TCP)"
        calls_a.append((ip, port))
        return mock_reader, mock_writer

    with patch("custom_components.botslab_vacuum.qpush.resolve_qpush_gateway", AsyncMock(return_value=[("8.211.52.133", 443), ("8.211.52.133", 80)])), \
         patch("asyncio.open_connection", side_effect=mock_open_a), \
         patch.object(qpush, "_read_msg", AsyncMock(side_effect=asyncio.CancelledError)):
        try:
            await qpush._session_once()
        except asyncio.CancelledError:
            pass

    assert calls_a == [("8.211.52.133", 443)], "When port 443 succeeds, port 80 must not be attempted"

    # Scenario B: Port 443 fails with OSError, Port 80 succeeds
    calls_b = []
    async def mock_open_b(ip, port, ssl=None):
        assert ssl is None, "Every connection attempt must use raw binary TCP (ssl=None)"
        calls_b.append((ip, port))
        if port == 443:
            raise OSError("Connection timed out on 443")
        return mock_reader, mock_writer

    with patch("custom_components.botslab_vacuum.qpush.resolve_qpush_gateway", AsyncMock(return_value=[("8.211.52.133", 443), ("8.211.52.133", 80)])), \
         patch("asyncio.open_connection", side_effect=mock_open_b), \
         patch.object(qpush, "_read_msg", AsyncMock(side_effect=asyncio.CancelledError)):
        try:
            await qpush._session_once()
        except asyncio.CancelledError:
            pass

    assert calls_b == [("8.211.52.133", 443), ("8.211.52.133", 80)], "Must fall back to port 80 after port 443 fails"

    # Scenario C: Both endpoints fail -> raises ConnectionError
    async def mock_open_c(ip, port, ssl=None):
        raise OSError(f"Connection refused on {port}")

    with patch("custom_components.botslab_vacuum.qpush.resolve_qpush_gateway", AsyncMock(return_value=[("8.211.52.133", 443), ("8.211.52.133", 80)])), \
         patch("asyncio.open_connection", side_effect=mock_open_c):
        with pytest.raises(ConnectionError, match="Failed to connect to any QPush endpoint"):
            await qpush._session_once()


def test_r1_legacy_china_qpush_isolation():
    """Verify legacy Qihoo 360 China QPush configuration remains completely isolated."""
    assert CHINA_PUSH_HOST == "47.254.151.104"
    assert CHINA_PUSH_PORT == 443

    china_push = BotslabChinaQPush(
        get_sid=lambda: "sid_test",
        get_push_key=lambda: "pushkey_test",
        on_push=lambda p: None,
        ensure_session=AsyncMock(),
    )
    assert china_push._host == "47.254.151.104"
    assert china_push._port == 443


# ===========================================================================
# R2 EMPIRICAL TESTS: Map Sync & 1days Bucket Prioritization
# ===========================================================================

@pytest.mark.asyncio
async def test_r2_start_and_stop_sync_map_to_oss_contracts():
    """Verify API contracts for StartSyncMapPkgToOss and StopSyncMapPkgToOss."""
    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {"request_id": "req_999"}})
    api.wait_async_reply = AsyncMock(return_value=True)
    api.invoke_sync = AsyncMock(return_value={"code": 0, "data": {}})

    # 1. start_sync_map_to_oss default watchdog = 60s
    res = await api.start_sync_map_to_oss("SN_TEST", "PK_TEST")
    api.invoke_async.assert_called_once_with(
        "SN_TEST", "PK_TEST", "StartSyncMapPkgToOss", {"SyncDuration": 60}
    )
    api.wait_async_reply.assert_called_once_with("req_999", timeout=5)
    assert res == {"code": 0, "data": {"request_id": "req_999"}}

    # 2. start_sync_map_to_oss custom duration int and string
    api.invoke_async.reset_mock()
    api.wait_async_reply.reset_mock()
    await api.start_sync_map_to_oss("SN_TEST", "PK_TEST", sync_duration=120)
    api.invoke_async.assert_called_once_with(
        "SN_TEST", "PK_TEST", "StartSyncMapPkgToOss", {"SyncDuration": 120}
    )

    api.invoke_async.reset_mock()
    await api.start_sync_map_to_oss("SN_TEST", "PK_TEST", sync_duration="45")
    api.invoke_async.assert_called_once_with(
        "SN_TEST", "PK_TEST", "StartSyncMapPkgToOss", {"SyncDuration": 45}
    )

    # 3. start_sync_map_to_oss without request_id does not call wait_async_reply
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {}})
    api.wait_async_reply.reset_mock()
    await api.start_sync_map_to_oss("SN_TEST", "PK_TEST")
    api.wait_async_reply.assert_not_called()

    # 4. stop_sync_map_to_oss contract
    res_stop = await api.stop_sync_map_to_oss("SN_TEST", "PK_TEST")
    api.invoke_sync.assert_called_once_with("SN_TEST", "PK_TEST", "StopSyncMapPkgToOss", {})
    assert res_stop == {"code": 0, "data": {}}

    # 5. Aliases backward compatibility
    api.invoke_async.reset_mock()
    api.invoke_sync.reset_mock()
    await api.start_map_sync("SN_TEST", "PK_TEST", duration_s=90)
    api.invoke_async.assert_called_once_with(
        "SN_TEST", "PK_TEST", "StartSyncMapPkgToOss", {"SyncDuration": 90}
    )
    await api.stop_map_sync("SN_TEST", "PK_TEST")
    api.invoke_sync.assert_called_once_with("SN_TEST", "PK_TEST", "StopSyncMapPkgToOss", {})

    # 6. Legacy 360 isolation: no calls made, returns empty dict
    api_legacy = BotslabVacuumApi(session, "cn", "m2", "q", "t")
    api_legacy.invoke_async = AsyncMock()
    api_legacy.invoke_sync = AsyncMock()
    assert await api_legacy.start_sync_map_to_oss("SN_LEG", "PK_LEG") == {}
    assert await api_legacy.stop_sync_map_to_oss("SN_LEG", "PK_LEG") == {}
    assert await api_legacy.start_map_sync("SN_LEG", "PK_LEG") == {}
    assert await api_legacy.stop_map_sync("SN_LEG", "PK_LEG") == {}
    api_legacy.invoke_async.assert_not_called()
    api_legacy.invoke_sync.assert_not_called()


@pytest.mark.asyncio
async def test_r2_get_map_json_candidate_prioritization_stress():
    """Stress test get_map_json candidate selection under diverse active and idle conditions."""
    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")

    doc_1days = {
        "width": 100,
        "height": 100,
        "map": "base64_raster_1days",
        "smartArea": {"value": []},  # 0 rooms, 0 vertices
    }
    doc_temp = {
        "width": 100,
        "height": 100,
        "map": "base64_raster_temp",
        "smartArea": {"value": [{"id": 1, "vertexs": [[0, 0], [1, 1]]}]},  # 2 vertices
    }
    doc_90days = {
        "width": 100,
        "height": 100,
        "map": "base64_raster_90days",
        "smartArea": {
            "value": [
                {"id": 1, "vertexs": [[0, 0], [10, 0], [10, 10], [0, 10]]},
                {"id": 2, "vertexs": [[10, 0], [20, 0], [20, 10], [10, 10]]},
                {"id": 3, "vertexs": [[20, 0], [30, 0], [30, 10], [20, 10]]},
            ]
        },  # 3 rooms, 12 vertices (high quality)
    }

    url_1days = "https://eu1-ali-1days.oss-eu-central-1.aliyuncs.com/device/map/current.bin"
    url_temp = "https://eu1-ali.oss-eu-central-1.aliyuncs.com/device/temp/sweep_active.bin"
    url_90days = "https://eu1-ali-90days.oss-eu-central-1.aliyuncs.com/device/map/archive_90d.bin"

    async def mock_fetch(url, signed):
        if "1days" in url:
            return doc_1days
        if "temp" in url:
            return doc_temp
        if "90days" in url:
            return doc_90days
        return None

    api._fetch_signed_json = AsyncMock(side_effect=mock_fetch)

    # 1. Active cleaning (WorkingStatus=1: DefaultClean): 1days must beat 90days despite 0 rooms vs 3 rooms
    signs_1_and_90 = {url_1days: "sig1", url_90days: "sig90"}
    props_cleaning_1 = {"WorkingStatus": 1, "MapPkgOssInfo": json.dumps({"Url": url_1days})}
    api.get_property_extended = AsyncMock(return_value=(props_cleaning_1, signs_1_and_90))
    chosen_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_doc["map"] == "base64_raster_1days"

    # 2. Active cleaning (WorkingStatus="2": CleanInAreas string): 1days must beat 90days
    props_cleaning_2 = {"WorkingStatus": "2", "MapPkgOssInfo": json.dumps({"Url": url_1days})}
    api.get_property_extended = AsyncMock(return_value=(props_cleaning_2, signs_1_and_90))
    chosen_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_doc["map"] == "base64_raster_1days"

    # 3. Active cleaning with /temp/ URL: temp must beat 90days
    signs_temp_and_90 = {url_temp: "sigt", url_90days: "sig90"}
    props_temp = {"WorkingStatus": 3, "MapPkgOssInfo": json.dumps({"Url": url_temp})}
    api.get_property_extended = AsyncMock(return_value=(props_temp, signs_temp_and_90))
    chosen_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_doc["map"] == "base64_raster_temp"

    # 4. Active cleaning with multiple live candidates (both 1days and temp):
    # Within live pool, higher quality is chosen (doc_temp has 2 vertices, doc_1days has 0)
    signs_all = {url_1days: "sig1", url_temp: "sigt", url_90days: "sig90"}
    props_multi_live = {"WorkingStatus": 10, "MapPkgOssInfo": json.dumps({"Url": url_1days})}
    api.get_property_extended = AsyncMock(return_value=(props_multi_live, signs_all))
    chosen_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_doc["map"] == "base64_raster_temp"

    # 5. Active cleaning but NO live candidates available (only 90days):
    # Graceful fallback: picks 90days rather than failing or returning None
    signs_only_90 = {url_90days: "sig90"}
    props_only_90 = {"WorkingStatus": 2, "MapPkgOssInfo": json.dumps({"Url": url_90days})}
    api.get_property_extended = AsyncMock(return_value=(props_only_90, signs_only_90))
    chosen_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_doc["map"] == "base64_raster_90days"

    # 6. Idle / Docked states: 90days (high room quality) must be chosen over 1days
    for idle_status in [0, 6, 7, 11, "0", "6", "7", "11", "docked", "charging"]:
        props_idle = {"WorkingStatus": idle_status, "MapPkgOssInfo": json.dumps({"Url": url_1days})}
        api.get_property_extended = AsyncMock(return_value=(props_idle, signs_1_and_90))
        chosen_idle, _ = await api.get_map_json("SN_1", "PK_1")
        assert chosen_idle["map"] == "base64_raster_90days", f"Failed for idle status: {idle_status}"

    # 7. Cached S3 signs: URLs present only in cached_s3_signs are scanned
    api.cached_s3_signs = {url_1days: "cached_sig"}
    props_cached = {"WorkingStatus": 1, "MapPkgOssInfo": json.dumps({"Url": url_90days})}
    api.get_property_extended = AsyncMock(return_value=(props_cached, {url_90days: "sig90"}))
    chosen_cached, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_cached["map"] == "base64_raster_1days"
    api.cached_s3_signs = {}

    # 8. Malformed MapPkgOssInfo JSON handled without crash
    props_malformed = {"WorkingStatus": 1, "MapPkgOssInfo": "{not_valid_json"}
    api.get_property_extended = AsyncMock(return_value=(props_malformed, signs_1_and_90))
    chosen_malformed, _ = await api.get_map_json("SN_1", "PK_1")
    assert chosen_malformed["map"] == "base64_raster_1days"


@pytest.mark.asyncio
async def test_r2_get_map_json_raster_grid_borrowing():
    """Verify that a candidate without raster borrows raster grid properties from candidate with raster."""
    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")

    doc_rooms_only = {
        "smartArea": {"value": [{"id": 1, "vertexs": [[0, 0], [10, 0], [10, 10]]}]},
        # no "width", "height", "map"
    }
    doc_raster_only = {
        "width": 256,
        "height": 256,
        "map": "raster_data_borrowed",
        "x_min": -10.5,
        "y_min": -15.0,
        "resolution": 0.05,
    }

    url_rooms = "https://eu1-ali.oss-eu-central-1.aliyuncs.com/device/map/rooms.bin"
    url_raster = "https://eu1-ali.oss-eu-central-1.aliyuncs.com/device/map/raster.bin"

    async def mock_fetch(url, signed):
        if "rooms" in url:
            return doc_rooms_only
        return doc_raster_only

    api._fetch_signed_json = AsyncMock(side_effect=mock_fetch)
    signs = {url_rooms: "s1", url_raster: "s2"}
    props = {"WorkingStatus": 7, "MapPkgOssInfo": json.dumps({"Url": url_raster})}
    api.get_property_extended = AsyncMock(return_value=(props, signs))

    best_doc, _ = await api.get_map_json("SN_1", "PK_1")
    assert best_doc["width"] == 256
    assert best_doc["height"] == 256
    assert best_doc["map"] == "raster_data_borrowed"
    assert best_doc["x_min"] == -10.5
    assert best_doc["resolution"] == 0.05


# ===========================================================================
# CONFIRMED BUGS REPRODUCTION TESTS (EMPIRICAL VERIFICATION)
# ===========================================================================

@pytest.mark.asyncio
async def test_bug_1_r1_null_ip_yields_none_string_endpoint():
    """EMPIRICAL BUG 1: qpush.py resolve_qpush_gateway returns [('None', 443)] when ip is null.

    When dispatcher returns {"errno": 0, "data": [{"ip": null, "p": 443}]},
    `resolve_qpush_gateway` turns None into 'None' string instead of falling back to
    Frankfurt [('8.211.52.133', 443), ('8.211.52.133', 80)].
    """
    session = MagicMock(spec=aiohttp.ClientSession)
    mock_resp = MagicMock()
    mock_resp.status = 200
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [
                {"ip": None, "p": 443},
            ],
        }
    )
    session.get.return_value.__aenter__.return_value = mock_resp

    res = await resolve_qpush_gateway(session)
    assert res == [("None", 443)], "Bug confirmed: returned ('None', 443) instead of fallback"


@pytest.mark.asyncio
async def test_bug_2_r2_start_sync_map_to_oss_crashes_on_null_data():
    """EMPIRICAL BUG 2: api.py start_sync_map_to_oss crashes with AttributeError on {"data": null}.

    Line 2005: `req_id = (res or {}).get("data", {}).get("request_id")`.
    When `invoke_async` returns a failure response with {"code": 1001, "msg": "fail", "data": None},
    `.get("data", {})` evaluates to None. Calling `.get("request_id")` on None raises:
    AttributeError: 'NoneType' object has no attribute 'get'.
    """
    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    api.invoke_async = AsyncMock(return_value={"code": 1001, "msg": "fail", "data": None})

    with pytest.raises(AttributeError, match="'NoneType' object has no attribute 'get'"):
        await api.start_sync_map_to_oss("SN_TEST", "PK_TEST")

