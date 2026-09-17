/**
 * FrontierBoard — the "Road Ahead" artifact: a live FORECAST BOARD.
 *
 * A read-only scoreboard that mirrors the visitor's leans: for each open
 * question it shows the two forecasts with the leaned side highlighted, plus
 * a tally and a live status line. The interactive lean buttons live in the
 * scene (left column). Everything is speculative — a forecast, not a
 * prediction; verified anchors are cited in the scene.
 */

import { QUESTIONS } from "./futureData";
import { leanedCount, type FutureState } from "./futureEngine";

export interface FrontierBoardProps {
  state: FutureState;
}

export function FrontierBoard({ state }: FrontierBoardProps) {
  const leaned = leanedCount(state);
  const total = QUESTIONS.length;
  const done = leaned === total;

  return (
    <div className="fb-board" role="group" aria-label="Forecast board">
      <div className="fb-head" aria-hidden="true">
        <span className="fb-head-t">FORECAST BOARD</span>
        <span className="fb-head-n">
          {leaned}/{total} leaned
        </span>
      </div>

      <div className="fb-rows">
        {QUESTIONS.map((q) => {
          const chosen = state.lean[q.id];
          return (
            <div key={q.id} className="fb-row">
              <p className="fb-row-q">
                {q.num} · {q.question}
              </p>
              <div className="fb-row-sides">
                {q.sides.map((s) => (
                  <span
                    key={s.id}
                    className={`fb-side${chosen === s.id ? " fb-side-on" : ""}`}
                    aria-hidden="true"
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="fb-foot" role="status" aria-live="polite">
        {done
          ? "You've leaned all three — a forecast, not a prediction."
          : state.note}
      </p>
    </div>
  );
}