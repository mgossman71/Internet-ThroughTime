import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { AiEraScene } from "./AiEraScene";

describe("AiEraScene (2022–2026, in progress)", () => {
  const anyText = (re: RegExp) =>
    screen
      .queryAllByText(re)
      .some((n) => n.textContent && re.test(n.textContent));

  it("chapter 1 (2022): the chat is on screen with zero asks", () => {
    render(<AiEraScene />);

    expect(
      screen.getByRole("button", { name: /YEAR 2022/i }).getAttribute("aria-pressed"),
    ).toBe("true");

    expect(anyText(/generative artificial intelligence chatbot/i)).toBe(true);
    expect(anyText(/GPT-3\.5/i)).toBe(true);
    expect(anyText(/\[AI1\]/)).toBe(true);

    // 2023's model panel / fork and 2025's frontier are not in the DOM yet.
    expect(screen.queryByRole("button", { name: /LOAD THE 2023 MODEL/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /OPEN THE FRONTIER/i })).not.toBeInTheDocument();
  });

  it("chapter 2 (2023): the fork — AI is a tool (history) vs AGI (WHAT IF)", () => {
    render(<AiEraScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2023/i }));
    expect(
      screen.getByRole("button", { name: /HISTORY: AI is a tool/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /WHAT IF: AGI is already here/i }),
    ).toBeInTheDocument();
    // the console mirror button is present before the branch is locked
    expect(anyText(/AI IS A TOOL \(HISTORY\)/i)).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI is a tool/i }));
    expect(
      screen
        .getByRole("button", { name: /HISTORY: AI is a tool/i })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(anyText(/Decision recorded/i)).toBe(true);
    // after the lock, the console shows the "a tool" status line
    expect(anyText(/a very capable assistant, not a mind/i)).toBe(true);
  });

  it("chapter 2, WHAT IF branch: AGI is here, clearly labeled", () => {
    render(<AiEraScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2023/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /WHAT IF: AGI is already here/i }),
    );
    expect(anyText(/not established fact/i)).toBe(true);
    expect(anyText(/Decision recorded/i)).toBe(true);
  });

  it("chapter 3 (2025): in progress, the frontier opens, the live edge", () => {
    render(<AiEraScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEAR 2023/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI is a tool/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEARS 2025–2026/i }));

    expect(anyText(/as of September 2026/i)).toBe(true);
    expect(anyText(/\[AI5\]/)).toBe(true);

    const open = screen.getByRole("button", { name: /OPEN THE FRONTIER/i });
    fireEvent.click(open);
    expect(anyText(/FRONTIER OPEN/i)).toBe(true);

    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("a visitor who skips to 2025 undecided gets a path back to the fork", () => {
    render(<AiEraScene />);

    fireEvent.click(screen.getByRole("button", { name: /YEARS 2025–2026/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(
      screen.getByRole("button", { name: /BACK TO 2023 — MAKE THE CALL/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /BACK TO 2023 — MAKE THE CALL/i }));
    fireEvent.click(screen.getByRole("button", { name: /HISTORY: AI is a tool/i }));
    fireEvent.click(screen.getByRole("button", { name: /YEARS 2025–2026/i }));

    expect(screen.queryByText(/THE FORK IS UNDECIDED/i)).not.toBeInTheDocument();
    expect(anyText(/You took the history path/i)).toBe(true);
  });

  it("closes with the takeaway, verified facts and the simulation note", () => {
    render(<AiEraScene />);
    expect(anyText(/KEY TAKEAWAY/i)).toBe(true);
    expect(anyText(/FACTS \(SOURCE-VERIFIED\)/i)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
    expect(anyText(/START OVER — BACK TO 2022/i)).toBe(true);
  });
});