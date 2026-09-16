/**
 * Exhibit 07 — "Portals, P2P & Search" (2000–2004) — static data.
 *
 * Every historical claim carries a P-tag recorded in docs/SOURCES.md
 * (verified 2026-09-16). Mock content (track names, search results,
 * inbox lines, portal chrome) is ILLUSTRATIVE and carries no tag.
 */

export type ChapterId = "2000" | "2001" | "2004";
export type BranchId = "labelsWin" | "napsterLives";

export interface ChapterDef {
  id: ChapterId;
  year: string;
  kicker: string;
  title: string;
  story: string;
  takeaway: string;
  tag: string;
}

export const CHAPTERS: ChapterDef[] = [
  {
    id: "2000",
    year: "2000",
    kicker: "YEAR 2000",
    title: "The Front Door",
    story:
      "The internet now lives in the home page. The portal — \"a specially designed website that provides information from a variety of sources in one place\" — is the front door: Excite, Lycos, MSN, Yahoo! (P1). In 2001, half of U.S. households will have internet access (P5). Behind the glossy page, the Nasdaq peaks on March 10, 2000, then falls 78% by October 2002 — the bubble bursts; the wires stay (P2).",
    takeaway: "The front door is everywhere — and the bubble under it is about to pop.",
    tag: "P1–P2, P5",
  },
  {
    id: "2001",
    year: "2001",
    kicker: "YEAR 2001",
    title: "Files Move",
    story:
      "Something new moves in: the file queue. Napster (1999, Fanning & Parker) turns every window into a music exchange; in college dorms, as much as 61% of external traffic is MP3 transfers (P3). Lawsuits end Napster in July 2001; bankruptcy in June 2002; Roxio relaunches it for $5.3M as a subscription (P3). But the network was never one company: Kazaa (March 2001) survives \"much longer\" (P4).",
    takeaway: "Files move peer to peer — and the law meets them.",
    tag: "P3–P4",
  },
  {
    id: "2004",
    year: "2004",
    kicker: "YEAR 2004",
    title: "Meaning & Mail",
    story:
      "Meaning and mail move online. Google (1998, Page & Brin) settles at Mountain View in 2003 and makes its initial public offering in 2004 (P6). Mail has been web-native since Hotmail (July 4, 1996; Microsoft 1997) (P8); in April 2004 Gmail launches with 1 GB — \"a significantly higher amount than competitors\" (P7). The portal is no longer the only door.",
    takeaway: "Search and mail grow up — the front door splits into tabs.",
    tag: "P6–P8",
  },
];

export interface BranchDef {
  id: BranchId;
  label: string;
  sub: string;
  hypothetical: boolean;
}

export const BRANCHES: BranchDef[] = [
  {
    id: "labelsWin",
    label: "HISTORY: The record labels win",
    sub: "Lawsuits → shut down July 2001 (P3). The network survives anyway (P4).",
    hypothetical: false,
  },
  {
    id: "napsterLives",
    label: "WHAT IF: The courts side with Napster",
    sub: "Illustrative — not recorded history. The queue just keeps growing.",
    hypothetical: true,
  },
];

export interface Fact {
  id: string;
  tag: string;
  text: string;
}

export const FACTS: Record<ChapterId, Fact[]> = {
  "2000": [
    {
      id: "portals-def",
      tag: "P1",
      text: "A web portal is \"a specially designed website that provides information from a variety of sources in one place\" — for many users, set as the home page, it was the starting point of web browsing.",
    },
    {
      id: "portals-named",
      tag: "P1",
      text: "American portals of the era included Excite, Lycos, MSN, and Yahoo!. The term \"portal\" emerged in the late 1990s.",
    },
    {
      id: "households",
      tag: "P5",
      text: "In 2001, half of U.S. households had internet access.",
    },
    {
      id: "bubble",
      tag: "P2",
      text: "The Nasdaq peaked on March 10, 2000 and fell 78% from its peak by October 2002 — the dot-com bubble, with the collapse of Pets.com, Webvan, and WorldCom. The wires stayed; the companies fell.",
    },
  ],
  "2001": [
    {
      id: "napster",
      tag: "P3",
      text: "Napster (1999, Fanning & Parker, first available June 1999): \"shut down in July 2001 and filed for bankruptcy in June 2002.\"",
    },
    {
      id: "roxio",
      tag: "P3",
      text: "In November 2002, Roxio acquired the Napster IP for $5.3 million and relaunched it as a music subscription service.",
    },
    {
      id: "dorms",
      tag: "P3",
      text: "In college dorms, \"as much as 61% of external network traffic consisted of MP3 file transfers.\"",
    },
    {
      id: "kazaa",
      tag: "P4",
      text: "Kazaa (introduced March 2001; BlueMoon's FastTrack → Zennström & Friis): \"While Napster lasted just three years, Kazaa survived much longer.\"",
    },
  ],
  "2004": [
    {
      id: "google",
      tag: "P6",
      text: "Google (1998, Larry Page & Sergey Brin — \"Googol\") settled at Mountain View in 2003 and made its initial public offering in 2004.",
    },
    {
      id: "hotmail",
      tag: "P8",
      text: "Hotmail launched July 4, 1996 (Smith & Bhatia); Microsoft acquired it in 1997 for a reported $400 million. 1999: \"From Zero to 30 Million Members in 30 Months.\"",
    },
    {
      id: "gmail",
      tag: "P7",
      text: "Gmail (beta 2004, Paul Buchheit): launched April 1, 2004 with 1 GB of storage — \"a significantly higher amount than competitors\"; an early adoption of Ajax.",
    },
  ],
};

/** Illustrative share-queue tracks (no real artist/title claims). */
export const TRACK_POOL = [
  { name: "golden_hour.mp3", size: "4.2 MB" },
  { name: "city_lights.mp3", size: "5.1 MB" },
  { name: "slow_dance.mp3", size: "3.8 MB" },
  { name: "static_heart.mp3", size: "6.0 MB" },
  { name: "last_bus_home.mp3", size: "4.7 MB" },
];

/** Illustrative mock search results (fake example.com URLs). */
export const SEARCH_POOL = [
  {
    title: "Broadband: what is it?",
    host: "example.com",
    snippet: "Faster than dial-up — and no more modem screech.",
  },
  {
    title: "MP3 players: pocket music",
    host: "example.org",
    snippet: "A year of pocket players, compared.",
  },
  {
    title: "CSS tricks for your pages",
    host: "example.net",
    snippet: "Tables are not the only way to lay things out.",
  },
  {
    title: "Mail in your browser",
    host: "example.com",
    snippet: "Why people are moving their mail online.",
  },
];

/** Illustrative inbox lines (not real mail). */
export const INBOX = [
  { from: "dad", subject: "Did you get my e-mail?" },
  { from: "band", subject: "Setlist for Friday" },
  { from: "college", subject: "Spring registration" },
];

/** Illustrative portal link-grid categories (generic, no brands). */
export const PORTAL_GRID = [
  "News",
  "Sport",
  "Movies",
  "Music",
  "Shopping",
  "Chat",
];