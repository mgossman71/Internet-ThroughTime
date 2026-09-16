/**
 * switchEngine unit tests — pure logic, no DOM.
 */
import { describe, expect, it } from 'vitest';
import {
  canSend,
  counts,
  edgesFor,
  flagDayComplete,
  fullySwitched,
  initialState,
  isOnline,
  milestoneStates,
  switchNode,
} from './switchEngine';
import { STRAGGLER_NODE } from './protocolData';

describe('switchEngine', () => {
  it('starts with all eight named hosts on NCP; MILNET offline; no straggler', () => {
    const s = initialState();
    expect(Object.keys(s.protocols).sort()).toEqual([
      'bbn', 'london', 'rre', 'sri', 'tip1', 'ucla', 'ucsb', 'ut',
    ]);
    expect(Object.values(s.protocols).every((p) => p === 'ncp')).toBe(true);
    expect(isOnline(s, 'milnet')).toBe(false);
    expect(s.flagDayDone).toBe(false);
    expect(s.straggler).toBeNull();
  });

  it('switches one host to TCP/IP and leaves the rest on NCP; repeat is a no-op', () => {
    let s = initialState();
    s = switchNode(s, 'ucla');
    expect(s.protocols.ucla).toBe('tcpi');
    expect(s.protocols.sri).toBe('ncp');
    expect(switchNode(s, 'ucla')).toBe(s);
    expect(switchNode(s, 'milnet')).toBe(s); // offline host: no-op
  });

  it('allows same-protocol sends and refuses cross-protocol ones', () => {
    const s = switchNode(initialState(), 'ucla');
    expect(canSend(s, 'ucla', 'sri').ok).toBe(false);
    expect(canSend(s, 'ucla', 'sri').reason).toBe('mismatch');
    expect(canSend(s, 'sri', 'ut').ok).toBe(true);
    expect(canSend(s, 'ucla', 'milnet').reason).toBe('offline');
  });

  it('flag day: every host on TCP/IP except the straggler; MILNET online', () => {
    const s = flagDayComplete(initialState());
    expect(s.flagDayDone).toBe(true);
    expect(s.protocols[STRAGGLER_NODE]).toBe('ncp');
    expect(Object.entries(s.protocols)
      .filter(([id]) => id !== STRAGGLER_NODE)
      .every(([, p]) => p === 'tcpi')).toBe(true);
    expect(s.protocols.milnet).toBe('tcpi');
    expect(canSend(s, STRAGGLER_NODE, 'sri').reason).toBe('mismatch');
    expect(canSend(s, 'ucla', 'milnet').ok).toBe(true);
    expect(counts(s)).toEqual({ ncp: 1, tcpi: 8 });
  });

  it('switching the straggler clears the exception and completes the network', () => {
    let s = flagDayComplete(initialState());
    expect(fullySwitched(s)).toBe(false);
    s = switchNode(s, STRAGGLER_NODE);
    expect(s.straggler).toBeNull();
    expect(fullySwitched(s)).toBe(true);
    expect(canSend(s, STRAGGLER_NODE, 'sri').ok).toBe(true);
  });

  it('flagDayComplete is idempotent and identical after manual pre-switches', () => {
    const a = flagDayComplete(initialState());
    expect(flagDayComplete(a)).toBe(a);
    const b = flagDayComplete(switchNode(initialState(), 'bbn'));
    expect(b.protocols).toEqual(a.protocols);
  });

  it('exposes the MILNET link only after flag day', () => {
    const before = edgesFor(initialState());
    const after = edgesFor(flagDayComplete(initialState()));
    expect(before.some((l) => l.a === 'bbn' && l.b === 'milnet')).toBe(false);
    expect(after.some((l) => l.a === 'bbn' && l.b === 'milnet')).toBe(true);
    expect(before).toHaveLength(7);
    expect(after).toHaveLength(8);
  });

  it('tracks milestone states as the switch progresses', () => {
    expect(milestoneStates(initialState())).toEqual({
      plan: 'past', flagday: 'active', milnet: 'future', stragglers: 'future',
    });
    expect(milestoneStates(flagDayComplete(initialState()))).toEqual({
      plan: 'past', flagday: 'past', milnet: 'past', stragglers: 'active',
    });
    const done = switchNode(flagDayComplete(initialState()), STRAGGLER_NODE);
    expect(milestoneStates(done).stragglers).toBe('past');
  });
});
