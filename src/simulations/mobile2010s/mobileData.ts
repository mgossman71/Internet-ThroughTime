/**
 * Exhibit 09 — "Mobile & Cloud" (2010–2015) — static data.
 *
 * Every historical claim carries an M-tag recorded in docs/SOURCES.md
 * (verified 2026-09-17). Mock content (home-screen icons, status bar,
 * signal bars, sync queue, app queue) is ILLUSTRATIVE and carries no tag.
 */

export type ChapterId = "2010" | "2012" | "2015";
export type BranchId = "cloud" | "localOnly";

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
    id: "2010",
    year: "2010",
    kicker: "YEAR 2010",
    title: "The Phone Becomes the Computer",
    story:
      "The desk falls away. A smartphone is a mobile device that combines a traditional phone with advanced computing capabilities, typically with a touchscreen (M1). In January 2010 Apple introduces the first-generation iPad — the tablet becomes a thing (M2). The pipes keep getting faster: LTE, the 'transitional' 4G step above 3G, is finalized in December 2008, and the first public LTE service goes live in Oslo and Stockholm in December 2009 (M3, M4). And the web follows: the mobile web is browser-based web services accessed from mobile devices (M5) — before 2014 the web was 'primarily accessed via fixed-line services by laptops and desktop computers', but mobile's convenience drove 'an aggressive shift in the user mix' (M6). In early 2010 the ITU forecasts that on-the-go web access will exceed desktop 'within the following five years' (M7).",
    takeaway:
      "The computer in your pocket starts out-selling the one on your desk.",
    tag: "M1–M7",
  },
  {
    id: "2012",
    year: "2012",
    kicker: "YEAR 2012",
    title: "Your Stuff Moves to the Cloud",
    story:
      "The files leave the drawer. 'On-demand self-service' means a consumer can provision computing capabilities — server time, network storage — automatically, without talking to anyone (M8). The services arrive: iCloud (Apple) launches in 2011 and 'enables users to store and sync data across devices' (M9); Google Drive launches April 24, 2012 — 'store files in the cloud, synchronize files across devices, and share files' (M10); Dropbox, founded in 2007, offers cloud storage and file synchronization (M11). And ownership itself bends: Spotify is 'a Swedish freemium music streaming service' — launched in Europe in October 2008, in the U.S. in July 2011 (M12); Netflix began streaming in 2007, a decade after its DVD-by-mail service (M13). The question for the era: where does your stuff live?",
    takeaway:
      "Stream, don't keep — your life now has two copies: one on you, one on the net.",
    tag: "M8–M13",
  },
  {
    id: "2015",
    year: "2015",
    kicker: "YEAR 2015",
    title: "The App Economy",
    story:
      "The phone is the computer. The App Store — 'an app marketplace developed and maintained by Apple' — opened on July 10, 2008 (M14); Android Market, announced August 28, 2008, is rebranded as Google Play in March 2012 (M15). Two stores, one economy: software now ships to the pocket. The numbers land: global smartphone sales surpass feature-phone sales in early 2013 (M16) — and the ITU's early-2010 prediction that on-the-go web access would exceed desktop 'within the following five years' comes due exactly now, in 2015 (M7). The desktop doesn't disappear — it stops being the default screen.",
    takeaway:
      "Five years after the ITU's forecast, the phone wins the web — and the app store is the storefront.",
    tag: "M7, M14–M16",
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
    id: "cloud",
    label: "HISTORY: The cloud wins",
    sub: "Files, photos, music, video — sync to servers and stream anywhere (M9–M13).",
    hypothetical: false,
  },
  {
    id: "localOnly",
    label: "WHAT IF: Everything stays on the device",
    sub: "No sync, no streaming — if the phone or disk dies, the files die with it (illustrative).",
    hypothetical: true,
  },
];

export interface FactDef {
  id: string;
  tag: string;
  text: string;
}

export const FACTS: Record<ChapterId, FactDef[]> = {
  "2010": [
    {
      id: "smartphone-def",
      tag: "M1",
      text: "\"A smartphone is a mobile device that combines the functionality of a traditional mobile phone (feature phone) with advanced computing capabilities. It typically has a touchscreen interface…\"",
    },
    {
      id: "ipad",
      tag: "M2",
      text: "\"[The iPad] is a brand of tablet computers developed and marketed by Apple… The first-generation iPad was introduced on January 27, 2010.\"",
    },
    {
      id: "lte",
      tag: "M3",
      text: "\"Long Term Evolution (LTE) is a standard for wireless broadband communication… considered to be a 'transitional' 4G technology… also referred to as 3.95G as a step above 3G.\"",
    },
    {
      id: "lte-first-service",
      tag: "M4",
      text: "\"The LTE standard was finalized in December 2008, and the first publicly available LTE service was launched by TeliaSonera in Oslo and Stockholm on December 14, 2009, as a data connection with a USB modem.\"",
    },
    {
      id: "mobile-web",
      tag: "M5–M6",
      text: "\"The mobile web comprises mobile browser-based World Wide Web services accessed from mobile devices…\"; \"Prior to 2014, the World Wide Web was primarily accessed via fixed-line services by laptops and desktop computers…\" — then \"an aggressive shift in the user mix favoring mobile devices.\"",
    },
    {
      id: "itu-forecast",
      tag: "M7",
      text: "\"In early 2010, ITU… reported that with current growth rates, web access by people on the go via laptops and smart mobile devices was likely to exceed web access from desktop computers within the following five years.\"",
    },
  ],
  "2012": [
    {
      id: "nist",
      tag: "M8",
      text: "NIST: \"On-demand self-service: 'A consumer can unilaterally provision computing capabilities, such as server time and network storage, as needed automatically without requiring human interaction with each service provider.'\"",
    },
    {
      id: "icloud",
      tag: "M9",
      text: "\"iCloud is a personal cloud service run by Apple. Launched on October 12, 2011, iCloud enables users to store and sync data across devices, including Apple Mail, Apple Calendar, Apple Photos, Apple Notes, contacts, settings, backups, and files…\"",
    },
    {
      id: "gdrive",
      tag: "M10",
      text: "\"Google Drive is a file-hosting service and synchronization service developed by Google. Launched on April 24, 2012, Google Drive allows users to store files in the cloud (on Google servers), synchronize files across devices, and share files.\"",
    },
    {
      id: "dropbox",
      tag: "M11",
      text: "\"Dropbox is a file hosting service operated by the American company Dropbox, Inc.… that offers cloud storage, file synchronization, personal cloud, and client software. Dropbox was founded in 2007 by MIT students Drew Houston and Arash Ferdowsi…\"",
    },
    {
      id: "spotify",
      tag: "M12",
      text: "\"[Spotify] is a Swedish freemium music streaming service provider founded in April 2006 by Daniel Ek and Martin Lorentzon.\" — \"Conceived as a legal alternative to music piracy, the service launched in several European markets in October 2008 and in the United States in July 2011.\"",
    },
    {
      id: "netflix",
      tag: "M13",
      text: "\"Launched in 2007, nearly a decade after Netflix, Inc. began its pioneering DVD-by-mail movie rental service, Netflix is the most-subscribed video on demand global streaming media service…\"",
    },
  ],
  "2015": [
    {
      id: "appstore",
      tag: "M14",
      text: "\"The App Store is an app marketplace developed and maintained by Apple, for mobile apps and desktop apps on its iOS, macOS and iPadOS operating systems.\" — \"The iPhone App Store opened on July 10, 2008.\"",
    },
    {
      id: "googleplay",
      tag: "M15",
      text: "\"Android Market was announced by Google on August 28, 2008\" — \"Also in March 2012, Android Market was re-branded as Google Play.\"",
    },
    {
      id: "outsell",
      tag: "M16",
      text: "\"Global smartphone sales surpassed the sales figures for feature phones in early 2013.\"",
    },
    {
      id: "itu-lands",
      tag: "M7",
      text: "The ITU's early-2010 forecast: on-the-go web access \"likely to exceed web access from desktop computers within the following five years\" — 2010 + 5 = 2015, the era's final year.",
    },
  ],
};

/** Illustrative sync-queue rows (no real files or services implied). */
export const SYNC_POOL = [
  { name: "photos_vacation/ (12 photos)", dest: "in the cloud" },
  { name: "song_queue.m4a (38 MB)", dest: "in the cloud" },
  { name: "notes.md (draft)", dest: "in the cloud" },
  { name: "budget_2012.xlsx", dest: "in the cloud" },
  { name: "scan_postcard_1994.jpg", dest: "in the cloud" },
  { name: "mixtape_2012.mp3", dest: "in the cloud" },
];

/** Illustrative app-install queue (generic names, no real app claims). */
export const APP_POOL = [
  { name: "Weather", size: "2.1 MB" },
  { name: "Music", size: "48.0 MB" },
  { name: "Maps", size: "12.4 MB" },
  { name: "Camera", size: "9.8 MB" },
  { name: "Browser", size: "31.2 MB" },
  { name: "Photos", size: "18.6 MB" },
];

/** Illustrative home-screen grid (generic icons, not real apps). */
export const HOME_SCREEN = [
  "Phone",
  "Mail",
  "Calendar",
  "Camera",
  "Music",
  "Maps",
  "Weather",
  "Browser",
];

/** Illustrative status rows for the 2010 signal panel (values are mock). */
export const PHONE_STATUS = [
  {
    id: "lte",
    name: "LTE (a.k.a. 3.95G)",
    status: "CONNECTED",
    note: "'transitional' 4G, a step above 3G (M3)",
  },
  {
    id: "fallback",
    name: "EDGE / 2G",
    status: "FALLBACK",
    note: "the older lines are still there (illustrative)",
  },
  {
    id: "wlan",
    name: "WLAN",
    status: "OFF",
    note: "home hotspot (illustrative)",
  },
];