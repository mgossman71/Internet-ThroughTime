/**
 * Exhibit 10 — "The Connected Decade" (2016–2022) — static data.
 *
 * Every historical claim carries a C-tag recorded in docs/SOURCES.md
 * (verified 2026-09-17). Mock content (short-video feed, streaming-app
 * tiles, 5G network panel, like counters, VR-headset chrome) is
 * ILLUSTRATIVE and carries no tag.
 */

export type ChapterId = "2016" | "2021" | "2022";
export type BranchId = "metaverse" | "ai";

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
    id: "2016",
    year: "2016",
    kicker: "YEAR 2016",
    title: "The Feed",
    story:
      "The screen turns vertical and it never stops. Short-form video becomes the format: TikTok is an international Chinese social media platform that hosts user-generated short videos, operated by ByteDance — its Chinese cousin Douyin launches in 2016 and the international version follows in 2017 (C4). Attention, not content, becomes the scarce resource. Streaming is already winning the living room (the mail-envelope era is gone, and Disney+ is a year away — 2019 — C3). The interface of the decade is a feed you scroll, not a page you load.",
    takeaway:
      "The phone stops being a device you pick up — it becomes a feed you scroll.",
    tag: "C3, C4",
  },
  {
    id: "2021",
    year: "2019–2021",
    kicker: "YEARS 2019–2021",
    title: "The Metaverse Bet",
    story:
      "The pipes and the platforms peak. 5G — the fifth-generation mobile standard that comes after 4G/LTE (C1) — rolls out commercially from 2019–2021 (C2). The streaming wars heat up: Disney+ launches November 12, 2019 (C3). And the industry makes its biggest bet: Facebook's own history reads \"2018–2020: Focus on the metaverse\" and \"2021: Rebrand as Meta\" (C5) — the metaverse is the destination. Meanwhile, quietly, the models that will power the next era already exist: GPT-3 shipped in May 2020 (C6). The fork of the decade: where does all this lead?",
    takeaway:
      "In 2021 the industry bets the future is the metaverse. The other thing — a machine that answers — is already in the room.",
    tag: "C1, C2, C3, C5, C6",
  },
  {
    id: "2022",
    year: "2022",
    kicker: "YEAR 2022",
    title: "AI Is Coming",
    story:
      "The bet loses. 5G is deployed (C2) and the feeds are everywhere — but the thing that actually changes everything arrives in late 2022: ChatGPT gained 100 million users within two months of its launch in November 2022, the fastest-growing consumer application to date (C7). By 2025–2026 even the metaverse money is flowing to AI — Meta's own timeline reads \"2025: Policy shifts and AI investments\" and \"2026: Investments in AI\" (C8). The Connected Decade hands its baton to the next era.",
    takeaway:
      "The decade that connected everyone ended by introducing a machine that answers.",
    tag: "C2, C7, C8",
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
    id: "ai",
    label: "HISTORY: AI answers you",
    sub: "The path history took — by 2025–26 the metaverse money is flowing to AI (C7, C8).",
    hypothetical: false,
  },
  {
    id: "metaverse",
    label: "WHAT IF: The metaverse becomes the next platform",
    sub: "The 2021 bet — VR/AR, the metaverse as the destination (illustrative, not the path history took).",
    hypothetical: true,
  },
];

export interface Fact {
  id: string;
  tag: string;
  text: string;
}

export const FACTS: Record<ChapterId, Fact[]> = {
  "2016": [
    {
      id: "tiktok",
      tag: "C4",
      text: "\"TikTok is an international Chinese social media platform that hosts user-generated short videos… operated by ByteDance.\" Douyin (China) launched 2016; the international version followed in 2017.",
    },
    {
      id: "streaming-context",
      tag: "C3",
      text: "Streaming had already won the living room — the era-peak beat lands in 2019 when Disney+ \"launched on November 12, 2019\" (C3, detailed in 2021).",
    },
  ],
  "2021": [
    {
      id: "5g-std",
      tag: "C1",
      text: "\"5G is a fifth-generation mobile telecommunications standard…\" Infobox: Predecessor 4G (LTE, WiMAX); Successor 6G (in development); Year started 2015.",
    },
    {
      id: "5g-rollout",
      tag: "C2",
      text: "Wikipedia \"5G\" history has a named phase \"Commercial rollout (2019–2021)\", followed by \"Recent developments (2022–present)\".",
    },
    {
      id: "disney",
      tag: "C3",
      text: "\"Disney+ … launched on November 12, 2019\" (subscribers 131.6 million, November 2025).",
    },
    {
      id: "metaverse",
      tag: "C5",
      text: "Meta (formerly Facebook) history: \"2018–2020: Focus on the metaverse\"; \"2021: Rebrand as Meta\".",
    },
    {
      id: "gpt3",
      tag: "C6",
      text: "GPT-3 was released in May 2020 and was the largest language model published at the time (175B parameters) — the models behind the next era already exist.",
    },
  ],
  "2022": [
    {
      id: "chatgpt",
      tag: "C7",
      text: "ChatGPT \"gained 100 million users within two months of its launch\" (November 2022), described as \"the fastest-growing consumer application to date\".",
    },
    {
      id: "pivot",
      tag: "C8",
      text: "Meta's timeline: \"2025: Policy shifts and AI investments\"; \"2026: Investments in AI\" — the metaverse money flows to AI.",
    },
  ],
};

/** Illustrative short-video feed (generic captions, no real videos). */
export const FEED_POOL = [
  { caption: "cat video", likes: "12.4k" },
  { caption: "dance clip", likes: "48.1k" },
  { caption: "30-sec food hack", likes: "9.7k" },
  { caption: "travel reel", likes: "22.0k" },
  { caption: "skit (part 1/12)", likes: "5.3k" },
  { caption: "desk-setup tour", likes: "7.9k" },
];

/** Illustrative streaming-app tiles (names only; subscribing is mock). */
export const STREAM_POOL = [
  "Disney+",
  "Netflix",
  "YouTube",
  "Twitch",
  "Spotify",
  "Apple TV+",
];

/** Illustrative network rows for the 2021 5G panel (values are mock). */
export const NETWORK_STATUS = [
  {
    id: "5g",
    name: "5G (after 4G/LTE)",
    status: "ROLLING OUT",
    note: "commercial rollout 2019–2021 (C2)",
  },
  {
    id: "lte",
    name: "4G / LTE",
    status: "CONNECTED",
    note: "the standard 5G builds on (C1)",
  },
  {
    id: "wlan",
    name: "Wi-Fi",
    status: "CONNECTED",
    note: "home + hotspot (illustrative)",
  },
];