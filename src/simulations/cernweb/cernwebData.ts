/**
 * Pure data for the 1989–1993 "CERN & the Web" era (exhibit 05).
 *
 * Every historical claim carries a W1–W7 tag that maps to docs/SOURCES.md
 * ("CERN & the Web (exhibit 05, 1989–1993)" section, verified 2026-09-16).
 *
 * IMPORTANT: the 1990 "first browser/server" is attributed to CERN (Berners-Lee),
 * NOT W3C — W3C was formed in 1994 (outside this era's window). See W2/W6.
 *
 * The browser PAGES are an ILLUSTRATIVE recreation of the first website
 * (info.cern.ch) and its linked sub-pages; the sources document the first
 * page and its date (W3), not the exact sub-page bodies. The scene footnote
 * says so explicitly.
 */

export type EraYear = 1989 | 1990 | 1991 | 1993;

export interface YearCard {
  year: EraYear;
  title: string;
  body: string; // claim text, carries a W-tag
  source: string;
}

export const YEARS: readonly YearCard[] = [
  {
    year: 1989,
    title: 'A PROPOSAL AT CERN',
    body:
      'Tim Berners-Lee invents the Web at CERN and proposes a ' +
      '\u201cuniversal linked information system\u201d — the \u201cinformation ' +
      'management\u201d proposal of 12 March 1989 (W1).',
    source: 'W1',
  },
  {
    year: 1990,
    title: 'FIRST BROWSER + SERVER',
    body:
      'At CERN, the first web browser and web page editor ' +
      '(WorldWideWeb) is written on a NeXT computer in the second half of ' +
      '1990 (W2). It doubles as the first WYSIWYG HTML editor.',
    source: 'W2',
  },
  {
    year: 1991,
    title: 'THE FIRST WEBSITE',
    body:
      'The first website goes live at info.cern.ch on 6 August 1991 (W3); ' +
      'the browser becomes available to the general public in August 1991. ' +
      'The Web goes public (W4).',
    source: 'W3/W4',
  },
  {
    year: 1993,
    title: 'PUT INTO THE PUBLIC DOMAIN',
    body:
      'On 30 April 1993 the source code is released into the public ' +
      'domain — no licence, no royalties (W5). Anyone, anywhere, can use ' +
      'and build on it.',
    source: 'W5',
  },
];

export interface WebPage {
  id: string;
  title: string; // <title> shown in the window bar
  url: string; // shown in the URL bar
  body: string[]; // paragraphs (illustrative recreation)
  links: { label: string; target: string }[];
}

/** Illustrative recreation of the first site — see SOURCES.md omissions. */
export const PAGES: readonly WebPage[] = [
  {
    id: 'home',
    title: 'Information Management: A Proposal',
    url: 'http://info.cern.ch',
    body: [
      'This is a short summary of the WorldWideWeb project. It describes a ' +
      'system for sharing documents and information between computers.',
      'The basic idea is to link information: a document can point to ' +
      'another, and following a link takes you there. This exhibit is a ' +
      'recreation, not the original page.',
    ],
    links: [
      { label: 'Guide to the Web', target: 'guide' },
      { label: 'Frequently Asked Questions', target: 'faq' },
      { label: 'News', target: 'news' },
    ],
  },
  {
    id: 'guide',
    title: 'Guide to the Web',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    body: [
      'To read a document, open it in the browser. Blue underlined words ' +
      'are links — choose one to jump to another document.',
      'This is how the Web works: links between documents, across machines, ' +
      'across the world.',
    ],
    links: [{ label: 'Back to the proposal', target: 'home' }],
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    body: [
      'What is the WorldWideWeb? A system of linked documents that anyone ' +
      'can read and add to.',
      'Who runs it? It began at CERN. In 1993 the software was put into ' +
      'the public domain, so now everyone can run it.',
    ],
    links: [{ label: 'Back to the proposal', target: 'home' }],
  },
  {
    id: 'news',
    title: 'News',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    body: [
      '1991 — the Web is opening to the outside world. Universities and ' +
      'labs begin to publish their own documents and link to each other.',
      '1993 — CERN places the WorldWideWeb software in the public domain. ' +
      'No licence, no charge. The Web is now free for everyone.',
    ],
    links: [{ label: 'Back to the proposal', target: 'home' }],
  },
];

export const PAGE_BY_ID: Record<string, WebPage> = Object.fromEntries(
  PAGES.map((p) => [p.id, p]),
);

/** Which pages are reachable in each year (the browser's reach). */
export const REACHABLE: Record<EraYear, readonly string[]> = {
  1989: [], // no browser yet
  1990: ['home'], // first browser + server — project page only
  1991: ['home', 'guide', 'faq', 'news'],
  1993: ['home', 'guide', 'faq', 'news'],
};

export interface Milestone {
  year: string;
  title: string;
  detail: string;
  source: string;
  inEra: boolean; // false = "beyond this era" (shown as future)
}

export const MILESTONES: readonly Milestone[] = [
  {
    year: '1989',
    title: 'THE PROPOSAL',
    detail:
      '12 March 1989 — Berners-Lee proposes a "universal linked information ' +
      'system" at CERN (W1).',
    source: 'W1',
    inEra: true,
  },
  {
    year: '1990',
    title: 'FIRST BROWSER + SERVER',
    detail:
      'WorldWideWeb — first web browser and page editor — written on a NeXT ' +
      'at CERN, second half of 1990 (W2).',
    source: 'W2',
    inEra: true,
  },
  {
    year: '1991',
    title: 'FIRST WEBSITE — GOES PUBLIC',
    detail:
      'info.cern.ch live 6 August 1991 (W3); browser available to the public ' +
      'in August 1991 (W4).',
    source: 'W3/W4',
    inEra: true,
  },
  {
    year: '1993',
    title: 'PUBLIC DOMAIN — NO LICENCE',
    detail:
      '30 April 1993 — source released into the public domain; no licence, ' +
      'no royalties (W5).',
    source: 'W5',
    inEra: true,
  },
  {
    year: '1994',
    title: 'W3C IS FORMED',
    detail:
      'The World Wide Web Consortium is founded to lead the Web\u2019s ' +
      'development (CERN 1989–1994, W3C 1994–present). Beyond this era — ' +
      'see the next exhibit.',
    source: 'W6',
    inEra: false,
  },
];

export const FACTS: readonly { text: string; source: string }[] = [
  {
    text: 'Tim Berners-Lee "invented the World Wide Web while working at ' +
      'CERN in 1989. He proposed a \u2018universal linked information ' +
      'system\u2019" (W1).',
    source: 'W1',
  },
  {
    text: 'WorldWideWeb "is the first web browser and web page editor", ' +
      'written "on a NeXT Computer during the second half of 1990, while ' +
      'working for CERN" (W2).',
    source: 'W2',
  },
  {
    text: 'The first website (info.cern.ch) — "First published 6 August ' +
      '1991" (W3).',
    source: 'W3',
  },
  {
    text: 'The browser "became available to the general public in August ' +
      '1991" (W4).',
    source: 'W4',
  },
  {
    text: '"The source code was released into the public domain on 30 ' +
      'April 1993" — "the document that officially put the World Wide Web ' +
      'into the public domain" (W5).',
    source: 'W5',
  },
];

export const LEDE =
  'One proposal, one NeXT computer, one page with blue underlined links. ' +
  'In 1989 a physicist at CERN sketches a way to link all the world\u2019s ' +
  'documents. Four years later CERN gives the software away for free ' +
  '(W1\u2013W5) — and the Web becomes everyone\u2019s.';

export const FOOTNOTE =
  'SIMPLIFIED SIMULATION — the browser pages are an illustrative recreation ' +
  'of the first website (info.cern.ch) and its linked sub-pages; the sources ' +
  'document the first page and its 6 August 1991 date (W3), not the exact ' +
  'sub-page text. The 1990 browser/server is attributed to CERN, not W3C ' +
  '(W3C formed 1994, W6).';