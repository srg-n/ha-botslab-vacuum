import { useRef, useState, useCallback, useEffect } from 'react';
import { Loader2, Map as MapIcon, Trash2 } from 'lucide-react';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import type {
  AreaSelectionMode,
  CleaningSelectionMode,
  Zone,
  RoomViewMode,
  VacuumPosition,
} from '@/types/homeassistant';
import { useTranslation, type MapGeometry } from '@/hooks';
import { useHass, useMachineState, useConfig, useEntity } from '@/contexts';
import { STORAGE_KEY, isRobotBusy, vacuumStorageKey } from '@/constants';
import { containedRect, type PictureRect } from '@/utils/zoneConverter';
import { RoomSegments } from './RoomSegments';
import { MapControls } from './MapControls';
import { RoomListView } from './RoomListView';
import { ZoneOverlay } from './ZoneOverlay';
import { VacuumPositionMarker } from './VacuumPositionMarker';
import { ChargerMarker } from './ChargerMarker';
import { RoomLabels } from './RoomLabels';
import { SavedNoGoOverlay, type SavedNoGoZoneItem } from './SavedNoGoOverlay';

interface VacuumMapProps {
  mapEntityId: string;
  geometry: MapGeometry;
  selectedMode: CleaningSelectionMode;
  areaSelectionMode: AreaSelectionMode;
  selectedRooms: Map<number, string>;
  onRoomToggle: (roomId: number, roomName: string) => void;
  zone: Zone[];
  onZoneChange: (zones: Zone[]) => void;
  onImageDimensionsChange?: (width: number, height: number, imageToken: string) => void;
  onImageError?: (imageToken: string) => void;
  defaultRoomView?: RoomViewMode;
  onZoneDeleted?: (message: string) => void;
  isFloorSwitching?: boolean;
}

function measurePicture(img: HTMLImageElement): PictureRect | null {
  const rect = containedRect(img.offsetWidth, img.offsetHeight, img.naturalWidth, img.naturalHeight);
  return rect && { ...rect, left: img.offsetLeft + rect.left, top: img.offsetTop + rect.top };
}

// Separate component to access zoom controls via hook
interface MapControlsWrapperProps {
  showViewToggle: boolean;
  showZoomControls: boolean;
  viewMode: RoomViewMode;
  onViewToggle: () => void;
  isMapLocked: boolean;
  onToggleLock: () => void;
  onResetTransformReady: (resetFn: () => void) => void;
}

function MapControlsWrapper({
  showViewToggle,
  showZoomControls,
  viewMode,
  onViewToggle,
  isMapLocked,
  onToggleLock,
  onResetTransformReady,
}: MapControlsWrapperProps) {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  // Pass resetTransform to parent via callback in effect
  useEffect(() => {
    onResetTransformReady(resetTransform);
  }, [resetTransform, onResetTransformReady]);

  return (
    <MapControls
      showViewToggle={showViewToggle}
      showZoomControls={showZoomControls}
      viewMode={viewMode}
      onViewToggle={onViewToggle}
      onZoomIn={() => zoomIn()}
      onZoomOut={() => zoomOut()}
      onZoomReset={() => resetTransform()}
      isMapLocked={isMapLocked}
      onToggleLock={onToggleLock}
    />
  );
}

export function VacuumMap({
  mapEntityId,
  geometry,
  selectedMode,
  areaSelectionMode,
  selectedRooms,
  onRoomToggle,
  zone,
  onZoneChange,
  onImageDimensionsChange,
  onImageError,
  defaultRoomView = 'map',
  onZoneDeleted,
  isFloorSwitching = false,
}: VacuumMapProps) {
  const { t } = useTranslation();
  const hass = useHass();
  const config = useConfig();
  const { phase } = useMachineState();
  const entity = useEntity();
  const roomSelectionEnabled = !isRobotBusy(phase, entity.state);
  const mapEntity = hass.states[mapEntityId];
  const entityPicture = mapEntity?.attributes?.entity_picture;
  const mapUrl = typeof entityPicture === 'string' ? entityPicture : undefined;
  const mapRef = useRef<HTMLDivElement>(null);
  const resetTransformRef = useRef<(() => void) | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [pictureFrame, setPictureFrame] = useState<PictureRect | null>(null);
  const observeImage = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    const observer = new ResizeObserver(() => setPictureFrame(measurePicture(img)));
    observer.observe(img);
    if (img.parentElement) observer.observe(img.parentElement);
    return () => observer.disconnect();
  }, []);
  const [roomViewMode, setRoomViewMode] = useState<RoomViewMode>(defaultRoomView);
  const mapLockedKey = vacuumStorageKey(STORAGE_KEY.MAP_LOCKED, config.entity);

  // Map lock state - persisted to localStorage, default: locked
  const [isMapLocked, setIsMapLocked] = useState(() => {
    try {
      const stored = localStorage.getItem(mapLockedKey);
      return stored === null ? true : stored === 'true';
    } catch {
      // localStorage not available
      return true;
    }
  });

  // Callback to receive resetTransform from child component
  const handleResetTransformReady = useCallback((resetFn: () => void) => {
    resetTransformRef.current = resetFn;
  }, []);

  // Handle lock toggle - reset transform when locking
  const handleToggleLock = useCallback(() => {
    const newLocked = !isMapLocked;
    if (newLocked && resetTransformRef.current) {
      resetTransformRef.current();
    }
    setIsMapLocked(newLocked);
    try {
      localStorage.setItem(mapLockedKey, String(newLocked));
    } catch {
      // localStorage not available
    }
  }, [isMapLocked, mapLockedKey]);

  // Effective view mode: use user selection only in room mode, otherwise default
  const effectiveRoomViewMode = selectedMode === 'room' ? roomViewMode : defaultRoomView;

  const { rooms: parsedRooms, transform } = geometry;

  // Extract vacuum and charger positions from map entity attributes
  const vacuumPosition = mapEntity?.attributes?.vacuum_position as VacuumPosition | undefined;
  const chargerPosition = mapEntity?.attributes?.charger_position as VacuumPosition | undefined;

  // Determine if vacuum is currently cleaning (not docked)
  const isCleaning = phase === 'cleaning';

  const overlays = config.map_overlays ?? [];
  const hasDimensions = imageDimensions.width > 0 && imageDimensions.height > 0;
  const showVacuumMarker = overlays.includes('vacuum') && vacuumPosition && hasDimensions && transform;
  const showChargerMarker = overlays.includes('charger') && chargerPosition && hasDimensions && transform;
  const showRoomLabels = overlays.includes('room_labels') && hasDimensions && transform;

  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      if (!mapUrl || !img.naturalWidth || !img.naturalHeight) return;
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setPictureFrame(measurePicture(img));
      onImageDimensionsChange?.(img.naturalWidth, img.naturalHeight, mapUrl);
    },
    [mapUrl, onImageDimensionsChange]
  );

  const handleImageError = useCallback(() => {
    if (mapUrl) onImageError?.(mapUrl);
  }, [mapUrl, onImageError]);

  // Determine if panning should be enabled (disabled when locked or in zone mode for zone creation)
  const isPanningEnabled = !isMapLocked && selectedMode !== 'zone';

  // Determine map container class
  const mapClassName = `vacuum-map${isMapLocked ? ' vacuum-map--locked' : ''}`;

  return (
    <div className={mapClassName} ref={mapRef}>
      {mapEntity && mapUrl ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          centerZoomedOut={false}
          limitToBounds={false}
          wheel={{
            step: 0.05,
            disabled: isMapLocked,
          }}
          pinch={{
            step: 0.5,
            disabled: isMapLocked,
          }}
          panning={{
            disabled: !isPanningEnabled,
            velocityDisabled: true,
          }}
          doubleClick={{ disabled: true }}
        >
          <MapControlsWrapper
            showViewToggle={selectedMode === 'room'}
            showZoomControls={selectedMode !== 'room' || effectiveRoomViewMode === 'map'}
            viewMode={effectiveRoomViewMode}
            onViewToggle={() => setRoomViewMode((v) => (v === 'map' ? 'list' : 'map'))}
            isMapLocked={isMapLocked}
            onToggleLock={handleToggleLock}
            onResetTransformReady={handleResetTransformReady}
          />
          <TransformComponent
            wrapperStyle={{
              width: '100%',
              height: '100%',
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="vacuum-map__content">
              <img
                ref={observeImage}
                src={hass.hassUrl(mapUrl)}
                alt="Vacuum Map"
                className={`vacuum-map__image ${isFloorSwitching ? 'vacuum-map__image--switching' : ''}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                draggable={false}
              />

              {pictureFrame && (
                <div className="vacuum-map__picture-frame" style={pictureFrame}>
                  {showChargerMarker && (
                    <ChargerMarker
                      position={chargerPosition}
                      transform={transform}
                      imageWidth={imageDimensions.width}
                      imageHeight={imageDimensions.height}
                    />
                  )}

                  {showVacuumMarker && (
                    <VacuumPositionMarker
                      position={vacuumPosition}
                      transform={transform}
                      imageWidth={imageDimensions.width}
                      imageHeight={imageDimensions.height}
                      isCleaning={isCleaning}
                    />
                  )}

                  {showRoomLabels && (
                    <RoomLabels
                      rooms={parsedRooms}
                      transform={transform}
                      imageWidth={imageDimensions.width}
                      imageHeight={imageDimensions.height}
                      scale={config.room_label_scale}
                    />
                  )}

                  {selectedMode === 'room' &&
                    effectiveRoomViewMode === 'map' &&
                    roomSelectionEnabled &&
                    imageDimensions.width > 0 &&
                    imageDimensions.height > 0 &&
                    transform && (
                      <RoomSegments
                        rooms={parsedRooms}
                        selectedRooms={selectedRooms}
                        onRoomToggle={onRoomToggle}
                        transform={transform}
                        imageWidth={imageDimensions.width}
                        imageHeight={imageDimensions.height}
                      />
                    )}

                  <SavedNoGoOverlay
                    noGoZones={
                      (mapEntity?.attributes?.no_go_zones ||
                        entity?.attributes?.no_go_zones ||
                        []) as SavedNoGoZoneItem[]
                    }
                    transform={transform}
                    imageWidth={imageDimensions.width}
                    imageHeight={imageDimensions.height}
                    editable={selectedMode === 'zone' && (areaSelectionMode === 'no_go' || areaSelectionMode === 'no_mop')}
                    onZoneDeleted={onZoneDeleted}
                  />
                  {selectedMode === 'zone' && (
                    <ZoneOverlay
                      zones={zone}
                      onZonesChange={onZoneChange}
                      clearZoneLabel={t('vacuum_map.clear_zone')}
                      mode={areaSelectionMode}
                      transform={transform}
                      imageWidth={imageDimensions.width}
                      imageHeight={imageDimensions.height}
                    />
                  )}
                </div>
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      ) : (
        <div className="vacuum-map__placeholder">
          <MapIcon size={32} className="vacuum-map__placeholder-icon" />
          <p className="vacuum-map__placeholder-title">{t('vacuum_map.no_map')}</p>
          {mapEntityId && <small>{t('vacuum_map.looking_for', { entity: mapEntityId })}</small>}
        </div>
      )}

      {isFloorSwitching && mapEntity && mapUrl && (
        <div className="vacuum-map__switching" role="status" aria-live="polite">
          <Loader2 size={16} className="vacuum-map__switching-spinner" />
          <span>{t('vacuum_map.switching_floor')}</span>
        </div>
      )}

      {selectedMode === 'room' && (
        <>
          {effectiveRoomViewMode === 'map' && roomSelectionEnabled && (
            <div className="vacuum-map__overlay">{t('vacuum_map.room_overlay')}</div>
          )}

          {effectiveRoomViewMode === 'list' && roomSelectionEnabled && (
            <RoomListView rooms={parsedRooms} selectedRooms={selectedRooms} onRoomToggle={onRoomToggle} />
          )}
        </>
      )}

      {selectedMode === 'zone' && (
        <div className="vacuum-map__zone-bar">
          <span className="vacuum-map__zone-bar-hint">
            {areaSelectionMode === 'no_go'
              ? zone.length > 0
                ? t('vacuum_map.nogo_overlay_resize')
                : t('vacuum_map.nogo_overlay_create')
              : areaSelectionMode === 'no_mop'
                ? zone.length > 0
                  ? t('vacuum_map.nomop_overlay_resize')
                  : t('vacuum_map.nomop_overlay_create')
                : zone.length > 0
                  ? t('vacuum_map.zone_overlay_resize')
                  : t('vacuum_map.zone_overlay_create')}
          </span>
          {zone.length > 0 && roomSelectionEnabled && (
            <button
              type="button"
              className="vacuum-map__zone-bar-clear"
              onClick={() => onZoneChange([])}
              title={t('vacuum_map.clear_all_zones')}
            >
              <Trash2 size={13} />
              <span>{t('vacuum_map.clear_all_zones')}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
