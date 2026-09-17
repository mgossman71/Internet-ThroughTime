import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MobileScene } from "./MobileScene";

describe("MobileScene (2010–2015, three chapters)", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("chapter 1 (2010): the phone is on screen with zero clicks", () => {
    render(<MobileScene />);

    expect(
      screen
        .getByRole("button", { name: /YEAR 2010/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");

    expect(anyText(/advanced computing capabilities/i)).toBe(true);
    expect(anyText(/first-generation iPad was introduced on January 27, 2010/i)).toBe(true);
    expect(anyText(/transitional.*4G/i)).toBe(true);
    expect(anyText(/within the following five years/i)).toBe(true);
    expect(anyText(/\[M1\]/)).toBe(true);
    expect(anyText(/\[M7\]/)).toBe(true);

    // 2012's sync queue is not in the DOM yet.
    expect(screen.queryByRole("button", { name: /SYNC FILES/i })).not.toBeInTheDocument();
  });

  it("chapter 2 (2012): the history fork — the cloud wins, sync queue caps", () => {
    render(<MobileScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2012/i }));
    expect(
      screen.getByRole("button", { name: /HISTORY: The cloud wins/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /WHAT IF: Everything stays on the device/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /HISTORY: The cloud wins/i }));
    expect(
      screen
        .getByRole("button", { name: /HISTORY: The cloud wins/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(anyText(/Decision recorded/i)).toBe(true);
    expect(anyText(/THE CLOUD WINS \(HISTORY\)/i)).toBe(true);

    // queue up to the cap, then the button locks
    const sync = screen.getByRole("button", { name: /SYNC FILES/i });
    fireEvent.click(sync);
    expect(anyText(/photos_vacation/i)).toBe(true);
    fireEvent.click(sync);
    fireEvent.click(sync);
    fireEvent.click(sync);
    fireEvent.click(sync);
    fireEvent.click(sync);
    expect(sync).toBeDisabled();
  });

  it("chapter 2, WHAT IF branch: stays on the device, clearly labeled", () => {
    render(<MobileScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2012/i }));
    fireEvent.click(screen.getByRole("button", { name: /WHAT IF: Everything stays on the device/i }));
    expect(anyText(/WHAT IF: everything stays on the device/i)).toBe(true);
    expect(anyText(/not recorded history/i)).toBe(true);
    // the history callout is not shown
    expect(screen.queryByText(/THE CLOUD WINS \(HISTORY\)/i)).not.toBeInTheDocument();
  });

  it("chapter 3 (2015): the app economy, the numbers land", () => {
    render(<MobileScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2012/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: The cloud wins/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2015/i }));

    expect(anyText(/July 10, 2008/i)).toBe(true);
    expect(anyText(/re-branded as Google Play/i)).toBe(true);
    expect(anyText(/surpassed the sales figures for feature phones/i)).toBe(true);

    const install = screen.getByRole("button", { name: /INSTALL APP/i });
    fireEvent.click(install);
    expect(anyText(/INSTALLED/i)).toBe(true);

    expect(anyText(/\[M16\]/)).toBe(true);
    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("a visitor who skips to 2015 undecided gets a path back to the fork", () => {
    render(<MobileScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2015/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(
      screen.getByRole("button", { name: /BACK TO 2012 — MAKE THE CALL/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /BACK TO 2012 — MAKE THE CALL/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: The cloud wins/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2015/i }));

    expect(screen.queryByText(/THE FORK IS UNDECIDED/i)).not.toBeInTheDocument();
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("closes with the takeaway, verified facts and the simulation note", () => {
    render(<MobileScene />);
    expect(anyText(/KEY TAKEAWAY/i)).toBe(true);
    expect(anyText(/FACTS \(SOURCE-VERIFIED\)/i)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
    expect(anyText(/START OVER — BACK TO 2010/i)).toBe(true);
  });
});