/**
 * Exhibit 12 — "The Road Ahead" (speculative, beyond 2026) — the scene.
 *
 * A three-act STORY (not a widget):
 *   Act I   — "Where we are" (verified, CURRENT as of Sept 2026 — AI5, AI4, AI2)
 *   Act II  — three threads that are real today (AGENCY / ON-DEVICE / MULTIMODAL),
 *             each openable to "what it means for you"
 *   Act III — the reader picks a slice of life and reads it "today → forecast"
 *   Close   — what this is/isn't, "deliberately not asserted", one optional
 *             personal reflection.
 * Speculative: every forward-looking line is a labeled forecast, not a fact.
 */
import "../../styles/eras/future.css";
import {
  ANCHORS,
  DELIBERATELY_NOT,
  LEDE,
  SLICES,
  THREADS,
} from "../../simulations/future/futureData";
import { useFutureSim } from "../../simulations/future/useFutureSim";

export function FutureScene() {
  const sim = useFutureSim();
  const { state } = sim;
  const slice = SLICES.find((s) => s.id === state.slice) ?? null;

  return (
    <div className="fa-scene">
      <header className="fa-lede">
        <p className="fa-kicker">{LEDE.kicker} — SPECULATIVE SECTION</p>
        <h2 className="fa-title">{LEDE.title}</h2>
      </header>

      {/* Act I — where we are (verified). */}
      <section className="fa-act">
        <h3 className="fa-act-h">{LEDE.act1.h}</h3>
        <p className="fa-body">{LEDE.act1.body}</p>
        <ul className="fa-anchors">
          {ANCHORS.map((a) => (
            <li key={a.tag + a.text}>
              {a.text} <em className="fa-tag">[{a.tag}]</em>
            </li>
          ))}
        </ul>
      </section>

      {/* Act II — three threads, real today. */}
      <section className="fa-act">
        <h3 className="fa-act-h">{LEDE.act2.h}</h3>
        <p className="fa-body">{LEDE.act2.body}</p>
        <div className="fa-threads">
          {THREADS.map((t) => {
            const open = state.revealed[t.id];
            return (
              <div key={t.id} className={`fa-thread${open ? " fa-thread-open" : ""}`}>
                <button
                  type="button"
                  className="fa-thread-btn"
                  aria-pressed={open}
                  aria-label={`Thread: ${t.label}`}
                  onClick={() => sim.revealThread(t.id)}
                >
                  <span className="fa-thread-label">{t.label}</span>
                  <span className="fa-thread-hint">{open ? "hide" : "show"}</span>
                </button>
                <p className="fa-thread-what">
                  {t.what} <em className="fa-tag">[{t.tag}]</em>
                </p>
                {open && (
                  <p className="fa-thread-means">
                    <strong>WHAT IT MEANS FOR YOU</strong>
                    {t.means}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Act III — follow the threads forward (a forecast). */}
      <section className="fa-act fa-forecast">
        <h3 className="fa-act-h">{LEDE.act3.h}</h3>
        <p className="fa-body">{LEDE.act3.body}</p>

        <div className="fa-slices" role="group" aria-label="Pick a slice of your life">
          {SLICES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`fa-slice${state.slice === s.id ? " fa-slice-on" : ""}`}
              aria-pressed={state.slice === s.id}
              onClick={() => sim.selectSlice(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {slice && (
          <div className="fa-scenario">
            <p className="fa-scenario-prompt">{slice.prompt}</p>

            <div className="fa-scenario-step">
              <h4 className="fa-step-h">HOW IT IS TODAY</h4>
              <p className="fa-step-body">{slice.today}</p>
            </div>

            {!state.trajectoryShown ? (
              <button
                type="button"
                className="fa-btn"
                onClick={() => sim.showTrajectory()}
              >
                FOLLOW THE THREE THREADS → (a forecast)
              </button>
            ) : (
              <div className="fa-scenario-step fa-step-forecast">
                <h4 className="fa-step-h">WHERE THE THREADS POINT</h4>
                <p className="fa-step-body">{slice.trajectory}</p>
              </div>
            )}
          </div>
        )}

        {/* One optional, personal reflection — not a scoreboard. */}
        <div className="fa-reflect">
          <h4 className="fa-step-h">IF YOU HAD TO BET ON ONE, WHICH?</h4>
          <p className="fa-reflect-sub">
            Your own read — no right answer, and nothing tallies up.
          </p>
          <div className="fa-reflect-row">
            {THREADS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`fa-reflect-opt${
                  state.reflection === t.id ? " fa-reflect-on" : ""
                }`}
                aria-pressed={state.reflection === t.id}
                aria-label={`Bet: ${t.label}`}
                onClick={() => sim.reflect(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {state.reflection && (
            <p className="fa-reflect-note">
              Noted — you'd bet on{" "}
              <strong>{THREADS.find((t) => t.id === state.reflection)?.label}</strong>.
              That's a personal lean, not a prediction.
            </p>
          )}
        </div>
      </section>

      {/* Close — what this is/isn't. */}
      <section className="fa-act fa-close">
        <h3 className="fa-act-h">{LEDE.close.h}</h3>
        <p className="fa-body">{LEDE.close.body}</p>

        <h4 className="fa-step-h">DELIBERATELY NOT ASSERTED</h4>
        <ul className="fa-anchors">
          {DELIBERATELY_NOT.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div style={{ marginTop: 16 }}>
          <button type="button" className="fa-btn fa-btn-ghost" onClick={() => sim.reset()}>
            READ IT AGAIN FROM THE TOP
          </button>
        </div>
      </section>

      <p className="fa-footnote" role="status" aria-live="polite">
        SPECULATIVE SECTION — NOT A HISTORICAL RECORD AND NOT A PREDICTION. {state.note}
      </p>
    </div>
  );
}