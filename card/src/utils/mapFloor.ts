export interface LiveMapFloor {
  /** Vacuum `selected_map_id` (numeric when finite, or raw string ID for non-numeric CleanIDs). */
  floorId: string | number | null;
  /**
   * Camera attributes describe the selected floor. A missing selection is a single-floor device.
   * The live map carries its own `map_id` and points at the saved map it was built from through
   * `saved_map_id`; the vacuum's `selected_map_id` is that saved map id, so either may match.
   */
  floorReady: boolean;
  /** Camera `entity_picture`, including its access token and cache-busting query. */
  imageToken: string | null;
  /**
   * The camera map the picture shows. Token rotation and refreshes of the same map change `imageToken`
   * but not this key, so overlays stay up while the next picture of that map loads.
   */
  imageKey: string | null;
  /** A picture of the camera's current map has loaded. */
  imageReady: boolean;
}

function normalizeMapId(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const str = String(value).trim();
  return str.length > 0 && str !== '0' && str !== 'null' && str !== 'undefined' ? str : null;
}

export function readLiveMapFloor(
  selectedMapId: unknown,
  cameraAttributes: { map_id?: unknown; saved_map_id?: unknown; entity_picture?: unknown } | undefined,
  loadedImageKey: string | null = null
): LiveMapFloor {
  const selected = normalizeMapId(selectedMapId);
  const cameraMapId = normalizeMapId(cameraAttributes?.map_id);
  const cameraSavedMapId = normalizeMapId(cameraAttributes?.saved_map_id);
  const picture = cameraAttributes?.entity_picture;
  const imageToken = typeof picture === 'string' && picture.length > 0 ? picture : null;
  const imageKey = imageToken === null ? null : `${cameraMapId || 'live'}:${cameraSavedMapId || 'live'}`;

  // If no floor IDs are specified on either side, it is single floor or ready.
  // Otherwise, match against current or saved map ID.
  const floorMatches: boolean = Boolean(
    selected === null ||
      cameraMapId === null ||
      cameraSavedMapId === selected ||
      cameraMapId === selected ||
      (cameraMapId && selected && String(cameraMapId) === String(selected))
  );

  const floorId: string | number | null =
    selected === null ? null : Number.isFinite(Number(selected)) ? Number(selected) : selected;

  return {
    floorId,
    floorReady: floorMatches,
    imageToken,
    imageKey,
    // A picture only counts as ready when it was loaded for this exact map key.
    // Comparing the cache-busting token instead would mark a previous floor's picture
    // as ready; comparing the key keeps same-map token refreshes ready.
    imageReady: imageKey !== null && imageKey === loadedImageKey,
  };
}

export interface CleaningSelectionUpdate {
  /** Replacement selection. Null leaves the current selection in place. */
  rooms: Map<number, string> | null;
  clearZone: boolean;
  selectRoomMode: boolean;
}

function sameRoomIds(left: Map<number, string>, right: Map<number, string>): boolean {
  if (left.size !== right.size) return false;
  const leftIds = [...left.keys()].sort();
  const rightIds = [...right.keys()].sort();
  return leftIds.every((id, index) => id === rightIds[index]);
}

/**
 * Floor changes clear the selection immediately. Active segments may refill it only after the
 * live camera and its image match that floor, so a stale camera cannot restore the previous rooms.
 */
export function resolveCleaningSelection({
  floorChanged,
  mapReady,
  isSegmentCleaning,
  selectedRooms,
  activeSegments,
}: {
  floorChanged: boolean;
  mapReady: boolean;
  isSegmentCleaning: boolean;
  selectedRooms: Map<number, string>;
  activeSegments: Map<number, string>;
}): CleaningSelectionUpdate {
  if (!mapReady || !isSegmentCleaning || activeSegments.size === 0) {
    return { rooms: floorChanged ? new Map() : null, clearZone: floorChanged, selectRoomMode: false };
  }

  const replace = floorChanged || !sameRoomIds(selectedRooms, activeSegments);
  return {
    rooms: replace ? activeSegments : null,
    clearZone: floorChanged,
    selectRoomMode: replace,
  };
}
