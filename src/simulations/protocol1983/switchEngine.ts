/**
 * switchEngine — pure logic for the 1983 exhibit (no React, no DOM).
 *
 * Models the protocol state of the named hosts during the 1983 cutover:
 * - every host starts on NCP, the ARPANET host-to-host protocol
 * - a host can be switched to TCP/IP one at a time (the roll-out)
 * - FLAG DAY is the target state: every host on TCP/IP except the
 *   documented exception — one site keeps NCP by permission (P4) —
 *   and MILNET online on TCP/IP (P5)
 * - two hosts can talk only when they speak the same protocol.
 *   That is the whole lesson of the flag day (P2: the old protocol
 *   could not reach "hosts in other networks").
 *
 * Deterministic and unit-testable.
 */
import {
  MILNET_NODE,
  STRAGGLER_NODE,
  SWITCH_LINKS,
  SWITCH_NODES,
  type Protocol,
  type SwitchLink,
} from './protocolData';

export interface SwitchState {
  /** Online hosts and their current protocol. */
  protocols: Record<string, Protocol>;
  /** True after the Jan 1, 1983 flag-day sweep has completed. */
  flagDayDone: boolean;
  /** Host allowed to keep NCP after flag day (P4) — null once switched. */
  straggler: string | null;
}

export function initialState(): SwitchState {
  const protocols: Record<string, Protocol> = {};
  for (const n of SWITCH_NODES) protocols[n.id] = 'ncp';
  return { protocols, flagDayDone: false, straggler: null };
}

export function isOnline(state: SwitchState, id: string): boolean {
  return id in state.protocols;
}

export function protocolOf(state: SwitchState, id: string): Protocol | null {
  return state.protocols[id] ?? null;
}

/** Flip one host to TCP/IP (no-op when it already runs it or is offline). */
export function switchNode(state: SwitchState, id: string): SwitchState {
  if (!(id in state.protocols) || state.protocols[id] === 'tcpi') return state;
  return {
    ...state,
    protocols: { ...state.protocols, [id]: 'tcpi' },
    straggler: state.straggler === id ? null : state.straggler,
  };
}

/**
 * FLAG DAY — the target state after the Jan 1, 1983 sweep (P1): every
 * named host on TCP/IP except the exception (P4); MILNET online on
 * TCP/IP (P5). Idempotent.
 */
export function flagDayComplete(state: SwitchState): SwitchState {
  if (state.flagDayDone) return state;
  const protocols: Record<string, Protocol> = { ...state.protocols };
  for (const n of SWITCH_NODES) protocols[n.id] = 'tcpi';
  protocols[STRAGGLER_NODE] = 'ncp';
  protocols[MILNET_NODE.id] = 'tcpi';
  return { protocols, flagDayDone: true, straggler: STRAGGLER_NODE };
}

export interface SendCheck {
  ok: boolean;
  reason?: 'mismatch' | 'offline';
}

/** Two hosts can talk only when they speak the same protocol (P2, P7). */
export function canSend(state: SwitchState, from: string, to: string): SendCheck {
  const a = state.protocols[from];
  const b = state.protocols[to];
  if (from === to || !a || !b) return { ok: false, reason: 'offline' };
  if (a !== b) return { ok: false, reason: 'mismatch' };
  return { ok: true };
}

export function counts(state: SwitchState): { ncp: number; tcpi: number } {
  let ncp = 0;
  let tcpi = 0;
  for (const p of Object.values(state.protocols)) {
    if (p === 'ncp') ncp += 1;
    else tcpi += 1;
  }
  return { ncp, tcpi };
}

export function fullySwitched(state: SwitchState): boolean {
  return Object.values(state.protocols).every((p) => p === 'tcpi');
}

/** Routable links: MILNET link only after flag day, endpoints online. */
export function edgesFor(state: SwitchState): readonly SwitchLink[] {
  return SWITCH_LINKS.filter((l) => {
    if (l.postFlagDay && !state.flagDayDone) return false;
    return isOnline(state, l.a) && isOnline(state, l.b);
  });
}

export type MilestoneState = 'past' | 'active' | 'future';

/** Status of the 1981 → mid-1983 milestone strip for a given state. */
export function milestoneStates(state: SwitchState): Record<string, MilestoneState> {
  const all = fullySwitched(state);
  return {
    plan: 'past', // the 1981 plan is our starting context
    flagday: state.flagDayDone ? 'past' : 'active',
    milnet: state.flagDayDone ? 'past' : 'future',
    stragglers: !state.flagDayDone ? 'future' : all ? 'past' : 'active',
  };
}
