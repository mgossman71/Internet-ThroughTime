/**
 * DialupScene component tests (exhibit 04).
 *
 * The dial→carrier→login sequence runs on REAL timers (~2.5 s), so these
 * tests wait for the transcript lines to land (same pattern as the
 * flag-day test in Tcpip1983Scene.test.tsx).
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DialupScene } from './DialupScene';

const T = { timeout: 4000 };

describe('DialupScene', () => {
  it('starts idle: modem desk ready, board seeded, no menu yet', () => {
    render(<DialupScene />);
    expect(screen.getByRole('button', { name: /dial the board/i })).toBeInTheDocument();
    // four modem standards (D3/D4) — anchor regexes: V.32's note also mentions V.32bis
    expect(screen.getByRole('button', { name: /^V\.22bis/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^V\.32bis/ })).toBeInTheDocument();
    // default selection is the era's 2400-baud standard
    expect(
      screen.getByRole('button', { name: /^V\.22bis/ }).getAttribute('aria-pressed'),
    ).toBe('true');
    // no BBS menu before a call
    expect(screen.queryByRole('button', { name: /\[M\] MESSAGES/i })).toBeNull();
  });

  it('runs a full session: dial → connect → login → read → post → hang up', async () => {
    render(<DialupScene />);

    fireEvent.click(screen.getByRole('button', { name: /dial the board/i }));

    await waitFor(() => {
      expect(screen.getByText('CONNECT 2400')).toBeInTheDocument();
    }, T);
    await waitFor(() => {
      expect(screen.getByText(/MIDNIGHT EXPRESS BBS/i)).toBeInTheDocument();
    }, T);

    // browse a seeded message (D1–D5)
    fireEvent.click(screen.getByRole('button', { name: /\[M\] MESSAGES \(2\)/i }));
    fireEvent.click(screen.getByRole('button', { name: /SYSOP.*WELCOME TO THE BOARD/i }));
    await waitFor(() => {
      expect(screen.getByText('*** end of message')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button', { name: /back to list/i }));
    fireEvent.click(screen.getByRole('button', { name: /^\[←\] BACK$/i }));

    // post a reply (POST is disabled until the draft has text)
    fireEvent.click(screen.getByRole('button', { name: /^\[P\] POST$/i }));
    const box = screen.getByLabelText(/new message to the board/i);
    const postBtn = () => screen.getByRole('button', { name: /^\[P\] POST$/i });
    expect(postBtn()).toBeDisabled();
    fireEvent.change(box, { target: { value: 'Anybody else on 2400?' } });
    expect(postBtn()).not.toBeDisabled();
    fireEvent.click(postBtn());
    await waitFor(() => {
      expect(screen.getByText('*** MESSAGE POSTED TO THE BOARD')).toBeInTheDocument();
    });

    // hang up: carrier drops, the board survives
    fireEvent.click(screen.getByRole('button', { name: /\[H\] HANG UP/i }));
    expect(screen.getByText(/DISCONNECTED — the line is quiet again/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dial again/i })).toBeInTheDocument();
  });

  it('dials at the selected standard rate (V.32bis → CONNECT 14400)', async () => {
    render(<DialupScene />);

    fireEvent.click(screen.getByRole('button', { name: /^V\.32bis/ }));
    expect(
      screen.getByRole('button', { name: /^V\.32bis/ }).getAttribute('aria-pressed'),
    ).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: /dial the board/i }));
    await waitFor(() => {
      expect(screen.getByText('CONNECT 14400')).toBeInTheDocument();
    }, T);
  });

  it('shows the verified milestones and facts with their source tags', () => {
    render(<DialupScene />);
    expect(screen.getByText(/CBBS GOES ONLINE/i)).toBeInTheDocument();
    expect(screen.getByText(/THE WEB TAKES OVER/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\[(D[1-7])\]/g).length).toBeGreaterThan(3);
    expect(screen.getByText(/ILLUSTRATIVE recreation/i)).toBeInTheDocument();
  });
});
