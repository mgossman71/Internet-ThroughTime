/**
 * Pure state machine for the 1989–1993 "CERN & the Web" era (exhibit 05).
 *
 * The "sim" is a browser whose reach grows over the years:
 *   1989 — no browser yet (the proposal)
 *   1990 — first browser + server (WorldWideWeb, NeXT): project page only
 *   1991 — the first website is live; its sub-pages become reachable
 *   1993 — the software is public domain; you can "download" the source
 *
 * All legality lives here. The UI (BrowserWindow) and hook (useCernwebSim)
 * are thin wrappers. Illegal actions are no-ops that return the same state
 * object (same convention as dialupEngine).
 */

import {
  REACHABLE,
  PAGE_BY_ID,
  type EraYear,
} from './cernwebData';

export interface LogLine {
  id: number;
  kind: 'sys' | 'web' | 'ok';
  text: string;
}

export interface WebState {
  year: EraYear;
  page: string | null; // current page id, or null when there's no browser
  visited: string[]; // ordered history of page ids (deduped by order)
  publicDomain: boolean; // true from 1993 onward
  downloaded: boolean; // one-shot: public-domain source grabbed
  log: LogLine[];
  seq: number; // id counter for log lines
}

export type WebAction =
  | { type: 'setYear'; year: EraYear }
  | { type: 'navigate'; page: string }
  | { type: 'download' };

export function initialWebState(): WebState {
  return {
    year: 1989,
    page: null,
    visited: [],
    publicDomain: false,
    downloaded: false,
    log: [
      {
        id: 1,
        kind: 'sys',
        text: 'CERN, 1989 — a proposal is being written. No web yet.',
      },
    ],
    seq: 2,
  };
}

function pushLog(state: WebState, kind: LogLine['kind'], text: string): WebState {
  const id = state.seq;
  return {
    ...state,
    log: [...state.log, { id, kind, text }],
    seq: id + 1,
  };
}

export function webTransition(state: WebState, action: WebAction): WebState {
  switch (action.type) {
    case 'setYear': {
      const year = action.year;
      if (year === state.year) return state;

      let next = { ...state, year, publicDomain: year === 1993 };

      if (year === 1989) {
        next.page = null;
        next = pushLog(next, 'sys', '1989 — the proposal. There is no browser yet.');
      } else if (year === 1990) {
        next.page = 'home';
        next.visited = ['home'];
        next = pushLog(
          next,
          'web',
          '1990 — first browser + server (WorldWideWeb, NeXT). Opening the project page.',
        );
      } else if (year === 1991) {
        next.page = 'home';
        if (!next.visited.includes('home')) next.visited = [...next.visited, 'home'];
        next = pushLog(
          next,
          'ok',
          '1991 — the first website is live at info.cern.ch (6 Aug). Links now work.',
        );
      } else {
        // 1993
        next.page = next.page ?? 'home';
        if (!next.visited.includes(next.page))
          next.visited = [...next.visited, next.page];
        next = pushLog(
          next,
          'ok',
          '1993 — the source is PUBLIC DOMAIN (30 April). No licence, no royalties.',
        );
      }
      return next;
    }

    case 'navigate': {
      // You can only browse once a browser exists (1990+).
      if (state.year < 1990) return state;
      const reachable = REACHABLE[state.year];
      const target = action.page;
      if (!reachable.includes(target)) return state; // not published this year
      if (target === state.page) return state; // already here (idempotent)

      let next: WebState = {
        ...state,
        page: target,
        visited: state.visited.includes(target)
          ? state.visited
          : [...state.visited, target],
      };
      const url = PAGE_BY_ID[target]?.url ?? target;
      next = pushLog(next, 'web', `GET ${url}`);
      return next;
    }

    case 'download': {
      // Only meaningful once the software is public domain (1993), once.
      if (!state.publicDomain || state.downloaded) return state;
      let next = { ...state, downloaded: true };
      next = pushLog(
        next,
        'ok',
        'WorldWideWeb source — saved. PUBLIC DOMAIN, use it freely (W5).',
      );
      return next;
    }

    default:
      return state;
  }
}