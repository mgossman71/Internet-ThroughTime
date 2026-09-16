/**
 * 1986–1994 BBS & Dial-Up scene (exhibit 04).
 *
 * Layout: era header → modem desk (left) + BBS terminal (right) →
 * milestones strip → verified facts → simplified-simulation footnote.
 * The modem desk is a static reference card (D3/D4); the terminal is the
 * interactive exhibit (engine: dialupEngine.ts, hook: useDialupSim.ts).
 */

import { BbsTerminal } from '../../simulations/dialup/BbsTerminal';
import { FACTS, FOOTNOTE, LEDE, MILESTONES, MODEMS } from '../../simulations/dialup/dialupData';
import { useDialupSim } from '../../simulations/dialup/useDialupSim';
import '../../styles/eras/dialup.css';

function ModemDesk({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="panel du-desk" aria-label="Modem desk">
      <header className="du-desk-head">
        <h3>MODEM DESK — PICK YOUR STANDARD</h3>
        <p className="du-desk-sub">
          Four standards carry the era (D3, D4). Pick one — it sets the{' '}
          <code>CONNECT</code> rate the board answers with.
        </p>
      </header>
      <div className="du-modem-grid">
        {MODEMS.map((m) => {
          const isSel = m.id === selected;
          return (
            <button
              key={m.id}
              type="button"
              className={`du-modem-card ${isSel ? 'is-sel' : ''}`}
              onClick={() => onSelect(m.id)}
              aria-pressed={isSel}
            >
              <span className="du-modem-name">{m.name}</span>
              <span className="du-modem-rate">{m.bits}</span>
              <span className="du-modem-year">{m.year}</span>
              <span className="du-modem-note">{m.note}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function DialupScene() {
  const sim = useDialupSim();
  const { state } = sim;

  return (
    <article className="du-scene" aria-labelledby="du-title">
      <header className="era-head">
        <p className="era-index">EXHIBIT 04 · 1986–1994</p>
        <h2 id="du-title">BBS &amp; Dial-Up</h2>
        <p className="era-lede">{LEDE}</p>
      </header>

      <div className="du-grid">
        <div className="du-left">
          <ModemDesk
            selected={state.modem}
            onSelect={sim.select}
          />
        </div>
        <BbsTerminal sim={sim} />
      </div>

      <section className="du-milestones" aria-label="Era milestones">
        <h3>MILESTONES — 1978 → 1995</h3>
        <ul className="du-mile-list">
          {MILESTONES.map((m) => (
            <li
              key={m.year + m.title}
              className={m.inEra ? 'du-mile-in' : 'du-mile-out'}
            >
              <span className="du-mile-year">{m.year}</span>
              <span className="du-mile-title">{m.title}</span>
              <span className="du-mile-detail">{m.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="du-facts" aria-label="Verified facts">
        <h3>VERIFIED</h3>
        <ul>
          {FACTS.map((f) => (
            <li key={f.source + f.text}>
              {f.text} <span className="du-fact-tag">[{f.source}]</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="du-footnote">{FOOTNOTE}</p>
    </article>
  );
}
