# Botslab / Qihoo 360 Cloud Protocol Reference

This document describes the reverse-engineered wire protocol, authentication, request signing, push notifications, and cloud endpoints used by **Botslab** and **Qihoo 360** robot vacuum cleaners (validated on the **Botslab S8**).

---

## 1. Network Topology & Hosts

The vacuum cleaner communicates exclusively outbound with the vendor cloud backend; it accepts no incoming LAN connections. Control commands originate from Home Assistant over HTTPS to the Botslab REST API, which forwards downlinks via Alibaba Cloud IoT (Alink MQTT broker in Frankfurt) to the physical robot.

### Host Table by Region

| Region | REST API (`sapp-api`) | QUC Auth (`sapp-login`) | IoT Gateway (`iot-deviceapi`) |
|:---|:---|:---|:---|
| **eu1 (Europe Frankfurt)** | `eu1-sapp-api.botslab.com` | `eu1-sapp-login.botslab.com` | `eu1-iot-deviceapi.botslab.com` |
| **eu2 (Europe 2)** | `eu2-sapp-api.botslab.com` | `eu2-sapp-login.botslab.com` | `eu2-iot-deviceapi.botslab.com` |
| **na1 (North America)** | `na1-sapp-api.botslab.com` | `na1-sapp-login.botslab.com` | `na1-iot-deviceapi.botslab.com` |
| **ap1 (Asia Pacific)** | `ap1-sapp-api.botslab.com` | `ap1-sapp-login.botslab.com` | `ap1-iot-deviceapi.botslab.com` |
| **cn (China Mainland / Qihoo 360)** | `q.smart.360.cn` | `passport.360.cn` | `q.smart.360.cn` |

Additional backend hosts:
- **Alibaba Cloud OSS:** `*.oss-<region>.aliyuncs.com` (map packages, floor plans, area uploads).
- **Qihoo QPUSH Gateway (Botslab Global):** `dp.push.dc.360.cn` (resolves to IP e.g. `8.211.52.133`, TCP port 80/443).
- **Qihoo Push Gateway (Legacy 360 China):** `47.254.151.104:443` (TCP stream with AES encrypted 10000/20000/20001 packets; community verified on 360 S6 in [Issue #1](https://github.com/srg-n/ha-botslab-vacuum/issues/1)).

---

## 2. Request Signing Scheme

Every request to `*-sapp-api.botslab.com` requires signing query parameters:

```
appkey   = "botslabadr"
m2       = <UUID string / app installation identifier>
sign_ts  = <Unix epoch seconds>
sign_no  = <UUID v1 hex string without hyphens, 32 chars>
sign     = md5(appkey + m2 + sign_ts + sign_no + secret).hexdigest().lower()
```

- **`secret`:** Hardcoded app signing constant extracted from the official APK: `qihu_adr_3afg139513ksgnlah1951365saa351a9z_360`.
- **`sign_ts`:** Must be **seconds**, not milliseconds (milliseconds trigger `code 1016 "Phone time invalid"`).
- **`sign_no`:** Generated via `uuid.uuid1().hex`. Reusing a `sign_no` within the replay window triggers `code 1000 "Replay request"`.

### Client Info Parameters (`ci_*`)

Passed alongside query parameters:
```
ci_net=WIFI  ci_model=sdk_gphone64_arm64  ci_lang=en-US  ci_cy=US
ci_brand=google  ci_osver=35  ci_tz=UTC-6  appver=2.28.5
appch=fwq  app_type_id=1  appflag=online  skillflag=online
```

---

## 3. Headless QUC Authentication & Session Minting

Authentication runs in two steps without requiring manual token sniffing:

```
[ Email + Password ] ──(1. QUC DES+RSA+MD5)──► [ Q, T, QID ] ──(2. /v1/app/login)──► [ SID ]
```

### Step 1: Qihoo User Center (`UserIntf.login`)
1. Generates 8-byte DES key material `a117`.
2. Encrypts login parameters (including MD5 password hash) via **DES-CBC** (`parad`).
3. Encrypts the DES key material with the Qihoo 1024-bit RSA public key (`b117`).
4. Generates request signature (`sig = md5(sorted_params + sigkey)`).
5. Sends `POST https://<region>-sapp-login.botslab.com/request.php`.
6. Server responds with encrypted payload containing session cookies: **`Q`**, **`T`**, and **`qid`**.

### Step 2: Cloudspirit Session (`/v1/app/login`)
1. Sends `POST /v1/app/login` with `authorization: jws base64({"Q": Q, "T": T})` and signed query params.
2. Server returns **`sid`** (session ID) formatted as `botslab_<qid>_<timestamp>_<m2>_<hash>-<nodeid>`.

### Request Authorization Header
All subsequent API calls require the complete JWS header:
```
authorization: jws base64( {"Q": "<Q>", "T": "<T>", "sid": "<SID>"} )
```

---

## 4. Error Code Ladder

The API gateway validates requests in strict sequence:

| Code | Message | Root Cause |
|:---|:---|:---|
| `1001` | Sign error | Invalid MD5 signature or wrong secret. |
| `1016` | Phone time invalid | `sign_ts` skew or milliseconds sent instead of seconds. |
| `1000` | Replay request | `sign_no` reused within the anti-replay window. |
| `1015` | Bad request | Missing or malformed `sid` in authorization header. |
| `100003` | Login verification failed | `Q` or `T` tokens expired. |
| `102003` | Logged in on another device | Session evicted by another client login. |
| `0` | Success | Request accepted. |

When codes `100003`, `1015`, or `102003` are encountered, the integration automatically re-authenticates and refreshes the session without user intervention.

---

## 5. Real-Time Push Gateway (Qihoo QPUSH)

To avoid excessive polling, the integration connects to Qihoo's binary TCP push gateway (`dp.push.dc.360.cn:80`).

### Protocol Frames (Big-Endian)

- **`OP_PING (0)`:** Heartbeat sent every 30 seconds: `\x00\x05\x00\x00`.
- **`OP_BIND (2)`:** Client bind frame with `u: <deviceId>@<appId>`.
- **`OP_BIND_ACK (6)`:** Server acknowledgement of successful bind.
- **`OP_ALIAS (17)`:** Registers the user push alias (`sa: <push_alias>`).
- **`OP_PUSH (3)`:** Server-pushed notification frame containing event payload.
- **`OP_ACK (4)`:** Client response acknowledging receipt of a push frame.

When an `OP_PUSH` frame arrives (signaling status changes, map package uploads, or error events), Home Assistant immediately updates its internal state.

---

## 6. Alibaba Cloud OSS Map Packages & Upload Flow

1. **Map Download:** `get_desired_property` returns `MapPkgOssInfo` with `MapID` and signed OSS URLs (`s3_signs`).
   - The map package contains concatenated JSON records:
     - `map`: Base64-encoded LZ4-compressed 2D occupancy grid (`width x height`).
     - `smartArea`: Room partition polygons and labels.
     - `chargeHandlePos`: Charging dock coordinate `[x, y]`.
     - `area`: Forbidden (no-go) zones.
     - `posArray`: Robot position trajectory.
2. **Room Cleaning (`SetCleanPolicyList` + `StartCleanInAreas`):**
   - The robot requires a two-step handshake to establish the active room policy before execution:
     - Calls `SetCleanPolicyList` with `smartAreaIds` preserving user room order, `orderClean: true` (or `false` if `auto_order` requested), `cleanTimes`, and active `mapId`.
     - Fetches temporary STS upload credentials from `POST /v1/user/get_upload_config`.
     - Constructs the room partition JSON (`sweep_areas.txt`) with `activeIds` in ordered sequence, `autoOrder: false` (or `true` if `auto_order` requested), and per-room fan/water settings.
     - Uploads directly to Alibaba Cloud OSS (`PUT /...`).
     - Calls `StartCleanInAreas` with the uploaded OSS URL and a fresh unique timestamped session ID (`CleanID: {sn}-{timestamp}`).
