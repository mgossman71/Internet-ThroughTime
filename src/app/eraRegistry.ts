/**
 * Era registry — maps era data (src/data/eraList.ts) to Scene components.
 *
 * DECISION: registry is the ONLY place that couples data to rendering.
 * Era scenes are lazy components under src/eras/<id>/.
 *
 * When an era is finished, change status to "built" in eraList.ts and
 * swap EraPlaceholder for the real scene here.
 */
import type { EraDescriptor } from '../types/era';
import { ERA_LIST } from '../data/eraList';
import { IntroScene } from '../eras/intro/IntroScene';
import { ArpanetScene } from '../eras/arpanet/ArpanetScene';
import { EraPlaceholder } from '../components/EraPlaceholder';

const scenes: Record<string, EraDescriptor['Scene']> = {
  intro: IntroScene,
  arpanet: ArpanetScene,
  // Remaining eras use the placeholder until built (see AI_CHECKPOINT.md):
  expansion70s: EraPlaceholder,
  tcpip1983: EraPlaceholder,
  dialup: EraPlaceholder,
  'cern-web': EraPlaceholder,
  'early-web': EraPlaceholder,
  portal2000s: EraPlaceholder,
  broadband2000s: EraPlaceholder,
  mobile2010s: EraPlaceholder,
  infrastructure: EraPlaceholder,
  'ai-era': EraPlaceholder,
  future: EraPlaceholder,
};

const BUILT = new Set(['intro', 'arpanet']);

export const eraRegistry: EraDescriptor[] = ERA_LIST.map((data) => ({
  ...data,
  status: BUILT.has(data.id) ? 'built' : 'coming-soon',
  Scene: scenes[data.id] ?? EraPlaceholder,
}));
