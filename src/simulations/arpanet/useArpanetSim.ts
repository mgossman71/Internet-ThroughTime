/**
 * useArpanetSim — state + actions for the ARPANET 1969 exhibit.
 *
 * Rendering lives in ArpanetMap.tsx (canvas) and ArpanetPanel.tsx.
 * In-flight packets live in a ref (mutated per-frame by the canvas
 * loop) so 60fps animation never triggers React re-renders; React
 * state only changes on discrete events (boot, send, delivery).
 */
import { useCallback, useRef, useState } from 'react';
import {
  ARPANET_LINKS_1969,
  ARPANET_NODES_1969,
  ARPANET_ONLINE_AT_START,
} from './arpanetData';
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

export interface ArpanetStats {
  sent: number;
  delivered: number;
}

const EDGES: GraphEdge[] = ARPANET_LINKS_1969.map(([a, b]) => ({ a, b }));
const LABELS: Record<string, string> = Object.fromEntries(
  ARPANET_NODES_1969.map((n) => [n.id, n.label]),
);
const ORGS: Record<string, string> = Object.fromEntries(
  ARPANET_NODES_1969.map((n) => [n.id, n.organization]),
);

const HOP_MS = 900;
const MAX_LOG_LINES = 40;

export function useArpanetSim() {
  const [online, setOnline] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ARPANET_ONLINE_AT_START.map((id) => [id, true])),
  );
  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: 0,
      text: 'ARPANET console — 1969. Power on the remaining IMPs, then send a message.',
      kind: 'info',
    },
  ]);
  const [stats, setStats] = useState<ArpanetStats>({ sent: 0, delivered: 0 });

  const packetsRef = useRef<InFlightPacket[]>([]);
  const idRef = useRef(1);
  const timeoutsRef = useRef<number[]>([]);

  const pushLog = useCallback((text: string, kind: LogLine['kind'] = 'info') => {
    setLogs((prev) => [
      ...prev.slice(-(MAX_LOG_LINES - 1)),
      { id: idRef.current++, text, kind },
    ]);
  }, []);

  const bootNode = useCallback(
    (id: string) => {
      if (online[id]) return;
      setOnline((prev) => ({ ...prev, [id]: true }));
      pushLog(`IMP powered on at ${LABELS[id]} — ${ORGS[id]}`, 'ok');
      sound.relayClick();
    },
    [online, pushLog],
  );

  const send = useCallback(
    (from: string, to: string, label = 'message') => {
      if (!online[from]) {
        pushLog(`cannot send from ${LABELS[from]} — IMP is offline`, 'err');
        sound.errorBuzz();
        return;
      }
      if (!online[to]) {
        pushLog(`${LABELS[to]} is offline — no destination IMP to receive`, 'err');
        sound.errorBuzz();
        return;
      }
      const result = computeRoute(EDGES, from, to, {
        latencyPerHopMs: HOP_MS,
        jitterMs: 120,
        lossProbability: 0.05,
      });
      if (result.unreachable) {
        pushLog(`no route from ${LABELS[from]} to ${LABELS[to]}`, 'err');
        sound.errorBuzz();
        return;
      }
      if (result.lost) {
        setStats((s) => ({ ...s, sent: s.sent + 1 }));
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
      setStats((s) => ({ ...s, sent: s.sent + 1 }));
      pushLog(
        `${label}: ${result.path.map((n) => LABELS[n]).join(' → ')} (${result.hops} hop${result.hops === 1 ? '' : 's'})`,
      );
      sound.uiTick();
    },
    [online, pushLog],
  );

  /**
   * Advance in-flight packets by deltaMs. Called from the canvas rAF
   * loop (ArpanetMap). Returns packets that completed this frame.
   */
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
        setStats((s) => ({ ...s, delivered: s.delivered + delivered.length }));
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

  /**
   * The standard account of the first ARPANET message (Oct 29, 1969):
   * LOGIN typed from UCLA, crash after "LO", reboot, success.
   * Presented as a scripted replay, clearly labeled as an account.
   */
  const replayFirstMessage = useCallback(() => {
    const later = (ms: number, fn: () => void) => {
      timeoutsRef.current.push(window.setTimeout(fn, ms));
    };
    pushLog('— replaying the standard account of the first message, Oct 29, 1969 —');
    later(300, () => pushLog('UCLA host: typing "L"…'));
    later(900, () => pushLog('UCLA host: typing "O"…'));
    later(1600, () => pushLog('SRI side — system crash. Message incomplete: "LO"', 'err'));
    later(2300, () => pushLog('operator at SRI reboots the SDS…', 'info'));
    later(3400, () => pushLog('LOGIN — delivered. The network answers.', 'ok'));
    later(3500, () => send('ucla', 'sri', 'LOGIN'));
  }, [pushLog, send]);

  /** Clear any pending scripted timeouts. */
  const clearScript = useCallback(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  return {
    online,
    logs,
    stats,
    packetsRef,
    bootNode,
    send,
    advance,
    replayFirstMessage,
    clearScript,
  };
}
