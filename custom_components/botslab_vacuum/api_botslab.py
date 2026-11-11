"""Modern Botslab cloud backend client (TSL RPC invoke_service, device shadow, base station, maps)."""
from __future__ import annotations

import asyncio
import base64
import copy
import hashlib
import hmac
import json
import logging
import sys
import time
import urllib.parse
from typing import Any
import aiohttp

from .api_base import (
    BotslabBaseApiClient,
    working_status_to_state,
)
from .const import (
    ACTIVE_STATUSES,
    AUTH_EXPIRED_CODES,
    EP_GET_DSL,
    EP_OTA_CHECK,
    EP_USER_MULTI_MAP,
    FAN_SPEED_TO_LEVEL,
    FAN_SPEED_TO_MODE,
    FAN_SPEEDS_HA_TO_360,
    MOP_MODE_TO_INT,
    PROP_CARPET_MODE,
    PROP_CHILD_LOCK,
    PROP_NOT_DISTURB,
    REQUEST_TIMEOUT,
    SERVICE_CUSTOM_CLEAN,
    SERVICE_DELETE_MAP,
    SERVICE_GET_STATION_INFO,
    SERVICE_REMOTE_CONTROL_MODE,
    SERVICE_SAVE_MAP,
    SERVICE_SEND_REMOTE_CONTROL,
    SERVICE_SET_FROM_MAP,
    SERVICE_START_IN_DUST,
    SERVICE_START_MOP_DRY,
    SERVICE_START_MOP_WASH,
    SERVICE_STOP_MOP_DRY,
    SERVICE_STOP_MOP_WASH,
    STATUS_CLEANING,
    WATER_LEVEL_TO_INT,
)
from .exceptions import BotslabCommandError
from .map_util import (
    decompress_lz4_block,
    render_map_advanced,
)
from .models import BotslabMapInfo, BotslabRoom
from .quc_login import BotslabApiError, BotslabAuthError

_LOGGER = logging.getLogger(__name__)


def _get_map_renderer() -> Any:
    mod = sys.modules.get("custom_components.botslab_vacuum.api")
    if mod and hasattr(mod, "render_map_advanced"):
        return mod.render_map_advanced
    return render_map_advanced


def _get_lz4_decompressor() -> Any:
    mod = sys.modules.get("custom_components.botslab_vacuum.api")
    if mod and hasattr(mod, "decompress_lz4_block"):
        return mod.decompress_lz4_block
    return decompress_lz4_block


class BotslabModernClient(BotslabBaseApiClient):
    """Modern Botslab IoT Cloud Client."""

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
        try:
            code_int = int(code) if code is not None else -1
        except (ValueError, TypeError):
            code_int = -1
        if code_int != 0:
            raise BotslabAuthError(
                f"app_login failed code {code}: {data.get('message') or data.get('msg')}"
            )

        result = data.get("data") or data.get("result") or {}
        sid = result.get("sid") or result.get("home_sid")
        if not sid:
            raise BotslabAuthError("app_login succeeded but sid was missing in response")

        self.sid = sid
        self.push_alias = result.get("push_alias") or ""
        self.qid = str(result.get("qid") or "")
        _LOGGER.debug(
            "app_login successful. sid: %s..., push_alias: %s",
            sid[:8],
            self.push_alias,
        )
        return result

    async def login(self) -> dict[str, Any]:
        """Public alias for app_login."""
        return await self.app_login()

    async def _handle_auth_retry(self) -> None:
        """Refresh session token when expired or stolen."""
        async with self._auth_lock:
            _LOGGER.info("Session expired, automatically re-authenticating with cloud...")
            await self.app_login()

    async def get_devices(self) -> list[dict[str, Any]]:
        """Fetch all user devices from IoT Device List."""
        url = f"{self.base_url}/v1/iot/device/list"
        for attempt in range(2):
            ts, nonce, sig = self._sign()
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
            if code in AUTH_EXPIRED_CODES:
                if attempt == 0 and self.q and self.t:
                    await self._handle_auth_retry()
                    continue
                raise BotslabAuthError(f"Auth expired: code {code}")
            if code != 0:
                raise BotslabApiError(f"get_devices code {code}: {data.get('message')}")
            break

        _LOGGER.debug("get_devices raw response from %s: %s", url, data)

        res = (
            data.get("data")
            or data.get("result")
            or data.get("list")
            or data.get("devices")
            or []
        )
        if isinstance(res, dict):
            raw_list = (
                res.get("list")
                or res.get("devices")
                or res.get("device_list")
                or res.get("devList")
                or res.get("bind_list")
                or res.get("cleanDevList")
                or []
            )
            return raw_list if isinstance(raw_list, list) else []
        return res if isinstance(res, list) else []

    async def get_desired_property(self, sn: str, product_key: str) -> dict[str, Any]:
        """Fetch properties for a specific device."""
        props, _ = await self.get_property_extended(sn, product_key)
        return props

    async def get_property_extended(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch extended properties including signed OSS map URLs and all telemetry."""
        url = f"{self.base_url}/v1/iot/device/get_property"
        for attempt in range(2):
            ts, nonce, sig = self._sign()
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
            if code in AUTH_EXPIRED_CODES:
                if attempt == 0 and self.q and self.t:
                    await self._handle_auth_retry()
                    continue
                raise BotslabAuthError(f"Auth expired: code {code}")
            if code != 0:
                return await self._get_desired_property_fallback(sn, product_key)
            break

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
            props = dict(result_raw)

        for item in inner.get("properties") or []:
            if isinstance(item, dict) and "identifier" in item:
                props.setdefault(item["identifier"], item.get("value"))

        for k, v in inner.items():
            if k not in ("result", "extend", "s3_signs", "properties"):
                props.setdefault(k, v)

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
        url = f"{self.base_url}/v1/user/get_upload_config"
        for attempt in range(2):
            ts, nonce, sig = self._sign()
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
                    code = data.get("code")
                    if code in AUTH_EXPIRED_CODES:
                        if attempt == 0 and self.q and self.t:
                            await self._handle_auth_retry()
                            continue
                        raise BotslabAuthError(f"Auth expired: code {code}")
                    if code == 0:
                        return data.get("data", {}).get("upload_info")
            except BotslabAuthError:
                raise
            except Exception as err:
                _LOGGER.error("Failed to get upload config: %s", err)
            break
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
        """Rank a map candidate by how useful it is. Returns (total_outline_vertices, room_count)."""
        rooms = BotslabModernClient._parse_rooms(map_json)
        return (
            sum(len(room.outline) for room in rooms),
            len(rooms),
        )

    async def get_map_json(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any] | None, dict[str, Any]]:
        """Return the best available map document plus device properties."""
        props, signs = await self.get_property_extended(sn, product_key)

        def usable(document: dict[str, Any]) -> bool:
            return bool(
                document.get("width") and document.get("height") and document.get("map")
            )

        map_url = self._parse_oss_info(props.get("MapPkgOssInfo")).get("Url")

        candidates: list[tuple[dict[str, Any], str, str]] = []

        async def consider(url: str, label: str) -> None:
            signed = signs.get(url) or self.cached_s3_signs.get(url)
            document = await self._fetch_signed_json(url, signed)
            if document and (document.get("smartArea") or document.get("map")):
                candidates.append((document, label, url))

        if map_url:
            await consider(map_url, "current map")

        all_sign_urls = dict(self.cached_s3_signs)
        if signs:
            all_sign_urls.update(signs)

        for url in all_sign_urls:
            if url == map_url:
                continue
            tail = url.rsplit("/", 2)
            folder = tail[-2] if len(tail) >= 2 else ""
            matched_folder = next(
                (f for f in ("1days", "temp", "robot_config", "180days", "90days", "long") if f in url or f == folder),
                None,
            )
            if matched_folder is not None:
                label = "1days live map" if "1days" in matched_folder else (matched_folder or folder or "related object")
                await consider(url, label)

        if not candidates:
            return None, props

        with_raster = [c for c in candidates if usable(c[0])]
        pool = with_raster or candidates

        raw_status = props.get("WorkingStatus")
        is_active_cleaning = (
            working_status_to_state(raw_status) == STATUS_CLEANING
            or raw_status in (1, 2, 3, 10, "1", "2", "3", "10")
            or raw_status in ACTIVE_STATUSES
        )

        if is_active_cleaning:
            live_pool = [
                c for c in pool
                if "1days" in c[2] or "/temp/" in c[2] or "1days" in c[1].lower() or "temp" in c[1].lower()
            ]
            if live_pool:
                pool = live_pool

        best_doc, best_source, _ = max(pool, key=lambda c: self._map_quality(c[0]))
        vertices, room_count = self._map_quality(best_doc)

        if len(pool) > 1:
            others = ", ".join(
                f"{src} ({self._map_quality(doc)[0]} vertices)"
                for doc, src, _ in pool
                if src != best_source
            )
            _LOGGER.debug(
                "Map candidates: chose %s (%d vertices, %d rooms) over %s",
                best_source,
                vertices,
                room_count,
                others,
            )

        if not usable(best_doc):
            for doc, _, _ in pool:
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
        """Assemble map geometry (grid size, origin, resolution, rooms, dock, no-go, clean-zones, carpets)."""
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

        dock = map_json.get("chargeHandlePos") or map_json.get("charge_pos") or map_json.get("dock_pos")
        dock_pos = (
            (float(dock[0]), float(dock[1]))
            if isinstance(dock, (list, tuple)) and len(dock) >= 2
            else None
        )
        raw_area = map_json.get("area") or map_json.get("zones") or []
        no_go = [
            a
            for a in raw_area
            if isinstance(a, dict) and a.get("active") == "forbid"
        ]
        clean_zones = [
            a
            for a in raw_area
            if isinstance(a, dict) and a.get("active") != "forbid"
        ]
        carpets = map_json.get("carpets") or map_json.get("carpet_rect") or []

        return BotslabMapInfo(
            width=int(width),
            height=int(height),
            x_min=x_min,
            y_min=y_min,
            resolution=resolution,
            rooms=self._parse_rooms(map_json),
            dock_position=dock_pos,
            no_go_zones=no_go,
            clean_zones=clean_zones,
            carpets=carpets if isinstance(carpets, list) else [],
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

    def clear_map_cache(self, sn: str | None = None) -> None:
        """Invalidate map caches so the next poll fetches a fresh map."""
        self._cached_upload_id = ""
        self._cached_map_bytes = None
        self._cached_robot_pose = None
        self._cached_is_active = False
        if sn:
            self._cached_map_info.pop(sn, None)
            self._cached_rooms.pop(sn, None)
        else:
            self._cached_map_info.clear()
            self._cached_rooms.clear()

    async def get_live_map(
        self,
        sn: str,
        product_key: str,
        robot_pose: list[float] | tuple[float, ...] | None = None,
        cleaning_path: list[list[int]] | None = None,
        is_active: bool = False,
        is_zone_cleaning: bool = False,
    ) -> bytes | None:
        """Fetch, decompress and render high-resolution map with live overlays."""
        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            return self._cached_map_bytes

        map_info = self._build_map_info(map_json)
        if map_info and map_info.rooms:
            self._cached_rooms[sn] = map_info.rooms
        self._cached_map_info[sn] = map_info

        oss_info = self._parse_oss_info(props.get("MapPkgOssInfo"))
        upload_id = str(
            oss_info.get("UploadID")
            or oss_info.get("CleanID")
            or map_json.get("cleanId")
            or map_json.get("clean_id")
            or ""
        )

        if not cleaning_path:
            for pk in ("posArray", "PosArray", "cleanPath", "clean_path", "track", "path"):
                cand = map_json.get(pk)
                if isinstance(cand, list) and len(cand) >= 2:
                    cleaning_path = cand
                    break

        curr_pose_tuple = tuple(round(x, 1) for x in robot_pose[:2]) if robot_pose and len(robot_pose) >= 2 else None
        cached_pose_tuple = tuple(round(x, 1) for x in self._cached_robot_pose[:2]) if self._cached_robot_pose and len(self._cached_robot_pose) >= 2 else None
        path_len = len(cleaning_path) if cleaning_path else 0
        cached_path_len = getattr(self, "_cached_path_len", 0)
        is_zc = bool(is_zone_cleaning)
        cached_is_zc = getattr(self, "_cached_is_zone_cleaning", False)

        if (
            upload_id
            and upload_id == self._cached_upload_id
            and self._cached_map_bytes
            and curr_pose_tuple == cached_pose_tuple
            and is_active == self._cached_is_active
            and is_zc == cached_is_zc
            and path_len == cached_path_len
        ):
            return self._cached_map_bytes

        try:
            width = map_json["width"]
            height = map_json["height"]
            compressed = base64.b64decode(map_json["map"])
            decompress_fn = _get_lz4_decompressor()
            pixels = decompress_fn(compressed, width * height)
            if len(pixels) != width * height:
                raise ValueError(
                    f"decompressed size {len(pixels)} != expected {width * height}"
                )

            active_clean_zones = (
                map_info.clean_zones if (map_info and is_active and is_zc) else []
            )

            render_fn = _get_map_renderer()
            png_bytes, geom = render_fn(
                width=width,
                height=height,
                pixels=pixels,
                resolution=map_info.resolution if map_info else 0.05,
                x_min=map_info.x_min if map_info else 0.0,
                y_min=map_info.y_min if map_info else 0.0,
                rooms=map_info.rooms if map_info else [],
                no_go_zones=map_info.no_go_zones if map_info else [],
                clean_zones=active_clean_zones,
                dock_pos=map_info.dock_position if map_info else None,
                robot_pose=robot_pose,
                cleaning_path=cleaning_path,
                carpets=map_info.carpets if map_info else [],
                scale=4,
            )
            if map_info:
                map_info.cmin = geom[0]
                map_info.cmax = geom[1]
                map_info.rmin = geom[2]
                map_info.rmax = geom[3]
                map_info.scale = geom[4]

            self._cached_upload_id = upload_id
            self._cached_map_bytes = png_bytes
            self._cached_robot_pose = list(robot_pose) if robot_pose else None
            self._cached_is_active = is_active
            self._cached_is_zone_cleaning = is_zc
            self._cached_path_len = path_len
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
        url = f"{self.base_url}/v1/iot/device/invoke_service"
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        for attempt in range(2):
            ts, nonce, sig = self._sign()
            q = self._base_query(ts, nonce, sig)
            try:
                async with self.session.post(
                    url,
                    params=q,
                    headers=self._headers("application/x-www-form-urlencoded"),
                    data=body,
                    timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
                ) as resp:
                    data = await resp.json(content_type=None)
            except Exception as err:
                raise BotslabApiError(f"invoke_sync {action} failed: {err}") from err

            code = data.get("code")
            if code in AUTH_EXPIRED_CODES:
                if attempt == 0 and self.q and self.t:
                    await self._handle_auth_retry()
                    continue
                raise BotslabAuthError(f"Auth expired: code {code}")
            return data
        return {}

    async def set_desired_property(
        self, sn: str, product_key: str, identifier: str, value: Any
    ) -> dict[str, Any]:
        """Set desired property on device shadow."""
        url = f"{self.base_url}/v1/iot/device/set_desired_property"
        body = {
            "product_key": product_key,
            "device_name": sn,
            "items": json.dumps({identifier: value}, separators=(",", ":")),
        }
        for attempt in range(2):
            ts, nonce, sig = self._sign()
            q = self._base_query(ts, nonce, sig)
            try:
                async with self.session.post(
                    url,
                    params=q,
                    headers=self._headers("application/x-www-form-urlencoded"),
                    data=body,
                    timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
                ) as resp:
                    data = await resp.json(content_type=None)
                    code = data.get("code")
                    if code in AUTH_EXPIRED_CODES:
                        if attempt == 0 and self.q and self.t:
                            await self._handle_auth_retry()
                            continue
                        raise BotslabAuthError(f"Auth expired: code {code}")
                    if code != 0:
                        raise BotslabCommandError(
                            f"set_desired_property {identifier} failed: code {code} {data.get('msg')}"
                        )
                    return data
            except BotslabAuthError:
                raise
            except Exception as err:
                _LOGGER.error(
                    "Failed to set desired property %s=%s on %s: %s",
                    identifier,
                    value,
                    sn,
                    err,
                )
                raise
        return {}

    async def invoke_async(
        self, sn: str, product_key: str, action: str, params: dict[str, Any]
    ) -> dict[str, Any]:
        """Invoke asynchronous device action."""
        url = f"{self.base_url}/v1/iot/device/invoke_service_async"
        body = {
            "product_key": product_key,
            "device_name": sn,
            "identifier": action,
            "input": json.dumps(params, separators=(",", ":")),
        }
        for attempt in range(2):
            ts, nonce, sig = self._sign()
            q = self._base_query(ts, nonce, sig)
            try:
                async with self.session.post(
                    url,
                    params=q,
                    headers=self._headers("application/x-www-form-urlencoded"),
                    data=body,
                    timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
                ) as resp:
                    data = await resp.json(content_type=None)
            except Exception as err:
                raise BotslabApiError(f"invoke_async {action} failed: {err}") from err

            code = data.get("code")
            if code in AUTH_EXPIRED_CODES:
                if attempt == 0 and self.q and self.t:
                    await self._handle_auth_retry()
                    continue
                raise BotslabAuthError(f"Auth expired: code {code}")
            return data
        return {}

    async def wait_async_reply(self, request_id: str, timeout: int = 12) -> bool:
        """Wait for asynchronous command confirmation. Re-signs on every poll iteration."""
        url = f"{self.base_url}/v1/iot/device/invoke_service_reply"
        start_t = time.time()
        while time.time() - start_t < timeout:
            ts, nonce, sig = self._sign()
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
                    code = data.get("code")
                    if code in AUTH_EXPIRED_CODES and self.q and self.t:
                        await self._handle_auth_retry()
                        continue
                    if code == 0:
                        res_str = data.get("data", {}).get("result", "")
                        if isinstance(res_str, str) and res_str:
                            try:
                                res_obj = json.loads(res_str)
                                if res_obj.get("ErrorNO", 0) != 0:
                                    _LOGGER.warning("Async reply ErrorNO=%s: %s", res_obj.get("ErrorNO"), res_str)
                                    return False
                            except (ValueError, TypeError):
                                pass
                        return True
                    if code == 202016:
                        pass
                    else:
                        _LOGGER.debug("wait_async_reply status code=%s: %s", code, data.get("msg"))
            except Exception as err:
                _LOGGER.debug("wait_async_reply error: %s", err)
            await asyncio.sleep(1)
        return False

    async def start_clean(self, sn: str, product_key: str) -> None:
        """Start full/default cleaning operation."""
        await self.invoke_sync(sn, product_key, "StartDefaultClean", {"CleanTimes": 1})

    async def pause_clean(self, sn: str, product_key: str) -> None:
        """Pause current cleaning operation."""
        await self.invoke_sync(sn, product_key, "PauseRobot", {"TargetAction": 0})

    async def stop_clean(self, sn: str, product_key: str) -> None:
        """Stop current cleaning operation and return to dock."""
        await self.return_to_dock(sn, product_key)

    async def resume_clean(self, sn: str, product_key: str) -> None:
        """Resume cleaning from pause."""
        await self.invoke_sync(sn, product_key, "ResumeWork", {})

    async def return_to_dock(self, sn: str, product_key: str) -> None:
        """Send robot back to charging dock."""
        await self.invoke_sync(sn, product_key, "ReturnChargeBase", {})

    async def locate(self, sn: str, product_key: str) -> None:
        """Play sound on robot to locate it."""
        await self.invoke_sync(sn, product_key, "SeekRobot", {})

    async def set_fan_speed(self, sn: str, product_key: str, fan_speed: str) -> None:
        """Set vacuum suction power."""
        mode = FAN_SPEED_TO_MODE.get(fan_speed, 2)
        level = FAN_SPEED_TO_LEVEL.get(fan_speed, max(0, mode - 1))
        try:
            await self.invoke_sync(
                sn, product_key, "SetSuctionPowLevelWithMode", {"Mode": 0, "Level": level}
            )
        except Exception as err:
            _LOGGER.debug(
                "SetSuctionPowLevelWithMode failed (%s), falling back to SetSuctionPowLevel",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetSuctionPowLevel", {"SuctionPowLevel": mode})

    async def reset_consumable(self, sn: str, product_key: str, consumable: str) -> None:
        """Reset consumable life counter."""
        c_norm = str(consumable).lower().strip()
        if c_norm in ("sensor", "sensors", "sensor_clean", "sensor_dirtiness", "sensor_life"):
            canonical = "sensor"
            code_int = 0
            tsl_fallbacks = ["ResetSensorCleanLife", "ResetSensorLife"]
        elif c_norm in ("side_brush", "sidebrush", "edge_brush", "side_brush_life"):
            canonical = "side_brush"
            code_int = 1
            tsl_fallbacks = ["ResetSideBrushLife"]
        elif c_norm in ("filter", "hepa", "filter_life"):
            canonical = "filter"
            code_int = 2
            tsl_fallbacks = ["ResetFilterLife"]
        elif c_norm in ("main_brush", "mainbrush", "roll_brush", "brush", "main_brush_life"):
            canonical = "main_brush"
            code_int = 3
            tsl_fallbacks = ["ResetRollBrushLife", "ResetMainBrushLife"]
        else:
            canonical = c_norm
            code_int = -1
            tsl_fallbacks = []

        # 1. Primary Modern Botslab Protocol: ResetConsumablesLife service with Consumable enum
        if code_int >= 0:
            try:
                res = await self.invoke_sync(
                    sn, product_key, "ResetConsumablesLife", {"Consumable": code_int}
                )
                code = res.get("code") if isinstance(res, dict) else None
                if code in (0, "0"):
                    _LOGGER.info(
                        "Successfully reset consumable %s (code %d) on %s via ResetConsumablesLife",
                        canonical,
                        code_int,
                        sn,
                    )
                    return
                _LOGGER.debug(
                    "ResetConsumablesLife returned code %s for %s, trying fallbacks",
                    code,
                    canonical,
                )
            except Exception as err:
                _LOGGER.debug("ResetConsumablesLife exception for %s: %s", canonical, err)

        # 2. Fallback to model-specific individual TSL actions if ResetConsumablesLife is not available
        success = False
        last_error = None
        for action in tsl_fallbacks:
            try:
                res = await self.invoke_sync(sn, product_key, action, {})
                code = res.get("code") if isinstance(res, dict) else None
                data = res.get("data") if isinstance(res, dict) else {}
                errmsg = str(data.get("errmsg", ""))
                if code in (0, "0") and "does not exist" not in errmsg:
                    _LOGGER.info(
                        "Reset consumable %s on %s via fallback %s", canonical, sn, action
                    )
                    success = True
                    break
            except Exception as err:
                last_error = err
                continue

        if not success and code_int < 0 and last_error:
            raise BotslabCommandError(f"Reset consumable {canonical} failed: {last_error}")

    async def get_firmware_version(self, sn: str, product_key: str) -> str:
        """Fetch firmware version from Botslab OTA check."""
        if self.session is None or getattr(self.session, "closed", False):
            return "-"

        ts, nonce, sig = self._sign()
        url = f"{self.base_url}{EP_OTA_CHECK}"
        params = self._base_query(ts, nonce, sig)
        body = {
            "product_key": product_key,
            "device_name": sn,
            "group_identifier": "all_group",
            "show_upgrading_info": "2",
        }

        try:
            async with self.session.post(
                url,
                params=params,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
                if (
                    isinstance(data, dict)
                    and data.get("code") == 0
                    and isinstance(data.get("data"), list)
                    and data["data"]
                ):
                    return str(data["data"][0].get("current_version") or "-")
        except Exception as err:
            _LOGGER.debug("Failed to fetch firmware version for %s: %s", sn, err)

        return "-"

    async def clean_rooms(
        self,
        sn: str,
        product_key: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
        rooms_config: dict[int | str, dict[str, Any]] | list[dict[str, Any]] | None = None,
        auto_order: bool = False,
    ) -> None:
        """Clean specific room(s) by ID via StartCleanInAreas."""
        if fan_speed:
            await self.set_fan_speed(sn, product_key, fan_speed)
        if water_level:
            await self.set_water_level(sn, product_key, water_level)

        try:
            res_sync = await self.invoke_async(
                sn, product_key, "StartSyncMapPkgToOss", {"SyncDuration": 60}
            )
            data_dict = (res_sync or {}).get("data")
            req_sync = data_dict.get("request_id") if isinstance(data_dict, dict) else None
            if req_sync:
                await self.wait_async_reply(req_sync, timeout=5)
            await asyncio.sleep(0.5)
        except Exception as sync_err:
            _LOGGER.debug("StartSyncMapPkgToOss handshake skipped/failed for %s: %s", sn, sync_err)

        map_json, props = await self.get_map_json(sn, product_key)
        if not map_json:
            raise BotslabApiError("Cannot clean rooms: current map could not be downloaded")

        raw_oss = props.get("MapPkgOssInfo")
        oss_info = json.loads(raw_oss) if isinstance(raw_oss, str) else (raw_oss or {})
        map_id = int(oss_info.get("MapID", 28239))
        session_clean_id = (
            oss_info.get("CleanID")
            or map_json.get("CleanID")
            or map_json.get("cleanId")
        )
        clean_id = str(session_clean_id) if session_clean_id else f"{sn}-{int(time.time())}"

        sa = map_json.get("smartArea") or {}
        room_list = copy.deepcopy(sa.get("value", []))
        if not room_list:
            room_list = copy.deepcopy(map_json.get("value", []))

        int_room_ids: list[int] = []
        str_room_ids: set[str] = set()
        for r in room_ids:
            s = str(r).strip()
            if s and s not in str_room_ids:
                str_room_ids.add(s)
                try:
                    rid = int(s)
                    if rid not in int_room_ids:
                        int_room_ids.append(rid)
                except (ValueError, TypeError):
                    pass

        if not int_room_ids and not str_room_ids:
            raise BotslabApiError(f"No valid room IDs found in input: {room_ids}")

        _LOGGER.info(
            "Starting clean_rooms on %s (map_id=%s, target_rooms=%s, repeats=%d, speed=%s, water=%s)",
            sn,
            map_id,
            int_room_ids,
            repeat_times,
            fan_speed,
            water_level,
        )

        norm_room_cfg: dict[str, dict[str, Any]] = {}
        if isinstance(rooms_config, dict):
            for k, v in rooms_config.items():
                if isinstance(v, dict):
                    norm_room_cfg[str(k).strip()] = v
        elif isinstance(rooms_config, list):
            for item in rooms_config:
                if isinstance(item, dict):
                    rid_key = str(item.get("room_id", item.get("id", ""))).strip()
                    if rid_key:
                        norm_room_cfg[rid_key] = item

        for r in room_list:
            rid = r.get("id")
            str_rid = str(rid)
            if rid in int_room_ids or str_rid in str_room_ids:
                rcfg = norm_room_cfg.get(str_rid, {})
                r_repeats = rcfg.get("repeat_times", repeat_times)
                r_speed = rcfg.get("fan_speed", fan_speed)
                r_water = rcfg.get("water_level", water_level)

                r["active"] = "normal"
                r["cleanTimes"] = int(r_repeats)
                if r_speed:
                    r["windMode"] = FAN_SPEEDS_HA_TO_360.get(str(r_speed).lower(), "auto")
                if r_water is not None:
                    if isinstance(r_water, int):
                        r["waterPump"] = r_water
                    elif str(r_water).lower() in WATER_LEVEL_TO_INT:
                        r["waterPump"] = WATER_LEVEL_TO_INT[str(r_water).lower()]
            else:
                r["active"] = None

        sweep_payload = {
            "mapId": map_id,
            "value": room_list,
            "activeIds": int_room_ids,
            "areaCleanActiveId": None,
            "autoOrder": bool(auto_order),
            "cleanTimes": repeat_times,
            "isAttrOn": 1,
        }

        policies: list[dict[str, Any]] = []
        for idx, rid in enumerate(int_room_ids, start=1):
            str_rid = str(rid)
            rcfg = norm_room_cfg.get(str_rid, {})
            r_repeats = rcfg.get("repeat_times", repeat_times)
            r_speed = rcfg.get("fan_speed", fan_speed)
            r_noisy = (
                FAN_SPEEDS_HA_TO_360.get(str(r_speed).lower(), "auto")
                if r_speed
                else "auto"
            )
            policies.append(
                {
                    "workNoisy": r_noisy,
                    "active": False,
                    "unlock": False,
                    "period": [],
                    "smartAreaIds": [rid],
                    "cleanWater": None,
                    "index": None,
                    "cleanWorkType": None,
                    "cleanTimeType": None,
                    "cleanTimeTypeCustomStr": None,
                    "strWorkMode": None,
                    "strSweepType": None,
                    "cleaningPreference": None,
                    "hour": None,
                    "minute": None,
                    "endHour": None,
                    "endMinute": None,
                    "isMorning": None,
                    "isNotDisturb": None,
                    "isTomorrow": None,
                    "isSelectCleanTime": None,
                    "cleanMode": 0,
                    "priority": idx,
                    "orderClean": not auto_order,
                    "endTime": 28800,
                    "mapId": map_id,
                    "cleanAreas": [],
                    "activeIdAttr": None,
                    "cleanTimes": int(r_repeats),
                    "startTime": 79200,
                    "alternateStartTime": 79200,
                    "isAttrOn": None,
                    "msgID": None,
                }
            )

        policy = {
            "value": policies,
            "timeZone": 3.0,
            "appendMode": False,
        }

        try:
            res_policy = await self.invoke_async(
                sn,
                product_key,
                "SetCleanPolicyList",
                {"CleanPolicyList": json.dumps(policy, separators=(",", ":"))},
            )
            policy_req = (res_policy or {}).get("data", {}).get("request_id")
            if policy_req:
                await self.wait_async_reply(policy_req, timeout=3)
        except Exception as policy_err:
            _LOGGER.debug("SetCleanPolicyList error for %s: %s", sn, policy_err)

        try:
            upload_info = await self.get_upload_config(sn, product_key)
            if not upload_info:
                raise BotslabApiError("Cannot clean rooms: OSS upload config unavailable")

            uploaded_url = await self._upload_to_oss(upload_info, sweep_payload)
            if not uploaded_url:
                raise BotslabApiError("Cannot clean rooms: OSS upload failed")

            await asyncio.sleep(1)
            _LOGGER.debug("Sending StartCleanInAreas for %s with map %s, url: %s", sn, map_id, uploaded_url)
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
            req_id = (res or {}).get("data", {}).get("request_id")
            if req_id:
                reply_ok = await self.wait_async_reply(req_id, timeout=10)
                _LOGGER.debug("StartCleanInAreas reply for %s: ok=%s", sn, reply_ok)
                if not reply_ok:
                    raise BotslabCommandError(
                        f"StartCleanInAreas rejected by robot {sn} (ErrorNO=-1 or timeout)"
                    )
            _LOGGER.info("Room cleaning started successfully on %s for rooms %s", sn, int_room_ids)
        except Exception as err:
            _LOGGER.error(
                "StartCleanInAreas failed for %s (%s). No fallback available.",
                sn,
                err,
            )
            raise

    async def clean_zone(
        self,
        sn: str,
        product_key: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s) via SetZones and StartCleanInZones."""
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
        d_zones = (res or {}).get("data")
        req_id = d_zones.get("request_id") if isinstance(d_zones, dict) else None
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)

        await self.invoke_sync(sn, product_key, "StartCleanInZones", {})

    async def clear_cleaning_zones(
        self, sn: str, product_key: str, map_id: int | str
    ) -> dict[str, Any]:
        """Clear custom cleaning zones from the robot cloud state."""
        zones_payload = {
            "zones": [],
            "activeIds": [],
            "cleanTimes": 1,
            "isAttrOn": 0,
        }
        return await self.invoke_async(
            sn,
            product_key,
            "SetZones",
            {
                "MapID": int(map_id),
                "ZonesList": json.dumps(zones_payload, separators=(",", ":")),
            },
        )

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
        try:
            await self.set_desired_property(sn, product_key, "PadWetness", val)
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property PadWetness failed (%s), falling back to SetPadWetness",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetPadWetness", {"PadWetness": val})

    async def set_mop_mode(self, sn: str, product_key: str, mode: str | int) -> None:
        """Set mop mode switching (0: Vacuum & Mop, 1: Vacuum Only, 2: Mop Only)."""
        val = MOP_MODE_TO_INT.get(str(mode).lower(), int(mode) if str(mode).isdigit() else 0)
        try:
            await self.set_desired_property(sn, product_key, "MopModeSwitching", val)
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property MopModeSwitching failed (%s), falling back to SetMopModeSwitching",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetMopModeSwitching", {"MopModeSwitching": val})

    async def set_auto_boost(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle carpet auto suction boost."""
        try:
            await self.set_desired_property(sn, product_key, "AutoBoost", bool(state))
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property AutoBoost failed (%s), falling back to SetAutoBoost",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetAutoBoost", {"AutoBoost": bool(state)})

    async def set_button_backlight(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle physical button LED light."""
        try:
            await self.set_desired_property(sn, product_key, "ButtonBacklight", bool(state))
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property ButtonBacklight failed (%s), falling back to SetButtonBacklight",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetButtonBacklight", {"ButtonBacklight": bool(state)})

    async def set_collision_protection(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle collision protection sensor sensitivity."""
        try:
            await self.set_desired_property(sn, product_key, "CollisionProtection", bool(state))
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property CollisionProtection failed (%s), falling back to SetCollisionProtection",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetCollisionProtection", {"CollisionProtection": bool(state)})

    async def set_volume_level(self, sn: str, product_key: str, volume: int) -> None:
        """Set speaker voice volume (0-100)."""
        vol = max(0, min(100, int(volume)))
        try:
            await self.set_desired_property(sn, product_key, "VolumeLevel", vol)
        except Exception as err:
            _LOGGER.debug(
                "set_desired_property VolumeLevel failed (%s), falling back to SetVolumeLevel",
                err,
            )
            await self.invoke_sync(sn, product_key, "SetVolumeLevel", {"VolumeLevel": vol})

    async def start_sync_map_to_oss(
        self, sn: str, product_key: str, sync_duration: int = 60
    ) -> dict[str, Any]:
        """Trigger vacuum firmware to stream fresh map packages to 1days OSS every 5s with safety timeout."""
        res = await self.invoke_async(
            sn, product_key, "StartSyncMapPkgToOss", {"SyncDuration": int(sync_duration)}
        )
        req_id = (res or {}).get("data", {}).get("request_id")
        if req_id:
            await self.wait_async_reply(req_id, timeout=5)
        return res or {}

    async def stop_sync_map_to_oss(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop rapid map streaming when cleaning ends."""
        res = await self.invoke_sync(sn, product_key, "StopSyncMapPkgToOss", {})
        return res or {}

    async def start_map_sync(
        self, sn: str, product_key: str, duration_s: int = 60
    ) -> dict[str, Any]:
        """Backwards-compatible alias for start_sync_map_to_oss."""
        return await self.start_sync_map_to_oss(sn, product_key, sync_duration=duration_s)

    async def stop_map_sync(self, sn: str, product_key: str) -> dict[str, Any]:
        """Backwards-compatible alias for stop_sync_map_to_oss."""
        return await self.stop_sync_map_to_oss(sn, product_key)

    async def set_no_go_zones(
        self,
        sn: str,
        product_key: str,
        map_id: int | str,
        places: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """Set/replace/clear the forbidden (no-go) zones via SetFbdPlaces."""
        return await self.invoke_sync(
            sn,
            product_key,
            "SetFbdPlaces",
            {
                "MapID": int(map_id),
                "FbdPlacesList": json.dumps(places, separators=(",", ":")),
            },
        )

    async def get_clean_track(
        self, sn: str, product_key: str, start_idx: int = 0
    ) -> dict[str, Any]:
        """Fetch one page of the live cleaning track."""
        res = await self.invoke_sync(
            sn,
            product_key,
            "GetCleanTrackWithPosIdx",
            {"StartPosIndex": int(start_idx)},
        )
        raw = res.get("data", {}).get("result") or res.get("result")
        outer = json.loads(raw) if isinstance(raw, str) else (raw or {})
        tk = outer.get("Track", outer)
        return json.loads(tk) if isinstance(tk, str) else (tk or {})

    async def get_clean_track_all(
        self, sn: str, product_key: str, max_points: int = 20000
    ) -> list[list[int]]:
        """Paginate the cleaning track into a list of [x, y] coordinates (mm)."""
        pts: list[list[int]] = []
        idx = 0
        while len(pts) < max_points:
            try:
                tk = await self.get_clean_track(sn, product_key, idx)
            except Exception:
                break
            seg = tk.get("posArray") or tk.get("PosArray") or []
            if not seg:
                break
            pts.extend(seg)
            total = int(tk.get("totalPoints") or tk.get("TotalPoints") or len(pts))
            idx = len(pts)
            if idx >= total:
                break
        return pts

    # =========================================================================
    # New Modern Core Features: TSL DSL, Base Station, Carpets, Multi-Map, etc.
    # =========================================================================

    async def get_dsl(self, product_key: str) -> dict[str, Any]:
        """Query Thing Specification Language (TSL) DSL capability schema for product_key."""
        url = f"{self.base_url}{EP_GET_DSL}"
        ts, nonce, sig = self._sign()
        q = self._base_query(ts, nonce, sig)
        body = {"product_key": product_key}
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
                if isinstance(data, dict) and data.get("code") == 0:
                    return data.get("data") or {}
        except Exception as err:
            _LOGGER.debug("Failed to fetch TSL DSL schema for %s: %s", product_key, err)
        return {}

    # --- Base Station Controls ---
    async def start_dust_collection(self, sn: str, product_key: str) -> dict[str, Any]:
        """Trigger base station dust extraction cyclone."""
        return await self.invoke_sync(sn, product_key, SERVICE_START_IN_DUST, {})

    async def start_mop_wash(
        self, sn: str, product_key: str, wash_type: int = 0
    ) -> dict[str, Any]:
        """Trigger mop self-cleaning wash on dock (0: standard, 1: deep)."""
        return await self.invoke_sync(
            sn, product_key, SERVICE_START_MOP_WASH, {"washType": int(wash_type)}
        )

    async def stop_mop_wash(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop mop pad self-cleaning on dock."""
        return await self.invoke_sync(sn, product_key, SERVICE_STOP_MOP_WASH, {})

    async def start_mop_drying(
        self, sn: str, product_key: str, duration_minutes: int = 120
    ) -> dict[str, Any]:
        """Trigger mop pad air drying on dock."""
        return await self.invoke_sync(
            sn, product_key, SERVICE_START_MOP_DRY, {"dryTime": int(duration_minutes)}
        )

    async def stop_mop_drying(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop mop pad air drying on dock."""
        return await self.invoke_sync(sn, product_key, SERVICE_STOP_MOP_DRY, {})

    async def get_station_info(self, sn: str, product_key: str) -> dict[str, Any]:
        """Retrieve base station telemetry (station_status, tank levels, drying time)."""
        return await self.invoke_sync(sn, product_key, SERVICE_GET_STATION_INFO, {})

    # --- Hardware Switches & Features ---
    async def set_child_lock(self, sn: str, product_key: str, enabled: bool) -> None:
        """Toggle physical button child lock."""
        await self.set_desired_property(sn, product_key, PROP_CHILD_LOCK, bool(enabled))

    async def set_dnd(
        self,
        sn: str,
        product_key: str,
        enabled: bool,
        start: str = "22:00",
        end: str = "08:00",
    ) -> None:
        """Set Do Not Disturb (DND) quiet hours schedule."""
        await self.set_desired_property(
            sn,
            product_key,
            PROP_NOT_DISTURB,
            {"enabled": bool(enabled), "start": str(start), "end": str(end)},
        )

    async def set_carpet_mode(self, sn: str, product_key: str, mode: int) -> None:
        """Set carpet behavior (0: boost, 1: avoid while mopping, 2: ignore)."""
        await self.set_desired_property(sn, product_key, PROP_CARPET_MODE, int(mode))

    # --- Multi-Floor Maps ---
    async def get_multi_maps(self, sn: str, product_key: str) -> dict[str, Any]:
        """Retrieve list of saved multi-floor maps."""
        url = f"{self.base_url}{EP_USER_MULTI_MAP}"
        ts, nonce, sig = self._sign()
        q = self._base_query(ts, nonce, sig)
        body = {"product_key": product_key, "device_name": sn}
        try:
            async with self.session.post(
                url,
                params=q,
                headers=self._headers("application/x-www-form-urlencoded"),
                data=body,
                timeout=aiohttp.ClientTimeout(total=REQUEST_TIMEOUT),
            ) as resp:
                data = await resp.json(content_type=None)
                if isinstance(data, dict) and data.get("code") == 0:
                    return data.get("data") or {}
        except Exception as err:
            _LOGGER.debug("Failed to fetch multi maps for %s: %s", sn, err)
        return {}

    async def switch_floor_map(
        self, sn: str, product_key: str, map_id: int | str
    ) -> dict[str, Any]:
        """Switch active map to a saved floor."""
        return await self.invoke_sync(
            sn, product_key, SERVICE_SET_FROM_MAP, {"MapID": int(map_id)}
        )

    async def save_map(self, sn: str, product_key: str, name: str) -> dict[str, Any]:
        """Save current floor map."""
        return await self.invoke_sync(
            sn, product_key, SERVICE_SAVE_MAP, {"MapName": str(name)}
        )

    async def delete_map(
        self, sn: str, product_key: str, map_id: int | str
    ) -> dict[str, Any]:
        """Delete saved floor map."""
        return await self.invoke_sync(
            sn, product_key, SERVICE_DELETE_MAP, {"MapID": int(map_id)}
        )

    # --- Custom Clean Sequencing ---
    async def start_custom_clean_sequencing(
        self,
        sn: str,
        product_key: str,
        clean_order: list[dict[str, Any]],
        kitchen_toilet_last: bool = True,
    ) -> dict[str, Any]:
        """Start custom clean in specified room order."""
        return await self.invoke_sync(
            sn,
            product_key,
            SERVICE_CUSTOM_CLEAN,
            {"cleanOrder": clean_order, "kitchenToiletLast": bool(kitchen_toilet_last)},
        )

    # --- Manual Remote Driving ---
    async def set_remote_control_mode(
        self, sn: str, product_key: str, active: bool
    ) -> dict[str, Any]:
        """Enter or exit manual driving mode."""
        return await self.invoke_sync(
            sn,
            product_key,
            SERVICE_REMOTE_CONTROL_MODE,
            {"status": 1 if active else 0},
        )

    async def send_remote_drive(
        self, sn: str, product_key: str, direction: int, speed: int = 250
    ) -> dict[str, Any]:
        """Send directional movement pulse (0: stop, 1: fwd, 2: left, 3: right, 4: back)."""
        return await self.invoke_sync(
            sn,
            product_key,
            SERVICE_SEND_REMOTE_CONTROL,
            {"direction": int(direction), "headwayValue": int(speed)},
        )
