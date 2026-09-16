/**
 * routingEngine — pure packet-routing simulation logic (no React, no DOM).
 *
 * Models an unweighted network: shortest path by hop count (BFS),
 * per-hop latency with jitter, and per-hop packet loss.
 * This mirrors how early ARPANET-era routing worked: hop-by-hop,
 * stateless, each IMP deciding the next hop independently.
 */

export interface GraphNode {
  id: string;
  label?: string;
}

export interface GraphEdge {
  a: string;
  b: string;
}

export interface RouteOptions {
  /** Base latency per hop in ms (default 20). */
  latencyPerHopMs?: number;
  /** Random jitter added per hop, ms (default 5). */
  jitterMs?: number;
  /** Probability (0..1) that any given hop loses the packet (default 0). */
  lossProbability?: number;
  /** Injectable RNG for deterministic tests (default Math.random). */
  rng?: () => number;
}

export interface RouteResult {
  /** Node ids from source to destination (inclusive). */
  path: string[];
  /** Number of hops taken (edges traversed) before delivery or loss. */
  hops: number;
  /** Simulated end-to-end latency in ms (0 if lost before completing). */
  totalLatencyMs: number;
  /** True if the packet was dropped at some hop. */
  lost: boolean;
  /** The node at which the packet was dropped, if lost. */
  lossAt: string | null;
  /** True if destination is unreachable at all. */
  unreachable: boolean;
}

export type Rng = () => number;

export function buildAdjacency(edges: readonly GraphEdge[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  const add = (from: string, to: string) => {
    const list = adj.get(from) ?? [];
    list.push(to);
    adj.set(from, list);
  };
  for (const e of edges) {
    add(e.a, e.b);
    add(e.b, e.a);
  }
  // Deterministic ordering for stable tie-breaking.
  for (const list of adj.values()) list.sort();
  return adj;
}

/** BFS shortest path by hop count. Returns [from, ...] even when unreachable. */
export function shortestPath(
  edges: readonly GraphEdge[],
  from: string,
  to: string,
): string[] {
  if (from === to) return [from];
  const adj = buildAdjacency(edges);
  if (!adj.has(from) || !adj.has(to)) return [from];

  const queue: string[] = [from];
  const prev = new Map<string, string>();
  prev.set(from, from);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === to) break;
    for (const next of adj.get(current) ?? []) {
      if (!prev.has(next)) {
        prev.set(next, current);
        queue.push(next);
      }
    }
  }

  if (!prev.has(to)) return [from]; // unreachable

  const path: string[] = [];
  let cursor: string | undefined = to;
  while (cursor) {
    path.unshift(cursor);
    if (cursor === from) break;
    cursor = prev.get(cursor);
  }
  return path;
}

/**
 * Compute a route and simulate per-hop latency/loss.
 * Pure and deterministic given an RNG.
 */
export function computeRoute(
  edges: readonly GraphEdge[],
  from: string,
  to: string,
  opts: RouteOptions = {},
): RouteResult {
  const path = shortestPath(edges, from, to);
  const unreachable = path.length < 2;

  const latencyPerHop = opts.latencyPerHopMs ?? 20;
  const jitter = opts.jitterMs ?? 5;
  const lossProbability = opts.lossProbability ?? 0;
  const rng: Rng = opts.rng ?? Math.random;

  let total = 0;
  let hops = 0;
  let lost = false;
  let lossAt: string | null = null;

  for (let i = 0; i < path.length - 1; i++) {
    const atNode = path[i];
    if (rng() < lossProbability) {
      lost = true;
      lossAt = atNode;
      break;
    }
    // Zero jitter must be fully deterministic (and not consume an RNG roll).
    total += latencyPerHop + (jitter > 0 ? rng() * jitter : 0);
    hops++;
  }

  return {
    path,
    hops,
    totalLatencyMs: lost ? 0 : Math.round(total),
    lost,
    lossAt,
    unreachable,
  };
}
