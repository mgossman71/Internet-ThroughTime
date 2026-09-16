import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PortalScene } from "./PortalScene";

describe("PortalScene (2000–2004, three chapters)", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("chapter 1 (2000): the portal front door is on screen with zero clicks", () => {
    render(<PortalScene />);

    expect(
      screen
        .getByRole("button", { name: /YEAR 2000/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");

    expect(anyText(/specially designed website/i)).toBe(true);
    expect(anyText(/Excite, Lycos, MSN, or Yahoo!/i)).toBe(true);
    expect(anyText(/hit counter \(illustrative\)/i)).toBe(true);
    expect(anyText(/Nasdaq peaked March 10, 2000/i)).toBe(true);
    expect(anyText(/\[P1\]/)).toBe(true);
    expect(anyText(/\[P2\]/)).toBe(true);

    // 2001's queue is not in the DOM yet.
    expect(screen.queryByRole("button", { name: /FIND TRACK/i })).not.toBeInTheDocument();
  });

  it("chapter 2 (2001): the history fork — labels win, queue freezes, Kazaa appears", () => {
    render(<PortalScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2001/i }));
    expect(
      screen.getByRole("button", { name: /HISTORY: THE RECORD LABELS WIN/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /WHAT IF: THE COURTS SIDE WITH NAPSTER/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /HISTORY: THE RECORD LABELS WIN/i }));
    expect(
      screen
        .getByRole("button", { name: /HISTORY: THE RECORD LABELS WIN/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(anyText(/Decision recorded/i)).toBe(true);
    expect(anyText(/CONNECTION LOST/i)).toBe(true);
    expect(anyText(/THE NETWORK LIVES ON/i)).toBe(true);
    expect(anyText(/Kazaa survived much longer/i)).toBe(true);

    // queue up to the cap, then the button locks
    const find = screen.getByRole("button", { name: /FIND TRACK/i });
    fireEvent.click(find);
    expect(anyText(/golden_hour\.mp3/i)).toBe(true);
    fireEvent.click(find);
    fireEvent.click(find);
    fireEvent.click(find);
    fireEvent.click(find);
    expect(find).toBeDisabled();
  });

  it("chapter 2, WHAT IF branch: the queue keeps growing, clearly labeled", () => {
    render(<PortalScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2001/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /WHAT IF: THE COURTS SIDE WITH NAPSTER/i }),
    );
    expect(anyText(/WHAT IF: the queue keeps growing/i)).toBe(true);
    expect(anyText(/not recorded history/i)).toBe(true);
    // the history banner is not shown
    expect(screen.queryByText(/CONNECTION LOST/i)).not.toBeInTheDocument();
  });

  it("chapter 3 (2004): search results arrive and the inbox opens", () => {
    render(<PortalScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2001/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: THE RECORD LABELS WIN/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2004/i }));

    const search = screen.getByRole("button", { name: /RUN SEARCH/i });
    fireEvent.click(search);
    fireEvent.click(search);
    expect(anyText(/Broadband: what is it\?/i)).toBe(true);
    expect(anyText(/example\.com/i)).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /OPEN INBOX/i }));
    expect(anyText(/Did you get my e-mail\?/i)).toBe(true);

    expect(anyText(/\[P6\]/)).toBe(true);
    expect(anyText(/\[P7\]/)).toBe(true);
    expect(anyText(/\[P8\]/)).toBe(true);
    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("a visitor who skips to 2004 undecided gets a path back to the fork", () => {
    render(<PortalScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2004/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(
      screen.getByRole("button", { name: /BACK TO 2001 — MAKE THE CALL/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /BACK TO 2001 — MAKE THE CALL/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: THE RECORD LABELS WIN/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2004/i }));

    expect(screen.queryByText(/THE FORK IS UNDECIDED/i)).not.toBeInTheDocument();
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("closes with the takeaway, verified facts and the simulation note", () => {
    render(<PortalScene />);
    expect(anyText(/KEY TAKEAWAY/i)).toBe(true);
    expect(anyText(/FACTS \(SOURCE-VERIFIED\)/i)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
    expect(anyText(/START OVER — BACK TO 2000/i)).toBe(true);
  });
});