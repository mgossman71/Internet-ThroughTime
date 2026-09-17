/**
 * useConnectedSim — the exhibit-10 hook.
 *
 * Owns state + audio (sound.uiTick / relayClick / keyClick). The engine
 * is a pure function (connectedEngine.ts), so this hook is the only place
 * side effects (sound) touch state transitions.
 */

import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { BranchId, ChapterId } from "./connectedData";
import {
  createConnectedState,
  connectedEngine,
  type ConnectedState,
} from "./connectedEngine";

export interface ConnectedSim {
  state: ConnectedState;
  setChapter: (chapter: ChapterId) => void;
  likeVideo: () => void;
  enterMetaverse: () => void;
  chooseBranch: (branch: BranchId) => void;
  reconsider: () => void;
  connect5g: () => void;
  reset: () => void;
}

export function useConnectedSim(): ConnectedSim {
  const [state, dispatch] = useReducer(
    connectedEngine,
    undefined,
    createConnectedState,
  );

  const setChapter = useCallback((chapter: ChapterId) => {
    dispatch({ type: "SET_CHAPTER", chapter });
    sound.uiTick();
  }, []);

  const likeVideo = useCallback(() => {
    dispatch({ type: "LIKE_VIDEO" });
    sound.uiTick();
  }, []);

  const enterMetaverse = useCallback(() => {
    dispatch({ type: "ENTER_METAVERSE" });
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

  const connect5g = useCallback(() => {
    dispatch({ type: "CONNECT_5G" });
    sound.keyClick();
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    sound.uiTick();
  }, []);

  return {
    state,
    setChapter,
    likeVideo,
    enterMetaverse,
    chooseBranch,
    reconsider,
    connect5g,
    reset,
  };
}