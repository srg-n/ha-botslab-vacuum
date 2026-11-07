# Botslab / Qihoo 360 TSL Control Reference

This document catalogs the **Thing Specification Language (TSL)** services, properties, and status mappings supported by Botslab and Qihoo 360 robot vacuum cleaners (validated on the **Botslab S8** and **Qihoo 360 S6** via [Issue #1](https://github.com/srg-n/ha-botslab-vacuum/issues/1)).

---

## 1. Cloud Transport Mechanisms

Commands are sent via signed POST requests to `https://<region>-sapp-api.botslab.com`:

1. **Invoke Synchronous Service:**
   `POST /v1/iot/device/invoke_service`  
   Form body: `product_key`, `device_name`, `identifier` (service name), `input` (JSON-encoded string).
2. **Invoke Asynchronous Service:**
   `POST /v1/iot/device/invoke_service_async`  
   Used for long-running operations. Returns `{code: 0, data: {request_id: ...}}`. The client polls completion via `GET /v1/iot/device/invoke_service_reply`.
3. **Set Property:**
   `POST /v1/iot/device/set_property` or `/set_desired_property`  
   Form body: `product_key`, `device_name`, `items` (JSON-encoded object `{Identifier: value}`).

---

## 2. Command Services Catalog

The vendor firmware defines command services that directly manipulate robot motors, navigation states, and cleaning parameters:

| Action | Identifier | Input Payload Schema | Detailed Technical Function |
|:---|:---|:---|:---|
| **Start Clean** | `StartDefaultClean` | `{"CleanTimes": 1}` | Starts autonomous full-home cleaning. `CleanTimes: 1` performs a single coverage pass; `CleanTimes: 2` performs a double cross-hatch pass. |
| **Pause Clean** | `PauseRobot` | `{"TargetAction": 0}` | **Duraklat / Pause Cleaning:** Pauses an active cleaning session in place. Shuts down drive and suction motors while keeping the path and uncleaned room partitions in memory so cleaning can resume. |
| **Pause Docking** | `PauseRobot` | `{"TargetAction": 1}` | **Şarja Dönüşü Duraklat / Pause Return-to-Dock:** Interrupts the robot while driving back to the dock (`RetCharge` = Return to Charge Base) without aborting the docking task entirely. |
| **Stop Clean** | `PauseRobot` | `{"TargetAction": 2}` | **Görevi İptal Et & Durdur / Abort & Stop:** Completely terminates the active cleaning or returning cycle. Clears the target navigation queue, shuts down suction/brush motors, and switches robot state to `StandBy` (Idle). Corresponds to the Home Assistant `vacuum.stop` action. |
| **Resume Work** | `ResumeWork` | `{}` | Resumes a previously paused cleaning task (`TargetAction: 0`), restoring drive wheels and suction from where it stopped. |
| **Return to Dock** | `ReturnChargeBase` | `{}` | Commands the robot to abort active cleaning, compute a direct return path to the infrared charging dock, and begin auto-docking. |
| **Locate Robot** | `SeekRobot` | `{}` | Commands the robot speaker to chime and play an audible voice prompt ("I am here") to locate it under furniture. |
| **Suction Power** | `SetSuctionPowLevelWithMode` | `{"Mode": 0, "Level": L}` | Sets motor suction airflow. `Level`: `0` = Quiet, `1` = Standard, `2` = Strong, `3` = Max. `Mode`: `0` = Global/Default, `1` = Custom Zone Preset, `2` = Custom Area Preset. |
| **Water Flow Level** | `SetPadWetness` | `{"PadWetness": W}` | Controls the peristaltic electronic water pump output to the mopping cloth: `1` = Low (delicate wood), `2` = Medium (laminate/tile), `3` = High (heavy stains). |
| **Cleaning Mode** | `SetMopModeSwitching` | `{"MopModeSwitching": M}` | Configures active cleaning hardware: `0` = Vacuum & Mop (suction + water pump), `1` = Vacuum Only (dry sweep, water pump disabled), `2` = Mop Only (silent drag, suction motor off). |
| **Carpet Boost** | `SetAutoBoost` | `{"AutoBoost": bool}` | When enabled, ultrasound/optical floor sensors detect carpets and automatically ramp suction to Max power. |
| **Button LED** | `SetButtonBacklight` | `{"ButtonBacklight": bool}` | Controls whether physical power and home button LED backlights on the robot top panel remain illuminated during operation. |
| **Collision Protect** | `SetCollisionProtection` | `{"CollisionProtection": bool}` | Adjusts front bumper and ultrasonic collision avoidance sensitivity to prevent bumping into delicate furniture. |
| **Voice Volume** | `SetVolumeLevel` | `{"VolumeLevel": int}` | Adjusts internal speaker prompt volume as a percentage (`0`–`100`%). |
| **Go To Location** | `SetTargetPos` + `StartGotoTarget` | `{"MapID": M, "Pos_X": X, "Pos_Y": Y}` | Pin-and-go navigation. Sets millimeter target coordinates on the map and commands the robot to navigate to the exact point. |
| **Zone Cleaning** | `SetZones` + `StartCleanInZones` | `{"MapID": M, "ZonesList": "..."}` | Cleans custom rectangular bounding boxes defined in millimeter coordinates: `[[x1, y1, x2, y2, repeat_count], ...]`. |
| **Room Cleaning** | `SetCleanPolicyList` + `StartCleanInAreas` | `{"MapID": M, "CleanID": C, "Url": U}` | Cleans selected rooms with user-ordered sequence. Robot requires pre-call `SetCleanPolicyList` establishing `smartAreaIds` and `orderClean: true`, followed by OSS upload of `sweep_areas.txt` (`autoOrder: false`), and finally `StartCleanInAreas` with a fresh timestamped `CleanID`. |
| **No-Go Zones** | `SetFbdPlaces` | `{"MapID": M, "FbdPlacesList": "..."}` | Sets virtual boundaries and forbidden cleaning zones directly on the cloud map package. |
| **Sync Map to OSS** | `StartSyncMapPkgToOss` | `{"SyncDuration": 60}` | Instructs the physical robot to compress its live SLAM map and stream raw grid and trajectory updates to Alibaba Cloud OSS for 60 seconds. |
| **Stop Sync Map** | `StopSyncMapPkgToOss` | `{}` | Immediately stops the robot from streaming live map archives to OSS, reducing Wi-Fi and cloud upload traffic. |
| **Reset Filter** | `ResetFilterLife` | `{}` | Resets the HEPA filter maintenance countdown timer back to 100% after cleaning or replacement. |
| **Reset Main Brush** | `ResetRollBrushLife` | `{}` | Resets the central roller brush maintenance countdown timer back to 100%. |
| **Reset Side Brush** | `ResetSideBrushLife` | `{}` | Resets the side/edge sweeper brush maintenance countdown timer back to 100%. |
| **Reset Sensors** | `ResetSensorCleanLife` | `{}` | Clears the dirty cliff and wall optical sensor warning alert, resetting the cleaning interval. |
| **Get Clean Track** | `GetCleanTrackWithPosIdx` | `{"StartPosIndex": idx}` | Paginates through robot world coordinates `posArray` recorded during the current cleaning session to render the live cleaning trail. |

---

## 3. WorkingStatus Enum Mapping

The physical vacuum reports its live operational state via the `WorkingStatus` (or `TEST_WorkingStatus`) property. The integration maps these integers to standard Home Assistant `VacuumActivity` states:

| Raw Code | Vendor Status | Home Assistant State | Physical Robot State & Behavior |
|:---|:---|:---|:---|
| `0` | `StandBy` | `idle` | **Bekleme / Boşta:** The robot is outside the charging dock, stationary, motors disengaged, and waiting for a command. |
| `1` | `DefaultClean` | `cleaning` | **Otomatik / Genel Temizlik:** Performing full autonomous whole-home cleaning with path generation and coverage. |
| `2` | `CleanInAreas` | `cleaning` | **Oda Temizliği:** Actively cleaning specific partitioned rooms selected by the user. |
| `3` | `CleanInZones` | `cleaning` | **Bölge Temizliği:** Actively cleaning custom rectangular bounding boxes drawn on the map. |
| `4` | `Paused` | `paused` | **Duraklatıldı:** An active cleaning session was paused either by user command (`PauseRobot`) or due to a temporary obstacle. |
| `5` | `GotoChargeBase` | `returning` | **Şarja Dönüyor:** Cleaning is complete (or battery low); calculating direct return path and driving toward the charging dock. |
| `6` | `Charging` | `docked` | **Şarj Oluyor:** Successfully engaged on the dock charging contacts; battery is currently charging. |
| `7` | `ChargeDone` | `docked` | **Şarj Tamamlandı:** Stationary on the dock; battery is 100% full with trickle charging active. |
| `8` | `Dormant` | `idle` | **Derin Uyku / Düşük Güç:** Stationary in low-power standby mode with LIDAR and sensors asleep to conserve battery. |
| `9` | `InTrouble` | `error` | **Arıza / Hata:** Robot is stuck, wheels suspended, roller brush jammed, or LIDAR turret blocked. Inspect `ErrorCode` for diagnostics. |
| `10` | `InRemoteControl`| `cleaning` | **Uzaktan Kumanda:** User is manually steering the robot via directional controls in the mobile app. |
| `11` | `InDustCollecting` | `docked` | **Toz Boşaltma:** Robot is docked and the auto-empty base station suction motor is evacuating the dustbin (S8 Plus / auto-empty models). |

---

## 4. Key Telemetry Properties

Telemetry properties are fetched via `GET /v1/iot/device/get_desired_property`:

| Property | Type | Unit / Range | Description |
|:---|:---|:---|:---|
| `BatteryLevel` | Integer | `0–100 %` | Current battery state of charge. |
| `CurrentLocation` | JSON / List | `[x, y, angle]` | Robot coordinate position in millimeters relative to the map origin, plus heading angle `phi` in degrees. |
| `CleaningArea` | Float / Int | `m²` (raw is `cm²` or `dm²`) | Surface area swept and mopped during the current cleaning cycle. |
| `CleaningTime` | Integer | Minutes | Elapsed active cleaning duration in the current cleaning cycle. |
| `TotalCleaningArea` | Float | `m²` | Lifetime cumulative surface area cleaned by this robot across all sessions. |
| `TotalCleaningTime` | Integer | Minutes | Lifetime cumulative motor run time across all cleaning sessions. |
| `TasksTotalCount` | Integer | Count | Lifetime count of completed cleaning sessions. |
| `FilterLifeTime` | Integer | `0–100 %` | Remaining lifespan percentage of the HEPA air filter. |
| `RollBrushLifeTime` | Integer | `0–100 %` | Remaining lifespan percentage of the central roller brush. |
| `EdgeBrushLifeTime` | Integer | `0–100 %` | Remaining lifespan percentage of the side sweeping brush. |
| `SensorLifeTime` | Integer | `0–100 %` | Remaining optical cleanliness lifespan of the bottom cliff sensors. |
| `ErrorCode` | Integer | Code | Hardware error code (`0` = Normal / OK; non-zero indicates jam, bumper stuck, or sensor fault). |
| `MoppingPadInstalled`| Boolean | `true / false` | Microswitch sensor detecting whether the mopping pad bracket is physically clicked into place. |
| `WaterTankInstalled` | Boolean | `true / false` | Magnetic sensor detecting whether the 2-in-1 dustbin/water reservoir is inserted. |
| `MapPkgOssInfo` | JSON String | Object | Metadata containing current `MapID`, `UploadID`, `CleanID`, and Alibaba Cloud OSS paths for live floor plans. |
