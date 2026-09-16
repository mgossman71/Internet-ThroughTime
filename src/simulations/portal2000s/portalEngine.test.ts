import { describe, expect, it } from "vitest";
import {
  createPortalState,
  MAX_QUEUE,
  MAX_SEARCHES,
  portalEngine,
  type PortalState,
} from "./portalEngine";
import { BRANCHES, TRACK_POOL } from "./portalData";

function at(chapter: "2000" | "2001" | "2004", extra?: Partial<PortalState>): PortalState {
  return { ...createPortalState(), chapter, ...extra };
}

describe("portalEngine", () => {
  it("starts in 2000 with the portal front door, no branch, empty queue", () => {
    const s = createPortalState();
    expect(s.chapter).toBe("2000");
    expect(s.branch).toBeNull();
    expect(s.queue).toEqual([]);
    expect(s.searches).toBe(0);
    expect(s.mailRead).toBe(false);
    expect(s.note).toContain("front door");
  });

  it("moves between chapters; same-chapter set is a no-op", () => {
    const s0 = createPortalState();
    const s1 = portalEngine(s0, { type: "SET_CHAPTER", chapter: "2001" });
    expect(s1.chapter).toBe("2001");
    expect(s1).not.toBe(s0);
    const s2 = portalEngine(s1, { type: "SET_CHAPTER", chapter: "2001" });
    expect(s2).toBe(s1);
  });

  it("refuses the fork in 2000 (not reached yet)", () => {
    const s0 = createPortalState();
    const s1 = portalEngine(s0, { type: "CHOOSE_BRANCH", branch: "labelsWin" });
    expect(s1).toBe(s0);
  });

  it("takes the fork once at 2001; a second choice is a no-op", () => {
    const s0 = at("2001");
    const a = portalEngine(s0, { type: "CHOOSE_BRANCH", branch: "labelsWin" });
    expect(a.branch).toBe("labelsWin");
    expect(a).not.toBe(s0);
    const b = portalEngine(a, { type: "CHOOSE_BRANCH", branch: "napsterLives" });
    expect(b).toBe(a);
    expect(b.branch).toBe("labelsWin");
  });

  it("lets a visitor who skipped to 2004 still make the call, and reconsider from 2004", () => {
    const s0 = at("2004");
    const s1 = portalEngine(s0, { type: "CHOOSE_BRANCH", branch: "napsterLives" });
    expect(s1.branch).toBe("napsterLives");
    expect(s1.note).toMatch(/WHAT IF|illustrative/);
    const s2 = portalEngine(s1, { type: "RECONSIDER" });
    expect(s2.branch).toBeNull();
  });

  it("queues files only in 2001 and caps the queue at MAX_QUEUE", () => {
    const s0 = createPortalState();
    expect(portalEngine(s0, { type: "QUEUE_FILE" })).toBe(s0); // 2000: illegal

    const s1 = at("2001");
    const s2 = portalEngine(s1, { type: "QUEUE_FILE" });
    expect(s2.queue).toEqual([TRACK_POOL[0].name]);

    let s = s2;
    while (s.queue.length < MAX_QUEUE + 2) {
      const next = portalEngine(s, { type: "QUEUE_FILE" });
      if (next.queue.length === s.queue.length) break;
      s = next;
    }
    expect(s.queue.length).toBe(MAX_QUEUE);
    expect(portalEngine(s, { type: "QUEUE_FILE" })).toBe(s);
  });

  it("runs searches only in 2004 and caps them at MAX_SEARCHES", () => {
    const s0 = at("2001");
    expect(portalEngine(s0, { type: "RUN_SEARCH" })).toBe(s0);

    let s = at("2004");
    for (let i = 0; i < MAX_SEARCHES; i++) {
      s = portalEngine(s, { type: "RUN_SEARCH" });
    }
    expect(s.searches).toBe(MAX_SEARCHES);
    expect(portalEngine(s, { type: "RUN_SEARCH" })).toBe(s);
  });

  it("reads the mail inbox once, in 2004 only", () => {
    const s1 = at("2001");
    expect(portalEngine(s1, { type: "READ_MAIL" })).toBe(s1);

    const s2 = at("2004");
    const s3 = portalEngine(s2, { type: "READ_MAIL" });
    expect(s3.mailRead).toBe(true);
    expect(portalEngine(s3, { type: "READ_MAIL" })).toBe(s3);
  });

  it("reset restores the initial 2000 state", () => {
    let s = at("2001");
    s = portalEngine(s, { type: "CHOOSE_BRANCH", branch: "labelsWin" });
    s = portalEngine(s, { type: "QUEUE_FILE" });
    const r = portalEngine(s, { type: "RESET" });
    expect(r).toEqual(createPortalState());
    expect(r).not.toBe(s);
  });

  it("branch definitions are exactly the two planned paths (one labeled hypothetical)", () => {
    expect(BRANCHES.map((b) => b.id)).toEqual(["labelsWin", "napsterLives"]);
    expect(BRANCHES.find((b) => b.id === "napsterLives")?.hypothetical).toBe(true);
    expect(BRANCHES.find((b) => b.id === "labelsWin")?.hypothetical).toBe(false);
  });
});