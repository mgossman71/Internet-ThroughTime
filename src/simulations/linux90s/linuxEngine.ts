/**
 * Pure state machine for the 1991–1996 "Linux" era (exhibit 06).
 *
 * No React, no DOM, no timers, no Math.random: the hook (useLinuxSim)
 * owns audio, while ALL exhibit logic — which chapters are open, when the
 * fork may be decided, and which patches/releases are legal — lives here
 * and is unit-tested.
 *
 * The "sim": a three-chapter story around one fork.
 *   CH 1 (1991) — the announcement is on screen (zero clicks)
 *   CH 2 (1992) — the fork: RELEASE UNDER THE GNU GPL (history, L2) or
 *                 KEEP IT CLOSED (labeled hypothetical)
 *   CH 3 (1996) — OPEN branch: receive patches → 0.12 → 1.0 → 2.0 → it
 *                 runs the Web; CLOSED branch: the story ends at 0.12.
 *
 * Illegal actions are no-ops that return the same state object (same
 * convention as dialupEngine).
 */

import {
  BRANCH_BY_ID,
  CHAPTERS,
  MAX_PATCHES,
  PATCH_POOL,
  VERSIONS,
  type Branch,
  type EraYear,
} from './linuxData';

export type LineKind = 'sys' | 'post' | 'cmd' | 'out' | 'ok' | 'warn' | 'banner';

export interface TermLine {
  id: number;
  kind: LineKind;
  text: string;
}

export interface LinuxState {
  chapter: EraYear;
  branch: Branch | null; // locked once chosen (REVISE unlocks it)
  contributors: number; // patches received (open branch only)
  versionIdx: number; // index into VERSIONS reached so far
  lines: TermLine[]; // append-only terminal transcript
  seq: number; // id counter for lines
}

export type LinuxAction =
  | { type: 'setChapter'; year: EraYear }
  | { type: 'chooseBranch'; branch: Branch }
  | { type: 'receivePatch' }
  | { type: 'reconsider' }
  | { type: 'reset' };

export function initialLinuxState(): LinuxState {
  return {
    chapter: 1991,
    branch: null,
    contributors: 0,
    versionIdx: 0,
    lines: [
      { id: 1, kind: 'sys', text: '1991 — HELLO WORLD — newsgroup: comp.os.minix (L1)' },
      { id: 2, kind: 'post', text: 'From: L. Torvalds (linus@kruuna.helsinki.fi)' },
      { id: 3, kind: 'post', text: 'Subject: What can you do with a minix kernel?' },
      {
        id: 4,
        kind: 'post',
        text:
          '> Hi everybody. I am doing a hobby operating system... it will be portable... ' +
          'and it is free of all commercial interest. (L1)',
      },
      { id: 5, kind: 'sys', text: '(illustrative recreation of the 1991 announcement — L1)' },
      { id: 6, kind: 'cmd', text: '$ ls' },
      { id: 7, kind: 'out', text: 'Makefile  README  init.c  main.c  tty.c  mm.c  signal.c' },
    ],
    seq: 8,
  };
}

/** Which release the open branch has reached after N received patches. */
export function versionFor(contributors: number): number {
  let idx = 0;
  VERSIONS.forEach((v, i) => {
    if (contributors >= v.threshold) idx = i;
  });
  return idx;
}

function pushLine(state: LinuxState, kind: LineKind, text: string): LinuxState {
  const id = state.seq;
  return {
    ...state,
    lines: [...state.lines, { id, kind, text }],
    seq: id + 1,
  };
}

/** Legal transition table, evaluated before any side effect. */
function allows(state: LinuxState, action: LinuxAction): boolean {
  switch (action.type) {
    case 'setChapter':
      return CHAPTERS.some((c) => c.year === action.year);
    case 'chooseBranch':
      // The fork is chapter 2's — but a visitor who skips to 1996 can still
      // decide there (the recovery path).
      return state.branch === null && (state.chapter === 1992 || state.chapter === 1996);
    case 'receivePatch':
      return state.branch === 'open' && state.contributors < MAX_PATCHES;
    case 'reconsider':
      return state.branch !== null;
    case 'reset':
      return true;
    default:
      return false;
  }
}

export function linuxTransition(state: LinuxState, action: LinuxAction): LinuxState {
  if (!allows(state, action)) return state;

  switch (action.type) {
    case 'setChapter': {
      if (action.year === state.chapter) return state;
      let next: LinuxState = { ...state, chapter: action.year };
      if (action.year === 1991) {
        next = pushLine(
          next,
          'banner',
          '1991 — the announcement is still up. It is a hobby, and it is free (L1).',
        );
      } else if (action.year === 1992) {
        if (state.branch === null) {
          next = pushLine(
            next,
            'warn',
            '1992 — DECISION TIME: keep it closed, or release under the GNU GPL? (L2)',
          );
        } else {
          const d = BRANCH_BY_ID[state.branch];
          next = pushLine(
            next,
            d.hypothetical ? 'warn' : 'ok',
            `1992 — your decision stands: ${d.name} (L2).`,
          );
        }
      } else {
        // 1996
        if (state.branch === null) {
          next = pushLine(
            next,
            'warn',
            '1996 — THE FORK IS UNDECIDED. A license decides what this becomes → Chapter 2 (L2).',
          );
        } else if (state.branch === 'open') {
          const v = VERSIONS[state.versionIdx];
          next = pushLine(
            next,
            'banner',
            `1996 — Linux ${v.ver} (${v.when}) — ${v.note}. It is running the Web (L5).`,
          );
        } else {
          next = pushLine(
            next,
            'warn',
            '1996 (hypothetical) — no license, no tree: the story stops at 0.12. ' +
              'This is the "what if" — real Linux went GPL (L2).',
          );
        }
      }
      return next;
    }

    case 'chooseBranch': {
      const d = BRANCH_BY_ID[action.branch];
      let next: LinuxState = { ...state, branch: action.branch, versionIdx: 0 };
      next = pushLine(next, 'banner', `DECISION — ${d.name}`);
      next = pushLine(next, 'ok', d.echo);
      if (action.branch === 'open') {
        next = pushLine(
          next,
          'sys',
          '0.12 (Sept 1992) ships under the GPL. Patches are welcome → Chapter 3 (L2).',
        );
      } else {
        next = pushLine(
          next,
          'warn',
          'hypothetical branch: outside the source ends here. (real Linux went GPL — L2)',
        );
      }
      return next;
    }

    case 'receivePatch': {
      const contributors = state.contributors + 1;
      const from = state.versionIdx;
      const to = versionFor(contributors);
      const patchLine = PATCH_POOL[(contributors - 1) % PATCH_POOL.length];
      let next: LinuxState = { ...state, contributors, versionIdx: to };
      next = pushLine(next, 'out', `patch #${contributors} — ${patchLine} (illustrative)`);
      if (to > from) {
        const v = VERSIONS[to];
        next = pushLine(next, 'banner', `RELEASE — Linux ${v.ver} (${v.when}) — ${v.note}`);
      }
      if (contributors === MAX_PATCHES) {
        next = pushLine(
          next,
          'sys',
          'the community has outgrown this inbox (L5) — the hobby is now a platform.',
        );
      }
      return next;
    }

    case 'reconsider': {
      let next: LinuxState = { ...state, branch: null, contributors: 0, versionIdx: 0 };
      next = pushLine(next, 'warn', 'decision rescinded — the fork is undecided again (L2).');
      return next;
    }

    case 'reset':
      return initialLinuxState();

    default:
      return state;
  }
}