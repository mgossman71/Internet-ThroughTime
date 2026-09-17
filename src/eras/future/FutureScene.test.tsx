import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { FutureScene } from "./FutureScene";

describe("FutureScene (speculative 'Road Ahead')", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("opens on the speculative framing with verified anchors", () => {
    render(<FutureScene />);
    expect(anyText(/THE ROAD AHEAD/i)).toBe(true);
    expect(anyText(/NOT a historical record|NOT A HISTORICAL/i)).toBe(true);
    expect(anyText(/VERIFIED ANCHORS/i)).toBe(true);
    expect(anyText(/\[AI5\]/)).toBe(true);
    expect(anyText(/SPECULATIVE SECTION/i)).toBe(true);
  });

  it("shows the three open questions, each with two forecasts, none leaned at first", () => {
    render(<FutureScene />);
    expect(anyText(/WHO ACTS\?/i)).toBe(true);
    expect(anyText(/WHERE DOES IT LIVE\?/i)).toBe(true);
    expect(anyText(/WHAT DOES IT REACH\?/i)).toBe(true);
    const agents = screen.getByRole("button", { name: /AGENTS ACT FOR YOU/i });
    expect(agents).toBeInTheDocument();
    expect(agents.getAttribute("aria-pressed")).toBe("false");
    expect(anyText(/0\/3 leaned/i)).toBe(true);
  });

  it("leans a question, reveals the forecast, and lets you switch your mind", () => {
    render(<FutureScene />);
    const agents = screen.getByRole("button", { name: /AGENTS ACT FOR YOU/i });
    fireEvent.click(agents);
    expect(agents.getAttribute("aria-pressed")).toBe("true");
    expect(anyText(/WHAT THAT WOULD MEAN/i)).toBe(true);
    expect(anyText(/A forecast/i)).toBe(true);

    // change your mind — a lean is not locked (unlike the historical forks)
    fireEvent.click(screen.getByRole("button", { name: /YOU STAY IN THE LOOP/i }));
    expect(
      screen
        .getByRole("button", { name: /YOU STAY IN THE LOOP/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen
        .getByRole("button", { name: /AGENTS ACT FOR YOU/i })
        .getAttribute("aria-pressed"),
    ).toBe("false");
  });

  it("reflects each lean on the FORECAST BOARD and tallies it", () => {
    render(<FutureScene />);
    expect(anyText(/FORECAST BOARD/i)).toBe(true);
    expect(anyText(/0\/3 leaned/i)).toBe(true);
    fireEvent.click(
      screen.getByRole("button", { name: /IT'S EVERYWHERE, INVISIBLE/i }),
    );
    expect(anyText(/1\/3 leaned/i)).toBe(true);
  });

  it("leans all three and can clear them", () => {
    render(<FutureScene />);
    fireEvent.click(screen.getByRole("button", { name: /AGENTS ACT FOR YOU/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /IT'S EVERYWHERE, INVISIBLE/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /ALL THE SENSES/i }));
    expect(anyText(/3\/3 leaned/i)).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /CLEAR MY LEANS/i }));
    expect(anyText(/0\/3 leaned/i)).toBe(true);
  });

  it("lists what it deliberately does NOT assert", () => {
    render(<FutureScene />);
    expect(anyText(/DELIBERATELY NOT ASSERTED/i)).toBe(true);
    expect(anyText(/No dates or timelines/i)).toBe(true);
    expect(anyText(/No claim that AGI will/i)).toBe(true);
  });
});