/**
 * RoutingSim — the "how a packet finds its way" exhibit.
 *
 * A small diamond topology (SOURCE → router A/B → DESTINATION) built on
 * the pure routingEngine. Teaches: hops, addressing, routing decisions,
 * failover (take a router down), latency, and packet loss.
 *
 * Logic is in routingEngine.ts (unit tested); this file is presentation.
 */
import { useEffect, useRef, useState } from 'react';
import { computeRoute, type GraphEdge, type RouteResult } from './routingEngine';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { sound } from '../../audio/SoundManager';

const NODES = [
  { id: 'src', label: 'SOURCE', x: 45, y: 110 },
  { id: 'a', label: 'ROUTER A', x: 178, y: 38 },
  { id: 'b', label: 'ROUTER B', x: 178, y: 182 },
  { id: 'dst', label: 'DESTINATION', x: 312, y: 110 },
] as const;

const ALL_EDGES: GraphEdge[] = [
  { a: 'src', b: 'a' },
  { a: 'src', b: 'b' },
  { a: 'a', b: 'dst' },
  { a: 'b', b: 'dst' },
  { a: 'a', b: 'b' },
];

const HOP_ANIM_MS = 480;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

/** Normalize an edge to a "a|b" key with sorted endpoints. */
function edgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

function routeEdgeKeys(path: string[]): Set<string> {
  const keys = new Set<string>();
  for (let i = 0; i < path.length - 1; i++) {
    keys.add(edgeKey(path[i], path[i + 1]));
  }
  return keys;
}

export function RoutingSim() {
  const reduced = useReducedMotion();
  const [downA, setDownA] = useState(false);
  const [downB, setDownB] = useState(false);
  const [latency, setLatency] = useState(20);
  const [lossPct, setLossPct] = useState(0);
  const [result, setResult] = useState<RouteResult | null>(null);
  const [activeHop, setActiveHop] = useState(-1);
  const [counts, setCounts] = useState({ sent: 0, delivered: 0, lost: 0 });
  const [lastLine, setLastLine] = useState('ready. send a packet.');
  const timeoutsRef = useRef<number[]>([]);

  useEffect(
    () => () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const activeEdges: GraphEdge[] = ALL_EDGES.filter(
    (e) =>
      !((downA && (e.a === 'a' || e.b === 'a')) ||
        (downB && (e.a === 'b' || e.b === 'b'))),
  );

  const later = (ms: number, fn: () => void) => {
    timeoutsRef.current.push(window.setTimeout(fn, ms));
  };

  const send = () => {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];

    const res = computeRoute(activeEdges, 'src', 'dst', {
      latencyPerHopMs: latency,
      jitterMs: Math.round(latency / 2),
      lossProbability: lossPct / 100,
    });
    setResult(res);
    setCounts((c) => ({ ...c, sent: c.sent + 1 }));

    if (res.unreachable) {
      setActiveHop(-1);
      setLastLine('no route — both routers are down. the packet cannot leave SOURCE.');
      sound.errorBuzz();
      return;
    }

    if (res.lost) {
      setCounts((c) => ({ ...c, lost: c.lost + 1 }));
      setLastLine(
        `packet dropped at ${nodeById(res.lossAt ?? 'src').label.toLowerCase()}. it will be retransmitted.`,
      );
    } else {
      setCounts((c) => ({ ...c, delivered: c.delivered + 1 }));
      setLastLine(
        `delivered via ${res.path
          .map((p) => nodeById(p).label.toLowerCase())
          .join(' → ')} · ${res.hops} hop${res.hops === 1 ? '' : 's'} · ${res.totalLatencyMs} ms`,
      );
    }

    if (reduced) {
      setActiveHop(res.hops - 1); // show the full route instantly
      if (res.lost) sound.errorBuzz();
      else sound.successChime();
      return;
    }

    // Animate hop by hop.
    for (let i = 0; i < res.hops; i++) {
      later(i * HOP_ANIM_MS + 120, () => {
        setActiveHop(i);
        sound.uiTick();
      });
    }
    later(res.hops * HOP_ANIM_MS + 260, () => {
      if (res.lost) sound.errorBuzz();
      else sound.successChime();
    });
  };

  const highlightKeys =
    result && activeHop >= 0 ? routeEdgeKeys(result.path.slice(0, activeHop + 2)) : new Set<string>();

  return (
    <div className="rsim">
      <div className="rsim-grid">
        {/* -------- diagram -------- */}
        <div className="rsim-diagram">
          <svg viewBox="0 0 360 220" role="img" aria-label="Packet routing diagram">
            {ALL_EDGES.map((e) => {
              const na = nodeById(e.a);
              const nb = nodeById(e.b);
              const isDown =
                (downA && (e.a === 'a' || e.b === 'a')) ||
                (downB && (e.a === 'b' || e.b === 'b'));
              const isHi = highlightKeys.has(edgeKey(e.a, e.b));
              return (
                <line
                  key={edgeKey(e.a, e.b)}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  className={`rsim-edge ${isDown ? 'is-down' : ''} ${isHi ? 'is-hi' : ''}`}
                />
              );
            })}

            {NODES.map((n) => {
              const isDown = (n.id === 'a' && downA) || (n.id === 'b' && downB);
              const isLoss = result?.lost && result.lossAt === n.id;
              return (
                <g key={n.id} className={`rsim-node ${isDown ? 'is-down' : ''}`}>
                  <rect
                    x={n.x - 46}
                    y={n.y - 20}
                    width="92"
                    height="40"
                    rx="5"
                    className="rsim-node-box"
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" className="rsim-node-label">
                    {n.label}
                  </text>
                  {isDown && (
                    <text x={n.x} y={n.y + 34} textAnchor="middle" className="rsim-down">
                      OFFLINE
                    </text>
                  )}
                  {isLoss && (
                    <text x={n.x} y={n.y - 30} textAnchor="middle" className="rsim-lost">
                      ✕ LOST
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <p className="rsim-readout" aria-live="polite">
            {lastLine}
          </p>
        </div>

        {/* -------- controls -------- */}
        <div className="rsim-controls">
          <div className="rsim-toggles">
            <button
              type="button"
              className={`btn-ghost rsim-toggle ${downA ? 'is-down' : ''}`}
              onClick={() => {
                sound.relayClick();
                setDownA((v) => !v);
              }}
              aria-pressed={downA}
            >
              ROUTER A: {downA ? 'DOWN' : 'ONLINE'}
            </button>
            <button
              type="button"
              className={`btn-ghost rsim-toggle ${downB ? 'is-down' : ''}`}
              onClick={() => {
                sound.relayClick();
                setDownB((v) => !v);
              }}
              aria-pressed={downB}
            >
              ROUTER B: {downB ? 'DOWN' : 'ONLINE'}
            </button>
          </div>

          <label className="rsim-slider">
            <span>
              HOP LATENCY <strong>{latency} ms</strong>
            </span>
            <input
              type="range"
              min={5}
              max={80}
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
            />
          </label>

          <label className="rsim-slider">
            <span>
              PACKET LOSS <strong>{lossPct}%</strong>
            </span>
            <input
              type="range"
              min={0}
              max={40}
              value={lossPct}
              onChange={(e) => setLossPct(Number(e.target.value))}
            />
          </label>

          <button type="button" className="btn-primary rsim-send" onClick={send}>
            SEND PACKET
          </button>

          <p className="rsim-counts">
            sent {counts.sent} · delivered {counts.delivered} · lost {counts.lost}
          </p>
        </div>
      </div>

      {/* -------- teaching notes -------- */}
      <div className="rsim-notes">
        <div>
          <h4>ADDRESSING</h4>
          <p>
            The packet already knows its destination. Every router only asks: of the links leaving
            me, which gets me closer?
          </p>
        </div>
        <div>
          <h4>HOPS</h4>
          <p>
            A hop is one router-to-router step. End-to-end delay is the sum of hops plus queueing
            and jitter at each.
          </p>
        </div>
        <div>
          <h4>FAILOVER</h4>
          <p>
            Take Router A down and the next packet flows around it. No central switch is required
            — that is the core idea behind packet switching.
          </p>
        </div>
      </div>
    </div>
  );
}
