/**
 * The Connected Decade 2016–2022 exhibit engine (pure state machine).
 *
 * No React, no DOM, no timers, no Math.random. The scene renders this
 * state and dispatches actions; the "wall" (feed, streaming tiles, 5G
 * panel, VR chrome) is ILLUSTRATIVE and lives in the scene/CSS, not here.
 * Facts carry C-tags (docs/SOURCES.md).
 *
 * Conventions (same as mobileEngine / dialupEngine / ...):
 * - Illegal or out-of-order actions are no-ops returning the SAME state.
 * - `note` is the last engine message (drives the scene's live region).
 */

import { BRANCHES, type BranchId, type ChapterId } from "./connectedData";

export const MAX_LIKES = 6;

export type ConnectedAction =
  | { type: "SET_CHAPTER"; chapter: ChapterId }
  | { type: "LIKE_VIDEO" }
  | { type: "ENTER_METAVERSE" }
  | { type: "CHOOSE_BRANCH"; branch: BranchId }
  | { type: "RECONSIDER" }
  | { type: "CONNECT_5G" }
  | { type: "RESET" };

export interface ConnectedState {
  chapter: ChapterId;
  branch: BranchId | null;
  /** videos liked in 2016 (max MAX_LIKES). */
  likes: number;
  /** metaverse entered in 2021 (one-time). */
  metaverseEntered: boolean;
  /** 5G connected in 2022 (one-time). */
  connected5g: boolean;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message for the scene's live region. */
  note: string;
}

export function createConnectedState(): ConnectedState {
  return {
    chapter: "2016",
    branch: null,
    likes: 0,
    metaverseEntered: false,
    connected5g: false,
    seq: 0,
    note: "Year 2016 — the feed never ends (C4).",
  };
}

export function connectedEngine(
  state: ConnectedState,
  action: ConnectedAction,
): ConnectedState {
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

    case "LIKE_VIDEO": {
      if (state.chapter !== "2016" || state.likes >= MAX_LIKES) {
        return state;
      }
      return {
        ...state,
        likes: state.likes + 1,
        seq: state.seq + 1,
        note: "Video liked (illustrative) — attention is the scarce resource (C4).",
      };
    }

    case "ENTER_METAVERSE": {
      if (state.chapter !== "2021" || state.metaverseEntered) {
        return state;
      }
      return {
        ...state,
        metaverseEntered: true,
        seq: state.seq + 1,
        note: "Metaverse entered (illustrative) — the 2021 bet (C5).",
      };
    }

    case "CHOOSE_BRANCH": {
      // The fork is decided once, and only after 2016 (i.e. at 2021 — or
      // recovered from 2022 if the visitor skipped ahead).
      if (state.chapter === "2016" || state.branch !== null) return state;
      const def = BRANCHES.find((b) => b.id === action.branch);
      if (!def) return state;
      return {
        ...state,
        branch: action.branch,
        seq: state.seq + 1,
        note: def.hypothetical
          ? "WHAT IF branch selected — the metaverse becomes the next platform (illustrative, not the path history took)."
          : "History: AI answers you — the metaverse money flows to AI (C7, C8).",
      };
    }

    case "RECONSIDER": {
      if (state.chapter === "2016" || state.branch === null) return state;
      return {
        ...state,
        branch: null,
        seq: state.seq + 1,
        note: "Reconsidered — the 2021 fork is open again.",
      };
    }

    case "CONNECT_5G": {
      if (state.chapter !== "2022" || state.connected5g) {
        return state;
      }
      return {
        ...state,
        connected5g: true,
        seq: state.seq + 1,
        note: "5G connected (illustrative) — the rollout window was 2019–2021 (C2).",
      };
    }

    case "RESET":
      return createConnectedState();

    default:
      return state;
  }
}