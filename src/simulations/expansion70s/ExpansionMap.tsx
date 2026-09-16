/**
 * ExpansionMap — canvas rendering of the 1971–1982 ARPANET growth.
 *
 * Splitting (spec §7): logic in useExpansionSim / growthEngine, data in
 * expansionData, this file only draws. Node hit targets are HTML
 * buttons layered on top (accessible); the canvas is purely visual.
 *
 * The background dot field aggregates the *documented* site counts
 * beyond the named sites (deterministic, illustrative positions) —
 * see the caption and expansionData footnotes.
 */
import { useRef } from 'react';
import type { MutableRefObject } from 'react';
import { EXPANSION_NODES } from './expansionData';
import { graphAtYear, siteCountAt } from './growthEngine';
import type { InFlightPacket } from './useExpansionSim';
import { useRaf } from '../../hooks/useRaf';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PAD = 30; // px — must match the `inset` of the node hit-target layer below
const MAX_POPULATION_DOTS = 96;

interface Props {
  year: number;
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

/** Deterministic LCG so the population field never jumps between frames. */
function lcg(seed: number): () => number {
  let s = seed % 2147483648;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export function ExpansionMap({ year, packetsRef, advance, onNodeClick, selectedNode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const yearRef = useRef(year);
  yearRef.current = year;
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
    const curYear = yearRef.current;
    const graph = graphAtYear(curYear);
    const active = new Set(graph.nodes.map((n) => n.id));

    const pos = (id: string): [number, number] | null => {
      const n = EXPANSION_NODES.find((x) => x.id === id);
      return n ? nodePoint(w, h, n.x, n.y) : null;
    };

    // --- population field (aggregation of documented site counts) ---
    const total = siteCountAt(curYear);
    const population =
      total !== null ? Math.min(Math.max(total - active.size, 0), MAX_POPULATION_DOTS) : 0;
    if (population > 0) {
      const rng = lcg(1982); // fixed seed: dots keep their positions as count grows
      for (let i = 0; i < population; i++) {
        const europe = rng() > 0.72;
        const px = nodePoint(w, h, europe ? 0.64 + rng() * 0.26 : 0.04 + rng() * 0.52, 0)[0];
        const py = nodePoint(w, h, 0, europe ? 0.08 + rng() * 0.4 : 0.12 + rng() * 0.7)[1];
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.28;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // --- links (active at current year) ---
    for (const l of graph.links) {
      const pa = pos(l.a);
      const pb = pos(l.b);
      if (!pa || !pb) continue;
      ctx.beginPath();
      ctx.moveTo(pa[0], pa[1]);
      ctx.lineTo(pb[0], pb[1]);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.stroke();
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

    // --- named nodes: active = filled/glowing; future = faint ghost ---
    for (const n of EXPANSION_NODES) {
      const [x, y] = nodePoint(w, h, n.x, n.y);
      const isOn = active.has(n.id);

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
      ctx.setLineDash(isOn ? [] : [3, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = isOn ? accent : dim;
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, x, y);

      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.globalAlpha = 0.85;
      ctx.fillText(isOn ? 'ONLINE' : `JOINS ${n.year}`, x, y + 28);
      if (isOn && n.international) {
        ctx.fillText('INTL', x, y - 28);
      }
      ctx.globalAlpha = 1;
    }
  };

  const activeNodes = graphAtYear(year).nodes;

  return (
    <div className="exp-map">
      <div className="exp-map-stage">
        <canvas ref={canvasRef} className="exp-canvas" aria-hidden="true" />
        {/* Node hit-targets live in a layer inset by PAD so % positions
            line up exactly with the canvas PAD calculation. Only nodes
            online in the current year are interactive. */}
        <div className="exp-node-layer" style={{ inset: PAD }}>
          {activeNodes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`exp-node-btn ${n.id === selectedNode ? 'is-sel' : ''}`}
              style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
              onClick={() => onNodeClick(n.id)}
              aria-label={`${n.label} — ${n.organization}, online since ${n.year}`}
            >
              <span className="exp-node-dot" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <p className="exp-map-caption">
        The documented network, year by year. Background dots aggregate the rest of the
        documented site counts (illustrative positions); routes are simplified — not the
        historical circuit map.
      </p>
    </div>
  );
}
