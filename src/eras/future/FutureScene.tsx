/**
 * "The Road Ahead" era scene (speculative, beyond 2026).
 *
 * NOT a historical record and NOT a prediction. Three open questions, each
 * with two forecasts the visitor can lean toward and change their mind on —
 * a menu, not a fork. Every branch is an extrapolation of the verified
 * 2025–2026 anchors (AI5/AI2/AI4, docs/SOURCES.md).
 *
 * Left = lede + verified anchors + three open questions + tally +
 *        "deliberately not asserted" + footnote.
 * Right = the live FrontierBoard scoreboard (the period-style artifact).
 */

import "../../styles/eras/future.css";
import {
  ANCHORS,
  DELIBERATELY_NOT,
  LEDE,
  QUESTIONS,
} from "../../simulations/future/futureData";
import { FrontierBoard } from "../../simulations/future/FrontierBoard";
import { useFutureSim } from "../../simulations/future/useFutureSim";

export function FutureScene() {
  const { state, leaned, lean, reset } = useFutureSim();

  return (
    <div className="fa-scene">
      <div className="fa-grid">
        <div className="fa-left">
          {/* lede */}
          <section className="fa-card fa-lede">
            <p className="fa-kicker">{LEDE.kicker}</p>
            <h2 className="fa-title">{LEDE.title}</h2>
            <p className="fa-story">{LEDE.story}</p>
            <p className="fa-takeaway">
              <strong>NO RIGHT ANSWER</strong> {LEDE.takeaway}
            </p>
          </section>

          {/* verified anchors */}
          <section className="fa-card">
            <h3 className="fa-panel-h">WHAT'S REAL AS OF 2026 (VERIFIED ANCHORS)</h3>
            <ul className="fa-facts">
              {ANCHORS.map((a) => (
                <li key={a.tag}>
                  {a.text} <em className="fa-tag">[{a.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          {/* three open questions */}
          {QUESTIONS.map((q) => {
            const chosen = state.lean[q.id];
            return (
              <section className="fa-card" key={q.id}>
                <h3 className="fa-panel-h">
                  {q.num} · {q.question.toUpperCase()}
                </h3>
                <p className="fa-story">
                  {q.whyOpen} <em className="fa-tag">[{q.tag}]</em>
                </p>
                <div className="fa-sides">
                  {q.sides.map((s) => (
                    <button
                      key={s.id}
                      className={`fa-side${chosen === s.id ? " fa-side-on" : ""}`}
                      aria-pressed={chosen === s.id}
                      onClick={() => lean(q.id, s.id)}
                    >
                      <span className="fa-side-label">{s.label}</span>
                    </button>
                  ))}
                </div>
                {chosen && (
                  <p className="fa-forecast">
                    <strong>WHAT THAT WOULD MEAN</strong>{" "}
                    {q.sides.find((s) => s.id === chosen)?.forecast}
                  </p>
                )}
              </section>
            );
          })}

          {/* tally + clear */}
          <p className="fa-tally">
            {leaned}/{QUESTIONS.length} leaned — a forecast, not a prediction.{" "}
            <button className="fa-link" onClick={() => reset()}>
              CLEAR MY LEANS
            </button>
          </p>

          {/* deliberately not asserted */}
          <section className="fa-card">
            <h3 className="fa-panel-h">DELIBERATELY NOT ASSERTED</h3>
            <ul className="fa-facts">
              {DELIBERATELY_NOT.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>

          <p className="fa-footnote">
            SPECULATIVE SECTION — NOT A HISTORICAL RECORD AND NOT A PREDICTION.
            Every forecast here is an extrapolation of the verified 2025–2026
            anchors (docs/SOURCES.md: AI5, AI2, AI4). Nothing here is a fact,
            and the branches are deliberately not settled.
          </p>
        </div>

        <FrontierBoard state={state} />
      </div>
    </div>
  );
}