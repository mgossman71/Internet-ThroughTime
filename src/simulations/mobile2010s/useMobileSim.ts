/**
 * useMobileSim — the exhibit-09 hook.
 *
 * Owns state + audio (sound.uiTick / relayClick / keyClick). The engine
 * is a pure function (mobileEngine.ts), so this hook is the only place
 * side effects (sound) touch state transitions.
 */

import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { BranchId, ChapterId } from "./mobileData";
import {
  createMobileState,
  mobileEngine,
  type MobileState,
} from "./mobileEngine";

export interface MobileSim {
  state: MobileState;
  setChapter: (chapter: ChapterId) => void;
  checkPhone: () => void;
  chooseBranch: (branch: BranchId) => void;
  syncFiles: () => void;
  installApp: () => void;
  reconsider: () => void;
  reset: () => void;
}

export function useMobileSim(): MobileSim {
  const [state, dispatch] = useReducer(
    mobileEngine,
    undefined,
    createMobileState,
  );

  const setChapter = useCallback((chapter: ChapterId) => {
    dispatch({ type: "SET_CHAPTER", chapter });
    sound.uiTick();
  }, []);

  const checkPhone = useCallback(() => {
    dispatch({ type: "CHECK_PHONE" });
    sound.relayClick();
  }, []);

  const chooseBranch = useCallback((branch: BranchId) => {
    dispatch({ type: "CHOOSE_BRANCH", branch });
    sound.relayClick();
  }, []);

  const syncFiles = useCallback(() => {
    dispatch({ type: "SYNC_FILES" });
    sound.uiTick();
  }, []);

  const installApp = useCallback(() => {
    dispatch({ type: "INSTALL_APP" });
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
    checkPhone,
    chooseBranch,
    syncFiles,
    installApp,
    reconsider,
    reset,
  };
}