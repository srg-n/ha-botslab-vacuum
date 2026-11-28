import { useState } from 'react';
import { SLIDER_CONFIG } from '@/constants';
import { useIsRtl } from '@/contexts';
import { selectOptionKey } from '@/utils';

interface WetnessSliderProps {
  wetnessLevel: number;
  mopPadHumidity: string;
  onChangeWetness: (entityId: string, value: number) => void;
  entityId: string;
  slightlyDryLabel: string;
  moistLabel: string;
  wetLabel: string;
  disabled?: boolean;
}

export function WetnessSlider({
  wetnessLevel,
  mopPadHumidity,
  onChangeWetness,
  entityId,
  slightlyDryLabel,
  moistLabel,
  wetLabel,
  disabled = false,
}: WetnessSliderProps) {
  const [dragValue, setDragValue] = useState<number | null>(null);
  const localValue = dragValue ?? wetnessLevel;
  const isRtl = useIsRtl();
  const { MIN, MAX } = SLIDER_CONFIG.WETNESS;
  const percent = ((localValue - MIN) / (MAX - MIN)) * 100;
  const thumbWidth = 20;
  const tooltipPosition = `calc(${percent}% + ${thumbWidth / 2 - (percent * thumbWidth) / 100}px)`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setDragValue(parseInt(e.target.value, 10));
    }
  };

  const handleCommit = () => {
    if (!disabled && dragValue !== null && dragValue !== wetnessLevel) {
      onChangeWetness(entityId, dragValue);
    }
    setDragValue(null);
  };

  const gradientDirection = isRtl ? 'to left' : 'to right';

  const labels = [
    { humidity: 'slightly_dry', text: slightlyDryLabel },
    { humidity: 'moist', text: moistLabel },
    { humidity: 'wet', text: wetLabel },
  ];

  return (
    <>
      <div
        className={`cleaning-mode-modal__slider-container ${disabled ? 'cleaning-mode-modal__slider-container--disabled' : ''}`}
      >
        <div className="cleaning-mode-modal__slider-wrapper">
          <input
            type="range"
            min={MIN}
            max={MAX}
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
        {labels.map(({ humidity, text }) => (
          <span
            key={humidity}
            className={`cleaning-mode-modal__slider-label cleaning-mode-modal__slider-label--${selectOptionKey(mopPadHumidity) === humidity ? 'active' : 'inactive'}`}
          >
            {text}
          </span>
        ))}
      </div>
    </>
  );
}
