/**
 * The 2005–2009 "Broadband & the Open Web" era scene (exhibit 08).
 * Three chapters around one fork:
 *   2005 — the encyclopedia anyone can edit: Nupedia vs. Wikipedia,
 *           the 2005 Nature study, the Seigenthaler case (zero clicks)
 *   2007 — the fork: open uploads + copyright fights (history) vs.
 *           licensed-only uploads (labeled hypothetical)
 *   2009 — a network for everyone: dial-up → broadband, the FCC's
 *           National Broadband Plan, Wikipedia at 3 million articles
 *
 * Left column = chapters + per-chapter panels + closing + facts;
 * right column = the period-style open-web window (OpenWebBrowser).
 * Facts carry [B#] tags (docs/SOURCES.md §B, verified 2026-09-16).
 */

import "../../styles/eras/broadband2000s.css";
import {
  BRANCHES,
  CHAPTERS,
  FACTS,
} from "../../simulations/broadband2000s/broadbandData";
import { OpenWebBrowser } from "../../simulations/broadband2000s/OpenWebBrowser";
import { useBroadbandSim } from "../../simulations/broadband2000s/useBroadbandSim";

export function BroadbandScene() {
  const sim = useBroadbandSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.id === state.chapter) ?? CHAPTERS[0];
  const chapterFacts = FACTS[state.chapter];

  return (
    <div className="bw-scene">
      <div className="bw-grid">
        <div className="bw-left">
          {/* chapter stepper */}
          <nav className="bw-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={`bw-step${state.chapter === c.id ? " bw-step-on" : ""}`}
                aria-pressed={state.chapter === c.id}
                onClick={() => sim.setChapter(c.id)}
              >
                <span className="bw-step-kicker">{c.kicker}</span>
                <span className="bw-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          {/* chapter card */}
          <section className="bw-card">
            <p className="bw-kicker">{chapter.kicker}</p>
            <h2 className="bw-title">{chapter.title}</h2>
            <p className="bw-story">{chapter.story}</p>
            <p className="bw-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{" "}
              <em className="bw-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* 2007: the fork */}
          {state.chapter === "2007" && (
            <section className="bw-card">
              <h3 className="bw-panel-h">THE FORK — WHO GETS TO UPLOAD?</h3>
              <div className="bw-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`bw-fork-opt${state.branch === b.id ? " bw-fork-on" : ""}${b.hypothetical ? " bw-fork-whatif" : ""}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="bw-fork-name">{b.label}</span>
                    <span className="bw-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {state.branch && (
                <p className="bw-note">
                  Decision recorded:{" "}
                  <strong>
                    {state.branch === "openUploads"
                      ? "anyone can upload (history)"
                      : "licensed-only uploads (WHAT IF)"}
                  </strong>{" "}
                  — the branch is locked.{" "}
                  <button className="bw-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* 2009, undecided: the recovery path */}
          {state.chapter === "2009" && state.branch === null && (
            <section className="bw-card">
              <h3 className="bw-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="bw-story">
                The story needs your call: open uploads, or licensed-only? (B13)
              </p>
              <button className="bw-btn" onClick={() => sim.setChapter("2007")}>
                BACK TO 2007 — MAKE THE CALL
              </button>
            </section>
          )}
          {/* closing */}
          <section className="bw-card bw-closing">
            <h3 className="bw-panel-h">WHAT YOU SAW</h3>
            <p className="bw-story">
              The open web changed shape. In 2005 the web was something anyone
              could edit (B3–B4); by 2007 it was something everyone could
              film (B10–B13); by 2009 the pipes behind it were broadband,
              and a plan was drawing a 100 Mbps future (B14–B16).
            </p>
            {state.branch === "openUploads" && (
              <p className="bw-story">
                You took the history path: anyone can upload — and the
                takedown notices start arriving (B13).
              </p>
            )}
            {state.branch === "licensedOnly" && (
              <p className="bw-story">
                You took the WHAT IF path — illustrative, not recorded
                history. Real YouTube did not view videos before posting
                (B13).
              </p>
            )}
            <button className="bw-btn bw-btn-ghost" onClick={() => sim.reset()}>
              START OVER — BACK TO 2005
            </button>
          </section>

          {/* facts for the current chapter */}
          <section className="bw-card">
            <h3 className="bw-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="bw-facts">
              {chapterFacts.map((f) => (
                <li key={f.id}>
                  {f.text} <em className="bw-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="bw-footnote">
            SIMPLIFIED SIMULATION — the article pane, edit history, upload
            queue, and line-status panel are illustrative recreations (not
            real pages). Facts and quotes are verified (docs/SOURCES.md §B).
            The "WHAT IF: licensed-only uploads" branch is a labeled
            hypothetical — real YouTube did not view videos before posting
            (B13).
          </p>
        </div>

        <OpenWebBrowser
          state={state}
          onMakeEdit={() => sim.makeEdit()}
          onUploadVideo={() => sim.uploadVideo()}
          onReadPlan={() => sim.readPlan()}
          onSetChapter={(c) => sim.setChapter(c)}
          onChooseBranch={(b) => sim.chooseBranch(b)}
        />
      </div>
    </div>
  );
}