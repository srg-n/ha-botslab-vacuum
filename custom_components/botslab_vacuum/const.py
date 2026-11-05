"""Constants for the Botslab Vacuum Robot integration."""
from __future__ import annotations

from typing import Final
from homeassistant.const import Platform

DOMAIN: Final = "botslab_vacuum"
MANUFACTURER: Final = "Botslab / 360"

PLATFORMS: Final = [
    Platform.VACUUM,
    Platform.SENSOR,
    Platform.BINARY_SENSOR,
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
QUC_METHOD_GET_CAPTCHA: Final = "UserIntf.getCaptcha"
ERRNO_QUC_CAPTCHA: Final = 5010
ERRNO_QUC_CAPTCHA_SET: Final = (5010, 5011, 5012, 5001, 5002, 5003)
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
    "cn": {
        "name": "China Mainland (360 Smart Life)",
        "api": "q.smart.360.cn",
        "login": "passport.360.cn",
        "iot": "iot.360.cn",
        "legacy": True,
    },
}
DEFAULT_REGION: Final = "eu1"

# --- Legacy Qihoo 360 Endpoints, Constants & Protocols ---
QUC_FROM_CHINA: Final = "mpl_smarthome_and"
QUC_APP_CHINA: Final = "360Robot"
QUC_MSIGKEY_CHINA: Final = "i7v2m5x6q"
EP_360_LOGIN: Final = "/common/user/login"
EP_360_DEV_LIST: Final = "/common/dev/GetList"
EP_360_CMD_SEND: Final = "/clean/cmd/send"
EP_360_RECORD_LIST: Final = "/clean/record/getList"
EP_360_RECORD_GET_ONE: Final = "/clean/record/getOne"
EP_360_SET_AREA_AND_CLEANING: Final = "/clean/record/setAreaAndCleaning"
LEGACY_360_USER_AGENT: Final = "QihooSuperApp_NoPods/11.1.0 (iPhone; iOS 15.6; Scale/3.00)"
LEGACY_360_MINT_UA: Final = "qhsa-iphone-11.1.0"
LEGACY_360_ROOM_UA: Final = "okhttp/4.10.0"
COOKIE_Q_360: Final = "u=&t=1;t=&v=2.0&a=1"

INFO_360_STATUS: Final = "20001"
INFO_360_NETWORK_INFO: Final = "21019"
INFO_360_START: Final = "21005"
INFO_360_RETURN: Final = "21012"
INFO_360_PAUSE: Final = "21017"
INFO_360_LOCATE: Final = "21020"
INFO_360_FAN_SPEED: Final = "21022"
INFO_360_SETTINGS: Final = "21024"
INFO_360_CONSUMABLES: Final = "21015"
INFO_360_RESET_CONSUMABLE: Final = "21016"

AUTH_EXPIRED_ERRNOS_360: Final = (102, 103, 401, 403, -2, 10001, 10002)
BATTERY_KEYS_360: Final = ("elecReal", "elec", "battery", "batteryLevel", "power")

# Human-readable robot hardware error code descriptions
ERROR_CODE_DESCRIPTIONS: Final[dict[int, str]] = {
    0: "Normal",
    1: "Radar / LiDAR obstructed or trapped",
    2: "Collision bumper stuck",
    3: "Wheels off the ground / suspended",
    4: "Cliff drop sensor dirty or obstructed",
    5: "Main roller brush tangled or stuck",
    6: "Side brush tangled or stuck",
    7: "Drive wheel stuck",
    8: "Dustbin missing or removed",
    9: "Filter blocked or dirty",
    10: "Battery critically low",
    11: "Charging abnormal or dock contacts dirty",
    12: "Robot trapped or stuck",
    13: "Water tank empty",
    14: "Mop bracket / pad missing",
}

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
CMD_SET_FBD_PLACES: Final = "SetFbdPlaces"

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

FAN_SPEED_TO_LEVEL: Final[dict[str, int]] = {
    FAN_SPEED_QUIET: 0,
    FAN_SPEED_STANDARD: 1,
    FAN_SPEED_POWERFUL: 2,
    FAN_SPEED_MAX: 3,
}

MODE_TO_FAN_SPEED: Final[dict[int, str]] = {
    0: FAN_SPEED_QUIET,
    1: FAN_SPEED_STANDARD,
    2: FAN_SPEED_POWERFUL,
    3: FAN_SPEED_MAX,
    4: FAN_SPEED_MAX,
}

# Mapping between Home Assistant fan speeds and legacy 360 workNoisy strings / cmd 21022
FAN_SPEEDS_HA_TO_360: Final[dict[str, str]] = {
    FAN_SPEED_QUIET: "quiet",
    FAN_SPEED_STANDARD: "auto",
    FAN_SPEED_POWERFUL: "strong",
    FAN_SPEED_MAX: "max",
}

FAN_SPEEDS_360_TO_HA: Final[dict[str, str]] = {
    "quiet": FAN_SPEED_QUIET,
    "auto": FAN_SPEED_STANDARD,
    "strong": FAN_SPEED_POWERFUL,
    "max": FAN_SPEED_MAX,
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
CONF_QID: Final = "qid"
CONF_SID: Final = "sid"
CONF_PUSHKEY: Final = "pushkey"
CONF_POLL_INTERVAL: Final = "poll_interval"
CONF_POLL_INTERVAL_ACTIVE: Final = "poll_interval_active"
CONF_POLL_INTERVAL_IDLE: Final = "poll_interval_idle"
CONF_ENABLE_MAP: Final = "enable_map"
DEFAULT_POLL_INTERVAL: Final = 30  # seconds (fallback)
DEFAULT_POLL_INTERVAL_ACTIVE: Final = 15  # seconds when vacuum is active
DEFAULT_POLL_INTERVAL_IDLE: Final = 30  # seconds when vacuum is docked/idle
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
SERVICE_SET_NO_GO_ZONES: Final = "set_no_go_zones"
SERVICE_SET_SCHEDULE: Final = "set_schedule"
SERVICE_DELETE_SCHEDULE: Final = "delete_schedule"
SERVICE_RUN_SCHEDULE: Final = "run_schedule"

ATTR_ROOM_IDS: Final = "room_ids"
ATTR_ROOM_NAMES: Final = "room_names"
ATTR_REPEAT_TIMES: Final = "repeat_times"
ATTR_FAN_SPEED: Final = "fan_speed"
ATTR_WATER_LEVEL: Final = "water_level"
ATTR_MOP_MODE: Final = "mop_mode"
ATTR_ZONES: Final = "zones"
ATTR_MODE: Final = "mode"
ATTR_CONSUMABLE_TYPE: Final = "consumable_type"
ATTR_X: Final = "x"
ATTR_Y: Final = "y"
ATTR_ENTITY_ID: Final = "entity_id"
ATTR_TIME: Final = "time"
ATTR_DAYS: Final = "days"
ATTR_SLOT: Final = "slot"
ATTR_PASSES: Final = "passes"
ATTR_SUCTION: Final = "suction"
ATTR_ACTIVE: Final = "active"
