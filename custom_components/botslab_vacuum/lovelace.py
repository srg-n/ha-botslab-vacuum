"""Lovelace map card configuration generator.

Dashboard map cards need the robot's room outlines spelled out as
``predefined_selections``. Those outlines come from the cloud map payload and
change whenever rooms are renamed or the floor plan is edited, so writing them
by hand goes stale.

This module renders a ready-to-paste card using live geometry. The generated
YAML embeds concrete entity ids, which the caller resolves from the entity
registry: an entity id cannot be derived from a unique id, because Home
Assistant builds it from the entity and device names instead.
"""
from __future__ import annotations

from collections.abc import Mapping
import json
from typing import Any

from .models import BotslabVacuumDevice

# Minimum vertices for a polygon to be drawable.
MIN_OUTLINE_VERTICES = 3

# Rows of the maintenance card, as
# ``(key, platform, unique id suffix, label)``. The platform and unique id
# suffix are what the entity registry is queried with, so this table is the
# one place that knows which entity backs which setting.
MAINTENANCE_ROWS: tuple[tuple[str, str, str, str], ...] = (
    ("filter_life", "sensor", "filter_life", "HEPA Filter"),
    ("main_brush_life", "sensor", "main_brush_life", "Main Brush"),
    ("side_brush_life", "sensor", "side_brush_life", "Side Brush"),
    ("sensor_dirtiness", "sensor", "sensor_dirtiness", "Sensors Cleanliness"),
    ("water_level", "select", "water_level", "Water Flow Level"),
    ("mop_mode", "select", "mop_mode", "Cleaning Mode"),
    ("volume_level", "number", "volume_level", "Voice Volume"),
    ("auto_boost", "switch", "auto_boost", "Carpet Auto Boost"),
    ("button_backlight", "switch", "button_backlight", "Button Backlight"),
    ("collision_protection", "switch", "collision_protection", "Collision Protection"),
    ("locate", "button", "locate", "Locate Robot"),
    ("sync_map", "button", "sync_map", "Sync Map"),
    ("refresh_rooms", "button", "refresh_rooms", "Refresh Rooms"),
)


def _yaml_str(value: str) -> str:
    """Quote a string safely for YAML, using JSON string syntax."""
    return json.dumps(str(value), ensure_ascii=False)


def _flow_list(values: list[Any]) -> str:
    """Render a list inline, e.g. ``[-350, -2050]``."""
    return json.dumps(values, ensure_ascii=False)


def _drawable_rooms(device: BotslabVacuumDevice) -> list[Any]:
    """Return rooms that have enough geometry to be drawn on the map."""
    return [r for r in device.rooms if len(r.outline) >= MIN_OUTLINE_VERTICES]


def build_predefined_selections(device: BotslabVacuumDevice, indent: str = "      ") -> str:
    """Render the ``predefined_selections`` block for a robot's rooms.

    Outline and label coordinates are robot-space millimetres. Dashboard map
    cards only use them to draw the room shape; the vacuum is always addressed
    by room id, so these values never leave the dashboard.
    """
    rooms = _drawable_rooms(device)
    if not rooms:
        return ""

    lines: list[str] = []
    for room in rooms:
        cx, cy = room.centroid
        lines.append(f"{indent}- id: {_yaml_str(room.room_id)}")
        lines.append(f"{indent}  label:")
        lines.append(f"{indent}    text: {_yaml_str(room.name)}")
        lines.append(f"{indent}    x: {cx}")
        lines.append(f"{indent}    y: {cy}")
        lines.append(f"{indent}    offset_y: 35")
        lines.append(f"{indent}  icon:")
        lines.append(f"{indent}    name: {_yaml_str('mdi:floor-plan')}")
        lines.append(f"{indent}    x: {cx}")
        lines.append(f"{indent}    y: {cy}")
        lines.append(f"{indent}  outline:")
        for point in room.outline:
            lines.append(f"{indent}    - {_flow_list(list(point))}")
    return "\n".join(lines)


def build_map_card(device: BotslabVacuumDevice, entity_ids: Mapping[str, str]) -> str:
    """Return a complete xiaomi-vacuum-map-card configuration for one robot.

    The map camera publishes ``calibration_points`` and ``rooms`` as
    attributes, so calibration needs no manual configuration.

    ``entity_ids`` must contain the real ``vacuum`` and ``camera`` entity ids.
    They are looked up by the caller because Home Assistant derives an entity
    id from the entity and device names, not from the unique id, so guessing it
    from the serial number produces a card that points at nothing.
    """
    vacuum_id = entity_ids["vacuum"]
    camera_id = entity_ids["camera"]
    room_count = len(_drawable_rooms(device))

    selections = build_predefined_selections(device)
    predefined_block = f"\n{selections}" if selections else ""

    return f"""# Botslab Vacuum map card - generated configuration
#
# Generated from the robot's own map, so room outlines and labels match your
# floor plan. Rooms change whenever you edit them in the Botslab app: press
# "Sync Map" then "Generate Map Card Config" to refresh this file.
#
# 1. Home Assistant -> Settings -> Dashboards -> edit -> paste this YAML.
# 2. Requires the "xiaomi-vacuum-map-card" frontend card to be installed.
#
# Rooms included: {room_count}

type: custom:xiaomi-vacuum-map-card
title: Botslab Map
entity: {vacuum_id}
map_source:
  camera: {camera_id}
calibration_source:
  camera: true

map_modes:
  # Clean whole rooms. The card sends room ids, not coordinates.
  - name: Room Cleaning
    icon: mdi:floor-plan
    selection_type: ROOM
    max_selections: 60
    repeats_type: EXTERNAL
    max_repeats: 3
    service_call_schema:
      service: botslab_vacuum.clean_rooms
      service_data:
        room_ids: "[[selection]]"
        repeat_times: "[[repeats]]"
        entity_id: "[[entity_id]]"
    predefined_selections:{predefined_block if predefined_block else " []"}

  # Draw rectangles on the map and clean them.
  - name: Zone Cleaning
    icon: mdi:select-drag
    selection_type: MANUAL_RECTANGLE
    max_selections: 5
    repeats_type: EXTERNAL
    max_repeats: 3
    service_call_schema:
      service: botslab_vacuum.clean_zone
      service_data:
        zones: "[[selection]]"
        repeat_times: "[[repeats]]"
        entity_id: "[[entity_id]]"

  # Send the robot to a tapped point.
  - name: Go To Point
    icon: mdi:map-marker-plus
    selection_type: MANUAL_POINT
    max_selections: 1
    repeats_type: NONE
    max_repeats: 1
    service_call_schema:
      service: botslab_vacuum.goto_location
      service_data:
        x: "[[point_x]]"
        y: "[[point_y]]"
        entity_id: "[[entity_id]]"
"""


def build_maintenance_card(
    device: BotslabVacuumDevice, entity_ids: Mapping[str, str]
) -> str:
    """Return a plain entities card with this robot's settings.

    Rows whose entity is not registered are left out, which happens for
    example when the map is disabled and the camera entity was never created.
    """
    lines = [
        "type: entities",
        f"title: {device.device_title}",
        "show_header_toggle: false",
        "entities:",
    ]
    for key, _platform, _unique_suffix, label in MAINTENANCE_ROWS:
        entity_id = entity_ids.get(key)
        if not entity_id:
            continue
        lines.append(f"  - entity: {entity_id}")
        lines.append(f"    name: {_yaml_str(label)}")
    return "\n".join(lines)


def build_full_dashboard_snippet(
    device: BotslabVacuumDevice, entity_ids: Mapping[str, str]
) -> str:
    """Return both cards with a document separator between them."""
    return (
        f"{build_map_card(device, entity_ids)}\n---\n"
        f"{build_maintenance_card(device, entity_ids)}\n"
    )