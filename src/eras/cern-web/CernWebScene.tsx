/**
 * CernWebScene — the full 1989–1993 "CERN & the Web" era (exhibit 05).
 *
 * Layout (mirrors DialupScene, exhibit 04):
 *   era header → year desk (left) + WorldWideWeb browser (right) →
 *   milestones strip → verified facts → simplified-simulation footnote.
 *
 * The year desk is the interactive control (pick a year); the browser is the
 * exhibit whose reach grows as the years pass. Engine: cernwebEngine.ts,
 * hook: useCernwebSim.ts. All copy is W-tagged to docs/SOURCES.md.
 */
import { BrowserWindow } from '../../simulations/cernweb/BrowserWindow';
import {
  FACTS,
  FOOTNOTE,
  LEDE,
  MILESTONES,
  YEARS,
  type EraYear,
} from '../../simulations/cernweb/cernwebData';
import { useCernwebSim } from '../../simulations/cernweb/useCernwebSim';
import '../../styles/eras/cernweb.css';

function YearDesk({
  year,
  onSelect,
}: {
  year: EraYear;
  onSelect: (year: EraYear) => void;
}) {
  const selected = YEARS.find((y) => y.year === year) ?? YEARS[0];
  return (
    <section className="panel cw-desk" aria-label="Year desk">
      <header className="cw-desk-head">
        <h3>THE YEARS — PICK A MOMENT</h3>
        <p className="cw-desk-sub">
          One proposal, one NeXT computer, one page with links. Pick a year —
          the browser&rsquo;s reach grows as the Web is born (W1–W5).
        </p>
      </header>
      <div className="cw-yearlist" role="group" aria-label="Years">
        {YEARS.map((y) => {
          const isSel = y.year === year;
          return (
            <button
              key={y.year}
              type="button"
              className={`cw-yearbtn ${isSel ? 'is-sel' : ''}`}
              onClick={() => onSelect(y.year)}
              aria-pressed={isSel}
            >
              <span className="cw-year-num">{y.year}</span>
              <span className="cw-year-title">{y.title}</span>
            </button>
          );
        })}
      </div>
      <div className="cw-yearcard">
        <p>{selected.body}</p>
        <span className="cw-fact-tag">[{selected.source}]</span>
      </div>
    </section>
  );
}

export function CernWebScene() {
  const sim = useCernwebSim();
  const { state } = sim;

  return (
    <article className="cw-scene" aria-labelledby="cw-title">
      <header className="era-head">
        <p className="era-index">EXHIBIT 05 · 1989–1993</p>
        <h2 id="cw-title">CERN &amp; the Web</h2>
        <p className="era-lede">{LEDE}</p>
      </header>

      <div className="cw-grid">
        <div className="cw-left">
          <YearDesk year={state.year} onSelect={sim.setYear} />
        </div>
        <BrowserWindow sim={sim} />
      </div>

      <section className="cw-milestones" aria-label="Era milestones">
        <h3>MILESTONES — 1989 → 1994</h3>
        <ul className="cw-mile-list">
          {MILESTONES.map((m) => (
            <li
              key={m.year + m.title}
              className={m.inEra ? 'cw-mile-in' : 'cw-mile-out'}
            >
              <span className="cw-mile-year">{m.year}</span>
              <span className="cw-mile-title">{m.title}</span>
              <span className="cw-mile-detail">{m.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cw-facts" aria-label="Verified facts">
        <h3>VERIFIED</h3>
        <ul>
          {FACTS.map((f) => (
            <li key={f.source + f.text}>
              {f.text} <span className="cw-fact-tag">[{f.source}]</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="cw-footnote">{FOOTNOTE}</p>
    </article>
  );
}