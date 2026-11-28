import { Settings } from 'lucide-react';
import { useTranslation } from '@/hooks';
import { useAreaUnit, useDeviceEntities, useEntity, useHass, useMachineState } from '@/contexts';
import { resolveErrorLabel, resolveStatusLabel } from '@/i18n';
import { useIntegrationTranslations } from '@/hooks/useEntityLabel';
import { getAttr, isNumber } from '@/utils';
import {
  BATTERY_EMPTY_ICON_SVG,
  BATTERY_LOW_ICON_SVG,
  BATTERY_MEDIUM_ICON_SVG,
  BATTERY_FULL_ICON_SVG,
  HISTORY_ICON_SVG,
  AREA_ICON_SVG,
} from '@/constants/icons';

interface HeaderProps {
  deviceName: string;
  onSettingsClick?: () => void;
}

export function Header({ deviceName, onSettingsClick }: HeaderProps) {
  const { t } = useTranslation();
  const areaUnit = useAreaUnit();
  const hass = useHass();
  const entity = useEntity();
  const { get } = useDeviceEntities();
  const { phase, rawState } = useMachineState();
  const resources = useIntegrationTranslations();
  const statusText = resolveStatusLabel(resources, rawState);
  const errorEntityId = get('sensor', 'error_code');
  const errorEntityState = errorEntityId ? hass.states[errorEntityId]?.state : undefined;
  const rawAttrCode = entity.attributes.error_code;
  const fallbackErrorState =
    typeof rawAttrCode === 'number' && rawAttrCode > 0 ? String(rawAttrCode) : phase === 'error' ? 'in_trouble' : undefined;
  const errorLabel =
    phase === 'error' || rawState === 'error'
      ? resolveErrorLabel(resources, errorEntityState ?? fallbackErrorState, entity.attributes.error_type)
      : null;
  const displayStatusText = errorLabel ? `${statusText} — ${errorLabel}` : statusText;
  const cleanedArea = getAttr(entity.attributes.cleaned_area ?? entity.attributes.cleaning_area ?? entity.attributes.cleaned_area_sqm, 0);
  const cleaningTime = getAttr(entity.attributes.cleaning_time ?? entity.attributes.cleaning_time_minutes, 0);
  const rawBattery = entity.attributes.battery ?? entity.attributes.battery_level;
  const batteryLevel = getAttr(rawBattery, 0);

  const getBatteryLevelIcon = () => {
    const battery = rawBattery;
    if (!isNumber(battery)) return null;

    if (battery >= 80) return BATTERY_FULL_ICON_SVG;
    if (battery >= 60) return BATTERY_MEDIUM_ICON_SVG;
    if (battery >= 20) return BATTERY_LOW_ICON_SVG;
    return BATTERY_EMPTY_ICON_SVG;
  };

  const progress = getAttr(entity.attributes.cleaning_progress, 0) || getAttr(entity.attributes.drying_progress, 0);

  return (
    <div className="header">
      <div className="header__top">
        <div className="header__title-wrapper">
          <h2 className="header__title">{deviceName}</h2>
          <p className={`header__status ${errorLabel ? 'header__status--error' : ''}`}>{displayStatusText}</p>
        </div>
        {onSettingsClick && (
          <button className="header__settings-btn" onClick={onSettingsClick} type="button" aria-label="Settings">
            <Settings />
          </button>
        )}
      </div>

      {rawState !== 'sleeping' && progress > 0 && (
        <div className="header__progress">
          <div className="header__progress-bar">
            <div className="header__progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="header__stats">
        <div className="header__stat">
          <span className="header__stat-icon">{AREA_ICON_SVG}</span>
          <span className="header__stat-value">
            {cleanedArea} {areaUnit}
          </span>
        </div>
        <div className="header__stat">
          <span className="header__stat-icon">{HISTORY_ICON_SVG}</span>
          <span className="header__stat-value header__stat-value--cleaning-time">
            {cleaningTime} {t('units.minutes')}
          </span>
        </div>
        <div className="header__stat">
          <span className="header__stat-icon">{getBatteryLevelIcon()}</span>
          <span className="header__stat-value">
            {batteryLevel} {t('units.percent')}
          </span>
        </div>
      </div>
    </div>
  );
}
