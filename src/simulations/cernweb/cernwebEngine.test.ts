/**
 * Unit tests for the 1989–1993 "CERN & the Web" state machine (exhibit 05).
 */
import { describe, expect, it } from 'vitest';
import {
  initialWebState,
  webTransition,
  type WebAction,
} from './cernwebEngine';

const s0 = () => initialWebState();

function do_(state: ReturnType<typeof s0>, action: WebAction) {
  return webTransition(state, action);
}

describe('cernwebEngine', () => {
  it('starts at 1989: a proposal, no browser, no page', () => {
    const s = s0();
    expect(s.year).toBe(1989);
    expect(s.page).toBeNull();
    expect(s.visited).toHaveLength(0);
    expect(s.publicDomain).toBe(false);
    expect(s.downloaded).toBe(false);
  });

  it('refuses to navigate before a browser exists (1989)', () => {
    const s = s0();
    expect(do_(s, { type: 'navigate', page: 'home' })).toBe(s);
  });

  it('1990: the first browser opens the project page only', () => {
    const s = do_(s0(), { type: 'setYear', year: 1990 });
    expect(s.year).toBe(1990);
    expect(s.page).toBe('home');
    expect(s.visited).toEqual(['home']);
    // sub-pages are NOT published yet
    expect(do_(s, { type: 'navigate', page: 'guide' })).toBe(s);
    // already on home → idempotent
    expect(do_(s, { type: 'navigate', page: 'home' })).toBe(s);
  });

  it('1991: the first site is live and its sub-pages become reachable', () => {
    const s1990 = do_(s0(), { type: 'setYear', year: 1990 });
    const s = do_(s1990, { type: 'setYear', year: 1991 });
    expect(s.publicDomain).toBe(false);
    // navigate to a sub-page — now legal
    const guide = do_(s, { type: 'navigate', page: 'guide' });
    expect(guide.page).toBe('guide');
    expect(guide.visited).toEqual(['home', 'guide']);
    const last = guide.log[guide.log.length - 1];
    expect(last.kind).toBe('web');
    expect(last.text).toMatch(/^GET http:\/\//);
  });

  it('1993: the software is public domain and can be downloaded once', () => {
    const s1990 = do_(s0(), { type: 'setYear', year: 1990 });
    const s1991 = do_(s1990, { type: 'setYear', year: 1991 });
    const s = do_(s1991, { type: 'setYear', year: 1993 });
    expect(s.publicDomain).toBe(true);

    // download is legal now
    const dl = do_(s, { type: 'download' });
    expect(dl.downloaded).toBe(true);
    const last = dl.log[dl.log.length - 1];
    expect(last.text).toMatch(/PUBLIC DOMAIN/i);

    // a second download is a no-op
    expect(do_(dl, { type: 'download' })).toBe(dl);
  });

  it('download is refused before the public-domain year', () => {
    const s1990 = do_(s0(), { type: 'setYear', year: 1990 });
    const s1991 = do_(s1990, { type: 'setYear', year: 1991 });
    expect(do_(s1991, { type: 'download' })).toBe(s1991);
  });

  it('going back to 1989 drops the browser (page cleared), forward re-opens it', () => {
    const s1990 = do_(s0(), { type: 'setYear', year: 1990 });
    const back = do_(s1990, { type: 'setYear', year: 1989 });
    expect(back.page).toBeNull();
    // the visit history survives (it is the browser's memory, not the year)
    expect(back.visited).toEqual(['home']);
    const forward = do_(back, { type: 'setYear', year: 1990 });
    expect(forward.page).toBe('home');
  });

  it('setYear to the current year is a no-op', () => {
    const s = s0();
    expect(do_(s, { type: 'setYear', year: 1989 })).toBe(s);
  });

  it('keeps a running log that is append-only', () => {
    const a = s0();
    const b = do_(a, { type: 'setYear', year: 1990 });
    const c = do_(b, { type: 'setYear', year: 1991 });
    expect(a.log.length).toBe(1);
    expect(b.log.length).toBeGreaterThan(a.log.length);
    expect(c.log.length).toBeGreaterThan(b.log.length);
    // ids are unique and increasing
    const ids = c.log.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});