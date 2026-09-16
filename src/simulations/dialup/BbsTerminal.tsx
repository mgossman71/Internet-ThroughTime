/**
 * BbsTerminal — the right-hand panel of exhibit 04.
 *
 * Renders the session transcript (terminal), the phase-specific controls
 * (DIAL / main menu / message list / post form), and a board summary.
 * The engine (dialupEngine.ts) is the source of truth for legality.
 */

import { useEffect, useRef, useState } from 'react';
import { sound } from '../../audio/SoundManager';
import { MODEMS } from './dialupData';
import type { DialupSim } from './useDialupSim';

const LINE_CLASS: Record<string, string> = {
  cmd: 'du-line-cmd',
  sys: 'du-line-sys',
  bbs: 'du-line-bbs',
  msg: 'du-line-msg',
};

export function BbsTerminal({ sim }: { sim: DialupSim }) {
  const { state } = sim;
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the transcript as lines land.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.lines.length]);

  const canMenu = state.phase === 'connected' && state.loggedIn;
  const selected = MODEMS.find((m) => m.id === state.modem);

  return (
    <section className="panel du-terminal" aria-label="BBS terminal">
      <header className="du-term-head">
        <h3>BBS TERMINAL</h3>
        <span className="du-line-state" role="status">
          {state.phase === 'idle' && 'LINE: OFF-HOOK READY'}
          {state.phase === 'dialing' && 'LINE: RINGING…'}
          {state.phase === 'connected' &&
            (state.loggedIn ? 'LINE: CARRIER — LOGGED IN' : 'LINE: CARRIER')}
          {state.phase === 'hanged' && 'LINE: HUNG UP'}
        </span>
      </header>

      <div
        ref={scrollRef}
        className="du-screen"
        role="log"
        aria-label="Session transcript"
      >
        {state.lines.map((l) => (
          <div key={l.id} className={`du-line ${LINE_CLASS[l.kind] ?? ''}`}>
            {l.text}
          </div>
        ))}
        {state.phase === 'dialing' && (
          <div className="du-line du-line-sys" aria-hidden="true">
            <span className="du-cursor">▌</span>
          </div>
        )}
      </div>

      {state.phase === 'idle' && (
        <div className="du-controls">
          <button
            type="button"
            className="btn btn-primary du-send-btn"
            onClick={() => sim.dial(state.modem)}
          >
            DIAL THE BOARD
          </button>
          <span className="du-hint">(dialing on {selected?.bits})</span>
        </div>
      )}

      {state.phase === 'dialing' && (
        <div className="du-controls">
          <span className="du-hint">
            The other end is ringing — wait for the handshake…
          </span>
        </div>
      )}

      {canMenu && state.menu === 'main' && (
        <div className="du-controls" role="group" aria-label="Main menu">
          <button
            type="button"
            className="btn"
            onClick={() => sim.toMenu('msgs')}
            disabled={state.board.length === 0}
          >
            [M] MESSAGES ({state.board.length})
          </button>
          <button type="button" className="btn" onClick={() => sim.toMenu('post')}>
            [P] POST
          </button>
          <button type="button" className="btn btn-danger" onClick={sim.hangup}>
            [H] HANG UP
          </button>
        </div>
      )}

      {canMenu && state.menu === 'msgs' && (
        <div className="du-controls">
          <ul className="du-msg-list">
            {state.board.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  className="du-msg-btn"
                  onClick={() => {
                    sound.uiTick();
                    sim.viewMessage(m.id);
                  }}
                >
                  <span className="du-msg-author">{m.author}</span>
                  <span className="du-msg-subject">{m.subject}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="du-subcontrols">
            <button type="button" className="btn" onClick={() => sim.toMenu('main')}>
              [←] BACK
            </button>
          </div>
        </div>
      )}

      {canMenu && state.menu === 'view' && (
        <div className="du-subcontrols">
          <button type="button" className="btn" onClick={() => sim.toMenu('msgs')}>
            [←] BACK TO LIST
          </button>
          <button type="button" className="btn" onClick={() => sim.toMenu('main')}>
            [M] MAIN MENU
          </button>
        </div>
      )}

      {canMenu && state.menu === 'post' && (
        <div className="du-controls">
          <label className="du-post-label" htmlFor="du-post">
            New message to the board
          </label>
          <textarea
            id="du-post"
            className="du-post-input"
            rows={3}
            maxLength={240}
            value={draft}
            placeholder="240 chars max — the line is precious"
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="du-subcontrols">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (!draft.trim()) return;
                sim.post(draft);
                setDraft('');
              }}
              disabled={!draft.trim()}
            >
              [P] POST
            </button>
            <button type="button" className="btn" onClick={() => sim.toMenu('main')}>
              [←] CANCEL
            </button>
          </div>
        </div>
      )}

      {state.phase === 'hanged' && (
        <div className="du-controls">
          <button
            type="button"
            className="btn btn-primary du-send-btn"
            onClick={() => sim.dial(state.modem)}
          >
            DIAL AGAIN
          </button>
          <span className="du-hint">(the board — and your posts — are still there)</span>
        </div>
      )}
    </section>
  );
}

