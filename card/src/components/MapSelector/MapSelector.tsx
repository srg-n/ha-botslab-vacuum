import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Check, Map, RefreshCw, Loader2 } from 'lucide-react';
import { useTranslation, getEntityState, readSelectEntity } from '@/hooks';
import { useEntity, useHass, useDeviceEntities } from '@/contexts';
import { CARD_COMPANION_ENTITIES } from '@/constants';
import { logger } from '@/utils/logger';

interface MapInfo {
  id: string | number;
  name: string;
  custom_name?: string | null;
}

interface MapSelectorProps {
  onToast?: (message: string) => void;
  isSwitchingFloor?: boolean;
}

/**
 * Pick the option string the select entity actually accepts for this map.
 *
 * The integration and the card can be updated independently, so never assume
 * ``map.name`` is valid: prefer custom/exact name, then the ``Map <id>`` fallback
 * the select entity uses when no saved floors exist, then a de-duplicated option.
 */
function resolveSelectOption(map: MapInfo, options: string[]): string {
  if (map.custom_name && options.includes(map.custom_name)) return map.custom_name;
  if (options.includes(map.name)) return map.name;
  const byId = `Map ${map.id}`;
  if (options.includes(byId)) return byId;
  const disambiguated = options.find((option) => option.startsWith(`${map.name} (`) || option.startsWith(`${byId} (`));
  if (disambiguated) return disambiguated;
  if (options.length === 1) return options[0];
  return map.custom_name || map.name;
}

function sameMapId(left: unknown, right: unknown): boolean {
  if (left === undefined || left === null || right === undefined || right === null) return false;
  const a = String(left).trim();
  const b = String(right).trim();
  return a.length > 0 && a === b;
}

export function MapSelector({ onToast, isSwitchingFloor = false }: MapSelectorProps) {
  const { t } = useTranslation();
  const entity = useEntity();
  const hass = useHass();
  const [isOpen, setIsOpen] = useState(false);
  const [isPendingSwitch, setIsPendingSwitch] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { get } = useDeviceEntities();
  const attributes = entity.attributes;

  // Discover the floor-select entity via registry first, then fallback scan of hass.states
  const selectEntityId = useMemo(() => {
    const discovered =
      get(CARD_COMPANION_ENTITIES.selectedMap.platform, CARD_COMPANION_ENTITIES.selectedMap.key) ??
      get('select', 'active_floor');
    if (discovered) return discovered;

    const vacPrefix = entity.entity_id.replace(/^vacuum\./, '');
    return Object.keys(hass.states).find(
      (id) =>
        id.startsWith('select.') &&
        (id.includes(vacPrefix) || vacPrefix.length === 0) &&
        (id.endsWith('_selected_map') || id.endsWith('_active_floor') || id.includes('selected_map'))
    );
  }, [entity.entity_id, get, hass.states]);

  const syncButtonEntityId = useMemo(() => {
    const discovered = get('button', 'sync_map');
    if (discovered) return discovered;

    const vacPrefix = entity.entity_id.replace(/^vacuum\./, '');
    return Object.keys(hass.states).find(
      (id) => id.startsWith('button.') && id.includes(vacPrefix) && id.includes('sync_map')
    );
  }, [entity.entity_id, get, hass.states]);

  const selectState = getEntityState(hass, selectEntityId);
  const selectEntity = useMemo(() => readSelectEntity(selectState.entity), [selectState.entity]);

  // Build normalized floor map list from vacuum attributes, falling back to select entity options
  const maps = useMemo<MapInfo[]>(() => {
    const rawMaps = attributes.maps as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(rawMaps) && rawMaps.length > 0) {
      return rawMaps
        .map((item, idx) => {
          const id = (item.id ?? item.map_id ?? item.clean_id ?? idx) as string | number;
          const name = String(item.custom_name || item.name || `Map ${id}`);
          const customName = typeof item.custom_name === 'string' && item.custom_name.trim() ? item.custom_name : null;
          return { id, name, custom_name: customName };
        })
        .filter((item) => String(item.id).trim().length > 0);
    }

    if (selectEntity.options.length > 0) {
      return selectEntity.options.map((option) => ({
        id: option,
        name: option,
      }));
    }

    return [];
  }, [attributes.maps, selectEntity.options]);

  const selectedMapId = attributes.selected_map_id ?? attributes.selected_map;
  const isSwitching = isPendingSwitch || isSwitchingFloor;
  const isDisabled = selectState.unavailable && maps.length === 0;
  const hasMultipleMaps = maps.length > 1;

  // Resolve the currently selected map (matching by ID string or by select entity state)
  const selectedMap = useMemo(() => {
    const byId = maps.find((m) => sameMapId(m.id, selectedMapId));
    if (byId) return byId;
    if (selectEntity.value) {
      return maps.find((m) => m.name === selectEntity.value || m.custom_name === selectEntity.value);
    }
    return undefined;
  }, [maps, selectedMapId, selectEntity.value]);

  const selectedMapName =
    selectedMap?.custom_name ||
    selectedMap?.name ||
    selectEntity.value ||
    (typeof attributes.selected_map === 'string' && attributes.selected_map) ||
    t('map_selector.unknown');

  // Handle floor map selection via select entity (primary) or botslab_vacuum.switch_floor_map (fallback)
  const handleMapSelect = useCallback(
    async (map: MapInfo) => {
      setIsOpen(false);
      if (selectedMap && sameMapId(selectedMap.id, map.id)) {
        return;
      }

      const displayName = map.custom_name || map.name;
      setIsPendingSwitch(true);
      onToast?.(t('toast.switching_map', { name: displayName }));

      try {
        if (selectEntityId && hass.states[selectEntityId] && selectEntity.options.length > 0) {
          await hass.callService('select', 'select_option', {
            entity_id: selectEntityId,
            option: resolveSelectOption(map, selectEntity.options),
          });
        } else {
          await hass.callService('botslab_vacuum', 'switch_floor_map', {
            entity_id: entity.entity_id,
            map_id: String(map.id),
          });
        }
      } catch (err) {
        logger.error('MapSelector', 'Failed to switch floor map', err);
        onToast?.(t('toast.map_switch_failed'));
      } finally {
        setIsPendingSwitch(false);
      }
    },
    [entity.entity_id, hass, onToast, selectEntity.options, selectEntityId, selectedMap, t]
  );

  // Trigger map sync from vacuum / cloud
  const handleSyncMap = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    onToast?.(t('toast.syncing_map'));

    try {
      if (syncButtonEntityId && hass.states[syncButtonEntityId]) {
        await hass.callService('button', 'press', { entity_id: syncButtonEntityId });
      } else {
        await hass.callService('botslab_vacuum', 'sync_map', { entity_id: entity.entity_id });
      }
    } catch (err) {
      logger.error('MapSelector', 'Failed to sync map', err);
      onToast?.(t('toast.map_sync_failed'));
    } finally {
      window.setTimeout(() => setIsSyncing(false), 900);
    }
  }, [entity.entity_id, hass, isSyncing, onToast, syncButtonEntityId, t]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const path = event.composedPath();
      if (containerRef.current && !path.includes(containerRef.current)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="map-selector" ref={containerRef}>
      <div className="map-selector__bar">
        <div className="map-selector__picker">
          <button
            className={`map-selector__button ${isOpen ? 'map-selector__button--open' : ''} ${isDisabled ? 'map-selector__button--disabled' : ''} ${!hasMultipleMaps ? 'map-selector__button--static' : ''}`}
            onClick={() => hasMultipleMaps && !isDisabled && !isPendingSwitch && setIsOpen((prev) => !prev)}
            type="button"
            disabled={isDisabled || !hasMultipleMaps}
            aria-expanded={hasMultipleMaps ? isOpen : undefined}
            aria-haspopup={hasMultipleMaps ? 'listbox' : undefined}
          >
            <span className="map-selector__icon">
              {isSwitching ? <Loader2 size={15} className="map-selector__spinner" /> : <Map size={15} />}
            </span>
            <span className="map-selector__label">
              {isPendingSwitch ? t('map_selector.switching') : selectedMapName}
            </span>
            {hasMultipleMaps && (
              <ChevronDown
                size={15}
                className={`map-selector__chevron ${isOpen ? 'map-selector__chevron--open' : ''}`}
              />
            )}
          </button>

          {isOpen && hasMultipleMaps && (
            <div className="map-selector__dropdown" role="listbox">
              {maps.map((map) => {
                const isSelected = selectedMap ? sameMapId(map.id, selectedMap.id) : sameMapId(map.id, selectedMapId);
                const displayName = map.custom_name || map.name;

                return (
                  <button
                    key={String(map.id)}
                    className={`map-selector__option ${isSelected ? 'map-selector__option--selected' : ''}`}
                    onClick={() => void handleMapSelect(map)}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="map-selector__option-name">{displayName}</span>
                    {isSelected && <Check size={15} className="map-selector__option-check" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          className={`map-selector__sync-btn ${isSyncing ? 'map-selector__sync-btn--syncing' : ''}`}
          onClick={() => void handleSyncMap()}
          type="button"
          disabled={isSyncing}
          aria-label={t('map_selector.sync_map')}
          title={t('map_selector.sync_map')}
        >
          <RefreshCw size={15} className={isSyncing ? 'map-selector__spinner' : undefined} />
        </button>
      </div>
    </div>
  );
}
