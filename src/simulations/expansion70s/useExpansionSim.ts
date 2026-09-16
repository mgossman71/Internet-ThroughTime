/**
 * useExpansionSim — state + actions for the 1971–1982 exhibit.
 *
 * Rendering lives in ExpansionMap.tsx (canvas) and ExpansionPanel.tsx.
 * In-flight packets live in a ref (mutated per-frame by the canvas
 * rAF loop) so 60fps animation never triggers React re-renders; React
 * state changes only on discrete events (year change, send, delivery).
 */
import { useCallback, useRef, useState } from 'react';
import { EXPANSION_NODES } from './expansionData';
import {
  clampYear,
  ERA_MAX_YEAR,
  ERA_MIN_YEAR,
  graphAtYear,
  isActiveNode,
  milestoneFor,
  siteCountAt,
} from './growthEngine';
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

export interface ExpansionStats {
  sent: number;
  delivered: number;
}

const HOP_MS = 800;
const MAX_LOG_LINES = 40;

const LABELS: Record<string, string> = Object.fromEntries(
  EXPANSION_NODES.map((n) => [n.id, n.label]),
);

function edgesFor(year: number): GraphEdge[] {
  return graphAtYear(year).links.map((l) => ({ a: l.a, b: l.b }));
}

export function useExpansionSim() {
  const [year, setYearState] = useState(1971);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([
    {
      id: 0,
      text: 'A network of networks, 1971–1982. Step through the years — the map grows with the documented network.',
      kind: 'info',
    },
  ]);
  const [stats, setStats] = useState<ExpansionStats>({ sent: 0, delivered: 0 });

  const packetsRef = useRef<InFlightPacket[]>([]);
  const idRef = useRef(1);
  const timeoutsRef = useRef<number[]>([]);
  const yearRef = useRef(1971);

  const pushLog = useCallback((text: string, kind: LogLine['kind'] = 'info') => {
    setLogs((prev) => [
      ...prev.slice(-(MAX_LOG_LINES - 1)),
      { id: idRef.current++, text, kind },
    ]);
  }, []);

  const setYear = useCallback(
    (target: number) => {
      const next = clampYear(target);
      if (next === yearRef.current) return;
      yearRef.current = next;
      setYearState(next);
      const count = siteCountAt(next);
      const m = milestoneFor(next);
      pushLog(
        m
          ? `${next} — ${m.title}: ${m.detail}`
          : `${next} — ${
              count !== null
                ? `${count} sites on the network (last documented figure)`
                : 'the network keeps growing — no documented count for this year'
            }`,
        m ? 'ok' : 'info',
      );
      if (next === 1973) sound.relayClick(); // the international moment
      else sound.uiTick();
    },
    [pushLog],
  );

  const stepYear = useCallback((delta: number) => {
    setYear(yearRef.current + delta);
  }, [setYear]);

  const selectNode = useCallback((id: string) => {
    setSelectedNode(id);
  }, []);

  const send = useCallback(
    (from: string, to: string, label = 'mail') => {
      const y = yearRef.current;
      if (from === to) {
        pushLog('source and destination are the same host — nothing to send', 'err');
        sound.errorBuzz();
        return;
      }
      if (!isActiveNode(from, y)) {
        pushLog(`${LABELS[from]} is not on the network in ${y}`, 'err');
        sound.errorBuzz();
        return;
      }
      if (!isActiveNode(to, y)) {
        pushLog(`${LABELS[to]} is not on the network in ${y}`, 'err');
        sound.errorBuzz();
        return;
      }
      const result = computeRoute(edgesFor(y), from, to, {
        latencyPerHopMs: HOP_MS,
        jitterMs: 90,
        lossProbability: 0.04,
      });
      if (result.unreachable) {
        pushLog(`no route from ${LABELS[from]} to ${LABELS[to]} in ${y}`, 'err');
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
    [pushLog],
  );

  /** Clear any pending scripted timeouts. */
  const clearScript = useCallback(() => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  /**
   * Scripted tour across the decade. Each stop moves the timeline and
   * logs a short, sourced summary (see docs/SOURCES.md E1–E10).
   * Any previously running replay is cleared first (no stacked scripts).
   */
  const replayDecade = useCallback(() => {
    clearScript();
    const later = (ms: number, fn: () => void) => {
      timeoutsRef.current.push(window.setTimeout(fn, ms));
    };
    pushLog('— replaying the decade, 1970 → 1982 —');
    later(300, () => setYear(1970));
    later(1500, () => setYear(1971));
    later(2900, () =>
      pushLog('1971 — first email between machines: user@machine. Email is born.', 'ok'),
    );
    later(4200, () => setYear(1973));
    later(5600, () =>
      pushLog('1973 — the network crosses the Atlantic and the North Sea.', 'ok'),
    );
    later(6900, () => setYear(1977));
    later(8200, () => setYear(1981));
    later(9500, () =>
      pushLog('1982 — the network holds steady; the 1983 protocol switch is the next exhibit.', 'info'),
    );
  }, [clearScript, pushLog, setYear]);

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

  return {
    year,
    yearBounds: { min: ERA_MIN_YEAR, max: ERA_MAX_YEAR },
    selectedNode,
    logs,
    stats,
    packetsRef,
    setYear,
    stepYear,
    selectNode,
    send,
    advance,
    replayDecade,
    clearScript,
  };
}
