/**
 * useFutureSim — the "Road Ahead" (speculative) hook.
 * Owns state + audio (sound.uiTick on each lean; sound.successChime when all
 * three questions have a lean). The engine is pure (futureEngine.ts), so this
 * hook is the only place side effects (sound) touch state transitions.
 */

import { useCallback, useEffect, useReducer, useRef } from "react";
import { sound } from "../../audio/SoundManager";
import { QUESTIONS, type QuestionId } from "./futureData";
import {
  createFutureState,
  futureEngine,
  leanedCount,
  type FutureState,
} from "./futureEngine";

export interface FutureSim {
  state: FutureState;
  /** number of questions with a lean (0..3). */
  leaned: number;
  lean: (question: QuestionId, side: string) => void;
  reset: () => void;
}

export function useFutureSim(): FutureSim {
  const [state, dispatch] = useReducer(
    futureEngine,
    undefined,
    createFutureState,
  );
  const leaned = leanedCount(state);

  const lean = useCallback((question: QuestionId, side: string) => {
    dispatch({ type: "LEAN", question, side });
    sound.uiTick();
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    sound.uiTick();
  }, []);

  // One soft chime the moment all three questions have a lean.
  const prev = useRef(leaned);
  useEffect(() => {
    if (leaned === QUESTIONS.length && prev.current < QUESTIONS.length) {
      sound.successChime();
    }
    prev.current = leaned;
  }, [leaned]);

  return { state, leaned, lean, reset };
}