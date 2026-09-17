/**
 * The 2022–2026 "AI Era" era scene (exhibit 11, in progress).
 * Three chapters around one fork:
 *   2022 — the machine answers: ChatGPT (GPT-3.5), 100M users, the chat
 *   2023 — the fork: the models get bigger (GPT-4, multimodal),
 *           history = AI is a tool vs. AGI is here (hypothetical)
 *   2025 — the frontier: in progress, current as of Sept 2026, baton to
 *           The Road Ahead (speculation)
 *
 * Left column = chapters + per-chapter panels + closing + facts;
 * right column = the period-style AI console (AiConsole).
 * Facts carry [AI#] tags (docs/SOURCES.md, verified 2026-09-17).
 */

import "../../styles/eras/ai-era.css";
import {
  BRANCHES,
  CHAPTERS,
  FACTS,
} from "../../simulations/ai-era/aiData";
import { AiConsole } from "../../simulations/ai-era/AiConsole";
import { useAiSim } from "../../simulations/ai-era/useAiSim";

export function AiEraScene() {
  const sim = useAiSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.id === state.chapter) ?? CHAPTERS[0];
  const chapterFacts = FACTS[state.chapter];

  return (
    <div className="ai-scene">
      <div className="ai-grid">
        <div className="ai-left">
          {/* chapter stepper */}
          <nav className="ai-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                className={`ai-step${state.chapter === c.id ? " ai-step-on" : ""}`}
                aria-pressed={state.chapter === c.id}
                onClick={() => sim.setChapter(c.id)}
              >
                <span className="ai-step-kicker">{c.kicker}</span>
                <span className="ai-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          {/* chapter card */}
          <section className="ai-card">
            <p className="ai-kicker">{chapter.kicker}</p>
            <h2 className="ai-title">{chapter.title}</h2>
            <p className="ai-story">{chapter.story}</p>
            <p className="ai-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{" "}
              <em className="ai-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* 2023: the fork */}
          {state.chapter === "2023" && (
            <section className="ai-card">
              <h3 className="ai-panel-h">THE FORK — A TOOL OR A MIND?</h3>
              <div className="ai-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`ai-fork-opt${state.branch === b.id ? " ai-fork-on" : ""}${b.hypothetical ? " ai-fork-whatif" : ""}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="ai-fork-name">{b.label}</span>
                    <span className="ai-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {state.branch && (
                <p className="ai-note">
                  Decision recorded:{" "}
                  <strong>
                    {state.branch === "tool"
                      ? "AI is a tool (history, so far)"
                      : "AGI is already here (WHAT IF)"}
                  </strong>{" "}
                  — the branch is locked.{" "}
                  <button className="ai-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* 2025, undecided: the recovery path */}
          {state.chapter === "2025" && state.branch === null && (
            <section className="ai-card">
              <h3 className="ai-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="ai-story">
                The story needs your call: AI is a tool, or is general
                intelligence already here? (AI1, AI4)
              </p>
              <button className="ai-btn" onClick={() => sim.setChapter("2023")}>
                BACK TO 2023 — MAKE THE CALL
              </button>
            </section>
          )}

          {/* closing */}
          <section className="ai-card ai-closing">
            <h3 className="ai-panel-h">WHAT YOU SAW</h3>
            <p className="ai-story">
              A machine that answers arrived. In 2022 ChatGPT — a generative
              AI chatbot based on GPT-3.5 — gained 100 million users in two
              months (AI1, AI3); by 2023 the models got bigger and
              multimodal, with GPT-4 in March 2023 (AI2) and a large language
              model defined as a type of machine learning model (AI4); and
              from 2025 onward the era is still moving, CURRENT as of
              September 2026 (AI5).
            </p>
            {state.branch === "tool" && (
              <p className="ai-story">
                You took the history path (so far): AI is a very capable
                assistant, not a mind (AI1, AI4).
              </p>
            )}
            {state.branch === "agi" && (
              <p className="ai-story">
                You took the WHAT IF path — illustrative, not established
                fact. The record, as of 2026, still calls it a tool (AI4).
              </p>
            )}
            <button className="ai-btn ai-btn-ghost" onClick={() => sim.reset()}>
              START OVER — BACK TO 2022
            </button>
          </section>

          {/* facts for the current chapter */}
          <section className="ai-card">
            <h3 className="ai-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="ai-facts">
              {chapterFacts.map((f) => (
                <li key={f.id}>
                  {f.text} <em className="ai-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="ai-footnote">
            SIMPLIFIED SIMULATION — the console, prompt/response lines, model
            panel and frontier status are illustrative recreations (not a real
            model). Facts and quotes are verified (docs/SOURCES.md). The 2025–
            2026 material is framed as CURRENT / in-progress, not settled
            history. The "WHAT IF: AGI is already here" branch is a labeled
            hypothetical.
          </p>
        </div>

        <AiConsole
          state={state}
          onAsk={() => sim.ask()}
          onLoadModel={() => sim.loadModel()}
          onOpenFrontier={() => sim.openFrontier()}
          onSetChapter={(c) => sim.setChapter(c)}
          onChooseBranch={(b) => sim.chooseBranch(b)}
        />
      </div>
    </div>
  );
}