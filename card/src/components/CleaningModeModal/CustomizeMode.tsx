import { useState } from 'react';
import { CircularButton, Accordion } from '@/components/common';
import { useTranslation, useRoomSettings } from '@/hooks';
import { useHass, useIsRtl, useConfig, useDeviceEntities } from '@/contexts';
import {
  getSuctionLevelFriendlyName,
  getSuctionLevelIcon,
  parseRoomsFromCamera,
  resolveMapEntityId,
  selectOptionKey,
} from '@/utils';
import type { RoomSetting } from '@/hooks';

// Short labels for suction levels
const SUCTION_SHORT: Record<string, string> = {
  quiet: 'Q',
  silent: 'Q',
  standard: 'S',
  strong: 'P',
  powerful: 'P',
  turbo: 'P',
  max: 'M',
};

function getSuctionShort(level: string | null): string {
  if (!level) return '-';
  return SUCTION_SHORT[selectOptionKey(level)] ?? level.charAt(0).toUpperCase();
}

function getWetnessShort(level: number | null): string {
  if (level === null || !Number.isFinite(level)) return '-';
  if (level <= 1) return 'L';
  if (level === 2) return 'M';
  return 'H';
}

interface RoomWetnessSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  slightlyDryLabel: string;
  moistLabel: string;
  wetLabel: string;
  disabled?: boolean;
}

function RoomWetnessSlider({
  value,
  min,
  max,
  onChange,
  slightlyDryLabel,
  moistLabel,
  wetLabel,
  disabled = false,
}: RoomWetnessSliderProps) {
  const [dragValue, setDragValue] = useState<number | null>(null);
  const localValue = dragValue ?? value;
  const isRtl = useIsRtl();

  const percent = ((localValue - min) / (max - min)) * 100;
  const thumbWidth = 20;
  const tooltipPosition = `calc(${percent}% + ${thumbWidth / 2 - (percent * thumbWidth) / 100}px)`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setDragValue(parseInt(e.target.value, 10));
    }
  };

  const handleCommit = () => {
    if (!disabled && dragValue !== null && dragValue !== value) {
      onChange(dragValue);
    }
    setDragValue(null);
  };

  const gradientDirection = isRtl ? 'to left' : 'to right';
  const labels = [
    { key: 1, text: slightlyDryLabel },
    { key: 2, text: moistLabel },
    { key: 3, text: wetLabel },
  ];

  return (
    <div className={`customize-mode__wetness-slider ${disabled ? 'customize-mode__wetness-slider--disabled' : ''}`}>
      <div className="cleaning-mode-modal__slider-container">
        <div className="cleaning-mode-modal__slider-wrapper">
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={localValue}
            onChange={handleChange}
            onMouseUp={handleCommit}
            onTouchEnd={handleCommit}
            onBlur={handleCommit}
            disabled={disabled}
            className="cleaning-mode-modal__slider"
            style={{
              background: `linear-gradient(${gradientDirection}, var(--accent-bg-secondary) 0%, var(--accent-bg-secondary) ${percent}%, var(--accent-bg-secondary-hover) ${percent}%, var(--accent-bg-secondary-hover) 100%)`,
            }}
          />
          <div
            className="cleaning-mode-modal__slider-tooltip"
            style={isRtl ? { right: tooltipPosition } : { left: tooltipPosition }}
          >
            {localValue}
          </div>
        </div>
      </div>
      <div className="cleaning-mode-modal__slider-labels">
        {labels.map(({ key, text }) => (
          <span
            key={key}
            className={`cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${localValue === key ? 'active' : 'inactive'}`}
            onClick={() => !disabled && onChange(key)}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

interface RoomSettingsContentProps {
  setting: RoomSetting;
  setSuctionLevel: (roomId: number, value: string) => void;
  setWetnessLevel: (roomId: number, value: number) => void;
  setCleaningTimes: (roomId: number, value: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

function RoomSettingsContent({
  setting,
  setSuctionLevel,
  setWetnessLevel,
  setCleaningTimes,
  t,
}: RoomSettingsContentProps) {
  return (
    <div className="customize-mode__room-settings-content">
      {/* Suction Power */}
      {setting.suctionLevelOptions.length > 0 && (
        <div className="customize-mode__setting-group">
          <span className="customize-mode__setting-label">{t('custom_mode.suction_power_title')}</span>
          <div className="customize-mode__options">
            {setting.suctionLevelOptions.map((level: string) => (
              <div key={level} className="customize-mode__option">
                <CircularButton
                  size="small"
                  selected={setting.suctionLevel === level}
                  onClick={() => setSuctionLevel(setting.roomId, level)}
                  icon={getSuctionLevelIcon(level)}
                />
                <span className="customize-mode__option-label">{getSuctionLevelFriendlyName(level, t)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wetness Slider */}
      {setting.wetnessLevel !== null && Number.isFinite(setting.wetnessLevel) && (
        <div className="customize-mode__setting-group">
          <span className="customize-mode__setting-label">{t('custom_mode.wetness_title')}</span>
          <RoomWetnessSlider
            value={setting.wetnessLevel}
            min={setting.wetnessMin}
            max={setting.wetnessMax}
            onChange={(value) => setWetnessLevel(setting.roomId, value)}
            slightlyDryLabel={t('custom_mode.slightly_dry')}
            moistLabel={t('custom_mode.moist')}
            wetLabel={t('custom_mode.wet')}
          />
        </div>
      )}

      {/* Cycles */}
      {setting.cleaningTimesOptions.length > 0 && (
        <div className="customize-mode__setting-group">
          <span className="customize-mode__setting-label">{t('customize.cycles')}</span>
          <div className="customize-mode__options customize-mode__options--pills">
            {setting.cleaningTimesOptions.map((times: string) => (
              <button
                type="button"
                key={times}
                className={`customize-mode__pill customize-mode__pill--cycle ${
                  setting.cleaningTimes === times ? 'customize-mode__pill--selected' : ''
                }`}
                onClick={() => setCleaningTimes(setting.roomId, times)}
              >
                {times}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * CustomizeMode panel shown for per-room customized cleaning settings.
 */
export function CustomizeMode() {
  const { t } = useTranslation();
  const hass = useHass();
  const config = useConfig();
  const { get } = useDeviceEntities();

  const mapEntityId = resolveMapEntityId(
    config.map_entity,
    get('camera', 'cleaning_map') ?? get('camera', 'map'),
    hass,
    config.entity
  );
  const rooms = mapEntityId ? parseRoomsFromCamera(hass, mapEntityId, config.room_names) : [];

  const { roomSettings, setSuctionLevel, setWetnessLevel, setCleaningTimes } =
    useRoomSettings({
      hass,
      vacuumEntityId: config.entity,
      rooms: rooms.map((r) => ({ id: r.id, name: r.name })),
    });

  if (rooms.length === 0) {
    return (
      <div className="customize-mode">
        <div className="customize-mode__empty">
          <p>{t('customize.no_rooms')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customize-mode">
      <div className="customize-mode__room-accordions">
        {rooms.map((room) => {
          const setting = roomSettings.get(room.id);
          if (!setting) return null;

          const badges: string[] = [];
          if (setting.suctionLevel) badges.push(getSuctionShort(setting.suctionLevel));
          if (setting.wetnessLevel !== null && Number.isFinite(setting.wetnessLevel)) {
            badges.push(getWetnessShort(setting.wetnessLevel));
          }
          if (setting.cleaningTimes) badges.push(`${setting.cleaningTimes}x`);

          return (
            <Accordion
              key={room.id}
              title={room.name}
              icon={
                <span className="customize-mode__badges">
                  {badges.map((badge, idx) => (
                    <span key={idx} className="customize-mode__badge">
                      {badge}
                    </span>
                  ))}
                </span>
              }
            >
              <RoomSettingsContent
                setting={setting}
                setSuctionLevel={setSuctionLevel}
                setWetnessLevel={setWetnessLevel}
                setCleaningTimes={setCleaningTimes}
                t={t}
              />
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
