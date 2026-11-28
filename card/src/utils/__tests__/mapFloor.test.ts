import { describe, expect, it } from 'vitest';
import { readLiveMapFloor, resolveCleaningSelection } from '../mapFloor';

type CameraAttributes = { map_id?: number; saved_map_id?: number; entity_picture?: string };

function loadedKey(camera: CameraAttributes): string | null {
  return readLiveMapFloor(undefined, camera).imageKey;
}

describe('readLiveMapFloor', () => {
  it('treats a missing selected map as a ready single floor', () => {
    const camera = { map_id: 1, entity_picture: '/map?v=1' };

    expect(readLiveMapFloor(undefined, camera, loadedKey(camera))).toMatchObject({
      floorId: null,
      floorReady: true,
      imageReady: true,
    });
  });

  it('waits while the live camera still shows another floor', () => {
    const camera = { map_id: 1, entity_picture: '/map?v=1' };

    expect(readLiveMapFloor(2, camera, loadedKey(camera)).floorReady).toBe(false);
  });

  it('accepts the live camera once its map id matches the selection', () => {
    const camera = { map_id: 2, entity_picture: '/map?v=2' };

    expect(readLiveMapFloor(2, camera, loadedKey(camera))).toMatchObject({
      floorId: 2,
      floorReady: true,
      imageReady: true,
    });
  });

  it('accepts a live map whose saved_map_id matches the selection even when map_id differs', () => {
    const camera = { map_id: 1, saved_map_id: 19, entity_picture: '/map?v=1' };

    expect(readLiveMapFloor(19, camera, loadedKey(camera))).toMatchObject({
      floorId: 19,
      floorReady: true,
      imageReady: true,
    });
  });

  it('still waits when neither the live nor the saved map id matches the selection', () => {
    const camera = { map_id: 1, saved_map_id: 20, entity_picture: '/map?v=1' };

    expect(readLiveMapFloor(19, camera, loadedKey(camera)).floorReady).toBe(false);
  });

  it('is not ready before any picture has loaded', () => {
    expect(readLiveMapFloor(1, { map_id: 1, entity_picture: '/map?v=1' }).imageReady).toBe(false);
  });

  it('is not ready without a camera picture', () => {
    const current = readLiveMapFloor(1, { map_id: 1 }, loadedKey({ map_id: 1, entity_picture: '/map?v=1' }));

    expect(current.imageKey).toBeNull();
    expect(current.imageReady).toBe(false);
  });

  it('stays ready when only the picture token changes for the same map', () => {
    const current = readLiveMapFloor(
      1,
      { map_id: 1, entity_picture: '/map?token=b' },
      loadedKey({ map_id: 1, entity_picture: '/map?token=a' })
    );

    expect(current.imageToken).toBe('/map?token=b');
    expect(current.imageReady).toBe(true);
  });

  it('marks the picture stale when the camera switches to another map', () => {
    const current = readLiveMapFloor(
      2,
      { map_id: 2, saved_map_id: 2, entity_picture: '/map?v=2' },
      loadedKey({ map_id: 1, saved_map_id: 1, entity_picture: '/map?v=1' })
    );

    expect(current.floorReady).toBe(true);
    expect(current.imageReady).toBe(false);
  });

  it('supports non-numeric string floor IDs for modern CleanID maps', () => {
    const camera = { map_id: 'floor_upstairs_a', saved_map_id: 'floor_upstairs_a', entity_picture: '/map?v=u' };
    const loaded = readLiveMapFloor(undefined, camera).imageKey;

    expect(readLiveMapFloor('floor_upstairs_a', camera, loaded)).toMatchObject({
      floorId: 'floor_upstairs_a',
      floorReady: true,
      imageReady: true,
    });

    expect(readLiveMapFloor('floor_ground_b', camera, loaded)).toMatchObject({
      floorId: 'floor_ground_b',
      floorReady: false,
    });
  });
});

describe('resolveCleaningSelection', () => {
  const floorOne = new Map([[1, 'Bathroom']]);
  const floorTwo = new Map([[9, 'Kitchen']]);

  it('drops the previous rooms while the next floor image is still loading', () => {
    const update = resolveCleaningSelection({
      floorChanged: true,
      mapReady: false,
      isSegmentCleaning: true,
      selectedRooms: floorOne,
      activeSegments: floorOne,
    });

    expect(update.clearZone).toBe(true);
    expect(update.selectRoomMode).toBe(false);
    expect([...(update.rooms?.keys() ?? [])]).toEqual([]);
  });

  it('refills from active segments only after the selected floor is ready', () => {
    const update = resolveCleaningSelection({
      floorChanged: false,
      mapReady: true,
      isSegmentCleaning: true,
      selectedRooms: new Map(),
      activeSegments: floorTwo,
    });

    expect(update.rooms).toBe(floorTwo);
    expect(update.selectRoomMode).toBe(true);
  });

  it('keeps the current selection when the same floor image reloads', () => {
    const update = resolveCleaningSelection({
      floorChanged: false,
      mapReady: false,
      isSegmentCleaning: true,
      selectedRooms: floorOne,
      activeSegments: floorOne,
    });

    expect(update.rooms).toBeNull();
    expect(update.clearZone).toBe(false);
  });
});
