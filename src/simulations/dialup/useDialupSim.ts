/**
 * React binding for the BBS/dial-up state machine (exhibit 04).
 *
 * Owns: state, dial-sequence timing (dial → carrier → login), and audio
 * (sound.modemDial / modemHandshake). The engine (dialupEngine.ts) owns
 * the actual session logic and which transitions are legal — see its unit
 * tests. Timers are tracked and cleaned up on unmount.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { sound } from '../../audio/SoundManager';
import {
  dialupTransition,
  initialDialupState,
  modemById,
  type DialupAction,
  type DialupState,
} from './dialupEngine';

const RING_MS = 1600; // staged for clarity (see scene footnote)
const LOGIN_MS = 2500;

export interface DialupSim {
  state: DialupState;
  select: (modemId: string) => void;
  dial: (modemId?: string) => void;
  toMenu: (menu: 'main' | 'msgs' | 'post') => void;
  viewMessage: (id: string) => void;
  post: (text: string) => void;
  hangup: () => void;
}

export function useDialupSim(): DialupSim {
  const [state, setState] = useState<DialupState>(initialDialupState);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const act = useCallback((a: DialupAction) => {
    setState((s) => dialupTransition(s, a));
  }, []);

  const select = useCallback(
    (modemId: string) => {
      sound.uiTick();
      act({ type: 'select', modem: modemId });
    },
    [act],
  );

  const dial = useCallback(
    (modemId?: string) => {
      if (modemId) act({ type: 'select', modem: modemId });
      sound.modemDial();
      act({ type: 'dial', modem: modemId ?? 'v22bis' });
      timers.current.push(
        window.setTimeout(() => {
          sound.modemHandshake();
          act({ type: 'carrier' });
        }, RING_MS),
      );
      timers.current.push(
        window.setTimeout(() => {
          sound.uiTick();
          act({ type: 'login' });
        }, LOGIN_MS),
      );
    },
    [act],
  );

  const toMenu = useCallback(
    (menu: 'main' | 'msgs' | 'post') => {
      sound.uiTick();
      act({ type: 'menu', menu });
    },
    [act],
  );

  const viewMessage = useCallback(
    (id: string) => {
      sound.keyClick();
      act({ type: 'view', id });
    },
    [act],
  );

  const post = useCallback(
    (text: string) => {
      act({ type: 'post', text });
      sound.successChime();
    },
    [act],
  );

  const hangup = useCallback(() => {
    sound.relayClick();
    act({ type: 'hangup' });
  }, [act]);

  return { state, select, dial, toMenu, viewMessage, post, hangup };
}

export { modemById };
