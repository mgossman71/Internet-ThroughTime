/**
 * The right-hand "kernel-mail" terminal for the 1991–1996 Linux era
 * (exhibit 06). Shows the append-only transcript from the engine, with
 * the chapter-specific action in the footer (receive a patch / revise /
 * decide first) — the interactive anchor, like the BBS terminal in era 02.
 */

import { useEffect, useRef } from 'react';
import { MAX_PATCHES, type Branch, type EraYear } from './linuxData';
import type { TermLine } from './linuxEngine';

interface Props {
  lines: TermLine[];
  chapter: EraYear;
  branch: Branch | null;
  contributors: number;
  onPatch: () => void;
  onReconsider: () => void;
  onGoToFork: () => void;
}

export function LinuxTerminal({
  lines,
  chapter,
  branch,
  contributors,
  onPatch,
  onReconsider,
  onGoToFork,
}: Props) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines.length, chapter]);

  const status =
    branch === 'open'
      ? `kernel: OPEN — ${contributors} patch${contributors === 1 ? '' : 'es'} received (L2)`
      : branch === 'closed'
        ? 'kernel: CLOSED (hypothetical — real Linux went GPL, L2)'
        : 'kernel: UNLICENSED — the fork is undecided (L2)';

  return (
    <aside className="lx-term" aria-label="Linux kernel-mail terminal">
      <div className="lx-term-bar">
        <span className="lx-term-dot" aria-hidden="true" />
        linux90s — kernel-mail
      </div>
      <div className="lx-screen" ref={screenRef} role="log" aria-live="polite">
        {lines.map((l) => (
          <div key={l.id} className={`lx-line lx-line-${l.kind}`}>
            {l.text}
          </div>
        ))}
        <div className="lx-line lx-line-cursor">
          <span className="lx-cursor" aria-hidden="true">
            ▌
          </span>
        </div>
      </div>
      <div className="lx-term-foot">
        <span className="lx-status">{status}</span>
        {chapter === 1996 && branch === 'open' && (
          <button
            className="lx-btn"
            onClick={onPatch}
            disabled={contributors >= MAX_PATCHES}
            aria-label="Receive a patch"
          >
            RECEIVE A PATCH
          </button>
        )}
        {chapter === 1996 && branch === 'closed' && (
          <button className="lx-btn lx-btn-ghost" onClick={onReconsider} aria-label="Revise the fork decision">
            REVISE DECISION
          </button>
        )}
        {chapter === 1996 && branch === null && (
          <button className="lx-btn lx-btn-ghost" onClick={onGoToFork} aria-label="Go back to chapter 2 and decide the fork">
            DECIDE FIRST (CH. 2)
          </button>
        )}
      </div>
    </aside>
  );
}