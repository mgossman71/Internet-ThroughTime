import { describe, expect, it } from 'vitest';
import { computeRoute, shortestPath } from './routingEngine';

/** Diamond topology: src — A — dst and src — B — dst, with A—B cross link. */
const EDGES = [
  { a: 'src', b: 'a' },
  { a: 'src', b: 'b' },
  { a: 'a', b: 'dst' },
  { a: 'b', b: 'dst' },
  { a: 'a', b: 'b' },
] as const;

/** Deterministic RNG: always returns `value`. */
const constRng = (value: number) => () => value;

describe('shortestPath', () => {
  it('finds a direct link', () => {
    expect(shortestPath(EDGES, 'src', 'a')).toEqual(['src', 'a']);
  });

  it('finds a two-hop path', () => {
    expect(shortestPath(EDGES, 'src', 'dst')).toEqual(['src', 'a', 'dst']);
  });

  it('returns [from] when unreachable', () => {
    const isolated = [{ a: 'x', b: 'y' }];
    expect(shortestPath(isolated, 'x', 'z')).toEqual(['x']);
  });

  it('handles from === to', () => {
    expect(shortestPath(EDGES, 'src', 'src')).toEqual(['src']);
  });
});

describe('computeRoute', () => {
  it('computes hops and deterministic latency with a fixed RNG', () => {
    // rng always 0.5 → per hop: latency + 0.5*jitter
    const r = computeRoute(EDGES, 'src', 'dst', {
      latencyPerHopMs: 10,
      jitterMs: 4,
      lossProbability: 0,
      rng: constRng(0.5),
    });
    expect(r.path).toEqual(['src', 'a', 'dst']);
    expect(r.hops).toBe(2);
    expect(r.totalLatencyMs).toBe(2 * 10 + Math.round(0.5 * 4 + 0.5 * 4));
    expect(r.lost).toBe(false);
    expect(r.unreachable).toBe(false);
  });

  it('drops the packet on the first hop with lossProbability=1', () => {
    const r = computeRoute(EDGES, 'src', 'dst', {
      lossProbability: 1,
      rng: constRng(0),
    });
    expect(r.lost).toBe(true);
    expect(r.lossAt).toBe('src');
    expect(r.hops).toBe(0);
    expect(r.totalLatencyMs).toBe(0);
  });

  it('drops mid-route and credits only hops before the loss', () => {
    // lossProbability 0.5, jitter 0 → exactly one RNG roll per hop:
    // roll 0.6 (survives hop 1), roll 0.4 (drops at hop 2)
    const rolls = [0.6, 0.4, 0.6, 0.4];
    let i = 0;
    const r = computeRoute(EDGES, 'src', 'dst', {
      latencyPerHopMs: 10,
      jitterMs: 0,
      lossProbability: 0.5,
      rng: () => rolls[i++ % rolls.length],
    });
    expect(r.lost).toBe(true);
    expect(r.lossAt).toBe('a'); // dropped while leaving router A toward dst
    expect(r.hops).toBe(1); // only the first hop completed
    expect(r.totalLatencyMs).toBe(0); // lost packets get no delivery time
  });

  it('reports unreachable when there is no path', () => {
    const r = computeRoute([{ a: 'x', b: 'y' }], 'x', 'z');
    expect(r.unreachable).toBe(true);
    expect(r.path).toEqual(['x']);
  });

  it('routes around a down node (failover)', () => {
    // Remove the direct src–a and a–dst edges: src must go src–b–dst
    const withoutA = [
      { a: 'src', b: 'b' },
      { a: 'b', b: 'dst' },
    ];
    const r = computeRoute(withoutA, 'src', 'dst');
    expect(r.path).toEqual(['src', 'b', 'dst']);
    expect(r.hops).toBe(2);
  });
});
