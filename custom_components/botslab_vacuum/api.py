"""Botslab Vacuum API client for Home Assistant (Dual-Backend Facade Pattern)."""
from __future__ import annotations

import logging
from typing import Any
import aiohttp

from .api_base import working_status_to_state
from .api_botslab import BotslabModernClient
from .api_legacy_360 import BotslabLegacy360Client
from .map_util import (
    decompress_lz4_block,
    render_map_advanced,
)

__all__ = [
    "BotslabVacuumApi",
    "working_status_to_state",
    "decompress_lz4_block",
    "render_map_advanced",
]

_LOGGER = logging.getLogger(__name__)


class BotslabVacuumApi(BotslabModernClient):
    """Public Facade API client dispatching between Modern Botslab and Legacy 360 engines."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        region: str,
        m2: str,
        q: str,
        t: str,
        qid: str | None = None,
    ) -> None:
        super().__init__(session=session, region=region, m2=m2, q=q, t=t, qid=qid)
        self._legacy_client = BotslabLegacy360Client(
            session=session, region=region, m2=m2, q=q, t=t, qid=qid, facade=self
        )
        self._is_legacy_360 = self.is_legacy_360

        # Share shared mutable state dictionaries between facade and backends
        self._legacy_client._auth_lock = self._auth_lock
        self._legacy_client.cached_s3_signs = self.cached_s3_signs
        self._legacy_client._cached_rooms = self._cached_rooms
        self._legacy_client._cached_map_info = self._cached_map_info
        self._legacy_client._legacy_cached_status = self._legacy_cached_status
        self._legacy_client._legacy_live_status = self._legacy_live_status
        self._legacy_client._legacy_consumables = self._legacy_consumables
        self._legacy_client._legacy_device_cache = self._legacy_device_cache

    @property
    def is_legacy_360(self) -> bool:
        """Return True if using legacy Qihoo 360 backend."""
        return self._is_legacy_360

    @is_legacy_360.setter
    def is_legacy_360(self, value: bool) -> None:
        self._is_legacy_360 = bool(value)
        if hasattr(self, "_legacy_client"):
            self._legacy_client.is_legacy_360 = bool(value)

    @property
    def sid(self) -> str | None:
        """Return current session ID."""
        return self._sid

    @sid.setter
    def sid(self, value: str | None) -> None:
        self._sid = value
        if hasattr(self, "_legacy_client"):
            self._legacy_client.sid = value

    @property
    def push_key(self) -> str | None:
        """Return push key."""
        return self._push_key

    @push_key.setter
    def push_key(self, value: str | None) -> None:
        self._push_key = value
        if hasattr(self, "_legacy_client"):
            self._legacy_client.push_key = value

    @property
    def push_alias(self) -> str:
        """Return push alias."""
        return self._push_alias

    @push_alias.setter
    def push_alias(self, value: str) -> None:
        self._push_alias = value
        if hasattr(self, "_legacy_client"):
            self._legacy_client.push_alias = value

    # --- Delegated Legacy Qihoo 360 Methods ---

    def _check_360_errno(self, res: Any, context: str) -> None:
        """Check response status code from legacy 360 cloud."""
        return self._legacy_client._check_360_errno(res, context)

    async def _legacy_360_login(self) -> dict[str, Any]:
        """Mint session id (sid) for legacy Qihoo 360 cloud."""
        res = await self._legacy_client._legacy_360_login()
        self.sid = self._legacy_client.sid
        self.push_key = self._legacy_client.push_key
        self.push_alias = self._legacy_client.push_alias
        return res

    async def _legacy_360_get_devices(self) -> list[dict[str, Any]]:
        """Fetch devices from legacy Qihoo 360 cloud."""
        return await self._legacy_client._legacy_360_get_devices()

    async def send_legacy_360_cmd(
        self, sn: str, info_type: str, data: Any = ""
    ) -> dict[str, Any]:
        """Send command to legacy Qihoo 360 vacuum cloud."""
        return await self._legacy_client.send_legacy_360_cmd(sn, info_type, data)

    async def get_latest_clean_record(self, sn: str) -> dict[str, Any] | None:
        """Fetch latest clean record from legacy Qihoo 360 cloud."""
        return await self._legacy_client.get_latest_clean_record(sn)

    async def _legacy_360_get_properties(
        self, sn: str, product_key: str = ""
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch telemetry properties from legacy Qihoo 360 cloud."""
        return await self._legacy_client._legacy_360_get_properties(sn, product_key)

    async def _clean_rooms_legacy_360(
        self,
        sn: str,
        room_ids: list[str],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Start room cleaning on legacy Qihoo 360 robot."""
        return await self._legacy_client._clean_rooms_legacy_360(
            sn, room_ids, repeat_times, fan_speed, water_level
        )

    async def _clean_zone_legacy_360(
        self,
        sn: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Start zone cleaning on legacy Qihoo 360 robot."""
        return await self._legacy_client._clean_zone_legacy_360(
            sn, zones, repeat_times, fan_speed, water_level
        )

    # --- Dual-Backend Dispatching Methods ---

    async def app_login(self) -> dict[str, Any]:
        """Mint session ID for active backend."""
        if self.is_legacy_360:
            return await self._legacy_360_login()
        return await super().app_login()

    async def login(self) -> dict[str, Any]:
        """Public alias for app_login."""
        return await self.app_login()

    async def get_devices(self) -> list[dict[str, Any]]:
        """Fetch device list from active backend."""
        if self.is_legacy_360:
            return await self._legacy_360_get_devices()
        return await super().get_devices()

    async def get_property_extended(
        self, sn: str, product_key: str
    ) -> tuple[dict[str, Any], dict[str, str]]:
        """Fetch device telemetry properties from active backend."""
        if self.is_legacy_360:
            return await self._legacy_360_get_properties(sn, product_key)
        return await super().get_property_extended(sn, product_key)

    async def get_desired_property(
        self, sn: str, product_key: str, prop_name: str | None = None
    ) -> dict[str, Any]:
        """Fetch desired properties."""
        if self.is_legacy_360:
            props, _ = await self._legacy_360_get_properties(sn, product_key)
            return props
        return await super().get_desired_property(sn, product_key, prop_name)

    async def start_clean(self, sn: str, product_key: str) -> None:
        """Start full cleaning."""
        if self.is_legacy_360:
            await self._legacy_client.start_clean(sn, product_key)
            return
        await super().start_clean(sn, product_key)

    async def pause_clean(self, sn: str, product_key: str) -> None:
        """Pause cleaning."""
        if self.is_legacy_360:
            await self._legacy_client.pause_clean(sn, product_key)
            return
        await super().pause_clean(sn, product_key)

    async def stop_clean(self, sn: str, product_key: str) -> None:
        """Stop cleaning and return to dock."""
        if self.is_legacy_360:
            await self._legacy_client.stop_clean(sn, product_key)
            return
        await super().stop_clean(sn, product_key)

    async def resume_clean(self, sn: str, product_key: str) -> None:
        """Resume cleaning from pause."""
        if self.is_legacy_360:
            await self._legacy_client.resume_clean(sn, product_key)
            return
        await super().resume_clean(sn, product_key)

    async def return_to_dock(self, sn: str, product_key: str) -> None:
        """Return to charging dock."""
        if self.is_legacy_360:
            await self._legacy_client.return_to_dock(sn, product_key)
            return
        await super().return_to_dock(sn, product_key)

    async def locate(self, sn: str, product_key: str) -> None:
        """Play locate sound on robot."""
        if self.is_legacy_360:
            await self._legacy_client.locate(sn, product_key)
            return
        await super().locate(sn, product_key)

    async def set_fan_speed(self, sn: str, product_key: str, fan_speed: str) -> None:
        """Set fan suction power."""
        if self.is_legacy_360:
            await self._legacy_client.set_fan_speed(sn, product_key, fan_speed)
            return
        await super().set_fan_speed(sn, product_key, fan_speed)

    async def reset_consumable(self, sn: str, product_key: str, consumable: str) -> None:
        """Reset consumable life counter."""
        if self.is_legacy_360:
            await self._legacy_client.reset_consumable(sn, product_key, consumable)
            return
        await super().reset_consumable(sn, product_key, consumable)

    async def get_firmware_version(self, sn: str, product_key: str) -> str:
        """Get firmware version."""
        if self.is_legacy_360:
            return await self._legacy_client.get_firmware_version(sn, product_key)
        return await super().get_firmware_version(sn, product_key)

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
        """Clean specific room(s) by ID."""
        if self.is_legacy_360:
            await self._clean_rooms_legacy_360(
                sn, room_ids, repeat_times, fan_speed, water_level
            )
            return
        await super().clean_rooms(
            sn,
            product_key,
            room_ids,
            repeat_times,
            fan_speed,
            water_level,
            rooms_config,
            auto_order,
        )

    async def clean_zone(
        self,
        sn: str,
        product_key: str,
        zones: list[list[float]],
        repeat_times: int = 1,
        fan_speed: str | None = None,
        water_level: str | None = None,
    ) -> None:
        """Clean custom rectangular zone(s)."""
        if self.is_legacy_360:
            await self._clean_zone_legacy_360(
                sn, zones, repeat_times, fan_speed, water_level
            )
            return
        await super().clean_zone(
            sn, product_key, zones, repeat_times, fan_speed, water_level
        )

    async def goto_target(self, sn: str, product_key: str, x: int, y: int) -> None:
        """Send robot to target point coordinates."""
        if self.is_legacy_360:
            await self._legacy_client.goto_target(sn, product_key, x, y)
            return
        await super().goto_target(sn, product_key, x, y)

    async def set_water_level(self, sn: str, product_key: str, level: str | int) -> None:
        """Set water level."""
        if self.is_legacy_360:
            await self._legacy_client.set_water_level(sn, product_key, level)
            return
        await super().set_water_level(sn, product_key, level)

    async def set_mop_mode(self, sn: str, product_key: str, mode: str | int) -> None:
        """Set mop mode switching."""
        if self.is_legacy_360:
            await self._legacy_client.set_mop_mode(sn, product_key, mode)
            return
        await super().set_mop_mode(sn, product_key, mode)

    async def set_auto_boost(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle carpet auto boost."""
        if self.is_legacy_360:
            await self._legacy_client.set_auto_boost(sn, product_key, state)
            return
        await super().set_auto_boost(sn, product_key, state)

    async def set_button_backlight(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle physical button LED light."""
        if self.is_legacy_360:
            await self._legacy_client.set_button_backlight(sn, product_key, state)
            return
        await super().set_button_backlight(sn, product_key, state)

    async def set_collision_protection(self, sn: str, product_key: str, state: bool) -> None:
        """Toggle collision protection sensor sensitivity."""
        if self.is_legacy_360:
            await self._legacy_client.set_collision_protection(sn, product_key, state)
            return
        await super().set_collision_protection(sn, product_key, state)

    async def set_volume_level(self, sn: str, product_key: str, volume: int) -> None:
        """Set speaker voice volume."""
        if self.is_legacy_360:
            await self._legacy_client.set_volume_level(sn, product_key, volume)
            return
        await super().set_volume_level(sn, product_key, volume)

    async def set_no_go_zones(
        self,
        sn: str,
        product_key: str,
        map_id: int | str,
        places: list[dict[str, Any]],
    ) -> dict[str, Any]:
        """Set/replace/clear forbidden (no-go) zones."""
        if self.is_legacy_360:
            return await self._legacy_client.set_no_go_zones(sn, product_key, map_id, places)
        return await super().set_no_go_zones(sn, product_key, map_id, places)

    async def start_sync_map_to_oss(
        self, sn: str, product_key: str, sync_duration: int = 60
    ) -> dict[str, Any]:
        """Stream fresh map packages to OSS."""
        if self.is_legacy_360:
            return {}
        return await super().start_sync_map_to_oss(sn, product_key, sync_duration)

    async def stop_sync_map_to_oss(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop rapid map streaming."""
        if self.is_legacy_360:
            return {}
        return await super().stop_sync_map_to_oss(sn, product_key)

    async def get_clean_track_all(
        self, sn: str, product_key: str, max_points: int = 20000
    ) -> list[list[int]]:
        """Paginate cleaning track."""
        if self.is_legacy_360:
            return []
        return await super().get_clean_track_all(sn, product_key, max_points)

    async def get_dsl(self, product_key: str) -> dict[str, Any]:
        """Query TSL DSL schema."""
        if self.is_legacy_360:
            return {}
        return await super().get_dsl(product_key)

    async def start_dust_collection(self, sn: str, product_key: str) -> dict[str, Any]:
        """Trigger base station dust extraction."""
        if self.is_legacy_360:
            return {}
        return await super().start_dust_collection(sn, product_key)

    async def start_mop_wash(
        self, sn: str, product_key: str, wash_type: int = 0
    ) -> dict[str, Any]:
        """Trigger mop wash on base station."""
        if self.is_legacy_360:
            return {}
        return await super().start_mop_wash(sn, product_key, wash_type)

    async def stop_mop_wash(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop mop wash."""
        if self.is_legacy_360:
            return {}
        return await super().stop_mop_wash(sn, product_key)

    async def start_mop_drying(
        self, sn: str, product_key: str, duration_minutes: int = 120
    ) -> dict[str, Any]:
        """Trigger mop drying."""
        if self.is_legacy_360:
            return {}
        return await super().start_mop_drying(sn, product_key, duration_minutes)

    async def stop_mop_drying(self, sn: str, product_key: str) -> dict[str, Any]:
        """Stop mop drying."""
        if self.is_legacy_360:
            return {}
        return await super().stop_mop_drying(sn, product_key)

    async def get_station_info(self, sn: str, product_key: str) -> dict[str, Any]:
        """Get base station telemetry."""
        if self.is_legacy_360:
            return {}
        return await super().get_station_info(sn, product_key)

    async def get_multi_maps(self, sn: str, product_key: str) -> dict[str, Any]:
        """Retrieve multi-floor maps."""
        if self.is_legacy_360:
            return {}
        return await super().get_multi_maps(sn, product_key)

    async def switch_floor_map(
        self, sn: str, product_key: str, map_id: int | str
    ) -> dict[str, Any]:
        """Switch active floor map."""
        if self.is_legacy_360:
            return {}
        return await super().switch_floor_map(sn, product_key, map_id)

    async def save_map(self, sn: str, product_key: str, name: str) -> dict[str, Any]:
        """Save floor map."""
        if self.is_legacy_360:
            return {}
        return await super().save_map(sn, product_key, name)

    async def delete_map(
        self, sn: str, product_key: str, map_id: int | str
    ) -> dict[str, Any]:
        """Delete floor map."""
        if self.is_legacy_360:
            return {}
        return await super().delete_map(sn, product_key, map_id)

    async def set_child_lock(self, sn: str, product_key: str, enabled: bool) -> None:
        """Toggle child lock."""
        if self.is_legacy_360:
            return
        await super().set_child_lock(sn, product_key, enabled)

    async def set_dnd(
        self,
        sn: str,
        product_key: str,
        enabled: bool,
        start: str = "22:00",
        end: str = "08:00",
    ) -> None:
        """Configure DND."""
        if self.is_legacy_360:
            return
        await super().set_dnd(sn, product_key, enabled, start=start, end=end)

    async def set_carpet_mode(self, sn: str, product_key: str, mode: int) -> None:
        """Set carpet mode."""
        if self.is_legacy_360:
            return
        await super().set_carpet_mode(sn, product_key, mode)


# Raw unpatched method references for direct unit testing
BotslabVacuumApi._raw_clean_rooms = BotslabVacuumApi.clean_rooms
BotslabVacuumApi._raw_clean_zone = BotslabVacuumApi.clean_zone
BotslabVacuumApi._raw_set_mop_mode = BotslabVacuumApi.set_mop_mode
