/**
 * Tcpip1983Scene component test: initial state, mismatch catch, flag day.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tcpip1983Scene } from './Tcpip1983Scene';

describe('Tcpip1983Scene', () => {
  it('starts with all eight hosts on NCP, every one switchable, and no MILNET', () => {
    render(<Tcpip1983Scene />);

    // Per-host SWITCH buttons exist for all eight named hosts…
    expect(
      screen.getAllByRole('button', { name: /^switch .* to tcp\/ip$/i }),
    ).toHaveLength(8);
    // …and MILNET has not split off yet (no hit target, no host row).
    expect(screen.queryByRole('button', { name: /^select milnet$/i })).toBeNull();
  });

  it('refuses a cross-protocol send with a PROTOCOL MISMATCH', () => {
    render(<Tcpip1983Scene />);

    // Switch only UCLA to TCP/IP — default send is UCLA → SRI, now mixed.
    fireEvent.click(screen.getByRole('button', { name: /^switch ucla to tcp\/ip$/i }));
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }));

    expect(
      screen.getByText(/PROTOCOL MISMATCH — UCLA speaks TCP\/IP, SRI speaks NCP/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/failed: 1/i)).toBeInTheDocument();
  });

  it('runs the Jan 1, 1983 flag day: MILNET splits off and one host keeps NCP', async () => {
    render(<Tcpip1983Scene />);

    fireEvent.click(screen.getByRole('button', { name: /run flag day/i }));

    // The flag-day line lands synchronously…
    await waitFor(() => {
      expect(screen.getByText(/FLAG DAY · January 1, 1983/i)).toBeInTheDocument();
    });
    // …then the scripted sweep finishes (hosts, MILNET, the exception).
    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: /^select milnet$/i })).toBeInTheDocument();
      },
      { timeout: 8000 },
    );
    expect(screen.getByText(/keeps NCP — one of the special cases/i)).toBeInTheDocument();
    expect(screen.getByText(/MILNET splits off — the military-only network/i)).toBeInTheDocument();
  });

  it('delivers (or at least attempts) a same-protocol send before any switch', async () => {
    render(<Tcpip1983Scene />);

    // Default UCLA → SRI, both NCP: the send is accepted. Simulated loss
    // (4%) may drop the packet, so assert the shared invariants: a
    // "mail:" log line and the sent counter.
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/^mail: /i)).toBeInTheDocument();
    });
    expect(screen.getByText(/sent: 1/i)).toBeInTheDocument();
  });
});
