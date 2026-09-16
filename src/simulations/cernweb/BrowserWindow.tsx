/**
 * BrowserWindow — the right-hand panel of exhibit 05.
 *
 * A 1990s-style "WorldWideWeb" browser whose reach grows over the years:
 *  1989 → no browser, just the proposal
 *  1990 → first browser + server (project page only)
 *  1991 → the first website is live (sub-pages become links)
 *  1993 → PUBLIC DOMAIN stamp + save-the-source action
 *
 * The engine (cernwebEngine.ts) is the source of truth for legality; the
 * links shown are filtered to what's reachable in the current year.
 */
import { PAGE_BY_ID, REACHABLE } from './cernwebData';
import type { CernwebSim } from './useCernwebSim';

const STATE_TEXT: Record<number, string> = {
  1989: 'NO BROWSER — PROPOSAL STAGE',
  1990: 'BROWSER: WorldWideWeb (NeXT) — CERN only',
  1991: 'BROWSER: online — the first website',
  1993: 'BROWSER: online — PUBLIC DOMAIN',
};

export function BrowserWindow({ sim }: { sim: CernwebSim }) {
  const { state } = sim;
  const page = state.page ? PAGE_BY_ID[state.page] : null;
  const reachable = new Set(REACHABLE[state.year]);
  const lastLine = state.log[state.log.length - 1]?.text ?? '';

  return (
    <section className="panel cw-browser" aria-label="WorldWideWeb browser">
      <header className="cw-brow-head">
        <h3>WorldWideWeb</h3>
        <span className="cw-brow-state" role="status">
          {STATE_TEXT[state.year]}
        </span>
      </header>

      <div className="cw-urlbar">
        <span className="cw-url-label">URL</span>
        <code className="cw-url">{page ? page.url : '(none — no web yet)'}</code>
      </div>

      <div className="cw-page" role="document" aria-label="Current page">
        {state.year === 1989 || !page ? (
          <div className="cw-no-web">
            <p className="cw-no-web-title">NO WEB YET</p>
            <p>
              1989 — at CERN, a proposal is being written: a "universal linked
              information system" (W1).
            </p>
            <p>Choose 1990 to see the first browser and server.</p>
          </div>
        ) : (
          <article className="cw-page-doc">
            <h4 className="cw-page-title">{page.title}</h4>
            {page.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="cw-links">
              {page.links
                .filter((l) => reachable.has(l.target))
                .map((l) => (
                  <button
                    key={l.target}
                    type="button"
                    className="cw-link"
                    onClick={() => sim.navigate(l.target)}
                  >
                    {l.label}
                  </button>
                ))}
            </div>
          </article>
        )}
      </div>

      {state.publicDomain && (
        <div className="cw-public">
          <span className="cw-stamp">
            PUBLIC DOMAIN — 30 APRIL 1993 · NO LICENCE (W5)
          </span>
          <div className="cw-controls">
            <button
              type="button"
              className="btn btn-primary"
              onClick={sim.download}
              disabled={state.downloaded}
            >
              {state.downloaded
                ? 'SOURCE SAVED — USE IT FREELY'
                : 'SAVE THE SOURCE (FREE)'}
            </button>
          </div>
        </div>
      )}

      <footer className="cw-status" role="status">
        {lastLine}
      </footer>
    </section>
  );
}