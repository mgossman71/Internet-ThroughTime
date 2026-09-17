/**
 * Mobile & Cloud 2010–2015 exhibit engine (pure state machine).
 *
 * No React, no DOM, no timers, no Math.random. The scene renders this
 * state and dispatches actions; the phone screen (home screen, signal
 * panel, sync queue, app queue) is ILLUSTRATIVE and lives in the
 * scene/CSS, not here. Facts carry M-tags (docs/SOURCES.md).
 *
 * Conventions (same as portal2000s / broadband2000s / linux90s engines):
 * - Illegal or out-of-order actions are no-ops returning the SAME state.
 * - `note` is the last engine message (drives the scene's live region).
 */

import { BRANCHES, type BranchId, type ChapterId } from "./mobileData";

export const MAX_SYNCS = 6;
export const MAX_INSTALLS = 6;

export type MobileAction =
  | { type: "SET_CHAPTER"; chapter: ChapterId }
  | { type: "CHECK_PHONE" }
  | { type: "CHOOSE_BRANCH"; branch: BranchId }
  | { type: "SYNC_FILES" }
  | { type: "INSTALL_APP" }
  | { type: "RECONSIDER" }
  | { type: "RESET" };

export interface MobileState {
  chapter: ChapterId;
  branch: BranchId | null;
  /** signal panel opened in 2010 (one-time). */
  phoneChecked: boolean;
  /** files queued in 2012 (max MAX_SYNCS). */
  syncs: number;
  /** apps installed in 2015 (max MAX_INSTALLS). */
  installs: number;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message for the scene's live region. */
  note: string;
}

export function createMobileState(): MobileState {
  return {
    chapter: "2010",
    branch: null,
    phoneChecked: false,
    syncs: 0,
    installs: 0,
    seq: 0,
    note: "Year 2010 — the phone becomes the computer (M1).",
  };
}

export function mobileEngine(
  state: MobileState,
  action: MobileAction,
): MobileState {
  switch (action.type) {
    case "SET_CHAPTER": {
      if (action.chapter === state.chapter) return state;
      return {
        ...state,
        chapter: action.chapter,
        seq: state.seq + 1,
        note: `Moved to ${action.chapter}.`,
      };
    }

    case "CHECK_PHONE": {
      if (state.chapter !== "2010" || state.phoneChecked) return state;
      return {
        ...state,
        phoneChecked: true,
        seq: state.seq + 1,
        note: "Phone checked (illustrative) — LTE is the 'transitional' 4G step above 3G (M3).",
      };
    }

    case "CHOOSE_BRANCH": {
      // The fork is decided once, and only after 2010 (i.e. at 2012 — or
      // recovered from 2015 if the visitor skipped ahead).
      if (state.chapter === "2010" || state.branch !== null) return state;
      const def = BRANCHES.find((b) => b.id === action.branch);
      if (!def) return state;
      return {
        ...state,
        branch: action.branch,
        seq: state.seq + 1,
        note: def.hypothetical
          ? "WHAT IF branch selected — everything stays on the device (illustrative, not recorded history)."
          : "History: the cloud wins — sync and stream (M9–M13).",
      };
    }

    case "SYNC_FILES": {
      if (state.chapter !== "2012" || state.syncs >= MAX_SYNCS) {
        return state;
      }
      return {
        ...state,
        syncs: state.syncs + 1,
        seq: state.seq + 1,
        note: "Files queued (illustrative) — the cloud stores and syncs your stuff (M10).",
      };
    }

    case "INSTALL_APP": {
      if (state.chapter !== "2015" || state.installs >= MAX_INSTALLS) {
        return state;
      }
      return {
        ...state,
        installs: state.installs + 1,
        seq: state.seq + 1,
        note: "App installed (illustrative) — the store is the marketplace (M14).",
      };
    }

    case "RECONSIDER": {
      if (state.chapter === "2010" || state.branch === null) return state;
      return {
        ...state,
        branch: null,
        seq: state.seq + 1,
        note: "Reconsidered — the 2012 fork is open again.",
      };
    }

    case "RESET":
      return createMobileState();

    default:
      return state;
  }
}