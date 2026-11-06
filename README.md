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
- 🗺️ **High-Resolution Map Rendering & Zero-Config Frontend:**
  - Dynamic Pillow auto-crop eliminating black void borders
  - Dock station glyph, live cleaning path polyline, and robot heading orientation arrow
  - Zero-config bundled Lovelace cards:
    - **`botslab-vacuum-map-card`**: Modern interactive card with visual UI editor, per-room suction/water customization, and spot/zone cleaning (adapted from *noambergauz/dreame-vacuum-map-card*)
    - **`botslab-routines-card`**: Full cleaning schedule and routines manager
    - **`xiaomi-vacuum-map-card`**: Universal calibration-based map viewer
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

### Alternative: Manual Copy (Without HACS)

If you do not have HACS installed:

1. Copy the `custom_components/botslab_vacuum` directory into your Home Assistant `/config/custom_components/` folder:
   ```bash
   cp -r custom_components/botslab_vacuum /config/custom_components/
   ```
2. Restart Home Assistant.
3. Go to **Settings ➔ Devices & Services ➔ Add Integration** and select **Botslab Vacuum**.

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

> **Local operation is not possible on this hardware.** Because the robot only initiates outbound cloud connections, there is no local API to talk to. The MQTT bridge that earlier versions of this repository shipped has been removed: it added a process and a broker without removing the cloud dependency, and it duplicated code that now lives in the integration itself.

### 5. Stability warning

This integration talks to **undocumented cloud endpoints** and signs requests with the signing key shipped inside the official Android app. If Botslab changes its API, the integration can stop working until it is updated. There is no compatibility guarantee.

---

## 🎨 Home Assistant Dashboard Examples

Example Lovelace configurations are available in `lovelace_card_example.yaml`, including a ready-made card for the [Xiaomi Vacuum Map Card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card) frontend card with tap-to-clean rooms, zones and point navigation.

```yaml
type: vacuum-card
entity: >
  {%- set ids = states('vacuum') | selectattr('entity_id', 'match', '_vacuum$')
                              | map(attribute='entity_id') | list -%}
  {{ ids | first }}
show_toolbar: true
```

Entities are keyed by the robot's serial number, so the Jinja above resolves them without you editing anything.

### Zero-Config Bundled Frontend Cards

The integration automatically serves and registers the required Lovelace cards upon startup:
- `/botslab_vacuum/www/botslab-vacuum-map-card.js` (⭐ **Recommended** — Interactive visual card with graphical UI editor, customized per-room suction and water settings, live pose orientation, and spot cleaning)
- `/botslab_vacuum/www/botslab-routines-card.js` (Pre-bundled routine & schedule manager card with automatic EN/TR localization)
- `/botslab_vacuum/www/xiaomi-vacuum-map-card.js` (Calibration-based map viewer with room tap and zone cleaning)

No manual HACS frontend installation or resource configuration is required.

### 🗺️ Generating Map and Routine Cards in One Click

Room outlines and polygon boundaries are specific to your home and change whenever rooms are split, merged, or renamed in the Botslab app. Rather than calculating coordinates manually, the integration generates ready-to-paste configurations in one click:

1. Press the **Sync Map** (`sync_map`) button in Home Assistant so the robot uploads its latest floor plan.
2. Press **Generate Map Card** (`generate_map_card`).
3. The integration writes complete, pre-configured cards (`botslab-vacuum-map-card`, `botslab-routines-card`, and `xiaomi-vacuum-map-card`) with all your room configurations to **`/config/botslab_map_card.yaml`** in your Home Assistant config directory, and posts a notification in your Home Assistant sidebar.

#### 📌 Step-by-Step Dashboard Setup:

1. **Copy the File Contents:**  
   Open `/config/botslab_map_card.yaml` using the **File Editor** (or Studio Code Server / Samba) add-on and copy the YAML snippet for the card you want.
2. **Open Your Dashboard:**  
   Navigate to the dashboard where you want to place the vacuum map card.
3. **Enter Edit Mode:**  
   Click the **three dots (⋮)** in the top right corner and choose **Edit Dashboard**.
4. **Add a Manual Card:**  
   Click the **+ Add Card** button at the bottom right. Scroll all the way down and select the **Manual** card type.
5. **Paste and Save:**  
   Delete the sample code in the editor, paste the copied YAML configuration, and click **Save**.

> [!WARNING]
> **Avoid Raw Editor Error:**  
> This YAML contains card configurations. Do **NOT** paste it into the dashboard's top-level **"Raw configuration editor"**, as doing so will corrupt your dashboard structure and produce `At path: views -- Expected an array value`. Always use **+ Add Card ➔ Manual**.

---

## 👏 Credits & Acknowledgments

- **[Noam Bergauz](https://github.com/noambergauz)** — The bundled `botslab-vacuum-map-card` is adapted from the exceptional [noambergauz/dreame-vacuum-map-card](https://github.com/noambergauz/dreame-vacuum-map-card), tailored with custom room segmentation, live pose calibration, per-room controls, and Botslab backend services.
- **[Piotr Machowski](https://github.com/PiotrMachowski)** — Creator of the widely celebrated [lovelace-xiaomi-vacuum-map-card](https://github.com/PiotrMachowski/lovelace-xiaomi-vacuum-map-card).
- **Qihoo 360 / Botslab Community** — Community members who helped reverse-engineer and test legacy 360 S6 / S7 protocols.

---

## 🤝 Contributing & License

Feedback and pull requests for other models (S8 Plus, S7, S9, S10) are warmly welcomed!  
This project is open-source under the [MIT License](LICENSE).
