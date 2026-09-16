/**
 * useProtocolSim — state + actions for the 1983 exhibit.
 *
 * Rendering lives in ProtocolMap.tsx (canvas) and ProtocolPanel.tsx.
 * In-flight packets live in a ref (mutated per-frame by the canvas
 * rAF loop) so 60fps animation never triggers React re-renders; React
 * state changes only on discrete events (switch, flag day, send).
 */
import { useCallback, useRef, useState } from 'react';
import { LABELS, STRAGGLER_NODE, SWITCH_NODES } from './protocolData';
import {
  canSend,
  counts,
  edgesFor,
  flagDayComplete,
  fullySwitched,
  initialState,
  milestoneStates,
  switchNode,
  type SwitchState,
} from './switchEngine';
import { computeRoute, type GraphEdge } from '../packet-routing/routingEngine';
import { sound } from '../../audio/SoundManager';

export interface InFlightPacket {
  id: number;
  route: string[]; // node ids, inclusive
  hopIndex: number; // current edge: route[hopIndex] → route[hopIndex+1]
  t: number; // 0..1 progress along current hop
  speed: number; // progress per ms
  label: string;
}

export interface LogLine {
  id: number;
  text: string;
  kind: 'info' | 'ok' | 'err';
}

export interface SwitchStats {
  sent: number;
  delivered: number;
  failed: number;
}

const HOP_MS = 750;
const LOSS_PROBABILITY = 0.04;
const MAX_LOG_LINES = 40;
const SWEEP_START_MS = 500;
const SWEEP_STEP_MS = 380;

function protoName(p: 'ncp' | 'tcpi'): string {
  return p === 'ncp' ? 'NCP' : 'TCP/IP';
}

export function useProtocolSim() {
  const [state, setState] = useState<SwitchState>(initialState);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: 0,
      text: 'The ARPANET in late 1982: every host still speaks NCP. RFC 801 set the deadline to move to TCP/IP — the switch is the operator\u2019s job.',
      kind: 'info',
    },
  ]);
  const [stats, setStats] = useState<SwitchStats>({ sent: 0, delivered: 0, failed: 0 });

  const packetsRef = useRef<InFlightPacket[]>([]);
  const idRef = useRef(1);
  const timeoutsRef = useRef<number[]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  const pushLog = useCallback((text: string, kind: LogLine['kind'] = 'info') => {
    setLogs((prev) => [
      ...prev.slice(-(MAX_LOG_LINES - 1)),
      { id: idRef.current++, text, kind },
    ]);
  }, []);

  const selectNode = useCallback((id: string) => {
    setSelectedNode(id);
  }, []);

  /** Reload one host: NCP → TCP/IP (the per-site step of the roll-out). */
  const switchHost = useCallback(
    (id: string) => {
      const s = stateRef.current;
      const before = s.protocols[id];
      if (!before || before === 'tcpi') return;
      const wasStraggler = s.straggler === id;
      setState((cur) => switchNode(cur, id));
      pushLog(
        wasStraggler
          ? `${LABELS[id]} comes up on TCP/IP — the last NCP host; one protocol at last`
          : `${LABELS[id]} comes up on TCP/IP`,
        'ok',
      );
      if (wasStraggler) sound.successChime();
      else sound.relayClick();
    },
    [pushLog],
  );

  /** Clear any pending scripted timeouts. */
  const clearScript = useCallback(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  /**
   * FLAG DAY — the scripted Jan 1, 1983 sweep (P1): hosts come up on
   * TCP/IP one after another, one site keeps NCP by permission (P4),
   * MILNET splits off (P5). Any running sweep is cleared first.
   */
  const runFlagDay = useCallback(() => {
    if (stateRef.current.flagDayDone) return;
    clearScript();
    pushLog('— FLAG DAY · January 1, 1983 —', 'ok');
    const sweep = SWITCH_NODES.filter((n) => n.id !== STRAGGLER_NODE);
    sweep.forEach((n, i) => {
      timeoutsRef.current.push(
        window.setTimeout(() => {
          sound.relayClick();
          if (stateRef.current.protocols[n.id] === 'ncp') {
            setState((cur) => switchNode(cur, n.id));
            pushLog(`${n.label} comes up on TCP/IP`, 'ok');
          }
        }, SWEEP_START_MS + i * SWEEP_STEP_MS),
      );
    });
    const finishAt = SWEEP_START_MS + sweep.length * SWEEP_STEP_MS + 350;
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setState((cur) => flagDayComplete(cur));
        pushLog(
          `${LABELS[STRAGGLER_NODE]} keeps NCP — one of the special cases permitted by the backbone operators into mid-1983 (P4)`,
          'info',
        );
        pushLog('MILNET splits off — the military-only network comes up on TCP/IP on its own (P5)', 'ok');
        pushLog('January 1, 1983 — the date widely marked as the birth of the Internet (P1).', 'ok');
        sound.successChime();
      }, finishAt),
    );
  }, [clearScript, pushLog]);

  const send = useCallback(
    (from: string, to: string, label = 'mail') => {
      const s = stateRef.current;
      const check = canSend(s, from, to);
      if (!check.ok) {
        setStats((st) => ({ ...st, failed: st.failed + 1 }));
        if (check.reason === 'mismatch') {
          pushLog(
            `PROTOCOL MISMATCH — ${LABELS[from]} speaks ${protoName(s.protocols[from])}, ${LABELS[to]} speaks ${protoName(s.protocols[to])}; hosts that speak different protocols cannot reach each other`,
            'err',
          );
        } else {
          pushLog(`${label}: ${LABELS[from] ?? from} → ${LABELS[to] ?? to} — destination offline`, 'err');
        }
        sound.errorBuzz();
        return;
      }
      const edges: GraphEdge[] = edgesFor(s).map((l) => ({ a: l.a, b: l.b }));
      const result = computeRoute(edges, from, to, {
        latencyPerHopMs: 20,
        jitterMs: 5,
        lossProbability: LOSS_PROBABILITY,
      });
      if (result.unreachable) {
        setStats((st) => ({ ...st, failed: st.failed + 1 }));
        pushLog(`no route from ${LABELS[from]} to ${LABELS[to]}`, 'err');
        sound.errorBuzz();
        return;
      }
      if (result.lost) {
        setStats((st) => ({ ...st, sent: st.sent + 1 }));
        pushLog(`${label}: dropped at ${LABELS[result.lossAt ?? from]}`, 'err');
        sound.errorBuzz();
        return;
      }
      packetsRef.current.push({
        id: idRef.current++,
        route: result.path,
        hopIndex: 0,
        t: 0,
        speed: 1 / HOP_MS,
        label,
      });
      setStats((st) => ({ ...st, sent: st.sent + 1 }));
      pushLog(
        `${label}: ${result.path.map((n) => LABELS[n]).join(' → ')} (${result.hops} hop${result.hops === 1 ? '' : 's'})`,
      );
      sound.uiTick();
    },
    [pushLog],
  );

  /** Advance in-flight packets by deltaMs (called from the canvas loop). */
  const advance = useCallback(
    (deltaMs: number): InFlightPacket[] => {
      if (packetsRef.current.length === 0) return [];
      const delivered: InFlightPacket[] = [];

      for (const p of packetsRef.current) {
        p.t += deltaMs * p.speed;
        while (p.t >= 1) {
          if (p.hopIndex >= p.route.length - 1) {
            p.t = 1;
            delivered.push(p);
            break;
          }
          p.hopIndex += 1;
          p.t -= 1;
        }
      }

      if (delivered.length > 0) {
        const deliveredIds = new Set(delivered.map((d) => d.id));
        packetsRef.current = packetsRef.current.filter((p) => !deliveredIds.has(p.id));
        setStats((st) => ({ ...st, delivered: st.delivered + delivered.length }));
        for (const d of delivered) {
          const dest = LABELS[d.route[d.route.length - 1]];
          pushLog(`delivered: ${d.label} → ${dest}`, 'ok');
        }
        sound.successChime();
      }
      return delivered;
    },
    [pushLog],
  );

  return {
    state,
    counts: counts(state),
    fullyOn: fullySwitched(state),
    milestoneStates: milestoneStates(state),
    selectedNode,
    logs,
    stats,
    packetsRef,
    selectNode,
    switchHost,
    runFlagDay,
    send,
    advance,
    clearScript,
  };
}

