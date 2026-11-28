import { useState, useCallback, useRef } from 'react';
import { useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';
import { X } from 'lucide-react';
import type { AreaSelectionMode, Zone } from '@/types/homeassistant';
import type { MapTransform } from '@/utils/mapTransform';
import { convertUIZoneToVacuumZone } from '@/utils/zoneConverter';
import { useMachineState } from '@/contexts';
import { logger } from '@/utils/logger';

interface ZoneOverlayProps {
  zones: Zone[];
  onZonesChange: (zones: Zone[]) => void;
  clearZoneLabel: string;
  mode?: AreaSelectionMode;
  transform?: MapTransform | null;
  imageWidth?: number;
  imageHeight?: number;
  maxZones?: number;
}

type ResizeHandle = 'top' | 'right' | 'bottom' | 'left' | 'nw' | 'ne' | 'sw' | 'se';

type InteractionState =
  | { kind: 'draw'; pointerId: number; startX: number; startY: number; currentX: number; currentY: number }
  | { kind: 'move'; pointerId: number; index: number; startX: number; startY: number; originZone: Zone }
  | { kind: 'resize'; pointerId: number; index: number; handle: ResizeHandle; originZone: Zone };

const MIN_ZONE_SIZE = 5;
const DEFAULT_TAP_SIZE = 18;
const DRAW_DRAG_THRESHOLD = 2.5;
const DEFAULT_MAX_ZONES = 5;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatZoneDimensions(
  zone: Zone,
  transform?: MapTransform | null,
  imageWidth?: number,
  imageHeight?: number
): string | null {
  if (!transform || !imageWidth || !imageHeight) return null;
  const converted = convertUIZoneToVacuumZone(zone, transform, imageWidth, imageHeight);
  if (!converted.ok) return null;
  const widthM = Math.abs(converted.zone.x2 - converted.zone.x1) / 1000;
  const heightM = Math.abs(converted.zone.y2 - converted.zone.y1) / 1000;
  if (!Number.isFinite(widthM) || !Number.isFinite(heightM) || widthM <= 0 || heightM <= 0) {
    return null;
  }
  return `${widthM.toFixed(1)}×${heightM.toFixed(1)}m`;
}

/**
 * Interactive zone selection overlay inside TransformComponent.
 * Supports:
 * - Click-and-drag on empty map to draw a zone directly, or tap to drop a default box
 * - Drag inside any zone to reposition it smoothly within map bounds
 * - 8 resize handles (4 corners + 4 edges) with pointer capture so drags never drop
 * - Live real-world metric dimensions when map calibration is available
 */
export function ZoneOverlay({
  zones,
  onZonesChange,
  clearZoneLabel,
  mode = 'zone',
  transform = null,
  imageWidth = 0,
  imageHeight = 0,
  maxZones = DEFAULT_MAX_ZONES,
}: ZoneOverlayProps) {
  const transformContext = useTransformContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { phase } = useMachineState();
  const isEditable = phase !== 'cleaning' && phase !== 'paused';

  const [interaction, setInteraction] = useState<InteractionState | null>(null);
  const interactionRef = useRef<InteractionState | null>(null);

  const [scale, setScale] = useState(transformContext.state.scale);
  useTransformEffect(
    useCallback((state) => {
      setScale(state.state.scale);
    }, [])
  );
  const handleScale = 1 / scale;

  const updateInteraction = useCallback((next: InteractionState | null) => {
    interactionRef.current = next;
    setInteraction(next);
  }, []);

  const getContentCoordinates = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const container = containerRef.current;
    if (!container) return null;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    return {
      x: clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
      y: clamp(((clientY - rect.top) / rect.height) * 100, 0, 100),
    };
  }, []);

  const handleContainerPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isEditable || e.button !== 0) return;
      if (zones.length >= maxZones) return;
      const coords = getContentCoordinates(e.clientX, e.clientY);
      if (!coords) return;

      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      updateInteraction({
        kind: 'draw',
        pointerId: e.pointerId,
        startX: coords.x,
        startY: coords.y,
        currentX: coords.x,
        currentY: coords.y,
      });
    },
    [getContentCoordinates, isEditable, maxZones, updateInteraction, zones.length]
  );

  const handleMoveStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, index: number) => {
      if (!isEditable || e.button !== 0) return;
      const targetZone = zones[index];
      const coords = getContentCoordinates(e.clientX, e.clientY);
      if (!targetZone || !coords) return;

      e.stopPropagation();
      containerRef.current?.setPointerCapture(e.pointerId);
      updateInteraction({
        kind: 'move',
        pointerId: e.pointerId,
        index,
        startX: coords.x,
        startY: coords.y,
        originZone: targetZone,
      });
    },
    [getContentCoordinates, isEditable, updateInteraction, zones]
  );

  const handleResizeStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, index: number, handle: ResizeHandle) => {
      if (!isEditable || e.button !== 0) return;
      const targetZone = zones[index];
      if (!targetZone) return;

      e.stopPropagation();
      e.preventDefault();
      containerRef.current?.setPointerCapture(e.pointerId);
      updateInteraction({
        kind: 'resize',
        pointerId: e.pointerId,
        index,
        handle,
        originZone: targetZone,
      });
    },
    [isEditable, updateInteraction, zones]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const current = interactionRef.current;
      if (!current || current.pointerId !== e.pointerId) return;

      const coords = getContentCoordinates(e.clientX, e.clientY);
      if (!coords) return;

      if (current.kind === 'draw') {
        updateInteraction({
          ...current,
          currentX: coords.x,
          currentY: coords.y,
        });
        return;
      }

      if (current.kind === 'move') {
        const width = current.originZone.x2 - current.originZone.x1;
        const height = current.originZone.y2 - current.originZone.y1;
        const dx = coords.x - current.startX;
        const dy = coords.y - current.startY;
        const nextX1 = clamp(current.originZone.x1 + dx, 0, 100 - width);
        const nextY1 = clamp(current.originZone.y1 + dy, 0, 100 - height);
        const movedZone: Zone = {
          x1: nextX1,
          y1: nextY1,
          x2: nextX1 + width,
          y2: nextY1 + height,
        };
        onZonesChange(zones.map((z, idx) => (idx === current.index ? movedZone : z)));
        return;
      }

      if (current.kind === 'resize') {
        const nextZone: Zone = { ...current.originZone };
        const { handle } = current;
        if (handle === 'top' || handle === 'nw' || handle === 'ne') {
          nextZone.y1 = clamp(coords.y, 0, current.originZone.y2 - MIN_ZONE_SIZE);
        }
        if (handle === 'bottom' || handle === 'sw' || handle === 'se') {
          nextZone.y2 = clamp(coords.y, current.originZone.y1 + MIN_ZONE_SIZE, 100);
        }
        if (handle === 'left' || handle === 'nw' || handle === 'sw') {
          nextZone.x1 = clamp(coords.x, 0, current.originZone.x2 - MIN_ZONE_SIZE);
        }
        if (handle === 'right' || handle === 'ne' || handle === 'se') {
          nextZone.x2 = clamp(coords.x, current.originZone.x1 + MIN_ZONE_SIZE, 100);
        }
        onZonesChange(zones.map((z, idx) => (idx === current.index ? nextZone : z)));
      }
    },
    [getContentCoordinates, onZonesChange, updateInteraction, zones]
  );

  const finishInteraction = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, cancelled: boolean) => {
      const current = interactionRef.current;
      if (!current || current.pointerId !== e.pointerId) return;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      if (!cancelled && current.kind === 'draw' && zones.length < maxZones) {
        const dx = Math.abs(current.currentX - current.startX);
        const dy = Math.abs(current.currentY - current.startY);
        let newZone: Zone;
        if (dx >= DRAW_DRAG_THRESHOLD || dy >= DRAW_DRAG_THRESHOLD) {
          const minX = Math.min(current.startX, current.currentX);
          const maxX = Math.max(current.startX, current.currentX);
          const minY = Math.min(current.startY, current.currentY);
          const maxY = Math.max(current.startY, current.currentY);
          const width = Math.max(MIN_ZONE_SIZE, maxX - minX);
          const height = Math.max(MIN_ZONE_SIZE, maxY - minY);
          const clampedX1 = clamp(minX, 0, 100 - width);
          const clampedY1 = clamp(minY, 0, 100 - height);
          newZone = {
            x1: clampedX1,
            y1: clampedY1,
            x2: clampedX1 + width,
            y2: clampedY1 + height,
          };
        } else {
          const half = DEFAULT_TAP_SIZE / 2;
          const x1 = clamp(current.startX - half, 0, 100 - DEFAULT_TAP_SIZE);
          const y1 = clamp(current.startY - half, 0, 100 - DEFAULT_TAP_SIZE);
          newZone = {
            x1,
            y1,
            x2: x1 + DEFAULT_TAP_SIZE,
            y2: y1 + DEFAULT_TAP_SIZE,
          };
        }
        logger.debug('Zone', 'Created zone:', newZone);
        onZonesChange([...zones, newZone]);
      }

      updateInteraction(null);
    },
    [maxZones, onZonesChange, updateInteraction, zones]
  );

  const handleClearZone = (event: React.MouseEvent | React.PointerEvent, index: number) => {
    event.stopPropagation();
    onZonesChange(zones.filter((_, zoneIndex) => zoneIndex !== index));
    updateInteraction(null);
  };

  const modeClass =
    mode === 'no_go'
      ? 'vacuum-map__zone--nogo'
      : mode === 'no_mop'
        ? 'vacuum-map__zone--nomop'
        : '';

  const draftZone: Zone | null =
    interaction?.kind === 'draw' &&
    (Math.abs(interaction.currentX - interaction.startX) >= DRAW_DRAG_THRESHOLD ||
      Math.abs(interaction.currentY - interaction.startY) >= DRAW_DRAG_THRESHOLD)
      ? {
          x1: Math.min(interaction.startX, interaction.currentX),
          y1: Math.min(interaction.startY, interaction.currentY),
          x2: Math.max(interaction.startX, interaction.currentX),
          y2: Math.max(interaction.startY, interaction.currentY),
        }
      : null;

  return (
    <div
      ref={containerRef}
      className={`vacuum-map__zone-container ${isEditable && zones.length < maxZones ? 'vacuum-map__zone-container--drawable' : ''}`}
      onPointerDown={handleContainerPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(e) => finishInteraction(e, false)}
      onPointerCancel={(e) => finishInteraction(e, true)}
    >
      {zones.map((zone, index) => {
        const isActive =
          (interaction?.kind === 'move' || interaction?.kind === 'resize') && interaction.index === index;
        const dimensions = formatZoneDimensions(zone, transform, imageWidth, imageHeight);
        return (
          <div
            key={`zone-${index}`}
            className={`vacuum-map__zone ${modeClass} ${isActive ? 'vacuum-map__zone--active' : ''} ${isEditable ? 'vacuum-map__zone--movable' : ''}`}
            style={{
              left: `${zone.x1}%`,
              top: `${zone.y1}%`,
              width: `${zone.x2 - zone.x1}%`,
              height: `${zone.y2 - zone.y1}%`,
            }}
            onPointerDown={(event) => handleMoveStart(event, index)}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="vacuum-map__zone-badge"
              style={{ transform: `scale(${handleScale})` }}
            >
              <span className="vacuum-map__zone-badge-index">#{index + 1}</span>
              {dimensions && <span className="vacuum-map__zone-badge-size">{dimensions}</span>}
            </div>

            {isEditable && (
              <>
                <div
                  className="vacuum-map__zone-handle vacuum-map__zone-handle--top"
                  style={{ transform: `translateX(-50%) scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'top')}
                />
                <div
                  className="vacuum-map__zone-handle vacuum-map__zone-handle--right"
                  style={{ transform: `translateY(-50%) scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'right')}
                />
                <div
                  className="vacuum-map__zone-handle vacuum-map__zone-handle--bottom"
                  style={{ transform: `translateX(-50%) scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'bottom')}
                />
                <div
                  className="vacuum-map__zone-handle vacuum-map__zone-handle--left"
                  style={{ transform: `translateY(-50%) scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'left')}
                />
                <div
                  className="vacuum-map__zone-corner vacuum-map__zone-corner--nw"
                  style={{ transform: `scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'nw')}
                />
                <div
                  className="vacuum-map__zone-corner vacuum-map__zone-corner--sw"
                  style={{ transform: `scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'sw')}
                />
                <div
                  className="vacuum-map__zone-corner vacuum-map__zone-corner--se"
                  style={{ transform: `scale(${handleScale})` }}
                  onPointerDown={(event) => handleResizeStart(event, index, 'se')}
                />
                <button
                  type="button"
                  className="vacuum-map__zone-clear"
                  style={{ transform: `scale(${handleScale})` }}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => handleClearZone(event, index)}
                  title={clearZoneLabel}
                  aria-label={clearZoneLabel}
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>
        );
      })}

      {draftZone && (
        <div
          className={`vacuum-map__zone vacuum-map__zone--draft ${modeClass}`}
          style={{
            left: `${draftZone.x1}%`,
            top: `${draftZone.y1}%`,
            width: `${draftZone.x2 - draftZone.x1}%`,
            height: `${draftZone.y2 - draftZone.y1}%`,
          }}
        >
          {formatZoneDimensions(draftZone, transform, imageWidth, imageHeight) && (
            <div className="vacuum-map__zone-badge" style={{ transform: `scale(${handleScale})` }}>
              <span className="vacuum-map__zone-badge-size">
                {formatZoneDimensions(draftZone, transform, imageWidth, imageHeight)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
