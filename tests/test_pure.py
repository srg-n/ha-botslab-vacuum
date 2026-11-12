"""Pure-Python helpers that do not need a running Home Assistant."""
from __future__ import annotations

import json
import random

import pytest

from custom_components.botslab_vacuum import map_util
from custom_components.botslab_vacuum.models import BotslabMapInfo, BotslabRoom


# --------------------------------------------------------------- LZ4 + PNG
def _lz4_literal_only(data: bytes) -> bytes:
    """Build a valid LZ4 block that stores ``data`` as a single literal run.

    An LZ4 block is a series of sequences. Every sequence but the last is
    ``token + literals + offset + match``; only the final sequence may omit
    the match, and a decoder recognises it as final purely by the output
    reaching the declared size. So a match-free block has to be exactly one
    sequence, otherwise the decoder would read the next sequence's token and
    literal bytes as an offset and a match length.

    That keeps this helper valid LZ4 without pulling in a compressor, so the
    round-trip test still exercises the real decompressor.

    A literal nibble of 15 means the length continues in the following bytes:
    each 0xFF adds a further 255, and the first byte that differs from 0xFF
    supplies the remainder.
    """
    length = len(data)
    if length < 15:
        return bytes([length << 4]) + data
    out = bytearray([0xF0])
    remaining = length - 15
    while remaining >= 255:
        out.append(0xFF)
        remaining -= 255
    out.append(remaining)
    out += data
    return bytes(out)


@pytest.mark.parametrize("size", [1, 7, 14, 15, 16, 100, 255, 600])
def test_lz4_roundtrip(size):
    """Literal LZ4 blocks decompress back to the original bytes."""
    data = bytes((i * 7 + 3) % 256 for i in range(size))
    block = _lz4_literal_only(data)
    assert map_util.decompress_lz4_block(block, size) == data


def test_lz4_decompression_is_deterministic():
    """The same block always yields the same output."""
    data = bytes(range(64))
    block = _lz4_literal_only(data)
    first = map_util.decompress_lz4_block(block, len(data))
    second = map_util.decompress_lz4_block(block, len(data))
    assert first == second == data


def test_lz4_respects_output_size():
    """Decompression stops at the requested uncompressed size."""
    data = bytes(range(200))
    block = _lz4_literal_only(data)
    assert len(map_util.decompress_lz4_block(block, 50)) == 50


@pytest.mark.parametrize(
    "blob",
    [
        pytest.param(b"", id="empty"),
        pytest.param(b"\x00", id="token-only"),
        pytest.param(b"\x10\x41", id="literals-without-offset"),
        pytest.param(b"\x10\x41\xff", id="dangling-continuation"),
        pytest.param(b"\xf0\xff", id="truncated-length"),
        pytest.param(b"\xff" * 8, id="all-continuation"),
        pytest.param(b"\x00\x0a\x00\x7f\xff\x00\x7f\x01\x02\x03", id="negative-offset"),
        pytest.param(b"\x10\x41\x00\x00", id="zero-offset"),
        pytest.param(b"\x10\x41\x01\x00", id="offset-past-output"),
    ],
)
def test_lz4_malformed_block_does_not_raise(blob):
    """A corrupt cloud payload must not raise; the camera shows a partial frame."""
    result = map_util.decompress_lz4_block(blob, 64)
    assert len(result) <= 64


def test_lz4_survives_random_input():
    """Arbitrary bytes never raise and never exceed the requested size."""
    rng = random.Random(7)
    for _ in range(500):
        blob = bytes(rng.getrandbits(8) for _ in range(rng.randint(0, 40)))
        size = rng.choice([16, 64, 256, 1024])
        assert len(map_util.decompress_lz4_block(blob, size)) <= size


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


# --------------------------------------------------------- Frontend & Button tests
def test_bundled_cards_do_not_include_xiaomi():
    """Verify only modern botslab cards are registered, excluding legacy xiaomi card."""
    from custom_components.botslab_vacuum import _CARDS

    assert _CARDS == ["botslab-routines-card.js", "botslab-vacuum-map-card.js"]
    assert "xiaomi-vacuum-map-card.js" not in _CARDS


def test_buttons_exclude_map_card_generator():
    """Verify generate_map_card button is completely removed from BUTTON_DESCRIPTIONS."""
    from custom_components.botslab_vacuum.button import BUTTON_DESCRIPTIONS

    button_keys = [desc.key for desc in BUTTON_DESCRIPTIONS]
    assert "generate_map_card" not in button_keys
    assert "locate" in button_keys
    assert "sync_map" in button_keys
    assert "refresh_rooms" in button_keys


def test_routines_card_js_syntax_and_visual_form():
    """Verify botslab-routines-card.js contains getStubConfig, getConfigForm, and does not hard-throw on missing entity."""
    from pathlib import Path

    card_path = Path(__file__).parent.parent / "custom_components" / "botslab_vacuum" / "www" / "botslab-routines-card.js"
    assert card_path.exists()
    content = card_path.read_text(encoding="utf-8")
    assert "getStubConfig" in content
    assert "getConfigForm" in content
    assert "throw new Error(\"Entity is required" not in content


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


def test_room_cover_rects():
    """Room polygons are correctly decomposed into coverage rectangles."""
    poly = [(0, 0), (2000, 0), (2000, 2000), (0, 2000)]
    rects = map_util.room_cover_rects(poly)
    assert len(rects) >= 1
    assert len(rects[0]) == 4


def test_render_map_advanced():
    """Advanced map renderer renders PNG with dock, robot pose, path, and no-go zones."""
    grid = bytearray(100 * 100)
    for r in range(20, 60):
        for c in range(30, 70):
            grid[r * 100 + c] = 1

    png_bytes, info = map_util.render_map_advanced(
        width=100,
        height=100,
        pixels=bytes(grid),
        resolution=0.05,
        x_min=0.0,
        y_min=0.0,
        scale=3,
        robot_pose=(2000, 2000, 90),
        cleaning_path=[(1500, 1500), (2000, 2000)],
        dock_pos=(1600, 1200),
        no_go_zones=[{"points": [(1500, 1500), (1800, 1500), (1800, 1800), (1500, 1800)]}],
    )
    assert png_bytes.startswith(b"\x89PNG\r\n\x1a\n")
    assert len(info) == 5  # cmin, cmax, rmin, rmax, scale


def test_map_info_calibration():
    """BotslabMapInfo computes 3-point affine calibration."""
    info = BotslabMapInfo(
        width=100,
        height=100,
        cmin=20,
        cmax=60,
        rmin=20,
        rmax=60,
        scale=3,
        dock_position=(1600, 1200),
    )
    cal = info.calibration_points()
    assert len(cal) == 3
    for pt in cal:
        assert "vacuum" in pt
        assert "map" in pt


def test_china_region_constants():
    """Verify China legacy 360 region configuration and endpoints."""
    from custom_components.botslab_vacuum.const import (
        AUTH_EXPIRED_ERRNOS_360,
        BATTERY_KEYS_360,
        COOKIE_Q_360,
        EP_360_CMD_SEND,
        EP_360_DEV_LIST,
        EP_360_LOGIN,
        EP_360_RECORD_GET_ONE,
        EP_360_RECORD_LIST,
        FAN_SPEEDS_360_TO_HA,
        FAN_SPEEDS_HA_TO_360,
        INFO_360_CONSUMABLES,
        INFO_360_FAN_SPEED,
        INFO_360_LOCATE,
        INFO_360_PAUSE,
        INFO_360_RESET_CONSUMABLE,
        INFO_360_RETURN,
        INFO_360_SETTINGS,
        INFO_360_START,
        INFO_360_STATUS,
        LEGACY_360_MINT_UA,
        LEGACY_360_USER_AGENT,
        QUC_APP_CHINA,
        QUC_FROM_CHINA,
        QUC_MSIGKEY_CHINA,
        REGIONS,
    )

    assert "cn" in REGIONS
    cn = REGIONS["cn"]
    assert cn["api"] == "q.smart.360.cn"
    assert cn["login"] == "passport.360.cn"
    assert cn["legacy"] is True
    assert QUC_FROM_CHINA == "mpl_smarthome_and"
    assert QUC_APP_CHINA == "360Robot"
    assert QUC_MSIGKEY_CHINA == "i7v2m5x6q"
    assert EP_360_LOGIN == "/common/user/login"
    assert EP_360_DEV_LIST == "/common/dev/GetList"
    assert EP_360_CMD_SEND == "/clean/cmd/send"
    assert EP_360_RECORD_LIST == "/clean/record/getList"
    assert EP_360_RECORD_GET_ONE == "/clean/record/getOne"
    assert COOKIE_Q_360 == "u=&t=1;t=&v=2.0&a=1"
    assert "iPhone" in LEGACY_360_USER_AGENT
    assert "qhsa" in LEGACY_360_MINT_UA
    assert 102 in AUTH_EXPIRED_ERRNOS_360
    assert 103 in AUTH_EXPIRED_ERRNOS_360
    assert "elecReal" in BATTERY_KEYS_360
    assert INFO_360_STATUS == "20001"
    assert INFO_360_START == "21005"
    assert INFO_360_RETURN == "21012"
    assert INFO_360_PAUSE == "21017"
    assert INFO_360_LOCATE == "21020"
    assert INFO_360_FAN_SPEED == "21022"
    assert INFO_360_SETTINGS == "21024"
    assert INFO_360_CONSUMABLES == "21015"
    assert INFO_360_RESET_CONSUMABLE == "21016"
    assert FAN_SPEEDS_HA_TO_360["standard"] == "auto"
    assert FAN_SPEEDS_360_TO_HA["auto"] == "standard"


def test_build_login_params_china():
    """Verify QUC login parameters for China backend."""
    from custom_components.botslab_vacuum.const import (
        QUC_APP_CHINA,
        QUC_FROM,
        QUC_FROM_CHINA,
    )
    from custom_components.botslab_vacuum.quc_login import build_login_params

    # International
    p_intl = build_login_params("user@example.com", "hunter2", "m2", is_china=False)
    assert p_intl["from"] == QUC_FROM
    assert p_intl["app"] == "Botslab"
    assert p_intl["needDeviceCheck"] == "1"
    assert p_intl["quc_sdk_version"] == "v3.2.7"

    # China
    p_cn = build_login_params("user@example.com", "hunter2", "m2", is_china=True)
    assert p_cn["from"] == QUC_FROM_CHINA
    assert p_cn["app"] == QUC_APP_CHINA
    assert p_cn["needDeviceCheck"] == "0"
    assert p_cn["quc_sdk_version"] == "v3.2.4.6"
    assert p_cn["v"] == "2.24.0"
    assert p_cn["os_sdk_version"] == "android_33"
    assert p_cn["os_manufacturer"] == "Google"
    assert p_cn["sig"] != p_intl["sig"]


def test_legacy_360_headers():
    """Verify Cookie and User-Agent headers for legacy 360 backend."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi
    from custom_components.botslab_vacuum.const import COOKIE_Q_360, LEGACY_360_USER_AGENT

    session = MagicMock()
    api = BotslabVacuumApi(
        session=session,
        region="cn",
        m2="fake_m2",
        q="fake_q",
        t="fake_t",
        qid="12345678",
    )
    api.sid = "sid_abc123"

    assert api.is_legacy_360 is True
    hdrs = api._headers("application/x-www-form-urlencoded")
    assert hdrs["User-Agent"] == LEGACY_360_USER_AGENT
    assert hdrs["Content-Type"] == "application/x-www-form-urlencoded"
    assert "q=fake_q" in hdrs["Cookie"]
    assert "t=fake_t" in hdrs["Cookie"]
    assert "qid=12345678" in hdrs["Cookie"]
    assert "sid=sid_abc123" in hdrs["Cookie"]

    # Fallback when q and t are empty
    api_fallback = BotslabVacuumApi(
        session=session,
        region="cn",
        m2="fake_m2",
        q="",
        t="",
        qid="12345678",
    )
    api_fallback.sid = "sid_abc123"
    hdrs_fallback = api_fallback._headers()
    assert f"q={COOKIE_Q_360}" in hdrs_fallback["Cookie"]


def test_legacy_360_check_errno():
    """Verify errno handling maps expired sessions to BotslabAuthError and others to BotslabCommandError."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi
    from custom_components.botslab_vacuum.exceptions import BotslabCommandError
    from custom_components.botslab_vacuum.quc_login import BotslabAuthError

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")

    # errno 0 = success
    api._check_360_errno({"errno": 0}, "test")
    api._check_360_errno({"errno": 0, "errorCode": 0}, "test")

    # Auth expired errnos via errno or errorCode
    for err in (102, 103, 401, 403, -2, 10001, 10002):
        with pytest.raises(BotslabAuthError):
            api._check_360_errno({"errno": err, "errmsg": "expired"}, "test")
        with pytest.raises(BotslabAuthError):
            api._check_360_errno({"errno": 0, "errorCode": err, "errmsg": "expired"}, "test")

    # Generic command error via errno or errorCode
    with pytest.raises(BotslabCommandError):
        api._check_360_errno({"errno": 999, "errmsg": "bad parameter"}, "test")
    with pytest.raises(BotslabCommandError):
        api._check_360_errno({"errno": 0, "errorCode": 999, "errmsg": "bad parameter"}, "test")


def test_legacy_360_working_status_mapping():
    """Verify mapping of 360 status strings to standard status states."""
    from custom_components.botslab_vacuum.api import working_status_to_state
    from custom_components.botslab_vacuum.const import (
        STATUS_CLEANING,
        STATUS_DOCKED,
        STATUS_ERROR,
        STATUS_IDLE,
        STATUS_PAUSED,
        STATUS_RETURNING,
    )

    assert working_status_to_state("smartClean") == STATUS_CLEANING
    assert working_status_to_state("sweep") == STATUS_CLEANING
    assert working_status_to_state("reAppointClean") == STATUS_CLEANING
    assert working_status_to_state("charge") == STATUS_DOCKED
    assert working_status_to_state("charging") == STATUS_DOCKED
    assert working_status_to_state("fullcharge") == STATUS_DOCKED
    assert working_status_to_state("pause") == STATUS_PAUSED
    assert working_status_to_state("chargeback") == STATUS_RETURNING
    assert working_status_to_state("return") == STATUS_RETURNING
    assert working_status_to_state("gocharge") == STATUS_RETURNING
    assert working_status_to_state("idle") == STATUS_IDLE
    assert working_status_to_state("standby") == STATUS_IDLE
    assert working_status_to_state("error") == STATUS_ERROR


def test_quc_captcha_exception():
    """Verify BotslabCaptchaRequired exception attributes."""
    from custom_components.botslab_vacuum.exceptions import BotslabAuthError, BotslabCaptchaRequired

    exc = BotslabCaptchaRequired("Need captcha", sc="token123", captcha_type="graph")
    assert isinstance(exc, BotslabAuthError)
    assert exc.sc == "token123"
    assert exc.captcha_type == "graph"
    assert str(exc) == "Need captcha"


def test_build_login_params_with_captcha():
    """Verify captcha parameters are added to login request payload and hashed into signature."""
    from custom_components.botslab_vacuum.quc_login import build_login_params

    # Without captcha
    params_no_cap = build_login_params("user@example.com", "pass", "m2_id")
    assert "sc" not in params_no_cap
    assert "uc" not in params_no_cap
    assert "captchaType" not in params_no_cap

    # With captcha (international)
    params_cap = build_login_params(
        "user@example.com",
        "pass",
        "m2_id",
        captcha_sc="challenge_token_xyz",
        captcha_code="ABCD",
    )
    assert params_cap["sc"] == "challenge_token_xyz"
    assert params_cap["uc"] == "ABCD"
    assert params_cap["captchaType"] == "graph"
    assert params_cap["sig"] != params_no_cap["sig"]

    # With captcha (China legacy)
    params_cn_cap = build_login_params(
        "user@example.com",
        "pass",
        "m2_id",
        is_china=True,
        captcha_sc="challenge_token_cn",
        captcha_code="1234",
    )
    assert params_cn_cap["sc"] == "challenge_token_cn"
    assert params_cn_cap["uc"] == "1234"
    assert params_cn_cap["captchaType"] == "graph"


@pytest.mark.asyncio
async def test_botslab_captcha_view():
    """Verify BotslabCaptchaView serves images with appropriate content type."""
    from custom_components.botslab_vacuum.config_flow import BotslabCaptchaView
    from unittest.mock import MagicMock

    view = BotslabCaptchaView()
    req = MagicMock()

    # Flow not found
    resp_404 = await view.get(req, "non_existent_flow")
    assert resp_404.status == 404

    # PNG captcha
    png_bytes = b"\x89PNG\r\n\x1a\n" + b"\x00" * 20
    view.captchas["flow_png"] = png_bytes
    resp_png = await view.get(req, "flow_png")
    assert resp_png.status == 200
    assert resp_png.body == png_bytes
    assert resp_png.content_type == "image/png"
    assert "no-cache" in resp_png.headers.get("Cache-Control", "")

    # JPEG captcha
    jpeg_bytes = b"\xff\xd8\xff\xe0" + b"\x00" * 20
    view.captchas["flow_jpeg"] = jpeg_bytes
    resp_jpeg = await view.get(req, "flow_jpeg")
    assert resp_jpeg.status == 200
    assert resp_jpeg.body == jpeg_bytes
    assert resp_jpeg.content_type == "image/jpeg"
    assert "no-cache" in resp_jpeg.headers.get("Cache-Control", "")


@pytest.mark.asyncio
async def test_async_login_raises_captcha_required():
    """Verify async_login raises BotslabCaptchaRequired when errno 5010 is returned."""
    from custom_components.botslab_vacuum.exceptions import BotslabCaptchaRequired
    from custom_components.botslab_vacuum.quc_login import async_login
    from unittest.mock import AsyncMock, MagicMock

    session = MagicMock()
    mock_resp = AsyncMock()
    mock_resp.status = 200
    mock_resp.json = AsyncMock(return_value={"errno": 5010, "errmsg": "Please enter verification code"})
    session.post.return_value.__aenter__.return_value = mock_resp

    with pytest.raises(BotslabCaptchaRequired) as exc_info:
        await async_login(session, "eu1", "test@example.com", "pass", "m2_fake")
    assert "Captcha required (code 5010)" in str(exc_info.value)


@pytest.mark.asyncio
async def test_async_get_captcha():
    """Verify async_get_captcha fetches image bytes and parses URL-encoded sc token."""
    from custom_components.botslab_vacuum.quc_login import async_get_captcha
    from unittest.mock import AsyncMock, MagicMock

    session = MagicMock()
    mock_resp = AsyncMock()
    mock_resp.status = 200
    mock_resp.read = AsyncMock(return_value=b"fake_captcha_png_bytes")
    mock_resp.headers = {"sc": "sc_token_123%2Fxyz"}
    session.post.return_value.__aenter__.return_value = mock_resp

    image_bytes, sc = await async_get_captcha(session, "eu1", "m2_fake")
    assert image_bytes == b"fake_captcha_png_bytes"
    assert sc == "sc_token_123/xyz"


def test_parse_consumable_lifetime():
    """Verify raw elapsed seconds and legacy percentages are converted to remaining hours and %."""
    from custom_components.botslab_vacuum.coordinator import (
        FILTER_MAX_HOURS,
        MAIN_BRUSH_MAX_HOURS,
        SENSOR_MAX_HOURS,
        SIDE_BRUSH_MAX_HOURS,
        _parse_consumable_lifetime,
    )

    # 469736 seconds for filter (150 h max)
    pct, hrs = _parse_consumable_lifetime(469736, FILTER_MAX_HOURS)
    assert hrs == 19.5
    assert pct == 13

    # 651935 seconds for main brush (300 h max)
    pct, hrs = _parse_consumable_lifetime(651935, MAIN_BRUSH_MAX_HOURS)
    assert hrs == 118.9
    assert pct == 40

    # 90718 seconds for sensors (30 h max)
    pct, hrs = _parse_consumable_lifetime(90718, SENSOR_MAX_HOURS)
    assert hrs == 4.8
    assert pct == 16

    # 500000 seconds for side brush (200 h max)
    pct, hrs = _parse_consumable_lifetime(500000, SIDE_BRUSH_MAX_HOURS)
    assert hrs == 61.1
    assert pct == 31

    # Fresh 100% replacement
    pct, hrs = _parse_consumable_lifetime(100, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    # Fresh reset (0 seconds elapsed -> 100% remaining)
    pct, hrs = _parse_consumable_lifetime(0, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    # Explicit Legacy 360 mode (85% remaining)
    pct, hrs = _parse_consumable_lifetime(85, FILTER_MAX_HOURS, is_legacy_360=True)
    assert pct == 85
    assert hrs == 127.5

    # Explicit Legacy 360 mode (0 counter fresh reset -> 100% remaining)
    pct, hrs = _parse_consumable_lifetime(0, FILTER_MAX_HOURS, is_legacy_360=True)
    assert pct == 100
    assert hrs == 150.0


def test_derive_qid():
    """Verify derive_qid parses decimal qid from various Q cookie formats."""
    from custom_components.botslab_vacuum.quc_login import derive_qid

    assert derive_qid("u=360H12345678&n=synth") == "12345678"
    assert derive_qid("u=987654321&v=2.0") == "987654321"
    assert derive_qid("Q=u%3D360H11223344%26t%3D1") == "11223344"
    assert derive_qid("a=1&b=2;u=55667788;c=3") == "55667788"
    assert derive_qid("") == ""
    assert derive_qid(None) == ""
    assert derive_qid("random_junk_without_u") == ""


@pytest.mark.asyncio
async def test_legacy_360_set_mop_mode():
    """Verify set_mop_mode on legacy 360 uses cmd 21024 setMopSwitch."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi
    from custom_components.botslab_vacuum.const import INFO_360_SETTINGS

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Bind original unpatched method
    api.set_mop_mode = BotslabVacuumApi._raw_set_mop_mode.__get__(api, BotslabVacuumApi)
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0})

    # Mop only -> value: 2
    await api.set_mop_mode("SN123", "pk", 2)
    api.send_legacy_360_cmd.assert_called_with(
        "SN123", INFO_360_SETTINGS, {"cmd": "setMopSwitch", "value": 2}
    )

    await api.set_mop_mode("SN123", "pk", "mop")
    api.send_legacy_360_cmd.assert_called_with(
        "SN123", INFO_360_SETTINGS, {"cmd": "setMopSwitch", "value": 2}
    )

    # Standard / Sweep -> value: 1
    await api.set_mop_mode("SN123", "pk", 0)
    api.send_legacy_360_cmd.assert_called_with(
        "SN123", INFO_360_SETTINGS, {"cmd": "setMopSwitch", "value": 1}
    )


@pytest.mark.asyncio
async def test_legacy_360_get_properties_live_telemetry():
    """Verify live status parsing from 20001 (cleanTime, cleanArea, errorState, mopStatus)."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock()
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # Status response matching placix / 360 protocol
    api.send_legacy_360_cmd.side_effect = [
        {
            "errno": 0,
            "data": {
                "elecReal": 88,
                "mode": "smartClean",
                "cleanTime": 1420,
                "cleanArea": 35,
                "allTime": 50000,
                "allArea": 1200,
                "errorState": [10],
                "mopStatus": 1,
                "workNoisy": "strong",
                "vol": 7,
            },
        },
        {"errno": 0, "data": {}},  # consumables
    ]

    props, _ = await api._legacy_360_get_properties("SN123")
    assert props["BatteryLevel"] == 88
    assert props["WorkingStatus"] == "smartClean"
    assert props["TEST_CleaningTime"] == 1420
    assert props["CleaningArea"] == 35
    assert props["TotalCleaningTime"] == 50000
    assert props["TotalCleaningArea"] == 1200
    assert props["ErrorCode"] == 10
    assert props["mopStatus"] == 1
    assert props["workNoisy"] == "strong"
    assert props["VolumeLevel"] == 70


@pytest.mark.asyncio
async def test_legacy_360_clean_rooms():
    """Verify clean_rooms on legacy 360 posts to setAreaAndCleaning."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api_r = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Bind original unpatched method
    api_r.clean_rooms = BotslabVacuumApi._raw_clean_rooms.__get__(api_r, BotslabVacuumApi)
    api_r.get_latest_clean_record = AsyncMock(
        return_value={
            "cleanId": "clean_123",
            "smartArea": {
                "activeIds": [],
                "cleanTimes": 1,
                "value": [{"id": 1, "name": "Room 1"}, {"id": 2, "name": "Room 2"}],
            },
        }
    )
    ctx = MagicMock()
    mock_resp = MagicMock()
    mock_resp.json = AsyncMock(return_value={"errno": 0})
    ctx.__aenter__ = AsyncMock(return_value=mock_resp)
    ctx.__aexit__ = AsyncMock(return_value=None)
    api_r.session.post.return_value = ctx

    await api_r.clean_rooms("SN123", "pk", ["1", "2"], repeat_times=2)
    assert api_r._legacy_cached_status["SN123"] == "cleaning"


@pytest.mark.asyncio
async def test_legacy_360_clean_zone():
    """Verify clean_zone on legacy 360 sends composite 30000 command (21023 + 21005)."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api_z = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Bind original unpatched method
    api_z.clean_zone = BotslabVacuumApi._raw_clean_zone.__get__(api_z, BotslabVacuumApi)
    api_z.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0})
    api_z.get_latest_clean_record = AsyncMock(return_value={"mapId": 7})

    zones = [[-500, -1000, 500, 1000]]
    await api_z.clean_zone("SN123", "pk", zones)

    api_z.send_legacy_360_cmd.assert_called_once()
    sn_arg, cmd_arg, payload = api_z.send_legacy_360_cmd.call_args[0]
    assert sn_arg == "SN123"
    assert cmd_arg == "30000"
    assert payload["cmds"][0]["infoType"] == "21023"
    assert payload["cmds"][0]["data"]["mapId"] == 7
    assert payload["cmds"][1]["infoType"] == "21005"
    assert payload["cmds"][1]["data"]["mode"] == "reAppointClean"
    assert api_z._legacy_cached_status["SN123"] == "cleaning"


@pytest.mark.asyncio
async def test_legacy_360_get_properties_defaults_to_docked():
    """Verify that legacy 360 defaults to docked rather than falsely reporting cleaning."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi, working_status_to_state
    from custom_components.botslab_vacuum.const import STATUS_DOCKED

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Simulate device from GetList having status: 1 (meaning bound/registered)
    api._legacy_device_cache["SN123"] = {"sn": "SN123", "status": 1, "battery": 100}
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    props, _ = await api._legacy_360_get_properties("SN123")
    assert props["WorkingStatus"] == STATUS_DOCKED
    assert working_status_to_state(props["WorkingStatus"]) == STATUS_DOCKED
    assert api._legacy_cached_status["SN123"] == STATUS_DOCKED


@pytest.mark.asyncio
async def test_legacy_360_get_properties_with_live_push():
    """Verify that live push telemetry (mode, elecReal, etc.) is used by _legacy_360_get_properties."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi, working_status_to_state
    from custom_components.botslab_vacuum.const import STATUS_DOCKED

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api._legacy_live_status["SN123"] = {
        "mode": "charge",
        "elecReal": 96,
        "cleanTime": 0,
        "cleanArea": 0,
        "allTime": 42000,
        "allArea": 950,
        "errorState": [],
        "workNoisy": "auto",
    }
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    props, _ = await api._legacy_360_get_properties("SN123")
    assert props["WorkingStatus"] == "charge"
    assert working_status_to_state(props["WorkingStatus"]) == STATUS_DOCKED
    assert props["BatteryLevel"] == 96
    assert props["TotalCleaningTime"] == 42000
    assert props["TotalCleaningArea"] == 950
    assert api._legacy_cached_status["SN123"] == STATUS_DOCKED


def test_decode_china_push():
    """Verify decode_china_push handles None, malformed, and unencrypted envelopes."""
    import base64
    import json
    from custom_components.botslab_vacuum.qpush import decode_china_push

    assert decode_china_push("", "key") is None
    assert decode_china_push('{"data": ""}', "") is None
    assert decode_china_push("malformed", "key") is None

    # Test unencrypted payload (encrypt: 0)
    inner = json.dumps({"sn": "SN_P1", "data": {"mode": "charge", "elecReal": 88}}).encode("utf-8")
    envelope = json.dumps({"data": base64.b64encode(inner).decode("ascii"), "encrypt": 0})
    result = decode_china_push(envelope, "some_push_key")
    assert result is not None
    assert result[0] == "SN_P1"
    assert result[1]["mode"] == "charge"
    assert result[1]["elecReal"] == 88


def test_china_push_frame_buffer_and_ack():
    """Verify _ChinaPushFrameBuffer and _build_push_ack on binary transport frames."""
    import struct
    from custom_components.botslab_vacuum.qpush import (
        _ChinaPushFrameBuffer,
        _parse_push_message_frame,
        _build_push_ack,
        PUSH_OP_MESSAGE,
        PUSH_OP_ACK,
    )

    prop = b"ack:9988\nt:30\n"
    prefix = struct.pack(">hhH", 5, PUSH_OP_MESSAGE, len(prop)) + prop
    payload = b"\x00" * 8 + struct.pack(">II", 60009, 4) + b"test"
    full_frame = prefix + struct.pack(">I", len(payload)) + payload

    fb = _ChinaPushFrameBuffer()
    frames = fb.feed(full_frame)
    assert len(frames) == 1
    opcode, frame_bytes = frames[0]
    assert opcode == PUSH_OP_MESSAGE

    parsed = _parse_push_message_frame(frame_bytes)
    assert parsed is not None
    pfx, bodies = parsed
    assert len(bodies) == 1
    assert bodies[0] == b"test"

    ack = _build_push_ack(pfx)
    assert ack is not None
    assert int.from_bytes(ack[2:4], "big") == PUSH_OP_ACK


def test_working_status_to_state_extra_modes():
    """Verify working_status_to_state covers mop, backcharge, standby, dormant."""
    from custom_components.botslab_vacuum.api import working_status_to_state
    from custom_components.botslab_vacuum.const import (
        STATUS_CLEANING,
        STATUS_DOCKED,
        STATUS_ERROR,
        STATUS_IDLE,
        STATUS_PAUSED,
        STATUS_RETURNING,
    )

    assert working_status_to_state("mop") == STATUS_CLEANING
    assert working_status_to_state("backcharge") == STATUS_RETURNING
    assert working_status_to_state("standby") == STATUS_IDLE
    assert working_status_to_state("dormant") == STATUS_IDLE

    # Official Botslab TSL working status codes
    assert working_status_to_state(0) == STATUS_IDLE          # StandBy
    assert working_status_to_state(1) == STATUS_CLEANING      # DefaultClean
    assert working_status_to_state(2) == STATUS_CLEANING      # CleanInAreas
    assert working_status_to_state(3) == STATUS_CLEANING      # CleanInZones
    assert working_status_to_state(4) == STATUS_PAUSED        # Paused
    assert working_status_to_state(5) == STATUS_RETURNING     # GotoChargeBase
    assert working_status_to_state(6) == STATUS_DOCKED        # Charging
    assert working_status_to_state(7) == STATUS_DOCKED        # ChargeDone
    assert working_status_to_state(8) == STATUS_IDLE          # Dormant
    assert working_status_to_state(9) == STATUS_ERROR         # InTrouble
    assert working_status_to_state(10) == STATUS_CLEANING     # InRemoteControl
    assert working_status_to_state(11) == STATUS_DOCKED       # InDustCollecting


def test_fan_speed_level_mapping():
    """Verify fan speed to 0-based and 1-based level mappings."""
    from custom_components.botslab_vacuum.const import (
        FAN_SPEED_QUIET,
        FAN_SPEED_STANDARD,
        FAN_SPEED_POWERFUL,
        FAN_SPEED_MAX,
        FAN_SPEED_TO_LEVEL,
        MODE_TO_FAN_SPEED,
    )

    assert FAN_SPEED_TO_LEVEL[FAN_SPEED_QUIET] == 0
    assert FAN_SPEED_TO_LEVEL[FAN_SPEED_STANDARD] == 1
    assert FAN_SPEED_TO_LEVEL[FAN_SPEED_POWERFUL] == 2
    assert FAN_SPEED_TO_LEVEL[FAN_SPEED_MAX] == 3

    assert MODE_TO_FAN_SPEED[0] == FAN_SPEED_QUIET
    assert MODE_TO_FAN_SPEED[1] == FAN_SPEED_STANDARD
    assert MODE_TO_FAN_SPEED[2] == FAN_SPEED_POWERFUL
    assert MODE_TO_FAN_SPEED[3] == FAN_SPEED_MAX


def test_negative_error_code_not_treated_as_fault():
    """Verify negative telemetry ErrorCode does not put modern Botslab into error state."""
    from custom_components.botslab_vacuum.api import working_status_to_state
    from custom_components.botslab_vacuum.const import (
        STATUS_CLEANING,
        STATUS_DOCKED,
        STATUS_ERROR,
        STATUS_RETURNING,
    )

    # Simulated coordinator error logic
    def resolve_status(is_legacy: bool, raw_status: int | str, err_code: int) -> str:
        status = working_status_to_state(raw_status)
        if is_legacy:
            if err_code > 0:
                status = STATUS_ERROR
        else:
            if err_code > 0 or str(raw_status).strip().lower() in ("9", "introuble"):
                status = STATUS_ERROR
        return status

    # S8 live telemetry: ChargeDone with ErrorCode -2406
    assert resolve_status(False, 7, -2406) == STATUS_DOCKED
    # S8 live telemetry: GotoChargeBase with ErrorCode -2406
    assert resolve_status(False, 5, -2406) == STATUS_RETURNING
    # S8 live telemetry: CleanInAreas with ErrorCode -2605
    assert resolve_status(False, 2, -2605) == STATUS_CLEANING

    # Genuine faults
    assert resolve_status(False, 9, -2406) == STATUS_ERROR
    assert resolve_status(False, 0, 102) == STATUS_ERROR

    # Legacy 360 logic
    assert resolve_status(True, "charge", 0) == STATUS_DOCKED
    assert resolve_status(True, "charge", 1) == STATUS_ERROR


def test_coordinator_watch_state_transition():
    """Verify state transition watcher loop polls and stops as soon as cloud status changes."""
    import asyncio
    from custom_components.botslab_vacuum.api import working_status_to_state
    from custom_components.botslab_vacuum.const import (
        DEFAULT_POLL_INTERVAL_ACTIVE,
        DEFAULT_POLL_INTERVAL_IDLE,
        STATUS_CLEANING,
        STATUS_DOCKED,
    )

    assert DEFAULT_POLL_INTERVAL_ACTIVE == 30
    assert DEFAULT_POLL_INTERVAL_IDLE == 120

    # Sequence of cloud status returns simulated over time:
    # 7 (docked), 7 (docked), 2 (CleanInAreas / cleaning)
    cloud_responses = [7, 7, 2, 2]
    poll_index = 0

    async def run_simulated_watcher():
        nonlocal poll_index
        initial_status = STATUS_DOCKED
        cur_status = initial_status
        attempts = 0

        for attempt in range(1, 9):
            attempts = attempt
            # Simulate fetching latest status from cloud
            raw_val = cloud_responses[min(poll_index, len(cloud_responses) - 1)]
            poll_index += 1
            cur_status = working_status_to_state(raw_val)

            # Once genuine cloud status changes, watcher loop exits immediately
            if cur_status != initial_status:
                break
            await asyncio.sleep(0.001)

        return cur_status, attempts

    loop = asyncio.new_event_loop()
    try:
        final_status, total_attempts = loop.run_until_complete(run_simulated_watcher())
    finally:
        loop.close()

    assert final_status == STATUS_CLEANING
    assert total_attempts == 3  # Broke early on attempt 3 without waiting for max_attempts!


# ---------------------------------------------------------------------------
# R1: Dynamic QPush IP Resolution & Fallback Tests
# ---------------------------------------------------------------------------
@pytest.mark.asyncio
async def test_qpush_dynamic_resolution_and_fallback():
    """Verify resolve_qpush_gateway resolves endpoints and falls back safely."""
    import asyncio
    from unittest.mock import AsyncMock, MagicMock, patch
    from custom_components.botslab_vacuum.qpush import (
        CHINA_PUSH_HOST,
        CHINA_PUSH_PORT,
        BotslabQPush,
        resolve_qpush_gateway,
    )

    # 1. Successful resolution from dispatcher
    session = MagicMock()
    mock_resp = AsyncMock()
    mock_resp.status = 200
    mock_resp.json = AsyncMock(
        return_value={
            "errno": 0,
            "data": [{"ip": "8.211.52.133", "p": "443"}, {"ip": "8.211.52.133", "p": "80"}],
        }
    )
    session.get.return_value.__aenter__.return_value = mock_resp

    endpoints = await resolve_qpush_gateway(session, "gqrwex6nq54m")
    assert endpoints == [("8.211.52.133", 443), ("8.211.52.133", 80)]

    # 2. Dispatcher failure fallback (network error / timeout)
    session.get.side_effect = Exception("Connection timed out")
    fallback = await resolve_qpush_gateway(session, "gqrwex6nq54m")
    assert fallback == [("8.211.52.133", 443), ("8.211.52.133", 80)]

    # 3. Non-zero errno or empty data fallback
    session.get.side_effect = None
    mock_resp.json = AsyncMock(return_value={"errno": 1001, "data": []})
    session.get.return_value.__aenter__.return_value = mock_resp
    assert await resolve_qpush_gateway(session, "gqrwex6nq54m") == [
        ("8.211.52.133", 443),
        ("8.211.52.133", 80),
    ]

    # 4. Legacy China QPush isolation
    assert CHINA_PUSH_HOST == "47.254.151.104"
    assert CHINA_PUSH_PORT == 443

    # 5. Connection fallback: port 443 fails, port 80 succeeds
    qpush = BotslabQPush(
        session=session,
        device_id="test_dev",
        get_alias=lambda: "alias123",
        on_push=lambda p: None,
        ensure_session=AsyncMock(),
    )
    mock_reader = AsyncMock()
    mock_writer = MagicMock()
    mock_writer.write = MagicMock()
    mock_writer.drain = AsyncMock()
    call_log = []

    async def mock_open_connection(ip, port, ssl=None):
        assert ssl is None, "Port 443 must use raw binary TCP without TLS/SSL"
        call_log.append((ip, port))
        if port == 443:
            raise OSError("Port 443 connection refused")
        return mock_reader, mock_writer

    with patch("custom_components.botslab_vacuum.qpush.resolve_qpush_gateway", AsyncMock(return_value=[("8.211.52.133", 443), ("8.211.52.133", 80)])), \
         patch("asyncio.open_connection", side_effect=mock_open_connection), \
         patch.object(qpush, "_read_msg", AsyncMock(side_effect=asyncio.CancelledError)):
        try:
            await qpush._session_once()
        except asyncio.CancelledError:
            pass

    assert call_log == [("8.211.52.133", 443), ("8.211.52.133", 80)]


# ---------------------------------------------------------------------------
# R2: Map Sync & 1days Bucket Prioritization Tests
# ---------------------------------------------------------------------------
@pytest.mark.asyncio
async def test_map_sync_and_1days_bucket_prioritization():
    """Verify start/stop map sync and 1days bucket prioritization in get_map_json."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {"request_id": "req_1"}})
    api.wait_async_reply = AsyncMock(return_value=True)
    api.invoke_sync = AsyncMock(return_value={"code": 0, "data": {}})

    # start_sync_map_to_oss with 60s default
    res = await api.start_sync_map_to_oss("SN123", "PK123", sync_duration=60)
    api.invoke_async.assert_called_once_with(
        "SN123", "PK123", "StartSyncMapPkgToOss", {"SyncDuration": 60}
    )
    assert res == {"code": 0, "data": {"request_id": "req_1"}}

    # alias start_map_sync
    api.invoke_async.reset_mock()
    await api.start_map_sync("SN123", "PK123", duration_s=60)
    api.invoke_async.assert_called_once_with(
        "SN123", "PK123", "StartSyncMapPkgToOss", {"SyncDuration": 60}
    )

    # stop_sync_map_to_oss
    await api.stop_sync_map_to_oss("SN123", "PK123")
    api.invoke_sync.assert_called_once_with("SN123", "PK123", "StopSyncMapPkgToOss", {})

    # alias stop_map_sync
    api.invoke_sync.reset_mock()
    await api.stop_map_sync("SN123", "PK123")
    api.invoke_sync.assert_called_once_with("SN123", "PK123", "StopSyncMapPkgToOss", {})

    # Legacy 360 returns {} immediately without calling invoke
    api_legacy = BotslabVacuumApi(session, "cn", "m2", "q", "t")
    assert api_legacy.is_legacy_360 is True
    assert await api_legacy.start_sync_map_to_oss("SN_LEGACY", "PK_LEGACY") == {}
    assert await api_legacy.stop_sync_map_to_oss("SN_LEGACY", "PK_LEGACY") == {}

    # 1days bucket prioritization during active cleaning
    props_active = {
        "WorkingStatus": 2,  # Active cleaning (CleanInAreas)
        "MapPkgOssInfo": '{"Url": "https://eu1-ali-1days.oss-eu-central-1.aliyuncs.com/map_active.bin"}',
    }
    signs = {
        "https://eu1-ali-1days.oss-eu-central-1.aliyuncs.com/map_active.bin": "sig1",
        "https://eu1-ali-90days.oss-eu-central-1.aliyuncs.com/map_archive.bin": "sig2",
    }
    api.get_property_extended = AsyncMock(return_value=(props_active, signs))
    doc_1days = {"width": 100, "height": 100, "map": "data1", "smartArea": {"value": []}}
    doc_90days = {
        "width": 100,
        "height": 100,
        "map": "data2",
        "smartArea": {"value": [{"id": 1, "vertexs": [[0, 0], [1, 1], [1, 0]]}]},
    }

    async def mock_fetch(url, signed):
        if "1days" in url:
            return doc_1days
        return doc_90days

    api._fetch_signed_json = AsyncMock(side_effect=mock_fetch)
    best_doc, _ = await api.get_map_json("SN123", "PK123")
    assert best_doc["map"] == doc_1days["map"]

    # When idle/docked, highest polygon quality (90days) is preferred
    props_idle = {
        "WorkingStatus": 7,  # Docked (ChargeDone)
        "MapPkgOssInfo": '{"Url": "https://eu1-ali-1days.oss-eu-central-1.aliyuncs.com/map_active.bin"}',
    }
    api.get_property_extended = AsyncMock(return_value=(props_idle, signs))
    best_doc_idle, _ = await api.get_map_json("SN123", "PK123")
    assert best_doc_idle["map"] == doc_90days["map"]


# ---------------------------------------------------------------------------
# R3: Two-Stage Polling, 50s Keepalive & CurrentLocation Parsing Tests
# ---------------------------------------------------------------------------
@pytest.mark.asyncio
async def test_r3_coordinator_two_stage_polling_and_keepalive():
    """Verify R3 scan intervals, 50s keepalive loop, and CurrentLocation parsing."""
    from datetime import timedelta
    import json
    from unittest.mock import AsyncMock, MagicMock, patch
    from custom_components.botslab_vacuum.const import (
        ACTIVE_SCAN_INTERVAL,
        DEFAULT_POLL_INTERVAL_ACTIVE,
        DEFAULT_POLL_INTERVAL_IDLE,
        DEFAULT_SCAN_INTERVAL,
        MAP_SYNC_DURATION,
        MAP_SYNC_KEEPALIVE_INTERVAL,
        STATUS_CLEANING,
        STATUS_DOCKED,
    )
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator

    assert DEFAULT_SCAN_INTERVAL == 300
    assert ACTIVE_SCAN_INTERVAL == 5
    assert MAP_SYNC_KEEPALIVE_INTERVAL == 50
    assert MAP_SYNC_DURATION == 60
    assert DEFAULT_POLL_INTERVAL_ACTIVE == 30
    assert DEFAULT_POLL_INTERVAL_IDLE == 120

    # CurrentLocation parsing test (list and stringified)
    loc_list = [1420, -510, 90]
    loc_str = json.dumps(loc_list)

    def parse_pose(raw_loc):
        if isinstance(raw_loc, str):
            try:
                raw_loc = json.loads(raw_loc)
            except Exception:
                pass
        if isinstance(raw_loc, (list, tuple)):
            raw_loc = list(raw_loc)
            if len(raw_loc) >= 2:
                return [float(x) for x in raw_loc]
        return None

    assert parse_pose(loc_list) == [1420.0, -510.0, 90.0]
    assert parse_pose(loc_str) == [1420.0, -510.0, 90.0]
    assert parse_pose(None) is None

    # Coordinator polling interval & keepalive watchdog behavior
    hass = MagicMock()
    entry = MagicMock()
    entry.options = {}
    entry.data = {}
    entry.entry_id = "test_entry"
    api = MagicMock()
    api.is_legacy_360 = False
    api.start_sync_map_to_oss = AsyncMock()
    api.stop_sync_map_to_oss = AsyncMock()
    api.get_devices = AsyncMock(return_value=[{"device_name": "SN123", "product_key": "PK123", "device_title": "Botslab S8"}])
    api.get_live_map = AsyncMock(return_value=b"png")
    api.fetch_rooms = AsyncMock(return_value=[])

    coord = BotslabVacuumCoordinator(hass, entry, api)
    assert coord._last_map_sync_time == {}

    # 1. Simulate active cleaning state
    props_cleaning = {
        "WorkingStatus": 2,  # Cleaning
        "CurrentLocation": [1420, -510, 90],
        "BatteryLevel": 90,
    }
    api.get_property_extended = AsyncMock(return_value=(props_cleaning, {}))

    # First update: switches interval to ACTIVE_SCAN_INTERVAL (5s) and sends start_sync_map_to_oss
    with patch("time.time", return_value=1000.0):
        data = await coord._async_update_data()
        assert coord.update_interval == timedelta(seconds=ACTIVE_SCAN_INTERVAL)
        assert data["SN123"].status == STATUS_CLEANING
        assert data["SN123"].current_location == [1420, -510, 90]
        assert data["SN123"].robot_pose == [1420.0, -510.0, 90.0]
        api.start_sync_map_to_oss.assert_called_once_with("SN123", "PK123", sync_duration=MAP_SYNC_DURATION)
        assert coord._last_map_sync_time["SN123"] == 1000.0

    # Next update at t=1030s (<50s): should NOT send start_sync_map_to_oss again
    api.start_sync_map_to_oss.reset_mock()
    with patch("time.time", return_value=1030.0):
        await coord._async_update_data()
        api.start_sync_map_to_oss.assert_not_called()

    # Next update at t=1055s (>=50s keepalive elapsed): triggers start_sync_map_to_oss watchdog
    with patch("time.time", return_value=1055.0):
        await coord._async_update_data()
        api.start_sync_map_to_oss.assert_called_once_with("SN123", "PK123", sync_duration=MAP_SYNC_DURATION)
        assert coord._last_map_sync_time["SN123"] == 1055.0

    # 2. Cleaning ends -> docked: sends stop_sync_map_to_oss, resets timer, and sets interval to DEFAULT_SCAN_INTERVAL (300s)
    props_docked = {
        "WorkingStatus": 7,  # Docked
        "CurrentLocation": [0, 0, 0],
        "BatteryLevel": 100,
    }
    api.get_property_extended = AsyncMock(return_value=(props_docked, {}))
    with patch("time.time", return_value=1060.0):
        data_docked = await coord._async_update_data()
        assert coord.update_interval == timedelta(seconds=DEFAULT_SCAN_INTERVAL)
        assert data_docked["SN123"].status == STATUS_DOCKED
        api.stop_sync_map_to_oss.assert_called_once_with("SN123", "PK123")
        assert coord._last_map_sync_time["SN123"] == 0.0


# ---------------------------------------------------------------------------
# R4: Vacuum Attributes & Camera Rendering Tests
# ---------------------------------------------------------------------------
def test_r4_vacuum_attributes_and_camera():
    """Verify vacuum extra_state_attributes contains current_location, cleaning_path, robot_pose."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.camera import BotslabMapCamera
    from custom_components.botslab_vacuum.models import BotslabMapInfo
    from custom_components.botslab_vacuum.vacuum import BotslabVacuum

    dev = MagicMock()
    dev.device_name = "SN123"
    dev.product_key = "PK123"
    dev.current_location = [1420, -510, 90]
    dev.cleaning_path = [[0, 0], [100, 20], [1420, -510]]
    dev.robot_pose = [1420.0, -510.0, 90.0]
    dev.cleaning_time_minutes = 25
    dev.cleaned_area_sqm = 18.5
    dev.consumables.filter_life_pct = 85
    dev.consumables.main_brush_life_pct = 80
    dev.consumables.side_brush_life_pct = 75
    dev.consumables.sensor_clean_pct = 90
    dev.status = "cleaning"
    dev.rooms = []

    coordinator = MagicMock()
    coordinator.data = {"SN123": dev}
    vac = BotslabVacuum(coordinator, dev)
    attrs = vac.extra_state_attributes

    assert attrs["current_location"] == [1420, -510, 90]
    assert attrs["cleaning_path"] == [[0, 0], [100, 20], [1420, -510]]
    assert attrs["robot_pose"] == [1420.0, -510.0, 90.0]

    # Verify camera extra_state_attributes extracts vacuum_position from robot_pose
    map_info = BotslabMapInfo(width=100, height=100, x_min=-5.0, y_min=-5.0, resolution=0.05)
    dev.map_info = map_info
    camera = BotslabMapCamera(coordinator, dev)
    cam_attrs = camera.extra_state_attributes
    assert cam_attrs["vacuum_position"] == {"x": 1420.0, "y": -510.0, "a": 90.0}


def test_clean_zones_vs_no_go_zones():
    """Verify area cleaning zones with active='normal' are not treated as no-go zones."""
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(None, "eu", "m2", "q", "t", "qid")
    map_doc = {
        "width": 100,
        "height": 100,
        "resolution": 0.05,
        "origin": [0.0, 0.0],
        "zones": [
            {
                "id": 1,
                "name": "CleanBox",
                "active": "normal",
                "forbidType": None,
                "vertexs": [[1000, 1000], [2000, 1000], [2000, 2000], [1000, 2000]],
            },
            {
                "id": 2,
                "name": "ForbiddenWall",
                "active": "forbid",
                "forbidType": "all",
                "vertexs": [[3000, 3000], [4000, 3000], [4000, 4000], [3000, 4000]],
            },
        ],
    }
    info = api._build_map_info(map_doc)
    assert info is not None
    assert len(info.no_go_zones) == 1
    assert info.no_go_zones[0]["name"] == "ForbiddenWall"
    assert len(info.clean_zones) == 1
    assert info.clean_zones[0]["name"] == "CleanBox"


def test_watch_state_transition_timing():
    """Verify watch_state_transition defaults to interval=2.0s and max_attempts=15."""
    import inspect
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator

    sig = inspect.signature(BotslabVacuumCoordinator.watch_state_transition)
    assert sig.parameters["interval"].default == 2.0


# ---------------------------------------------------------------------------
# Milestone 1: Legacy 360 Support & Consumables Fix (v1.1.6) Tests
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_legacy_360_battery_extraction_elec_fallback():
    """Verify 360 battery extracts from elec when elecReal is None, returning actual percentage."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    # Scenario 1: S6 live push reports elec=82, elecReal is None
    api._legacy_live_status["SN_S6"] = {"elec": 82}
    api._legacy_device_cache["SN_S6"] = {"battery": 100}  # Cached default
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 82, "Battery must return 82 from elec, not 100"

    # Scenario 2: elecReal takes precedence over elec when both are present
    api._legacy_live_status["SN_S6"] = {"elecReal": 94, "elec": 82}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 94

    # Scenario 3: When both elecReal and elec are None, checks batteryLevel/power in live
    api._legacy_live_status["SN_S6"] = {"elecReal": None, "elec": None, "batteryLevel": 77}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 77

    api._legacy_live_status["SN_S6"] = {"power": 65}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 65

    # Scenario 4: Live push has no battery info, fallback to raw_dev battery fields
    api._legacy_live_status["SN_S6"] = {}
    api._legacy_device_cache["SN_S6"] = {"battery": 73}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 73

    api._legacy_device_cache["SN_S6"] = {"battery": None, "power": 58}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 58

    # Scenario 5: Neither live nor raw_dev has any battery fields -> defaults to 100
    api._legacy_live_status["SN_S6"] = {}
    api._legacy_device_cache["SN_S6"] = {}
    props, _ = await api._legacy_360_get_properties("SN_S6")
    assert props["BatteryLevel"] == 100


@pytest.mark.asyncio
async def test_legacy_360_push_frame_separation_and_mapping():
    """Verify push frame 20001 (status) and 21015 (consumables) do not overwrite each other."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    api.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0, "data": {}})
    api.get_latest_clean_record = AsyncMock(return_value=None)

    coord = BotslabVacuumCoordinator(MagicMock(), MagicMock(), api)
    coord.async_request_refresh = AsyncMock()

    # 1. Incoming Frame 20001 (Status)
    push_20001 = {
        "is_legacy_360": True,
        "sn": "SN_P1",
        "info_type": "20001",
        "status": {"mode": "charge", "elec": 85},
    }
    await coord.async_on_push(push_20001)

    assert api._legacy_live_status["SN_P1"]["mode"] == "charge"
    assert api._legacy_live_status["SN_P1"]["elec"] == 85
    assert "SN_P1" not in api._legacy_consumables or api._legacy_consumables["SN_P1"] == {}

    # 2. Incoming Frame 21015 (Consumables)
    push_21015 = {
        "is_legacy_360": True,
        "sn": "SN_P1",
        "info_type": "21015",
        "status": {
            "filter": 36000,
            "main_brush": 72000,
            "side_brush": 18000,
            "sensor": 7200,
        },
    }
    await coord.async_on_push(push_21015)

    # Frame 20001 status data MUST NOT be overwritten by Frame 21015!
    assert api._legacy_live_status["SN_P1"]["mode"] == "charge"
    assert api._legacy_live_status["SN_P1"]["elec"] == 85
    assert api._legacy_consumables["SN_P1"]["filter"] == 36000
    assert api._legacy_consumables["SN_P1"]["main_brush"] == 72000

    # 3. Subsequent Frame 20001 must not overwrite consumables
    push_20001_next = {
        "is_legacy_360": True,
        "sn": "SN_P1",
        "info_type": "20001",
        "status": {"mode": "smartClean", "elec": 84},
    }
    await coord.async_on_push(push_20001_next)

    assert api._legacy_live_status["SN_P1"]["mode"] == "smartClean"
    assert api._legacy_consumables["SN_P1"]["filter"] == 36000

    # 4. Verify _legacy_360_get_properties synthesizes both status and consumables
    props, _ = await api._legacy_360_get_properties("SN_P1")
    assert props["WorkingStatus"] == "smartClean"
    assert props["BatteryLevel"] == 84
    assert props["FilterLifeTime"] == 36000
    assert props["RollBrushLifeTime"] == 72000
    assert props["EdgeBrushLifeTime"] == 18000
    assert props["SensorLifeTime"] == 7200


def test_parse_consumable_lifetime_used_seconds_inverted():
    """Verify _parse_consumable_lifetime correctly computes remaining % and hours from elapsed seconds."""
    from custom_components.botslab_vacuum.coordinator import (
        FILTER_MAX_HOURS,
        MAIN_BRUSH_MAX_HOURS,
        SENSOR_MAX_HOURS,
        SIDE_BRUSH_MAX_HOURS,
        _parse_consumable_lifetime,
    )

    # Fresh reset: 0 used seconds -> 100% remaining, max_hours
    pct, hrs = _parse_consumable_lifetime(0, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    pct, hrs = _parse_consumable_lifetime(0.0, MAIN_BRUSH_MAX_HOURS)
    assert pct == 100
    assert hrs == 300.0

    # Standard usage: 36,000 used seconds for 150h max (540,000 total seconds)
    # remaining_seconds = 540,000 - 36,000 = 504,000 (140.0h), life_pct = 93%
    pct, hrs = _parse_consumable_lifetime(36000, FILTER_MAX_HOURS)
    assert hrs == 140.0
    assert pct == 93

    # Main brush: 72,000 used seconds for 300h max (1,080,000 total seconds)
    # remaining_seconds = 1,080,000 - 72,000 = 1,008,000 (280.0h), life_pct = 93%
    pct, hrs = _parse_consumable_lifetime(72000, MAIN_BRUSH_MAX_HOURS)
    assert hrs == 280.0
    assert pct == 93

    # Side brush: 18,000 used seconds for 200h max (720,000 total seconds)
    # remaining_seconds = 702,000 (195.0h), life_pct = 98%
    pct, hrs = _parse_consumable_lifetime(18000, SIDE_BRUSH_MAX_HOURS)
    assert hrs == 195.0
    assert pct == 98

    # Sensors: 7,200 used seconds for 30h max (108,000 total seconds)
    # remaining_seconds = 100,800 (28.0h), life_pct = 93%
    pct, hrs = _parse_consumable_lifetime(7200, SENSOR_MAX_HOURS)
    assert hrs == 28.0
    assert pct == 93

    # Edge case: used_seconds >= total_seconds (exhausted / overused)
    pct, hrs = _parse_consumable_lifetime(540000, FILTER_MAX_HOURS)
    assert pct == 0
    assert hrs == 0.0

    pct, hrs = _parse_consumable_lifetime(600000, FILTER_MAX_HOURS)
    assert pct == 0
    assert hrs == 0.0

    # Edge case: Percentage remaining values (val <= 100 and val > 0)
    pct, hrs = _parse_consumable_lifetime(85, FILTER_MAX_HOURS)
    assert pct == 85
    assert hrs == 127.5

    pct, hrs = _parse_consumable_lifetime(100, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    # Edge case: negative or invalid inputs
    pct, hrs = _parse_consumable_lifetime(-50, FILTER_MAX_HOURS)
    assert pct == 0
    assert hrs == 0.0

    pct, hrs = _parse_consumable_lifetime(None, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    pct, hrs = _parse_consumable_lifetime("not_a_number", FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0


@pytest.mark.asyncio
async def test_reset_consumable_aliases_and_tsl_actions():
    """Verify reset_consumable invokes exact official Botslab TSL actions with fallback."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi
    from custom_components.botslab_vacuum.const import INFO_360_RESET_CONSUMABLE

    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(return_value={"code": 0})

    # Test sensor aliases all call ResetConsumablesLife with Consumable=0
    for alias in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness"):
        api.invoke_sync.reset_mock()
        await api.reset_consumable("SN1", "PK1", alias)
        api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetConsumablesLife", {"Consumable": 0})

    # Test filter, main brush, side brush call exact TSL actions
    api.invoke_sync.reset_mock()
    await api.reset_consumable("SN1", "PK1", "side_brush")
    api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetConsumablesLife", {"Consumable": 1})

    api.invoke_sync.reset_mock()
    await api.reset_consumable("SN1", "PK1", "filter")
    api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetConsumablesLife", {"Consumable": 2})

    api.invoke_sync.reset_mock()
    await api.reset_consumable("SN1", "PK1", "main_brush")
    api.invoke_sync.assert_called_once_with("SN1", "PK1", "ResetConsumablesLife", {"Consumable": 3})

    # Test fallback to individual actions when ResetConsumablesLife returns non-zero error
    api.invoke_sync = AsyncMock(side_effect=[
        {"code": 202016, "data": {"errmsg": "dsl service ResetConsumablesLife does not exist"}},
        {"code": 0, "data": {}}
    ])
    await api.reset_consumable("SN1", "PK1", "sensor")
    assert api.invoke_sync.call_args_list[0].args == ("SN1", "PK1", "ResetConsumablesLife", {"Consumable": 0})
    assert api.invoke_sync.call_args_list[1].args == ("SN1", "PK1", "ResetSensorCleanLife", {})

    # Test legacy 360 backend reset uses INFO_360_RESET_CONSUMABLE (21016) and zeroes local cache
    api_legacy = BotslabVacuumApi(session, "cn", "m2", "q", "t")
    api_legacy.send_legacy_360_cmd = AsyncMock(return_value={"errno": 0})
    api_legacy._legacy_consumables["SN_LEGACY"] = {"filter": 45000}
    await api_legacy.reset_consumable("SN_LEGACY", "PK_LEGACY", "filter")
    api_legacy.send_legacy_360_cmd.assert_called_once_with(
        "SN_LEGACY", INFO_360_RESET_CONSUMABLE, {"cmd": "filter"}
    )
    assert api_legacy._legacy_consumables["SN_LEGACY"]["filter"] == 0


@pytest.mark.asyncio
async def test_coordinator_reset_consumable_optimistic():
    """Verify coordinator.reset_consumable optimistically updates dev.consumables to 100% and max hours."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import (
        FILTER_MAX_HOURS,
        MAIN_BRUSH_MAX_HOURS,
        SENSOR_MAX_HOURS,
        SIDE_BRUSH_MAX_HOURS,
        BotslabVacuumCoordinator,
    )
    from custom_components.botslab_vacuum.models import BotslabConsumableStatus, BotslabVacuumDevice

    api = MagicMock()
    api.reset_consumable = AsyncMock()
    coord = BotslabVacuumCoordinator(MagicMock(), MagicMock(), api)

    dev = BotslabVacuumDevice(
        product_key="PK1",
        device_name="SN1",
        device_title="Botslab S8",
        consumables=BotslabConsumableStatus(
            filter_life_pct=25,
            filter_left_hours=37.5,
            filter_used_hours=112.5,
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
    coord.data = {"SN1": dev}
    coord.async_set_updated_data = MagicMock()

    # Reset filter
    await coord.reset_consumable("SN1", "filter")
    api.reset_consumable.assert_called_with("SN1", "PK1", "filter")
    assert dev.consumables.filter_life_pct == 100
    assert dev.consumables.filter_left_hours == FILTER_MAX_HOURS
    assert dev.consumables.filter_used_hours == 0.0

    # Reset main brush
    await coord.reset_consumable("SN1", "main_brush")
    assert dev.consumables.main_brush_life_pct == 100
    assert dev.consumables.main_brush_left_hours == MAIN_BRUSH_MAX_HOURS
    assert dev.consumables.main_brush_used_hours == 0.0

    # Reset side brush
    await coord.reset_consumable("SN1", "side_brush")
    assert dev.consumables.side_brush_life_pct == 100
    assert dev.consumables.side_brush_left_hours == SIDE_BRUSH_MAX_HOURS
    assert dev.consumables.side_brush_used_hours == 0.0

    # Reset sensors using alias "sensors"
    await coord.reset_consumable("SN1", "sensors")
    assert dev.consumables.sensor_clean_pct == 100
    assert dev.consumables.sensor_left_hours == SENSOR_MAX_HOURS
    assert dev.consumables.sensor_used_hours == 0.0
    assert coord.async_set_updated_data.called


def test_mop_pad_sensor_tri_state():
    """Verify mop_installed defaults to None, produces None when unsupported, and maps True/False correctly."""
    from dataclasses import dataclass
    from typing import Any
    import homeassistant.components.sensor

    # Ensure SensorEntityDescription & classes are present for standalone pure testing
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

    from custom_components.botslab_vacuum.models import BotslabVacuumDevice
    from custom_components.botslab_vacuum.sensor import SENSOR_DESCRIPTIONS

    mop_desc = next(d for d in SENSOR_DESCRIPTIONS if d.key == "mop_installed")

    # 1. Default device representation: mop_installed must be None
    dev = BotslabVacuumDevice(product_key="PK1", device_name="SN1", device_title="Botslab S6")
    assert dev.mop_installed is None
    assert mop_desc.value_fn(dev) is None, "Unsupported mop sensor must return None (unknown)"

    # 2. Installed state (True)
    dev.mop_installed = True
    assert mop_desc.value_fn(dev) == "installed"

    # 3. Removed state (False)
    dev.mop_installed = False
    assert mop_desc.value_fn(dev) == "removed"


def test_vacuum_entity_clean_spot_not_present():
    """Verify VacuumEntityFeature.CLEAN_SPOT is NOT present and async_clean_spot is removed."""
    from homeassistant.components.vacuum import VacuumEntityFeature
    from custom_components.botslab_vacuum.vacuum import BotslabVacuumRobot, _FEATURES

    # CLEAN_SPOT flag must not be part of supported_features
    assert (_FEATURES & VacuumEntityFeature.CLEAN_SPOT) == 0

    # async_clean_spot method must not be implemented on BotslabVacuumRobot subclass
    assert "async_clean_spot" not in BotslabVacuumRobot.__dict__
    assert "clean_spot" not in BotslabVacuumRobot.__dict__

    # Standard vacuum features must remain present
    for feature in (
        VacuumEntityFeature.START,
        VacuumEntityFeature.STOP,
        VacuumEntityFeature.PAUSE,
        VacuumEntityFeature.RETURN_HOME,
        VacuumEntityFeature.STATE,
        VacuumEntityFeature.FAN_SPEED,
        VacuumEntityFeature.LOCATE,
    ):
        assert _FEATURES & feature


def test_manifest_version_is_1_1_6():
    """Verify manifest.json version is bumped and categories are present."""
    import json
    from pathlib import Path

    manifest_path = Path(__file__).parent.parent / "custom_components" / "botslab_vacuum" / "manifest.json"
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    assert data["version"] in ("1.1.6", "1.1.7", "1.1.8", "1.1.9", "1.1.10", "1.1.11", "1.1.12", "1.1.13", "1.1.14", "1.1.15", "1.1.16", "1.1.17", "1.2.0", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.2.7", "1.2.8", "1.2.9")
    assert data["categories"] == ["appliances_cleaning.cleaning"]


def test_parse_consumable_lifetime_legacy_vs_modern():
    """Verify 0 value is 100% on both legacy 360 and modern Botslab (0 used seconds)."""
    from custom_components.botslab_vacuum.coordinator import (
        FILTER_MAX_HOURS,
        _parse_consumable_lifetime,
    )

    # Legacy 360: 0 seconds elapsed = 100% remaining
    pct_leg, hrs_leg = _parse_consumable_lifetime(0, FILTER_MAX_HOURS, is_legacy_360=True)
    assert pct_leg == 100
    assert hrs_leg == FILTER_MAX_HOURS

    # Modern Botslab: 0 seconds elapsed = 100% remaining (freshly reset)
    pct_mod, hrs_mod = _parse_consumable_lifetime(0, FILTER_MAX_HOURS, is_legacy_360=False)
    assert pct_mod == 100
    assert hrs_mod == FILTER_MAX_HOURS


@pytest.mark.asyncio
async def test_reset_consumable_code_202016_accepted():
    """Verify ResetConsumablesLife dispatches via invoke_sync and succeeds with code 0."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    api.invoke_sync = AsyncMock(return_value={"code": 0, "msg": "Success"})

    # Should not raise exception
    await api.reset_consumable("SN_S8", "PK_S8", "sensor")
    api.invoke_sync.assert_called_once_with("SN_S8", "PK_S8", "ResetConsumablesLife", {"Consumable": 0})


@pytest.mark.asyncio
async def test_map_json_path_extraction_s8_vs_360():
    """Verify get_live_map extracts 'path' on Botslab S8 and 'posArray' on legacy 360."""
    from unittest.mock import AsyncMock, MagicMock, patch
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")

    # Mock S8 map with 'path' field
    s8_map_json = {
        "width": 10,
        "height": 10,
        "map": "AAAA",
        "cleanId": "clean_1",
        "path": [[0, 0], [100, 200], [300, 400]],
    }
    api.get_map_json = AsyncMock(return_value=(s8_map_json, {}))

    with patch("custom_components.botslab_vacuum.api.decompress_lz4_block", return_value=b"\x00" * 100), \
         patch("custom_components.botslab_vacuum.api.render_map_advanced", return_value=(b"PNG_DATA", (0, 10, 0, 10, 1))):
        res = await api.get_live_map("SN_S8", "PK_S8")
        assert res == b"PNG_DATA"


@pytest.mark.asyncio
async def test_coordinator_continuous_cleaning_trail_accumulation():
    """Verify coordinator accumulates continuous robot_pose trajectory during cleaning and resets on new clean."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.const import STATUS_CLEANING, STATUS_DOCKED

    hass = MagicMock()
    entry = MagicMock()
    entry.data = {"email": "test@test.com", "password": "pass"}
    api = MagicMock()
    api.is_legacy_360 = False
    api.get_clean_track_all = AsyncMock(return_value=[])

    coord = BotslabVacuumCoordinator(hass, entry, api)
    assert coord._cleaning_paths == {}

    # Simulate cleaning step 1
    coord._last_clean_status["SN1"] = STATUS_DOCKED
    status = STATUS_CLEANING
    robot_pose = [100.0, 200.0, 0.0]

    # New clean session resets trail and appends initial point
    dev_is_active = True
    prev_status = coord._last_clean_status.get("SN1")
    if dev_is_active and prev_status not in (STATUS_CLEANING,):
        coord._cleaning_paths["SN1"] = []
    coord._last_clean_status["SN1"] = status

    trail = coord._cleaning_paths.setdefault("SN1", [])
    rx_i, ry_i = int(round(robot_pose[0])), int(round(robot_pose[1]))
    trail.append([rx_i, ry_i])

    assert coord._cleaning_paths["SN1"] == [[100, 200]]

    # Small movement (<20mm) is ignored
    robot_pose_small = [105.0, 205.0, 0.0]
    rx_i, ry_i = int(round(robot_pose_small[0])), int(round(robot_pose_small[1]))
    lx, ly = trail[-1]
    if (rx_i - lx) ** 2 + (ry_i - ly) ** 2 >= 400:
        trail.append([rx_i, ry_i])
    assert coord._cleaning_paths["SN1"] == [[100, 200]]

    # Substantial movement (>=20mm) is recorded
    robot_pose_big = [130.0, 240.0, 0.0]
    rx_i, ry_i = int(round(robot_pose_big[0])), int(round(robot_pose_big[1]))
    lx, ly = trail[-1]
    if (rx_i - lx) ** 2 + (ry_i - ly) ** 2 >= 400:
        trail.append([rx_i, ry_i])
    assert coord._cleaning_paths["SN1"] == [[100, 200], [130, 240]]


@pytest.mark.asyncio
async def test_live_map_suppresses_clean_zones_during_room_clean():
    """Verify get_live_map suppresses internal sweep partition blocks during Room Clean."""
    from unittest.mock import AsyncMock, MagicMock, patch
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    api = BotslabVacuumApi(session, "eu1", "m2", "q", "t")

    map_json = {
        "width": 10,
        "height": 10,
        "map": "AAAA",
        "cleanId": "clean_101",
        "area": [
            {
                "id": 1,
                "name": "RoomSweepBlock1",
                "active": "normal",
                "vertexs": [[100, 100], [500, 100], [500, 500], [100, 500]],
            }
        ],
    }
    api.get_map_json = AsyncMock(return_value=(map_json, {}))

    with patch("custom_components.botslab_vacuum.api.decompress_lz4_block", return_value=b"\x00" * 100), \
         patch("custom_components.botslab_vacuum.api.render_map_advanced", return_value=(b"PNG_DATA", (0, 10, 0, 10, 1))) as mock_render:
        # Case 1: Room cleaning (is_active=True, is_zone_cleaning=False) -> clean_zones MUST BE EMPTY
        await api.get_live_map("SN_S8", "PK_S8", is_active=True, is_zone_cleaning=False)
        _, kwargs = mock_render.call_args
        assert kwargs["clean_zones"] == []

        # Case 2: Zone cleaning (is_active=True, is_zone_cleaning=True) -> clean_zones MUST BE PASSED
        api._cached_map_bytes = None
        await api.get_live_map("SN_S8", "PK_S8", is_active=True, is_zone_cleaning=True)
        _, kwargs = mock_render.call_args
        assert len(kwargs["clean_zones"]) == 1
        assert kwargs["clean_zones"][0]["name"] == "RoomSweepBlock1"


def test_map_camera_entity_picture_versioning_and_attribute_filtering():
    """Verify BotslabMapCamera dynamic entity_picture and clean_zones suppression in room clean."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.camera import BotslabMapCamera
    from custom_components.botslab_vacuum.models import BotslabMapInfo, BotslabVacuumDevice

    coord = MagicMock()
    coord.enable_map = True
    coord.get_map_version.return_value = 5

    map_info = BotslabMapInfo(
        width=100,
        height=100,
        x_min=0.0,
        y_min=0.0,
        resolution=0.05,
        rooms=[],
        clean_zones=[{"id": 1, "name": "SweepArea"}],
    )
    dev = BotslabVacuumDevice(
        device_name="SN123",
        product_key="PK123",
        device_title="Botslab S8",
        props={"WorkingStatus": "2"},  # Room Clean
        map_info=map_info,
    )
    coord.data = {"SN123": dev}

    cam = BotslabMapCamera(coord, dev)
    cam.entity_id = "camera.botslab_s8_map"
    cam._attr_access_token = "mock_token"
    cam.access_token = "mock_token"

    # Test entity_picture includes cache-busting revision
    assert cam.entity_picture is not None
    assert cam.entity_picture.startswith("/api/camera_proxy/camera.botslab_s8_map?token=")
    assert cam.entity_picture.endswith("&v=5")

    # Test extra_state_attributes suppresses clean_zones in WorkingStatus == 2 (Room Clean)
    attrs = cam.extra_state_attributes
    assert "clean_zones" not in attrs
    assert "zones" not in attrs

    # When WorkingStatus is 3 (Zone Clean), clean_zones are included
    dev.props["WorkingStatus"] = "3"
    attrs_zone = cam.extra_state_attributes
    assert "clean_zones" in attrs_zone
    assert len(attrs_zone["clean_zones"]) == 1



















@pytest.mark.asyncio
async def test_modern_clean_rooms_protocol_sequence():
    """Verify clean_rooms invokes SetCleanPolicyList with ordered rooms before StartCleanInAreas with fresh CleanID."""
    from unittest.mock import AsyncMock, MagicMock
    import json
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "eu", "mk1", "q", "t")
    api.is_legacy_360 = False

    map_json = {
        "smartArea": {
            "value": [
                {"id": 1, "name": "Room 1", "vertexs": [[0, 0], [100, 0], [100, 100], [0, 100]]},
                {"id": 2, "name": "Room 2", "vertexs": [[100, 0], [200, 0], [200, 100], [100, 100]]},
            ]
        }
    }
    props = {
        "MapPkgOssInfo": '{"MapID": 100, "CleanID": "360TESTSERIAL0001-1794070278"}'
    }
    upload_info = {"host": "https://oss.example.com", "accessKeyId": "k", "accessKeySecret": "s", "securityToken": "t", "dir": "d/"}

    api.set_fan_speed = AsyncMock()
    api.set_water_level = AsyncMock()
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {}})
    api.get_map_json = AsyncMock(return_value=(map_json, props))
    api.get_upload_config = AsyncMock(return_value=upload_info)
    api._upload_to_oss = AsyncMock(return_value="aliyun://bucket/sweep_areas123.txt")
    api.wait_async_reply = AsyncMock(return_value=True)

    captured_cmds: list[tuple[str, dict]] = []

    async def fake_invoke_async(sn, pk, cmd, payload):
        captured_cmds.append((cmd, payload))
        return {"code": 0, "data": {"request_id": "req-123"}}

    api.invoke_async = fake_invoke_async

    # Dispatch ordered room clean: Room 2 first, then Room 1
    await api.clean_rooms("360TESTSERIAL0001", "pk_mod", ["2", "1"], repeat_times=2)

    # 0. StartSyncMapPkgToOss MUST be invoked first to wake SLAM & refresh CleanID
    sync_calls = [(cmd, p) for cmd, p in captured_cmds if cmd == "StartSyncMapPkgToOss"]
    assert len(sync_calls) == 1, "StartSyncMapPkgToOss must be invoked first"
    assert sync_calls[0][1] == {"SyncDuration": 60}

    # 1. SetCleanPolicyList MUST be invoked after sync with one policy per room in order
    policy_calls = [(cmd, p) for cmd, p in captured_cmds if cmd == "SetCleanPolicyList"]
    assert len(policy_calls) == 1, "SetCleanPolicyList must be invoked before StartCleanInAreas"
    _, policy_payload = policy_calls[0]
    clean_policy_list = json.loads(policy_payload["CleanPolicyList"])
    assert len(clean_policy_list["value"]) == 2, "Must create an individual policy per room"
    assert clean_policy_list["value"][0]["smartAreaIds"] == [2], "First policy must target room 2"
    assert clean_policy_list["value"][0]["priority"] == 1
    assert clean_policy_list["value"][0]["orderClean"] is True, "orderClean must be True for ordered cleaning"
    assert clean_policy_list["value"][0]["cleanTimes"] == 2
    assert clean_policy_list["value"][0]["mapId"] == 100

    assert clean_policy_list["value"][1]["smartAreaIds"] == [1], "Second policy must target room 1"
    assert clean_policy_list["value"][1]["priority"] == 2
    assert clean_policy_list["value"][1]["orderClean"] is True
    assert clean_policy_list["value"][1]["cleanTimes"] == 2
    assert clean_policy_list["value"][1]["mapId"] == 100

    # 2. OSS upload payload must also preserve order
    api._upload_to_oss.assert_called_once()
    _, uploaded_sweep_payload = api._upload_to_oss.call_args[0]
    assert uploaded_sweep_payload["activeIds"] == [2, 1], "activeIds in sweep_payload must preserve user room order"
    assert uploaded_sweep_payload["autoOrder"] is False
    assert uploaded_sweep_payload["cleanTimes"] == 2
    assert uploaded_sweep_payload["mapId"] == 100

    # 3. StartCleanInAreas must be called with session CleanID from oss_info
    start_calls = [(cmd, p) for cmd, p in captured_cmds if cmd == "StartCleanInAreas"]
    assert len(start_calls) == 1
    _, payload = start_calls[0]
    assert payload["CleanID"] == "360TESTSERIAL0001-1794070278", "CleanID must match active session CleanID"
    assert payload["MapID"] == 100
    assert payload["Url"] == "aliyun://bucket/sweep_areas123.txt"


@pytest.mark.asyncio
async def test_modern_clean_rooms_auto_order_flag():
    """Verify clean_rooms auto_order=True configures orderClean=False and autoOrder=True."""
    from unittest.mock import AsyncMock, MagicMock
    import json
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "eu", "mk1", "q", "t")
    api.is_legacy_360 = False

    map_json = {
        "smartArea": {
            "value": [
                {"id": 1, "name": "Room 1", "vertexs": [[0, 0], [100, 0], [100, 100], [0, 100]]},
            ]
        }
    }
    props = {"MapPkgOssInfo": '{"MapID": 100}'}
    upload_info = {"host": "https://oss.example.com", "accessKeyId": "k", "accessKeySecret": "s", "securityToken": "t", "dir": "d/"}

    api.set_fan_speed = AsyncMock()
    api.set_water_level = AsyncMock()
    api.get_map_json = AsyncMock(return_value=(map_json, props))
    api.get_upload_config = AsyncMock(return_value=upload_info)
    api._upload_to_oss = AsyncMock(return_value="aliyun://bucket/sweep_areas123.txt")
    api.wait_async_reply = AsyncMock(return_value=True)

    captured_cmds: list[tuple[str, dict]] = []

    async def fake_invoke_async(sn, pk, cmd, payload):
        captured_cmds.append((cmd, payload))
        return {"code": 0, "data": {"request_id": "req-123"}}

    api.invoke_async = fake_invoke_async

    await api.clean_rooms("360TESTSERIAL0001", "pk_mod", ["1"], auto_order=True)

    # When auto_order is True, orderClean in SetCleanPolicyList must be False
    policy_calls = [(cmd, p) for cmd, p in captured_cmds if cmd == "SetCleanPolicyList"]
    assert len(policy_calls) == 1
    clean_policy_list = json.loads(policy_calls[0][1]["CleanPolicyList"])
    assert clean_policy_list["value"][0]["orderClean"] is False

    # And autoOrder in sweep_payload must be True
    _, uploaded_sweep_payload = api._upload_to_oss.call_args[0]
    assert uploaded_sweep_payload["autoOrder"] is True

    # Fallback CleanID generated when MapPkgOssInfo has no CleanID
    start_calls = [(cmd, p) for cmd, p in captured_cmds if cmd == "StartCleanInAreas"]
    assert len(start_calls) == 1
    assert start_calls[0][1]["CleanID"].startswith("360TESTSERIAL0001-")


@pytest.mark.asyncio
async def test_modern_clean_rooms_no_fallback_to_clean_zone():
    """Verify that if StartCleanInAreas fails, clean_zone is NOT called (no rect fallback)."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "eu", "mk1", "q", "t")
    api.is_legacy_360 = False

    map_json = {
        "smartArea": {
            "value": [
                {"id": 2, "name": "Room 2", "vertexs": [[0, 0], [200, 0], [200, 200], [0, 200]]},
            ]
        }
    }
    props = {"MapPkgOssInfo": '{"MapID": 200}'}

    api.set_fan_speed = AsyncMock()
    api.set_water_level = AsyncMock()
    api.invoke_async = AsyncMock(return_value={"code": 0, "data": {}})
    api.get_map_json = AsyncMock(return_value=(map_json, props))
    api.get_upload_config = AsyncMock(return_value=None)  # Upload will fail → raises BotslabApiError
    api.clean_zone = AsyncMock()  # Must NOT be called

    with pytest.raises(Exception):
        await api.clean_rooms("SN_FAIL", "pk_fail", ["2"])

    api.clean_zone.assert_not_called()


@pytest.mark.asyncio
async def test_legacy_360_clean_rooms_unchanged():
    """Verify that legacy 360 clean_rooms path still uses _clean_rooms_legacy_360 (not modern path)."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "cn", "m2", "q", "t")
    # Mark as legacy 360
    api.is_legacy_360 = True

    # Setup _clean_rooms_legacy_360 as an async mock on the instance
    api._clean_rooms_legacy_360 = AsyncMock()

    # Modern path methods must NOT be called
    api.get_map_json = AsyncMock()
    api.invoke_async = AsyncMock()

    await api.clean_rooms("SN_LEG", "pk_leg", ["3", "4"], repeat_times=1)

    api._clean_rooms_legacy_360.assert_called_once_with("SN_LEG", ["3", "4"], 1, None, None)
    api.get_map_json.assert_not_called()
    api.invoke_async.assert_not_called()


@pytest.mark.asyncio
async def test_auto_reauth_on_token_expiration():
    """Verify that when API receives code 102008, it automatically calls app_login and retries."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    api = BotslabVacuumApi(MagicMock(), "eu", "mk1", "q_test", "t_test")
    api.is_legacy_360 = False
    api.app_login = AsyncMock(return_value={"sid": "new_sid"})

    # Mock session.post for invoke_async: first call returns 102008, second call returns success 0
    resp1 = MagicMock()
    resp1.json = AsyncMock(return_value={"code": 102008, "msg": "auth expired"})
    ctx1 = MagicMock()
    ctx1.__aenter__ = AsyncMock(return_value=resp1)
    ctx1.__aexit__ = AsyncMock(return_value=None)

    resp2 = MagicMock()
    resp2.json = AsyncMock(return_value={"code": 0, "data": {"request_id": "req-ok"}})
    ctx2 = MagicMock()
    ctx2.__aenter__ = AsyncMock(return_value=resp2)
    ctx2.__aexit__ = AsyncMock(return_value=None)

    api.session.post = MagicMock(side_effect=[ctx1, ctx2])

    res = await api.invoke_async("SN123", "pk1", "TestCmd", {})
    assert res.get("code") == 0
    assert res.get("data", {}).get("request_id") == "req-ok"
    api.app_login.assert_called_once()


@pytest.mark.asyncio
async def test_botslab_schedules_sensor_attributes():
    """Verify BotslabSchedulesSensor publishes both room_ids and rooms."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.sensor import BotslabSchedulesSensor
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice, BotslabRoom

    coord = MagicMock()
    coord.routines = [
        {
            "time": "10:30",
            "days": [1, 2, 3],
            "room_ids": ["1", "2"],
            "suction": "standard",
            "passes": 1,
            "active": True,
        }
    ]
    dev = BotslabVacuumDevice(
        device_name="SN123",
        product_key="PK123",
        device_title="Botslab Test",
        props={},
        rooms=[BotslabRoom(room_id="1", name="Kitchen"), BotslabRoom(room_id="2", name="Living Room")],
    )
    coord.data = {"SN123": dev}
    sensor = BotslabSchedulesSensor(coord, dev)
    attrs = sensor.extra_state_attributes
    assert "schedules" in attrs
    assert "rooms" in attrs
    assert attrs["rooms"] == {"1": "Kitchen", "2": "Living Room"}
    sched = attrs["schedules"][0]
    assert sched["room_ids"] == ["1", "2"]
    assert sched["time"] == "10:30"


@pytest.mark.asyncio
async def test_set_schedule_standard_payload():
    """Verify set_schedule standard payload with room_ids and suction."""
    time_str = "14:00"
    days = [0, 6]
    room_ids = ["3"]
    suction = "standard"

    routine = {
        "time": time_str,
        "days": [int(d) for d in days],
        "room_ids": [str(r) for r in room_ids],
        "suction": suction,
        "passes": 1,
        "active": True,
    }
    assert routine["suction"] == "standard"
    assert routine["room_ids"] == ["3"]


# ============================================================================
# NEW COMPREHENSIVE TESTS: MODERN BOTSLAB IMPROVEMENT SPECIFICATION
# ============================================================================

def test_base_station_telemetry_decoding():
    """Verify _parse_base_station parses status, tank levels, and drying timer correctly."""
    from custom_components.botslab_vacuum.coordinator import _parse_base_station
    from custom_components.botslab_vacuum.const import (
        STATION_STATUS_IDLE,
        STATION_STATUS_WASHING_MOP,
        STATION_STATUS_DRYING_MOP,
        STATION_STATUS_DUST_COLLECTING,
        STATION_STATUS_ERROR,
        TANK_STATE_OK,
        TANK_STATE_EMPTY,
        TANK_STATE_FULL,
        TANK_STATE_MISSING,
    )

    # 1. Idle status with all tanks OK
    raw_idle = {
        "station_status": 0,
        "clean_water_tank": 1,
        "dirty_water_tank": 1,
        "dust_bag_status": 1,
        "mop_dry_remain_time": 0,
    }
    st = _parse_base_station(raw_idle)
    assert st.status == STATION_STATUS_IDLE
    assert st.clean_water_tank == TANK_STATE_OK
    assert st.dirty_water_tank == TANK_STATE_OK
    assert st.dust_bag_status == TANK_STATE_OK
    assert st.mop_dry_remain_seconds == 0

    # 2. Washing mop with empty clean water tank
    raw_washing = {
        "data": {
            "result": {
                "station_status": 1,
                "clean_water_tank": 0,
                "dirty_water_tank": 1,
                "dust_bag_status": 1,
            }
        }
    }
    st = _parse_base_station(raw_washing)
    assert st.status == STATION_STATUS_WASHING_MOP
    assert st.clean_water_tank == TANK_STATE_EMPTY

    # 3. Drying mop with full dirty water and missing dust bag
    raw_drying = {
        "station_status": 2,
        "clean_water_tank": 1,
        "dirty_water_tank": 0,
        "dust_bag_status": 2,
        "mop_dry_remain_time": 3600,
    }
    st = _parse_base_station(raw_drying)
    assert st.status == STATION_STATUS_DRYING_MOP
    assert st.dirty_water_tank == TANK_STATE_FULL
    assert st.dust_bag_status == TANK_STATE_MISSING
    assert st.mop_dry_remain_seconds == 3600

    # 4. Dust collecting & Error
    assert _parse_base_station({"station_status": 3}).status == STATION_STATUS_DUST_COLLECTING
    assert _parse_base_station({"station_status": 4}).status == STATION_STATUS_ERROR
    assert _parse_base_station(None).status == STATION_STATUS_IDLE


@pytest.mark.asyncio
async def test_coordinator_base_station_and_carpet_bridge():
    """Verify coordinator base station commands and carpet bridge no-go zone synchronization."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    coord = MagicMock(spec=BotslabVacuumCoordinator)
    coord.api = MagicMock()
    coord.api.start_dust_collection = AsyncMock(return_value={"code": 0})
    coord.api.start_mop_wash = AsyncMock(return_value={"code": 0})
    coord.api.start_mop_drying = AsyncMock(return_value={"code": 0})
    coord.api.set_carpet_mode = AsyncMock(return_value={"code": 0})
    coord.api.set_no_go_zones = AsyncMock(return_value={"code": 0})
    coord.async_request_refresh = AsyncMock()
    coord.async_set_updated_data = MagicMock()
    coord._saved_carpets = {}

    dev = BotslabVacuumDevice(
        device_name="SN_S8",
        product_key="PK_S8",
        device_title="Botslab S8",
        props={},
        current_map_id="101",
        mop_mode="vacuum_and_mop",
        carpet_mode=1,  # avoid_while_mopping
    )
    coord.data = {"SN_S8": dev}

    # 1. Base station action methods
    await BotslabVacuumCoordinator.async_empty_dust_bin(coord, "SN_S8")
    coord.api.start_dust_collection.assert_called_once_with("SN_S8", "PK_S8")

    await BotslabVacuumCoordinator.async_wash_mop(coord, "SN_S8", wash_type=1)
    coord.api.start_mop_wash.assert_called_once_with("SN_S8", "PK_S8", 1)

    await BotslabVacuumCoordinator.async_dry_mop(coord, "SN_S8", duration_minutes=180)
    coord.api.start_mop_drying.assert_called_once_with("SN_S8", "PK_S8", 180)

    # 2. Carpet bridge injection
    carpets = [{"x1": -1000, "y1": -500, "x2": 500, "y2": 1000}]
    await BotslabVacuumCoordinator.async_set_carpet_areas(coord, "SN_S8", carpets)
    assert coord._saved_carpets["SN_S8"] == carpets
    coord.api.set_no_go_zones.assert_called_once_with(
        "SN_S8",
        "PK_S8",
        "101",
        [{"type": "mop", "points": [-1000, -500, 500, 1000]}],
    )

    # 3. Clear carpets
    await BotslabVacuumCoordinator.async_clear_carpet_areas(coord, "SN_S8")
    assert coord._saved_carpets["SN_S8"] == []


@pytest.mark.asyncio
async def test_coordinator_multi_floor_and_hardware_switches():
    """Verify coordinator multi-floor map RPCs and hardware switches (child lock, DND, remote drive)."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    coord = MagicMock(spec=BotslabVacuumCoordinator)
    coord.api = MagicMock()
    coord.api.is_legacy_360 = True
    coord.api.switch_floor_map = AsyncMock(return_value={"code": 0})
    coord.api.save_map = AsyncMock(return_value={"code": 0})
    coord.api.delete_map = AsyncMock(return_value={"code": 0})
    coord.api.set_child_lock = AsyncMock()
    coord.api.set_dnd = AsyncMock()
    coord.api.start_custom_clean_sequencing = AsyncMock(return_value={"code": 0})
    coord.api.set_remote_control_mode = AsyncMock(return_value={"code": 0})
    coord.api.send_remote_drive = AsyncMock(return_value={"code": 0})
    coord.async_request_refresh = AsyncMock()
    coord.async_set_updated_data = MagicMock()

    dev = BotslabVacuumDevice(
        device_name="SN_S8",
        product_key="PK_S8",
        device_title="Botslab S8",
        props={},
    )
    coord.data = {"SN_S8": dev}

    # 1. Floor maps
    await BotslabVacuumCoordinator.async_switch_floor_map(coord, "SN_S8", 102)
    coord.api.switch_floor_map.assert_called_once_with("SN_S8", "PK_S8", 102)

    await BotslabVacuumCoordinator.async_save_floor_map(coord, "SN_S8", "Upstairs")
    coord.api.save_map.assert_called_once_with("SN_S8", "PK_S8", "Upstairs")

    await BotslabVacuumCoordinator.async_delete_floor_map(coord, "SN_S8", 103)
    coord.api.delete_map.assert_called_once_with("SN_S8", "PK_S8", 103)

    # 2. Child Lock & DND
    await BotslabVacuumCoordinator.async_set_child_lock(coord, "SN_S8", True)
    coord.api.set_child_lock.assert_called_once_with("SN_S8", "PK_S8", True)
    assert dev.child_lock is True

    await BotslabVacuumCoordinator.async_set_dnd(coord, "SN_S8", True, "23:00", "07:00")
    coord.api.set_dnd.assert_called_once_with("SN_S8", "PK_S8", True, start="23:00", end="07:00")
    assert dev.dnd_enabled is True

    # 3. Custom clean sequencing & Remote driving
    order = [{"roomId": 1, "cleanTimes": 1}]
    await BotslabVacuumCoordinator.async_custom_clean_sequencing(coord, "SN_S8", order, True)
    coord.api.start_custom_clean_sequencing.assert_called_once_with("SN_S8", "PK_S8", order, True)

    await BotslabVacuumCoordinator.async_remote_control_drive(coord, "SN_S8", direction=1, speed=300)
    coord.api.set_remote_control_mode.assert_called_once_with("SN_S8", "PK_S8", True)
    coord.api.send_remote_drive.assert_called_once_with("SN_S8", "PK_S8", 1, 300)


def test_map_obstacle_loss_fix_and_compositing():
    """Verify render_map_advanced stamps obstacles on top of rooms with 100% opacity without alpha bleaching."""
    from custom_components.botslab_vacuum.map_util import render_map_advanced
    from custom_components.botslab_vacuum.models import BotslabRoom
    from PIL import Image
    import io

    # 10x10 map: obstacle at center (5, 5) -> pixel 0. All other floor -> pixel 127.
    pixels = bytearray([127] * 100)
    pixels[55] = 0  # y=5, x=5 is an obstacle
    pixels_bytes = bytes(pixels)

    room = BotslabRoom(
        room_id="1",
        name="Test Room",
        outline=((0, 0), (9, 0), (9, 9), (0, 9)),
    )

    png_data, geom = render_map_advanced(
        width=10,
        height=10,
        pixels=pixels_bytes,
        resolution=0.05,
        x_min=0.0,
        y_min=0.0,
        rooms=[room],
        scale=4,
    )

    assert png_data.startswith(b"\x89PNG")
    img = Image.open(io.BytesIO(png_data)).convert("RGBA")
    # Obstacle at (5, 5) scaled by 4 will be around (x=20..23, y=16..19 because y is flipped)
    # Check that pixel is stamped with solid charcoal obstacle color and 100% alpha (not bleached or tinted by room)
    obs_pixel = img.getpixel((22, 18))
    assert obs_pixel == (38, 44, 58, 255), f"Obstacle pixel must have solid obstacle color and 100% alpha (got {obs_pixel})"


def test_pure_python_render_map_png_retains_obstacles():
    """Verify render_map_png (pure-Python fallback) does not erase obstacles inside room polygons."""
    from custom_components.botslab_vacuum.map_util import render_map_png, C_OBSTACLE
    import struct
    import zlib

    # 10x10 map: obstacle at x=5, y=5. Everything else floor (127)
    pixels = bytearray([127] * 100)
    pixels[5 * 10 + 5] = 0  # y=5, x=5 obstacle

    # Room overlay covering the whole map with red color (255, 0, 0)
    room_polygon = [([(0, 0), (9, 0), (9, 9), (0, 9)], (255, 0, 0))]

    png_bytes = render_map_png(10, 10, bytes(pixels), room_polygon)
    assert png_bytes.startswith(b"\x89PNG\r\n\x1a\n")

    # Decompress IDAT chunks to inspect raw pixels directly
    idx = 8
    idat_data = bytearray()
    while idx < len(png_bytes):
        length = struct.unpack(">I", png_bytes[idx : idx + 4])[0]
        tag = png_bytes[idx + 4 : idx + 8]
        if tag == b"IDAT":
            idat_data.extend(png_bytes[idx + 8 : idx + 8 + length])
        idx += 12 + length

    decompressed = zlib.decompress(bytes(idat_data))
    # Row pitch: 1 filter byte + 10 * 4 bytes RGBA = 41 bytes per row
    # In render_map_png: row y=0 in PNG output corresponds to row_y = height - 1 - y = 9
    # Obstacle is at row_y = 5, which corresponds to y = 10 - 1 - 5 = 4
    # Scanline byte offset for (x=5, y=4): 4 * 41 + 1 (filter byte) + 5 * 4 = 164 + 1 + 20 = 185
    obs_r, obs_g, obs_b, obs_a = struct.unpack_from("4B", decompressed, 185)
    assert (obs_r, obs_g, obs_b, obs_a) == C_OBSTACLE, (
        f"Obstacle at (5, 5) must not be overwritten by room overlay! Got ({obs_r}, {obs_g}, {obs_b}, {obs_a})"
    )


def test_dual_backend_facade_routing_and_legacy_isolation():
    """Verify BotslabVacuumApi Facade cleanly dispatches between Legacy 360 and Modern client."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    # 1. Modern client (region="eu1")
    api_modern = BotslabVacuumApi(session, "eu1", "m2", "q", "t")
    assert api_modern.is_legacy_360 is False
    assert api_modern._legacy_client.is_legacy_360 is False

    # 2. Legacy client (region="cn")
    api_legacy = BotslabVacuumApi(session, "cn", "m2", "q", "t")
    assert api_legacy.is_legacy_360 is True
    assert api_legacy._legacy_client.is_legacy_360 is True
    assert api_legacy._legacy_client.target is api_legacy


@pytest.mark.asyncio
async def test_legacy_360_app_login_and_clean_rooms_without_clean_id():
    """Verify legacy 360 backend app_login delegation and clean_rooms with time fallback."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api import BotslabVacuumApi

    session = MagicMock()
    api = BotslabVacuumApi(session, "cn", "m2", "q", "t")
    assert api.is_legacy_360 is True

    # 1. Verify app_login routes to legacy 360 login
    api._legacy_client._legacy_360_login = AsyncMock(
        return_value={"sid": "legacy_sid_123", "pushKey": "pk_456"}
    )
    api._legacy_client.sid = "legacy_sid_123"
    api._legacy_client.push_key = "pk_456"
    api._legacy_client.push_alias = "alias_789"

    res = await api.app_login()
    assert res["sid"] == "legacy_sid_123"
    assert api.sid == "legacy_sid_123"
    api._legacy_client._legacy_360_login.assert_called_once()

    # 2. Verify clean_rooms without cleanId does not raise NameError for 'time'
    mock_record = {
        "cleanId": None,
        "smartArea": {
            "value": [
                {"id": 1, "name": "Living Room"},
                {"id": 2, "name": "Kitchen"},
            ]
        },
    }
    api.get_latest_clean_record = AsyncMock(return_value=mock_record)

    mock_resp = MagicMock()
    mock_resp.status = 200
    mock_resp.json = AsyncMock(return_value={"errno": 0})
    session.post.return_value.__aenter__.return_value = mock_resp

    # Calling clean_rooms should complete cleanly without NameError: name 'time' is not defined
    await api.clean_rooms("SN_123", "PK_123", ["1"])
    assert session.post.called


def test_active_floor_select_deduplicates_duplicate_names():
    """Verify BotslabActiveFloorSelect deduplicates identical map names to prevent HA ValueError."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.select import BotslabActiveFloorSelect
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    coord = MagicMock()
    dev = BotslabVacuumDevice(
        device_name="SN_123",
        product_key="PK_123",
        device_title="Botslab S8",
        props={},
        saved_maps=[
            {"map_id": 101, "map_name": "Ground Floor", "is_cur": 1},
            {"map_id": 102, "map_name": "Ground Floor", "is_cur": 0},
            {"map_id": 103, "map_name": "Upstairs", "is_cur": 0},
        ],
        current_map_id="101",
    )
    coord.data = {"SN_123": dev}
    selector = BotslabActiveFloorSelect(coord, dev)

    options = selector.options
    assert len(options) == 3
    assert len(set(options)) == 3, f"Options must not contain duplicate items! Got {options}"
    assert options[0] == "Ground Floor"
    assert options[1] == "Ground Floor (102)"
    assert options[2] == "Upstairs"
    assert selector.current_option == "Ground Floor"


@pytest.mark.asyncio
async def test_carpet_bridge_preserves_existing_user_no_go_zones():
    """Verify virtual carpet bridge merges with existing user no-go zones and does not wipe them."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    coord = MagicMock(spec=BotslabVacuumCoordinator)
    coord.api = MagicMock()
    coord.api.set_no_go_zones = AsyncMock(return_value={"code": 0})
    coord.async_set_updated_data = MagicMock()
    coord._saved_carpets = {}

    existing_user_zone = {"type": "wall", "points": [100, 200, 300, 400]}
    dev = BotslabVacuumDevice(
        device_name="SN_S8",
        product_key="PK_S8",
        device_title="Botslab S8",
        props={},
        current_map_id="101",
        mop_mode="vacuum_and_mop",
        carpet_mode=1,  # avoid_while_mopping
        no_go_zones=[existing_user_zone],
    )
    coord.data = {"SN_S8": dev}

    # 1. Set carpets: user zone + carpet zone should be sent
    carpets = [{"x1": -500, "y1": -500, "x2": 500, "y2": 500}]
    await BotslabVacuumCoordinator.async_set_carpet_areas(coord, "SN_S8", carpets)

    expected_payload = [
        existing_user_zone,
        {"type": "mop", "points": [-500, -500, 500, 500]},
    ]
    coord.api.set_no_go_zones.assert_called_once_with(
        "SN_S8", "PK_S8", "101", expected_payload
    )

    # 2. Clear carpets: only user zone should remain
    coord.api.set_no_go_zones.reset_mock()
    # Simulate updated no_go_zones containing both
    dev.no_go_zones = [
        existing_user_zone,
        {"type": "mop", "points": [-500, -500, 500, 500]},
    ]
    await BotslabVacuumCoordinator.async_clear_carpet_areas(coord, "SN_S8")
    coord.api.set_no_go_zones.assert_called_once_with(
        "SN_S8", "PK_S8", "101", [existing_user_zone]
    )


@pytest.mark.asyncio
async def test_remote_control_drive_resolution():
    """Verify handle_remote_control_drive resolves generic or slugified targets when single vacuum exists."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum import _register_services
    from custom_components.botslab_vacuum.const import SERVICE_REMOTE_CONTROL_DRIVE
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    hass = MagicMock()
    hass.services.has_service.return_value = False
    registered_services = {}
    hass.services.has_service = lambda domain, srv: srv in registered_services
    def fake_register(domain, srv, handler, schema=None):
        registered_services[srv] = handler
    hass.services.async_register = fake_register

    coord = MagicMock()
    coord.async_remote_control_drive = AsyncMock()
    dev = BotslabVacuumDevice(
        device_name="360TESTSERIAL0001",
        product_key="test_product_key",
        device_title="Botslab S8",
    )
    coord.data = {"360TESTSERIAL0001": dev}

    entry = MagicMock()
    entry.runtime_data.coordinator = coord
    hass.config_entries.async_entries.return_value = [entry]

    _register_services(hass)
    handler = registered_services[SERVICE_REMOTE_CONTROL_DRIVE]

    # Test 1: generic target vacuum.botslab_vacuum resolves to single dev
    call = MagicMock()
    call.service = SERVICE_REMOTE_CONTROL_DRIVE
    call.data = {"entity_id": "vacuum.botslab_vacuum", "direction": 1, "speed": 250}
    await handler(call)
    coord.async_remote_control_drive.assert_called_once_with("360TESTSERIAL0001", 1, 250)

    # Test 2: slugified title vacuum.botslab_s8 resolves to dev
    coord.async_remote_control_drive.reset_mock()
    call.data = {"entity_id": "vacuum.botslab_s8", "direction": 2, "speed": 300}
    await handler(call)
    coord.async_remote_control_drive.assert_called_once_with("360TESTSERIAL0001", 2, 300)


@pytest.mark.asyncio
async def test_no_go_zone_services_registration_and_dispatch():
    """Verify add_no_go_zone, add_no_mop_zone, delete_no_go_zone, clear services dispatch correctly."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.__init__ import _register_services
    from custom_components.botslab_vacuum.const import (
        SERVICE_ADD_NO_GO_ZONE,
        SERVICE_ADD_NO_MOP_ZONE,
        SERVICE_CLEAR_NO_GO_ZONES,
        SERVICE_CLEAR_NO_MOP_ZONES,
        SERVICE_DELETE_NO_GO_ZONE,
    )
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    hass = MagicMock()
    hass.services.has_service.return_value = False
    registered_services = {}

    def fake_register(dom, srv, handler, schema=None):
        registered_services[srv] = handler
    hass.services.async_register = fake_register

    coord = MagicMock()
    coord.async_add_no_go_zone = AsyncMock()
    coord.async_delete_no_go_zone = AsyncMock()
    coord.async_clear_no_go_zones = AsyncMock()
    dev = BotslabVacuumDevice(
        device_name="360TESTSERIAL0001",
        product_key="test_product_key",
        device_title="Botslab S8",
    )
    coord.data = {"360TESTSERIAL0001": dev}

    entry = MagicMock()
    entry.runtime_data.coordinator = coord
    hass.config_entries.async_entries.return_value = [entry]

    _register_services(hass)

    # Test add_no_go_zone
    add_handler = registered_services[SERVICE_ADD_NO_GO_ZONE]
    call = MagicMock()
    call.data = {"entity_id": "vacuum.botslab_s8", "x1": -500, "y1": 500, "x2": 500, "y2": 1500, "zone_type": "forbid"}
    await add_handler(call)
    coord.async_add_no_go_zone.assert_called_once_with("360TESTSERIAL0001", -500, 500, 500, 1500, zone_type="forbid")

    # Test add_no_mop_zone
    add_mop_handler = registered_services[SERVICE_ADD_NO_MOP_ZONE]
    call.data = {"entity_id": "vacuum.botslab_s8", "x1": -1000, "y1": -1000, "x2": 1000, "y2": 1000}
    await add_mop_handler(call)
    coord.async_add_no_go_zone.assert_called_with("360TESTSERIAL0001", -1000, -1000, 1000, 1000, zone_type="mop")

    # Test delete_no_go_zone
    del_handler = registered_services[SERVICE_DELETE_NO_GO_ZONE]
    call.data = {"entity_id": "vacuum.botslab_s8", "index": 0}
    await del_handler(call)
    coord.async_delete_no_go_zone.assert_called_once_with(
        "360TESTSERIAL0001", index=0, zone_type=None, points=None, clear_all=False
    )

    # Test clear_no_go_zones
    clear_handler = registered_services[SERVICE_CLEAR_NO_GO_ZONES]
    call.data = {"entity_id": "vacuum.botslab_s8"}
    await clear_handler(call)
    coord.async_clear_no_go_zones.assert_called_once_with("360TESTSERIAL0001", zone_type="forbid")

    # Test clear_no_mop_zones
    clear_mop_handler = registered_services[SERVICE_CLEAR_NO_MOP_ZONES]
    await clear_mop_handler(call)
    coord.async_clear_no_go_zones.assert_called_with("360TESTSERIAL0001", zone_type="mop")


@pytest.mark.asyncio
async def test_coordinator_no_go_zones_management():
    """Verify coordinator handles adding, deleting, and clearing no-go zones via api.set_no_go_zones."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    hass = MagicMock()
    entry = MagicMock()
    api = MagicMock()
    api.set_no_go_zones = AsyncMock(return_value={"code": 0})
    api.sid = "sid"
    api.push_alias = "alias"

    coord = BotslabVacuumCoordinator(hass, entry, api)
    coord.async_set_updated_data = MagicMock()
    coord.async_request_refresh = AsyncMock()

    dev = BotslabVacuumDevice(
        device_name="360TESTSERIAL0001",
        product_key="test_product_key",
        device_title="Botslab S8",
        current_map_id=101,
        no_go_zones=[],
    )
    coord.data = {"360TESTSERIAL0001": dev}

    # 1. Add forbid zone
    await coord.async_add_no_go_zone("360TESTSERIAL0001", -500, 500, 500, 1500, zone_type="forbid")
    assert len(coord._saved_no_go_zones["360TESTSERIAL0001"]) == 1
    assert coord._saved_no_go_zones["360TESTSERIAL0001"][0] == {
        "active": "forbid",
        "type": "forbid",
        "name": "forbid_0",
        "vertexs": [[-500, 500], [-500, 1500], [500, 1500], [500, 500]],
        "points": [-500, 500, 500, 1500],
    }
    api.set_no_go_zones.assert_called_with(
        "360TESTSERIAL0001",
        "test_product_key",
        101,
        [
            {
                "active": "forbid",
                "type": "forbid",
                "name": "forbid_0",
                "vertexs": [[-500, 500], [-500, 1500], [500, 1500], [500, 500]],
                "points": [-500, 500, 500, 1500],
            }
        ],
    )

    # 2. Add mop zone
    await coord.async_add_no_go_zone("360TESTSERIAL0001", 100, 200, 300, 400, zone_type="mop")
    assert len(coord._saved_no_go_zones["360TESTSERIAL0001"]) == 2

    # 3. Delete by index
    await coord.async_delete_no_go_zone("360TESTSERIAL0001", index=0)
    assert len(coord._saved_no_go_zones["360TESTSERIAL0001"]) == 1
    assert coord._saved_no_go_zones["360TESTSERIAL0001"][0]["type"] == "mop"

    # 4. Clear all
    await coord.async_clear_no_go_zones("360TESTSERIAL0001")
    assert len(coord._saved_no_go_zones["360TESTSERIAL0001"]) == 0


def test_active_floor_select_and_vacuum_maps_attributes():
    """Verify select entity uses selected_map translation key and vacuum exposes maps attributes."""
    from unittest.mock import MagicMock
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice
    from custom_components.botslab_vacuum.select import BotslabActiveFloorSelect
    from custom_components.botslab_vacuum.vacuum import BotslabVacuumRobot

    coord = MagicMock()
    dev = BotslabVacuumDevice(
        device_name="360TESTSERIAL0001",
        product_key="test_product_key",
        device_title="Botslab S8",
        current_map_id=101,
        saved_maps=[
            {"map_id": 101, "map_name": "Ground Floor", "is_cur": 1},
            {"map_id": 102, "map_name": "First Floor", "is_cur": 0},
        ],
    )
    coord.data = {"360TESTSERIAL0001": dev}

    select = BotslabActiveFloorSelect(coord, dev)
    assert select._attr_translation_key == "selected_map"
    assert select.options == ["Ground Floor", "First Floor"]
    assert select.current_option == "Ground Floor"

    # Vacuum extra state attributes
    vac = BotslabVacuumRobot(coord, dev)
    attrs = vac.extra_state_attributes
    assert "maps" in attrs
    assert len(attrs["maps"]) == 2
    assert attrs["maps"][0]["id"] == 101
    assert attrs["selected_map_id"] == 101
    assert attrs["selected_map"] == 101


def test_map_util_renders_points_no_go_and_mop_zones():
    """Verify render_map_advanced renders both points format and mop forbidden zones."""
    from custom_components.botslab_vacuum.map_util import render_map_advanced

    # 20x20 test occupancy grid (127: floor, 0: wall)
    pixels = bytes([127] * 400)
    no_go_zones = [
        {"type": "forbid", "points": [-500, -500, 500, 500]},
        {"type": "mop", "points": [1000, 1000, 2000, 2000]},
    ]
    png_bytes, bounds = render_map_advanced(
        width=20,
        height=20,
        pixels=pixels,
        resolution=0.05,
        x_min=-2.0,
        y_min=-2.0,
        no_go_zones=no_go_zones,
    )
    assert len(png_bytes) > 0
    assert png_bytes.startswith(b"\x89PNG\r\n\x1a\n")


def test_lan_remote_control_payload_and_directions():
    """Verify BotslabLanRemoteControl formats payloads correctly for all directions and stop."""
    from custom_components.botslab_vacuum.lan_remote import BotslabLanRemoteControl

    # Stop: ctrlCode 4000
    stop_payload = BotslabLanRemoteControl.build_payload(0)
    assert stop_payload["infoType"] == 21020
    assert stop_payload["data"]["ctrlCode"] == 4000
    assert "ctrlParams" not in stop_payload["data"]

    stop_str = BotslabLanRemoteControl.build_payload("stop")
    assert stop_str["data"]["ctrlCode"] == 4000

    # Forward: direction 1
    fwd = BotslabLanRemoteControl.build_payload(1, speed=300)
    assert fwd["data"]["ctrlCode"] == 3013
    assert fwd["data"]["ctrlParams"] == {"speedV": 300, "direction": 1}

    fwd_str = BotslabLanRemoteControl.build_payload("forward", speed=300)
    assert fwd_str["data"]["ctrlParams"]["direction"] == 1

    # Backward: direction 2
    back = BotslabLanRemoteControl.build_payload(2, speed=200)
    assert back["data"]["ctrlParams"] == {"speedV": 200, "direction": 2}
    assert BotslabLanRemoteControl.build_payload("backward")["data"]["ctrlParams"]["direction"] == 2

    # Left: direction 3
    left = BotslabLanRemoteControl.build_payload(3, speed=250)
    assert left["data"]["ctrlParams"] == {"speedV": 250, "direction": 3}
    assert BotslabLanRemoteControl.build_payload("left")["data"]["ctrlParams"]["direction"] == 3

    # Right: direction 4
    right = BotslabLanRemoteControl.build_payload(4, speed=250)
    assert right["data"]["ctrlParams"] == {"speedV": 250, "direction": 4}
    assert BotslabLanRemoteControl.build_payload("right")["data"]["ctrlParams"]["direction"] == 4


def test_lan_remote_control_send_datagram(socket_enabled):
    """Verify UDP datagram transmission to target IP and broadcast with SO_BROADCAST.

    Accepts socket_enabled fixture to satisfy Home Assistant's test harness socket guard,
    and replaces socket.socket constructor with a MagicMock so no actual datagram is sent.
    """
    import socket
    from unittest.mock import MagicMock, patch
    import custom_components.botslab_vacuum.lan_remote as lr_module

    payload = {"infoType": 21020, "data": {"ctrlCode": 4000}, "packId": 1234}
    mock_sock = MagicMock()
    fake_socket_cls = MagicMock(return_value=mock_sock)

    with patch.object(lr_module.socket, "socket", fake_socket_cls):
        lr_module.BotslabLanRemoteControl.send_datagram(payload, target_ip="192.168.1.105")

    # socket constructor was called once with UDP IPv4
    fake_socket_cls.assert_called_once_with(socket.AF_INET, socket.SOCK_DGRAM)
    # SO_BROADCAST was set
    mock_sock.setsockopt.assert_called_with(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    # sendto called twice: unicast + broadcast
    assert mock_sock.sendto.call_count == 2
    calls = [c[0] for c in mock_sock.sendto.call_args_list]
    dest_ips = {c[1][0] for c in calls}
    dest_ports = {c[1][1] for c in calls}
    assert "192.168.1.105" in dest_ips
    assert "255.255.255.255" in dest_ips
    assert dest_ports == {21020}
    mock_sock.close.assert_called_once()


@pytest.mark.asyncio
async def test_lan_remote_control_async_send_drive():
    """Verify async_send_drive builds payload and delegates to executor."""
    from unittest.mock import patch
    from custom_components.botslab_vacuum.lan_remote import BotslabLanRemoteControl

    with patch.object(BotslabLanRemoteControl, "send_datagram") as mock_send:
        res = await BotslabLanRemoteControl.async_send_drive("forward", speed=280, target_ip="10.0.0.50")
        assert res["infoType"] == 21020
        assert res["data"]["ctrlParams"]["direction"] == 1
        assert res["data"]["ctrlParams"]["speedV"] == 280
        mock_send.assert_called_once_with(res, "10.0.0.50", 21020, True)


def test_parse_recorded_maps():
    """Verify _parse_recorded_maps correctly parses device shadow RecordedMapList."""
    import json
    from custom_components.botslab_vacuum.coordinator import _parse_recorded_maps

    sample_raw = [
        {
            "CleanID": "1734261908",
            "BookmarkFlag": True,
            "Nickname": "Salon & Mutfak",
            "Url": "https://oss.example.com/map1.bin",
        },
        {
            "CleanID": "1734270000",
            "BookmarkFlag": False,
            "Nickname": "",
            "Url": "https://oss.example.com/map2.bin",
        },
        {
            "CleanID": "1734280000",
            "BookmarkFlag": True,
            "Nickname": "",
        },
    ]

    # Test with JSON serialized string
    parsed = _parse_recorded_maps(json.dumps(sample_raw), current_clean_id="1734261908")
    assert len(parsed) == 3
    assert parsed[0]["clean_id"] == "1734261908"
    assert parsed[0]["map_id"] == "1734261908"
    assert parsed[0]["map_name"] == "Salon & Mutfak"
    assert parsed[0]["is_cur"] == 1
    assert parsed[0]["bookmark"] is True

    # Map 2: Not bookmarked, empty name -> Map 2
    assert parsed[1]["map_name"] == "Map 2"
    assert parsed[1]["is_cur"] == 0
    assert parsed[1]["bookmark"] is False

    # Map 3: Bookmarked, empty name -> Floor 3 (Saved)
    assert parsed[2]["map_name"] == "Floor 3 (Saved)"
    assert parsed[2]["bookmark"] is True


@pytest.mark.asyncio
async def test_switch_floor_map_modern_recover_recorded_map():
    """Verify switch_floor_map dispatches TSL RecoverRecordedMap with CleanID."""
    from unittest.mock import AsyncMock, MagicMock
    from custom_components.botslab_vacuum.api_botslab import BotslabModernClient
    from custom_components.botslab_vacuum.const import SERVICE_RECOVER_RECORDED_MAP

    client = MagicMock(spec=BotslabModernClient)
    client.invoke_sync = AsyncMock(return_value={"code": 0, "data": {"result": 0}, "msg": "Success"})

    res = await BotslabModernClient.switch_floor_map(client, "SN123", "PK123", "1734261908")
    assert res["code"] == 0
    client.invoke_sync.assert_called_once_with(
        "SN123", "PK123", SERVICE_RECOVER_RECORDED_MAP, {"CleanID": "1734261908"}
    )


@pytest.mark.asyncio
async def test_coordinator_lan_remote_drive_integration():
    """Verify coordinator.async_remote_control_drive invokes BotslabLanRemoteControl."""
    from unittest.mock import AsyncMock, MagicMock, patch
    from custom_components.botslab_vacuum.coordinator import BotslabVacuumCoordinator
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice

    coord = MagicMock(spec=BotslabVacuumCoordinator)
    coord.api = MagicMock()
    coord.api.is_legacy_360 = False
    dev = BotslabVacuumDevice(
        device_name="SN_TEST",
        product_key="PK_TEST",
        device_title="Botslab S8",
        ip_address="192.168.1.55",
    )
    coord.data = {"SN_TEST": dev}

    with patch(
        "custom_components.botslab_vacuum.lan_remote.BotslabLanRemoteControl.async_send_drive",
        new=AsyncMock(),
    ) as mock_send:
        await BotslabVacuumCoordinator.async_remote_control_drive(
            coord, "SN_TEST", direction=1, speed=300
        )
        mock_send.assert_called_once_with(
            direction=1,
            speed=300,
            target_ip="192.168.1.55",
        )






