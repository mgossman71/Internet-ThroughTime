import { describe, expect, it } from "vitest";
import {
  aiEngine,
  createAiState,
  MAX_ASKS,
  type AiState,
} from "./aiEngine";
import { BRANCHES, PROMPT_POOL } from "./aiData";

function at(
  chapter: "2022" | "2023" | "2025",
  extra?: Partial<AiState>,
): AiState {
  return { ...createAiState(), chapter, ...extra };
}

describe("aiEngine", () => {
  it("starts in 2022 with the chat, no branch, nothing asked", () => {
    const s = createAiState();
    expect(s.chapter).toBe("2022");
    expect(s.branch).toBeNull();
    expect(s.asks).toBe(0);
    expect(s.modelLoaded).toBe(false);
    expect(s.frontierOpen).toBe(false);
    expect(s.note).toContain("the machine answers");
  });

  it("moves between chapters; same-chapter set is a no-op", () => {
    const s0 = createAiState();
    const s1 = aiEngine(s0, { type: "SET_CHAPTER", chapter: "2023" });
    expect(s1.chapter).toBe("2023");
    expect(s1).not.toBe(s0);
    expect(aiEngine(s1, { type: "SET_CHAPTER", chapter: "2023" })).toBe(s1);
  });

  it("refuses the fork in 2022 (not reached yet)", () => {
    const s0 = createAiState();
    expect(aiEngine(s0, { type: "CHOOSE_BRANCH", branch: "tool" })).toBe(s0);
  });

  it("takes the fork once at 2023; a second choice is a no-op", () => {
    const s0 = at("2023");
    const a = aiEngine(s0, { type: "CHOOSE_BRANCH", branch: "tool" });
    expect(a.branch).toBe("tool");
    expect(a).not.toBe(s0);
    const b = aiEngine(a, { type: "CHOOSE_BRANCH", branch: "agi" });
    expect(b).toBe(a);
    expect(b.branch).toBe("tool");
  });

  it("lets a visitor who skipped to 2025 still make the call, and reconsider from 2025", () => {
    const s0 = at("2025");
    const s1 = aiEngine(s0, { type: "CHOOSE_BRANCH", branch: "agi" });
    expect(s1.branch).toBe("agi");
    expect(s1.note).toMatch(/WHAT IF|illustrative/);
    expect(aiEngine(s1, { type: "RECONSIDER" }).branch).toBeNull();
  });

  it("asks only in 2022 and caps at MAX_ASKS", () => {
    expect(aiEngine(at("2023"), { type: "ASK" })).toEqual(at("2023"));

    let s = at("2022");
    for (let i = 0; i < MAX_ASKS; i++) {
      const next = aiEngine(s, { type: "ASK" });
      if (next.asks === s.asks) break;
      s = next;
    }
    expect(s.asks).toBe(MAX_ASKS);
    expect(aiEngine(s, { type: "ASK" })).toBe(s);
  });

  it("loads the model once, in 2023 only", () => {
    expect(aiEngine(at("2022"), { type: "LOAD_MODEL" })).toEqual(at("2022"));

    const s2 = at("2023");
    const s3 = aiEngine(s2, { type: "LOAD_MODEL" });
    expect(s3.modelLoaded).toBe(true);
    expect(aiEngine(s3, { type: "LOAD_MODEL" })).toBe(s3);
  });

  it("opens the frontier once, in 2025 only", () => {
    expect(aiEngine(at("2023"), { type: "OPEN_FRONTIER" })).toEqual(at("2023"));

    const s5 = at("2025");
    const s6 = aiEngine(s5, { type: "OPEN_FRONTIER" });
    expect(s6.frontierOpen).toBe(true);
    expect(aiEngine(s6, { type: "OPEN_FRONTIER" })).toBe(s6);
  });

  it("reset restores the initial 2022 state", () => {
    let s = at("2023");
    s = aiEngine(s, { type: "CHOOSE_BRANCH", branch: "tool" });
    s = aiEngine(s, { type: "SET_CHAPTER", chapter: "2025" });
    s = aiEngine(s, { type: "OPEN_FRONTIER" });
    const r = aiEngine(s, { type: "RESET" });
    expect(r).toEqual(createAiState());
    expect(r).not.toBe(s);
  });

  it("branch definitions are exactly the two planned paths (one labeled hypothetical)", () => {
    expect(BRANCHES.map((b) => b.id).sort()).toEqual(["agi", "tool"]);
    expect(BRANCHES.find((b) => b.id === "agi")?.hypothetical).toBe(true);
    expect(BRANCHES.find((b) => b.id === "tool")?.hypothetical).toBe(false);
  });

  it("illustrative pool has at least MAX_ASKS entries", () => {
    expect(PROMPT_POOL.length).toBeGreaterThanOrEqual(MAX_ASKS);
  });
});