import { Header } from '@/components/Header';
import { MapSelector } from '@/components/MapSelector';
import { CleaningModeButton } from '@/components/CleaningModeButton';
import { VacuumMap } from '@/components/VacuumMap';
import { ModeTabs } from '@/components/ModeTabs';
import { ActionButtons } from '@/components/ActionButtons';
import { CleaningModeModal } from '@/components/CleaningModeModal';
import { ShortcutsModal } from '@/components/ShortcutsModal';
import { SettingsPanel } from '@/components/SettingsPanel';
import { RoomSelectionDisplay } from '@/components/RoomSelectionDisplay';
import { Toast } from '@/components/common';
import {
  useCardUIState,
  useVacuumServices,
  useToast,
  useTranslation,
  useMapGeometry,
  useLoadDeviceEntities,
  useVacuumEntityIds,
  readSelectEntity,
  readStoredConfigs,
} from '@/hooks';
import type { RepeatCount } from '@/hooks/useCardUIState';
import {
  getEffectiveCleaningMode,
  getAttr,
  getActiveSegments,
  resolveMapEntityId,
  readLiveMapFloor,
  resolveCleaningSelection,
  mapDiagnostic,
} from '@/utils';
import { isRtlLanguage, resolveChromeLanguage } from '@/i18n';
import { useEntity, useHass, VacuumCardProvider } from '@/contexts';
import { CAPABILITY } from '@/constants';
import type { Hass, HassConfig, RoomsConfig } from '@/types/homeassistant';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { logger } from '@/utils/logger';

function publishedOrAttribute(hass: Hass, entityId: string | undefined, attribute: unknown): string {
  const published = readSelectEntity(entityId ? hass.states[entityId] : undefined).value;
  if (published) return published;
  return typeof attribute === 'string' ? attribute : '';
}

function CleaningModeControls({
  onClick,
  onShortcutsClick,
  onRepeatClick,
  repeatCount,
}: {
  onClick: () => void;
  onShortcutsClick?: () => void;
  onRepeatClick?: () => void;
  repeatCount: RepeatCount;
}) {
  const hass = useHass();
  const entity = useEntity();
  const entityIds = useVacuumEntityIds();

  return (
    <CleaningModeButton
      cleanGeniusMode={publishedOrAttribute(hass, entityIds.cleangeniusMode, entity.attributes.cleangenius_mode)}
      cleaningMode={publishedOrAttribute(hass, entityIds.cleaningMode, entity.attributes.cleaning_mode)}
      cleangenius={publishedOrAttribute(hass, entityIds.cleangenius, entity.attributes.cleangenius)}
      onClick={onClick}
      onShortcutsClick={onShortcutsClick}
      onRepeatClick={onRepeatClick}
      repeatCount={repeatCount}
    />
  );
}

interface DreameVacuumCardProps {
  hass: Hass;
  config: HassConfig;
}

export function DreameVacuumCard({ hass, config }: DreameVacuumCardProps) {
  const entity = hass.states[config.entity];
  const deviceEntities = useLoadDeviceEntities(hass, config.entity);
  logger.debug('DreameVacuumCard', 'Loaded entity', entity);
  const language = resolveChromeLanguage(config.language, hass.language);
  const isRtl = isRtlLanguage(language);
  const { t } = useTranslation(language);

  // Track map image dimensions and the picture token those dimensions belong to
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [loadedImageKey, setLoadedImageKey] = useState<string | null>(null);
  const [failedImageToken, setFailedImageToken] = useState<string | null>(null);

  // State management
  const {
    selectedMode,
    areaSelectionMode,
    selectedRooms,
    selectedZones,
    modalOpened,
    shortcutsModalOpened,
    settingsPanelOpened,
    repeatCount,
    setSelectedMode,
    setSelectedRooms,
    setSelectedZones,
    setModalOpened,
    setShortcutsModalOpened,
    setSettingsPanelOpened,
    handleModeChange,
    handleAreaSelectionModeChange,
    handleRoomToggle,
    cycleRepeatCount,
    resetRepeatCount,
  } = useCardUIState({ vacuumEntityId: config.entity, defaultMode: config.default_mode });

  const mapEntityId = resolveMapEntityId(
    config.map_entity,
    deviceEntities.get('camera', 'cleaning_map') ?? deviceEntities.get('camera', 'map'),
    hass,
    config.entity
  );
  const cameraAttributes = mapEntityId ? hass.states[mapEntityId]?.attributes : undefined;
  const mapFloor = readLiveMapFloor(entity?.attributes.selected_map_id, cameraAttributes, loadedImageKey);
  const mapReady = mapFloor.floorReady && mapFloor.imageReady;
  const activeImageDimensions = mapFloor.imageKey === loadedImageKey ? imageDimensions : null;

  const mapGeometry = useMapGeometry({
    hass,
    mapEntityId,
    imageWidth: activeImageDimensions?.width ?? 0,
    imageHeight: activeImageDimensions?.height ?? 0,
    roomNames: config.room_names,
  });
  const displayedGeometry = mapReady ? mapGeometry : { rooms: [], rotation: mapGeometry.rotation, transform: null };

  // Check if vacuum is actively cleaning (state === 'cleaning' or started attribute)
  const isCleaning = entity ? entity.state === 'cleaning' || getAttr(entity.attributes.started, false) : false;
  const isSegmentCleaning = entity ? entity.attributes.segment_cleaning === true : false;

  const acceptedFloorId = useRef<string | number | null | undefined>(undefined);
  useEffect(() => {
    const floorChanged = acceptedFloorId.current !== undefined && acceptedFloorId.current !== mapFloor.floorId;
    if (acceptedFloorId.current === undefined || floorChanged) {
      acceptedFloorId.current = mapFloor.floorId;
    }

    const activeSegments = getActiveSegments(hass, config.entity, mapEntityId, config.room_names);
    const update = resolveCleaningSelection({
      floorChanged,
      mapReady,
      isSegmentCleaning,
      selectedRooms,
      activeSegments,
    });

    if (update.clearZone) {
      setSelectedZones([]);
    }
    if (update.rooms) {
      logger.debug('DreameVacuumCard', 'Updating room selection for the current floor', [...update.rooms.keys()]);
      setSelectedRooms(update.rooms);
    }
    if (update.selectRoomMode) setSelectedMode('room');
  }, [
    mapFloor.floorId,
    mapReady,
    isSegmentCleaning,
    hass,
    config.entity,
    config.room_names,
    mapEntityId,
    selectedRooms,
    setSelectedRooms,
    setSelectedZones,
    setSelectedMode,
  ]);

  // Reset repeat count when vacuum stops cleaning
  useEffect(() => {
    if (!isCleaning) {
      resetRepeatCount();
    }
  }, [isCleaning, resetRepeatCount]);

  // Toast notifications
  const { toast, showToast, hideToast } = useToast();

  // Vacuum services
  const { handlePause, handleResume, handleStop, handleDock, handleClean, handleSaveNoGoZone } = useVacuumServices({
    hass,
    entityId: config.entity,
    mapEntityId,
    mapTransform: displayedGeometry.transform,
    onSuccess: showToast,
    onError: showToast,
  });

  // Handle room toggle with toast
  const handleRoomToggleWithToast = useCallback(
    (roomId: number, roomName: string) => {
      const wasSelected = selectedRooms.has(roomId);
      handleRoomToggle(roomId, roomName);
      showToast(
        wasSelected ? t('toast.deselected_room', { name: roomName }) : t('toast.selected_room', { name: roomName })
      );
    },
    [selectedRooms, handleRoomToggle, showToast, t]
  );

  const cleanInFlight = useRef(false);
  const handleCleanAction = useCallback(async () => {
    if (cleanInFlight.current) return;
    cleanInFlight.current = true;
    try {
      if (selectedMode === 'zone' && (areaSelectionMode === 'no_go' || areaSelectionMode === 'no_mop')) {
        const zoneType = areaSelectionMode === 'no_mop' ? 'mop' : 'forbid';
        const success = await handleSaveNoGoZone(
          selectedZones,
          activeImageDimensions?.width ?? 0,
          activeImageDimensions?.height ?? 0,
          zoneType
        );
        if (success) setSelectedZones([]);
        return;
      }

      let roomsConfig: RoomsConfig | undefined;
      if (selectedMode === 'room') {
        const storedConfigs = readStoredConfigs(config.entity);
        const cfgMap: RoomsConfig = {};
        for (const roomId of selectedRooms.keys()) {
          const cfg = storedConfigs[roomId];
          if (cfg) {
            cfgMap[String(roomId)] = {
              fan_speed: cfg.suctionLevel,
              water_level: cfg.wetnessLevel === 1 ? 'low' : cfg.wetnessLevel === 2 ? 'medium' : 'high',
              repeat_times: Number(cfg.cleaningTimes || 1),
            };
          }
        }
        if (Object.keys(cfgMap).length > 0) {
          roomsConfig = cfgMap;
        }
      }

      await handleClean(
        selectedMode,
        selectedRooms,
        selectedZones,
        activeImageDimensions?.width,
        activeImageDimensions?.height,
        repeatCount,
        roomsConfig
      );
    } finally {
      cleanInFlight.current = false;
    }
  }, [
    selectedMode,
    areaSelectionMode,
    selectedRooms,
    selectedZones,
    activeImageDimensions,
    repeatCount,
    config.entity,
    handleClean,
    handleSaveNoGoZone,
    setSelectedZones,
  ]);

  // Memoized handlers for modal/panel open/close
  const handleSettingsOpen = useCallback(() => setSettingsPanelOpened(true), [setSettingsPanelOpened]);
  const handleSettingsClose = useCallback(() => setSettingsPanelOpened(false), [setSettingsPanelOpened]);
  const handleModalOpen = useCallback(() => setModalOpened(true), [setModalOpened]);
  const handleModalClose = useCallback(() => setModalOpened(false), [setModalOpened]);
  const handleShortcutsOpen = useCallback(() => setShortcutsModalOpened(true), [setShortcutsModalOpened]);
  const handleShortcutsClose = useCallback(() => setShortcutsModalOpened(false), [setShortcutsModalOpened]);

  const handleImageDimensionsChange = useCallback(
    (width: number, height: number, imageToken: string) => {
      if (imageToken !== mapFloor.imageToken) return;
      setLoadedImageKey(mapFloor.imageKey);
      setImageDimensions({ width, height });
    },
    [mapFloor.imageToken, mapFloor.imageKey]
  );

  // Error handling
  if (!entity) {
    return <div className="dreame-vacuum-card__error">{t('errors.entity_not_found', { entity: config.entity })}</div>;
  }

  // Handle unavailable or unknown entity state
  if (entity.state === 'unavailable' || entity.state === 'unknown') {
    return (
      <div className="dreame-vacuum-card__error dreame-vacuum-card__error--unavailable">
        {t('errors.entity_unavailable')}
      </div>
    );
  }

  const deviceName = config.title || entity.attributes.friendly_name || 'Dreame Vacuum';
  const effectiveMode = getEffectiveCleaningMode(entity, selectedMode);
  const mapMaxHeight = typeof config.map_height === 'number' ? `${config.map_height}px` : config.map_height;

  // Check for shortcuts capability
  const hasShortcuts = (entity.attributes.capabilities ?? []).includes(CAPABILITY.SHORTCUTS);
  const diagnostic = mapDiagnostic({
    hasCamera: Boolean(mapEntityId && hass.states[mapEntityId]),
    imageFailed: mapFloor.imageToken !== null && failedImageToken === mapFloor.imageToken,
    floorReady: mapFloor.floorReady,
    imageReady: mapFloor.imageReady,
    roomCount: displayedGeometry.rooms.length,
    hasTransform: displayedGeometry.transform !== null,
  });

  return (
    <VacuumCardProvider hass={hass} entity={entity} config={config} language={language} deviceEntities={deviceEntities}>
      <div
        className="dreame-vacuum-card"
        dir={isRtl ? 'rtl' : 'ltr'}
        style={mapMaxHeight ? ({ '--map-max-height': mapMaxHeight } as CSSProperties) : undefined}
      >
        <div className="dreame-vacuum-card__container">
          <div className="dreame-vacuum-card__header">
            <Header deviceName={deviceName} onSettingsClick={handleSettingsOpen} />

            <MapSelector onToast={showToast} isSwitchingFloor={!mapFloor.floorReady} />

            {deviceEntities.status === 'error' && (
              <p className="dreame-vacuum-card__diagnostic">{t('errors.entity_discovery_failed')}</p>
            )}
            {diagnostic && <p className="dreame-vacuum-card__diagnostic">{t(`vacuum_map.diagnostic_${diagnostic}`)}</p>}
          </div>

          <div className="dreame-vacuum-card__map">
            <VacuumMap
              mapEntityId={mapEntityId}
              geometry={displayedGeometry}
              selectedMode={selectedMode}
              areaSelectionMode={areaSelectionMode}
              selectedRooms={selectedRooms}
              onRoomToggle={handleRoomToggleWithToast}
              zone={mapReady ? selectedZones : []}
              onZoneChange={setSelectedZones}
              onImageDimensionsChange={handleImageDimensionsChange}
              onImageError={setFailedImageToken}
              defaultRoomView={config.default_room_view}
              onZoneDeleted={showToast}
              isFloorSwitching={!mapFloor.floorReady}
            />
          </div>

          <div className="dreame-vacuum-card__footer">
            <CleaningModeControls
              onClick={handleModalOpen}
              onShortcutsClick={hasShortcuts ? handleShortcutsOpen : undefined}
              onRepeatClick={cycleRepeatCount}
              repeatCount={repeatCount}
            />

            <div className="dreame-vacuum-card__controls">
              {selectedMode === 'room' && <RoomSelectionDisplay selectedRooms={selectedRooms} />}

              <ModeTabs
                selectedMode={effectiveMode}
                areaSelectionMode={areaSelectionMode}
                onModeChange={handleModeChange}
                onAreaSelectionModeChange={handleAreaSelectionModeChange}
              />

              <ActionButtons
                selectedMode={selectedMode}
                areaSelectionMode={areaSelectionMode}
                selectedRoomsCount={selectedRooms.size}
                selectedZonesCount={selectedZones.length}
                onClean={handleCleanAction}
                onPause={handlePause}
                onResume={handleResume}
                onStop={handleStop}
                onDock={handleDock}
              />
            </div>
          </div>
        </div>

        <CleaningModeModal opened={modalOpened} onClose={handleModalClose} />

        <ShortcutsModal opened={shortcutsModalOpened} onClose={handleShortcutsClose} />

        <SettingsPanel opened={settingsPanelOpened} onClose={handleSettingsClose} />

        {toast && <Toast message={toast} onClose={hideToast} />}
      </div>
    </VacuumCardProvider>
  );
}
