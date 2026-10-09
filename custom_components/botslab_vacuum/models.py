"""Data models for the Botslab Vacuum Robot integration."""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


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
    filter_used_hours: float = 0.0
    main_brush_used_hours: float = 0.0
    side_brush_used_hours: float = 0.0
    sensor_used_hours: float = 0.0


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

    def robot_to_pixel(self, x_mm: float, y_mm: float) -> tuple[float, float]:
        """Convert a robot coordinate (mm) to a pixel on the rendered grid.

        Robot coordinates are millimetres with Y growing north; the raster
        grows downward, so Y is mirrored.
        """
        px = (x_mm / 1000.0 - self.x_min) / self.resolution
        py = self.height - (y_mm / 1000.0 - self.y_min) / self.resolution
        return (px, py)

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
    mop_installed: bool = False
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
    map_image_bytes: bytes | None = None
    map_info: BotslabMapInfo | None = None

    @property
    def unique_id(self) -> str:
        """Unique ID for HA entity registry."""
        return self.device_name
