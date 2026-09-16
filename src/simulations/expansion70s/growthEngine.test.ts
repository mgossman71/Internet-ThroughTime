/**
 * growthEngine unit tests — pure logic, no DOM.
 */
import { describe, expect, it } from 'vitest';
import {
  clampYear,
  graphAtYear,
  isActiveNode,
  milestoneFor,
  milestonesThrough,
  nextMilestone,
  siteCountAt,
} from './growthEngine';

describe('growthEngine', () => {
  it('starts with the four 1969 hosts and their three links', () => {
    const g = graphAtYear(1969);
    expect(g.nodes.map((n) => n.id).sort()).toEqual(['sri', 'ucla', 'ucsb', 'ut']);
    expect(g.links).toHaveLength(3);
  });

  it('adds BBN (1970) and the first TIP (1971) but no international nodes yet', () => {
    const g = graphAtYear(1971);
    expect(g.nodes.map((n) => n.id).sort()).toEqual([
      'bbn',
      'sri',
      'tip1',
      'ucla',
      'ucsb',
      'ut',
    ]);
    expect(g.nodes.every((n) => !n.international)).toBe(true);
  });

  it('reaches the first international nodes in 1973', () => {
    const g = graphAtYear(1973);
    const intl = g.nodes
      .filter((n) => n.international)
      .map((n) => n.id)
      .sort();
    expect(intl).toEqual(['london', 'rre']);
    expect(g.links.some((l) => l.a === 'bbn' && l.b === 'london')).toBe(true);
    expect(g.links.some((l) => l.a === 'bbn' && l.b === 'rre')).toBe(true);
  });

  it('reports the last documented site count at or before the year', () => {
    expect(siteCountAt(1971)).toBe(4); // holds the 1969 figure (no newer checkpoint)
    expect(siteCountAt(1972)).toBe(24);
    expect(siteCountAt(1975)).toBe(62); // holds the mid-1974 figure
    expect(siteCountAt(1977)).toBe(111);
    expect(siteCountAt(1982)).toBe(111); // holds last documented figure
  });

  it('finds milestones and the next one after a year', () => {
    expect(milestoneFor(1974)?.title).toBe('62 sites + TCP spec');
    expect(milestonesThrough(1975).map((m) => m.year)).toEqual([
      1970, 1971, 1972, 1973, 1974, 1975,
    ]);
    expect(nextMilestone(1975)?.year).toBe(1977);
    expect(nextMilestone(1981)).toBeUndefined();
  });

  it('clamps years to the exhibit range and honors node join years', () => {
    expect(clampYear(1955)).toBe(1969);
    expect(clampYear(2020)).toBe(1982);
    expect(isActiveNode('rre', 1972)).toBe(false);
    expect(isActiveNode('rre', 1982)).toBe(true);
  });
});
