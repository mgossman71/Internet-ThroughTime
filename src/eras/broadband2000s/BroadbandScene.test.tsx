import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BroadbandScene } from "./BroadbandScene";

describe("BroadbandScene (2005–2009, three chapters)", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("chapter 1 (2005): the open encyclopedia is on screen with zero clicks", () => {
    render(<BroadbandScene />);

    expect(
      screen
        .getByRole("button", { name: /YEAR 2005/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");

    expect(anyText(/21 articles in its first year/i)).toBe(true);
    expect(anyText(/18,000 articles in its first year/i)).toBe(true);
    expect(anyText(/corrects the vast majority of errors within minutes/i)).toBe(true);
    expect(anyText(/\[B1\]/)).toBe(true);
    expect(anyText(/\[B9\]/)).toBe(true);

    // 2007's upload queue is not in the DOM yet.
    expect(screen.queryByRole("button", { name: /UPLOAD VIDEO/i })).not.toBeInTheDocument();
  });

  it("chapter 2 (2007): the history fork — anyone uploads, DMCA notices arrive, queue caps", () => {
    render(<BroadbandScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2007/i }));
    expect(
      screen.getByRole("button", { name: /HISTORY: Anyone can upload/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /WHAT IF: Licensed-only uploads/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /HISTORY: Anyone can upload/i }));
    expect(
      screen
        .getByRole("button", { name: /HISTORY: Anyone can upload/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(anyText(/Decision recorded/i)).toBe(true);
    expect(anyText(/DMCA NOTICE ARRIVING/i)).toBe(true);
    expect(anyText(/THE FIGHT KEEPS GOING/i)).toBe(true);
    expect(anyText(/Viacom/i)).toBe(true);

    // queue up to the cap, then the button locks
    const upload = screen.getByRole("button", { name: /UPLOAD VIDEO/i });
    fireEvent.click(upload);
    expect(anyText(/sunset_trip\.flv/i)).toBe(true);
    fireEvent.click(upload);
    fireEvent.click(upload);
    fireEvent.click(upload);
    fireEvent.click(upload);
    fireEvent.click(upload);
    expect(upload).toBeDisabled();
  });

  it("chapter 2, WHAT IF branch: licensed-only, clearly labeled", () => {
    render(<BroadbandScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2007/i }));
    fireEvent.click(screen.getByRole("button", { name: /WHAT IF: Licensed-only uploads/i }));
    expect(anyText(/WHAT IF: uploads stay licensed-only/i)).toBe(true);
    expect(anyText(/not recorded history/i)).toBe(true);
    // the history DMCA banner is not shown
    expect(screen.queryByText(/DMCA NOTICE ARRIVING/i)).not.toBeInTheDocument();
  });

  it("chapter 3 (2009): line status, the FCC plan, and Wikipedia's scale", () => {
    render(<BroadbandScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2007/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: Anyone can upload/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2009/i }));

    expect(anyText(/DIAL-UP/i)).toBe(true);
    expect(anyText(/BROADBAND/i)).toBe(true);
    expect(anyText(/majority of U\.S\. survey respondents/i)).toBe(true);
    expect(anyText(/largest encyclopedia ever assembled/i)).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /READ THE BROADBAND PLAN/i }));
    expect(anyText(/NATIONAL BROADBAND PLAN — 2010/i)).toBe(true);
    expect(anyText(/100 megabits per second/i)).toBe(true);

    expect(anyText(/\[B14\]/)).toBe(true);
    expect(anyText(/\[B16\]/)).toBe(true);
    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("a visitor who skips to 2009 undecided gets a path back to the fork", () => {
    render(<BroadbandScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2009/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(
      screen.getByRole("button", { name: /BACK TO 2007 — MAKE THE CALL/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /BACK TO 2007 — MAKE THE CALL/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: Anyone can upload/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2009/i }));

    expect(screen.queryByText(/THE FORK IS UNDECIDED/i)).not.toBeInTheDocument();
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("closes with the takeaway, verified facts and the simulation note", () => {
    render(<BroadbandScene />);
    expect(anyText(/KEY TAKEAWAY/i)).toBe(true);
    expect(anyText(/FACTS \(SOURCE-VERIFIED\)/i)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
    expect(anyText(/START OVER — BACK TO 2005/i)).toBe(true);
  });
});