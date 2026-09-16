/**
 * Broadband 2005–2009 exhibit engine (pure state machine).
 *
 * No React, no DOM, no timers, no Math.random. The scene renders this
 * state and dispatches actions; the open-web window (wiki pane, upload
 * queue, line-status panel) is ILLUSTRATIVE and lives in the scene/CSS,
 * not here. Facts carry B-tags (docs/SOURCES.md).
 *
 * Conventions (same as portal2000s / dialup1990s / linux90s engines):
 * - Illegal or out-of-order actions are no-ops returning the SAME state.
 * - `note` is the last engine message (drives the scene's live region).
 */

import { BRANCHES, type BranchId, type ChapterId } from "./broadbandData";

export const MAX_EDITS = 6;
export const MAX_UPLOADS = 6;

export type BroadbandAction =
  | { type: "SET_CHAPTER"; chapter: ChapterId }
  | { type: "CHOOSE_BRANCH"; branch: BranchId }
  | { type: "MAKE_EDIT" }
  | { type: "UPLOAD_VIDEO" }
  | { type: "READ_PLAN" }
  | { type: "RECONSIDER" }
  | { type: "RESET" };

export interface BroadbandState {
  chapter: ChapterId;
  branch: BranchId | null;
  /** edit-history entries made in 2005 (max MAX_EDITS). */
  edits: number;
  /** videos queued in 2007 (max MAX_UPLOADS). */
  uploads: number;
  /** FCC plan card read in 2009. */
  planRead: boolean;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message for the scene's live region. */
  note: string;
}

export function createBroadbandState(): BroadbandState {
  return {
    chapter: "2005",
    branch: null,
    edits: 0,
    uploads: 0,
    planRead: false,
    seq: 0,
    note: "Year 2005 — the encyclopedia anyone can edit (B3).",
  };
}

export function broadbandEngine(
  state: BroadbandState,
  action: BroadbandAction,
): BroadbandState {
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

    case "CHOOSE_BRANCH": {
      // The fork is decided once, and only after 2005 (i.e. at 2007 — or
      // recovered from 2009 if the visitor skipped ahead).
      if (state.chapter === "2005" || state.branch !== null) return state;
      const def = BRANCHES.find((b) => b.id === action.branch);
      if (!def) return state;
      return {
        ...state,
        branch: action.branch,
        seq: state.seq + 1,
        note: def.hypothetical
          ? "WHAT IF branch selected — uploads stay licensed-only (illustrative, not recorded history)."
          : "History: anyone can upload — and the takedown notices start arriving (B13).",
      };
    }

    case "MAKE_EDIT": {
      if (state.chapter !== "2005" || state.edits >= MAX_EDITS) {
        return state;
      }
      return {
        ...state,
        edits: state.edits + 1,
        seq: state.seq + 1,
        note: "Edit saved (illustrative) — the whole point is that anyone can edit (B3).",
      };
    }

    case "UPLOAD_VIDEO": {
      if (state.chapter !== "2007" || state.uploads >= MAX_UPLOADS) {
        return state;
      }
      return {
        ...state,
        uploads: state.uploads + 1,
        seq: state.seq + 1,
        note: "Upload queued (illustrative) — the camera is in everyone's pocket (B10).",
      };
    }

    case "READ_PLAN": {
      if (state.chapter !== "2009" || state.planRead) return state;
      return {
        ...state,
        planRead: true,
        seq: state.seq + 1,
        note: "National Broadband Plan, 2010 (B16) — a network for everyone.",
      };
    }

    case "RECONSIDER": {
      if (state.chapter === "2005" || state.branch === null) return state;
      return {
        ...state,
        branch: null,
        seq: state.seq + 1,
        note: "Reconsidered — the 2007 fork is open again.",
      };
    }

    case "RESET":
      return createBroadbandState();

    default:
      return state;
  }
}