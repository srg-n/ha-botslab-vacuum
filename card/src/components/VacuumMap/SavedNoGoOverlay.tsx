import React, { useCallback, useState } from 'react';
import { useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';
import { X } from 'lucide-react';
import type { MapTransform } from '@/utils/mapTransform';
import { useHass, useEntity } from '@/contexts';
import { useTranslation } from '@/hooks/useTranslation';
import { logger } from '@/utils/logger';

export interface SavedNoGoZoneItem {
  type?: string;
  points?: number[];
  vertexs?: number[][];
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  [key: string]: unknown;
}

interface SavedNoGoOverlayProps {
  noGoZones: SavedNoGoZoneItem[];
  transform: MapTransform | null;
  imageWidth: number;
  imageHeight: number;
  editable: boolean;
  onZoneDeleted?: (message: string) => void;
}

/** Normalize the many spellings the integration / robot may use for an area kind. */
function resolveZoneKind(zone: SavedNoGoZoneItem): 'nogo' | 'nomop' | 'wall' {
  const raw = String(zone.type ?? '').toLowerCase();
  if (raw === 'line' || raw === 'wall' || raw === 'virtual_wall') return 'wall';
  if (raw === 'mop' || raw === 'no_mop' || raw === 'nomop') return 'nomop';
  const active = String((zone as Record<string, unknown>).active ?? '').toLowerCase();
  if (active === 'line') return 'wall';
  const forbidType = String((zone as Record<string, unknown>).forbidType ?? '').toLowerCase();
  if (forbidType === 'mop') return 'nomop';
  return 'nogo';
}

export function SavedNoGoOverlay({
  noGoZones,
  transform,
  imageWidth,
  imageHeight,
  editable,
  onZoneDeleted,
}: SavedNoGoOverlayProps) {
  const hass = useHass();
  const entity = useEntity();
  const { t } = useTranslation();
  const transformContext = useTransformContext();
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(transformContext.state.scale);

  useTransformEffect(
    useCallback((state) => {
      setScale(state.state.scale);
    }, [])
  );
  const controlScale = 1 / scale;

  const handleDeleteZone = useCallback(
    async (zone: SavedNoGoZoneItem, index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (deletingIndex !== null) return;

      const resolvedPoints =
        Array.isArray(zone.points) && zone.points.length >= 4
          ? zone.points
          : zone.x1 !== undefined && zone.y1 !== undefined && zone.x2 !== undefined && zone.y2 !== undefined
            ? [Number(zone.x1), Number(zone.y1), Number(zone.x2), Number(zone.y2)]
            : undefined;

      const payload: Record<string, unknown> = {
        entity_id: entity.entity_id,
        zone_type: zone.type,
        index,
      };
      if (resolvedPoints) {
        payload.points = resolvedPoints;
      }

      setDeletingIndex(index);
      try {
        await hass.callService('botslab_vacuum', 'delete_no_go_zone', payload);
        onZoneDeleted?.(t('toast.zone_deleted'));
      } catch (err) {
        logger.error('Failed to delete no-go zone', err);
        const message = err instanceof Error ? err.message : String(err);
        onZoneDeleted?.(t('toast.operation_failed', { error: message }));
      } finally {
        setDeletingIndex(null);
      }
    },
    [deletingIndex, hass, entity.entity_id, onZoneDeleted, t]
  );

  if (!transform || !imageWidth || !imageHeight || !Array.isArray(noGoZones) || noGoZones.length === 0) {
    return null;
  }

  return (
    <div className="vacuum-map__saved-zones-layer">
      {noGoZones.map((zone, index) => {
        const kind = resolveZoneKind(zone);
        const isWall = kind === 'wall';

        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        if (Array.isArray(zone.points) && zone.points.length >= 4) {
          x1 = zone.points[0];
          y1 = zone.points[1];
          x2 = zone.points[2];
          y2 = zone.points[3];
        } else if (Array.isArray(zone.vertexs) && zone.vertexs.length >= 2) {
          const xs = zone.vertexs.map((v) => (Array.isArray(v) ? v[0] : 0));
          const ys = zone.vertexs.map((v) => (Array.isArray(v) ? v[1] : 0));
          x1 = Math.min(...xs);
          y1 = Math.min(...ys);
          x2 = Math.max(...xs);
          y2 = Math.max(...ys);
        } else if (zone.x1 !== undefined && zone.y1 !== undefined) {
          x1 = Number(zone.x1);
          y1 = Number(zone.y1);
          x2 = Number(zone.x2 ?? x1);
          y2 = Number(zone.y2 ?? y1);
        } else {
          return null;
        }

        // A virtual wall is a segment: draw it from its two real vertices so the
        // direction is preserved (a bounding box would be misleading).
        if (isWall && Array.isArray(zone.vertexs) && zone.vertexs.length >= 2) {
          const a = zone.vertexs[0];
          const b = zone.vertexs[1];
          if (Array.isArray(a) && Array.isArray(b)) {
            x1 = Number(a[0]);
            y1 = Number(a[1]);
            x2 = Number(b[0]);
            y2 = Number(b[1]);
          }
        }

        const p1 = transform.vacuumToMap({ x: x1, y: y1 });
        const p2 = transform.vacuumToMap({ x: x2, y: y2 });

        if (!Number.isFinite(p1.x) || !Number.isFinite(p1.y) || !Number.isFinite(p2.x) || !Number.isFinite(p2.y)) {
          return null;
        }

        if (isWall) {
          const lengthPx = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          if (!Number.isFinite(lengthPx) || lengthPx <= 0) {
            return null;
          }
          const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
          return (
            <div
              key={`saved-wall-${index}-${x1}-${y1}`}
              className="vacuum-map__saved-zone vacuum-map__saved-zone--wall"
              style={{
                left: `${(p1.x / imageWidth) * 100}%`,
                top: `${(p1.y / imageHeight) * 100}%`,
                width: `${(lengthPx / imageWidth) * 100}%`,
                transform: `rotate(${angle}deg)`,
                // Used by the badge to cancel the line rotation so the text stays flat.
                ['--wall-angle' as string]: `${angle}deg`,
              } as React.CSSProperties}
            >
              {editable && (
                <>
                  <span
                    className="vacuum-map__saved-zone-badge"
                    style={{ transform: `translateX(-50%) rotate(calc(-1 * var(--wall-angle, 0deg))) scale(${controlScale})` }}
                  >
                    {t('vacuum_map.virtual_wall')}
                  </span>
                  <button
                    type="button"
                    className="vacuum-map__saved-zone-delete"
                    style={{ transform: `translate(-50%, -50%) scale(${controlScale})` }}
                    disabled={deletingIndex === index}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => handleDeleteZone(zone, index, e)}
                    title={t('vacuum_map.delete_zone')}
                    aria-label={t('vacuum_map.delete_zone')}
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>
          );
        }

        const leftPx = Math.min(p1.x, p2.x);
        const rightPx = Math.max(p1.x, p2.x);
        const topPx = Math.min(p1.y, p2.y);
        const bottomPx = Math.max(p1.y, p2.y);

        const leftPct = (leftPx / imageWidth) * 100;
        const topPct = (topPx / imageHeight) * 100;
        const widthPct = ((rightPx - leftPx) / imageWidth) * 100;
        const heightPct = ((bottomPx - topPx) / imageHeight) * 100;

        const isMop = kind === 'nomop';
        const label = isMop ? t('vacuum_map.no_mop') : t('vacuum_map.no_go');

        return (
          <div
            key={`saved-nogo-${index}-${leftPct}-${topPct}`}
            className={`vacuum-map__saved-zone ${isMop ? 'vacuum-map__saved-zone--nomop' : 'vacuum-map__saved-zone--nogo'}`}
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              width: `${Math.max(widthPct, 2)}%`,
              height: `${Math.max(heightPct, 2)}%`,
            }}
          >
            {editable && (
              <>
                <span
                  className="vacuum-map__saved-zone-badge"
                  style={{ transform: `scale(${controlScale})`, transformOrigin: 'top left' }}
                >
                  {label}
                </span>
                <button
                  type="button"
                  className="vacuum-map__saved-zone-delete"
                  style={{ transform: `scale(${controlScale})`, transformOrigin: 'top right' }}
                  disabled={deletingIndex === index}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => handleDeleteZone(zone, index, e)}
                  title={t('vacuum_map.delete_zone')}
                  aria-label={t('vacuum_map.delete_zone')}
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
