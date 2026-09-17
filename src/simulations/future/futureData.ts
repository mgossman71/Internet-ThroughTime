/**
 * "The Road Ahead" (speculative, beyond 2026) — static data.
 *
 * SPECULATIVE SECTION. Not a historical record and not a prediction.
 *
 * A STORY, not a widget: a three-act narrative (now → three real threads →
 * where they point) built around the shift in how we interact with the
 * internet. Only the "now" and the three threads are VERIFIED (the in-progress
 * 2025–2026 anchors in docs/SOURCES.md: AI5 "agentic / on-device / multimodal",
 * AI2 multimodal, AI4 "a type of machine learning model"). Act III (the
 * forecast) is a labeled extrapolation of those threads and asserts no dates,
 * products, or AGI timeline (see DELIBERATELY_NOT).
 */

export type ThreadId = "agentic" | "ondevice" | "multimodal";
export type SliceId = "get-there" | "make-a-meal" | "keep-a-record";

export interface ThreadDef {
  id: ThreadId;
  label: string;
  /** what the thread is — VERIFIED (the in-progress 2025–2026 wave). */
  what: string;
  tag: string;
  /** the DIRECTION it points for how you use the internet (a forward-reading). */
  means: string;
}

export const THREADS: ThreadDef[] = [
  {
    id: "agentic",
    label: "AGENCY",
    what: "Software that acts for you. The 2025–2026 wave is already \"agentic\" (AI5), riding on a large language model — a type of machine learning model (AI4).",
    tag: "AI5, AI4",
    means:
      "You stop driving every step yourself. You state the goal and the interface runs the steps and hands back the result — the web starts to feel less like a place you navigate and more like a task you hand off.",
  },
  {
    id: "ondevice",
    label: "ON-DEVICE",
    what: "The compute moves to you. The wave is already \"on-device\" (AI5): models run on your phone and at the edge, not only in distant data centers.",
    tag: "AI5",
    means:
      "The internet recedes from a \"site you visit\" toward a capability that's already local. Less \"going online,\" more \"it just knows\" — and more of it stays close to you.",
  },
  {
    id: "multimodal",
    label: "MULTIMODAL",
    what: "It reads more than text. The wave is already \"multimodal\" (AI5); models accept image input as well as text (GPT-4, March 2023, AI2).",
    tag: "AI5, AI2",
    means:
      "The interface stops being only words on a screen. You can point at a menu, a receipt, a face, a room — and the web meets you in that medium.",
  },
];

export interface SliceDef {
  id: SliceId;
  label: string;
  prompt: string;
  /** how you do it today — a general picture of current web/app use. */
  today: string;
  /** where the three threads point — a FORECAST, labeled in the UI. */
  trajectory: string;
}

export const SLICES: SliceDef[] = [
  {
    id: "get-there",
    label: "GET SOMEWHERE",
    prompt: "You're in a new city and you want to be at a restaurant by 7.",
    today:
      "Today you do it in pieces: open a map, type the address, check directions, then a transit app, then maybe a reviews site. You are the one stitching the steps together — the internet is a set of places you visit in turn.",
    trajectory:
      "Follow the threads and it could become a single hand-off: you say the goal once; an agentic layer (AI5) runs the map, the transit and the booking steps and hands back a plan; on-device (AI5) keeps it close; multimodal (AI5, AI2) means a photo of the address works too. (A forecast — an extrapolation of the verified threads, not a specific product.)",
  },
  {
    id: "make-a-meal",
    label: "MAKE A MEAL",
    prompt: "You want a recipe you can actually make with what's in your kitchen.",
    today:
      "Today you search a site, scroll recipes, open a second site for conversions or substitutes, and keep the tab alive while you cook. The internet is a collection of pages you keep coming back to.",
    trajectory:
      "Follow the threads and it could become a conversation: you describe what you have; an agentic assistant (AI5) assembles a workable plan and the steps; multimodal (AI5, AI2) means you can photograph the shelf and it works from that; on-device (AI5) keeps it quiet, fast and hands-free at the stove. (A forecast — an extrapolation of the verified threads, not a specific product.)",
  },
  {
    id: "keep-a-record",
    label: "KEEP A RECORD",
    prompt: "You want to keep the important stuff — a receipt, a note, a photo — where you'll find it later.",
    today:
      "Today it's scattered: a photo in your camera roll, a note in an app, a link in an email. You re-find things by searching the same handful of places, over and over.",
    trajectory:
      "Follow the threads and it could become one place that understands you: you drop the thing in; an agentic layer (AI5) files and links it; multimodal (AI5, AI2) means a photo of the receipt becomes searchable; on-device (AI5) keeps it yours. (A forecast — an extrapolation of the verified threads, not a specific product.)",
  },
];

/** Verified anchors that ground "where we are." */
export const ANCHORS = [
  {
    tag: "AI5",
    text: "The 2025–2026 wave is ongoing — \"agentic, on-device, multimodal\" — and even the industry's money is moving to it (\"2025 / 2026: AI investments\"). CURRENT as of September 2026, not settled.",
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

/** The three-act framing. */
export const LEDE = {
  kicker: "THE ROAD AHEAD",
  title: "Where AI Is Taking the Internet",
  act1: {
    h: "Act I — Where we are (right now)",
    body:
      "This is the open edge of the timeline, and it is NOT history — the previous exhibit ended in motion, CURRENT as of September 2026 (AI5). What IS true, right now: AI already stands between you and the internet. The wave is \"agentic, on-device, multimodal\" (AI5), riding on large language models — a type of machine learning model (AI4) — and even the industry's center of gravity has moved to it (AI5). The change already underway is in how you MEET the web: less a place you go, more a thing you ask and have done.",
    tag: "AI5, AI4, AI2",
  },
  act2: {
    h: "Act II — Three threads that are real today",
    body:
      "Three threads are already moving (AI5) — each is a verified \"in progress\" direction, not a prediction. Read what each one is, then open it to see the direction it points for how you use the internet.",
  },
  act3: {
    h: "Act III — Follow them forward (a forecast)",
    body:
      "Now the speculative part, and it is clearly a FORECAST, not a prediction. Pick a slice of your life, read how you do it today, then follow the three threads to see where they point. Everything in this act is an extrapolation of the verified threads — not a claim about any specific product.",
  },
  close: {
    h: "What this is — and isn't",
    body:
      "This section is not a prediction and not history. It is the direction the verified 2025–2026 threads (AI5, AI2, AI4) point, told as a story. The internet may become more ambient, more agentic, more multisensory — and the interface may recede until you interact with it less like a place and more like a capability. Whether that's where we land is still being written.",
  },
};

/** Things we deliberately do NOT assert in this section. */
export const DELIBERATELY_NOT = [
  "No dates or timelines (no \"by 2030…\").",
  "No named future products or companies.",
  "No claim that AGI will (or won't) arrive, or when.",
  "The \"today\" steps as unverifiable facts — they're a general picture of how the web is used now.",
  "Any forecast stated as settled fact.",
];