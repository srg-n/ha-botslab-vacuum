"""Pure-Python LZ4 block decompressor and PNG map renderer for Botslab vacuums.

Zero external dependencies required (no Pillow, no C extensions).
"""
from __future__ import annotations

import base64
import struct
import zlib


def decompress_lz4_block(src: bytes, uncompressed_size: int) -> bytes:
    """Decompress raw LZ4 block into bytes."""
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
        dst.extend(src[ip : ip + lit_len])
        ip += lit_len
        if len(dst) >= uncompressed_size or ip >= src_len:
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
        for _ in range(match_len):
            dst.append(dst[match_pos])
            match_pos += 1
    return bytes(dst)


def fill_polygon(
    width: int,
    height: int,
    polygon: list[tuple[float, float]],
) -> dict[int, list[tuple[int, int]]]:
    """Scanline-fill a polygon, returning per-row ``(x_start, x_end)`` spans.

    Pure Python on purpose: the integration ships no compiled dependencies.
    Returning spans instead of a full RGBA buffer keeps memory flat, since a
    room can easily have a hundred vertices on a large floor plan.

    ``polygon`` must already be in rendered-image pixel space, with Y growing
    downward (see ``BotslabMapInfo.robot_to_pixel``).
    """
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
            # Half-open comparison avoids double-counting shared vertices.
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
    """Render 2D grid pixels into PNG bytes with dark theme styling.

    ``room_polygons`` is a list of ``(polygon_in_pixel_space, (r, g, b))``
    painted over the grid. Polygons are supplied in rendered-image space so
    the caller owns the robot-to-pixel transform.
    """
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
        row_y = height - 1 - y  # Flip Y coordinates for Cartesian display
        row_overlay = overlay.get(y, {})
        base = row_y * width
        for x in range(width):
            if (color := row_overlay.get(x)) is not None:
                raw_rows.extend((color[0], color[1], color[2], 255))
                continue
            val = pixels[base + x]
            if val == 0:  # Wall / Obstacle
                raw_rows.extend((235, 235, 240, 255))
            elif val == 127:  # Cleaned / Traversed floor space
                raw_rows.extend((50, 85, 130, 255))
            else:  # Unexplored background
                raw_rows.extend((18, 20, 26, 255))

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


def decode_and_render_map(map_json: dict) -> bytes | None:
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
        return render_map_png(w, h, raw)
    except Exception:
        return None
