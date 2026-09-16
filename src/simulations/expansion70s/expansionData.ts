/**
 * 1971–1982 expansion — data + historically grounded copy.
 *
 * HISTORY POLICY: only claims backed by docs/SOURCES.md (E1–E10) are
 * asserted as fact. Named sites are documented; the map's aggregated
 * background dots and link routes are explicitly labeled illustrative.
 */

export interface ExpansionNode {
  id: string;
  label: string;
  organization: string;
  /** Year the site joined the network (documented). */
  year: number;
  /** Normalized position (0..1) on the world-style map stage. */
  x: number;
  y: number;
  international?: boolean;
}

export interface ExpansionLink {
  a: string;
  b: string;
  /** Year the link went into service (illustrative topology). */
  year: number;
}

export interface GrowthCheckpoint {
  year: number;
  sites: number;
}

export interface Milestone {
  year: number;
  title: string;
  detail: string;
}

/**
 * Documented named sites. The four 1969 hosts continue from exhibit 01.
 * BBN: first east-coast node, March 1970 (E10). TIP #1: first Terminal
 * Interface Processor, September 1971 (E3). London + Norway: first
 * international nodes, 1973 (E2).
 */
export const EXPANSION_NODES: readonly ExpansionNode[] = [
  {
    id: 'ucla',
    label: 'UCLA',
    organization: 'University of California, Los Angeles',
    year: 1969,
    x: 0.09,
    y: 0.7,
  },
  {
    id: 'ucsb',
    label: 'UCSB',
    organization: 'UC Santa Barbara',
    year: 1969,
    x: 0.06,
    y: 0.48,
  },
  {
    id: 'sri',
    label: 'SRI',
    organization: 'Stanford Research Institute',
    year: 1969,
    x: 0.15,
    y: 0.34,
  },
  {
    id: 'ut',
    label: 'UTAH',
    organization: 'University of Utah',
    year: 1969,
    x: 0.3,
    y: 0.3,
  },
  {
    id: 'bbn',
    label: 'BBN',
    organization: 'Bolt Beranek and Newman — first east coast node',
    year: 1970,
    x: 0.42,
    y: 0.26,
  },
  {
    id: 'tip1',
    label: 'TIP #1',
    organization: 'First Terminal Interface Processor — dial-in terminals',
    year: 1971,
    x: 0.24,
    y: 0.6,
  },
  {
    id: 'london',
    label: 'LONDON',
    organization: 'University College London, United Kingdom',
    year: 1973,
    x: 0.72,
    y: 0.24,
    international: true,
  },
  {
    id: 'rre',
    label: 'NORWAY',
    organization: 'Royal Radar Establishment, Norway',
    year: 1973,
    x: 0.8,
    y: 0.11,
    international: true,
  },
] as const;

/** Simplified topology — NOT the exact historical circuit map (E2, E10). */
export const EXPANSION_LINKS: readonly ExpansionLink[] = [
  { a: 'sri', b: 'ucla', year: 1969 },
  { a: 'sri', b: 'ucsb', year: 1969 },
  { a: 'sri', b: 'ut', year: 1969 },
  { a: 'sri', b: 'bbn', year: 1970 },
  { a: 'ucla', b: 'tip1', year: 1971 },
  { a: 'bbn', b: 'london', year: 1973 },
  { a: 'bbn', b: 'rre', year: 1973 },
] as const;

/**
 * Documented site counts (E1). Only years with a documented figure are
 * included — we do not interpolate between them.
 */
export const GROWTH_CHECKPOINTS: readonly GrowthCheckpoint[] = [
  { year: 1969, sites: 4 },
  { year: 1972, sites: 24 },
  { year: 1973, sites: 37 },
  { year: 1974, sites: 62 },
  { year: 1977, sites: 111 },
] as const;

/** Milestones shown on the timeline strip (all traceable in docs/SOURCES.md). */
export const MILESTONES: readonly Milestone[] = [
  {
    year: 1970,
    title: 'East coast arrives',
    detail: 'BBN joins in March 1970 — the first ARPANET node on the US east coast.',
  },
  {
    year: 1971,
    title: 'Terminals & email',
    detail:
      'The first TIP lets dial-in terminals join (up to 63 per TIP); Ray Tomlinson sends the first message between machines, introducing the @ address.',
  },
  {
    year: 1972,
    title: '24 sites',
    detail:
      '24 sites by the end of 1972, including DoD, NSF and NASA; ARPANET is demonstrated at the international conference on computer communications in October.',
  },
  {
    year: 1973,
    title: 'International',
    detail:
      '37 sites; University College London and Norway’s Royal Radar Establishment become the first international nodes; a satellite link reaches Hawaii.',
  },
  {
    year: 1974,
    title: '62 sites + TCP spec',
    detail:
      '62 computers connected; RFC 675 — the first “Internet Transmission Control Program” specification — is published.',
  },
  {
    year: 1975,
    title: 'New operators',
    detail: 'DARPA transfers ARPANET operation to the Defense Communications Agency.',
  },
  {
    year: 1977,
    title: '111 sites',
    detail: '111 computers on the network by March 1977 — the year of the famous logical map.',
  },
  {
    year: 1981,
    title: 'The standards',
    detail:
      'September 1981: RFC 791 (IP), RFC 792 (ICMP) and RFC 793 (TCP) define the DoD standard internetworking suite.',
  },
] as const;

export const EXPANSION_CONTEXT = {
  lead: '1971–1982. A four-node experiment becomes a network of networks — crossing oceans, gaining terminal access, inventing email, and quietly specifying the protocols that will outlive it.',
  facts: [
    'Documented growth: 4 hosts (1969) → 24 sites (end of 1972) → 37 (end of 1973) → 62 (mid-1974) → 111 (March 1977).',
    '1973: the first international nodes join — University College London (UK) and Norway’s Royal Radar Establishment; a satellite link also connects Hawaii.',
    '1971: Ray Tomlinson (BBN) extends the SNDMSG program to copy messages between ARPANET machines, introducing the user@machine address — email’s origin.',
    'September 1971: the first Terminal Interface Processor (TIP) lets up to 63 ordinary dial-in terminals share one network port.',
    '1974: RFC 675 — “Specification of Internet Transmission Control Program” (Cerf, Dalal and Sunshine) — the first published TCP design for connecting different networks.',
    'September 1981: the DoD standard specifications for IP (RFC 791), ICMP (RFC 792) and TCP (RFC 793) are published, edited by Jon Postel.',
    'From 1975 the Defense Communications Agency operates the network, having taken over from DARPA.',
  ],
  footnote:
    'Simplified simulation. Named sites, counts and RFCs follow documented history (see docs/SOURCES.md, E1–E10); background dots and link routes are illustrative, not the historical circuit map.',
} as const;

