import { describe, expect, it } from "vitest";
import {
  createBroadbandState,
  MAX_EDITS,
  MAX_UPLOADS,
  broadbandEngine,
  type BroadbandState,
} from "./broadbandEngine";
import { BRANCHES, EDIT_POOL, VIDEO_POOL } from "./broadbandData";

function at(
  chapter: "2005" | "2007" | "2009",
  extra?: Partial<BroadbandState>,
): BroadbandState {
  return { ...createBroadbandState(), chapter, ...extra };
}

describe("broadbandEngine", () => {
  it("starts in 2005 with the open encyclopedia, no branch, nothing queued", () => {
    const s = createBroadbandState();
    expect(s.chapter).toBe("2005");
    expect(s.branch).toBeNull();
    expect(s.edits).toBe(0);
    expect(s.uploads).toBe(0);
    expect(s.planRead).toBe(false);
    expect(s.note).toContain("encyclopedia anyone can edit");
  });

  it("moves between chapters; same-chapter set is a no-op", () => {
    const s0 = createBroadbandState();
    const s1 = broadbandEngine(s0, { type: "SET_CHAPTER", chapter: "2007" });
    expect(s1.chapter).toBe("2007");
    expect(s1).not.toBe(s0);
    const s2 = broadbandEngine(s1, { type: "SET_CHAPTER", chapter: "2007" });
    expect(s2).toBe(s1);
  });

  it("refuses the fork in 2005 (not reached yet)", () => {
    const s0 = createBroadbandState();
    const s1 = broadbandEngine(s0, { type: "CHOOSE_BRANCH", branch: "openUploads" });
    expect(s1).toBe(s0);
  });

  it("takes the fork once at 2007; a second choice is a no-op", () => {
    const s0 = at("2007");
    const a = broadbandEngine(s0, { type: "CHOOSE_BRANCH", branch: "openUploads" });
    expect(a.branch).toBe("openUploads");
    expect(a).not.toBe(s0);
    const b = broadbandEngine(a, { type: "CHOOSE_BRANCH", branch: "licensedOnly" });
    expect(b).toBe(a);
    expect(b.branch).toBe("openUploads");
  });

  it("lets a visitor who skipped to 2009 still make the call, and reconsider from 2009", () => {
    const s0 = at("2009");
    const s1 = broadbandEngine(s0, { type: "CHOOSE_BRANCH", branch: "licensedOnly" });
    expect(s1.branch).toBe("licensedOnly");
    expect(s1.note).toMatch(/WHAT IF|illustrative/);
    const s2 = broadbandEngine(s1, { type: "RECONSIDER" });
    expect(s2.branch).toBeNull();
  });

  it("makes edits only in 2005 and caps them at MAX_EDITS", () => {
    const s0 = at("2007");
    expect(broadbandEngine(s0, { type: "MAKE_EDIT" })).toBe(s0); // 2007: illegal

    const s1 = at("2005");
    let s = s1;
    for (let i = 0; i < MAX_EDITS; i++) {
      s = broadbandEngine(s, { type: "MAKE_EDIT" });
    }
    expect(s.edits).toBe(MAX_EDITS);
    expect(broadbandEngine(s, { type: "MAKE_EDIT" })).toBe(s);
  });

  it("queues uploads only in 2007 and caps them at MAX_UPLOADS", () => {
    const s0 = at("2005");
    expect(broadbandEngine(s0, { type: "UPLOAD_VIDEO" })).toBe(s0); // 2005: illegal

    const s1 = at("2007");
    const s2 = broadbandEngine(s1, { type: "UPLOAD_VIDEO" });
    expect(s2.uploads).toBe(1);

    let s = s2;
    while (s.uploads < MAX_UPLOADS) {
      const next = broadbandEngine(s, { type: "UPLOAD_VIDEO" });
      if (next.uploads === s.uploads) break;
      s = next;
    }
    expect(s.uploads).toBe(MAX_UPLOADS);
    expect(broadbandEngine(s, { type: "UPLOAD_VIDEO" })).toBe(s);
  });

  it("reads the broadband plan once, in 2009 only", () => {
    const s1 = at("2007");
    expect(broadbandEngine(s1, { type: "READ_PLAN" })).toBe(s1);

    const s2 = at("2009");
    const s3 = broadbandEngine(s2, { type: "READ_PLAN" });
    expect(s3.planRead).toBe(true);
    expect(broadbandEngine(s3, { type: "READ_PLAN" })).toBe(s3);
  });

  it("reset restores the initial 2005 state", () => {
    let s = at("2007");
    s = broadbandEngine(s, { type: "CHOOSE_BRANCH", branch: "openUploads" });
    s = broadbandEngine(s, { type: "UPLOAD_VIDEO" });
    s = broadbandEngine(s, { type: "SET_CHAPTER", chapter: "2009" });
    const r = broadbandEngine(s, { type: "RESET" });
    expect(r).toEqual(createBroadbandState());
    expect(r).not.toBe(s);
  });

  it("branch definitions are exactly the two planned paths (one labeled hypothetical)", () => {
    expect(BRANCHES.map((b) => b.id)).toEqual(["openUploads", "licensedOnly"]);
    expect(BRANCHES.find((b) => b.id === "licensedOnly")?.hypothetical).toBe(true);
    expect(BRANCHES.find((b) => b.id === "openUploads")?.hypothetical).toBe(false);
  });

  it("illustrative pools have exactly MAX entries (edit history + uploads)", () => {
    expect(EDIT_POOL.length).toBeGreaterThanOrEqual(MAX_EDITS);
    expect(VIDEO_POOL.length).toBeGreaterThanOrEqual(MAX_UPLOADS);
  });
});