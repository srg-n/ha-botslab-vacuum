# Botslab Vacuum Robot — Home Assistant Integration

[![English](https://img.shields.io/badge/Language-English-blue.svg)](#)
[![Turkish](https://img.shields.io/badge/Language-T%C3%BCrk%C3%A7e-red.svg)](README.tr.md)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2026.1%2B-blue.svg?logo=home-assistant)](https://www.home-assistant.io)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg?logo=home-assistant)](https://hacs.xyz)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.14.2%2B-3776AB.svg?logo=python)](https://www.python.org)

Production-ready Home Assistant integration for **Botslab** and **Qihoo 360** robot vacuum cleaners. Connects directly to the Botslab Cloud via headless **QUC Authentication** (DES + RSA + MD5 signature generation) and exposes vacuum controls, sensors, room cleaning, and live telemetry to Home Assistant.

---

## 📱 Supported Devices

| Model | Status | Notes |
|---|---|---|
| **Botslab S8** | ✅ **Supported & Verified** | Confirmed working on hardware. Full controls, room cleaning, telemetry, map |
| **Qihoo 360 S6** | ✅ **Supported & Verified** | Community tested and verified via China Mainland backend ([Issue #1](https://github.com/srg-n/ha-botslab-vacuum/issues/1)). Full vacuum controls, telemetry, live map, consumables |
| **Botslab S8 Plus** | ⚠️ **Untested (Expected to work)** | Same TSL cloud API architecture — feedback and testing welcome |
| **Botslab S7 / S9 / S10** | ⚠️ **Untested (Expected to work)** | Same cloud API architecture via International or China backend |
| **Qihoo 360 (S5, S7, S9, X90)** | ⚠️ **Experimental Support** | Protocol implementation via China Mainland (360 Smart Life) region |

> 💡 **Which Server Region Should You Choose? (Golden Rule)**
> The choice depends **strictly on the mobile app your vacuum is registered in**, NOT where you physically live:
> 
> 1. **If your vacuum is in the "360 Robot" or "360 Smart Life" app (e.g. 360 S5, S6, S7, S9, X90):**
>    - **Select:** **`China Mainland (360 Smart Life)` (`cn`)**
>    - ⚠️ **Even if you live in Europe, UK, Turkey, or North America**, you **must select `China Mainland (360 Smart Life)`**! Legacy 360 vacuums connect through Qihoo's central cloud infrastructure (`q.smart.360.cn` / `passport.360.cn`). Selecting `Europe 1` will fail with *Account not found*. Use your existing 360 app email and password.
> 
> 2. **If your vacuum is in the modern "Botslab" app (e.g. Botslab S8, S8 Plus, or newer models):**
>    - **Select:** Your geographical region (e.g. **`Europe 1 (Frankfurt)`** for Europe/UK/Turkey, **`North America`** for US/Canada, etc.).
>    - These models use the modern regional Botslab IoT cloud (`*-sapp-api.botslab.com`).

---

## 🌟 Key Features

- 🔐 **Headless Auto-Login:** No ADB, no root, no network sniffing or proxy setups required. Simply provide your Botslab mobile app email and password.
- 🧹 **Comprehensive Vacuum Controls:**
  - Start / Clean, Pause, Stop, Return to Base (Dock)
  - Fan Speed selection (`Quiet`, `Standard`, `Medium`, `Max`)
  - Water Level selection (`Low`, `Medium`, `High`)
  - Cleaning Mode selection (`Vacuum & Mop`, `Vacuum Only`, `Mop Only`)
  - Find / Locate Robot audio trigger (`locate`)
- 🚪 **Dynamic Room Cleaning & No-Go Zones:**
  - Automatically identifies partitioned rooms from your map
  - Exposes room cleaning actions/services directly in Home Assistant
  - **No-Go Zones (`SetFbdPlaces`):** Set virtual forbidden cleaning zones and boundaries directly via service call
- 🗺️ **High-Resolution Map Rendering & Built-in Cards:**
  - Dynamic Pillow auto-crop eliminating black void borders
  - Dock station glyph, live cleaning path polyline, and robot heading orientation arrow
  - Zero-config bundled Lovelace cards:
    - **`botslab-vacuum-map-card`**: Modern, native interactive card with visual UI editor, sequential room ordering (1 -> 2), customized per-room suction and water flow settings, free zone cleaning, and spot cleaning (adapted from *noambergauz/dreame-vacuum-map-card*).
    - **`botslab-routines-card`**: Full cleaning schedule and routines manager with visual card editor and automatic bilingual EN/TR support.
- 📡 **Dynamic QPush Gateway & Real-time Live Telemetry:**
  - Dynamic GSLB push gateway resolution via `dp.push.dc.360.cn` supporting raw binary TCP on Port 443 (primary) and Port 80 (fallback)
  - Real-time millimeter Cartesian coordinates $[x, y, \theta]$ and live cleaning path exposed in camera and vacuum attributes
- ⏱️ **Two-Stage Polling & Safety Watchdog Engine:**
  - **Active Cleaning (5s):** Rapid 5-second polling with prioritized Alibaba OSS `1days` live map streaming
  - **Firmware Safety Watchdog:** Automatic 50s keepalive loop with 60s safety timeout (`StartSyncMapPkgToOss`), instantly terminated (`StopSyncMapPkgToOss`) when cleaning ends to preserve robot CPU and Wi-Fi bandwidth
  - **Idle / Docked (5 minutes):** 300-second idle polling interval, instantly awakened by the persistent QPush TCP daemon upon any state transition or error
- ⏱️ **HA-Driven Routine & Schedule Engine:**
  - Multi-room, suction-customizable scheduled cleaning routines
  - Persisted in Home Assistant storage (survives restarts)
  - Dedicated schedule sensor and custom Lovelace routines management card
- ⚡ **Dynamic State Transition Watcher:**
  - Fast-polling verification loop (1.5s interval) catches cloud status changes immediately upon user commands
  - Zero UI lag when starting, pausing, or docking without relying on fake optimistic states
- 📊 **Consumables & Maintenance Sensors:**
  - HEPA Filter remaining lifetime (hours)
  - Main Brush remaining lifetime (hours)
  - Side Brush remaining lifetime (hours)
  - Sensor maintenance status (hours)
  - Total cleaning area (m²) and cleaning duration (hours)
  - Error code and diagnostic status
- ⚙️ **Switches & Settings:**
  - Carpet Auto-Boost toggle
  - Collision Protection toggle
  - Button Backlight toggle
  - Voice Volume Level slider (`0 - 100%`)

---

## 🚀 Installation

### Preferred: Home Assistant Marketplace / HACS (RECOMMENDED) ⭐

No manual zip downloading or file copying needed. This integration is 100% compliant with both the official **Home Assistant Marketplace** (HA 2026+) and legacy **HACS**:

> [!NOTE]
> **Marketplace Ready:** This integration does not rely on internal HACS storage or dispatch signals (`hass.data["hacs"]`), adheres strictly to Home Assistant Core's integration manifest standards, and supports native Marketplace updates and repairs under **Settings ➔ System ➔ Repairs**.

#### Via Home Assistant Marketplace (HA 2026+):
1. Open **Marketplace** in your Home Assistant sidebar (or go to **Settings ➔ System ➔ Marketplace**).
2. Click the **three dots** (`⋮`) in the top right corner and choose **Custom repositories**.
3. In the Repository field, enter:
   ```text
   https://github.com/srg-n/ha-botslab-vacuum
   ```
4. Select **Integration** as the Category and click **Add**.
5. Search for **Botslab Vacuum Robot** and click **Install**.
6. Restart Home Assistant (**Settings ➔ System ➔ Restart**).

#### Via HACS (Legacy):
1. Open **HACS** in your Home Assistant sidebar ➔ navigate to **Integrations**.
2. Click the **three dots** (`⋮`) in the top right corner and choose **Custom repositories**.
3. In the Repository field, enter `https://github.com/srg-n/ha-botslab-vacuum`, select **Integration** and click **Add**.
4. Find **Botslab Vacuum Robot** in the list and click **Download**.
5. Restart Home Assistant (**Settings ➔ System ➔ Restart**).

#### Account Setup & Region Selection:
After restarting, go to **Settings ➔ Devices & Services ➔ Add Integration**, search for **Botslab Vacuum**, and log in:
- **For Botslab models (e.g., S8, S8 Plus):**
  - Select **`Asia Pacific`** first if your account was created in Turkey, Middle East, or Asia Pacific.
  - Or select **`Europe 1 (Frankfurt)`**, **`Europe 2`**, or **`North America`** matching your Botslab app account region.
- **For Legacy Qihoo 360 models (e.g., S5, S6, S7, S9, X90):**
  - Select **`China Mainland (360 Smart Life)`** (regardless of where you live in the world) and enter your 360 Smart Life app credentials.

---

## 🎨 Home Assistant Dashboard & Built-in Cards

The integration includes two **built-in Lovelace cards** served directly by Home Assistant. No separate card downloads or manual JavaScript resource configurations are needed!

### 1. `botslab-vacuum-map-card` (Interactive Map Card)

An interactive, high-performance map card crafted specifically for Botslab vacuums:

- **Sequential Room Cleaning:** Click rooms on the map to clean them. Ordered badges (`1`, `2`, `3`) indicate the exact cleaning sequence.
- **Auto-Order Toggle:** Switch between strict sequential order (1 -> 2) or letting the robot calculate the shortest route.
- **Per-Room Customization:** Fine-tune suction power, water level, and repeat passes (1x or 2x) independently for each room.
- **Zone Cleaning:** Draw custom rectangular cleaning areas directly over the map.
- **Spot Cleaning / Go To Point:** Tap anywhere on the floor plan to dispatch the robot to that coordinate.
- **Live Overlays:** Live robot location marker with orientation heading arrow, charging dock glyph, and real-time path polyline.
- **Interactive Controls:** Smooth pan, zoom, and 90° map rotation.
- **Visual Card Editor:** Full graphical configuration UI with entity pickers and immediate live preview.

#### How to Add the Map Card:
1. Open your dashboard, click the **three dots (⋮)** in the top right corner, and select **Edit Dashboard**.
2. Click **+ Add Card** at the bottom right.
3. In the search box, type **Botslab** and select **Botslab Vacuum Map Card**.
4. The visual editor automatically selects your `vacuum.*` and `camera.*_map_camera` entities.
5. Click **Save**!

Or via YAML / Manual card:
```yaml
type: custom:botslab-vacuum-map-card
entity: vacuum.botslab_vacuum
map_entity: camera.botslab_map_camera
title: Botslab Vacuum
default_mode: room
# auto_order: false   # false (default): cleans in selection order (1 -> 2). true: robot auto-routes.
```

---

### 2. `botslab-routines-card` (Cleaning Routines & Schedules)

A dedicated card for managing automated cleaning schedules directly from your dashboard:

- **Schedule Management:** Create, toggle, edit, or delete cleaning schedules without opening the mobile app.
- **Day & Time Selection:** Set target execution time (HH:MM) and repeating days of the week.
- **Room & Power Customization:** Choose specific rooms, suction power levels, and repeat cycles for each routine.
- **Visual Card Editor:** Easily select your robot vacuum entity via dropdown or UI form.
- **Bilingual Interface:** Automatically displays in English or Turkish based on your Home Assistant user profile.

#### How to Add the Routines Card:
1. In Edit Dashboard mode, click **+ Add Card**.
2. Search for **Botslab** and select **Botslab Routines Card**.
3. Select your vacuum entity in the dropdown.
4. Click **Save**!

Or via YAML / Manual card:
```yaml
type: custom:botslab-routines-card
entity: vacuum.botslab_vacuum
```

---

## 📚 Documentation & Technical References

For in-depth protocol analysis, payload schemas, and system design, refer to the technical guides in `docs/`:

- [Protocol Specification (`docs/PROTOCOL.md`)](docs/PROTOCOL.md) — Wire protocol, signing algorithms, QUC auth steps, and Alibaba Cloud OSS / Alink interactions.
- [Control & Payload Reference (`docs/CONTROL.md`)](docs/CONTROL.md) — Exhaustive catalog of cloud commands (`SetFbdPlaces`, `StartCleanInAreas`, etc.), service payload schemas, and room cleaning formats.
- [Integration Architecture (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md) — System flow, hybrid QPUSH + adaptive polling model, Pillow map rendering pipeline, and routine engine internals.

---

## 🔬 Technical Architecture

The vacuum cloud communication runs over a 3-tier proprietary architecture:

```
[ Integration / Home Assistant ]
               │
               ▼ (1. HTTPS QUC Auth & invoke_service)
     [ Botslab Cloud Backend (eu1-sapp-api.botslab.com) ]
               │                                   │
               ▼ (2. Alink Downlink)               ▼ (3. QPUSH Gateway)
        [ Robot Vacuum ]                    [ Home Assistant Listener ]
  (Aliyun MQTT, Frankfurt broker)        (Dynamic GSLB dp.push.dc.360.cn -> Port 443/80)
```

### 1. What is Qihoo QPUSH?
* **Protocol:** A proprietary binary TCP push protocol developed by Qihoo and Botslab for client push notifications. The integration dynamically resolves regional push gateway IPs via `dp.push.dc.360.cn?appId=gqrwex6nq54m` and connects via raw binary TCP on Port 443 (primary, no TLS) or Port 80 (fallback), with Frankfurt (`8.211.52.133`) as a safe fallback.
* **Function:** QPUSH is **not** used to send commands to the robot. Instead, when the vacuum begins cleaning, uploads a map file, or throws an error, the cloud pushes an `OP_PUSH` frame to the client so UI state updates in real-time.
* **Two-Stage Dynamic Polling:** The integration polls every **5 seconds** during active cleaning (`STATUS_CLEANING`) and switches to **5 minutes (300s)** when docked or idle to conserve robot CPU and Wi-Fi airtime. Any push frame or state change wakes the coordinator immediately.

### 2. Alibaba Cloud (Aliyun) Alink & Downlink Commands
* Botslab S8 hardware runs on the **Alibaba Cloud IoT (Alink)** platform (`ProductKey: 7347e727042a`).
* When the vacuum is in standby/sleep mode, it keeps an active Alink MQTT connection to Alibaba's Frankfurt broker.
* When we issue a start, pause, or room clean command, the Botslab Cloud forwards it using enterprise Alibaba Cloud permissions through Alink downlink to the robot's active socket, instantly waking it.

### 3. Why DeviceSecret is Neither Available Nor Required
* In Alibaba Cloud IoT, connecting directly to the broker as a device requires a `DeviceSecret`.
* This secret is flashed into the robot's **hardware secure storage/EEPROM** during factory manufacturing and is never transmitted to the mobile app or cloud account.
* Furthermore, Alibaba Cloud IoT enforces a **single active MQTT session per device name**. Any attempt to connect directly as the device would forcibly disconnect (*kick offline*) the physical robot in your home.
* Therefore, this integration communicates via the official `invoke_service` API tunnel - exactly as the official mobile app does.

### 4. Endpoints the official app contacts

A traffic capture of the official app shows **no private or local addresses at all**. The robot never accepts incoming connections on your network; it dials out to the cloud. Every host the integration relies on:

| Host | Purpose | Used? |
|---|---|---|
| `eu1-sapp-api.botslab.com` | Device list, properties, `invoke_service` commands, OTA | Yes |
| `eu1-sapp-login.botslab.com` | QUC email/password authentication | Yes |
| `eu1-ali-*-days.oss-eu-central-1.aliyuncs.com` | Map package upload/download over Alibaba OSS | Yes |
| `dp.push.dc.360.cn` -> `8.211.52.133` | QPush gateway address lookup | Optional |
| `eu1-video-iotext.botslab.com` | Firmware binary download | Not used |
| `eu1-ad2-app.botslab.com` | Advertising | Not used |
| `eu1-logs-app.botslab.com` | Telemetry / crash logs | Not used |
| `ad.iot.360.cn`, `qos.live.360.cn`, `wenjuan.lap.360.cn`, `q5.jia.360.cn` | Ads, telemetry, surveys | Not used |
| `q.smart.360.cn`, `passport.360.cn` | Legacy Qihoo 360 China backend (commands, records, map) | Used for `cn` region |

Region-specific equivalents exist for `eu1`, `eu2`, `na1`, `ap1`, and `cn` (legacy Qihoo 360 / 360 Smart Life backend at `q.smart.360.cn`).

### 5. Stability warning

This integration talks to **undocumented cloud endpoints** and signs requests with the signing key shipped inside the official Android app. If Botslab changes its API, the integration can stop working until it is updated. There is no compatibility guarantee.

---

## 👏 Credits & Acknowledgments

- **[Noam Bergauz](https://github.com/noambergauz)** — The bundled `botslab-vacuum-map-card` is adapted from the exceptional [noambergauz/dreame-vacuum-map-card](https://github.com/noambergauz/dreame-vacuum-map-card), tailored with custom room segmentation, live pose calibration, per-room controls, and Botslab backend services.
- **Qihoo 360 / Botslab Community** — Community members who helped reverse-engineer and test legacy 360 S6 / S7 protocols.

---

## 🤝 Contributing & License

Feedback and pull requests for other models (S8 Plus, S7, S9, S10) are warmly welcomed!  
This project is open-source under the [MIT License](LICENSE).
