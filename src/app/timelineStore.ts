/**
 * Central timeline store — the single source of truth for "which era is active".
 *
 * DECISION (recorded in AI_CHECKPOINT.md):
 * We use ONE central timeline state rather than separate state inside each era.
 * Era components own only their local simulation state.
 *
 * Deliberately framework-agnostic (no React imports) so it can be unit tested
 * and reused in non-React contexts. Consumers use useSyncExternalStore
 * (see src/app/useTimeline.ts).
 */
import { ERA_LIST } from '../data/eraList';

export type TimelineListener = () => void;

const STORAGE_KEY = 'itt.era';

function readStoredIndex(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return 0;
    const idx = Number.parseInt(raw, 10);
    if (Number.isInteger(idx) && idx >= 0 && idx < ERA_LIST.length) return idx;
  } catch {
    /* localStorage unavailable (SSR/tests) — fall through */
  }
  return 0;
}

export interface TimelineStore {
  subscribe: (listener: TimelineListener) => () => void;
  getEraIndex: () => number;
  getEraId: () => string;
  goTo: (eraId: string) => void;
  goToIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  isFirst: () => boolean;
  isLast: () => boolean;
  /** Test helper — reset to the first era. */
  __reset: () => void;
}

function createStore(): TimelineStore {
  let eraIndex = readStoredIndex();
  const listeners = new Set<TimelineListener>();

  const emit = () => {
    for (const listener of listeners) listener();
    try {
      localStorage.setItem(STORAGE_KEY, String(eraIndex));
    } catch {
      /* non-fatal */
    }
  };

  const setIndex = (index: number) => {
    if (index < 0 || index >= ERA_LIST.length) return;
    if (index === eraIndex) return;
    eraIndex = index;
    emit();
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getEraIndex: () => eraIndex,
    getEraId: () => ERA_LIST[eraIndex].id,
    goTo: (eraId) => {
      const idx = ERA_LIST.findIndex((e) => e.id === eraId);
      if (idx !== -1) setIndex(idx);
    },
    goToIndex: (index) => setIndex(index),
    next: () => setIndex(eraIndex + 1),
    prev: () => setIndex(eraIndex - 1),
    isFirst: () => eraIndex === 0,
    isLast: () => eraIndex === ERA_LIST.length - 1,
    __reset: () => {
      eraIndex = 0;
      listeners.clear();
    },
  };
}

export const timelineStore: TimelineStore = createStore();
