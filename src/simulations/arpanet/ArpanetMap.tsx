/**
 * ArpanetMap — canvas rendering of the four-node 1969 ARPANET.
 *
 * Splitting (spec §7): logic in useArpanetSim, data in arpanetData,
 * this file only draws. Node hit targets are HTML buttons layered on
 * top (accessible), the canvas is purely visual.
 */
import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { ARPANET_LINKS_1969, ARPANET_NODES_1969 } from './arpanetData';
import type { InFlightPacket } from './useArpanetSim';
import { useRaf } from '../../hooks/useRaf';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PAD = 30; // px — must match the `inset` of the node hit-target layer below

interface Props {
  online: Record<string, boolean>;
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

export function ArpanetMap({ online, packetsRef, advance, onNodeClick, selectedNode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const onlineRef = useRef(online);
  onlineRef.current = online;
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

    const accent = readCssVar('--accent', '#4dff88');
    const dim = readCssVar('--fg-dim', '#5f9c72');

    const pos = (id: string): [number, number] | null => {
      const n = ARPANET_NODES_1969.find((x) => x.id === id);
      return n ? nodePoint(w, h, n.x, n.y) : null;
    };

    // --- links ---
    for (const [a, b] of ARPANET_LINKS_1969) {
      const pa = pos(a);
      const pb = pos(b);
      if (!pa || !pb) continue;
      const bothOn = onlineRef.current[a] && onlineRef.current[b];
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      if (bothOn) {
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = dim;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // --- packets (bright dot + short trail along current hop) ---
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

    // --- nodes (glow when online; thicker ring when selected) ---
    for (const n of ARPANET_NODES_1969) {
      const [x, y] = nodePoint(w, h, n.x, n.y);
      const isOn = !!onlineRef.current[n.id];

      if (isOn) {
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
      ctx.strokeStyle = isOn ? accent : dim;
      ctx.stroke();

      ctx.fillStyle = isOn ? accent : dim;
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.id.toUpperCase(), x, y);

      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.globalAlpha = 0.85;
      ctx.fillText(isOn ? 'ONLINE' : 'OFFLINE', x, y + 28);
      ctx.globalAlpha = 1;
    }
  };

  return (
    <div className="arpanet-map">
      <div className="arpanet-map-stage">
        <canvas ref={canvasRef} className="arpanet-canvas" aria-hidden="true" />
        {/* Node hit-targets live in a layer inset by PAD so % positions
            line up exactly with the canvas PAD calculation. */}
        <div className="arpanet-node-layer" style={{ inset: PAD }}>
          {ARPANET_NODES_1969.map((n) => {
            const isOn = !!online[n.id];
            return (
              <button
                key={n.id}
                type="button"
                className={`arpanet-node-btn ${isOn ? 'is-on' : 'is-off'}`}
                style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
                onClick={() => onNodeClick(n.id)}
                aria-label={`${n.label} — ${n.organization}, ${
                  isOn ? 'online, click to view details' : 'offline, click to power on'
                }`}
              >
                <span className="arpanet-node-dot" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
      <p className="arpanet-map-caption">
        The first four hosts, connected one at a time through late 1969. Click a node to power it
        on (or inspect it).
      </p>
    </div>
  );
}
