/**
 * React bindings for the central timeline store.
 */
import { useSyncExternalStore } from 'react';
import { timelineStore } from './timelineStore';
import { eraRegistry } from './eraRegistry';
import type { EraDescriptor } from '../types/era';

/** Subscribe to the current era index. Re-renders on every era change. */
export function useTimelineIndex(): number {
  return useSyncExternalStore(timelineStore.subscribe, timelineStore.getEraIndex);
}

/** Subscribe to the active EraDescriptor (data + Scene component). */
export function useActiveEra(): EraDescriptor {
  const index = useTimelineIndex();
  return eraRegistry[index];
}

export function useTimelineActions() {
  return {
    goTo: timelineStore.goTo,
    next: timelineStore.next,
    prev: timelineStore.prev,
    isFirst: timelineStore.isFirst,
    isLast: timelineStore.isLast,
  };
}
