/**
 * React binding for the 1991–1996 "Linux" state machine (exhibit 06).
 *
 * Owns state + audio (sound.uiTick / keyClick / relayClick). The engine
 * (linuxEngine.ts) owns all fork/release logic and which actions are
 * legal — see its unit tests. No timers: every action is
 * instant/synchronous.
 */

import { useCallback, useState } from 'react';
import { sound } from '../../audio/SoundManager';
import {
  initialLinuxState,
  linuxTransition,
  type LinuxAction,
  type LinuxState,
} from './linuxEngine';
import type { Branch, EraYear } from './linuxData';

export interface LinuxSim {
  state: LinuxState;
  setChapter: (year: EraYear) => void;
  chooseBranch: (branch: Branch) => void;
  receivePatch: () => void;
  reconsider: () => void;
  reset: () => void;
}

export function useLinuxSim(): LinuxSim {
  const [state, setState] = useState<LinuxState>(initialLinuxState);

  const act = useCallback((a: LinuxAction) => {
    setState((s) => linuxTransition(s, a));
  }, []);

  const setChapter = useCallback(
    (year: EraYear) => {
      sound.uiTick();
      act({ type: 'setChapter', year });
    },
    [act],
  );

  const chooseBranch = useCallback(
    (branch: Branch) => {
      sound.relayClick();
      act({ type: 'chooseBranch', branch });
    },
    [act],
  );

  const receivePatch = useCallback(() => {
    sound.keyClick();
    act({ type: 'receivePatch' });
  }, [act]);

  const reconsider = useCallback(() => {
    sound.relayClick();
    act({ type: 'reconsider' });
  }, [act]);

  const reset = useCallback(() => {
    sound.relayClick();
    act({ type: 'reset' });
  }, [act]);

  return { state, setChapter, chooseBranch, receivePatch, reconsider, reset };
}