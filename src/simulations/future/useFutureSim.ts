import { useCallback, useReducer } from "react";
import { sound } from "../../audio/SoundManager";
import type { SliceId, ThreadId } from "./futureData";
import {
  createFutureState,
  futureEngine,
  type FutureState,
} from "./futureEngine";

export interface FutureSim {
  state: FutureState;
  revealThread: (thread: ThreadId) => void;
  selectSlice: (slice: SliceId) => void;
  showTrajectory: () => void;
  reflect: (thread: ThreadId) => void;
  reset: () => void;
}

export function useFutureSim(): FutureSim {
  const [state, dispatch] = useReducer(
    futureEngine,
    undefined,
    createFutureState,
  );

  const revealThread = useCallback((thread: ThreadId) => {
    dispatch({ type: "REVEAL_THREAD", thread });
    sound.uiTick();
  }, []);

  const selectSlice = useCallback((slice: SliceId) => {
    dispatch({ type: "SELECT_SLICE", slice });
    sound.keyClick();
  }, []);

  const showTrajectory = useCallback(() => {
    dispatch({ type: "SHOW_TRAJECTORY" });
    sound.relayClick();
  }, []);

  const reflect = useCallback((thread: ThreadId) => {
    dispatch({ type: "REFLECT", thread });
    sound.uiTick();
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    sound.uiTick();
  }, []);

  return {
    state,
    revealThread,
    selectSlice,
    showTrajectory,
    reflect,
    reset,
  };
}