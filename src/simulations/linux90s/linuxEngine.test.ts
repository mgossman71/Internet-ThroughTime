/**
 * Unit tests for the 1991–1996 "Linux" state machine (exhibit 06).
 */
import { describe, expect, it } from 'vitest';
import {
  initialLinuxState,
  linuxTransition,
  versionFor,
  type LinuxAction,
} from './linuxEngine';
import { MAX_PATCHES } from './linuxData';

const s0 = () => initialLinuxState();

function do_(state: ReturnType<typeof s0>, action: LinuxAction) {
  return linuxTransition(state, action);
}

const to1992 = () => do_(s0(), { type: 'setChapter', year: 1992 });
const open = () => do_(to1992(), { type: 'chooseBranch', branch: 'open' });
const closed = () => do_(to1992(), { type: 'chooseBranch', branch: 'closed' });

describe('linuxEngine', () => {
  it('starts in 1991 with the announcement transcript, no branch, no patches', () => {
    const s = s0();
    expect(s.chapter).toBe(1991);
    expect(s.branch).toBeNull();
    expect(s.contributors).toBe(0);
    expect(s.versionIdx).toBe(0);
    expect(s.lines.length).toBeGreaterThanOrEqual(7);
    expect(s.lines.some((l) => l.text.includes('hobby operating system'))).toBe(true);
    expect(s.lines.some((l) => l.text.includes('free of all commercial interest'))).toBe(true);
  });

  it('setChapter to the current chapter is a no-op', () => {
    const s = s0();
    expect(do_(s, { type: 'setChapter', year: 1991 })).toBe(s);
  });

  it('allows navigating to 1992 before deciding (branch stays null)', () => {
    const s = to1992();
    expect(s.chapter).toBe(1992);
    expect(s.branch).toBeNull();
  });

  it('refuses the fork in 1991 (the decision is chapter 2\u2019s)', () => {
    const s = s0();
    expect(do_(s, { type: 'chooseBranch', branch: 'open' })).toBe(s);
    expect(do_(s, { type: 'chooseBranch', branch: 'closed' })).toBe(s);
  });

  it('open branch: records the GPL decision and its echo line', () => {
    const s = open();
    expect(s.branch).toBe('open');
    expect(s.lines.some((l) => l.kind === 'banner' && l.text.includes('GNU GPL'))).toBe(true);
    expect(s.lines.some((l) => l.text.includes('GPL v2'))).toBe(true);
  });

  it('closed branch: records the decision as a labeled hypothetical', () => {
    const s = closed();
    expect(s.branch).toBe('closed');
    expect(s.lines.some((l) => l.text.toLowerCase().includes('hypothetical'))).toBe(true);
  });

  it('the branch locks: re-choosing is a no-op (same reference)', () => {
    const s = open();
    expect(do_(s, { type: 'chooseBranch', branch: 'closed' })).toBe(s);
  });

  it('receivePatch is a no-op on the closed branch (no public tree)', () => {
    const s = closed();
    expect(do_(s, { type: 'receivePatch' })).toBe(s);
  });

  it('receivePatch increments the counter and rotates the (illustrative) pool', () => {
    const s = open();
    const a = do_(s, { type: 'receivePatch' });
    const b = do_(a, { type: 'receivePatch' });
    expect(a.contributors).toBe(1);
    expect(b.contributors).toBe(2);
    expect(b.lines.some((l) => l.text.startsWith('patch #2 —'))).toBe(true);
  });

  it('versions progress with patches: 5 → 1.0, 12 → 2.0, each with a RELEASE banner', () => {
    expect(versionFor(0)).toBe(0);
    expect(versionFor(5)).toBe(1);
    expect(versionFor(12)).toBe(2);
    let s = open();
    for (let i = 0; i < 5; i++) s = do_(s, { type: 'receivePatch' });
    expect(s.versionIdx).toBe(1);
    expect(s.lines.some((l) => l.kind === 'banner' && l.text.includes('Linux 1.0'))).toBe(true);
    for (let i = 0; i < 7; i++) s = do_(s, { type: 'receivePatch' });
    expect(s.versionIdx).toBe(2);
    expect(s.lines.some((l) => l.kind === 'banner' && l.text.includes('Linux 2.0'))).toBe(true);
  });

  it('capping: receivePatch is a no-op at MAX_PATCHES', () => {
    let s = open();
    for (let i = 0; i < MAX_PATCHES; i++) s = do_(s, { type: 'receivePatch' });
    expect(s.contributors).toBe(MAX_PATCHES);
    expect(do_(s, { type: 'receivePatch' })).toBe(s);
  });

  it('reconsider rescinds the branch (and clears patches); then re-choosing works', () => {
    let s = open();
    s = do_(s, { type: 'receivePatch' });
    const rescinded = do_(s, { type: 'reconsider' });
    expect(rescinded.branch).toBeNull();
    expect(rescinded.contributors).toBe(0);
    expect(rescinded.lines.some((l) => l.text.includes('rescinded'))).toBe(true);
    // no-op when there is no branch
    expect(do_(rescinded, { type: 'reconsider' })).toBe(rescinded);
    const again = do_(rescinded, { type: 'chooseBranch', branch: 'closed' });
    expect(again.branch).toBe('closed');
  });

  it('1996 with no decision warns and points back to chapter 2', () => {
    const s = do_(s0(), { type: 'setChapter', year: 1996 });
    expect(s.chapter).toBe(1996);
    expect(s.branch).toBeNull();
    expect(s.lines.some((l) => l.kind === 'warn' && l.text.includes('UNDECIDED'))).toBe(true);
    // the recovery path: a 1996 visitor may still decide there
    const decided = do_(s, { type: 'chooseBranch', branch: 'open' });
    expect(decided.branch).toBe('open');
  });

  it('keeps an append-only transcript with unique, increasing ids', () => {
    let a = s0();
    a = do_(a, { type: 'setChapter', year: 1992 });
    const b = a;
    a = do_(a, { type: 'chooseBranch', branch: 'open' });
    a = do_(a, { type: 'receivePatch' });
    expect(a.lines.length).toBeGreaterThan(b.lines.length);
    expect(b.lines.length).toBeGreaterThan(s0().lines.length);
    const ids = a.lines.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});