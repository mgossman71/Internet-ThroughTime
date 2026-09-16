/**
 * ProtocolMap — canvas rendering of the 1983 protocol switch.
 *
 * Splitting (spec §7): logic in useProtocolSim / switchEngine, data in
 * protocolData, this file only draws. Node hit targets are HTML
 * buttons layered on top (accessible); the canvas is purely visual.
 *
 * Visual language: NCP hosts are dim, TCP/IP hosts are lit in the era
 * accent, the post-flag-day straggler (NCP "by exception") is flagged
 * in red. MILNET is a ghost node until it splits off on flag day.
 */
import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { MILNET_NODE, SWITCH_LINKS, SWITCH_NODES } from './protocolData';
import type { SwitchState } from './switchEngine';
import type { InFlightPacket } from './useProtocolSim';
import { useRaf } from '../../hooks/useRaf';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PAD = 30; // px — must match the `inset` of the node hit-target layer
const EXC_COLOR = '#ff7a6e'; // same red as the "DOWN"/lost markers in exhibit 01

interface Props {
  state: SwitchState;
  packetsRef: MutableRefObject<InFlightPacket[]>;
  advance: (deltaMs: number) => void;
  onNodeClick: (id: string) => void;
  selectedNode: string | null;
}

function nodePoint(w: number, h: number, nx: number, ny: number): [number, number] {
  return [PAD + nx * (w - 2 * PAD), PAD + ny * (h - 2 * PAD)];
}

function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function ProtocolMap({ state, packetsRef, advance, onNodeClick, selectedNode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const stateRef = useRef(state);
  stateRef.current = state;
  const selectedRef = useRef(selectedNode);
  selectedRef.current = selectedNode;

  useRaf((_t, delta) => {
    advance(delta);
    draw();
  }, true);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const accent = readCssVar('--accent', '#ffa62b');
    const dim = readCssVar('--fg-dim', '#9c7543');
    const cur = stateRef.current;

    const pos = (id: string): [number, number] | null => {
      const n =
        id === MILNET_NODE.id ? MILNET_NODE : SWITCH_NODES.find((x) => x.id === id);
      return n ? nodePoint(w, h, n.x, n.y) : null;
    };

    // --- links (MILNET link only once it has split off) ---
    for (const l of SWITCH_LINKS) {
      if (l.postFlagDay && !cur.flagDayDone) continue;
      if (!(l.a in cur.protocols) || !(l.b in cur.protocols)) continue;
      const a = pos(l.a);
      const b = pos(l.b);
      if (!a || !b) continue;
      const bothTcpi = cur.protocols[l.a] === 'tcpi' && cur.protocols[l.b] === 'tcpi';
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.strokeStyle = bothTcpi ? accent : dim;
      ctx.globalAlpha = bothTcpi ? 0.55 : 0.35;
      ctx.lineWidth = bothTcpi ? 1.5 : 1;
      ctx.setLineDash(bothTcpi ? [] : [4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // --- packets: bright dot + short trail along current hop ---
    for (const p of packetsRef.current) {
      const from = pos(p.route[p.hopIndex]);
      const to = pos(p.route[Math.min(p.hopIndex + 1, p.route.length - 1)]);
      if (!from || !to) continue;
      const x = from[0] + (to[0] - from[0]) * p.t;
      const y = from[1] + (to[1] - from[1]) * p.t;

      for (let g = 1; g <= 3; g++) {
        const gt = Math.max(0, p.t - g * 0.06);
        const gx = from[0] + (to[0] - from[0]) * gt;
        const gy = from[1] + (to[1] - from[1]) * gt;
        ctx.beginPath();
        ctx.arc(gx, gy, Math.max(1, 5 - g), 0, Math.PI * 2);
        ctx.globalAlpha = 0.28 / g;
        ctx.fillStyle = accent;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = accent;
      ctx.shadowBlur = reduced ? 0 : 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // --- named hosts: color = current protocol ---
    for (const n of SWITCH_NODES) {
      const [x, y] = nodePoint(w, h, n.x, n.y);
      const prot = cur.protocols[n.id];
      const isTcpi = prot === 'tcpi';
      const exc = cur.straggler === n.id;
      const color = isTcpi ? accent : exc ? EXC_COLOR : dim;

      if (isTcpi) {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.lineWidth = n.id === selectedRef.current ? 3 : 1.5;
      ctx.strokeStyle = color;
      ctx.setLineDash(isTcpi ? [] : [3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = color;
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, x, y);

      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.globalAlpha = 0.9;
      ctx.fillText(exc ? 'NCP · EXCEPTION' : isTcpi ? 'TCP/IP' : 'NCP', x, y + 28);
      ctx.globalAlpha = 1;
    }

    // --- MILNET: ghost until it splits off on flag day ---
    {
      const [x, y] = nodePoint(w, h, MILNET_NODE.x, MILNET_NODE.y);
      const live = 'milnet' in cur.protocols;
      const color = live ? accent : dim;
      if (live) {
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.22;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.lineWidth = MILNET_NODE.id === selectedRef.current ? 3 : 1.5;
      ctx.strokeStyle = color;
      ctx.setLineDash(live ? [] : [3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MILNET', x, y);
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.globalAlpha = 0.9;
      ctx.fillText(live ? 'TCP/IP · SPLIT OFF 1983' : 'SPLITS OFF 1983', x, y + 28);
      ctx.globalAlpha = 1;
    }
  };

  const hitTargets =
    'milnet' in state.protocols ? [...SWITCH_NODES, MILNET_NODE] : SWITCH_NODES;

  return (
    <div className="ps-map">
      <div className="ps-map-stage">
        <canvas ref={canvasRef} className="ps-canvas" aria-hidden="true" />
        {/* Node hit-targets live in a layer inset by PAD so % positions
            line up exactly with the canvas PAD calculation. */}
        <div className="ps-node-layer" style={{ inset: PAD }}>
          {hitTargets.map((n) => {
            const prot = state.protocols[n.id] === 'tcpi' ? 'TCP/IP' : 'NCP';
            return (
              <button
                key={n.id}
                type="button"
                className={`ps-node-btn ${n.id === selectedNode ? 'is-sel' : ''}`}
                style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
                onClick={() => onNodeClick(n.id)}
                aria-label={`${n.label} — currently ${prot}, ${n.organization}`}
              >
                <span className="ps-node-dot" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
      <p className="ps-map-caption">
        The ARPANET hosts, with their current protocol. NCP hosts are dim; TCP/IP hosts
        are lit; the exception host is flagged in red. Link routes are simplified — not
        the historical circuit map.
      </p>
    </div>
  );
}

