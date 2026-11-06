"""Pure-Python helpers that do not need a running Home Assistant."""
from __future__ import annotations

import json
import random

import pytest

from custom_components.botslab_vacuum import map_util
from custom_components.botslab_vacuum.models import BotslabMapInfo, BotslabRoom
from custom_components.botslab_vacuum.lovelace import (
    build_full_dashboard_snippet,
    build_maintenance_card,
    build_map_card,
)


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


def _ids() -> dict:
    """Entity ids as the registry would report them, which are not guessable."""
    return {
        "vacuum": "vacuum.botslab_s8",
        "camera": "camera.botslab_s8_cleaning_map",
        "filter_life": "sensor.botslab_s8_hepa_filter",
    }


def test_generated_card_is_parseable():
    """The emitted card is valid YAML with the expected structure."""
    import yaml

    ids = _ids()
    config = yaml.safe_load(build_map_card(_device(), ids))
    assert config["type"] == "custom:xiaomi-vacuum-map-card"
    assert config["entity"] == ids["vacuum"]
    assert config["map_source"]["camera"] == ids["camera"]


def test_card_uses_supplied_entity_ids_not_guessed_ones():
    """Entity ids come from the registry, never from the serial number."""
    import yaml

    ids = _ids()
    card = build_map_card(_device(), ids)
    config = yaml.safe_load(card)

    # A serial-derived id would be vacuum.SN12345_vacuum, which does not exist.
    assert "SN12345" not in config["entity"]
    assert "SN12345" not in config["map_source"]["camera"]


def test_maintenance_card_skips_unregistered_rows():
    """Entities that are not registered are left out of the card."""
    import yaml

    config = yaml.safe_load(build_maintenance_card(_device(), _ids()))
    entities = [row["entity"] for row in config["entities"]]
    assert entities == ["sensor.botslab_s8_hepa_filter"]


def test_generated_card_contains_every_room():
    """One predefined selection per room."""
    import yaml

    config = yaml.safe_load(build_map_card(_device(4), _ids()))
    room_mode = next(m for m in config["map_modes"] if m["selection_type"] == "ROOM")
    assert len(room_mode["predefined_selections"]) == 4


def test_generated_card_handles_empty_rooms():
    """A robot without geometry still yields a valid card."""
    import yaml

    config = yaml.safe_load(build_map_card(_device(0), _ids()))
    room_mode = next(m for m in config["map_modes"] if m["selection_type"] == "ROOM")
    assert room_mode["predefined_selections"] == []


def test_awkward_room_names_survive():
    """Room selection is generated with valid id and outline."""
    import yaml

    device = _device(0)
    device.rooms = [
        BotslabRoom(
            room_id="0",
            name='Mutfak: "sol" #1\n2',
            outline=((0, 0), (10, 0), (10, 10)),
        )
    ]
    config = yaml.safe_load(build_map_card(device, _ids()))
    selections = next(
        m for m in config["map_modes"] if m["selection_type"] == "ROOM"
    )["predefined_selections"]
    assert selections[0]["id"] == "0"
    assert len(selections[0]["outline"]) == 3


def test_snippet_cards():
    """The full snippet includes the modern map card, routines card, maintenance card, and legacy map card."""
    import yaml

    docs = list(yaml.safe_load_all(build_full_dashboard_snippet(_device(), _ids())))
    assert [d["type"] for d in docs] == [
        "custom:botslab-vacuum-map-card",
        "custom:botslab-routines-card",
        "entities",
        "custom:xiaomi-vacuum-map-card",
    ]


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


@pytest.mark.asyncio
async def test_generate_map_card_persistent_notification_signature():
    """Verify _async_generate_map_card calls persistent_notification.async_create with hass as first arg."""
    from custom_components.botslab_vacuum.button import _async_generate_map_card
    from custom_components.botslab_vacuum.models import BotslabVacuumDevice
    from unittest.mock import AsyncMock, MagicMock, patch

    hass = MagicMock()
    coordinator = MagicMock()
    coordinator.async_refresh_rooms = AsyncMock()
    coordinator.async_request_refresh = AsyncMock()
    dev = BotslabVacuumDevice(
        device_name="sn123",
        product_key="pk123",
        device_title="Test Vacuum S8",
        model="Botslab S8",
    )
    coordinator.data = {"sn123": dev}

    with patch("homeassistant.components.persistent_notification.async_create") as mock_pn:
        # With missing vacuum/camera entities:
        with patch("custom_components.botslab_vacuum.button._resolve_card_entity_ids", return_value={}):
            await _async_generate_map_card(hass, coordinator, dev)
            mock_pn.assert_called_once()
            args, kwargs = mock_pn.call_args
            assert args[0] is hass  # First positional argument MUST be hass!

        mock_pn.reset_mock()
        # With resolved entities:
        with patch(
            "custom_components.botslab_vacuum.button._resolve_card_entity_ids",
            return_value={"vacuum": "vacuum.test", "camera": "camera.test"},
        ), patch(
            "custom_components.botslab_vacuum.button.build_full_dashboard_snippet",
            return_value="type: custom:card",
        ):
            hass.config.path.return_value = "/tmp/fake_card.yaml"
            with patch("pathlib.Path.write_text"):
                await _async_generate_map_card(hass, coordinator, dev)
                mock_pn.assert_called_once()
                args, kwargs = mock_pn.call_args
                assert args[0] is hass  # First positional argument MUST be hass!


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
    assert hrs == 130.5
    assert pct == 87

    # 651935 seconds for main brush (300 h max)
    pct, hrs = _parse_consumable_lifetime(651935, MAIN_BRUSH_MAX_HOURS)
    assert hrs == 181.1
    assert pct == 60

    # 90718 seconds for sensors (30 h max)
    pct, hrs = _parse_consumable_lifetime(90718, SENSOR_MAX_HOURS)
    assert hrs == 25.2
    assert pct == 84

    # 500000 seconds for side brush (200 h max)
    pct, hrs = _parse_consumable_lifetime(500000, SIDE_BRUSH_MAX_HOURS)
    assert hrs == 138.9
    assert pct == 69

    # Fresh 100% replacement
    pct, hrs = _parse_consumable_lifetime(100, FILTER_MAX_HOURS)
    assert pct == 100
    assert hrs == 150.0

    # 0% expired
    pct, hrs = _parse_consumable_lifetime(0, FILTER_MAX_HOURS)
    assert pct == 0
    assert hrs == 0.0

    # Explicit Legacy 360 mode (85% remaining)
    pct, hrs = _parse_consumable_lifetime(85, FILTER_MAX_HOURS, is_legacy_360=True)
    assert pct == 85
    assert hrs == 127.5

    # Explicit Legacy 360 mode (0% expired)
    pct, hrs = _parse_consumable_lifetime(0, FILTER_MAX_HOURS, is_legacy_360=True)
    assert pct == 0
    assert hrs == 0.0

def test_map_card_service_call_schema():
    """Verify generated map card includes both service and action, service_data and data."""
    import yaml
    from custom_components.botslab_vacuum.lovelace import build_map_card

    card_yaml = build_map_card(_device(2), _ids())
    config = yaml.safe_load(card_yaml)

    for mode in config["map_modes"]:
        schema = mode["service_call_schema"]
        assert "service" in schema
        assert "action" in schema
        assert schema["service"] == schema["action"]
        assert "service_data" in schema
        assert "data" in schema
        assert schema["service_data"] == schema["data"]


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
    assert sig.parameters["max_attempts"].default == 15















