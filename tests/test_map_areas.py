"""Tests for map-area (no-go / no-mop / virtual wall) encoding and decoding.

The robot stores all map areas in a single ``area`` array of its map document and the
``SetZones`` service replaces that whole list.  These tests pin down the wire schema
captured from the official app, the read-side mapping and the error handling that keeps
the integration from reporting a fake success.
"""
from __future__ import annotations

import json

import pytest

from custom_components.botslab_vacuum.api_botslab import (
    _bbox_from_vertexs,
    _ha_zone_to_map_area,
    _map_area_to_ha_zone,
    _raise_on_error_no,
    _rect_to_vertexs,
)
from custom_components.botslab_vacuum.coordinator import (
    _normalize_no_go_zone,
    _zone_signature,
)
from custom_components.botslab_vacuum.exceptions import BotslabCommandError


def test_no_go_zone_encodes_robot_schema():
    area = _ha_zone_to_map_area({"type": "forbid", "points": [100, 200, 300, 400]}, 0)

    assert area is not None
    assert area["active"] == "forbid"
    assert area["forbidType"] == "all"
    assert area["vertexs"] == [[100, 200], [100, 400], [300, 400], [300, 200]]
    assert area["name"] == "rect1"
    assert area["tag"] == "tag0"
    assert area["id"] == 0
    assert area["mode"] == "default"


def test_no_mop_zone_uses_forbid_mop():
    area = _ha_zone_to_map_area({"type": "mop", "points": [1, 2, 3, 4]}, 1)

    assert area is not None
    assert (area["active"], area["forbidType"]) == ("forbid", "mop")
    assert area["tag"] == "tag1"


def test_virtual_wall_keeps_two_vertices_and_pads_zeros():
    area = _ha_zone_to_map_area(
        {"type": "line", "vertexs": [[-155, -3154], [-238, -2173]]}, 2
    )

    assert area is not None
    assert area["active"] == "line"
    assert area["vertexs"] == [[-155, -3154], [-238, -2173], [0, 0], [0, 0]]


def test_zone_without_geometry_is_rejected():
    assert _ha_zone_to_map_area({"type": "forbid"}, 0) is None
    assert _ha_zone_to_map_area({"type": "forbid", "points": [1, 2]}, 0) is None


def test_read_path_maps_forbid_all_to_no_go():
    zone = _map_area_to_ha_zone(
        {
            "active": "forbid",
            "forbidType": "all",
            "vertexs": [[10, 20], [10, 40], [30, 40], [30, 20]],
        }
    )

    assert zone is not None
    assert zone["type"] == "forbid"
    assert zone["points"] == [10, 20, 30, 40]


def test_read_path_maps_forbid_mop_to_no_mop():
    zone = _map_area_to_ha_zone(
        {
            "active": "forbid",
            "forbidType": "mop",
            "vertexs": [[0, 0], [0, 10], [10, 10], [10, 0]],
        }
    )

    assert zone is not None
    assert zone["type"] == "mop"


def test_read_path_maps_line_to_virtual_wall():
    zone = _map_area_to_ha_zone(
        {
            "active": "line",
            "forbidType": "all",
            "vertexs": [[-155, -3154], [-238, -2173], [0, 0], [0, 0]],
        }
    )

    assert zone is not None
    assert zone["type"] == "line"
    # Padding vertices are dropped: the wall is a segment, not a polygon to the origin.
    assert zone["vertexs"] == [[-155, -3154], [-238, -2173]]
    assert zone["points"] == [-238, -3154, -155, -2173]


def test_inactive_areas_are_not_surfaced_as_restricted_zones():
    assert _map_area_to_ha_zone({"active": "normal", "vertexs": [[0, 0], [1, 1]]}) is None


def test_cleaning_zone_is_preserved_verbatim_on_write():
    """SetZones replaces the whole area list, so cleaning zones must survive a write."""
    cleaning = _ha_zone_to_map_area(
        {
            "active": "normal",
            "cleanTimes": 2,
            "waterPump": 1,
            "vertexs": [[0, 0], [0, 10], [10, 10], [10, 0]],
        },
        3,
    )

    assert cleaning is not None
    assert cleaning["active"] == "normal"
    assert cleaning["cleanTimes"] == 2
    assert cleaning["waterPump"] == 1


def test_rect_and_bbox_helpers_round_trip():
    assert _rect_to_vertexs([10, 20, 30, 40]) == [
        [10, 20],
        [10, 40],
        [30, 40],
        [30, 20],
    ]
    assert _bbox_from_vertexs([[10, 20], [10, 40], [30, 40], [30, 20]]) == [
        10,
        20,
        30,
        40,
    ]
    assert _rect_to_vertexs([1, 2]) == []
    assert _bbox_from_vertexs([]) is None


def test_robot_rejection_raises_instead_of_reporting_success():
    ok = {"code": 0, "data": {"result": json.dumps({"ErrorNO": 0})}}
    assert _raise_on_error_no(ok, "SetZones")

    rejected = {"code": 0, "data": {"result": json.dumps({"ErrorNO": 3})}}
    with pytest.raises(BotslabCommandError):
        _raise_on_error_no(rejected, "SetZones")

    cloud_error = {"code": 10001, "data": {"errmsg": "Please re-login to the APP"}}
    with pytest.raises(BotslabCommandError):
        _raise_on_error_no(cloud_error, "SetZones")


def test_normalize_accepts_both_models_and_orders_points():
    zone = _normalize_no_go_zone({"type": "mop", "points": [10, 20, 5, 15]}, 0)

    assert zone["type"] == "mop"
    assert zone["forbidType"] == "mop"
    assert zone["points"] == [5, 15, 10, 20]

    from_robot = _normalize_no_go_zone(
        {
            "active": "line",
            "forbidType": "all",
            "vertexs": [[0, 0], [50, 50], [0, 0], [0, 0]],
        },
        0,
    )
    assert from_robot["type"] == "line"
    assert from_robot["active"] == "line"


def test_zone_signature_is_order_independent_and_ignores_names():
    first = _normalize_no_go_zone({"type": "forbid", "points": [0, 0, 10, 10]}, 0)
    renamed = dict(first, name="rect99")
    mop = _normalize_no_go_zone({"type": "mop", "points": [0, 0, 10, 10]}, 0)

    assert _zone_signature([first]) == _zone_signature([renamed])
    assert _zone_signature([first]) != _zone_signature([mop])
    assert _zone_signature([first, mop]) == _zone_signature([mop, first])
    assert _zone_signature([]) == []
