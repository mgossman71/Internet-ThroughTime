/**
 * growthEngine — pure logic for the 1971–1982 exhibit (no React, no DOM).
 *
 * Answers, for any year: which documented named sites were active,
 * which (illustrative) links existed, the last documented site count,
 * and where the milestones fall. Deterministic and unit-testable.
 */
import {
  EXPANSION_LINKS,
  EXPANSION_NODES,
  GROWTH_CHECKPOINTS,
  MILESTONES,
  type ExpansionLink,
  type ExpansionNode,
  type Milestone,
} from './expansionData';

export const ERA_MIN_YEAR = 1969;
export const ERA_MAX_YEAR = 1982;

export interface GraphSnapshot {
  nodes: readonly ExpansionNode[];
  links: readonly ExpansionLink[];
}

export function clampYear(year: number): number {
  if (!Number.isFinite(year)) return ERA_MIN_YEAR;
  const y = Math.floor(year);
  return Math.min(ERA_MAX_YEAR, Math.max(ERA_MIN_YEAR, y));
}

/** Named sites and links active at `year` (both `addedYear <= year`). */
export function graphAtYear(year: number): GraphSnapshot {
  const y = clampYear(year);
  return {
    nodes: EXPANSION_NODES.filter((n) => n.year <= y),
    links: EXPANSION_LINKS.filter((l) => l.year <= y),
  };
}

export function isActiveNode(id: string, year: number): boolean {
  return EXPANSION_NODES.some((n) => n.id === id && n.year <= clampYear(year));
}

/**
 * The last documented site count at or before `year` (null when no
 * documented checkpoint exists yet — we never interpolate).
 */
export function siteCountAt(year: number): number | null {
  const y = clampYear(year);
  let result: number | null = null;
  for (const cp of GROWTH_CHECKPOINTS) {
    if (cp.year <= y) result = cp.sites;
    else break;
  }
  return result;
}

export function milestoneFor(year: number): Milestone | undefined {
  return MILESTONES.find((m) => m.year === clampYear(year));
}

/** Milestones from `year` and earlier, oldest first. */
export function milestonesThrough(year: number): Milestone[] {
  return MILESTONES.filter((m) => m.year <= clampYear(year));
}

/** The earliest milestone strictly after `year` (undefined when none). */
export function nextMilestone(year: number): Milestone | undefined {
  return MILESTONES.find((m) => m.year > clampYear(year));
}
