/**
 * Exhibit 08 — "Broadband & the Open Web" (2005–2009) — static data.
 *
 * Every historical claim carries a B-tag recorded in docs/SOURCES.md
 * (verified 2026-09-16). Mock content (edit-history lines, upload queue,
 * line-status values) is ILLUSTRATIVE and carries no tag.
 */

export type ChapterId = "2005" | "2007" | "2009";
export type BranchId = "openUploads" | "licensedOnly";

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
    id: "2005",
    year: "2005",
    kicker: "YEAR 2005",
    title: "The Encyclopedia Anyone Can Edit",
    story:
      "Two encyclopedias, one bet. Nupedia (March 2000 – September 2003) had volunteers with subject-matter expertise write articles, then expert editors reviewed them before publication — a seven-step approval process, not a live wiki: 21 articles in its first year (B1, B2). Wikipedia, founded in 2001 by Jimmy Wales and Larry Sanger, dropped the approval steps: anyone can edit, and it logged 18,000 articles in its first year (B3, B2). In 2005, Nature ran them head to head and concluded: \"Wikipedia corrects the vast majority of errors within minutes\" (B7, B8) — but the Seigenthaler case showed the other half: false statements in his own biography sat there between May and September 2005 (B9). Nupedia itself is long gone — taken down permanently in 2003, its text folded into Wikipedia (B4).",
    takeaway:
      "Open editing won on speed — and still has to win on trust.",
    tag: "B1–B9",
  },
  {
    id: "2007",
    year: "2007",
    kicker: "YEAR 2007",
    title: "Everyone Has a Camera",
    story:
      "Video moves online. YouTube was founded on February 14, 2005, by three former PayPal employees — Chad Hurley, Jawed Karim, and Steve Chen (B10). The first upload, \"Me at the zoo\" (April 23, 2005), is still on the site (B11). Google announced on October 9, 2006 that it had acquired YouTube for $1.65 billion in stock; the deal closed November 13, 2006 (B12). The question for the next few years: who gets to upload? History says anyone — the site does not view videos before posting, and copyright holders must chase takedown notices; in June 2007, YouTube began trials of automatic infringement detection (B13).",
    takeaway: "The camera is in everyone's pocket — and the law has to keep up.",
    tag: "B10–B13",
  },
  {
    id: "2009",
    year: "2009",
    kicker: "YEAR 2009",
    title: "A Network for Everyone",
    story:
      "The pipes catch up. Around the start of the 21st century most homes were still on dial-up (typically capped near 56 kbit/s); in subsequent years dial-up declined in favor of broadband (B15). By September 2007 a majority of U.S. households had broadband at home (B14). The open web keeps scaling on top of it: Wikipedia passed 2 million articles on September 9, 2007 — \"the largest encyclopedia ever assembled\" — and reached 3 million in August 2009 (B5). And the country looks ahead: the FCC produces a National Broadband Plan in 2010, after public comments from April 2009 through February 2010, with a goal of 100 Mbps-class access for at least 100 million homes by 2020 (B16).",
    takeaway: "Broadband becomes the new front door — this time, for everyone.",
    tag: "B5, B14–B16",
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
    id: "openUploads",
    label: "HISTORY: Anyone can upload",
    sub: "No pre-review — takedown notices + Content ID trials, June 2007 (B13).",
    hypothetical: false,
  },
  {
    id: "licensedOnly",
    label: "WHAT IF: Licensed-only uploads",
    sub: "Illustrative — not recorded history. Only licensed partners post.",
    hypothetical: true,
  },
];

export interface Fact {
  id: string;
  tag: string;
  text: string;
}

export const FACTS: Record<ChapterId, Fact[]> = {
  "2005": [
    {
      id: "nupedia",
      tag: "B1",
      text: "Nupedia (March 2000 – September 2003): articles \"written by volunteer contributors with relevant subject-matter expertise, reviewed by expert editors before publication\" — founded by Jimmy Wales, underwritten by Bomis, Larry Sanger as editor-in-chief.",
    },
    {
      id: "speed-contrast",
      tag: "B2",
      text: "\"Nupedia had a seven-step approval process to control content of articles before being posted, rather than live wiki-based updating\" — 21 articles in its first year, \"compared with Wikipedia having 200 articles in the first month, and 18,000 in the first year.\"",
    },
    {
      id: "foundation",
      tag: "B3",
      text: "Wikipedia: founded by Jimmy Wales and Larry Sanger in 2001; hosted since 2003 by the Wikimedia Foundation, a non-profit funded mainly by donations from readers.",
    },
    {
      id: "nupedia-gone",
      tag: "B4",
      text: "\"Nupedia and Wikipedia coexisted until the former's servers were taken down permanently in 2003, and its text was incorporated into Wikipedia.\"",
    },
    {
      id: "nature-study",
      tag: "B7",
      text: "In a 2005 Nature study, Wikipedia and Britannica \"were compared to professional and peer-reviewed sources\" — Giles, \"Internet encyclopaedias go head to head: Jimmy Wales' Wikipedia comes close to Britannica in terms of the accuracy of its science entries\".",
    },
    {
      id: "corrections",
      tag: "B8",
      text: "The study's conclusion, as quoted: \"Wikipedia corrects the vast majority of errors within minutes, but if they're not spotted within the first day…\"",
    },
    {
      id: "seigenthaler",
      tag: "B9",
      text: "In May 2005, a user edited the article on Barry Seigenthaler \"so that it contained several false and [defamatory] statements\"; \"the inaccurate claims went unnoticed between May and September 2005.\"",
    },
  ],
  "2007": [
    {
      id: "founding",
      tag: "B10",
      text: "\"YouTube was founded on February 14, 2005, by Chad Hurley, Jawed Karim, and Steve Chen who were all former employees at PayPal.\"",
    },
    {
      id: "first-video",
      tag: "B11",
      text: "\"The first video was uploaded on April 23, 2005. Titled 'Me at the zoo', it shows co-founder Jawed Karim at the [San Diego Zoo] and can still be viewed on the site.\"",
    },
    {
      id: "acquisition",
      tag: "B12",
      text: "\"On October 9, 2006, [Google] announced that they had acquired YouTube for $1.65 billion in Google stock.\" — the deal was finalized on November 13, 2006.",
    },
    {
      id: "open-uploads",
      tag: "B13",
      text: "\"YouTube does not view videos before they are posted online, and it is left to copyright holders to issue [DMCA takedown notices]…\" — June 2007: trials of automatic detection of infringing uploads; the 2011 Viacom suit \"nearly resulted in the discontinuation of the website.\"",
    },
  ],
  "2009": [
    {
      id: "adoption",
      tag: "B14",
      text: "\"In September 2007, a majority of U.S. survey respondents reported having broadband internet at home.\"",
    },
    {
      id: "dialup-decline",
      tag: "B15",
      text: "\"Around the start of the 21st century, most residential access was by dial-up\" — \"dial-up connections typically do not exceed a speed of 56 [kbit/s]\"; \"in subsequent years dial-up declined in favor of broadband access.\"",
    },
    {
      id: "fcc-plan",
      tag: "B16",
      text: "The FCC produced a National Broadband Plan in 2010, after soliciting public comments April 2009 – February 2010; goal: \"at least 100 million U.S. homes… actual download speeds of at least 100 megabits per second… by the year 2020.\"",
    },
    {
      id: "scale",
      tag: "B5",
      text: "Wikipedia \"passed the mark of 2 million articles on September 9, 2007, making it the largest encyclopedia ever assembled\"; the English edition \"reached 3 million articles in August 2009.\"",
    },
  ],
};

/** Illustrative edit-history lines (no real article claims). */
export const EDIT_POOL = [
  { who: "you", text: "added a sentence about ADSL" },
  { who: "you", text: "fixed a typo in the lead" },
  { who: "you", text: "added a citation (illustrative)" },
  { who: "you", text: "expanded the History section" },
  { who: "anon-44", text: "reverted your vandalism (good catch, illustrative)" },
  { who: "you", text: "added an infobox row" },
];

/** Illustrative upload queue (no real titles). */
export const VIDEO_POOL = [
  { name: "sunset_trip.flv", size: "8.4 MB" },
  { name: "dog_tricks.avi", size: "12.1 MB" },
  { name: "guitar_tune.mp4", size: "6.3 MB" },
  { name: "birthday_speech.wmv", size: "4.9 MB" },
  { name: "surf_day.mov", size: "15.0 MB" },
  { name: "homework_help.mp4", size: "5.2 MB" },
];

/** Line-status rows for 2009 (statuses are illustrative; claims B-tagged). */
export const LINE_STATUS = [
  {
    id: "dialup",
    name: "DIAL-UP",
    status: "LEGACY",
    note: "\"typically do not exceed a speed of 56 [kbit/s]\" (B15)",
  },
  {
    id: "broadband",
    name: "BROADBAND",
    status: "STANDARD",
    note: "a majority of U.S. households by September 2007 (B14)",
  },
  {
    id: "future",
    name: "THE FCC GOAL",
    status: "NEXT",
    note: "100 Mbps-class for 100 million homes by 2020 (B16)",
  },
];