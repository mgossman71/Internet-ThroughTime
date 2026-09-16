/**
 * useBroadbandSim — the exhibit-08 hook.
 *
 * Owns state + audio (sound.uiTick / relayClick / keyClick). The engine
 * is a pure function (broadbandEngine.ts), so this hook is the only
 * place side effects (sound) touch state transitions.
 */

import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { BranchId, ChapterId } from "./broadbandData";
import {
  broadbandEngine,
  createBroadbandState,
  type BroadbandState,
} from "./broadbandEngine";

export interface BroadbandSim {
  state: BroadbandState;
  setChapter: (chapter: ChapterId) => void;
  chooseBranch: (branch: BranchId) => void;
  makeEdit: () => void;
  uploadVideo: () => void;
  readPlan: () => void;
  reconsider: () => void;
  reset: () => void;
}

export function useBroadbandSim(): BroadbandSim {
  const [state, dispatch] = useReducer(
    broadbandEngine,
    undefined,
    createBroadbandState,
  );

  const setChapter = useCallback((chapter: ChapterId) => {
    dispatch({ type: "SET_CHAPTER", chapter });
    sound.uiTick();
  }, []);

  const chooseBranch = useCallback((branch: BranchId) => {
    dispatch({ type: "CHOOSE_BRANCH", branch });
    sound.relayClick();
  }, []);

  const makeEdit = useCallback(() => {
    dispatch({ type: "MAKE_EDIT" });
    sound.keyClick();
  }, []);

  const uploadVideo = useCallback(() => {
    dispatch({ type: "UPLOAD_VIDEO" });
    sound.uiTick();
  }, []);

  const readPlan = useCallback(() => {
    dispatch({ type: "READ_PLAN" });
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
    makeEdit,
    uploadVideo,
    readPlan,
    reconsider,
    reset,
  };
}