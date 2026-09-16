/**
 * The 2000–2004 "Portals, P2P & Search" era scene (exhibit 07).
 * Three chapters around one fork:
 *   2000 — the front door: the portal (zero clicks)
 *   2001 — the fork: the record labels win (history) vs. courts side with
 *           Napster (labeled hypothetical) — the file queue decides the feel
 *   2004 — meaning & mail: search (Google IPO) + webmail (Hotmail → Gmail)
 *
 * Left column = chapters + per-chapter panels + closing + facts;
 * right column = the period-style browser window (PortalBrowser).
 * Facts carry [P#] tags (docs/SOURCES.md §P, verified 2026-09-16).
 */

import "../../styles/eras/portal2000s.css";
import { BRANCHES, CHAPTERS, FACTS } from "../../simulations/portal2000s/portalData";
import { PortalBrowser } from "../../simulations/portal2000s/PortalBrowser";
import { usePortalSim } from "../../simulations/portal2000s/usePortalSim";

export function PortalScene() {
  const sim = usePortalSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.id === state.chapter) ?? CHAPTERS[0];
  const chapterFacts = FACTS[state.chapter];

  return (
    <div className="p2k-scene">
      <div className="p2k-grid">
        <div className="p2k-left">
          {/* chapter stepper */}
          <nav className="p2k-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={`p2k-step${state.chapter === c.id ? " p2k-step-on" : ""}`}
                aria-pressed={state.chapter === c.id}
                onClick={() => sim.setChapter(c.id)}
              >
                <span className="p2k-step-kicker">{c.kicker}</span>
                <span className="p2k-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          {/* chapter card */}
          <section className="p2k-card">
            <p className="p2k-kicker">{chapter.kicker}</p>
            <h2 className="p2k-title">{chapter.title}</h2>
            <p className="p2k-story">{chapter.story}</p>
            <p className="p2k-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{" "}
              <em className="p2k-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* 2001: the fork */}
          {state.chapter === "2001" && (
            <section className="p2k-card">
              <h3 className="p2k-panel-h">THE FORK — WHO WINS IN 2001?</h3>
              <div className="p2k-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`p2k-fork-opt${state.branch === b.id ? " p2k-fork-on" : ""}${b.hypothetical ? " p2k-fork-whatif" : ""}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="p2k-fork-name">{b.label}</span>
                    <span className="p2k-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {state.branch && (
                <p className="p2k-note">
                  Decision recorded:{" "}
                  <strong>
                    {state.branch === "labelsWin"
                      ? "the record labels win"
                      : "the courts side with Napster (WHAT IF)"}
                  </strong>{" "}
                  — the branch is locked.{" "}
                  <button className="p2k-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* 2004, undecided: the recovery path */}
          {state.chapter === "2004" && state.branch === null && (
            <section className="p2k-card">
              <h3 className="p2k-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="p2k-story">
                The story needs your call: the record labels, or Napster? (P3–P4)
              </p>
              <button className="p2k-btn" onClick={() => sim.setChapter("2001")}>
                BACK TO 2001 — MAKE THE CALL
              </button>
            </section>
          )}

          {/* closing */}
          <section className="p2k-card p2k-closing">
            <h3 className="p2k-panel-h">WHAT YOU SAW</h3>
            <p className="p2k-story">
              The front door changed shape. In 2000 the portal was the web; by
              2004 the web is files that move (P3–P4), search that finds (P6),
              and mail that grows (P7–P8). The portal didn't lose — it became
              one tab among many.
            </p>
            {state.branch === "labelsWin" && (
              <p className="p2k-story">
                You took the history path: Napster shut down July 2001, but
                the network survived (P3–P4).
              </p>
            )}
            {state.branch === "napsterLives" && (
              <p className="p2k-story">
                You took the WHAT IF path — illustrative, not recorded history.
                The real Napster was shut down in July 2001 (P3).
              </p>
            )}
            <button className="p2k-btn p2k-btn-ghost" onClick={() => sim.reset()}>
              START OVER — BACK TO 2000
            </button>
          </section>

          {/* facts for the current chapter */}
          <section className="p2k-card">
            <h3 className="p2k-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="p2k-facts">
              {chapterFacts.map((f) => (
                <li key={f.id}>
                  {f.text} <em className="p2k-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="p2k-footnote">
            SIMPLIFIED SIMULATION — the portal page, share queue, search
            results, and inbox are illustrative recreations (not real pages or
            messages). Facts and quotes are verified (docs/SOURCES.md §P). The
            "WHAT IF: the courts side with Napster" branch is a labeled
            hypothetical — real Napster was shut down in July 2001 (P3).
          </p>
        </div>

        <PortalBrowser
          state={state}
          onQueueFile={() => sim.queueFile()}
          onRunSearch={() => sim.runSearch()}
          onReadMail={() => sim.readMail()}
          onSetChapter={(c) => sim.setChapter(c)}
          onChooseBranch={(b) => sim.chooseBranch(b)}
        />
      </div>
    </div>
  );
}