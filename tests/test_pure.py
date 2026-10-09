"""Pure-Python helpers that do not need a running Home Assistant."""
from __future__ import annotations

import json

import pytest

from custom_components.botslab_vacuum import map_util
from custom_components.botslab_vacuum.models import BotslabMapInfo, BotslabRoom
from custom_components.botslab_vacuum.lovelace import (
    build_full_dashboard_snippet,
    build_map_card,
)


# --------------------------------------------------------------- LZ4 + PNG
def test_lz4_roundtrip_is_stable():
    """Decompression is deterministic for the same input."""
    payload = bytes([0, 10, 0, 127, 255, 0, 127, 1, 2, 3])
    first = map_util.decompress_lz4_block(payload, 64)
    second = map_util.decompress_lz4_block(payload, 64)
    assert first == second


def test_render_produces_valid_png():
    """Rendered bytes carry the PNG signature and required chunks."""
    grid = bytes([127]) * (16 * 12)
    png = map_util.render_map_png(16, 12, grid)

    assert png.startswith(b"\x89PNG\r\n\x1a\n")
    for chunk in (b"IHDR", b"IDAT", b"IEND"):
        assert chunk in png


def test_render_with_overlay_changes_pixels():
    """Painting a room overlay alters the output."""
    grid = bytes([127]) * (32 * 24)
    plain = map_util.render_map_png(32, 24, grid)
    overlaid = map_util.render_map_png(
        32, 24, grid, [([(4, 4), (20, 4), (20, 18), (4, 18)], (200, 30, 30))]
    )
    assert plain != overlaid


# -------------------------------------------------------- coordinate maths
def test_robot_to_pixel_maps_origin_to_bottom_left():
    """The map's minimum corner is the image bottom-left."""
    info = BotslabMapInfo(width=100, height=80, x_min=-2.0, y_min=-3.0, resolution=0.05)
    px, py = info.robot_to_pixel(-2000, -3000)
    assert px == pytest.approx(0.0)
    assert py == pytest.approx(80.0)


def test_robot_to_pixel_mirrors_y_axis():
    """Increasing robot Y moves up the image."""
    info = BotslabMapInfo(width=100, height=80, x_min=0.0, y_min=0.0, resolution=0.05)
    low = info.robot_to_pixel(0, 0)[1]
    high = info.robot_to_pixel(0, 1000)[1]
    assert high < low


def test_calibration_points_round_trip():
    """Pixel corners invert back to the robot coordinates."""
    info = BotslabMapInfo(width=100, height=80, x_min=-2.0, y_min=-3.0, resolution=0.05)
    for point in info.calibration_points():
        px, py = point["map"]["x"], point["map"]["y"]
        x_mm = (px * info.resolution + info.x_min) * 1000
        y_mm = ((info.height - py) * info.resolution + info.y_min) * 1000
        assert x_mm == pytest.approx(point["vacuum"]["x"])
        assert y_mm == pytest.approx(point["vacuum"]["y"])


def test_room_centroid_and_bounds():
    """Centroid and bounds are derived from the polygon."""
    outline = ((0, 0), (10, 0), (10, 10), (0, 10))
    room = BotslabRoom(room_id="0", name="Square", outline=outline)
    assert room.centroid == (5, 5)
    assert room.bounds == (0, 0, 10, 10)


def test_room_without_geometry_is_handled():
    """A room lacking an outline yields safe defaults."""
    room = BotslabRoom(room_id="0", name="Empty")
    assert room.centroid == (0, 0)
    assert room.bounds is None


# --------------------------------------------------------- polygon filling
def test_fill_polygon_covers_expected_area():
    """A unit square fills roughly its own pixel count."""
    square = [(10, 10), (20, 10), (20, 20), (10, 20)]
    spans = map_util.fill_polygon(50, 50, square)
    covered = sum(end - start + 1 for row in spans.values() for start, end in row)
    assert 100 <= covered <= 130


@pytest.mark.parametrize("degenerate", [[], [(1, 1)], [(1, 1), (2, 2)]])
def test_fill_polygon_rejects_degenerate_input(degenerate):
    """Too few vertices produce no spans instead of raising."""
    assert map_util.fill_polygon(50, 50, degenerate) == {}


# --------------------------------------------------------- Lovelace output
def _device(room_count: int = 3):
    rooms = [
        BotslabRoom(
            room_id=str(i),
            name=f"Room {i}",
            outline=((0, 0), (100, 0), (100, 100), (0, 100)),
        )
        for i in range(room_count)
    ]
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    return BotslabVacuumDevice(
        product_key="pk",
        device_name="SN12345",
        device_title="Botslab S8",
        rooms=rooms,
    )


def test_generated_card_is_parseable():
    """The emitted card is valid YAML with the expected structure."""
    import yaml

    config = yaml.safe_load(build_map_card(_device()))
    assert config["type"] == "custom:xiaomi-vacuum-map-card"
    assert config["entity"] == "vacuum.SN12345_vacuum"
    assert config["map_source"]["camera"] == "camera.SN12345_map_camera"


def test_generated_card_contains_every_room():
    """One predefined selection per room."""
    import yaml

    config = yaml.safe_load(build_map_card(_device(4)))
    room_mode = next(m for m in config["map_modes"] if m["selection_type"] == "ROOM")
    assert len(room_mode["predefined_selections"]) == 4


def test_generated_card_handles_empty_rooms():
    """A robot without geometry still yields a valid card."""
    import yaml

    config = yaml.safe_load(build_map_card(_device(0)))
    room_mode = next(m for m in config["map_modes"] if m["selection_type"] == "ROOM")
    assert room_mode["predefined_selections"] == []


def test_awkward_room_names_survive():
    """Names with quotes and newlines are quoted safely."""
    import yaml

    device = _device(0)
    device.rooms = [
        BotslabRoom(
            room_id="0",
            name='Mutfak: "sol" #1\n2',
            outline=((0, 0), (10, 0), (10, 10)),
        )
    ]
    config = yaml.safe_load(build_map_card(device))
    selections = next(
        m for m in config["map_modes"] if m["selection_type"] == "ROOM"
    )["predefined_selections"]
    assert selections[0]["label"]["text"] == 'Mutfak: "sol" #1\n2'


def test_snippet_has_two_documents():
    """The full snippet is a map card plus a maintenance card."""
    import yaml

    docs = list(yaml.safe_load_all(build_full_dashboard_snippet(_device())))
    assert [d["type"] for d in docs] == ["custom:xiaomi-vacuum-map-card", "entities"]


# ----------------------------------------------------------------- crypto
def test_des_roundtrip():
    """DES encryption round-trips, including padding boundaries."""
    from custom_components.botslab_vacuum.crypto import des_cbc_decrypt, des_cbc_encrypt

    key = b"12345678"
    for size in (1, 7, 8, 9, 100):
        data = b"x" * size
        assert des_cbc_decrypt(des_cbc_encrypt(data, key, key), key, key) == data


def test_rsa_encrypts_with_real_public_key():
    """The QUC public key produces a full-length ciphertext."""
    from custom_components.botslab_vacuum.const import QUC_RSA_PUBKEY_B64
    from custom_components.botslab_vacuum.crypto import encrypt_key_material, gen_key_material

    blob = encrypt_key_material(gen_key_material(), QUC_RSA_PUBKEY_B64)
    assert len(blob) == 172  # base64 of 128 bytes


def test_signature_is_deterministic():
    """The QUC signature is stable and excludes the sig key itself."""
    from custom_components.botslab_vacuum.crypto import compute_sig

    params = {"a": "1", "b": "2"}
    assert compute_sig(params, "k") == compute_sig(params, "k")
    assert "sig" not in params


def test_login_params_use_md5_password():
    """The password is hashed, never sent in the clear."""
    from custom_components.botslab_vacuum.crypto import md5_hex
    from custom_components.botslab_vacuum.quc_login import build_login_params

    params = build_login_params("user@example.com", "hunter2", "m2")
    assert params["password"] == md5_hex("hunter2")
    assert "hunter2" not in json.dumps(params)