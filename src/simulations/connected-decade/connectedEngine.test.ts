import { describe, expect, it } from "vitest";
import {
  createConnectedState,
  MAX_LIKES,
  connectedEngine,
  type ConnectedState,
} from "./connectedEngine";
import { BRANCHES, FEED_POOL } from "./connectedData";

function at(
  chapter: "2016" | "2021" | "2022",
  extra?: Partial<ConnectedState>,
): ConnectedState {
  return { ...createConnectedState(), chapter, ...extra };
}

describe("connectedEngine", () => {
  it("starts in 2016 with the feed, no branch, nothing liked", () => {
    const s = createConnectedState();
    expect(s.chapter).toBe("2016");
    expect(s.branch).toBeNull();
    expect(s.likes).toBe(0);
    expect(s.metaverseEntered).toBe(false);
    expect(s.connected5g).toBe(false);
    expect(s.note).toContain("the feed never ends");
  });

  it("moves between chapters; same-chapter set is a no-op", () => {
    const s0 = createConnectedState();
    const s1 = connectedEngine(s0, { type: "SET_CHAPTER", chapter: "2021" });
    expect(s1.chapter).toBe("2021");
    expect(s1).not.toBe(s0);
    const s2 = connectedEngine(s1, { type: "SET_CHAPTER", chapter: "2021" });
    expect(s2).toBe(s1);
  });

  it("refuses the fork in 2016 (not reached yet)", () => {
    const s0 = createConnectedState();
    const s1 = connectedEngine(s0, { type: "CHOOSE_BRANCH", branch: "ai" });
    expect(s1).toBe(s0);
  });

  it("takes the fork once at 2021; a second choice is a no-op", () => {
    const s0 = at("2021");
    const a = connectedEngine(s0, { type: "CHOOSE_BRANCH", branch: "ai" });
    expect(a.branch).toBe("ai");
    expect(a).not.toBe(s0);
    const b = connectedEngine(a, { type: "CHOOSE_BRANCH", branch: "metaverse" });
    expect(b).toBe(a);
    expect(b.branch).toBe("ai");
  });

  it("lets a visitor who skipped to 2022 still make the call, and reconsider from 2022", () => {
    const s0 = at("2022");
    const s1 = connectedEngine(s0, { type: "CHOOSE_BRANCH", branch: "metaverse" });
    expect(s1.branch).toBe("metaverse");
    expect(s1.note).toMatch(/WHAT IF|illustrative/);
    const s2 = connectedEngine(s1, { type: "RECONSIDER" });
    expect(s2.branch).toBeNull();
  });

  it("likes videos only in 2016 and caps them at MAX_LIKES", () => {
    const s0 = at("2021");
    expect(connectedEngine(s0, { type: "LIKE_VIDEO" })).toBe(s0); // 2021: illegal

    const s1 = at("2016");
    let s = s1;
    for (let i = 0; i < MAX_LIKES; i++) {
      const next = connectedEngine(s, { type: "LIKE_VIDEO" });
      if (next.likes === s.likes) break;
      s = next;
    }
    expect(s.likes).toBe(MAX_LIKES);
    expect(connectedEngine(s, { type: "LIKE_VIDEO" })).toBe(s);
  });

  it("enters the metaverse once, in 2021 only", () => {
    const s1 = at("2016");
    expect(connectedEngine(s1, { type: "ENTER_METAVERSE" })).toBe(s1);

    const s2 = at("2021");
    const s3 = connectedEngine(s2, { type: "ENTER_METAVERSE" });
    expect(s3.metaverseEntered).toBe(true);
    expect(connectedEngine(s3, { type: "ENTER_METAVERSE" })).toBe(s3);
  });

  it("connects 5G once, in 2022 only", () => {
    const s1 = at("2021");
    expect(connectedEngine(s1, { type: "CONNECT_5G" })).toBe(s1);

    const s2 = at("2022");
    const s3 = connectedEngine(s2, { type: "CONNECT_5G" });
    expect(s3.connected5g).toBe(true);
    expect(connectedEngine(s3, { type: "CONNECT_5G" })).toBe(s3);
  });

  it("reset restores the initial 2016 state", () => {
    let s = at("2021");
    s = connectedEngine(s, { type: "CHOOSE_BRANCH", branch: "ai" });
    s = connectedEngine(s, { type: "SET_CHAPTER", chapter: "2022" });
    s = connectedEngine(s, { type: "CONNECT_5G" });
    const r = connectedEngine(s, { type: "RESET" });
    expect(r).toEqual(createConnectedState());
    expect(r).not.toBe(s);
  });

  it("branch definitions are exactly the two planned paths (one labeled hypothetical)", () => {
    expect(BRANCHES.map((b) => b.id).sort()).toEqual(["ai", "metaverse"]);
    expect(BRANCHES.find((b) => b.id === "metaverse")?.hypothetical).toBe(true);
    expect(BRANCHES.find((b) => b.id === "ai")?.hypothetical).toBe(false);
  });

  it("illustrative pool has at least MAX_LIKES entries", () => {
    expect(FEED_POOL.length).toBeGreaterThanOrEqual(MAX_LIKES);
  });
});