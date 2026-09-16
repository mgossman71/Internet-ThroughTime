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
import { Expansion70sScene } from '../eras/expansion70s/Expansion70sScene';
import { Tcpip1983Scene } from '../eras/tcpip1983/Tcpip1983Scene';
import { DialupScene } from '../eras/dialup/DialupScene';
import { CernWebScene } from '../eras/cern-web/CernWebScene';
import { LinuxScene } from '../eras/linux90s/LinuxScene';
import { PortalScene } from '../eras/portal2000s/PortalScene';
import { EraPlaceholder } from '../components/EraPlaceholder';

const scenes: Record<string, EraDescriptor['Scene']> = {
  intro: IntroScene,
  arpanet: ArpanetScene,
  expansion70s: Expansion70sScene,
  tcpip1983: Tcpip1983Scene,
  dialup: DialupScene,
  'cern-web': CernWebScene,
  linux90s: LinuxScene,
  // Remaining eras use the placeholder until built (see AI_CHECKPOINT.md):
  portal2000s: PortalScene,
  broadband2000s: EraPlaceholder,
  mobile2010s: EraPlaceholder,
  infrastructure: EraPlaceholder,
  'ai-era': EraPlaceholder,
  future: EraPlaceholder,
};

const BUILT = new Set([
  'intro',
  'arpanet',
  'expansion70s',
  'tcpip1983',
  'dialup',
  'cern-web',
  'linux90s',
  'portal2000s',
]);

export const eraRegistry: EraDescriptor[] = ERA_LIST.map((data) => ({
  ...data,
  status: BUILT.has(data.id) ? 'built' : 'coming-soon',
  Scene: scenes[data.id] ?? EraPlaceholder,
}));
