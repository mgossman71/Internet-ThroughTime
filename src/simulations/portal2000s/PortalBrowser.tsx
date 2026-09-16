/**
 * PortalBrowser — the era's artifact: a period-style browser window.
 *   2000 = portal home page
 *   2001 = P2P share client (the queue)
 *   2004 = search + mail panes
 *
 * ALL chrome is ILLUSTRATIVE (link grid, hit counter, track names, mock
 * search results, inbox lines) — labeled inline. Historical claims and
 * quotes live in the scene's fact cards and carry P-tags
 * (docs/SOURCES.md §P, verified 2026-09-16).
 */

import type { BranchId, ChapterId } from "./portalData";
import {
  INBOX,
  PORTAL_GRID,
  SEARCH_POOL,
  TRACK_POOL,
} from "./portalData";
import { MAX_QUEUE, MAX_SEARCHES, type PortalState } from "./portalEngine";

export interface PortalBrowserProps {
  state: PortalState;
  onQueueFile: () => void;
  onRunSearch: () => void;
  onReadMail: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}

export function PortalBrowser({
  state,
  onQueueFile,
  onRunSearch,
  onReadMail,
  onSetChapter,
  onChooseBranch,
}: PortalBrowserProps) {
  const { chapter } = state;

  return (
    <div className="p2k-window" role="group" aria-label={`Browser window — ${chapter}`}>
      <div className="p2k-chrome">
        <span className="p2k-chrome-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span className="p2k-chrome-url">
          front-door.example/home — {chapter} (illustrative)
        </span>
      </div>

      <div className="p2k-body">
        {chapter === "2000" && <Portal2000 />}
        {chapter === "2001" && (
          <Share2001 state={state} onQueueFile={onQueueFile} onChooseBranch={onChooseBranch} />
        )}
        {chapter === "2004" && (
          <Web2004
            state={state}
            onRunSearch={onRunSearch}
            onReadMail={onReadMail}
            onSetChapter={onSetChapter}
            onChooseBranch={onChooseBranch}
          />
        )}
      </div>
    </div>
  );
}

/* 2000 — the portal home page (illustrative chrome, P1/P2/P5 claims) */

function Portal2000() {
  return (
    <div className="p2k-portal">
      <p className="p2k-badge" aria-hidden="true">
        NEW!
      </p>
      <h3 className="p2k-portal-logo">THE FRONT DOOR</h3>
      <p className="p2k-portal-sub">News, links, search — all in one place (P1)</p>
      <div className="p2k-searchbox" aria-hidden="true">
        <span>search the web…</span>
      </div>
      <ul className="p2k-linkgrid" aria-label="Portal link grid (illustrative)">
        {PORTAL_GRID.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <p className="p2k-news">BREAKING: your city gets broadband (illustrative)</p>
      <p className="p2k-counter">visitor no. 042,117 — hit counter (illustrative)</p>
      <p className="p2k-portals-line">
        Your home page could be Excite, Lycos, MSN, or Yahoo! (P1)
      </p>
      <p className="p2k-bubble">
        Under the page: the Nasdaq peaked March 10, 2000 and falls 78% by
        October 2002 (P2).
      </p>
    </div>
  );
}

/* 2001 — the share client: queue the files, then the fork decides */

function Share2001({
  state,
  onQueueFile,
  onChooseBranch,
}: {
  state: PortalState;
  onQueueFile: () => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { branch, queue } = state;
  const frozen = branch === "labelsWin";
  const grown = branch === "napsterLives";
  const full = queue.length >= MAX_QUEUE;

  return (
    <div className="p2k-share">
      <h3 className="p2k-share-h">SHARE CLIENT — 2001</h3>
      <p className="p2k-share-sub">
        The queue: where the files go. Napster (1999) — in dorms, as much as
        61% of traffic was MP3 transfers (P3).
      </p>

      <ul className="p2k-queue" aria-label="Share queue (illustrative)">
        {queue.length === 0 && (
          <li className="p2k-queue-empty">queue empty — find a track</li>
        )}
        {queue.map((name, i) => {
          const track = TRACK_POOL.find((t) => t.name === name);
          const pct = frozen ? 35 + i * 5 : grown ? 100 : 60 + i * 8;
          return (
            <li key={name} className={`p2k-track${frozen ? " p2k-track-off" : ""}`}>
              <span className="p2k-track-name">{name}</span>
              <span className="p2k-track-bar" aria-hidden="true">
                <span className="p2k-track-fill" style={{ width: `${pct}%` }} />
              </span>
              <span className="p2k-track-size">{track?.size}</span>
            </li>
          );
        })}
      </ul>

      <button className="p2k-btn" onClick={onQueueFile} disabled={full}>
        FIND TRACK ({queue.length}/{MAX_QUEUE})
      </button>

      {branch === null && (
        <p className="p2k-status p2k-status-wait">
          The queue is running — but in 2001, that could change. The fork is
          undecided (P3).
        </p>
      )}
      {frozen && (
        <>
          <p className="p2k-status p2k-status-frozen">
            JULY 2001: CONNECTION LOST — Napster was "shut down in July 2001"
            and filed for bankruptcy in June 2002 (P3).
          </p>
          <div className="p2k-kazaa">
            <p className="p2k-kazaa-h">THE NETWORK LIVES ON</p>
            <p>
              Kazaa arrived in March 2001 (BlueMoon's FastTrack → Zennström &
              Friis). "While Napster lasted just three years, Kazaa survived
              much longer." (P4)
            </p>
          </div>
        </>
      )}
      {grown && (
        <p className="p2k-status p2k-status-grown">
          WHAT IF: the queue keeps growing — the courts side with Napster
          (illustrative, not recorded history).
        </p>
      )}

      {branch === null && (
        <div className="p2k-forkmini">
          <p className="p2k-forkmini-h">THE FORK — WHO WINS IN 2001?</p>
          <div className="p2k-forkmini-row">
            <button className="p2k-btn p2k-btn-small" onClick={() => onChooseBranch("labelsWin")}>
              HISTORY: labels win
            </button>
            <button
              className="p2k-btn p2k-btn-small p2k-btn-whatif"
              onClick={() => onChooseBranch("napsterLives")}
            >
              WHAT IF: Napster wins
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 2004 — search + mail */

function Web2004({
  state,
  onRunSearch,
  onReadMail,
  onSetChapter,
  onChooseBranch,
}: {
  state: PortalState;
  onRunSearch: () => void;
  onReadMail: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { branch, searches, mailRead } = state;
  const searchFull = searches >= MAX_SEARCHES;

  return (
    <div className="p2k-web">
      {branch === null && (
        <div className="p2k-undecided">
          <p>The 2001 fork is undecided — the story needs your call (P3–P4).</p>
          <div className="p2k-forkmini-row">
            <button
              className="p2k-btn p2k-btn-small"
              onClick={() => onSetChapter("2001")}
            >
              BACK TO 2001 — DECIDE THE FORK
            </button>
            <button
              className="p2k-btn p2k-btn-small"
              onClick={() => onChooseBranch("labelsWin")}
            >
              QUICK CALL: HISTORY
            </button>
            <button
              className="p2k-btn p2k-btn-small p2k-btn-whatif"
              onClick={() => onChooseBranch("napsterLives")}
            >
              QUICK CALL: WHAT IF
            </button>
          </div>
        </div>
      )}

      <section className="p2k-search" aria-label="Search, 2004">
        <h3 className="p2k-pane-h">SEARCH — 2004</h3>
        <p className="p2k-pane-sub">
          What you meant, found. Google: 1998 → Mountain View 2003 → IPO 2004
          (P6).
        </p>
        <button className="p2k-btn" onClick={onRunSearch} disabled={searchFull}>
          RUN SEARCH ({searches}/{MAX_SEARCHES})
        </button>
        <ul className="p2k-results" aria-label="Search results (illustrative)">
          {SEARCH_POOL.slice(0, searches).map((r) => (
            <li key={r.title}>
              <strong>{r.title}</strong>
              <span className="p2k-result-host">{r.host}</span>
              <em>{r.snippet}</em>
            </li>
          ))}
          {searches === 0 && (
            <li className="p2k-queue-empty">no results yet — run a search</li>
          )}
        </ul>
      </section>

      <section className="p2k-mail" aria-label="Mail, 2004">
        <h3 className="p2k-pane-h">MAIL — 2004</h3>
        <p className="p2k-pane-sub">
          Web-native since Hotmail (July 4, 1996, P8); 2004 brings 1 GB
          (Gmail, P7).
        </p>
        <ul className="p2k-inbox" aria-label="Inbox (illustrative)">
          {INBOX.map((m) => (
            <li key={m.from}>
              <strong>{m.from}</strong> — {m.subject}
            </li>
          ))}
        </ul>
        <button className="p2k-btn" onClick={onReadMail} disabled={mailRead}>
          OPEN INBOX
        </button>
        {mailRead && (
          <p className="p2k-mailbody">
            "Did you get my e-mail?" — the 1999 anxiety, still alive (body
            text is illustrative).
          </p>
        )}
      </section>
    </div>
  );
}