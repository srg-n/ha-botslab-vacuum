import { useCallback, useState } from 'react';
import type { Hass } from '@/types/homeassistant';
import { logger } from '@/utils/logger';

export interface RoomSetting {
  roomId: number;
  roomName: string;
  suctionLevel: string | null;
  suctionLevelOptions: string[];
  wetnessLevel: number | null;
  wetnessMin: number;
  wetnessMax: number;
  cleaningTimes: string | null;
  cleaningTimesOptions: string[];
  mopPressure: string | null;
  mopPressureOptions: string[];
  mopTemperature: string | null;
  mopTemperatureOptions: string[];
  hasEntities: boolean;
  suctionEntityId?: string;
  wetnessEntityId?: string;
  cleaningTimesEntityId?: string;
  mopPressureEntityId?: string;
  mopTemperatureEntityId?: string;
}

export interface StoredRoomConfig {
  suctionLevel: string;
  wetnessLevel: number;
  cleaningTimes: string;
}

const DEFAULT_SUCTION = 'standard';
const DEFAULT_WETNESS = 2; // Medium
const DEFAULT_TIMES = '1';

const SUCTION_OPTIONS = ['quiet', 'standard', 'powerful', 'max'];
const TIMES_OPTIONS = ['1', '2'];

function getStorageKey(vacuumEntityId: string): string {
  return `botslab_room_settings_${vacuumEntityId}`;
}

export function readStoredConfigs(vacuumEntityId: string): Record<number, StoredRoomConfig> {
  try {
    const raw = localStorage.getItem(getStorageKey(vacuumEntityId));
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function writeStoredConfigs(vacuumEntityId: string, configs: Record<number, StoredRoomConfig>): void {
  try {
    localStorage.setItem(getStorageKey(vacuumEntityId), JSON.stringify(configs));
  } catch {
    // localStorage not available
  }
}

export function useRoomSettings({
  hass: _hass,
  vacuumEntityId,
  rooms,
}: {
  hass: Hass;
  vacuumEntityId: string;
  rooms: Array<{ id: number; name: string }>;
}) {
  const [store, setStore] = useState<{ entityId: string; configs: Record<number, StoredRoomConfig> }>(() => ({
    entityId: vacuumEntityId,
    configs: readStoredConfigs(vacuumEntityId),
  }));

  const storedConfigs = store.entityId === vacuumEntityId ? store.configs : readStoredConfigs(vacuumEntityId);

  const updateRoom = useCallback(
    (roomId: number, patch: Partial<StoredRoomConfig>) => {
      setStore((prev) => {
        const base = prev.entityId === vacuumEntityId ? prev.configs : readStoredConfigs(vacuumEntityId);
        const current = base[roomId] || {
          suctionLevel: DEFAULT_SUCTION,
          wetnessLevel: DEFAULT_WETNESS,
          cleaningTimes: DEFAULT_TIMES,
        };
        const next = { ...base, [roomId]: { ...current, ...patch } };
        writeStoredConfigs(vacuumEntityId, next);
        logger.debug('RoomSettings', 'Updated room config:', roomId, patch);
        return { entityId: vacuumEntityId, configs: next };
      });
    },
    [vacuumEntityId]
  );

  const setSuctionLevel = useCallback(
    (roomId: number, value: string) => {
      updateRoom(roomId, { suctionLevel: value });
    },
    [updateRoom]
  );

  const setWetnessLevel = useCallback(
    (roomId: number, value: number) => {
      updateRoom(roomId, { wetnessLevel: value });
    },
    [updateRoom]
  );

  const setCleaningTimes = useCallback(
    (roomId: number, value: string) => {
      updateRoom(roomId, { cleaningTimes: value });
    },
    [updateRoom]
  );

  const setMopPressure = useCallback((_roomId: number, _value: string) => {}, []);
  const setMopTemperature = useCallback((_roomId: number, _value: string) => {}, []);

  const roomSettings = new Map<number, RoomSetting>();
  for (const r of rooms) {
    const cfg = storedConfigs[r.id] || {
      suctionLevel: DEFAULT_SUCTION,
      wetnessLevel: DEFAULT_WETNESS,
      cleaningTimes: DEFAULT_TIMES,
    };
    roomSettings.set(r.id, {
      roomId: r.id,
      roomName: r.name,
      suctionLevel: cfg.suctionLevel,
      suctionLevelOptions: SUCTION_OPTIONS,
      wetnessLevel: cfg.wetnessLevel,
      wetnessMin: 1,
      wetnessMax: 3,
      cleaningTimes: cfg.cleaningTimes,
      cleaningTimesOptions: TIMES_OPTIONS,
      mopPressure: null,
      mopPressureOptions: [],
      mopTemperature: null,
      mopTemperatureOptions: [],
      hasEntities: true,
    });
  }

  return {
    roomSettings,
    setSuctionLevel,
    setWetnessLevel,
    setCleaningTimes,
    setMopPressure,
    setMopTemperature,
  };
}
