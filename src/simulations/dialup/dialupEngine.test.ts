/**
 * Unit tests for the dial-up / BBS session state machine (exhibit 04).
 */
import { describe, expect, it } from 'vitest';
import {
  dialupTransition,
  initialDialupState,
  type DialupAction,
} from './dialupEngine';
import { MODEMS } from './dialupData';

const s0 = () => initialDialupState();

function do_(state: ReturnType<typeof s0>, action: DialupAction) {
  return dialupTransition(state, action);
}

describe('dialupEngine', () => {
  it('selects a different modem (any phase) and dials at its rate', () => {
    const s = s0();
    const picked = do_(s, { type: 'select', modem: 'v32bis' });
    expect(picked.modem).toBe('v32bis');
    expect(do_(picked, { type: 'select', modem: 'v32bis' })).toBe(picked); // idempotent

    const dialing = do_(picked, { type: 'dial', modem: 'v32bis' });
    const c = do_(dialing, { type: 'carrier' });
    expect(c.lines[c.lines.length - 1]?.text).toBe('CONNECT 14400');

    // selecting mid-call is allowed but inert until the next dial
    const mid = do_(c, { type: 'select', modem: 'v22' });
    expect(mid.modem).toBe('v22');
  });

  it('starts idle with the 2400-baud era modem selected and a seeded board', () => {
    const s = s0();
    expect(s.phase).toBe('idle');
    expect(s.loggedIn).toBe(false);
    expect(s.modem).toBe('v22bis');
    expect(s.board).toHaveLength(2);
    expect(s.board.every((m) => m.seed)).toBe(true);
    expect(MODEMS).toHaveLength(4);
  });

  it('dial from idle enters dialing with an ATDT + ring + handshake transcript', () => {
    const s = do_(s0(), { type: 'dial', modem: 'v22bis' });
    expect(s.phase).toBe('dialing');
    const texts = s.lines.map((l) => l.text).join(' | ');
    expect(texts).toMatch(/ATDT/);
    expect(texts).toMatch(/RING 1/);
    expect(texts).toMatch(/2,400 bit\/s \(V\.22bis\)/);
  });

  it('refuses to dial while dialing or connected', () => {
    const dialing = do_(s0(), { type: 'dial', modem: 'v22' });
    expect(do_(dialing, { type: 'dial', modem: 'v32' })).toBe(dialing);

    const connected = do_(
      do_(dialing, { type: 'carrier' }),
      { type: 'login' },
    );
    expect(do_(connected, { type: 'dial', modem: 'v32' })).toBe(connected);
  });

  it('carrier appends the CONNECT line at the selected modem rate', () => {
    const dialing = do_(s0(), { type: 'dial', modem: 'v32bis' });
    const c = do_(dialing, { type: 'carrier' });
    expect(c.phase).toBe('connected');
    expect(c.lines[c.lines.length - 1]?.text).toBe('CONNECT 14400');

    // carrier outside dialing is a no-op
    expect(do_(c, { type: 'carrier' })).toBe(c);
  });

  it('login is a one-shot: banner once, then idempotent', () => {
    const dialing = do_(s0(), { type: 'dial', modem: 'v22bis' });
    const connected = do_(dialing, { type: 'carrier' });
    const logged = do_(connected, { type: 'login' });
    expect(logged.loggedIn).toBe(true);
    expect(logged.menu).toBe('main');
    const banners = logged.lines.filter((l) =>
      l.text.includes('MIDNIGHT EXPRESS'),
    ).length;
    expect(banners).toBe(1);
    // second login is a legal no-op (already logged in)
    expect(do_(logged, { type: 'login' })).toBe(logged);
  });

  it('lets you browse a seeded message and back out', () => {
    const dialing = do_(s0(), { type: 'dial', modem: 'v22bis' });
    const connected = do_(do_(dialing, { type: 'carrier' }), {
      type: 'login',
    });
    const inMsgs = do_(connected, { type: 'menu', menu: 'msgs' });
    const viewing = do_(inMsgs, { type: 'view', id: 'm1' });
    expect(viewing.menu).toBe('view');
    expect(viewing.viewing).toBe('m1');
    const texts = viewing.lines.map((l) => l.text).join(' | ');
    expect(texts).toMatch(/WELCOME TO THE BOARD/);
    expect(texts).toMatch(/SYSOP/);
    // unknown message is a no-op
    expect(do_(viewing, { type: 'view', id: 'nope' })).toBe(viewing);
  });

  it('posting grows the board, is recorded as non-seeded, and needs a body', () => {
    const dialing = do_(s0(), { type: 'dial', modem: 'v22bis' });
    const connected = do_(do_(dialing, { type: 'carrier' }), {
      type: 'login',
    });
    // empty body rejected
    expect(do_(connected, { type: 'post', text: '   ' })).toBe(connected);
    const posted = do_(connected, {
      type: 'post',
      text: 'Anybody else on 2400?',
    });
    expect(posted.posted).toBe(1);
    expect(posted.board).toHaveLength(3);
    const mine = posted.board[posted.board.length - 1];
    expect(mine.seed).toBe(false);
    expect(mine.author).toBe('YOU');
  });

  it('hangup only works while connected, then a fresh dial starts a new session', () => {
    const s = s0();
    expect(do_(s, { type: 'hangup' })).toBe(s); // not connected yet

    const dialing = do_(s, { type: 'dial', modem: 'v22bis' });
    const connected = do_(do_(dialing, { type: 'carrier' }), {
      type: 'login',
    });
    const hung = do_(connected, { type: 'hangup' });
    expect(hung.phase).toBe('hanged');
    expect(hung.loggedIn).toBe(false);
    expect(hung.lines[hung.lines.length - 1]?.text).toMatch(/DISCONNECTED/);
    expect(do_(hung, { type: 'hangup' })).toBe(hung); // idempotent

    // redial works and clears the transcript…
    const redialed = do_(hung, { type: 'dial', modem: 'v32' });
    expect(redialed.phase).toBe('dialing');
    expect(redialed.lines.some((l) => l.text.includes('MIDNIGHT EXPRESS'))).toBe(
      false,
    );
    // …but the board you posted on survives (it's the board, not the session)
    expect(redialed.board).toHaveLength(2);
  });
});
