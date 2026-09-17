/**
 * The 2010–2015 "Mobile & Cloud" era scene (exhibit 09).
 * Three chapters around one fork:
 *   2010 — the phone becomes the computer: smartphones, the iPad,
 *           LTE (3.95G), the mobile web, the ITU's 2010 forecast (zero clicks)
 *   2012 — the fork: the cloud wins (history) vs. everything stays on the
 *           device (labeled hypothetical)
 *   2015 — the app economy: the App Store, Google Play, smartphones
 *           outselling feature phones, the ITU forecast landing
 *
 * Left column = chapters + per-chapter panels + closing + facts;
 * right column = the period-style phone screen (CloudPhone).
 * Facts carry [M#] tags (docs/SOURCES.md §M, verified 2026-09-17).
 */

import "../../styles/eras/mobile2010s.css";
import {
  BRANCHES,
  CHAPTERS,
  FACTS,
} from "../../simulations/mobile2010s/mobileData";
import { CloudPhone } from "../../simulations/mobile2010s/CloudPhone";
import { useMobileSim } from "../../simulations/mobile2010s/useMobileSim";

export function MobileScene() {
  const sim = useMobileSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.id === state.chapter) ?? CHAPTERS[0];
  const chapterFacts = FACTS[state.chapter];

  return (
    <div className="mc-scene">
      <div className="mc-grid">
        <div className="mc-left">
          {/* chapter stepper */}
          <nav className="mc-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={`mc-step${state.chapter === c.id ? " mc-step-on" : ""}`}
                aria-pressed={state.chapter === c.id}
                onClick={() => sim.setChapter(c.id)}
              >
                <span className="mc-step-kicker">{c.kicker}</span>
                <span className="mc-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          {/* chapter card */}
          <section className="mc-card">
            <p className="mc-kicker">{chapter.kicker}</p>
            <h2 className="mc-title">{chapter.title}</h2>
            <p className="mc-story">{chapter.story}</p>
            <p className="mc-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{" "}
              <em className="mc-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* 2012: the fork */}
          {state.chapter === "2012" && (
            <section className="mc-card">
              <h3 className="mc-panel-h">THE FORK — WHERE DOES YOUR STUFF LIVE?</h3>
              <div className="mc-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`mc-fork-opt${state.branch === b.id ? " mc-fork-on" : ""}${b.hypothetical ? " mc-fork-whatif" : ""}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="mc-fork-name">{b.label}</span>
                    <span className="mc-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {state.branch && (
                <p className="mc-note">
                  Decision recorded:{" "}
                  <strong>
                    {state.branch === "cloud"
                      ? "the cloud wins (history)"
                      : "everything stays on the device (WHAT IF)"}
                  </strong>{" "}
                  — the branch is locked.{" "}
                  <button className="mc-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* 2015, undecided: the recovery path */}
          {state.chapter === "2015" && state.branch === null && (
            <section className="mc-card">
              <h3 className="mc-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="mc-story">
                The story needs your call: the cloud wins, or everything stays
                on the device? (M9–M13)
              </p>
              <button className="mc-btn" onClick={() => sim.setChapter("2012")}>
                BACK TO 2012 — MAKE THE CALL
              </button>
            </section>
          )}

          {/* closing */}
          <section className="mc-card mc-closing">
            <h3 className="mc-panel-h">WHAT YOU SAW</h3>
            <p className="mc-story">
              The computer moved into your pocket. In 2010 the phone became
              the computer — touchscreen, 4G-class pipes, the mobile web
              (M1–M7); by 2012 your stuff was split between device and cloud,
              and you were streaming instead of buying (M8–M13); by 2015 the
              app store was the storefront and smartphone sales had surpassed
              feature phones (M14–M16).
            </p>
            {state.branch === "cloud" && (
              <p className="mc-story">
                You took the history path: the cloud wins — your stuff lives
                on servers as much as on the device (M9–M13).
              </p>
            )}
            {state.branch === "localOnly" && (
              <p className="mc-story">
                You took the WHAT IF path — illustrative, not recorded
                history. Real history went the other way: "store files in the
                cloud (on Google servers)" (M10).
              </p>
            )}
            <button className="mc-btn mc-btn-ghost" onClick={() => sim.reset()}>
              START OVER — BACK TO 2010
            </button>
          </section>

          {/* facts for the current chapter */}
          <section className="mc-card">
            <h3 className="mc-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="mc-facts">
              {chapterFacts.map((f) => (
                <li key={f.id}>
                  {f.text} <em className="mc-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="mc-footnote">
            SIMPLIFIED SIMULATION — the phone screen, home screen, signal
            panel, sync queue, and app queue are illustrative recreations
            (not a real phone). Facts and quotes are verified
            (docs/SOURCES.md §M). The "WHAT IF: everything stays on the
            device" branch is a labeled hypothetical — real history went the
            other way (M9–M13).
          </p>
        </div>

        <CloudPhone
          state={state}
          onCheckPhone={() => sim.checkPhone()}
          onSyncFiles={() => sim.syncFiles()}
          onInstallApp={() => sim.installApp()}
          onSetChapter={(c) => sim.setChapter(c)}
          onChooseBranch={(b) => sim.chooseBranch(b)}
        />
      </div>
    </div>
  );
}