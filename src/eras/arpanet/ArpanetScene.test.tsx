/**
 * ArpanetScene component test: node boot + console log wiring.
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ArpanetScene } from './ArpanetScene';

describe('ArpanetScene', () => {
  it('shows two offline nodes and boots one via its power button', async () => {
    render(<ArpanetScene />);

    const powerButtons = screen.getAllByRole('button', { name: 'POWER ON' });
    // UCSB and UTAH start offline (SRI and UCLA are online at start).
    expect(powerButtons.length).toBe(2);

    fireEvent.click(powerButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/IMP powered on at/i)).toBeInTheDocument();
    });
  });

  it('sends a message and records it in the console log', async () => {
    render(<ArpanetScene />);

    // Default from=UCLA to=SRI is a direct link — send immediately.
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }));

    await waitFor(() => {
      expect(screen.getByText(/message: ucla → sri/i)).toBeInTheDocument();
    });
  });
});
