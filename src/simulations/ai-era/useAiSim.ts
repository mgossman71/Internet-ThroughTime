/**
 * useAiSim — the exhibit-11 hook.
 *
 * Owns state + audio (sound.uiTick / relayClick / keyClick). The engine
 * is a pure function (aiEngine.ts), so this hook is the only place side
 * effects (sound) touch state transitions.
 */

import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { BranchId, ChapterId } from "./aiData";
import { aiEngine, createAiState, type AiState } from "./aiEngine";

export interface AiSim {
  state: AiState;
  setChapter: (chapter: ChapterId) => void;
  ask: () => void;
  loadModel: () => void;
  chooseBranch: (branch: BranchId) => void;
  reconsider: () => void;
  openFrontier: () => void;
  reset: () => void;
}

export function useAiSim(): AiSim {
  const [state, dispatch] = useReducer(
    aiEngine,
    undefined,
    createAiState,
  );

  const setChapter = useCallback((chapter: ChapterId) => {
    dispatch({ type: "SET_CHAPTER", chapter });
    sound.uiTick();
  }, []);

  const ask = useCallback(() => {
    dispatch({ type: "ASK" });
    sound.keyClick();
  }, []);

  const loadModel = useCallback(() => {
    dispatch({ type: "LOAD_MODEL" });
    sound.relayClick();
  }, []);

  const chooseBranch = useCallback((branch: BranchId) => {
    dispatch({ type: "CHOOSE_BRANCH", branch });
    sound.relayClick();
  }, []);

  const reconsider = useCallback(() => {
    dispatch({ type: "RECONSIDER" });
    sound.uiTick();
  }, []);

  const openFrontier = useCallback(() => {
    dispatch({ type: "OPEN_FRONTIER" });
    sound.relayClick();
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    sound.uiTick();
  }, []);

  return {
    state,
    setChapter,
    ask,
    loadModel,
    chooseBranch,
    reconsider,
    openFrontier,
    reset,
  };
}