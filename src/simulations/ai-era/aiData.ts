/**
 * Exhibit 11 — "The AI Era" (2022–2026, in progress) — static data.
 *
 * Every historical claim carries an AI-tag recorded in docs/SOURCES.md
 * (verified 2026-09-17). The 2025–2026 material is framed as CURRENT /
 * in-progress, NOT settled history. Mock content (prompt/response lines,
 * model-panel rows, frontier status chrome) is ILLUSTRATIVE and carries
 * no tag.
 */

export type ChapterId = "2022" | "2023" | "2025";
export type BranchId = "tool" | "agi";

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
    id: "2022",
    year: "2022",
    kicker: "YEAR 2022",
    title: "The Machine Answers",
    story:
      "A new interface arrives, and it just talks. ChatGPT is a generative artificial intelligence chatbot based on the OpenAI-developed GPT-3.5 large language model (AI1) — launched November 30, 2022, and it gained 100 million users within two months, the fastest-growing consumer application to date (AI1). A large language model is a type of machine learning model (AI4), but this one feels less like a tool and more like a conversation. The question the era opens: is this a very capable tool, or something more?",
    takeaway:
      "The machine stops answering queries and starts answering questions — people start talking to it.",
    tag: "AI1, AI3, AI4",
  },
  {
    id: "2023",
    year: "2023",
    kicker: "YEAR 2023",
    title: "The Models Get Bigger",
    story:
      "The race is on. ChatGPT runs on GPT-3.5 (AI3); GPT-4 arrives in March 2023 and is multimodal — it accepts image input as well as text (AI2). A large language model is a type of machine learning model (AI4), and each release is bigger and more capable than the last. The fork of the era: is this a tool that augments us (the path history is taking), or is general intelligence already here? (The hype says the latter; the record says the former.)",
    takeaway:
      "The models keep getting bigger and more multimodal — but \"a tool\" and \"a mind\" are not the same thing.",
    tag: "AI2, AI3, AI4",
  },
  {
    id: "2025",
    year: "2025–2026",
    kicker: "YEARS 2025–2026",
    title: "AI, Everywhere — In Progress",
    story:
      "Still in motion. This era is CURRENT, as of September 2026: the wave is ongoing (AI5) — multimodal, on-device, agentic — but the specific endpoints are not settled history, so we do not assert them. What we can say: by 2025–2026 even the metaverse money is flowing to AI (\"Investments in AI\"), and the machine that arrived in November 2022 is now woven into the workday. This is the live edge of the timeline — hand off to The Road Ahead, which is speculation.",
    takeaway:
      "We are inside the era right now — its ending is not written, and this exhibit says so out loud.",
    tag: "AI5",
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
    id: "tool",
    label: "HISTORY: AI is a tool",
    sub: "The path history is taking — a very capable assistant, not a mind (AI1, AI4).",
    hypothetical: false,
  },
  {
    id: "agi",
    label: "WHAT IF: AGI is already here",
    sub: "The 2023 hype — general intelligence is already here (illustrative, not established fact).",
    hypothetical: true,
  },
];

export interface Fact {
  id: string;
  tag: string;
  text: string;
}

export const FACTS: Record<ChapterId, Fact[]> = {
  "2022": [
    {
      id: "chatgpt",
      tag: "AI1",
      text: "\"ChatGPT is a generative artificial intelligence chatbot based on the OpenAI-developed GPT-3.5 large language model.\" Launched November 30, 2022; \"gained 100 million users within two months of its launch\" — \"the fastest-growing consumer application to date.\"",
    },
    {
      id: "gpt35",
      tag: "AI3",
      text: "ChatGPT is \"based on\" GPT-3.5 — the underlying large language model (AI3).",
    },
    {
      id: "llm",
      tag: "AI4",
      text: "A large language model is \"a type of machine learning model\" (the generative-AI / deep-learning family).",
    },
  ],
  "2023": [
    {
      id: "gpt4",
      tag: "AI2",
      text: "GPT-4 was released in March 2023 and is multimodal (accepts image input as well as text).",
    },
    {
      id: "gpt35-again",
      tag: "AI3",
      text: "The era-1 model, ChatGPT, is \"based on\" GPT-3.5 (AI3) — the 2023 wave builds on it.",
    },
    {
      id: "llm-again",
      tag: "AI4",
      text: "A large language model is \"a type of machine learning model\" (AI4) — the thing getting bigger each release.",
    },
  ],
  "2025": [
    {
      id: "in-progress",
      tag: "AI5",
      text: "The 2024–2026 period is ongoing: 5G \"Recent developments (2022–present)\"; Meta \"2025 / 2026: AI investments\". Framed as CURRENT as of September 2026, not settled history.",
    },
    {
      id: "pivot",
      tag: "AI1",
      text: "Context from the Connected Decade: \"the fastest-growing consumer application to date\" (C7/AI1) — the 2022 launch that started this era.",
    },
  ],
};

/** Illustrative prompt queue (generic questions, no real answers). */
export const PROMPT_POOL = [
  { prompt: "explain packet switching in one line", kind: "explain" },
  { prompt: "write a haiku about a modem dialing", kind: "write" },
  { prompt: "debug this loop", kind: "code" },
  { prompt: "plan a 3-day trip", kind: "plan" },
  { prompt: "translate \"bonjour\"", kind: "translate" },
  { prompt: "summarize this paper", kind: "summarize" },
];

/** Illustrative model-panel rows (only 2022/2023 are verified claims). */
export const MODEL_PANEL = [
  { name: "ChatGPT", year: "2022", note: "based on GPT-3.5 (AI3)" },
  { name: "GPT-4", year: "2023", note: "multimodal (AI2)" },
  { name: "the frontier", year: "2025–26", note: "in progress (AI5)" },
];

/** Illustrative in-progress beats (labeled CURRENT, not asserted). */
export const FRONTIER_ITEMS = [
  { id: "multimodal", label: "multimodal (text + image)" },
  { id: "on-device", label: "on-device models" },
  { id: "agents", label: "agentic workflows" },
];