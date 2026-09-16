/**
 * Pure data for the 1986–1994 "BBS & Dial-Up" era (exhibit 04).
 *
 * Every historical claim carries a D1–D7 tag that maps to docs/SOURCES.md
 * ("BBS & dial-up (exhibit 04, 1986–1994)" section, verified 2026-09-16).
 * The BBS board, handle names and messages are ILLUSTRATIVE — the sources
 * document the phenomenon (D1–D5), not specific boards; the scene footnote
 * says so explicitly.
 */

export interface ModemSpec {
  id: string;
  name: string;
  rate: string; // "CONNECT" rate shown on the line
  bits: string; // human speed
  year: string;
  note: string;
  source: string;
}

export const MODEMS: readonly ModemSpec[] = [
  {
    id: 'v22',
    name: 'V.22',
    rate: '1200',
    bits: '1,200 bit/s',
    year: '1970s–80s',
    note: 'ITU-T standard — "1,200 bits by sending 600 symbols per second (600 baud) using phase-shift keying" (D3)',
    source: 'D3',
  },
  {
    id: 'v22bis',
    name: 'V.22bis',
    rate: '2400',
    bits: '2,400 bit/s',
    year: '1984',
    note: '"A 2,400-bit/s system similar in concept to the 1,200-bit/s Bell 212" (D3). The "hum of 2400 baud" era.',
    source: 'D3',
  },
  {
    id: 'v32',
    name: 'V.32',
    rate: '9600',
    bits: '9,600 bit/s',
    year: 'early 1990s',
    note: '"Introduced … but were expensive and were only starting to enter the market when V.32bis was standardized" (D4). "V.32 was dead, never having been really established."',
    source: 'D4',
  },
  {
    id: 'v32bis',
    name: 'V.32bis',
    rate: '14400',
    bits: '14,400 bit/s',
    year: '1992',
    note: 'Rockwell chipsets + a price war made 14.4k cheap: "V.32bis modems were widely available for $250" (D4).',
    source: 'D4',
  },
];

export const DEFAULT_MODEM = 'v22bis'; // the era's signature speed (D3)

export interface BoardSeed {
  id: string;
  author: string;
  subject: string;
  body: string;
}

/** Illustrative recreation — see deliberately-omitted list in SOURCES.md. */
export const BOARD_SEED: readonly BoardSeed[] = [
  {
    id: 'm1',
    author: 'SYSOP',
    subject: 'WELCOME TO THE BOARD',
    body: 'First time here? Grab a handle from the sysop, read the rules before you post, and keep the good humor. The coffee is on — the phone line is not (call at your own expense).',
  },
  {
    id: 'm2',
    author: 'DIALER_77',
    subject: 'TIPS FOR 2400 BAUD',
    body: 'If you drop mid-message, hang up and redial — the line recovers faster than your temper does. 9600 cards are fast if you can find one that answers; most of mine are eating my paycheck.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  detail: string;
  source: string;
  inEra: boolean; // false = "beyond this era" (shown as future)
}

export const MILESTONES: readonly Milestone[] = [
  {
    year: '1978',
    title: 'CBBS GOES ONLINE',
    detail:
      'Christensen + Suess (CACHE), Chicago: "CBBS officially went online on 16 February 1978" — patterned on the club\u2019s cork board (D1).',
    source: 'D1',
    inEra: true,
  },
  {
    year: '1980s',
    title: '1200 → 2400 "FAIRLY RAPIDLY"',
    detail:
      '1200-bit/s modems in the early 1980s, "giving way to 2400 bit/s fairly rapidly"; GUIs "began to be practical at 2400 bit/s" (D3, D5).',
    source: 'D3/D5',
    inEra: true,
  },
  {
    year: '1984',
    title: 'V.22BIS — 2,400 BIT/S',
    detail: '"In 1984, V.22bis was created, a 2,400-bit/s system similar in concept to the 1,200-bit/s Bell 212" (D3).',
    source: 'D3',
    inEra: true,
  },
  {
    year: 'early 90s',
    title: '9600 (V.32) ARRIVES, THEN…',
    detail:
      '"A lengthy delay before 9600 bit/s models began to appear" (D4).',
    source: 'D4',
    inEra: true,
  },
  {
    year: '1992',
    title: 'V.32BIS — 14.4K, PRICE WAR',
    detail:
      'Rockwell chips + aggressive pricing: "by the end of the year V.32 was dead, never having been really established" (D4).',
    source: 'D4',
    inEra: true,
  },
  {
    year: '1995',
    title: 'THE WEB TAKES OVER',
    detail:
      '"The sudden obsolescence of bulletin board technology in 1995" (D6). Beyond this era — see the next exhibit.',
    source: 'D6',
    inEra: false,
  },
];

export const FACTS: readonly { text: string; source: string }[] = [
  {
    text: '"The first public dial-up BBS was developed by Ward Christensen and Randy Suess, members of the Chicago Area Computer Hobbyists\u2019 Exchange (CACHE)" — CBBS went online 16 February 1978 (D1).',
    source: 'D1',
  },
  {
    text: 'The Hayes Smartmodem and its command set "became a de facto standard" — "a key innovation required for the popularization of the BBS" (D2).',
    source: 'D2',
  },
  {
    text: 'Most BBS content was "ordinary ASCII text or ANSI art"; character-based GUIs "began to be practical at 2400 bit/s" (D5).',
    source: 'D5',
  },
  {
    text: '"In the 1990s, tens of millions of people in the United States alone used dial-up modems for internet access" (D7).',
    source: 'D7',
  },
  {
    text: 'A 1994 finding: 60% of US households had a modem, but only 7% went online (D7).',
    source: 'D7',
  },
];

export const LEDE =
  'One phone line, one modem, one board. Before anyone had a website, the ' +
  'Internet\u2019s evening shift ran through hundreds of thousands of ' +
  'bulletin boards — dialed in, logged on, and kept alive at 1200, 2400, ' +
  '9600, then 14.4k bits per second (D1–D5).';

export const FOOTNOTE =
  'SIMPLIFIED SIMULATION — the board, handle names and messages are an ' +
  'illustrative recreation of BBS culture (D1–D5); the sources document the ' +
  'phenomenon, not a specific board. Ringing/handshake timing is staged for ' +
  'clarity, not protocol-accurate.';
