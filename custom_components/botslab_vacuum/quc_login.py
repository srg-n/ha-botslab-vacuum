"""Async QUC email/password login for Botslab."""
from __future__ import annotations

import logging
import time
import urllib.parse
import aiohttp

from .const import (
    EP_QUC_REQUEST,
    QUC_APP_CHINA,
    QUC_FROM,
    QUC_FROM_CHINA,
    QUC_METHOD,
    QUC_MSIGKEY,
    QUC_MSIGKEY_CHINA,
    QUC_RSA_PUBKEY_B64,
    REGIONS,
    REQUEST_TIMEOUT,
    USER_AGENT,
)
from .crypto import (
    compute_sig,
    decrypt_response,
    encrypt_key_material,
    encrypt_params,
    gen_key_material,
    md5_hex,
)
from .exceptions import BotslabApiError, BotslabAuthError

_LOGGER = logging.getLogger(__name__)


def build_login_params(
    email: str, password: str, m2: str, is_china: bool = False
) -> dict[str, str]:
    """Assemble QUC login parameters."""
    now_ms = str(int(time.time() * 1000))
    mid = md5_hex(f"mid:{m2}")
    androidid = md5_hex(f"androidid:{m2}")[:16]
    quc_from = QUC_FROM_CHINA if is_china else QUC_FROM
    app_name = QUC_APP_CHINA if is_china else "Botslab"
    sig_key = QUC_MSIGKEY_CHINA if is_china else QUC_MSIGKEY

    need_device_check = "0" if is_china else "1"
    quc_sdk_ver = "v3.2.4.6" if is_china else "v3.2.7"
    v = "2.24.0" if is_china else "2.28.5"
    ui_ver = "4.3.4.1-alert-ui" if is_china else "4.4.6-alert-ui"
    os_sdk_ver = "android_33" if is_china else "android_30"
    m_sys_ver = "android 13" if is_china else "android 11"

    params: dict[str, str] = {
        "loginType": "801",
        "os_sdk_version": os_sdk_ver,
        "mid": mid,
        "quc_sdk_version": quc_sdk_ver,
        "mname": "" if is_china else "Galaxy Tab Active Pro",
        "ua": (
            "Dalvik/2.1.0 (Linux; U; Android 13; sdk_gphone64_arm64 Build/TE1A.240213.009)"
            if is_china
            else "Dalvik/2.1.0 (Linux; U; Android 11; SM-T545 Build/RP1A.200720.012)"
        ),
        "os_manufacturer": "Google" if is_china else "samsung",
        "mSystemVersion": m_sys_ver,
        "head_type": "q",
        "os_board": "goldfish_arm64" if is_china else "sdm710",
        "os_model": "sdk_gphone64_arm64" if is_china else "SM-T545",
        "password": md5_hex(password),
        "quc_lang": "en",
        "sh": "2337.0" if is_china else "1920.0",
        "vt_guid": now_ms,
        "is_keep_alive": "1",
        "from": quc_from,
        "needDeviceCheck": need_device_check,
        "oaid": "",
        "app": app_name,
        "trace_id": f"src_and_1217_{now_ms}",
        "ui_ver": ui_ver,
        "method": QUC_METHOD,
        "res_mode": "1",
        "sw": "1080.0" if is_china else "1200.0",
        "format": "json",
        "qh_id": "",
        "device_os": "android",
        "device_lang": "zh-CN",
        "sec_type": "bool",
        "v": v,
        "fields": "qid,username,nickname,loginemail,head_pic,mobile",
        "androidid": androidid,
        "username": email,
        "sdpi": "2.625" if is_china else "1.5",
    }
    params["sig"] = compute_sig(params, sig_key)
    return params


async def async_login(
    session: aiohttp.ClientSession,
    region: str,
    email: str,
    password: str,
    m2: str,
) -> dict[str, str]:
    """Authenticate with Botslab QUC and return tokens {q, t, qid}."""
    reg = REGIONS.get(region, REGIONS["eu1"])
    login_host = reg["login"]
    is_china = bool(reg.get("legacy", False))
    url = f"https://{login_host}{EP_QUC_REQUEST}"

    a117 = gen_key_material()
    params = build_login_params(email, password, m2, is_china=is_china)
    parad = encrypt_params(params, a117)
    key_b64 = encrypt_key_material(a117, QUC_RSA_PUBKEY_B64)

    post_data = {
        "method": QUC_METHOD,
        "from": params["from"],
        "device_lang": params["device_lang"],
        "quc_lang": params["quc_lang"],
        "trace_id": params["trace_id"],
        "parad": parad,
        "key": key_b64,
    }

    headers = {
        "User-Agent": f"360accounts andv3.2.4.6 {params['from']}" if is_china else USER_AGENT,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
    }

    try:
        async with session.post(
            url,
            data=urllib.parse.urlencode(post_data),
            headers=headers,
            timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
        ) as resp:
            if resp.status != 200:
                raise BotslabApiError(f"HTTP {resp.status} from QUC login: {await resp.text()}")
            data = await resp.json(content_type=None)
    except aiohttp.ClientError as err:
        raise BotslabApiError(f"Network error during login: {err}") from err

    errno = data.get("errno", -1)
    if errno != 0:
        errmsg = data.get("errmsg", "Unknown error")
        raise BotslabAuthError(f"Login failed (code {errno}): {errmsg}")

    ret_b64 = data.get("ret")
    if not ret_b64:
        raise BotslabAuthError("Missing 'ret' payload in QUC response")

    ret = decrypt_response(ret_b64, a117)
    ret_errno = ret.get("errno", 0)
    if ret_errno != 0:
        ret_msg = ret.get("errmsg", "Login rejected")
        raise BotslabAuthError(f"QUC auth rejected (code {ret_errno}): {ret_msg}")

    user = ret.get("user") or ret.get("user_info") or ret
    q = user.get("q")
    t = user.get("t")
    qid = str(user.get("qid") or user.get("id") or "")

    if not q or not t:
        raise BotslabAuthError("Response succeeded but missing q/t session tokens")

    _LOGGER.info("QUC login successful for %s (qid: %s)", email, qid)
    return {"q": q, "t": t, "qid": qid}
