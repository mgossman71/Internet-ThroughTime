/**
 * The AI Era 2022–2026 exhibit engine (pure state machine, in progress).
 *
 * No React, no DOM, no timers, no Math.random. The scene renders this
 * state and dispatches actions; the console (prompt queue, model panel,
 * frontier status) is ILLUSTRATIVE and lives in the scene/CSS, not here.
 * Facts carry AI-tags (docs/SOURCES.md).
 *
 * Conventions (same as mobileEngine / connectedEngine / ...):
 * - Illegal or out-of-order actions are no-ops returning the SAME state.
 * - `note` is the last engine message (drives the scene's live region).
 */

import { BRANCHES, type BranchId, type ChapterId } from "./aiData";

export const MAX_ASKS = 6;

export type AiAction =
  | { type: "SET_CHAPTER"; chapter: ChapterId }
  | { type: "ASK" }
  | { type: "LOAD_MODEL" }
  | { type: "CHOOSE_BRANCH"; branch: BranchId }
  | { type: "RECONSIDER" }
  | { type: "OPEN_FRONTIER" }
  | { type: "RESET" };

export interface AiState {
  chapter: ChapterId;
  branch: BranchId | null;
  /** prompts asked in 2022 (max MAX_ASKS). */
  asks: number;
  /** model loaded in 2023 (one-time). */
  modelLoaded: boolean;
  /** frontier opened in 2025 (one-time). */
  frontierOpen: boolean;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message for the scene's live region. */
  note: string;
}

export function createAiState(): AiState {
  return {
    chapter: "2022",
    branch: null,
    asks: 0,
    modelLoaded: false,
    frontierOpen: false,
    seq: 0,
    note: "Year 2022 — the machine answers (AI1).",
  };
}

export function aiEngine(
  state: AiState,
  action: AiAction,
): AiState {
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

    case "ASK": {
      if (state.chapter !== "2022" || state.asks >= MAX_ASKS) {
        return state;
      }
      return {
        ...state,
        asks: state.asks + 1,
        seq: state.seq + 1,
        note: "Asked (illustrative) — a chatbot based on GPT-3.5 (AI1, AI3).",
      };
    }

    case "LOAD_MODEL": {
      if (state.chapter !== "2023" || state.modelLoaded) {
        return state;
      }
      return {
        ...state,
        modelLoaded: true,
        seq: state.seq + 1,
        note: "Model loaded (illustrative) — GPT-4, March 2023, multimodal (AI2).",
      };
    }

    case "CHOOSE_BRANCH": {
      // The fork is decided once, and only after 2022 (i.e. at 2023 — or
      // recovered from 2025 if the visitor skipped ahead).
      if (state.chapter === "2022" || state.branch !== null) return state;
      const def = BRANCHES.find((b) => b.id === action.branch);
      if (!def) return state;
      return {
        ...state,
        branch: action.branch,
        seq: state.seq + 1,
        note: def.hypothetical
          ? "WHAT IF branch selected — AGI is already here (illustrative, not established fact)."
          : "History (so far): AI is a tool — a very capable assistant (AI1, AI4).",
      };
    }

    case "RECONSIDER": {
      if (state.chapter === "2022" || state.branch === null) return state;
      return {
        ...state,
        branch: null,
        seq: state.seq + 1,
        note: "Reconsidered — the 2023 fork is open again.",
      };
    }

    case "OPEN_FRONTIER": {
      if (state.chapter !== "2025" || state.frontierOpen) {
        return state;
      }
      return {
        ...state,
        frontierOpen: true,
        seq: state.seq + 1,
        note: "Frontier opened (illustrative) — the era is CURRENT, in progress (AI5).",
      };
    }

    case "RESET":
      return createAiState();

    default:
      return state;
  }
}