/**
 * Source data for the 1991–1996 "Linux" era (exhibit 06 — replaces the
 * 1993–1996 "Browsers & Personal Pages" exhibit).
 *
 * Every factual claim is tagged [L#] and listed in docs/SOURCES.md §L.
 * The "closed" fork is a LABELED HYPOTHETICAL ("WHAT IF?") — real Linux
 * went GPL (L2). Patch-mail lines in PATCH_POOL are ILLUSTRATIVE (see the
 * scene footnote).
 */

export type EraYear = 1991 | 1992 | 1996;
export type Branch = 'open' | 'closed';

export interface Chapter {
  year: EraYear;
  kicker: string;
  title: string;
  story: string;
  takeaway: string;
  tag: string;
}

export const CHAPTERS: Chapter[] = [
  {
    year: 1991,
    kicker: 'CHAPTER ONE — 1991',
    title: 'A hobby, announced in a forum',
    story:
      'A Finnish student in Helsinki, Linus Torvalds, is writing a small "hobby" kernel for his own PC and announces it to a public forum (comp.os.minix): it will be portable, and it is "free of all commercial interest." No company, no roadmap — just a kernel and an invitation (L1).',
    takeaway:
      'One person can start a platform — by posting the source and saying: anyone is welcome (L1).',
    tag: 'L1',
  },
  {
    year: 1992,
    kicker: 'CHAPTER TWO — 1992',
    title: 'The fork: open or closed',
    story:
      'The kernel is real — and now comes the decision. Keep the code private and one name owns every change… or adopt the GNU General Public License (v2, June 1991): anyone may copy and modify, but a version they share must stay free (L2). From release 0.12 the kernel is GPL. That choice, more than any code, decides what Linux becomes (L2).',
    takeaway:
      'Code can be kept or shared — and the license decides the future (L2).',
    tag: 'L2',
  },
  {
    year: 1996,
    kicker: 'CHAPTER THREE — 1996',
    title: 'It runs the Web',
    story:
      'Because the license is open, the kernel compounds: 1.0 ships in March 1994 (L3); 2.0 in 1996 adds SMP and 64-bit support (L4). By the mid-to-late 1990s it is quietly everywhere — web servers and TOP500 supercomputers — the engine of the 1990s web (L5).',
    takeaway:
      'Open code compounds: every patch becomes everyone\u2019s patch (L3–L5).',
    tag: 'L3–L5',
  },
];

export interface BranchDef {
  id: Branch;
  name: string;
  sub: string;
  echo: string;
  hypothetical: boolean;
}

export const BRANCHES: BranchDef[] = [
  {
    id: 'open',
    name: 'RELEASE UNDER THE GNU GPL',
    sub: 'OPEN — anyone may copy, modify, share; shared versions must stay free (L2)',
    echo: 'license: GNU GPL v2 — source ships with the code; the freedoms are permanent (L2)',
    hypothetical: false,
  },
  {
    id: 'closed',
    name: 'KEEP IT CLOSED',
    sub: 'PROPRIETARY — Linus owns the code; no public tree, no outside patches (hypothetical — real Linux went GPL, L2)',
    echo: 'license: PROPRIETARY — "all changes by L. Torvalds, no copying" (hypothetical)',
    hypothetical: true,
  },
];

export const BRANCH_BY_ID: Record<Branch, BranchDef> = {
  open: BRANCHES[0],
  closed: BRANCHES[1],
};

export interface KernelVersion {
  ver: string;
  when: string;
  note: string;
  /** open branch: how many received patches are needed to reach this release. */
  threshold: number;
}

export const VERSIONS: KernelVersion[] = [
  { ver: '0.12', when: 'Sept 1992', note: 'the first GPL release (L2)', threshold: 0 },
  { ver: '1.0', when: 'Mar 1994', note: 'the first "production" kernel (L3)', threshold: 5 },
  { ver: '2.0', when: '1996', note: 'SMP + 64-bit — built for servers (L4)', threshold: 12 },
];

/** Cap on received patches — after this the engine says "the community outgrew the inbox." */
export const MAX_PATCHES = 24;

export interface RunSite {
  id: string;
  label: string;
  text: string;
  tag: string;
}

export const RUNS: RunSite[] = [
  {
    id: 'web',
    label: 'WEB SERVERS',
    text: 'Free, stable and easy to get — by the mid-1990s it is a go-to operating system for web servers (L5).',
    tag: 'L5',
  },
  {
    id: 'top500',
    label: 'SUPERCOMPUTERS',
    text: 'By the late 1990s it is on the TOP500 — the fastest machines on Earth (L5).',
    tag: 'L5',
  },
  {
    id: 'today',
    label: 'TODAY (2026)',
    text: 'The machine hosting this museum is very likely running Linux. The hobby is still running.',
    tag: '—',
  },
];

/**
 * ILLUSTRATIVE patch-mail lines (not real messages) — the scene footnote
 * says so. Rotated in order by the engine (deterministic).
 */
export const PATCH_POOL: string[] = [
  'a1pha — patch: 386 interrupt tables fixed (4 lines)',
  'jgizmo — patch: IDE driver works on real hardware',
  'scooter — patch: sound-card support, 40 lines, "it beeps now"',
  'netman — patch: socket-buffer fix for the web server',
  'quiet-dev — patch: SMP wakeups (one line, huge win)',
  'vaxrefugee — patch: portability cleanups for my other box',
  'kernel-ml — 3 new contributors this week',
  'lurker — patch: tty driver fix, "finally logs in"',
  'first-timer — patch: "can I join? (read the FAQ?)" + 12 lines',
  'big-labs — note: NUMA observations for the server build',
];

export interface Milestone {
  when: string;
  label: string;
  inEra: boolean;
}

export const MILESTONES: Milestone[] = [
  { when: 'Jun 1991', label: 'GPL v2 published — the license the fork will hinge on (L2)', inEra: true },
  { when: 'Aug 1991', label: 'the kernel is announced on comp.os.minix (L1)', inEra: true },
  { when: 'Sept 1992', label: '0.12 — the first release under the GNU GPL (L2)', inEra: true },
  { when: 'Mar 1994', label: 'Linux 1.0 (L3)', inEra: true },
  { when: '1996', label: 'Linux 2.0 — SMP + 64-bit (L4)', inEra: true },
  { when: 'late 1990s', label: 'running web servers and TOP500 supercomputers (L5)', inEra: true },
  { when: '2026', label: 'the server behind this museum is probably running Linux (—)', inEra: false },
];

export const FACTS: { claim: string; tag: string }[] = [
  {
    claim: '1991 — a Finnish student\u2019s "hobby" kernel, announced public and free of all commercial interest (L1)',
    tag: 'L1',
  },
  { claim: '1992 — from release 0.12 the kernel is under the GNU GPL v2 (L2)', tag: 'L2' },
  { claim: '1994 — Linux 1.0 (L3)', tag: 'L3' },
  { claim: '1996 — Linux 2.0: SMP + 64-bit (L4)', tag: 'L4' },
  { claim: 'late 1990s — running web servers and TOP500 machines (L5)', tag: 'L5' },
];