/**
 * Portal 2000–2004 exhibit engine (pure state machine).
 *
 * No React, no DOM, no timers, no Math.random. The scene renders this
 * state and dispatches actions; the browser-window chrome (portal page,
 * share queue, mock search results, inbox) is ILLUSTRATIVE and lives
 * in the scene/CSS, not here. Facts carry P-tags (docs/SOURCES.md).
 *
 * Conventions (same as dialup1990s / linux90s engines):
 * - Illegal or out-of-order actions are no-ops returning the SAME state.
 * - `note` is the last engine message (drives the scene's live region).
 */

import { BRANCHES, TRACK_POOL, type BranchId, type ChapterId } from "./portalData";

export const MAX_QUEUE = 5;
export const MAX_SEARCHES = 4;

export type PortalAction =
  | { type: "SET_CHAPTER"; chapter: ChapterId }
  | { type: "CHOOSE_BRANCH"; branch: BranchId }
  | { type: "QUEUE_FILE" }
  | { type: "RUN_SEARCH" }
  | { type: "READ_MAIL" }
  | { type: "RECONSIDER" }
  | { type: "RESET" };

export interface PortalState {
  chapter: ChapterId;
  branch: BranchId | null;
  /** names of queued tracks (max MAX_QUEUE). */
  queue: string[];
  /** number of searches run in 2004 (max MAX_SEARCHES). */
  searches: number;
  /** inbox opened in 2004. */
  mailRead: boolean;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message for the scene's live region. */
  note: string;
}

export function createPortalState(): PortalState {
  return {
    chapter: "2000",
    branch: null,
    queue: [],
    searches: 0,
    mailRead: false,
    seq: 0,
    note: "Year 2000 — the front door. The portal is where everyone starts (P1).",
  };
}

function yearOf(chapter: ChapterId): string {
  return chapter;
}

export function portalEngine(
  state: PortalState,
  action: PortalAction,
): PortalState {
  switch (action.type) {
    case "SET_CHAPTER": {
      if (action.chapter === state.chapter) return state;
      return {
        ...state,
        chapter: action.chapter,
        seq: state.seq + 1,
        note: `Moved to ${yearOf(action.chapter)}.`,
      };
    }

    case "CHOOSE_BRANCH": {
      // The fork is decided once, and only after 2000 (i.e. at 2001 — or
      // recovered from 2004 if the visitor skipped ahead).
      if (state.chapter === "2000" || state.branch !== null) return state;
      const def = BRANCHES.find((b) => b.id === action.branch);
      if (!def) return state;
      return {
        ...state,
        branch: action.branch,
        seq: state.seq + 1,
        note: def.hypothetical
          ? "WHAT IF branch selected — the queue keeps growing (illustrative, not recorded history)."
          : "History: July 2001 — the record labels win (P3). The network survives anyway (P4).",
      };
    }

    case "QUEUE_FILE": {
      if (state.chapter !== "2001" || state.queue.length >= MAX_QUEUE) {
        return state;
      }
      const track = TRACK_POOL[state.queue.length % TRACK_POOL.length];
      return {
        ...state,
        queue: [...state.queue, track.name],
        seq: state.seq + 1,
        note: `Queued ${track.name} (${track.size}).`,
      };
    }

    case "RUN_SEARCH": {
      if (state.chapter !== "2004" || state.searches >= MAX_SEARCHES) {
        return state;
      }
      return {
        ...state,
        searches: state.searches + 1,
        seq: state.seq + 1,
        note: "Search results in (illustrative) — this is the world search became.",
      };
    }

    case "READ_MAIL": {
      if (state.chapter !== "2004" || state.mailRead) return state;
      return {
        ...state,
        mailRead: true,
        seq: state.seq + 1,
        note: "Inbox opened (illustrative) — mail in the browser, 1996 to 2004 (P8, P7).",
      };
    }

    case "RECONSIDER": {
      if (state.chapter === "2000" || state.branch === null) return state;
      return {
        ...state,
        branch: null,
        seq: state.seq + 1,
        note: "Reconsidered — the 2001 fork is open again.",
      };
    }

    case "RESET":
      return createPortalState();

    default:
      return state;
  }
}