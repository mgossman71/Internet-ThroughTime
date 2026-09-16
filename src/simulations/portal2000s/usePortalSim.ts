/**
 * usePortalSim — the exhibit-07 hook.
 *
 * Owns state + audio (sound.uiTick / relayClick / keyClick). The engine
 * is a pure function (portalEngine.ts), so this hook is the only place
 * side effects (sound) touch state transitions.
 */

import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { BranchId, ChapterId } from "./portalData";
import { createPortalState, portalEngine, type PortalState } from "./portalEngine";

export interface PortalSim {
  state: PortalState;
  setChapter: (chapter: ChapterId) => void;
  chooseBranch: (branch: BranchId) => void;
  queueFile: () => void;
  runSearch: () => void;
  readMail: () => void;
  reconsider: () => void;
  reset: () => void;
}

export function usePortalSim(): PortalSim {
  const [state, dispatch] = useReducer(portalEngine, undefined, createPortalState);

  const setChapter = useCallback((chapter: ChapterId) => {
    dispatch({ type: "SET_CHAPTER", chapter });
    sound.uiTick();
  }, []);

  const chooseBranch = useCallback((branch: BranchId) => {
    dispatch({ type: "CHOOSE_BRANCH", branch });
    sound.relayClick();
  }, []);

  const queueFile = useCallback(() => {
    dispatch({ type: "QUEUE_FILE" });
    sound.uiTick();
  }, []);

  const runSearch = useCallback(() => {
    dispatch({ type: "RUN_SEARCH" });
    sound.uiTick();
  }, []);

  const readMail = useCallback(() => {
    dispatch({ type: "READ_MAIL" });
    sound.keyClick();
  }, []);

  const reconsider = useCallback(() => {
    dispatch({ type: "RECONSIDER" });
    sound.uiTick();
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    sound.uiTick();
  }, []);

  return {
    state,
    setChapter,
    chooseBranch,
    queueFile,
    runSearch,
    readMail,
    reconsider,
    reset,
  };
}