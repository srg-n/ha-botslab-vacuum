"""Constants for the Botslab Vacuum Robot integration."""
from __future__ import annotations

from typing import Final
from homeassistant.const import Platform

DOMAIN: Final = "botslab_vacuum"
MANUFACTURER: Final = "Botslab / 360"

PLATFORMS: Final = [
    Platform.VACUUM,
    Platform.SENSOR,
    Platform.BUTTON,
    Platform.SWITCH,
    Platform.SELECT,
    Platform.NUMBER,
    Platform.CAMERA,
]

# --- sapp-api signing keys (Botslab Android app constants) ---
APP_KEY: Final = "botslabadr"
APP_SECRET: Final = "qihu_adr_3afg139513ksgnlah1951365saa351a9z_360"
APP_VER: Final = "2.28.5"
USER_AGENT: Final = "Botslab/2.28.5 (Android)"

# --- QUC login (Email & Password headless auth) ---
QUC_METHOD: Final = "UserIntf.login"
QUC_FROM: Final = "mpl_cloudsmartoem_and"
QUC_MSIGKEY: Final = "73e5dba4"
QUC_RSA_PUBKEY_B64: Final = (
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9oNZHDXyGxNNfBhfk/+WAtjVE"
    "T1sLWQraDBLHd0821Ow4yp6p+zvHB6yXSUEt2/lLVW7Q0/RVHuxnwtg6cKYdDIn"
    "qMznSLIKjXPkd6Dfft8nz8vkOdSUlzQtE3T4dvaagbH76lBGB2wuLNOV0D2UcUy"
    "vRu2puKtYjgDNm/O0apQIDAQAB"
)
EP_QUC_REQUEST: Final = "/request.php"

# --- Regional hosts ---
REGIONS: Final[dict[str, dict[str, str]]] = {
    "eu1": {
        "name": "Europe 1 (Frankfurt)",
        "api": "eu1-sapp-api.botslab.com",
        "login": "eu1-sapp-login.botslab.com",
        "iot": "eu1-iot-deviceapi.botslab.com",
    },
    "eu2": {
        "name": "Europe 2",
        "api": "eu2-sapp-api.botslab.com",
        "login": "eu2-sapp-login.botslab.com",
        "iot": "eu2-iot-deviceapi.botslab.com",
    },
    "na1": {
        "name": "North America",
        "api": "na1-sapp-api.botslab.com",
        "login": "na1-sapp-login.botslab.com",
        "iot": "na1-iot-deviceapi.botslab.com",
    },
    "ap1": {
        "name": "Asia Pacific",
        "api": "ap1-sapp-api.botslab.com",
        "login": "ap1-sapp-login.botslab.com",
        "iot": "ap1-iot-deviceapi.botslab.com",
    },
}
DEFAULT_REGION: Final = "eu1"

# --- REST Endpoints ---
EP_APP_LOGIN: Final = "/v1/app/login"
EP_DEVICE_LIST: Final = "/v1/iot/device/list"
EP_DEVICE_PROPERTY: Final = "/v1/iot/device/get_desired_property"
EP_SET_PROPERTY: Final = "/v1/iot/device/set_property"
EP_DEVICE_INFO: Final = "/v1/iot/device/info"
EP_USER_MULTI_MAP: Final = "/v1/clean/user/multi_map_room_list"
EP_OTA_CHECK: Final = "/v1/iot/ota/check_upgrade_version"
EP_UPLOAD_CONFIG: Final = "/v1/user/get_upload_config"

# --- Vacuum Command IDs & Protocols ---
CMD_START: Final = "21005"
CMD_PAUSE: Final = "21017"
CMD_STOP: Final = "21017"
CMD_RETURN_HOME: Final = "21012"
CMD_CLEAN_ROOMS: Final = "21011"
CMD_CLEAN_ZONE: Final = "21005"
CMD_SET_MODE: Final = "21003"
CMD_LOCATE: Final = "21013"
CMD_RESET_CONSUMABLE: Final = "21016"

# Fan speed / Suction mode mapping
FAN_SPEED_QUIET: Final = "quiet"
FAN_SPEED_STANDARD: Final = "standard"
FAN_SPEED_POWERFUL: Final = "powerful"
FAN_SPEED_MAX: Final = "max"

FAN_SPEEDS: Final[list[str]] = [
    FAN_SPEED_QUIET,
    FAN_SPEED_STANDARD,
    FAN_SPEED_POWERFUL,
    FAN_SPEED_MAX,
]

FAN_SPEED_TO_MODE: Final[dict[str, int]] = {
    FAN_SPEED_QUIET: 1,
    FAN_SPEED_STANDARD: 2,
    FAN_SPEED_POWERFUL: 3,
    FAN_SPEED_MAX: 4,
}

MODE_TO_FAN_SPEED: Final[dict[int, str]] = {
    1: FAN_SPEED_QUIET,
    2: FAN_SPEED_STANDARD,
    3: FAN_SPEED_POWERFUL,
    4: FAN_SPEED_MAX,
}

# --- Vacuum Activities ---
STATUS_DOCKED: Final = "docked"
STATUS_CLEANING: Final = "cleaning"
STATUS_PAUSED: Final = "paused"
STATUS_RETURNING: Final = "returning"
STATUS_IDLE: Final = "idle"
STATUS_ERROR: Final = "error"

# --- Error Codes ---
CODE_OK: Final = 0
CODE_SIGN_ERROR: Final = 1001
CODE_BAD_REQUEST: Final = 1015
CODE_LOGIN_FAILED: Final = 100003
CODE_SESSION_STOLEN: Final = 102003
CODE_ACCOUNT_TIMEOUT: Final = 102008

# --- Configuration & Option keys ---
CONF_EMAIL: Final = "email"
CONF_PASSWORD: Final = "password"
CONF_REGION: Final = "region"
CONF_M2: Final = "m2"
CONF_Q: Final = "q"
CONF_T: Final = "t"
CONF_POLL_INTERVAL: Final = "poll_interval"
CONF_POLL_INTERVAL_ACTIVE: Final = "poll_interval_active"
CONF_POLL_INTERVAL_IDLE: Final = "poll_interval_idle"
CONF_ENABLE_MAP: Final = "enable_map"
DEFAULT_POLL_INTERVAL: Final = 30  # seconds (fallback)
DEFAULT_POLL_INTERVAL_ACTIVE: Final = 30  # seconds when vacuum is active
DEFAULT_POLL_INTERVAL_IDLE: Final = 120  # seconds when vacuum is docked/idle
REQUEST_TIMEOUT: Final = 15  # seconds

ACTIVE_STATUSES: Final[set[str]] = {
    STATUS_CLEANING,
    STATUS_RETURNING,
    STATUS_PAUSED,
}

# --- Water Flow Levels (Pad Wetness) ---
WATER_LEVEL_LOW: Final = "low"
WATER_LEVEL_MEDIUM: Final = "medium"
WATER_LEVEL_HIGH: Final = "high"

WATER_LEVELS: Final[list[str]] = [
    WATER_LEVEL_LOW,
    WATER_LEVEL_MEDIUM,
    WATER_LEVEL_HIGH,
]

WATER_LEVEL_TO_INT: Final[dict[str, int]] = {
    WATER_LEVEL_LOW: 1,
    WATER_LEVEL_MEDIUM: 2,
    WATER_LEVEL_HIGH: 3,
}

INT_TO_WATER_LEVEL: Final[dict[int, str]] = {
    1: WATER_LEVEL_LOW,
    2: WATER_LEVEL_MEDIUM,
    3: WATER_LEVEL_HIGH,
}

# --- Mop Modes ---
MOP_MODE_VACUUM_AND_MOP: Final = "vacuum_and_mop"
MOP_MODE_VACUUM_ONLY: Final = "vacuum_only"
MOP_MODE_MOP_ONLY: Final = "mop_only"

MOP_MODES: Final[list[str]] = [
    MOP_MODE_VACUUM_AND_MOP,
    MOP_MODE_VACUUM_ONLY,
    MOP_MODE_MOP_ONLY,
]

MOP_MODE_TO_INT: Final[dict[str, int]] = {
    MOP_MODE_VACUUM_AND_MOP: 0,
    MOP_MODE_VACUUM_ONLY: 1,
    MOP_MODE_MOP_ONLY: 2,
}

INT_TO_MOP_MODE: Final[dict[int, str]] = {
    0: MOP_MODE_VACUUM_AND_MOP,
    1: MOP_MODE_VACUUM_ONLY,
    2: MOP_MODE_MOP_ONLY,
}

# --- Custom Services ---
SERVICE_CLEAN_ROOMS: Final = "clean_rooms"
SERVICE_CLEAN_ZONE: Final = "clean_zone"
SERVICE_LOCATE: Final = "locate"
SERVICE_RESET_CONSUMABLE: Final = "reset_consumable"
SERVICE_SET_WATER_LEVEL: Final = "set_water_flow"
SERVICE_SET_MOP_MODE: Final = "set_mop_mode"
SERVICE_REFRESH_ROOMS: Final = "refresh_rooms"
SERVICE_SYNC_MAP: Final = "sync_map"
SERVICE_GOTO_LOCATION: Final = "goto_location"

ATTR_ROOM_IDS: Final = "room_ids"
ATTR_ROOM_NAMES: Final = "room_names"
ATTR_REPEAT_TIMES: Final = "repeat_times"
ATTR_FAN_SPEED: Final = "fan_speed"
ATTR_WATER_LEVEL: Final = "water_level"
ATTR_MOP_MODE: Final = "mop_mode"
ATTR_ZONES: Final = "zones"
ATTR_CONSUMABLE_TYPE: Final = "consumable_type"
ATTR_X: Final = "x"
ATTR_Y: Final = "y"
ATTR_ENTITY_ID: Final = "entity_id"
