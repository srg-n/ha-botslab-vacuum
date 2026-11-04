# Botslab / Qihoo 360 TSL Control Reference

This document catalogs the **Thing Specification Language (TSL)** services, properties, and status mappings supported by Botslab and Qihoo 360 robot vacuum cleaners.

---

## 1. Transport Mechanisms

Commands are sent via signed POST requests to `https://<region>-sapp-api.botslab.com`:

1. **Invoke Synchronous Service:**
   `POST /v1/iot/device/invoke_service`  
   Form body: `product_key`, `device_name`, `identifier` (service name), `input` (JSON string).
2. **Invoke Asynchronous Service:**
   `POST /v1/iot/device/invoke_service_async`  
   Returns `{code: 0, data: {request_id: ...}}`. The client waits via `GET /v1/iot/device/invoke_service_reply`.
3. **Set Property:**
   `POST /v1/iot/device/set_property` or `/set_desired_property`  
   Form body: `product_key`, `device_name`, `items` (JSON string `{Identifier: value}`).

---

## 2. Command Services Catalog

| Action | Identifier | Input Payload Schema | Notes |
|:---|:---|:---|:---|
| **Start Clean** | `StartDefaultClean` | `{"CleanTimes": 1}` | 1 = single pass, 2 = double pass. |
| **Pause** | `PauseRobot` | `{"TargetAction": 0}` | 0 = Cleaning, 1 = RetCharge, 2 = Others. |
| **Resume Work** | `ResumeWork` | `{}` | Resumes previously paused cleaning. |
| **Stop Clean** | `PauseRobot` | `{"TargetAction": 2}` | Maps to HA vacuum stop. |
| **Return to Dock** | `ReturnChargeBase` | `{}` | Sends vacuum to charging base. |
| **Locate Robot** | `SeekRobot` | `{}` | Robot chimes / plays audible prompt. |
| **Suction Power** | `SetSuctionPowLevelWithMode` | `{"Mode": 0, "Level": L}` | `Level`: 0=Quiet, 1=Normal, 2=Strong, 3=MAX. `Mode`: 0=Default, 1=Zone, 2=Area. |
| **Water Level** | `SetPadWetness` | `{"PadWetness": W}` | `W`: 1=Low, 2=Medium, 3=High. |
| **Mop Mode** | `SetMopModeSwitching` | `{"MopModeSwitching": M}` | `M`: 0=Vacuum & Mop, 1=Vacuum Only, 2=Mop Only. |
| **Auto-Boost** | `SetAutoBoost` | `{"AutoBoost": bool}` | Carpet suction boost toggle. |
| **Button LED** | `SetButtonBacklight` | `{"ButtonBacklight": bool}` | Physical button backlight LED. |
| **Collision Protect** | `SetCollisionProtection` | `{"CollisionProtection": bool}` | Ultrasonic / bumper sensitivity. |
| **Volume Level** | `SetVolumeLevel` | `{"VolumeLevel": int}` | Voice prompt volume (0–100%). |
| **Go To Target** | `SetTargetPos` + `StartGotoTarget` | `{"MapID": M, "Pos_X": X, "Pos_Y": Y}` | Pin-and-go point navigation. |
| **Zone Cleaning** | `SetZones` + `StartCleanInZones` | `{"MapID": M, "ZonesList": "..."}` | Cleans custom rectangular bounding boxes. |
| **Room Cleaning** | `StartCleanInAreas` | `{"MapID": M, "CleanID": C, "Url": U}` | Cleans selected rooms via uploaded OSS JSON. |
| **No-Go Zones** | `SetFbdPlaces` | `{"MapID": M, "FbdPlacesList": "..."}` | Sets forbidden / no-go boundaries inline. |
| **Sync Map** | `StartSyncMapPkgToOss` | `{"SyncDuration": 60}` | Commands robot to upload live map to OSS. |
| **Stop Sync Map** | `StopSyncMapPkgToOss` | `{}` | Stops live map OSS streaming. |
| **Reset Filter** | `ResetFilterLife` | `{}` | Resets HEPA filter lifetime counter. |
| **Reset Main Brush** | `ResetRollBrushLife` | `{}` | Resets main roller brush lifetime counter. |
| **Reset Side Brush** | `ResetSideBrushLife` | `{}` | Resets edge/side brush lifetime counter. |
| **Reset Sensors** | `ResetSensorCleanLife` | `{}` | Resets cliff and optical sensor cleaning alert. |
| **Get Track** | `GetCleanTrackWithPosIdx` | `{"StartPosIndex": idx}` | Paginates live trajectory points `posArray`. |

---

## 3. WorkingStatus Enum Mapping

The vacuum reports status in `WorkingStatus` (or `TEST_WorkingStatus`):

| Code | Value | Home Assistant State | Notes |
|:---|:---|:---|:---|
| `0` | StandBy | `idle` | Robot standing by. |
| `1` | DefaultClean | `cleaning` | Whole-house cleaning. |
| `2` | CleanInAreas | `cleaning` | Room-by-room area cleaning. |
| `3` | CleanInZones | `cleaning` | Bounded rectangular zone cleaning. |
| `4` | Paused | `paused` | Cleaning paused by user or error. |
| `5` | GotoChargeBase | `returning` | Returning to charging dock. |
| `6` | Charging | `docked` | Actively charging on base. |
| `7` | ChargeDone | `docked` | Fully charged on base. |
| `8` | Dormant | `idle` | Sleep / low-power standby mode. |
| `9` | InTrouble | `error` | Sunk, stuck, or hardware error. |
| `10` | InRemoteControl | `cleaning` | Manual directional remote driving. |
| `11` | InDustCollecting | `docked` | Auto-empty dock active. |

---

## 4. Key Telemetry Properties

Fetched via `GET /v1/iot/device/get_desired_property`:

| Property | Type | Unit / Range | Description |
|:---|:---|:---|:---|
| `BatteryLevel` | Integer | `0–100 %` | Current battery charge percentage. |
| `CurrentLocation` | JSON / List | `[x, y, angle]` | Robot world coordinates (mm) and heading (degrees). |
| `CleaningArea` | Float / Int | `m²` (x100 in raw) | Current session cleaned area. |
| `CleaningTime` | Integer | Minutes | Current session elapsed cleaning time. |
| `TotalCleaningArea` | Float | `m²` (x100 in raw) | Lifetime total cleaned area. |
| `TotalCleaningTime` | Integer | Minutes | Lifetime total cleaning run time. |
| `TasksTotalCount` | Integer | Count | Lifetime total cleaning runs completed. |
| `FilterLifeTime` | Integer | `0–100 %` | Remaining HEPA filter lifespan percentage. |
| `RollBrushLifeTime` | Integer | `0–100 %` | Remaining main brush lifespan percentage. |
| `EdgeBrushLifeTime` | Integer | `0–100 %` | Remaining side brush lifespan percentage. |
| `SensorLifeTime` | Integer | `0–100 %` | Remaining sensor cleanliness percentage. |
| `ErrorCode` | Integer | Code | Diagnostics error code (0 = OK). |
| `MoppingPadInstalled`| Boolean | `true/false` | Whether mopping bracket is attached. |
| `WaterTankInstalled` | Boolean | `true/false` | Whether water reservoir is inserted. |
| `MapPkgOssInfo` | JSON String | Object | Contains `MapID`, `UploadID`, `CleanID`, OSS paths. |
