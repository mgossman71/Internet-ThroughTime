/**
 * ARPANET 1969 — data + historically grounded copy.
 *
 * HISTORY POLICY: only claims backed by docs/SOURCES.md are asserted as fact.
 * The "first message / LO crash" story is presented as the standard account.
 */

export interface ArpanetNode {
  id: string;
  label: string;
  organization: string;
  host: string;
  /** Normalized position (0..1) approximating US geography. */
  x: number;
  y: number;
}

/**
 * The first four ARPANET hosts, connected one at a time through late 1969
 * (SRI first, then UCLA, then UCSB, then Utah — the standard account).
 * Sources: see docs/SOURCES.md.
 */
export const ARPANET_NODES_1969: readonly ArpanetNode[] = [
  {
    id: 'sri',
    label: 'SRI',
    organization: 'Stanford Research Institute',
    host: 'SDS 940',
    x: 0.16,
    y: 0.26,
  },
  {
    id: 'ucla',
    label: 'UCLA',
    organization: 'University of California, Los Angeles',
    host: 'SDS 940',
    x: 0.12,
    y: 0.66,
  },
  {
    id: 'ucsb',
    label: 'UCSB',
    organization: 'UC Santa Barbara',
    host: 'IBM 360/75',
    x: 0.34,
    y: 0.46,
  },
  {
    id: 'utah',
    label: 'UTAH',
    organization: 'University of Utah',
    host: 'IBM 360/75',
    x: 0.62,
    y: 0.3,
  },
] as const;

/** Full mesh of the four initial IMP circuits. */
export const ARPANET_LINKS_1969: ReadonlyArray<readonly [string, string]> = [
  ['sri', 'ucla'],
  ['sri', 'ucsb'],
  ['sri', 'utah'],
  ['ucla', 'ucsb'],
  ['ucsb', 'utah'],
] as const;

/** Nodes already online at the start of the exhibit (first link: SRI↔UCLA). */
export const ARPANET_ONLINE_AT_START: readonly string[] = ['sri', 'ucla'];

export const ARPANET_CONTEXT = {
  lead: 'Late 1969. A new kind of network is coming online — not for making calls, but for sharing computers.',
  facts: [
    'Funded by ARPA (now DARPA); the project began in 1966, led by Bob Taylor with Larry Roberts as program manager.',
    'Packet switching — breaking messages into small datagrams with their own addresses — was pioneered independently by Paul Baran (RAND) and Donald Davies (UK NPL).',
    'Bolt Beranek and Newman (BBN) built the IMPs — the switching boxes at each site. The NCP protocol team included Frank Heart and Robert Kahn.',
    'The first four hosts came online one at a time through late 1969: Stanford Research Institute (SRI), UCLA, UC Santa Barbara, and the University of Utah.',
    'The standard account: the first message, typed from UCLA, was LOGIN — the far end crashed after two characters. The SRI operator rebooted; LOGIN went through.',
  ],
  footnote:
    'Simplified simulation. Names, dates, and events follow documented history (see Sources in repository docs); timings and behavior are illustrative.',
} as const;
