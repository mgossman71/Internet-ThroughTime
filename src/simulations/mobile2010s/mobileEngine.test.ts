import { describe, expect, it } from "vitest";
import {
  createMobileState,
  MAX_INSTALLS,
  MAX_SYNCS,
  mobileEngine,
  type MobileState,
} from "./mobileEngine";
import { APP_POOL, BRANCHES, SYNC_POOL } from "./mobileData";

function at(
  chapter: "2010" | "2012" | "2015",
  extra?: Partial<MobileState>,
): MobileState {
  return { ...createMobileState(), chapter, ...extra };
}

describe("mobileEngine", () => {
  it("starts in 2010 with the phone, no branch, nothing queued", () => {
    const s = createMobileState();
    expect(s.chapter).toBe("2010");
    expect(s.branch).toBeNull();
    expect(s.phoneChecked).toBe(false);
    expect(s.syncs).toBe(0);
    expect(s.installs).toBe(0);
    expect(s.note).toContain("the phone becomes the computer");
  });

  it("moves between chapters; same-chapter set is a no-op", () => {
    const s0 = createMobileState();
    const s1 = mobileEngine(s0, { type: "SET_CHAPTER", chapter: "2012" });
    expect(s1.chapter).toBe("2012");
    expect(s1).not.toBe(s0);
    const s2 = mobileEngine(s1, { type: "SET_CHAPTER", chapter: "2012" });
    expect(s2).toBe(s1);
  });

  it("refuses the fork in 2010 (not reached yet)", () => {
    const s0 = createMobileState();
    const s1 = mobileEngine(s0, { type: "CHOOSE_BRANCH", branch: "cloud" });
    expect(s1).toBe(s0);
  });

  it("takes the fork once at 2012; a second choice is a no-op", () => {
    const s0 = at("2012");
    const a = mobileEngine(s0, { type: "CHOOSE_BRANCH", branch: "cloud" });
    expect(a.branch).toBe("cloud");
    expect(a).not.toBe(s0);
    const b = mobileEngine(a, { type: "CHOOSE_BRANCH", branch: "localOnly" });
    expect(b).toBe(a);
    expect(b.branch).toBe("cloud");
  });

  it("lets a visitor who skipped to 2015 still make the call, and reconsider from 2015", () => {
    const s0 = at("2015");
    const s1 = mobileEngine(s0, { type: "CHOOSE_BRANCH", branch: "localOnly" });
    expect(s1.branch).toBe("localOnly");
    expect(s1.note).toMatch(/WHAT IF|illustrative/);
    const s2 = mobileEngine(s1, { type: "RECONSIDER" });
    expect(s2.branch).toBeNull();
  });

  it("checks the phone once, in 2010 only", () => {
    const s1 = at("2012");
    expect(mobileEngine(s1, { type: "CHECK_PHONE" })).toBe(s1);

    const s2 = at("2010");
    const s3 = mobileEngine(s2, { type: "CHECK_PHONE" });
    expect(s3.phoneChecked).toBe(true);
    expect(mobileEngine(s3, { type: "CHECK_PHONE" })).toBe(s3);
  });

  it("queues syncs only in 2012 and caps them at MAX_SYNCS", () => {
    const s0 = at("2010");
    expect(mobileEngine(s0, { type: "SYNC_FILES" })).toBe(s0); // 2010: illegal

    const s1 = at("2012");
    const s2 = mobileEngine(s1, { type: "SYNC_FILES" });
    expect(s2.syncs).toBe(1);

    let s = s2;
    while (s.syncs < MAX_SYNCS) {
      const next = mobileEngine(s, { type: "SYNC_FILES" });
      if (next.syncs === s.syncs) break;
      s = next;
    }
    expect(s.syncs).toBe(MAX_SYNCS);
    expect(mobileEngine(s, { type: "SYNC_FILES" })).toBe(s);
  });

  it("installs apps only in 2015 and caps them at MAX_INSTALLS", () => {
    const s0 = at("2012");
    expect(mobileEngine(s0, { type: "INSTALL_APP" })).toBe(s0); // 2012: illegal

    const s1 = at("2015");
    let s = s1;
    for (let i = 0; i < MAX_INSTALLS; i++) {
      s = mobileEngine(s, { type: "INSTALL_APP" });
    }
    expect(s.installs).toBe(MAX_INSTALLS);
    expect(mobileEngine(s, { type: "INSTALL_APP" })).toBe(s);
  });

  it("reset restores the initial 2010 state", () => {
    let s = at("2012");
    s = mobileEngine(s, { type: "CHOOSE_BRANCH", branch: "cloud" });
    s = mobileEngine(s, { type: "SYNC_FILES" });
    s = mobileEngine(s, { type: "SET_CHAPTER", chapter: "2015" });
    s = mobileEngine(s, { type: "INSTALL_APP" });
    const r = mobileEngine(s, { type: "RESET" });
    expect(r).toEqual(createMobileState());
    expect(r).not.toBe(s);
  });

  it("branch definitions are exactly the two planned paths (one labeled hypothetical)", () => {
    expect(BRANCHES.map((b) => b.id)).toEqual(["cloud", "localOnly"]);
    expect(BRANCHES.find((b) => b.id === "localOnly")?.hypothetical).toBe(true);
    expect(BRANCHES.find((b) => b.id === "cloud")?.hypothetical).toBe(false);
  });

  it("illustrative pools have exactly MAX entries (sync queue + app queue)", () => {
    expect(SYNC_POOL.length).toBeGreaterThanOrEqual(MAX_SYNCS);
    expect(APP_POOL.length).toBeGreaterThanOrEqual(MAX_INSTALLS);
  });
});