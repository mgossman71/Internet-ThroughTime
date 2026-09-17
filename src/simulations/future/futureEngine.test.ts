import { describe, expect, it } from "vitest";
import {
  createFutureState,
  futureEngine,
  leanedCount,
} from "./futureEngine";
import {
  ANCHORS,
  DELIBERATELY_NOT,
  LEDE,
  QUESTIONS,
  type QuestionId,
} from "./futureData";

describe("futureEngine (speculative 'Road Ahead')", () => {
  it("starts with no leans on any question", () => {
    const s = createFutureState();
    expect(s.lean.agentic).toBeNull();
    expect(s.lean.location).toBeNull();
    expect(s.lean.multimodal).toBeNull();
    expect(leanedCount(s)).toBe(0);
    expect(s.note).toContain("open");
  });

  it("leans a question; leaning the same side again is a no-op (same object)", () => {
    const s0 = createFutureState();
    const s1 = futureEngine(s0, {
      type: "LEAN",
      question: "agentic",
      side: "agentic.agents",
    });
    expect(s1.lean.agentic).toBe("agentic.agents");
    expect(s1).not.toBe(s0);
    expect(
      futureEngine(s1, { type: "LEAN", question: "agentic", side: "agentic.agents" }),
    ).toBe(s1);
  });

  it("lets you change your mind (a lean is NOT locked, unlike historical forks)", () => {
    let s = createFutureState();
    s = futureEngine(s, { type: "LEAN", question: "agentic", side: "agentic.agents" });
    s = futureEngine(s, { type: "LEAN", question: "agentic", side: "agentic.human" });
    expect(s.lean.agentic).toBe("agentic.human");
    expect(s.note).toMatch(/a forecast, not a prediction/i);
  });

  it("refuses an unknown side or question (no-op, same object)", () => {
    const s0 = createFutureState();
    expect(
      futureEngine(s0, { type: "LEAN", question: "agentic", side: "nope" }),
    ).toBe(s0);
    expect(
      futureEngine(s0, {
        type: "LEAN",
        question: "bogus" as QuestionId,
        side: "agentic.agents",
      }),
    ).toBe(s0);
  });

  it("leans all three questions; leanedCount reflects it", () => {
    let s = createFutureState();
    s = futureEngine(s, { type: "LEAN", question: "agentic", side: "agentic.agents" });
    s = futureEngine(s, {
      type: "LEAN",
      question: "location",
      side: "location.ambient",
    });
    s = futureEngine(s, {
      type: "LEAN",
      question: "multimodal",
      side: "multimodal.senses",
    });
    expect(leanedCount(s)).toBe(3);
  });

  it("reset clears every lean back to the initial state", () => {
    let s = createFutureState();
    s = futureEngine(s, { type: "LEAN", question: "agentic", side: "agentic.agents" });
    s = futureEngine(s, {
      type: "LEAN",
      question: "location",
      side: "location.local",
    });
    const r = futureEngine(s, { type: "RESET" });
    expect(r).toEqual(createFutureState());
    expect(r).not.toBe(s);
  });

  it("exposes exactly three open questions, each with two forecasts", () => {
    expect(QUESTIONS).toHaveLength(3);
    for (const q of QUESTIONS) {
      expect(q.sides).toHaveLength(2);
      for (const side of q.sides) {
        expect(side.forecast).toMatch(/forecast/i);
      }
    }
  });

  it("carries verified anchors and a 'deliberately not asserted' list", () => {
    expect(ANCHORS.map((a) => a.tag).sort()).toEqual(["AI2", "AI4", "AI5"]);
    expect(DELIBERATELY_NOT.length).toBeGreaterThanOrEqual(3);
    expect(LEDE.title).toBeTruthy();
    expect(LEDE.story).toMatch(/NOT a prediction/i);
  });
});