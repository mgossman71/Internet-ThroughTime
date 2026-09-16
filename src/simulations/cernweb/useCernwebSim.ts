/**
 * useCernwebSim — React binding for the 1989–1993 "CERN & the Web" sim.
 *
 * Owns the WebState, routes actions through webTransition, plays era sounds,
 * and exposes stable callbacks. Mirrors useDialupSim / useProtocolSim.
 */
import { useCallback, useReducer } from 'react';
import { sound } from '../../audio/SoundManager';
import {
  initialWebState,
  webTransition,
  type WebState,
} from './cernwebEngine';
import type { EraYear } from './cernwebData';

export interface CernwebSim {
  state: WebState;
  setYear: (year: EraYear) => void;
  navigate: (page: string) => void;
  download: () => void;
}

export function useCernwebSim(): CernwebSim {
  const [state, dispatch] = useReducer(webTransition, undefined, initialWebState);

  const setYear = useCallback((year: EraYear) => {
    sound.uiTick();
    dispatch({ type: 'setYear', year });
  }, []);

  const navigate = useCallback((page: string) => {
    // A little "link click" — the classic first-web sound.
    sound.keyClick();
    dispatch({ type: 'navigate', page });
  }, []);

  const download = useCallback(() => {
    dispatch({ type: 'download' });
    // Only chime if it actually succeeded (we can't know here, so play a soft
    // tick; the engine already rejected no-ops). Keep it gentle.
    sound.uiTick();
  }, []);

  return { state, setYear, navigate, download };
}