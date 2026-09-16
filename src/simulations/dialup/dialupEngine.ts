/**
 * Pure state machine for the 1986–1994 BBS/dial-up exhibit (exhibit 04).
 *
 * No React, no DOM, no timers, no Math.random: the React hook
 * (useDialupSim) owns scheduling and audio, while ALL session logic —
 * dial → carrier → login → menu → messages → post → hangup, and which
 * transitions are legal — lives here and is unit-tested.
 *
 * Phases:  idle → dialing → connected → hanged → (dial again)
 * Menus:   main | msgs | post | view
 */

import { BOARD_SEED, MODEMS, type BoardSeed, type ModemSpec } from './dialupData';

export type Phase = 'idle' | 'dialing' | 'connected' | 'hanged';
export type Menu = 'main' | 'msgs' | 'post' | 'view';

export interface TerminalLine {
  id: number;
  kind: 'cmd' | 'sys' | 'bbs' | 'msg';
  text: string;
}

export interface BoardMessage extends BoardSeed {
  seed: boolean;
}

export interface DialupState {
  phase: Phase;
  menu: Menu;
  loggedIn: boolean;
  modem: string; // ModemSpec id
  lines: TerminalLine[];
  board: BoardMessage[];
  viewing: string | null; // message id in 'view' menu
  posted: number;
  seq: number; // terminal line counter
}

export type DialupAction =
  | { type: 'select'; modem: string }
  | { type: 'dial'; modem: string }
  | { type: 'carrier' }
  | { type: 'login' }
  | { type: 'menu'; menu: Menu }
  | { type: 'view'; id: string }
  | { type: 'post'; text: string }
  | { type: 'hangup' };

export function modemById(id: string): ModemSpec {
  return MODEMS.find((m) => m.id === id) ?? MODEMS[1];
}

function line(seq: number, kind: TerminalLine['kind'], text: string): TerminalLine {
  return { id: seq, kind, text };
}

export function initialDialupState(): DialupState {
  return {
    phase: 'idle',
    menu: 'main',
    loggedIn: false,
    modem: 'v22bis',
    lines: [line(1, 'sys', 'BBS TERMINAL READY — pick a modem standard and dial')],
    board: BOARD_SEED.map((m) => ({ ...m, seed: true })),
    viewing: null,
    posted: 0,
    seq: 2,
  };
}

/** Legal transition table, evaluated before any side effect. */
function allows(state: DialupState, action: DialupAction): boolean {
  switch (action.type) {
    case 'select':
      return true;
    case 'dial':
      return state.phase === 'idle' || state.phase === 'hanged';
    case 'carrier':
      return state.phase === 'dialing';
    case 'login':
      return state.phase === 'connected' && !state.loggedIn;
    case 'menu':
      return state.phase === 'connected' && state.loggedIn;
    case 'view':
      return state.phase === 'connected' && state.loggedIn && state.menu === 'msgs';
    case 'post':
      return state.phase === 'connected' && state.loggedIn;
    case 'hangup':
      return state.phase === 'connected';
    default:
      return false;
  }
}

/**
 * Apply one action. Illegal actions are no-ops (return the same state) —
 * the UI also guards, but the engine is the single source of truth.
 */
export function dialupTransition(
  state: DialupState,
  action: DialupAction,
): DialupState {
  if (!allows(state, action)) return state;

  let seq = state.seq;

  switch (action.type) {
    case 'select': {
      if (state.modem === action.modem) return state;
      return { ...state, modem: action.modem };
    }

    case 'dial': {
      const m = modemById(action.modem);
      const fresh = state.phase === 'hanged'; // redial = new session
      const base: DialupState = fresh
        ? {
            ...initialDialupState(),
            modem: m.id,
            seq: state.seq,
            board: state.board,
            posted: state.posted,
          }
        : { ...state, modem: m.id };
      seq = base.seq;
      const lines: TerminalLine[] = [
        line(seq++, 'cmd', 'ATDT 555-0137'),
        line(seq++, 'sys', 'DIAL TONE  (425 / 480 Hz)'),
        line(seq++, 'sys', 'RING 1 ...'),
        line(seq++, 'sys', 'RING 2 ...'),
        line(seq++, 'sys', `HANDSHAKING ON ${m.bits} (${m.name}) ...`),
      ];
      base.lines = [...base.lines, ...lines];
      base.seq = seq;
      base.phase = 'dialing';
      return base;
    }

    case 'carrier': {
      const m = modemById(state.modem);
      seq += 1;
      return {
        ...state,
        phase: 'connected',
        lines: [...state.lines, line(seq - 1, 'sys', `CONNECT ${m.rate}`)],
        seq,
      };
    }

    case 'login': {
      const banner: TerminalLine[] = [
        line(seq++, 'bbs', '** MIDNIGHT EXPRESS BBS **'),
        line(seq++, 'bbs', '2400/1200 baud  -  est. 1987  -  handle: GUEST'),
        line(seq++, 'bbs', '------------------------------------------------'),
        line(seq++, 'bbs', 'MAIN MENU   [M] MESSAGES   [P] POST   [H] HANG UP'),
        line(seq++, 'sys', '— logged in —'),
      ];
      return {
        ...state,
        loggedIn: true,
        menu: 'main',
        viewing: null,
        lines: [...state.lines, ...banner],
        seq,
      };
    }

    case 'menu': {
      if (action.menu === 'view') {
        return { ...state, menu: 'view', viewing: null };
      }
      seq += 1;
      return {
        ...state,
        menu: action.menu,
        viewing: null,
        lines: [...state.lines, line(seq - 1, 'bbs', `MENU: ${action.menu.toUpperCase()}`)],
        seq,
      };
    }

    case 'view': {
      const m = state.board.find((b) => b.id === action.id);
      if (!m) return state;
      const lines: TerminalLine[] = [
        line(seq++, 'msg', `*** [${m.author}]  ${m.subject}`),
        line(seq++, 'msg', m.body),
        line(seq++, 'msg', '*** end of message'),
      ];
      return {
        ...state,
        menu: 'view',
        viewing: m.id,
        lines: [...state.lines, ...lines],
        seq,
      };
    }

    case 'post': {
      const text = action.text.trim();
      if (!text) return state;
      const lines: TerminalLine[] = [
        line(seq++, 'bbs', '*** MESSAGE POSTED TO THE BOARD'),
        line(seq++, 'sys', `+1 message  (board total: ${state.board.length + 1})`),
      ];
      const msg: BoardMessage = {
        id: `u${state.posted + 1}`,
        author: 'YOU',
        subject: 'FROM A VISITOR',
        body: text,
        seed: false,
      };
      return {
        ...state,
        menu: 'main', // back to the main menu after posting
        posted: state.posted + 1,
        board: [...state.board, msg],
        lines: [...state.lines, ...lines],
        seq,
      };
    }

    case 'hangup': {
      const lines: TerminalLine[] = [
        line(seq++, 'cmd', '+++ATH0'),
        line(seq++, 'sys', 'DISCONNECTED — the line is quiet again'),
      ];
      return {
        ...state,
        phase: 'hanged',
        loggedIn: false,
        menu: 'main',
        viewing: null,
        lines: [...state.lines, ...lines],
        seq,
      };
    }

    default:
      return state;
  }
}
