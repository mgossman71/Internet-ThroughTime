import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LinuxScene } from './LinuxScene';

describe('LinuxScene (1991–1996, three chapters)', () => {
  const anyText = (re: RegExp) =>
    screen.queryAllByText(re).some((n) => n.textContent && re.test(n.textContent));

  it('chapter 1 (1991): the announcement is on screen with zero clicks', () => {
    render(<LinuxScene />);

    expect(
      screen
        .getByRole('button', { name: /A hobby, announced in a forum/i })
        .getAttribute('aria-pressed'),
    ).toBe('true');

    expect(anyText(/hobby operating system/i)).toBe(true);
    expect(anyText(/free of all commercial interest/i)).toBe(true);
    expect(anyText(/One person can start a platform/i)).toBe(true);
    expect(anyText(/\[L1\]/)).toBe(true);

    // Chapter 2's fork is not in the DOM yet.
    expect(screen.queryByRole('button', { name: /RELEASE UNDER THE GNU GPL/i })).not.toBeInTheDocument();
  });

  it('chapter 2 (1992): the fork — choosing GPL records the decision', () => {
    render(<LinuxScene />);

    fireEvent.click(screen.getByRole('button', { name: /The fork: open or closed/i }));
    expect(screen.getByRole('button', { name: /RELEASE UNDER THE GNU GPL/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /KEEP IT CLOSED/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /RELEASE UNDER THE GNU GPL/i }));
    expect(
      screen
        .getByRole('button', { name: /RELEASE UNDER THE GNU GPL/i })
        .getAttribute('aria-pressed'),
    ).toBe('true');
    expect(anyText(/Decision recorded/i)).toBe(true);
    expect(anyText(/GPL v2/i)).toBe(true);
  });

  it('chapter 3 (1996), open branch: patches unlock 1.0 and 2.0; it runs the Web', () => {
    render(<LinuxScene />);

    fireEvent.click(screen.getByRole('button', { name: /The fork: open or closed/i }));
    fireEvent.click(screen.getByRole('button', { name: /RELEASE UNDER THE GNU GPL/i }));
    fireEvent.click(screen.getByRole('button', { name: /It runs the Web/i }));

    // 0.12 is lit at zero patches; 1.0 and 2.0 are not yet.
    const versions = document.querySelectorAll('.lx-ver');
    expect(versions.length).toBe(3);
    expect(versions[0].className).toContain('lx-ver-on');
    expect(versions[1].className).not.toContain('lx-ver-on');

    // Five patches → 1.0 unlocks.
    const patch = screen.getByRole('button', { name: 'Receive a patch' });
    for (let i = 0; i < 5; i++) fireEvent.click(patch);
    const after = document.querySelectorAll('.lx-ver');
    expect(after[1].className).toContain('lx-ver-on');
    expect(anyText(/patch #5 —/i)).toBe(true);

    // Where it runs.
    expect(anyText(/WEB SERVERS/i)).toBe(true);
    expect(anyText(/SUPERCOMPUTERS/i)).toBe(true);
    expect(anyText(/The hobby is still running/i)).toBe(true);
  });

  it('chapter 3, closed branch: the what-if is labeled hypothetical', () => {
    render(<LinuxScene />);

    fireEvent.click(screen.getByRole('button', { name: /The fork: open or closed/i }));
    fireEvent.click(screen.getByRole('button', { name: /KEEP IT CLOSED/i }));
    fireEvent.click(screen.getByRole('button', { name: /It runs the Web/i }));

    expect(anyText(/THE "WHAT IF" — CLOSED \(HYPOTHETICAL\)/i)).toBe(true);
    expect(anyText(/the last release anyone would have seen \(hypothetical\)/i)).toBe(true);
    // no patch button on the closed branch
    expect(screen.queryByRole('button', { name: 'Receive a patch' })).not.toBeInTheDocument();
  });

  it('a visitor who skips to 1996 undecided gets a path back to the fork', () => {
    render(<LinuxScene />);

    fireEvent.click(screen.getByRole('button', { name: /It runs the Web/i }));
    expect(anyText(/THE FORK IS UNDECIDED/i)).toBe(true);
    expect(screen.getByRole('button', { name: /BACK TO CHAPTER 2 — DECIDE THE FORK/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /BACK TO CHAPTER 2 — DECIDE THE FORK/i }));
    fireEvent.click(screen.getByRole('button', { name: /RELEASE UNDER THE GNU GPL/i }));

    fireEvent.click(screen.getByRole('button', { name: /It runs the Web/i }));
    expect(anyText(/THE RELEASE LINE/i)).toBe(true);
    expect(screen.getByRole('button', { name: 'Receive a patch' })).toBeInTheDocument();
  });

  it('closes with the takeaway, milestones, verified facts and the simulation note', () => {
    render(<LinuxScene />);
    expect(anyText(/WHAT YOU SAW/i)).toBe(true);
    expect(anyText(/MILESTONES/i)).toBe(true);
    expect(anyText(/Linux 2\.0 — SMP \+ 64-bit \(L4\)/i)).toBe(true);
    expect(anyText(/\[L5\]/)).toBe(true);
    expect(anyText(/SIMPLIFIED SIMULATION/i)).toBe(true);
  });
});