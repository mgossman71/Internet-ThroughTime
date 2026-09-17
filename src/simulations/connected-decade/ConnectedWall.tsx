/**
 * ConnectedWall — the era's artifact: a period-style "connected wall."
 *   2016 = the feed (short-video queue — LIKE + streaming tiles)
 *   2021 = the fork (5G panel, ENTER METAVERSE, and the metaverse-vs-AI call)
 *   2022 = the handoff (5G CONNECTED, "AI is coming", baton to the AI Era)
 *
 * ALL chrome is ILLUSTRATIVE (status bar, feed rows, streaming tiles, 5G
 * bars, VR headset) — labeled inline. Historical claims and quotes live in
 * the scene's fact cards and carry C-tags (docs/SOURCES.md §C, verified
 * 2026-09-17).
 */

import type { BranchId, ChapterId } from "./connectedData";
import {
  FEED_POOL,
  NETWORK_STATUS,
  STREAM_POOL,
} from "./connectedData";
import { MAX_LIKES, type ConnectedState } from "./connectedEngine";

export interface ConnectedWallProps {
  state: ConnectedState;
  onLikeVideo: () => void;
  onEnterMetaverse: () => void;
  onConnect5g: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}

export function ConnectedWall({
  state,
  onLikeVideo,
  onEnterMetaverse,
  onConnect5g,
  onSetChapter,
  onChooseBranch,
}: ConnectedWallProps) {
  const { chapter } = state;

  return (
    <div className="cd-wall" role="group" aria-label={`Connected wall — ${chapter}`}>
      <div className="cd-statusbar" aria-hidden="true">
        <span className="cd-sb-time">9:41</span>
        <span className="cd-sb-sig">
          <i className={`cd-bar${state.connected5g ? " cd-bar-on" : ""}`} />
          <i className={`cd-bar${state.connected5g ? " cd-bar-on" : ""}`} />
          <i className={`cd-bar${state.metaverseEntered ? " cd-bar-on" : ""}`} />
          <i className="cd-bar" />
        </span>
        <span className="cd-sb-net">{state.connected5g ? "5G" : "LTE"}</span>
        <span className="cd-sb-bat">82%</span>
      </div>

      <div className="cd-screen">
        {chapter === "2016" && (
          <Feed2016 state={state} onLikeVideo={onLikeVideo} />
        )}
        {chapter === "2021" && (
          <Metaverse2021
            state={state}
            onEnterMetaverse={onEnterMetaverse}
            onSetChapter={onSetChapter}
            onChooseBranch={onChooseBranch}
          />
        )}
        {chapter === "2022" && (
          <Handoff2022 state={state} onConnect5g={onConnect5g} />
        )}
      </div>

      <p className="cd-chrome-note">
        feed, tiles, 5G bars and headset are illustrative recreations (not a
        real device)
      </p>
    </div>
  );
}

/* 2016 — the feed: short-video queue + streaming tiles (all illustrative) */

function Feed2016({
  state,
  onLikeVideo,
}: {
  state: ConnectedState;
  onLikeVideo: () => void;
}) {
  const { likes } = state;
  const full = likes >= MAX_LIKES;

  return (
    <div className="cd-feed">
      <h3 className="cd-pane-h">THE FEED — 2016</h3>
      <p className="cd-pane-sub">
        "an international Chinese social media platform that hosts
        user-generated short videos… operated by ByteDance" (C4). Attention is
        the scarce resource now.
      </p>

      <ul className="cd-queue" aria-label="Short-video feed (illustrative)">
        {likes === 0 && <li className="cd-queue-empty">the feed is empty — like something</li>}
        {FEED_POOL.slice(0, likes).map((v, i) => (
          <li key={i} className="cd-track">
            <span className="cd-track-name">{v.caption}</span>
            <span className={`cd-status-tag${i < likes ? " cd-status-liked" : ""}`}>
              {i < likes ? "LIKED" : "NEW"}
            </span>
            <span className="cd-track-size">{v.likes}</span>
          </li>
        ))}
      </ul>

      <button className="cd-btn" onClick={onLikeVideo} disabled={full}>
        LIKE VIDEO ({likes}/{MAX_LIKES})
      </button>

      <p className="cd-pane-h cd-tiles-h">THE LIVING ROOM IS STREAMING</p>
      <div className="cd-tiles" aria-hidden="true">
        {STREAM_POOL.map((s) => (
          <span key={s} className="cd-tile">
            {s}
          </span>
        ))}
      </div>

      <div className="cd-callout">
        <p className="cd-callout-h">STREAMING IS ALREADY WINNING</p>
        <p>
          Disney+ arrives a year later, "launched on November 12, 2019" (C3) —
          the era-peak beat lands in 2021.
        </p>
      </div>
    </div>
  );
}

/* 2021 — the metaverse bet: 5G panel + fork (chrome illustrative) */

function Metaverse2021({
  state,
  onEnterMetaverse,
  onSetChapter,
  onChooseBranch,
}: {
  state: ConnectedState;
  onEnterMetaverse: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { metaverseEntered, branch } = state;

  return (
    <div className="cd-meta">
      <h3 className="cd-pane-h">THE METAVERSE BET — 2019–2021</h3>
      <p className="cd-pane-sub">
        5G rolls out commercially 2019–2021 (C2); Disney+ launches Nov 12,
        2019 (C3); Meta: "2021: Rebrand as Meta" (C5).
      </p>

      <ul className="cd-net" aria-label="Network panel (illustrative)">
        {NETWORK_STATUS.map((n) => (
          <li key={n.id} className="cd-net-row">
            <span className="cd-net-name">{n.name}</span>
            <span className={`cd-status-tag cd-net-${n.id}`}>{n.status}</span>
            <span className="cd-net-note">{n.note}</span>
          </li>
        ))}
      </ul>

      {!metaverseEntered && (
        <button className="cd-btn" onClick={onEnterMetaverse}>
          ENTER METAVERSE (the 2021 bet)
        </button>
      )}
      {metaverseEntered && (
        <p className="cd-status cd-status-grown">
          HISTORY: "2018–2020: Focus on the metaverse" (C5). But the models
          that will win the decade already exist — GPT-3, May 2020 (C6).
        </p>
      )}

      {branch === null ? (
        <div className="cd-forkmini">
          <p className="cd-forkmini-h">THE FORK — WHERE DOES IT ALL LEAD?</p>
          <div className="cd-forkmini-row">
            <button
              className="cd-btn cd-btn-small"
              onClick={() => onChooseBranch("ai")}
            >
              AI ANSWERS YOU (HISTORY)
            </button>
            <button
              className="cd-btn cd-btn-small cd-btn-whatif"
              onClick={() => onChooseBranch("metaverse")}
            >
              METAVERSE WINS (WHAT IF)
            </button>
            <button
              className="cd-btn cd-btn-small"
              onClick={() => onSetChapter("2016")}
            >
              BACK TO 2016 — THE FEED
            </button>
          </div>
        </div>
      ) : branch === "ai" ? (
        <p className="cd-status cd-status-grown">
          HISTORY: the machine that answers wins — by 2025–26 the metaverse
          money is flowing to AI (C8).
        </p>
      ) : (
        <p className="cd-status cd-status-frozen">
          WHAT IF: the metaverse becomes the next platform — VR/AR as the
          destination (illustrative, not the path history took).
        </p>
      )}
    </div>
  );
}

/* 2022 — the handoff: 5G lands, AI is coming */

function Handoff2022({
  state,
  onConnect5g,
}: {
  state: ConnectedState;
  onConnect5g: () => void;
}) {
  const { connected5g } = state;

  return (
    <div className="cd-handoff">
      <h3 className="cd-pane-h">AI IS COMING — 2022</h3>
      <p className="cd-pane-sub">
        The feeds are everywhere and 5G is deployed (C2) — but the thing that
        changes everything arrives in November 2022.
      </p>

      <button className="cd-btn" onClick={onConnect5g} disabled={connected5g}>
        {connected5g ? "5G CONNECTED" : "CONNECT 5G"}
      </button>

      <div className="cd-callout">
        <p className="cd-callout-h">THE BATON PASSES</p>
        <p>
          "ChatGPT… gained 100 million users within two months of its launch"
          (November 2022), "the fastest-growing consumer application to date"
          (C7).
        </p>
      </div>
      <p className="cd-status cd-status-grown">
        By 2025–26, "Investments in AI" (C8). The Connected Decade ends by
        introducing a machine that answers — continue to The AI Era.
      </p>
    </div>
  );
}