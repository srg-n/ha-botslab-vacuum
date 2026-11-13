"""Data models for the Botslab Vacuum Robot integration."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


def floor_map_name(map_entry: dict[str, Any], seen: set[str] | None = None) -> str:
    """Return the label used for a floor map across the integration.

    The select entity and the vacuum's ``maps`` attribute must expose the exact same
    strings, otherwise the map card sends a ``select_option`` value the entity rejects.
    Duplicate names are disambiguated with the map id.
    """
    name = str(map_entry.get("map_name") or f"Map {map_entry.get('map_id')}")
    if seen is not None and name in seen:
        name = f"{name} ({map_entry.get('map_id')})"
    return name


def floor_map_entries(
    saved_maps: list[dict[str, Any]] | None,
    current_map_id: Any = None,
) -> list[dict[str, Any]]:
    """Return ``{"id", "name"}`` for the floor maps the card and select entity expose.

    When no floor is saved yet the active map is reported with the exact label the
    select entity uses (``Map <id>``); a hard-coded placeholder such as "Current Map"
    would be rejected by ``select.select_option``. Duplicate names are disambiguated
    with the map id.
    """
    seen: set[str] = set()
    entries: list[dict[str, Any]] = []
    for m in saved_maps or []:
        name = floor_map_name(m, seen)
        seen.add(name)
        raw_id = m.get("map_id", 0)
        entries.append(
            {
                "id": int(raw_id) if str(raw_id).isdigit() else raw_id,
                "name": name,
            }
        )
    if entries:
        return entries
    if current_map_id:
        return [
            {
                "id": int(current_map_id) if str(current_map_id).isdigit() else current_map_id,
                "name": f"Map {current_map_id}",
            }
        ]
    return []


@dataclass(slots=True)
class BotslabRoom:
    """Represents a defined room in the vacuum's map.

    ``outline`` holds the room polygon exactly as the cloud reports it, in
    robot coordinates (millimetres, origin at the map's ``x_min``/``y_min``).
    The Lovelace map card uses it to draw the room outline; it is never sent
    back to the vacuum, which only needs ``room_id``.
    """

    room_id: str
    name: str
    order: int = 0
    clean_state: int = 0
    color: str = ""
    outline: tuple[tuple[int, int], ...] = ()
    wind_mode: str = "auto"
    water_pump: int = 0

    @property
    def centroid(self) -> tuple[int, int]:
        """Return the average vertex, used to place the room label and icon."""
        if not self.outline:
            return (0, 0)
        xs = sum(p[0] for p in self.outline)
        ys = sum(p[1] for p in self.outline)
        return (round(xs / len(self.outline)), round(ys / len(self.outline)))

    @property
    def bounds(self) -> tuple[int, int, int, int] | None:
        """Return ``(min_x, min_y, max_x, max_y)`` in robot coordinates."""
        if not self.outline:
            return None
        xs = [p[0] for p in self.outline]
        ys = [p[1] for p in self.outline]
        return (min(xs), min(ys), max(xs), max(ys))


@dataclass(slots=True)
class BotslabConsumableStatus:
    """Consumable lifespans."""
    filter_life_pct: int = 100
    main_brush_life_pct: int = 100
    side_brush_life_pct: int = 100
    sensor_clean_pct: int = 100
    filter_left_hours: float = 150.0
    main_brush_left_hours: float = 300.0
    side_brush_left_hours: float = 200.0
    sensor_left_hours: float = 30.0
    filter_used_hours: float = 0.0
    main_brush_used_hours: float = 0.0
    side_brush_used_hours: float = 0.0
    sensor_used_hours: float = 0.0


@dataclass(slots=True)
class BotslabBaseStation:
    """Telemetry for self-cleaning base station."""
    status: str = "idle"
    clean_water_tank: str = "ok"
    dirty_water_tank: str = "ok"
    dust_bag_status: str = "ok"
    mop_dry_remain_seconds: int = 0


@dataclass(slots=True)
class BotslabMapInfo:
    """Geometry of the decoded cloud map.

    The cloud stores a raster grid (``width`` x ``height`` pixels) plus the
    robot-space origin and pixel size needed to place it. Without those extra
    fields a tap on the rendered image cannot be translated back into a robot
    coordinate, which is why they are carried here rather than discarded.
    """

    width: int
    height: int
    x_min: float = 0.0
    y_min: float = 0.0
    resolution: float = 0.05
    rooms: list[BotslabRoom] = field(default_factory=list)
    cmin: int = 0
    rmin: int = 0
    cmax: int = 0
    rmax: int = 0
    scale: int = 1
    dock_position: tuple[float, float] | None = None
    no_go_zones: list[dict[str, Any]] = field(default_factory=list)
    clean_zones: list[dict[str, Any]] = field(default_factory=list)
    carpets: list[dict[str, Any]] = field(default_factory=list)

    def robot_to_pixel(self, x_mm: float, y_mm: float) -> tuple[float, float]:
        """Convert a robot coordinate (mm) to a pixel on the rendered grid.

        Robot coordinates are millimetres with Y growing north; the raster
        grows downward, so Y is mirrored. When cropping and scaling are active,
        coordinates are offset by the cropped origin and multiplied by scale.
        """
        cx = (x_mm / 1000.0 - self.x_min) / self.resolution
        cy = (y_mm / 1000.0 - self.y_min) / self.resolution
        if self.scale > 1 and self.cmax > self.cmin:
            return ((cx - self.cmin) * self.scale, (self.rmax - cy) * self.scale)
        py = self.height - cy
        return (cx, py)

    def polygon_to_pixels(
        self, outline: tuple[tuple[int, int], ...]
    ) -> list[tuple[float, float]]:
        """Convert a room outline into pixel coordinates for drawing."""
        return [self.robot_to_pixel(x, y) for x, y in outline]

    def calibration_points(self) -> list[dict[str, Any]]:
        """Return map/vacuum corner pairs for dashboard map calibration.

        Three corners are enough for the standard affine transform used by
        Lovelace map cards to map taps back to robot coordinates.
        """
        if self.scale > 1 and self.cmax > self.cmin:
            pts = [
                (self.x_min * 1000.0, self.y_min * 1000.0),
                (self.x_min * 1000.0 + 1000.0, self.y_min * 1000.0),
                (self.x_min * 1000.0, self.y_min * 1000.0 + 1000.0),
            ]
            out = []
            for vx, vy in pts:
                px, py = self.robot_to_pixel(vx, vy)
                out.append({
                    "vacuum": {"x": round(vx), "y": round(vy)},
                    "map": {"x": round(px), "y": round(py)},
                })
            return out

        left_mm = self.x_min * 1000
        bottom_mm = (self.y_min + self.height * self.resolution) * 1000
        top_mm = self.y_min * 1000
        right_mm = (self.x_min + self.width * self.resolution) * 1000
        return [
            {
                "vacuum": {"x": round(left_mm), "y": round(bottom_mm)},
                "map": {"x": 0, "y": 0},
            },
            {
                "vacuum": {"x": round(right_mm), "y": round(bottom_mm)},
                "map": {"x": self.width, "y": 0},
            },
            {
                "vacuum": {"x": round(left_mm), "y": round(top_mm)},
                "map": {"x": 0, "y": self.height},
            },
        ]

    def room_attributes(self) -> list[dict[str, Any]]:
        """Return room outlines in the shape Lovelace map cards expect."""
        attrs: list[dict[str, Any]] = []
        for room in self.rooms:
            if len(room.outline) < 3:
                continue
            cx, cy = room.centroid
            attrs.append(
                {
                    "id": room.room_id,
                    "name": room.name,
                    "outline": [list(p) for p in room.outline],
                    "label": {"text": room.name, "x": cx, "y": cy, "offset_y": 35},
                    "icon": {"name": "mdi:floor-plan", "x": cx, "y": cy},
                }
            )
        return attrs


@dataclass(slots=True)
class BotslabVacuumDevice:
    """Robot vacuum device representation."""
    product_key: str
    device_name: str  # Serial Number (SN)
    device_title: str
    online: bool = True
    category_key: str = "clean"
    model: str = "Botslab S8"
    raw: dict[str, Any] = field(default_factory=dict)
    props: dict[str, Any] = field(default_factory=dict)
    rooms: list[BotslabRoom] = field(default_factory=list)
    consumables: BotslabConsumableStatus = field(default_factory=BotslabConsumableStatus)
    battery_level: int = 100
    cleaning_time_minutes: int = 0
    cleaned_area_sqm: float = 0.0
    status: str = "docked"
    fan_speed: str = "standard"
    mop_installed: bool | None = None
    water_tank_installed: bool = True
    water_level: int = 1
    mop_mode: str = "vacuum_and_mop"
    auto_boost: bool = True
    button_backlight: bool = True
    collision_protection: bool = False
    volume_level: int = 80
    current_map_id: str = ""
    clean_id: str = ""
    error_code: int = 0
    total_cleaning_area_sqm: float = 0.0
    total_cleaning_time_minutes: int = 0
    tasks_total_count: int = 0
    clean_sub_status: str | None = None
    current_location: list[int] | None = None
    dock_position: tuple[float, float] | None = None
    no_go_zones: list[dict[str, Any]] = field(default_factory=list)
    clean_zones: list[dict[str, Any]] = field(default_factory=list)
    cleaning_path: list[list[int]] = field(default_factory=list)
    robot_pose: list[float] | None = None
    map_image_bytes: bytes | None = None
    map_info: BotslabMapInfo | None = None
    has_base_station: bool = False
    has_dust_collection: bool = False
    has_mop_wash: bool = False
    has_mop_drying: bool = False
    has_child_lock: bool = False
    has_carpet_mode: bool = False
    has_multi_map: bool = False
    has_dnd: bool = True
    base_station: BotslabBaseStation = field(default_factory=BotslabBaseStation)
    child_lock: bool = False
    dnd_enabled: bool = False
    dnd_start: str = "22:00"
    dnd_end: str = "08:00"
    carpet_mode: int = 0
    saved_maps: list[dict[str, Any]] = field(default_factory=list)
    saved_carpets: list[dict[str, Any]] = field(default_factory=list)
    ip_address: str = ""

    @property
    def unique_id(self) -> str:
        """Unique ID for HA entity registry."""
        return self.device_name
