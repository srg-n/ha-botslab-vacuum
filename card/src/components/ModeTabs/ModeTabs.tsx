import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AreaSelectionMode, CleaningSelectionMode } from '@/types/homeassistant';
import { useTranslation } from '@/hooks';
import { useMachineState } from '@/contexts';

interface ModeTabsProps {
  selectedMode: CleaningSelectionMode;
  areaSelectionMode?: AreaSelectionMode;
  onModeChange: (mode: CleaningSelectionMode) => void;
  onAreaSelectionModeChange?: (mode: AreaSelectionMode) => void;
}

export function ModeTabs({ selectedMode, areaSelectionMode = 'zone', onModeChange, onAreaSelectionModeChange }: ModeTabsProps) {
  const { t } = useTranslation();
  const { phase } = useMachineState();
  const [areaMenuOpened, setAreaMenuOpened] = useState(false);
  const areaMenuRef = useRef<HTMLDivElement>(null);

  const isDisabled = phase === 'cleaning' || phase === 'paused';

  const modes: { value: CleaningSelectionMode; label: string }[] = [
    { value: 'room', label: t('modes.room') },
    { value: 'all', label: t('modes.all') },
  ];

  useEffect(() => {
    if (!areaMenuOpened) return;

    const closeOnOutsideClick = (event: MouseEvent): void => {
      if (!areaMenuRef.current || !event.composedPath().includes(areaMenuRef.current)) {
        setAreaMenuOpened(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setAreaMenuOpened(false);
      }
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [areaMenuOpened]);

  const selectAreaMode = (mode: AreaSelectionMode): void => {
    if (onAreaSelectionModeChange && mode !== areaSelectionMode) {
      onAreaSelectionModeChange(mode);
    }
    if (selectedMode !== 'zone') {
      onModeChange('zone');
    }
    setAreaMenuOpened(false);
  };

  const getAreaModeLabel = (mode: AreaSelectionMode): string => {
    if (mode === 'no_go') return t('modes.no_go');
    if (mode === 'no_mop') return t('modes.no_mop');
    return t('modes.zone');
  };

  return (
    <div className={`mode-tabs ${isDisabled ? 'mode-tabs--disabled' : ''}`}>
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => onModeChange(mode.value)}
          className={`mode-tabs__button ${selectedMode === mode.value ? 'mode-tabs__button--active' : ''}`}
          disabled={isDisabled}
        >
          {mode.label}
        </button>
      ))}

      <div className="mode-tabs__area-select" ref={areaMenuRef}>
        <button
          type="button"
          onClick={() => setAreaMenuOpened((opened) => !opened)}
          className={`mode-tabs__button ${selectedMode === 'zone' ? 'mode-tabs__button--active' : ''}`}
          disabled={isDisabled}
          aria-haspopup="menu"
          aria-expanded={areaMenuOpened}
        >
          {getAreaModeLabel(areaSelectionMode)}
          <ChevronDown className={`mode-tabs__chevron ${areaMenuOpened ? 'mode-tabs__chevron--open' : ''}`} />
        </button>

        {areaMenuOpened && (
          <div className="mode-tabs__menu" role="menu">
            {(['zone', 'no_go', 'no_mop'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="menuitemradio"
                aria-checked={areaSelectionMode === mode}
                className={`mode-tabs__menu-item ${areaSelectionMode === mode ? 'mode-tabs__menu-item--active' : ''}`}
                onClick={() => selectAreaMode(mode)}
              >
                {getAreaModeLabel(mode)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
