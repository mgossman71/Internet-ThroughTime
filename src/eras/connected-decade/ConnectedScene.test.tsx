import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ConnectedScene } from "./ConnectedScene";

describe("ConnectedScene (2016–2022, three chapters)", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("chapter 1 (2016): the feed is on screen with zero likes", () => {
    render(<ConnectedScene />);

    expect(
      screen.getByRole("button", { name: /YEAR 2016/i }).getAttribute("aria-pressed"),
    ).toBe("true");

    expect(anyText(/user-generated short videos/i)).toBe(true);
    expect(anyText(/operated by ByteDance/i)).toBe(true);
    expect(anyText(/\[C4\]/)).toBe(true);

    // 2021's 5G panel / fork is not in the DOM yet.
    expect(screen.queryByRole("button", { name: /ENTER METAVERSE/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /CONNECT 5G/i })).not.toBeInTheDocument();
  });

  it("chapter 2 (2021): the history fork — AI wins, metaverse is WHAT IF", () => {
    render(<ConnectedScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEARS 2019–2021/i }));
    expect(
      screen.getByRole("button", { name: /HISTORY: AI answers you/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /WHAT IF: The metaverse becomes the next platform/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI answers you/i }));
    expect(
      screen
        .getByRole("button", { name: /HISTORY: AI answers you/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(anyText(/Decision recorded/i)).toBe(true);
    expect(anyText(/AI ANSWERS YOU \(HISTORY\)/i)).toBe(true);
  });

  it("chapter 2, WHAT IF branch: the metaverse wins, clearly labeled", () => {
    render(<ConnectedScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEARS 2019–2021/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /WHAT IF: The metaverse becomes the next platform/i }),
    );
    expect(anyText(/the metaverse becomes the next platform/i)).toBe(true);
    expect(anyText(/not the path history took/i)).toBe(true);
  });

  it("chapter 3 (2022): 5G lands, AI is coming, the baton passes", () => {
    render(<ConnectedScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEARS 2019–2021/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI answers you/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2022/i }));

    expect(anyText(/gained 100 million users within two months/i)).toBe(true);
    expect(anyText(/\[C7\]/)).toBe(true);

    const connect = screen.getByRole("button", { name: /CONNECT 5G/i });
    fireEvent.click(connect);
    expect(anyText(/5G CONNECTED/i)).toBe(true);

    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("a visitor who skips to 2022 undecided gets a path back to the fork", () => {
    render(<ConnectedScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2022/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(
      screen.getByRole("button", { name: /BACK TO 2021 — MAKE THE CALL/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /BACK TO 2021 — MAKE THE CALL/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI answers you/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEAR 2022/i }));

    expect(screen.queryByText(/THE FORK IS UNDECIDED/i)).not.toBeInTheDocument();
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("closes with the takeaway, verified facts and the simulation note", () => {
    render(<ConnectedScene />);
    expect(anyText(/KEY TAKEAWAY/i)).toBe(true);
    expect(anyText(/FACTS \(SOURCE-VERIFIED\)/i)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
    expect(anyText(/START OVER — BACK TO 2016/i)).toBe(true);
  });
});