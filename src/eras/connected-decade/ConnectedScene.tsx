/**
 * The 2016–2022 "Connected Decade" era scene (exhibit 10).
 * Three chapters around one fork:
 *   2016 — the feed: short-form video (TikTok/Douyin), streaming, attention
 *   2021 — the fork: 5G rollout, the streaming wars peak, the metaverse bet
 *           (history = AI answers you) vs. the metaverse wins (hypothetical)
 *   2022 — the handoff: 5G deployed, ChatGPT arrives, the baton passes to
 *           The AI Era
 *
 * Left column = chapters + per-chapter panels + closing + facts;
 * right column = the period-style connected wall (ConnectedWall).
 * Facts carry [C#] tags (docs/SOURCES.md §C, verified 2026-09-17).
 */

import "../../styles/eras/connected-decade.css";
import {
  BRANCHES,
  CHAPTERS,
  FACTS,
} from "../../simulations/connected-decade/connectedData";
import { ConnectedWall } from "../../simulations/connected-decade/ConnectedWall";
import { useConnectedSim } from "../../simulations/connected-decade/useConnectedSim";

export function ConnectedScene() {
  const sim = useConnectedSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.id === state.chapter) ?? CHAPTERS[0];
  const chapterFacts = FACTS[state.chapter];

  return (
    <div className="cd-scene">
      <div className="cd-grid">
        <div className="cd-left">
          {/* chapter stepper */}
          <nav className="cd-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={`cd-step${state.chapter === c.id ? " cd-step-on" : ""}`}
                aria-pressed={state.chapter === c.id}
                onClick={() => sim.setChapter(c.id)}
              >
                <span className="cd-step-kicker">{c.kicker}</span>
                <span className="cd-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          {/* chapter card */}
          <section className="cd-card">
            <p className="cd-kicker">{chapter.kicker}</p>
            <h2 className="cd-title">{chapter.title}</h2>
            <p className="cd-story">{chapter.story}</p>
            <p className="cd-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{" "}
              <em className="cd-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* 2021: the fork */}
          {state.chapter === "2021" && (
            <section className="cd-card">
              <h3 className="cd-panel-h">THE FORK — WHERE DOES IT ALL LEAD?</h3>
              <div className="cd-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`cd-fork-opt${state.branch === b.id ? " cd-fork-on" : ""}${b.hypothetical ? " cd-fork-whatif" : ""}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="cd-fork-name">{b.label}</span>
                    <span className="cd-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {state.branch && (
                <p className="cd-note">
                  Decision recorded:{" "}
                  <strong>
                    {state.branch === "ai"
                      ? "AI answers you (history)"
                      : "the metaverse becomes the next platform (WHAT IF)"}
                  </strong>{" "}
                  — the branch is locked.{" "}
                  <button className="cd-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* 2022, undecided: the recovery path */}
          {state.chapter === "2022" && state.branch === null && (
            <section className="cd-card">
              <h3 className="cd-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="cd-story">
                The story needs your call: AI answers you, or the metaverse
                wins? (C7–C8)
              </p>
              <button className="cd-btn" onClick={() => sim.setChapter("2021")}>
                BACK TO 2021 — MAKE THE CALL
              </button>
            </section>
          )}

          {/* closing */}
          <section className="cd-card cd-closing">
            <h3 className="cd-panel-h">WHAT YOU SAW</h3>
            <p className="cd-story">
              The screen turned vertical and never stopped. In 2016 short-form
              video became the format and attention the scarce resource (C4);
              by 2019–2021 5G rolled out commercially, the streaming wars
              peaked with Disney+ (C1, C2, C3), and the industry bet on the
              metaverse (C5) — while the models that would win the decade
              already existed (C6); by 2022 ChatGPT gained 100 million users
              in two months (C7) and the baton passed to the next era.
            </p>
            {state.branch === "ai" && (
              <p className="cd-story">
                You took the history path: the machine that answers wins — by
                2025–26 the metaverse money is flowing to AI (C7, C8).
              </p>
            )}
            {state.branch === "metaverse" && (
              <p className="cd-story">
                You took the WHAT IF path — illustrative, not recorded
                history. Real history went the other way: "2025: Policy
                shifts and AI investments" (C8).
              </p>
            )}
            <button className="cd-btn cd-btn-ghost" onClick={() => sim.reset()}>
              START OVER — BACK TO 2016
            </button>
          </section>

          {/* facts for the current chapter */}
          <section className="cd-card">
            <h3 className="cd-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="cd-facts">
              {chapterFacts.map((f) => (
                <li key={f.id}>
                  {f.text} <em className="cd-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="cd-footnote">
            SIMPLIFIED SIMULATION — the feed, streaming tiles, 5G panel and
            headset are illustrative recreations (not a real device). Facts
            and quotes are verified (docs/SOURCES.md §C). The "WHAT IF: the
            metaverse becomes the next platform" branch is a labeled
            hypothetical — real history went the other way (C7, C8).
          </p>
        </div>

        <ConnectedWall
          state={state}
          onLikeVideo={() => sim.likeVideo()}
          onEnterMetaverse={() => sim.enterMetaverse()}
          onConnect5g={() => sim.connect5g()}
          onSetChapter={(c) => sim.setChapter(c)}
          onChooseBranch={(b) => sim.chooseBranch(b)}
        />
      </div>
    </div>
  );
}