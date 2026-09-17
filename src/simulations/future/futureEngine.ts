/**
 * The "Road Ahead" (speculative) exhibit engine — a pure state machine.
 *
 * No React, no DOM, no timers, no Math.random. This era has NO canonical
 * fork: the visitor can lean toward either forecast on each open question
 * and change their mind freely (unlike the historical eras' locked branch).
 * Conventions (same as the other engines): illegal or no-op actions return
 * the SAME state object.
 */

import { QUESTIONS, type QuestionId } from "./futureData";

export type FutureAction =
  | { type: "LEAN"; question: QuestionId; side: string }
  | { type: "RESET" };

export interface FutureState {
  /** the side the visitor is leaning toward per question (null = undecided). */
  lean: Record<QuestionId, string | null>;
  /** monotonic action counter (drives CSS/aria changes). */
  seq: number;
  /** last engine message (drives the scene's live region). */
  note: string;
}

export function createFutureState(): FutureState {
  return {
    lean: { agentic: null, location: null, multimodal: null },
    seq: 0,
    note: "The road ahead is open — lean toward a forecast for each question.",
  };
}

export function futureEngine(
  state: FutureState,
  action: FutureAction,
): FutureState {
  switch (action.type) {
    case "LEAN": {
      const q = QUESTIONS.find((x) => x.id === action.question);
      const side = q?.sides.find((s) => s.id === action.side);
      if (!q || !side) return state; // unknown question or side
      if (state.lean[action.question] === action.side) return state; // idempotent
      return {
        ...state,
        lean: { ...state.lean, [action.question]: action.side },
        seq: state.seq + 1,
        note: `Leaned: ${side.label} — a forecast, not a prediction.`,
      };
    }
    case "RESET":
      return createFutureState();
    default:
      return state;
  }
}

/** How many questions currently have a lean (0..QUESTIONS.length). */
export function leanedCount(state: FutureState): number {
  return QUESTIONS.reduce((n, q) => n + (state.lean[q.id] ? 1 : 0), 0);
}