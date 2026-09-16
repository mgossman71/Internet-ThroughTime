/**
 * 1983 protocol switch — data + historically grounded copy.
 *
 * HISTORY POLICY: only claims backed by docs/SOURCES.md (P1–P7) are
 * asserted as fact. Named sites continue from exhibit 02 (documented
 * join years live there); link routes are simplified/illustrative, and
 * the mid-1983 "straggler" host is an illustrative stand-in — the
 * sources document the exception (P4), not which site kept NCP.
 */

export type Protocol = 'ncp' | 'tcpi';

export interface SwitchNode {
  id: string;
  label: string;
  organization: string;
  /** Normalized position (0..1) on the map stage. */
  x: number;
  y: number;
  international?: boolean;
}

export interface SwitchLink {
  a: string;
  b: string;
  /** Appears only after flag day (the MILNET split-off, P5). */
  postFlagDay?: boolean;
}

export interface DeskRow {
  aspect: string;
  ncp: string;
  tcpi: string;
}

export interface SwitchMilestone {
  id: string;
  year: string;
  title: string;
  detail: string;
}

/** The eight named hosts continue from exhibit 02 (same ids/positions). */
export const SWITCH_NODES: readonly SwitchNode[] = [
  { id: 'ucla', label: 'UCLA', organization: 'University of California, Los Angeles', x: 0.09, y: 0.7 },
  { id: 'ucsb', label: 'UCSB', organization: 'UC Santa Barbara', x: 0.06, y: 0.48 },
  { id: 'sri', label: 'SRI', organization: 'Stanford Research Institute', x: 0.15, y: 0.34 },
  { id: 'ut', label: 'UTAH', organization: 'University of Utah', x: 0.3, y: 0.3 },
  { id: 'bbn', label: 'BBN', organization: 'Bolt Beranek and Newman — first east coast node', x: 0.42, y: 0.26 },
  { id: 'tip1', label: 'TIP #1', organization: 'First Terminal Interface Processor — dial-in terminals', x: 0.24, y: 0.6 },
  { id: 'london', label: 'LONDON', organization: 'University College London, United Kingdom', x: 0.72, y: 0.24, international: true },
  { id: 'rre', label: 'NORWAY', organization: 'Royal Radar Establishment, Norway', x: 0.8, y: 0.11, international: true },
] as const;

/** MILNET — splits off from the ARPANET in 1983 (P5). Illustrative position. */
export const MILNET_NODE: SwitchNode = {
  id: 'milnet',
  label: 'MILNET',
  organization: 'Military-only network — split off from the ARPANET in 1983',
  x: 0.6,
  y: 0.68,
};

/**
 * Illustrative stand-in: the site shown as "by exception" after flag day
 * (P4 documents that special cases existed — not which site).
 */
export const STRAGGLER_NODE = 'tip1';

export const LABELS: Record<string, string> = {
  ...Object.fromEntries(SWITCH_NODES.map((n) => [n.id, n.label])),
  [MILNET_NODE.id]: MILNET_NODE.label,
};

/** Simplified topology — NOT the exact historical circuit map. */
export const SWITCH_LINKS: readonly SwitchLink[] = [
  { a: 'sri', b: 'ucla' },
  { a: 'sri', b: 'ucsb' },
  { a: 'sri', b: 'ut' },
  { a: 'sri', b: 'bbn' },
  { a: 'ucla', b: 'tip1' },
  { a: 'bbn', b: 'london' },
  { a: 'bbn', b: 'rre' },
  { a: 'bbn', b: 'milnet', postFlagDay: true },
] as const;

/** Protocol desk — NCP vs TCP/IP (P2, P3, P6 only — verified claims). */
export const PROTOCOL_DESK: readonly DeskRow[] = [
  {
    aspect: 'TRANSPORT',
    ncp: 'Simplex — two one-way ports per application (an odd and an even port)',
    tcpi: 'One duplex port per connection (TCP)',
  },
  {
    aspect: 'REACH',
    ncp: 'One network: the hosts of the ARPANET',
    tcpi: 'An internet of networks — "hosts in other networks participating in the ARPA Internet"',
  },
  {
    aspect: 'STANDARDS',
    ncp: 'The ARPANET host-to-host protocol',
    tcpi: '"DoD wide standards for all DoD packet networks" (RFC 801)',
  },
  {
    aspect: 'NAME',
    ncp: 'Originally "Network Control Program" — the protocol name came later, organically',
    tcpi: 'IP + TCP, from the 1973 work described in RFC 801',
  },
] as const;

/** Milestone strip 1981 → mid-1983 (all traceable in docs/SOURCES.md). */
export const SWITCH_MILESTONES: readonly SwitchMilestone[] = [
  {
    id: 'plan',
    year: '1981',
    title: 'RFC 801 — the transition plan',
    detail:
      'The ARPANET host-to-host protocol is "inadequate" for the new networks. IP + TCP are the DoD-wide standard; implementation must begin "no later than 1 January 1982 in any case".',
  },
  {
    id: 'flagday',
    year: 'JAN 1 1983',
    title: 'FLAG DAY',
    detail:
      'The ARPANET switches from NCP to TCP/IP in one mandatory flag-day transition — the date widely marked as the birth of the Internet.',
  },
  {
    id: 'milnet',
    year: '1983',
    title: 'MILNET splits off',
    detail: 'An unclassified military-only network called MILNET split off from the ARPANET.',
  },
  {
    id: 'stragglers',
    year: 'MID 1983',
    title: 'The stragglers',
    detail:
      'A number of sites continued use of NCP into mid-1983 — special cases that required permission from the backbone operators.',
  },
] as const;

export const PROTOCOL_CONTEXT = {
  lead: '1983. The decade-old network speaks a protocol that cannot reach beyond itself. One plan (RFC 801, 1981), one deadline, one day: the ARPANET switches its stack — NCP out, TCP/IP in.',
  facts: [
    'November 1981 — RFC 801, the "NCP/TCP transition plan" (J. Postel, ISI): the ARPANET host-to-host protocol was "inadequate" for the new networks; work had begun in 1973 on a host-to-host protocol for "use across all these networks" (P2).',
    'RFC 801: IP and TCP "allow all hosts in the interconnected set of these networks to share a common interprocess communication environment" — the ARPA Internet, "sometimes called the Catenet" (P2).',
    'RFC 801: the Department of Defense "recently adopted the internet concept and the IP and TCP protocols in particular as DoD wide standards for all DoD packet networks" (P2).',
    'January 1, 1983 — the mandatory flag-day transition: the ARPANET switched from NCP to TCP/IP. The date is widely marked as the birth of the Internet (e.g. Google, Jan 1, 2013) (P1).',
    '1983 — an unclassified military-only network called MILNET split off from the ARPANET (P5).',
    'NCP was a simplex protocol: an odd and an even port were reserved for each application; TCP and UDP reduced the need for two simplex ports to one duplex port (P3).',
    'Despite the mandatory flag-day transition, a number of sites continued use of NCP into mid-1983 — special cases that required permission from the backbone operators (P4).',
    'The name "NCP" originally referred to the Network Control Program; the protocol-name backronym was created later, organically (P6).',
  ],
  footnote:
    'Simplified simulation. The NCP/TCP contrast, RFC 801 quotes, the Jan 1, 1983 cutover, the MILNET split-off and the mid-1983 exceptions follow documented history (docs/SOURCES.md P1–P7). Link routes are illustrative, not the historical circuit map, and the "straggler" host shown is an illustrative stand-in — the sources document the exception, not which site kept NCP.',
} as const;

