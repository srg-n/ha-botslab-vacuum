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

| Model | Tested Status | Notes |
|---|---|---|
| **Botslab S8** | ✅ **Verified & Tested** | Full controls, room cleaning, telemetry, sensors |
| **Botslab S8 Plus** | ❓ **Untested / Unknown** | Same cloud API generation — tests & pull requests welcome! |
| **Botslab S8 / S8 Plus** | ✅ **Supported & Verified** | Full support: room cleaning, real-time map, schedules, water flow |
| **Botslab S7 / S9 / S10** | ✅ **Supported** | Compatible via International or China backend |
| **Qihoo 360 (S5, S6, S7, S9, X90)** | ✅ **Supported** | Supported via China Mainland (360 Smart Life) region option |

> 💡 **Supported Ecosystems:**
> - **Modern Botslab Vacuums (S8, S8+, etc.):** Use International regions (`eu1`, `eu2`, `na1`, `ap1`). Full IoT TSL features including electronic water flow, carpet auto-boost, and live QPush telemetry.
> - **Legacy Qihoo 360 Vacuums (S5, S6, S7, S9, X90):** Use the **China Mainland (360 Smart Life)** region. Provides full control (start, pause, resume, dock, suction speeds, locate, volume, consumables) and REST-based LZ4 map rendering.

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
  - Zero-config bundled Lovelace cards (`xiaomi-vacuum-map-card` and `botslab-routines-card`) automatically served
- ⏱️ **HA-Driven Routine & Schedule Engine:**
  - Multi-room, suction-customizable scheduled cleaning routines
  - Persisted in Home Assistant storage (survives restarts)
  - Dedicated schedule sensor and custom Lovelace routines management card
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

### Preferred: HACS Custom Repository (RECOMMENDED) ⭐

No manual zip downloading or file copying needed. Install in seconds using HACS:

1. Open **HACS** in your Home Assistant sidebar ➔ navigate to **Integrations**.
2. Click the **three dots** (`⋮`) in the top right corner and choose **Custom repositories**.
3. In the Repository field, enter this URL:
   ```text
   https://github.com/srg-n/ha-botslab-vacuum
   ```
4. Select **Integration** as the Category and click **Add**.
5. Find **Botslab Vacuum Robot** in the integration list and click **Download** in the bottom right corner.
6. **Restart Home Assistant** (**Settings ➔ System ➔ Restart**).
7. Go to **Settings ➔ Devices & Services ➔ Add Integration**, search for **Botslab Vacuum**, and log in with your Botslab mobile app credentials!

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
  (Aliyun MQTT, Frankfurt broker)        (dp.push.dc.360.cn -> 8.211.52.133)
```

### 1. What is Qihoo QPUSH?
* **Protocol:** A proprietary binary TCP push protocol developed by Qihoo and Botslab for client push notifications (`dp.push.dc.360.cn` -> `8.211.52.133`).
* **Function:** QPUSH is **not** used to send commands to the robot. Instead, when the vacuum begins cleaning, uploads a map file, or throws an error, the cloud pushes an `OP_PUSH` frame to the client so UI state updates in real-time.
* **Optional:** The integration polls every 30s while cleaning and 120s when idle, so it works fully without QPUSH.

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
- `/botslab_vacuum/www/xiaomi-vacuum-map-card.js` (Pre-bundled map viewer with room tap, zone cleaning, and point navigation)
- `/botslab_vacuum/www/botslab-routines-card.js` (Pre-bundled routine & schedule manager card with automatic EN/TR localization)

No manual HACS frontend installation or resource configuration is required.

### Generating a map card for your floor plan

Room outlines are specific to your home and change whenever rooms are renamed or edited in the Botslab app. Rather than hand-writing them:

1. Press the **Sync Live Map** button in Home Assistant so the robot uploads its floor plan.
2. Press **Generate Map Card Config**.

The integration then writes a complete, ready-to-paste card to `botslab_map_card.yaml` in your Home Assistant config directory, with every room outline filled in from the robot's own map. Add a **Manual** card in your dashboard and paste it.

### Scheduled Routines Card Example

Add a custom routine manager card to your dashboard:

```yaml
type: custom:botslab-routines-card
entity: sensor.botslab_schedules_YOUR_DEVICE_ID
vacuum_entity: vacuum.botslab_vacuum_YOUR_DEVICE_ID
```

Repeat steps 2 and 3 after changing rooms.

---

## 🤝 Contributing & License

Feedback and pull requests for other models (S8 Plus, S7, S9, S10) are warmly welcomed!  
This project is open-source under the [MIT License](LICENSE).
