/**
 * Expansion70sScene component test: timeline stepping + message wiring.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Expansion70sScene } from './Expansion70sScene';

describe('Expansion70sScene', () => {
  it('starts in 1971 with the first TIP online but no international nodes', () => {
    render(<Expansion70sScene />);

    expect(screen.getByRole('button', { name: /TIP #1/i })).toBeInTheDocument();
    // London and Norway join in 1973 — no hit target yet in 1971.
    expect(screen.queryByRole('button', { name: /LONDON/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /NORWAY/i })).toBeNull();
  });

  it('adds the first international nodes when the year reaches 1973', () => {
    render(<Expansion70sScene />);

    fireEvent.change(screen.getByRole('slider', { name: /timeline year/i }), {
      target: { value: '1973' },
    });

    expect(screen.getByRole('button', { name: /LONDON/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /NORWAY/i })).toBeInTheDocument();
  });

  it('sends a message and records it in the console log', async () => {
    render(<Expansion70sScene />);

    // Default from=UCLA to=SRI is a direct 1969 link. Simulated loss (4%)
    // may drop the packet, so assert the deterministic invariants both
    // outcomes share: a "mail:" log line and the sent counter.
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/^mail: /i)).toBeInTheDocument();
    });
    expect(screen.getByText(/sent: 1/i)).toBeInTheDocument();
  });
});
