import { render, screen, fireEvent } from "@testing-library/react";
import { FutureScene } from "./FutureScene";
import { SLICES, THREADS } from "../../simulations/future/futureData";

describe("FutureScene (Road Ahead story)", () => {
  it("renders the lede and Act I with verified anchors", () => {
    render(<FutureScene />);
    expect(screen.getAllByText(/SPECULATIVE SECTION/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Where AI Is Taking the Internet/i)).toBeTruthy();
    expect(screen.getAllByText(/CURRENT as of September 2026/i).length).toBeGreaterThanOrEqual(1);
  });

  it("shows the three threads; opening one reveals 'what it means for you'", () => {
    render(<FutureScene />);
    const btn = screen.getByRole("button", { name: "Thread: AGENCY" });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/WHAT IT MEANS FOR YOU/i)).toBeTruthy();
  });

  it("hides the forecast until the reader follows the threads after picking a slice", () => {
    render(<FutureScene />);
    fireEvent.click(screen.getByRole("button", { name: SLICES[0].label }));
    expect(screen.getByText(/HOW IT IS TODAY/i)).toBeTruthy();
    // the forecast is not shown yet
    expect(screen.queryByText(/WHERE THE THREADS POINT/i)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /FOLLOW THE THREE THREADS/i }));
    expect(screen.getByText(/WHERE THE THREADS POINT/i)).toBeTruthy();
  });

  it("records the optional reflection as a personal lean, not a fact", () => {
    render(<FutureScene />);
    fireEvent.click(screen.getByRole("button", { name: "Bet: MULTIMODAL" }));
    expect(screen.getByText(/a personal lean, not a prediction/i)).toBeTruthy();
  });

  it("resets from the top", () => {
    render(<FutureScene />);
    const thread = screen.getByRole("button", { name: "Thread: AGENCY" });
    fireEvent.click(thread);
    expect(thread).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: /READ IT AGAIN FROM THE TOP/i }));
    expect(thread).toHaveAttribute("aria-pressed", "false");
  });

  it("renders exactly three threads and three slices (no scoreboard)", () => {
    render(<FutureScene />);
    expect(screen.getAllByRole("button", { name: /^Thread: /i })).toHaveLength(THREADS.length);
    expect(screen.getAllByRole("button", { name: /^Bet: /i })).toHaveLength(THREADS.length);
    SLICES.forEach((s) =>
      expect(screen.getByRole("button", { name: s.label })).toBeTruthy(),
    );
  });
});