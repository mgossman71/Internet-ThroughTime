/**
 * CernWebScene component tests (exhibit 05, 1989–1993).
 */
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CernWebScene } from './CernWebScene';

describe('CernWebScene', () => {
  it('starts at 1989: year desk ready, browser shows "no web yet"', () => {
    render(<CernWebScene />);

    // four years on the desk (W1–W5)
    expect(screen.getByRole('button', { name: /^1989/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^1990/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^1991/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^1993/ })).toBeInTheDocument();

    // default selection is 1989 (the proposal)
    expect(
      screen.getByRole('button', { name: /^1989/ }).getAttribute('aria-pressed'),
    ).toBe('true');

    // no browser yet
    expect(screen.getByText('NO WEB YET')).toBeInTheDocument();
    expect(
      screen.getByText('(none — no web yet)'),
    ).toBeInTheDocument();
    // and no sub-page links before 1991
    expect(
      screen.queryByRole('button', { name: /guide to the web/i }),
    ).toBeNull();
  });

  it('runs the full arc: 1990 browser → 1991 links → 1993 public domain', () => {
    render(<CernWebScene />);

    // 1990 — first browser + server (project page only)
    fireEvent.click(screen.getByRole('button', { name: /^1990/ }));
    expect(screen.getByText('http://info.cern.ch')).toBeInTheDocument();
    expect(
      screen.getByText('Information Management: A Proposal'),
    ).toBeInTheDocument();
    // sub-pages are not published yet
    expect(
      screen.queryByRole('button', { name: /guide to the web/i }),
    ).toBeNull();

    // 1991 — the first website is live; links appear
    fireEvent.click(screen.getByRole('button', { name: /^1991/ }));
    expect(screen.getByRole('button', { name: /guide to the web/i })).toBeInTheDocument();

    // follow a link → the URL bar and status update
    fireEvent.click(screen.getByRole('button', { name: /guide to the web/i }));
    expect(
      screen.getByText('http://info.cern.ch/hypertext/WWW/TheProject.html'),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/GET http:\/\//i).length).toBeGreaterThan(0);

    // 1993 — public domain: stamp + save-the-source
    fireEvent.click(screen.getByRole('button', { name: /^1993/ }));
    expect(
      screen.getByText(/PUBLIC DOMAIN — 30 APRIL 1993/i),
    ).toBeInTheDocument();
    const save = screen.getByRole('button', { name: /save the source/i });
    expect(save).not.toBeDisabled();
    fireEvent.click(save);
    expect(
      screen.getByRole('button', { name: /source saved — use it freely/i }),
    ).toBeDisabled();
  });

  it('keeps the visit history when going back to 1989, then re-opening', () => {
    render(<CernWebScene />);

    // visit a page in 1991, then jump back to 1989 (browser gone)
    fireEvent.click(screen.getByRole('button', { name: /^1991/ }));
    fireEvent.click(screen.getByRole('button', { name: /guide to the web/i }));
    fireEvent.click(screen.getByRole('button', { name: /^1989/ }));
    expect(screen.getByText('NO WEB YET')).toBeInTheDocument();

    // re-open 1991: still works, home page restored
    fireEvent.click(screen.getByRole('button', { name: /^1991/ }));
    expect(screen.getByText('http://info.cern.ch')).toBeInTheDocument();
  });

  it('shows the verified milestones and facts with their W-tags', () => {
    render(<CernWebScene />);
    expect(screen.getByText(/THE PROPOSAL/i)).toBeInTheDocument();
    expect(screen.getAllByText(/FIRST BROWSER \+ SERVER/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/PUBLIC DOMAIN — NO LICENCE/i)).toBeInTheDocument();
    // 1994 W3C is flagged as beyond this era
    expect(screen.getByText(/W3C IS FORMED/i)).toBeInTheDocument();
    expect(screen.getByText(/First published 6 August 1991/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\[(W[1-6])\]/g).length).toBeGreaterThan(3);
    // the simplified-simulation disclaimer
    expect(screen.getByText(/SIMPLIFIED SIMULATION/i)).toBeInTheDocument();
  });
});