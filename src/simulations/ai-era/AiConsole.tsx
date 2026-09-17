/**
 * AiConsole — the era's artifact: a period-style "AI assistant console."
 *   2022 = the chat (prompt queue — ASK) + the ChatGPT story
 *   2023 = the fork (model panel, LOAD MODEL, and the tool-vs-AGI call)
 *   2025 = the frontier (OPEN FRONTIER, "in progress", baton to The Road Ahead)
 *
 * ALL chrome is ILLUSTRATIVE (prompt/response lines, model-panel rows,
 * frontier status) — labeled inline. Historical claims and quotes live in
 * the scene's fact cards and carry AI-tags (docs/SOURCES.md, verified
 * 2026-09-17).
 */

import type { BranchId, ChapterId } from "./aiData";
import { MODEL_PANEL, PROMPT_POOL } from "./aiData";
import { MAX_ASKS, type AiState } from "./aiEngine";

export interface AiConsoleProps {
  state: AiState;
  onAsk: () => void;
  onLoadModel: () => void;
  onOpenFrontier: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}

export function AiConsole({
  state,
  onAsk,
  onLoadModel,
  onOpenFrontier,
  onSetChapter,
  onChooseBranch,
}: AiConsoleProps) {
  const { chapter } = state;

  return (
    <div className="ai-console" role="group" aria-label={`AI console — ${chapter}`}>
      <div className="ai-statusbar" aria-hidden="true">
        <span className="ai-sb-time">9:41</span>
        <span className="ai-sb-sig">
          <i className="ai-dot ai-dot-on" />
          <i className={`ai-dot${state.modelLoaded ? " ai-dot-on" : ""}`} />
          <i className={`ai-dot${state.frontierOpen ? " ai-dot-on" : ""}`} />
        </span>
        <span className="ai-sb-mode">
          {state.frontierOpen ? "FRONTIER" : "ASSISTANT"}
        </span>
      </div>

      <div className="ai-screen">
        {chapter === "2022" && (
          <Chat2022 state={state} onAsk={onAsk} />
        )}
        {chapter === "2023" && (
          <Models2023
            state={state}
            onLoadModel={onLoadModel}
            onSetChapter={onSetChapter}
            onChooseBranch={onChooseBranch}
          />
        )}
        {chapter === "2025" && (
          <Frontier2025 state={state} onOpenFrontier={onOpenFrontier} />
        )}
      </div>

      <p className="ai-chrome-note">
        prompts, responses and model rows are illustrative recreations (not a
        real model)
      </p>
    </div>
  );
}

/* 2022 — the chat: prompt queue (illustrative) */

function Chat2022({
  state,
  onAsk,
}: {
  state: AiState;
  onAsk: () => void;
}) {
  const { asks } = state;
  const full = asks >= MAX_ASKS;

  return (
    <div className="ai-chat">
      <h3 className="ai-pane-h">THE MACHINE ANSWERS — 2022</h3>
      <p className="ai-pane-sub">
        "a generative artificial intelligence chatbot based on the
        OpenAI-developed GPT-3.5 large language model" (AI1, AI3) — launched
        November 30, 2022.
      </p>

      <ul className="ai-queue" aria-label="Prompt queue (illustrative)">
        {asks === 0 && <li className="ai-queue-empty">the console is empty — ask something</li>}
        {PROMPT_POOL.slice(0, asks).map((p, i) => (
          <li key={i} className="ai-track">
            <span className="ai-track-kind">{p.kind}</span>
            <span className="ai-track-prompt">{p.prompt}</span>
          </li>
        ))}
      </ul>

      <button className="ai-btn" onClick={onAsk} disabled={full}>
        ASK THE MACHINE ({asks}/{MAX_ASKS})
      </button>

      <div className="ai-callout">
        <p className="ai-callout-h">THE NUMBERS</p>
        <p>
          "gained 100 million users within two months of its launch" — "the
          fastest-growing consumer application to date" (AI1).
        </p>
      </div>
      <p className="ai-status ai-status-grown">
        A large language model is "a type of machine learning model" (AI4) —
        but this one talks back.
      </p>
    </div>
  );
}

/* 2023 — the models get bigger: model panel + fork */

function Models2023({
  state,
  onLoadModel,
  onSetChapter,
  onChooseBranch,
}: {
  state: AiState;
  onLoadModel: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { modelLoaded, branch } = state;

  return (
    <div className="ai-models">
      <h3 className="ai-pane-h">THE MODELS GET BIGGER — 2023</h3>
      <p className="ai-pane-sub">
        ChatGPT runs on GPT-3.5 (AI3); GPT-4 arrives March 2023 and is
        multimodal (AI2).
      </p>

      <ul className="ai-models-panel" aria-label="Model panel (illustrative)">
        {MODEL_PANEL.map((m) => (
          <li key={m.name} className="ai-model-row">
            <span className="ai-model-name">{m.name}</span>
            <span className="ai-model-year">{m.year}</span>
            <span className="ai-model-note">{m.note}</span>
          </li>
        ))}
      </ul>

      {!modelLoaded && (
        <button className="ai-btn" onClick={onLoadModel}>
          LOAD THE 2023 MODEL (multimodal)
        </button>
      )}
      {modelLoaded && (
        <p className="ai-status ai-status-grown">
          GPT-4 (March 2023): multimodal — "accepts image input as well as
          text" (AI2).
        </p>
      )}

      {branch === null ? (
        <div className="ai-forkmini">
          <p className="ai-forkmini-h">THE FORK — A TOOL OR A MIND?</p>
          <div className="ai-forkmini-row">
            <button
              className="ai-btn ai-btn-small"
              onClick={() => onChooseBranch("tool")}
            >
              AI IS A TOOL (HISTORY)
            </button>
            <button
              className="ai-btn ai-btn-small ai-btn-whatif"
              onClick={() => onChooseBranch("agi")}
            >
              AGI IS HERE (WHAT IF)
            </button>
            <button
              className="ai-btn ai-btn-small"
              onClick={() => onSetChapter("2022")}
            >
              BACK TO 2022 — THE CHAT
            </button>
          </div>
        </div>
      ) : branch === "tool" ? (
        <p className="ai-status ai-status-grown">
          HISTORY (so far): a very capable assistant, not a mind — a large
          language model, a type of machine learning model (AI4).
        </p>
      ) : (
        <p className="ai-status ai-status-frozen">
          WHAT IF: general intelligence is already here (illustrative — not
          established fact; the record, as of 2026, still calls it a tool).
        </p>
      )}
    </div>
  );
}

/* 2025 — the frontier: in progress, hand off to The Road Ahead */

function Frontier2025({
  state,
  onOpenFrontier,
}: {
  state: AiState;
  onOpenFrontier: () => void;
}) {
  const { frontierOpen } = state;

  return (
    <div className="ai-frontier">
      <h3 className="ai-pane-h">AI, EVERYWHERE — IN PROGRESS (2025–2026)</h3>
      <p className="ai-pane-sub">
        This era is CURRENT as of September 2026 (AI5) — its endpoints are
        not settled, so we do not assert them.
      </p>

      <button className="ai-btn" onClick={onOpenFrontier} disabled={frontierOpen}>
        {frontierOpen ? "FRONTIER OPEN" : "OPEN THE FRONTIER"}
      </button>

      {frontierOpen && (
        <ul className="ai-frontier-list" aria-label="In-progress beats (illustrative)">
          <li className="ai-frontier-item">multimodal (text + image)</li>
          <li className="ai-frontier-item">on-device models</li>
          <li className="ai-frontier-item">agentic workflows</li>
        </ul>
      )}

      <div className="ai-callout">
        <p className="ai-callout-h">THE LIVE EDGE</p>
        <p>
          "Investments in AI" (Meta, 2025–26); the wave that began in
          November 2022 (AI1) is still moving. This is the live edge of the
          timeline — continue to The Road Ahead (speculation).
        </p>
      </div>
    </div>
  );
}