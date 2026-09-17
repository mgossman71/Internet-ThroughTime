import { createFutureState, futureEngine } from "./futureEngine";
import type { SliceId, ThreadId } from "./futureData";

describe("futureEngine (Road Ahead story)", () => {
  const initial = createFutureState();

  it("starts closed: nothing revealed, no slice, no reflection", () => {
    expect(initial.slice).toBeNull();
    expect(initial.trajectoryShown).toBe(false);
    expect(initial.reflection).toBeNull();
    expect(initial.revealed.agentic).toBe(false);
    expect(initial.revealed.ondevice).toBe(false);
    expect(initial.revealed.multimodal).toBe(false);
    expect(initial.seq).toBe(0);
  });

  it("opens a thread (Act II reveal)", () => {
    const s = futureEngine(initial, { type: "REVEAL_THREAD", thread: "agentic" });
    expect(s.revealed.agentic).toBe(true);
    expect(s.seq).toBe(1);
  });

  it("opening an already-open thread is a no-op (idempotent)", () => {
    const s = futureEngine(initial, { type: "REVEAL_THREAD", thread: "agentic" });
    expect(futureEngine(s, { type: "REVEAL_THREAD", thread: "agentic" })).toBe(s);
  });

  it("selecting a slice hides its forecast until revealed; switching resets it", () => {
    const a = futureEngine(initial, { type: "SELECT_SLICE", slice: "get-there" });
    expect(a.slice).toBe("get-there");
    expect(a.trajectoryShown).toBe(false);

    const b = futureEngine(a, { type: "SHOW_TRAJECTORY" });
    expect(b.trajectoryShown).toBe(true);

    const c = futureEngine(b, { type: "SELECT_SLICE", slice: "make-a-meal" });
    expect(c.slice).toBe("make-a-meal");
    expect(c.trajectoryShown).toBe(false);
  });

  it("SHOW_TRAJECTORY before a slice is selected is a no-op", () => {
    expect(futureEngine(initial, { type: "SHOW_TRAJECTORY" })).toBe(initial);
  });

  it("records the optional reflection; re-picking is a no-op; it can change", () => {
    const s = futureEngine(initial, { type: "REFLECT", thread: "multimodal" });
    expect(s.reflection).toBe("multimodal");
    expect(futureEngine(s, { type: "REFLECT", thread: "multimodal" })).toBe(s);
    expect(futureEngine(s, { type: "REFLECT", thread: "ondevice" }).reflection).toBe(
      "ondevice",
    );
  });

  it("ignores unknown slice / thread ids", () => {
    expect(
      futureEngine(initial, { type: "SELECT_SLICE", slice: "nope" as unknown as SliceId }),
    ).toBe(initial);
    expect(
      futureEngine(initial, { type: "REVEAL_THREAD", thread: "nope" as unknown as ThreadId }),
    ).toBe(initial);
    expect(
      futureEngine(initial, { type: "REFLECT", thread: "nope" as unknown as ThreadId }),
    ).toBe(initial);
  });

  it("advances seq only on state-changing actions", () => {
    const a = futureEngine(initial, { type: "REVEAL_THREAD", thread: "agentic" });
    expect(a.seq).toBe(1);
    expect(futureEngine(a, { type: "REVEAL_THREAD", thread: "agentic" }).seq).toBe(1);
  });

  it("resets to a fresh state", () => {
    const s = futureEngine(initial, { type: "REVEAL_THREAD", thread: "agentic" });
    const s2 = futureEngine(s, { type: "SELECT_SLICE", slice: "get-there" });
    const s3 = futureEngine(s2, { type: "REFLECT", thread: "agentic" });
    expect(futureEngine(s3, { type: "RESET" })).toEqual(createFutureState());
  });
});