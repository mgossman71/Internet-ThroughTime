/**
 * App smoke test: shell, header, timeline nav, and intro scene all mount.
 */
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the intro scene inside the CRT shell', () => {
    render(<App />);
    expect(
      screen.getByRole('button', { name: /enter the museum/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /timeline of eras/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/ARPANET/i).length).toBeGreaterThan(0); // nav chip (+ intro copy)
  });

  it('renders a sound toggle (default: muted)', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /enable sound/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });
});
