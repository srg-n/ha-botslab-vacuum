"""Pure-Python LZ4 block decompressor and PNG map renderer for Botslab vacuums.

Features:
  - Pure-Python LZ4 block decompressor (safe bounded copy, zero native deps).
  - Pure-Python scanline polygon filler and raw PNG encoder (fallback).
  - High-resolution cropped rendering with Pillow:
      * Auto-crop (removes empty background margins).
      * Nearest-neighbor crisp scaling.
      * Translucent room color fills, boundary outlines, and room labels.
      * Red translucent forbidden / no-go zone overlays.
      * Charging dock station glyph.
      * Live robot circle marker + directional heading arrow.
      * Live cleaning trail / trajectory path.
  - Room polygon decomposition into axis-aligned rectangles (room_cover_rects)
    as a robust fallback clean strategy.
"""
from __future__ import annotations

import base64
import io
import math
import struct
import zlib
from typing import Any

# Color Palette (RGB / RGBA) - Modern sleek transparent dark-mode palette
C_UNKNOWN = (0, 0, 0, 0)
C_FLOOR = (24, 26, 30, 140)
C_WALL = (75, 90, 120, 255)
C_NOGO_FILL = (235, 60, 60, 90)
C_NOGO_LINE = (235, 60, 60, 230)
C_ZONE_FILL = (41, 140, 255, 60)
C_ZONE_LINE = (41, 140, 255, 220)
C_DOCK = (46, 196, 110, 255)
C_ROBOT = (255, 140, 0, 255)
C_PATH = (255, 255, 255, 240)

ROOM_PALETTE: list[tuple[int, int, int]] = [
    (255, 150, 85),   # Living room warm orange
    (90, 200, 250),   # Sky blue / cyan
    (245, 185, 65),   # Warm golden yellow
    (122, 156, 214),  # Soft slate blue
    (180, 130, 200),  # Mauve / purple
    (235, 105, 95),   # Coral red
    (95, 215, 140),   # Mint green
    (91, 147, 230),   # Royal blue
    (230, 135, 175),  # Rose
    (150, 200, 214),  # Aqua
]


def decompress_lz4_block(src: bytes, uncompressed_size: int) -> bytes:
    """Decompress raw LZ4 block into bytes.

    Returns at most ``uncompressed_size`` bytes. Cloud payloads are
    untrusted input, so output is clamped at every copy step and a malformed
    offset terminates the block instead of raising: a bad map should render as
    a partial or blank camera frame, never take the entity down.
    """
    dst = bytearray()
    src_len = len(src)
    ip = 0
    while ip < src_len and len(dst) < uncompressed_size:
        token = src[ip]
        ip += 1
        lit_len = token >> 4
        if lit_len == 15:
            while ip < src_len:
                s = src[ip]
                ip += 1
                lit_len += s
                if s != 255:
                    break
        lit_len = min(lit_len, uncompressed_size - len(dst))
        dst.extend(src[ip : ip + lit_len])
        ip += lit_len
        if len(dst) >= uncompressed_size or ip + 1 >= src_len:
            break
        offset = src[ip] | (src[ip + 1] << 8)
        ip += 2
        match_len = (token & 0x0F) + 4
        if (token & 0x0F) == 15:
            while ip < src_len:
                s = src[ip]
                ip += 1
                match_len += s
                if s != 255:
                    break
        match_pos = len(dst) - offset
        if not 0 <= match_pos < len(dst):
            break
        match_len = min(match_len, uncompressed_size - len(dst))
        for _ in range(match_len):
            dst.append(dst[match_pos])
            match_pos += 1
    return bytes(dst)


# ---------------------------------------------------------------------------
# Room Polygon Decomposition (room_cover_rects fallback)
# ---------------------------------------------------------------------------

def _rasterize_poly(poly: list[list[float]] | list[tuple[float, float]], cell: int):
    """Rasterize a polygon (mm) to a boolean occupancy grid of `cell`-mm cells."""
    xs = [p[0] for p in poly]
    ys = [p[1] for p in poly]
    x0, y0, x1, y1 = min(xs), min(ys), max(xs), max(ys)
    w = max(1, int((x1 - x0) // cell) + 1)
    h = max(1, int((y1 - y0) // cell) + 1)
    n = len(poly)
    grid = [[False] * w for _ in range(h)]
    for r in range(h):
        cy = y0 + (r + 0.5) * cell
        xc: list[float] = []
        for i in range(n):
            ax, ay = poly[i]
            bx, by = poly[(i + 1) % n]
            if (ay <= cy < by) or (by <= cy < ay):
                xc.append(ax + (bx - ax) * (cy - ay) / (by - ay))
        xc.sort()
        for k in range(0, len(xc) - 1, 2):
            ca = max(0, int((xc[k] - x0) // cell))
            cb = min(w - 1, int((xc[k + 1] - x0) // cell))
            for c in range(ca, cb + 1):
                grid[r][c] = True
    return grid, x0, y0, w, h


def _largest_rect(grid: list[list[bool]], used: list[list[bool]], w: int, h: int):
    """Find largest all-free axis-aligned rectangle via histogram stack."""
    best = (0, 0, 0, 0, 0)  # area, r0, c0, r1, c1
    heights = [0] * w
    for r in range(h):
        for c in range(w):
            heights[c] = heights[c] + 1 if (grid[r][c] and not used[r][c]) else 0
        stack: list[tuple[int, int]] = []
        for c in range(w + 1):
            cur = heights[c] if c < w else 0
            start = c
            while stack and stack[-1][1] > cur:
                sc, sh = stack.pop()
                area = sh * (c - sc)
                if area > best[0]:
                    best = (area, r - sh + 1, sc, r, c - 1)
                start = sc
            stack.append((start, cur))
    return best


def room_cover_rects(
    poly: list[list[float]] | list[tuple[float, float]],
    cell: int = 100,
    max_rects: int = 10,
    min_cov: float = 0.93,
) -> list[list[int]]:
    """Cover a room polygon with axis-aligned bounding rectangles.

    Useful fallback clean strategy for firmware/models where native
    StartCleanInAreas is unavailable. Returns ``[[x1, y1, x2, y2], ...]`` (mm).
    """
    if len(poly) < 3:
        return []
    grid, x0, y0, w, h = _rasterize_poly(poly, cell)
    total = sum(row.count(True) for row in grid)
    if not total:
        return []
    used = [[False] * w for _ in range(h)]
    rects: list[list[int]] = []
    covered = 0
    for _ in range(max_rects):
        area, r0, c0, r1, c1 = _largest_rect(grid, used, w, h)
        if area <= 0:
            break
        for r in range(r0, r1 + 1):
            for c in range(c0, c1 + 1):
                used[r][c] = True
        covered += area
        rects.append([
            int(x0 + c0 * cell), int(y0 + r0 * cell),
            int(x0 + (c1 + 1) * cell), int(y0 + (r1 + 1) * cell),
        ])
        if covered / total >= min_cov:
            break
    return rects


# ---------------------------------------------------------------------------
# Pure-Python Scanline Renderer (fallback if Pillow is unavailable)
# ---------------------------------------------------------------------------

def fill_polygon(
    width: int,
    height: int,
    polygon: list[tuple[float, float]],
) -> dict[int, list[tuple[int, int]]]:
    """Scanline-fill a polygon, returning per-row ``(x_start, x_end)`` spans."""
    if len(polygon) < 3:
        return {}

    y_min = max(0, int(min(p[1] for p in polygon)))
    y_max = min(height - 1, int(max(p[1] for p in polygon)))
    spans: dict[int, list[tuple[int, int]]] = {}
    n = len(polygon)

    for y in range(y_min, y_max + 1):
        scan = y + 0.5
        crossings: list[float] = []
        for i in range(n):
            x1, y1 = polygon[i]
            x2, y2 = polygon[(i + 1) % n]
            if (y1 <= scan < y2) or (y2 <= scan < y1):
                t = (scan - y1) / (y2 - y1)
                crossings.append(x1 + t * (x2 - x1))
        if len(crossings) < 2:
            continue
        crossings.sort()
        for i in range(0, len(crossings) - 1, 2):
            start = max(0, int(round(crossings[i])))
            end = min(width - 1, int(round(crossings[i + 1])))
            if end >= start:
                spans.setdefault(y, []).append((start, end))
    return spans


def render_map_png(
    width: int,
    height: int,
    pixels: bytes,
    room_polygons: list[tuple[list[tuple[float, float]], tuple[int, int, int]]] | None = None,
) -> bytes:
    """Render 2D grid pixels into PNG bytes with dark theme styling (pure Python)."""
    overlay: dict[int, dict[int, tuple[int, int, int]]] = {}
    for polygon, color in room_polygons or []:
        for y, spans in fill_polygon(width, height, polygon).items():
            row = overlay.setdefault(y, {})
            for start, end in spans:
                for x in range(start, end + 1):
                    row[x] = color

    raw_rows = bytearray()
    for y in range(height):
        raw_rows.append(0)  # Filter type: None
        row_y = height - 1 - y
        row_overlay = overlay.get(y, {})
        base = row_y * width
        for x in range(width):
            if (color := row_overlay.get(x)) is not None:
                raw_rows.extend((color[0], color[1], color[2], 255))
                continue
            val = pixels[base + x]
            if val == 0:  # Wall / Obstacle
                raw_rows.extend((75, 90, 120, 255))
            elif val == 127:  # Floor
                raw_rows.extend((24, 26, 30, 140))
            else:  # Unexplored background - fully transparent
                raw_rows.extend((0, 0, 0, 0))

    compressed_idat = zlib.compress(bytes(raw_rows), 6)

    def chunk(tag: bytes, data: bytes) -> bytes:
        return (
            struct.pack(">I", len(data))
            + tag
            + data
            + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
        )

    header = b"\x89PNG\r\n\x1a\n"
    ihdr = chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    idat = chunk(b"IDAT", compressed_idat)
    iend = chunk(b"IEND", b"")
    return header + ihdr + idat + iend


# ---------------------------------------------------------------------------
# Pillow High-Resolution Crop & Overlay Renderer
# ---------------------------------------------------------------------------

def _heading_rad(angle_raw: float) -> float:
    """Convert device angle (degrees CCW) to screen radians (Y down)."""
    return -math.radians(angle_raw)


def render_map_advanced(
    width: int,
    height: int,
    pixels: bytes,
    resolution: float,
    x_min: float,
    y_min: float,
    rooms: list[Any] | None = None,
    no_go_zones: list[dict[str, Any]] | None = None,
    clean_zones: list[dict[str, Any]] | None = None,
    dock_pos: tuple[float, float] | None = None,
    robot_pose: list[float] | tuple[float, ...] | None = None,
    cleaning_path: list[list[int]] | None = None,
    scale: int = 4,
    margin_cells: int = 4,
    draw_robot: bool = False,
) -> tuple[bytes, tuple[int, int, int, int, int]]:
    """Render high-resolution map with Pillow.

    Returns:
      ``(png_bytes, (cmin, cmax, rmin, rmax, scale))``
    """
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        # Fallback to pure-Python render
        fallback_bytes = render_map_png(width, height, pixels)
        return fallback_bytes, (0, width - 1, 0, height - 1, 1)

    # 1. Base occupancy grid image (flip Y for Cartesian world coordinates)
    lflip = Image.frombytes("L", (width, height), pixels).transpose(Image.FLIP_TOP_BOTTOM)

    # 2. Determine non-empty content bounding box (127=floor, 0=wall, 255=unknown)
    # Mask content where value is floor (127) or obstacle (0)
    alpha = lflip.point(lambda v: 255 if v in (0, 127) else 0)
    bbox = alpha.getbbox()
    if bbox is None:
        bbox = (0, 0, width, height)

    left, upper, right, lower = bbox
    left = max(0, left - margin_cells)
    upper = max(0, upper - margin_cells)
    right = min(width, right + margin_cells)
    lower = min(height, lower + margin_cells)

    # Grid bounding box in cell coordinates (bottom-origin)
    cmin = left
    cmax = max(left, right - 1)
    rmin = max(0, height - lower)
    rmax = max(rmin, height - 1 - upper)

    # 3. Colorize base image with RGBA lookup tables (transparent background)
    lut_r = bytearray(256)
    lut_g = bytearray(256)
    lut_b = bytearray(256)
    lut_a = bytearray(256)

    # Set background default (all unknown/empty space is fully transparent)
    for i in range(256):
        lut_r[i], lut_g[i], lut_b[i], lut_a[i] = C_UNKNOWN

    # Floor (127) - modern slate with soft opacity
    lut_r[127], lut_g[127], lut_b[127], lut_a[127] = C_FLOOR
    # Wall / Obstacle (0) - crisp modern obstacle/wall line
    lut_r[0], lut_g[0], lut_b[0], lut_a[0] = C_WALL

    rgba = Image.merge("RGBA", (
        lflip.point(bytes(lut_r)),
        lflip.point(bytes(lut_g)),
        lflip.point(bytes(lut_b)),
        lflip.point(bytes(lut_a)),
    ))

    # Crop and scale
    crop = rgba.crop((left, upper, right, lower))
    crop_w = max(1, (right - left) * scale)
    crop_h = max(1, (lower - upper) * scale)
    base_img = crop.resize((crop_w, crop_h), Image.NEAREST)
    draw = ImageDraw.Draw(base_img, "RGBA")

    # Helper coordinate transform: world (mm) -> cropped pixel (x, y)
    def w2p(wx_mm: float, wy_mm: float) -> tuple[float, float]:
        cx = (wx_mm / 1000.0 - x_min) / resolution
        cy = (wy_mm / 1000.0 - y_min) / resolution
        return ((cx - cmin) * scale, (rmax - cy) * scale)

    # 4. Draw Room Polygons
    for idx, r in enumerate(rooms or []):
        v = getattr(r, "outline", None) or r.get("vertexs") or []
        if len(v) < 3:
            continue
        poly = [w2p(pt[0], pt[1]) for pt in v]
        col = ROOM_PALETTE[idx % len(ROOM_PALETTE)]
        draw.polygon(poly, fill=(col[0], col[1], col[2], 180))
        draw.line(poly + [poly[0]], fill=(col[0], col[1], col[2], 255), width=max(1, scale // 2))

    # 5. Draw Active Cleaning Zones (Area Clean)
    for zone in clean_zones or []:
        v = zone.get("vertexs") or zone.get("points") or []
        if len(v) >= 3:
            poly = [w2p(pt[0], pt[1]) for pt in v]
            draw.polygon(poly, fill=C_ZONE_FILL)
            draw.line(poly + [poly[0]], fill=C_ZONE_LINE, width=max(1, scale // 2))

    # 6. Draw No-Go Zones (Forbidden Areas)
    for zone in no_go_zones or []:
        v = zone.get("vertexs") or zone.get("points") or []
        if len(v) >= 3:
            poly = [w2p(pt[0], pt[1]) for pt in v]
            draw.polygon(poly, fill=C_NOGO_FILL)
            draw.line(poly + [poly[0]], fill=C_NOGO_LINE, width=max(1, scale // 2))

    # 7. Draw Charging Dock Station
    if dock_pos and len(dock_pos) >= 2:
        dx, dy = w2p(dock_pos[0], dock_pos[1])
        s = max(6, scale * 2)
        draw.rectangle([dx - s, dy - s * 0.7, dx + s, dy + s * 0.7],
                       fill=C_DOCK, outline=(255, 255, 255, 255), width=2)
        draw.polygon([(dx - s, dy - s * 0.7), (dx, dy - s * 1.4), (dx + s, dy - s * 0.7)],
                     fill=C_DOCK, outline=(255, 255, 255, 255))

    # 7. Draw Live Cleaning Trajectory / Path
    if cleaning_path and len(cleaning_path) >= 2:
        path_pts = [w2p(p[0], p[1]) for p in cleaning_path if len(p) >= 2]
        if len(path_pts) >= 2:
            draw.line(path_pts, fill=C_PATH, width=max(2, scale // 2), joint="curve")

    # 8. Draw Live Robot Position & Directional Arrow (optional, disabled by default to let card render vector marker)
    if draw_robot and robot_pose and len(robot_pose) >= 2:
        rx, ry = float(robot_pose[0]), float(robot_pose[1])
        ang = float(robot_pose[2]) if len(robot_pose) >= 3 else 0.0
        rcx, rcy = w2p(rx, ry)
        r = max(7, int(scale * 2.2))
        hr = _heading_rad(ang)
        tip = (rcx + math.cos(hr) * r * 1.8, rcy + math.sin(hr) * r * 1.8)
        base_l = (rcx + math.cos(hr + 2.5) * r, rcy + math.sin(hr + 2.5) * r)
        base_r = (rcx + math.cos(hr - 2.5) * r, rcy + math.sin(hr - 2.5) * r)
        draw.polygon([tip, base_l, base_r], fill=(255, 255, 255, 230))
        draw.ellipse([rcx - r, rcy - r, rcx + r, rcy + r],
                     fill=C_ROBOT, outline=(255, 255, 255, 255), width=max(2, scale // 3))

    buf = io.BytesIO()
    base_img.save(buf, format="PNG")
    return buf.getvalue(), (cmin, cmax, rmin, rmax, scale)


def decode_and_render_map(map_json: dict[str, Any]) -> bytes | None:
    """Decode Botslab map JSON and return PNG bytes."""
    try:
        w = map_json.get("width")
        h = map_json.get("height")
        b64_map = map_json.get("map")
        if not w or not h or not b64_map:
            return None
        compressed = base64.b64decode(b64_map)
        raw = decompress_lz4_block(compressed, w * h)
        if len(raw) != w * h:
            return None
        res, _ = render_map_advanced(
            width=w,
            height=h,
            pixels=raw,
            resolution=float(map_json.get("resolution") or 0.05),
            x_min=float(map_json.get("x_min") or 0.0),
            y_min=float(map_json.get("y_min") or 0.0),
        )
        return res
    except Exception:
        return None
