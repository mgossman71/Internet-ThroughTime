/**
 * Exhibit 12 — "The Road Ahead" (speculative, beyond 2026) — static data.
 *
 * SPECULATIVE SECTION. Not a historical record and not a prediction.
 * Every "forecast" below is a labeled extrapolation grounded ONLY in the
 * verified 2025–2026 anchors already recorded in docs/SOURCES.md
 * (AI5 = the wave is ongoing — multimodal, on-device, agentic;
 *  AI2 = GPT-4, March 2023, multimodal; AI4 = "a type of machine learning
 *  model"). No dates, no named future products, no AGI timeline are asserted
 * (see DELIBERATELY_NOT).
 */

export type QuestionId = "agentic" | "location" | "multimodal";

export interface SideDef {
  /** unique id, e.g. "agentic.agents". */
  id: string;
  /** button label, e.g. "AGENTS ACT FOR YOU". */
  label: string;
  /** "what that would mean" — always framed as a forecast. */
  forecast: string;
}

export interface QuestionDef {
  id: QuestionId;
  num: string;
  question: string;
  /** the verifiable tension, grounded in anchors. */
  whyOpen: string;
  /** anchor tag(s) this question extrapolates from. */
  tag: string;
  sides: [SideDef, SideDef];
}

export const QUESTIONS: QuestionDef[] = [
  {
    id: "agentic",
    num: "01",
    question: "Who acts?",
    whyOpen:
      "The 2025–2026 wave is \"agentic\" (AI5): assistants already act for people, on top of a large language model — a type of machine learning model (AI4). Who is really in control of the network next is open.",
    tag: "AI5, AI4",
    sides: [
      {
        id: "agentic.agents",
        label: "AGENTS ACT FOR YOU",
        forecast:
          "You stop clicking; software agents plan, book, buy and negotiate on your behalf across the network. (A forecast — an extrapolation of the \"agentic\" thread, AI5.)",
      },
      {
        id: "agentic.human",
        label: "YOU STAY IN THE LOOP",
        forecast:
          "Every consequential action still needs a human in the room; AI remains a very capable tool you drive, not a mind (AI1, AI4). (A forecast.)",
      },
    ],
  },
  {
    id: "location",
    num: "02",
    question: "Where does it live?",
    whyOpen:
      "The wave is \"on-device\" (AI5): compute is moving to the edge and into the phone, and the network is becoming invisible infrastructure. How far it recedes is open.",
    tag: "AI5",
    sides: [
      {
        id: "location.ambient",
        label: "IT'S EVERYWHERE, INVISIBLE",
        forecast:
          "The network dissolves into spaces, things and the physical world; \"going online\" stops being something you do. (A forecast — an extrapolation of the on-device / ambient thread, AI5.)",
      },
      {
        id: "location.local",
        label: "BACK TO THE PERSONAL",
        forecast:
          "Local-first, private, on-your-own-hardware; the central cloud steps back and the internet shrinks to the person. (A forecast — an extrapolation of on-device, AI5.)",
      },
    ],
  },
  {
    id: "multimodal",
    num: "03",
    question: "What does it reach?",
    whyOpen:
      "The wave is \"multimodal\" (AI5): models already accept image input as well as text — GPT-4, March 2023 (AI2). How far beyond text the interface goes is open.",
    tag: "AI5, AI2",
    sides: [
      {
        id: "multimodal.senses",
        label: "ALL THE SENSES",
        forecast:
          "Vision, sound, gesture and space become first-class inputs and outputs — the interface is the room, not the screen. (A forecast — an extrapolation of the multimodal thread, AI5, AI2.)",
      },
      {
        id: "multimodal.text",
        label: "TEXT AND CODE",
        forecast:
          "Text and code stay the core of computing; richer media stay at the edges. (A forecast.)",
      },
    ],
  },
];

/** Verified anchors that ground this speculative section (all in SOURCES.md). */
export const ANCHORS = [
  {
    tag: "AI5",
    text: "The 2025–2026 wave is ongoing — \"multimodal, on-device, agentic\". CURRENT as of September 2026, not settled history.",
  },
  {
    tag: "AI2",
    text: "GPT-4 (March 2023) is multimodal — it accepts image input as well as text.",
  },
  {
    tag: "AI4",
    text: "A large language model is \"a type of machine learning model\".",
  },
];

/** The framing lede for the section. */
export const LEDE = {
  kicker: "THE ROAD AHEAD",
  title: "What Could Be Next",
  story:
    "The last exhibit ended in motion — CURRENT as of September 2026 (AI5). This section is the open edge of the timeline. It is NOT a historical record and NOT a prediction: it is a menu of open questions, each with two forecasts you can lean toward — and change your mind on. Every branch is an extrapolation of what is real today, and nothing more.",
  takeaway:
    "Pick a side, see what it would mean, switch if you like — the road ahead is genuinely open.",
};

/** Things we deliberately do NOT assert in this section. */
export const DELIBERATELY_NOT = [
  "No dates or timelines (no \"by 2030…\").",
  "No named future products or companies.",
  "No claim that AGI will (or won't) arrive, or when.",
  "No specific technology named as the \"winner\".",
  "Any forecast stated as settled fact.",
];