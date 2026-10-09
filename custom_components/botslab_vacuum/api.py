"""Botslab Vacuum API client for Home Assistant."""
from __future__ import annotations

import asyncio
import base64
import copy
import hashlib
import hmac
import json
import logging
import random
import time
import urllib.parse
from typing import Any
import aiohttp

from .const import (
    APP_KEY,
    APP_SECRET,
    APP_VER,
    FAN_SPEED_TO_MODE,
    MOP_MODE_TO_INT,
    REGIONS,
    REQUEST_TIMEOUT,
    STATUS_CLEANING,
    STATUS_DOCKED,
    STATUS_ERROR,
    STATUS_IDLE,
    STATUS_PAUSED,
    STATUS_RETURNING,
    USER_AGENT,
    WATER_LEVEL_TO_INT,
)
from .map_util import decompress_lz4_block, render_map_png
from .models import BotslabMapInfo, BotslabRoom
from .quc_login import BotslabApiError, BotslabAuthError

_LOGGER = logging.getLogger(__name__)

# Distinct, muted fills so adjacent rooms stay readable on the dark map.
_ROOM_COLORS: tuple[tuple[int, int, int], ...] = (
    (38, 62, 104),
    (44, 78, 92),
    (62, 58, 96),
    (46, 88, 74),
    (96, 66, 52),
    (58, 72, 116),
    (88, 60, 84),
)


def _room_color(index: int) -> tuple[int, int, int]:
    """Return a stable fill colour for the nth room."""
    return _ROOM_COLORS[index % len(_ROOM_COLORS)]


def working_status_to_state(status_code: Any) -> str:
    """Map Botslab working status code to standard status string."""
    code_str = str(status_code).lower()
    if code_str in ("clean", "cleaning", "sweep", "sweeping", "1", "2"):
        return STATUS_CLEANING
    if code_str in ("charge", "charging", "docked", "dock", "5", "6"):
        return STATUS_DOCKED
    if code_str in ("pause", "paused", "3"):
        return STATUS_PAUSED
    if code_str in ("goback", "go_charging", "returning", "4"):
        return STATUS_RETURNING
    if code_str in ("error", "fault", "warn"):
        return STATUS_ERROR
    return STATUS_IDLE


class BotslabVacuumApi:
    """Async API client for Botslab IoT Cloud."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        region: str,
        m2: str,
        q: str,
        t: str,
    ) -> None:
        self.session = session
        self.region = region
        self.m2 = m2
        self.q = q
        self.t = t
        self.sid: str | None = None
        self.push_alias: str = ""
        self.qid: str | None = None

        reg_info = REGIONS.get(region, REGIONS["eu1"])
        self.base_url = f"https://{reg_info['api']}"
        self.cached_s3_signs: dict[str, str] = {}
        self._cached_upload_id: str = ""
        self._cached_map_bytes: bytes | None = None
        self._cached_rooms: dict[str, list[BotslabRoom]] = {}
        self._cached_map_info: dict[str, BotslabMapInfo | None] = {}

    def _sign(self) -> tuple[str, str, str]:
        """Generate timestamp, nonce, and MD5 signature for API requests."""
        ts = str(int(time.time()))
        nonce = "".join(random.choices("0123456789abcdef", k=32))
        raw = f"{APP_KEY}{self.m2}{ts}{nonce}{APP_SECRET}".encode("utf-8")
        sig = hashlib.md5(raw).hexdigest()
        return ts, nonce, sig

    def _base_query(self, ts: str, nonce: str, sig: str) -> dict[str, str]:
        return {
            "appkey": APP_KEY,
            "m2": self.m2,
            "sign": sig,
            "sign_ts": ts,
            "sign_no": nonce,
            "ts": ts,
            "no": nonce,
            "appver": APP_VER,
            "app_ver": APP_VER,
            "os": "android",
            "ci_model": "Pixel 7",
            "ci_brand": "Google",
            "ci_net": "wifi",
            "ci_osver": "33",
            "appch": "botslabadr",
            "ci_lang": "en-US",
            "ci_tz": "UTC+3",
            "app_type_id": "1",
            "ci_cy": "DE",
            "appflag": "online",
        }

    def _headers(self, content_type: str | None = None) -> dict[str, str]:
        hdrs: dict[str, str] = {
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
        }
        # Attach jws Authorization header (standard across all modern Botslab services)
        if self.q and self.t:
            payload: dict[str, str] = {"Q": self.q, "T": self.t}
            if self.sid:
                payload["sid"] = self.sid
            blob = base64.b64encode(
                json.dumps(payload, separators=(",", ":")).encode("utf-8")
            ).decode("utf-8")
            hdrs["Authorization"] = f"jws {blob}"

        cookies: list[str] = []
        if self.sid:
            cookies.append(f"sid={self.sid}")
        if self.q:
            cookies.append(f"q={self.q}")
        if self.t:
            cookies.append(f"t={self.t}")
        if cookies:
            hdrs["Cookie"] = "; ".join(cookies)
        if content_type:
            hdrs["Content-Type"] = content_type
        return hdrs

    async def app_login(self) -> dict[str, Any]:
        """Perform app login to exchange QUC cookies for sid and push_alias."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/app/login"
        params = self._base_query(ts, nonce, sig)
        headers = self._headers("application/x-www-form-urlencoded")

        try:
            async with self.session.post(
                url,
                params=params,
                headers=headers,
                data={"m2": self.m2},
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"app_login network failed: {err}") from err

        code = data.get("code")
        if code != 0:
            raise BotslabAuthError(f"app_login failed code {code}: {data.get('message') or data.get('msg')}")

        result = data.get("data") or data.get("result") or {}
        sid = result.get("sid") or result.get("home_sid")
        if not sid:
            raise BotslabAuthError("app_login succeeded but sid was missing in response")

        self.sid = sid
        self.push_alias = result.get("push_alias") or ""
        self.qid = str(result.get("qid") or "")
        _LOGGER.debug("app_login successful. sid: %s..., push_alias: %s", sid[:8], self.push_alias)
        return result

    async def get_devices(self) -> list[dict[str, Any]]:
        """Fetch all user devices from IoT Device List."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/list"
        params = self._base_query(ts, nonce, sig)

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_devices failed: {err}") from err

        code = data.get("code")
        if code != 0:
            raise BotslabApiError(f"get_devices code {code}: {data.get('message')}")

        res = data.get("data") or data.get("result") or []
        if isinstance(res, dict):
            return res.get("list") or []
        return res

    async def get_desired_property(self, sn: str, product_key: str) -> dict[str, Any]:
        """Fetch properties for a specific device."""
        props, _ = await self.get_property_extended(sn, product_key)
        return props

    async def get_property_extended(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch extended properties including signed OSS map URLs and all telemetry."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/get_property"
        params = self._base_query(ts, nonce, sig)
        params.update({"product_key": product_key, "device_name": sn, "extend": "1"})

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_property failed: {err}") from err

        code = data.get("code")
        if code in (100003, 102008, 102003, 1002, 1003, 401):
            raise BotslabAuthError(f"Auth expired: code {code}")
        if code != 0:
            # Fallback to get_desired_property if get_property is rejected
            return await self._get_desired_property_fallback(sn, product_key)

        inner = data.get("data") or data.get("result") or {}
        signs = inner.get("extend", {}).get("s3_signs", {})
        if signs:
            self.cached_s3_signs.update(signs)

        result_raw = inner.get("result")
        props: dict[str, Any] = {}
        if isinstance(result_raw, str):
            try:
                props = json.loads(result_raw)
            except ValueError:
                props = {}
        elif isinstance(result_raw, dict):
            props = result_raw

        return props, signs

    async def _get_desired_property_fallback(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fallback property fetcher."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/get_desired_property"
        params = self._base_query(ts, nonce, sig)
        params.update({"product_key": product_key, "device_name": sn})

        try:
            async with self.session.get(
                url,
                params=params,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"get_desired_property fallback failed: {err}") from err

        inner = data.get("data") or data.get("result") or {}
        signs = inner.get("s3_signs") or {}
        if signs:
            self.cached_s3_signs.update(signs)

        props: dict[str, Any] = {}
        for item in inner.get("properties") or []:
            if isinstance(item, dict) and "identifier" in item:
                props[item["identifier"]] = item.get("value")
        return props, signs

    async def get_upload_config(self, sn: str, product_key: str) -> dict[str, Any] | None:
        """Fetch OSS upload configuration and STS tokens for sweep_areas."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/user/get_upload_config"
        q = self._base_query(ts, nonce, sig)
        q.update({
            "product_key": product_key,
            "device_name": sn,
            "file_type": "txt",
            "scene_id": "robot_config",
            "scene_info": json.dumps({"id": "sweep_areas"}, separators=(",", ":")),
        })
        try:
            async with self.session.get(
                url,
                params=q,
                headers=self._headers(),
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
                if data.get("code") == 0:
                    return data.get("data", {}).get("upload_info")
        except Exception as err:
            _LOGGER.error("Failed to get upload config: %s", err)
        return None

    async def _upload_to_oss(self, upload_info: dict[str, Any], payload: dict[str, Any]) -> str | None:
        """Upload sweep payload to Alibaba Cloud OSS using STS token and HMAC-SHA1 signature."""
        try:
            sts = upload_info.get("sts", {})
            bucket = upload_info.get("bucket", "")
            ep = upload_info.get("endpoint", "")
            path = upload_info.get("path", "")
            key_id = sts.get("accesskey_id", "")
            secret = sts.get("accesskey_secret", "")
            token = sts.get("security_token", "")
            if not all([key_id, secret, token, bucket, ep, path]):
                return None

            content = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
            md5_val = base64.b64encode(hashlib.md5(content).digest()).decode("utf-8")
            date_str = time.strftime("%a, %d %b %Y %H:%M:%S GMT", time.gmtime())
            sts_str = f"PUT\n{md5_val}\napplication/octet-stream\n{date_str}\nx-oss-security-token:{token}\n/{bucket}/{path}"
            sig = base64.b64encode(
                hmac.new(secret.encode("utf-8"), sts_str.encode("utf-8"), hashlib.sha1).digest()
            ).decode("utf-8")

            put_url = f"https://{bucket}.{ep}/{urllib.parse.quote(path, safe='')}"
            headers = {
                "x-oss-security-token": token,
                "Date": date_str,
                "Content-Type": "application/octet-stream",
                "Content-MD5": md5_val,
                "Authorization": f"OSS {key_id}:{sig}",
                "Content-Length": str(len(content)),
            }
            async with self.session.put(
                put_url,
                data=content,
                headers=headers,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                if resp.status in (200, 201):
                    return f"aliyun://{bucket}.{ep}/{path}"
                _LOGGER.error("OSS PUT failed with status %s", resp.status)
        except Exception as err:
            _LOGGER.error("OSS upload exception: %s", err)
        return None

    @staticmethod
    def _parse_oss_info(raw: Any) -> dict[str, Any]:
        """Parse the MapPkgOssInfo property into a dict."""
        if isinstance(raw, dict):
            return raw
        if isinstance(raw, str):
            try:
                parsed = json.loads(raw)
            except (TypeError, ValueError):
                return {}
            return parsed if isinstance(parsed, dict) else {}
        return {}

    async def _fetch_signed_json(
        self, url: str | None, signed: str | None
    ) -> dict[str, Any] | None:
        """Download and decode a JSON document from a signed OSS URL."""
        if not signed:
            return None
        try:
            async with self.session.get(
                signed, timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)
            ) as resp:
                if resp.status in (200, 206):
                    return await resp.json(content_type=None)
        except Exception as err:
            _LOGGER.debug("Map JSON fetch error for %s: %s", url, err)
        return None

    @staticmethod
    def _map_quality(map_json: dict[str, Any]) -> tuple[int, int]:
        """Rank a map candidate by how useful it is.

        Returns ``(total_outline_vertices, room_count)``. Room polygons with
        more vertices describe the floor plan more accurately, and a larger
        set of rooms is preferable, so the best available candidate is chosen
        instead of simply the first one that downloads.
        """
        rooms = BotslabVacuumApi._parse_rooms(map_json)
        return (
            sum(len(room.outline) for room in rooms),
            len(rooms),
        )

    async def get_map_json(self, sn: str, product_key: str) -> tuple[dict[str, Any] | None, dict[str, Any]]:
        """Return the best available map document plus device properties.

        The cloud exposes room geometry through several OSS objects that are
        refreshed at different times: the current map package, the room
        segmentation (``sweep_areas``) and older map archives. They can
        disagree, so each candidate is scored and the most detailed one wins.
        Falls back gracefully when a candidate is missing or unsigned.
        """
        props, signs = await self.get_property_extended(sn, product_key)

        def usable(document: dict[str, Any]) -> bool:
            """A candidate is only useful if it has a drawable raster."""
            return bool(
                document.get("width") and document.get("height") and document.get("map")
            )

        # The device advertises the current map package; its signed URL keys the
        # cache. Signatures for several related objects (older map archives and
        # the room segmentation) arrive in the same payload.
        map_url = self._parse_oss_info(props.get("MapPkgOssInfo")).get("Url")

        candidates: list[tuple[dict[str, Any], str]] = []

        async def consider(url: str, label: str) -> None:
            signed = signs.get(url) or self.cached_s3_signs.get(url)
            document = await self._fetch_signed_json(url, signed)
            if document and (document.get("smartArea") or document.get("map")):
                candidates.append((document, label))

        if map_url:
            await consider(map_url, "current map")

        # Related objects arrive signed alongside the current one. Try the ones
        # that look like maps or room definitions; there are usually few.
        for url in self.cached_s3_signs:
            if url == map_url:
                continue
            tail = url.rsplit("/", 2)
            folder = tail[-2] if len(tail) >= 2 else ""
            if folder in ("temp", "robot_config", "180days", "90days", "long"):
                await consider(url, folder or "related object")

        if not candidates:
            return None, props

        # Prefer documents that carry a raster, then rank by geometry detail.
        with_raster = [c for c in candidates if usable(c[0])]
        pool = with_raster or candidates

        best_doc, best_source = max(pool, key=lambda c: self._map_quality(c[0]))
        vertices, room_count = self._map_quality(best_doc)

        if len(pool) > 1:
            others = ", ".join(
                f"{src} ({self._map_quality(doc)[0]} vertices)"
                for doc, src in pool
                if src != best_source
            )
            _LOGGER.debug(
                "Map candidates: chose %s (%d vertices, %d rooms) over %s",
                best_source,
                vertices,
                room_count,
                others,
            )

        # A room-only document carries no raster, so borrow the grid from a
        # document that has one to keep geometry and image consistent.
        if not usable(best_doc):
            for doc, _ in pool:
                if usable(doc):
                    merged = dict(doc)
                    for key in ("map", "width", "height", "x_min", "y_min", "resolution"):
                        if key in doc:
                            merged[key] = doc[key]
                    best_doc = merged
                    break

        return best_doc, props

    @staticmethod
    def _parse_rooms(map_json: dict[str, Any]) -> list[BotslabRoom]:
        """Parse room definitions, including polygon outlines, from map JSON."""
        rooms: list[BotslabRoom] = []
        smart_area = map_json.get("smartArea") or {}
        for entry in smart_area.get("value") or []:
            if not isinstance(entry, dict):
                continue
            rid = str(entry.get("id", ""))
            raw_name = str(entry.get("name", ""))
            try:
                name = base64.b64decode(raw_name).decode("utf-8").strip()
            except Exception:
                name = raw_name
            if not name:
                name = f"Room {rid}"

            outline: list[tuple[int, int]] = []
            for vertex in entry.get("vertexs") or []:
                try:
                    x, y = vertex[0], vertex[1]
                    outline.append((int(x), int(y)))
                except (TypeError, ValueError, IndexError):
                    continue

            rooms.append(
                BotslabRoom(
                    room_id=rid,
                    name=name,
                    clean_state=int(entry.get("cleanTimes") or 0),
                    color=str(entry.get("color") or ""),
                    outline=tuple(outline),
                    wind_mode=str(entry.get("windMode") or "auto"),
                    water_pump=int(entry.get("waterPump") or 0),
                )
            )
        return rooms

    def _build_map_info(self, map_json: dict[str, Any]) -> BotslabMapInfo | None:
        """Assemble map geometry (grid size, origin, resolution, rooms)."""
        width = map_json.get("width")
        height = map_json.get("height")
        if not width or not height:
            return None
        try:
            resolution = float(map_json.get("resolution") or 0.05) or 0.05
        except (TypeError, ValueError):
            resolution = 0.05
        try:
            x_min = float(map_json.get("x_min") or 0)
            y_min = float(map_json.get("y_min") or 0)
        except (TypeError, ValueError):
            x_min = y_min = 0.0
        return BotslabMapInfo(
            width=int(width),
            height=int(height),
            x_min=x_min,
            y_min=y_min,
            resolution=resolution,
            rooms=self._parse_rooms(map_json),
        )

    async def fetch_rooms(self, sn: str, product_key: str) -> list[BotslabRoom]:
        """Fetch and decode rooms from the current cloud map."""
        map_json, _ = await self.get_map_json(sn, product_key)
        if not map_json:
            return self._cached_rooms.get(sn, [])
        rooms = self._parse_rooms(map_json)
        if rooms:
            self._cached_rooms[sn] = rooms
        return rooms

    def get_cached_rooms(self, sn: str) -> list[BotslabRoom]:
        """Return cached rooms for device."""
        return self._cached_rooms.get(sn, [])

    def get_cached_map_info(self, sn: str) -> BotslabMapInfo | None:
        """Return cached map geometry for a device, if already fetched."""
        return self._cached_map_info.get(sn)

    async def get_live_map(self, sn: str, product_key: str) -> bytes | None:
        """Fetch, decompress and render the latest map PNG, with room overlays.

        Room polygons are read from the same payload and painted on top of
        the grid so a dashboard can show where each room sits. The map
        geometry (origin, resolution, room outlines) is cached separately in
        ``get_map_info`` because dashboards need it for calibration.
        """
        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            return self._cached_map_bytes

        map_info = self._build_map_info(map_json)
        if map_info and map_info.rooms:
            self._cached_rooms[sn] = map_info.rooms
        self._cached_map_info[sn] = map_info

        oss_info = self._parse_oss_info(props.get("MapPkgOssInfo"))
        upload_id = str(oss_info.get("UploadID") or oss_info.get("CleanID") or "")

        if upload_id and upload_id == self._cached_upload_id and self._cached_map_bytes:
            return self._cached_map_bytes

        try:
            width = map_json["width"]
            height = map_json["height"]
            compressed = base64.b64decode(map_json["map"])
            pixels = decompress_lz4_block(compressed, width * height)
            if len(pixels) != width * height:
                raise ValueError(
                    f"decompressed size {len(pixels)} != expected {width * height}"
                )

            overlays: list[tuple[list[tuple[float, float]], tuple[int, int, int]]] = []
            if map_info:
                for index, room in enumerate(map_info.rooms):
                    if len(room.outline) < 3:
                        continue
                    overlays.append(
                        (
                            map_info.polygon_to_pixels(room.outline),
                            _room_color(index),
                        )
                    )

            png_bytes = render_map_png(width, height, pixels, overlays)
            self._cached_upload_id = upload_id
            self._cached_map_bytes = png_bytes
            return png_bytes
        except Exception as err:
            _LOGGER.warning("Map decoding failed: %s", err)
            return self._cached_map_bytes

    async def get_map_info(self, sn: str, product_key: str) -> BotslabMapInfo | None:
        """Return cached map geometry, fetching it if the cache is empty."""
        cached = self._cached_map_info.get(sn)
        if cached is not None:
            return cached
        await self.get_live_map(sn, product_key)
        return self._cached_map_info.get(sn)

    async def invoke_sync(
        self, sn: str, product_key: str, action: str, params: dict[str, Any]
    ) -> dict[str, Any]:
        """Invoke synchronous device action."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/invoke_service"
        q = self._base_query(ts, nonce, sig)
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                return await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"invoke_sync {action} failed: {err}") from err

    async def invoke_async(
        self, sn: str, product_key: str, action: str, params: dict[str, Any]
    ) -> dict[str, Any]:
        """Invoke asynchronous device action."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/invoke_service_async"
        q = self._base_query(ts, nonce, sig)
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                return await resp.json(content_type=None)
        except Exception as err:
            raise BotslabApiError(f"invoke_async {action} failed: {err}") from err

    async def wait_async_reply(self, request_id: str, timeout: int = 8) -> bool:
        """Wait for asynchronous command confirmation."""
        ts, nonce, sig = self._sign()
        url = f"{self.base_url}/v1/iot/device/invoke_service_reply"
        start_t = time.time()
        while time.time() - start_t < timeout:
            q = self._base_query(ts, nonce, sig)
            q["request_id"] = request_id
            try:
                async with self.session.get(
                    url,
                    params=q,
                    headers=self._headers(),
                    timeout=aiohttp.ClientTimeout(total=5),
                ) as resp:
                    data = await resp.json(content_type=None)
                    if data.get("code") == 0:
                        return True
            except Exception:
                pass
            await asyncio.sleep(1)
        return False

    async def start_clean(self, sn: str, product_key: str) -> None:
        """Start or resume default cleaning."""
        await self.invoke_sync(sn, product_key, "StartDefaultClean", {"CleanTimes": 1})

    async def pause_clean(self, sn: str, product_key: str) -> None:
        """Pause current cleaning operation."""
        await self.invoke_sync(sn, product_key, "PauseRobot", {})

    async def stop_clean(self, sn: str, product_key: str) -> None:
        """Stop current cleaning operation."""
        await self.invoke_sync(sn, product_key, "PauseRobot", {})

    async def return_to_dock(self, sn: str, product_key: str) -> None:
        """Send robot back to charging dock."""
        await self.invoke_sync(sn, product_key, "ReturnChargeBase", {})

    async def locate(self, sn: str, product_key: str) -> None:
        """Play sound on robot to locate it."""
        await self.invoke_sync(sn, product_key, "SeekRobot", {})

    async def set_fan_speed(self, sn: str, product_key: str, fan_speed: str) -> None:
        """Set vacuum suction power."""
        mode = FAN_SPEED_TO_MODE.get(fan_speed, 2)
        await self.invoke_sync(sn, product_key, "SetSuctionPowLevel", {"SuctionPowLevel": mode})

    async def reset_consumable(self, sn: str, product_key: str, consumable: str) -> None:
        """Reset consumable life counter."""
        cmd_map = {
            "filter": "ResetFilterLife",
            "main_brush": "ResetMainBrushLife",
            "side_brush": "ResetSideBrushLife",
            "sensor": "ResetSensorCleanLife",
        }
        action = cmd_map.get(consumable)
        if action:
            await self.invoke_sync(sn, product_key, action, {})

    async def clean_rooms(
        self,
        sn: str,
        product_key: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean specific room(s) by ID via StartCleanInAreas."""
        if fan_speed:
            await self.set_fan_speed(sn, product_key, fan_speed)
        if water_level:
            await self.set_water_level(sn, product_key, water_level)

        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            raise BotslabApiError("Cannot clean rooms: current map could not be downloaded")

        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))
        clean_id = f"{sn}-{int(time.time())}"

        sa = map_json.get("smartArea") or {}
        room_list = copy.deepcopy(sa.get("value", []))
        int_room_ids = [int(r) for r in room_ids if str(r).isdigit()]

        for r in room_list:
            if r.get("id") in int_room_ids:
                r["cleanTimes"] = repeat_times
                if water_level and water_level in WATER_LEVEL_TO_INT:
                    r["waterPump"] = WATER_LEVEL_TO_INT[water_level]

        sweep_payload = {
            "mapId": map_id,
            "value": room_list,
            "activeIds": int_room_ids,
            "areaCleanActiveId": None,
            "autoOrder": False,
            "cleanTimes": repeat_times,
            "isAttrOn": 1,
        }

        upload_info = await self.get_upload_config(sn, product_key)
        if not upload_info:
            raise BotslabApiError("Cannot clean rooms: OSS upload config unavailable")

        uploaded_url = await self._upload_to_oss(upload_info, sweep_payload)
        if not uploaded_url:
            raise BotslabApiError("Cannot clean rooms: OSS upload failed")

        res = await self.invoke_async(
            sn,
            product_key,
            "StartCleanInAreas",
            {
                "MapID": map_id,
                "CleanID": clean_id,
                "Url": uploaded_url,
            },
        )
        req_id = res.get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

    async def clean_zone(
        self,
        sn: str,
        product_key: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) via SetZones + StartCleanInZones."""
        if fan_speed:
            await self.set_fan_speed(sn, product_key, fan_speed)
        if water_level:
            await self.set_water_level(sn, product_key, water_level)

        props, _ = await self.get_property_extended(sn, product_key)
        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))

        wp = WATER_LEVEL_TO_INT.get(water_level, 0) if water_level else 0
        zone_objs = []
        for i, z in enumerate(zones):
            x1, y1, x2, y2 = int(z[0]), int(z[1]), int(z[2]), int(z[3])
            zone_objs.append({
                "name": f"rect{i+1}",
                "id": i + 1,
                "mode": None,
                "active": "normal",
                "forbidType": None,
                "windMode": "auto",
                "cleanTimes": repeat_times,
                "waterPump": wp,
                "material": 0,
                "roomType": None,
                "vertexs": [[x2, y1], [x1, y1], [x1, y2], [x2, y2]],
                "radius": 0,
                "tag": None,
                "relativeRoom": -1,
            })

        active_ids = [z["id"] for z in zone_objs]
        zones_payload = {
            "zones": zone_objs,
            "activeIds": active_ids,
            "cleanTimes": repeat_times,
            "isAttrOn": 0,
        }

        res = await self.invoke_async(
            sn,
            product_key,
            "SetZones",
            {
                "MapID": map_id,
                "ZonesList": json.dumps(zones_payload, separators=(",", ":")),
            },
        )
        req_id = res.get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

        await self.invoke_sync(sn, product_key, "StartCleanInZones", {})

    async def goto_target(self, sn: str, product_key: str, x: int, y: int) -> None:
        """Send robot to target point coordinates."""
        props, _ = await self.get_property_extended(sn, product_key)
        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))
        await self.invoke_sync(
            sn, product_key, "SetTargetPos", {"MapID": map_id, "Pos_X": int(x), "Pos_Y": int(y)}
        )
        await asyncio.sleep(0.5)
        await self.invoke_sync(sn, product_key, "StartGotoTarget", {})

    async def set_water_level(self, sn: str, product_key: str, level: str | int) -> None:
        """Set pad wetness / water pump flow rate."""
        val = WATER_LEVEL_TO_INT.get(str(level).lower(), int(level) if str(level).isdigit() else 2)
        await self.invoke_sync(sn, product_key, "SetPadWetness", {"PadWetness": val})

    async def set_mop_mode(self, sn: str, product_key: str, mode: str | int) -> None:
        """Set mop mode switching (0: Vacuum & Mop, 1: Vacuum Only, 2: Mop Only)."""
        val = MOP_MODE_TO_INT.get(str(mode).lower(), int(mode) if str(mode).isdigit() else 0)
        await self.invoke_sync(sn, product_key, "SetMopModeSwitching", {"MopModeSwitching": val})

    async def set_auto_boost(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle carpet auto suction boost."""
        await self.invoke_sync(sn, product_key, "SetAutoBoost", {"AutoBoost": bool(state)})

    async def set_button_backlight(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle physical button LED light."""
        await self.invoke_sync(sn, product_key, "SetButtonBacklight", {"ButtonBacklight": bool(state)})

    async def set_collision_protection(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle collision protection sensor sensitivity."""
        await self.invoke_sync(sn, product_key, "SetCollisionProtection", {"CollisionProtection": bool(state)})

    async def set_volume_level(self, sn: str, product_key: str, volume: int) -> None:
        """Set speaker voice volume (0-100)."""
        vol = max(0, min(100, int(volume)))
        await self.invoke_sync(sn, product_key, "SetVolumeLevel", {"VolumeLevel": vol})

    async def start_map_sync(self, sn: str, product_key: str, duration_s: int = 60) -> None:
        """Tell robot to sync live map package to OSS."""
        res = await self.invoke_async(
            sn, product_key, "StartSyncMapPkgToOss", {"SyncDuration": int(duration_s)}
        )
        req_id = res.get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

    async def stop_map_sync(self, sn: str, product_key: str) -> None:
        """Tell robot to stop syncing live map to OSS."""
        await self.invoke_sync(sn, product_key, "StopSyncMapPkgToOss", {})
