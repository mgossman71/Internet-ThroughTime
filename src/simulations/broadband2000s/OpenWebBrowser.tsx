/**
 * OpenWebBrowser — the era's artifact: a period-style browser window.
 *   2005 = the free encyclopedia (article + edit history)
 *   2007 = the video site (upload queue — echoes the 2001 share queue)
 *   2009 = line status (dial-up → broadband → the FCC goal)
 *
 * ALL chrome is ILLUSTRATIVE (article body, edit-history lines, video
 * names, queue bars, line-status values) — labeled inline. Historical
 * claims and quotes live in the scene's fact cards and carry B-tags
 * (docs/SOURCES.md §B, verified 2026-09-16).
 */

import type { BranchId, ChapterId } from "./broadbandData";
import { EDIT_POOL, VIDEO_POOL, LINE_STATUS } from "./broadbandData";
import {
  MAX_EDITS,
  MAX_UPLOADS,
  type BroadbandState,
} from "./broadbandEngine";

export interface OpenWebBrowserProps {
  state: BroadbandState;
  onMakeEdit: () => void;
  onUploadVideo: () => void;
  onReadPlan: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}

export function OpenWebBrowser({
  state,
  onMakeEdit,
  onUploadVideo,
  onReadPlan,
  onSetChapter,
  onChooseBranch,
}: OpenWebBrowserProps) {
  const { chapter } = state;

  return (
    <div className="bw-window" role="group" aria-label={`Browser window — ${chapter}`}>
      <div className="bw-chrome">
        <span className="bw-chrome-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span className="bw-chrome-url">
          open-web.example/home — {chapter} (illustrative)
        </span>
      </div>

      <div className="bw-body">
        {chapter === "2005" && <Wiki2005 state={state} onMakeEdit={onMakeEdit} />}
        {chapter === "2007" && (
          <Video2007
            state={state}
            onUploadVideo={onUploadVideo}
            onSetChapter={onSetChapter}
            onChooseBranch={onChooseBranch}
          />
        )}
        {chapter === "2009" && (
          <Line2009 state={state} onReadPlan={onReadPlan} />
        )}
      </div>
    </div>
  );
}

/* 2005 — the free encyclopedia (illustrative article + edit history) */

function Wiki2005({
  state,
  onMakeEdit,
}: {
  state: BroadbandState;
  onMakeEdit: () => void;
}) {
  const { edits } = state;
  const full = edits >= MAX_EDITS;

  return (
    <div className="bw-wiki">
      <h3 className="bw-pane-h">THE FREE ENCYCLOPEDIA — 2005</h3>
      <p className="bw-pane-sub">
        Anyone can edit (B3). First year: Nupedia 21 articles — Wikipedia
        18,000 (B2).
      </p>

      <div className="bw-article" aria-hidden="true">
        <h4>Open web (example article — illustrative)</h4>
        <p>
          An open web is a network anyone can write on. The article you are
          reading may have a typo — fix it, or watch someone else do it in
          minutes (B8).
        </p>
      </div>

      <ul className="bw-edithistory" aria-label="Edit history (illustrative)">
        {edits === 0 && <li className="bw-queue-empty">no edits yet — make one</li>}
        {EDIT_POOL.slice(0, edits).map((e, i) => (
          <li key={i}>
            <strong>{e.who}</strong> — {e.text}
          </li>
        ))}
      </ul>

      <button className="bw-btn" onClick={onMakeEdit} disabled={full}>
        MAKE EDIT ({edits}/{MAX_EDITS})
      </button>

      <p className="bw-bubble">
        Nature, 2005: "Wikipedia corrects the vast majority of errors within
        minutes" (B7, B8).
      </p>
      <p className="bw-bubble">
        The other half: the Seigenthaler case — false statements in his own
        biography, May – September 2005 (B9).
      </p>
      <p className="bw-bubble">
        Nupedia: taken down permanently in 2003, its text incorporated into
        Wikipedia (B4).
      </p>
    </div>
  );
}
/* 2007 — the video site: upload queue + the fork decides the feel */

function Video2007({
  state,
  onUploadVideo,
  onSetChapter,
  onChooseBranch,
}: {
  state: BroadbandState;
  onUploadVideo: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { branch, uploads } = state;
  const licensedOnly = branch === "licensedOnly";
  const full = uploads >= MAX_UPLOADS;

  return (
    <div className="bw-video">
      <h3 className="bw-pane-h">EVERYONE HAS A CAMERA — 2007</h3>
      <p className="bw-pane-sub">
        Founded Feb 14, 2005 by three ex-PayPal employees (B10). First upload:
        "Me at the zoo", April 23, 2005 — still on the site (B11).
      </p>

      <ul className="bw-queue" aria-label="Upload queue (illustrative)">
        {uploads === 0 && (
          <li className="bw-queue-empty">queue empty — upload a video</li>
        )}
        {VIDEO_POOL.slice(0, uploads).map((v, i) => {
          const pct = licensedOnly ? 35 + i * 5 : 60 + i * 8;
          return (
            <li key={v.name} className={`bw-track${licensedOnly ? " bw-track-off" : ""}`}>
              <span className="bw-track-name">{v.name}</span>
              <span className="bw-track-bar" aria-hidden="true">
                <span className="bw-track-fill" style={{ width: `${pct}%` }} />
              </span>
              <span className="bw-track-size">{v.size}</span>
            </li>
          );
        })}
      </ul>

      <button className="bw-btn" onClick={onUploadVideo} disabled={full}>
        UPLOAD VIDEO ({uploads}/{MAX_UPLOADS})
      </button>

      {branch === null && (
        <p className="bw-status bw-status-wait">
          The queue is running — but who gets to upload? The fork is
          undecided (B13).
        </p>
      )}
      {branch === "openUploads" && (
        <>
          <p className="bw-status bw-status-frozen">
            DMCA NOTICE ARRIVING — "YouTube does not view videos before they
            are posted online, and it is left to copyright holders to issue
            [takedown notices]" (B13).
          </p>
          <div className="bw-kazaa">
            <p className="bw-kazaa-h">THE FIGHT KEEPS GOING</p>
            <p>
              June 2007: trials of automatic detection of infringing uploads.
              In 2011, Viacom's suit "nearly resulted in the discontinuation
              of the website" (B13).
            </p>
          </div>
        </>
      )}
      {licensedOnly && (
        <p className="bw-status bw-status-grown">
          WHAT IF: uploads stay licensed-only — partners post, everyone else
          watches (illustrative, not recorded history).
        </p>
      )}

      {branch === null && (
        <div className="bw-forkmini">
          <p className="bw-forkmini-h">THE FORK — WHO GETS TO UPLOAD?</p>
          <div className="bw-forkmini-row">
            <button
              className="bw-btn bw-btn-small"
              onClick={() => onChooseBranch("openUploads")}
            >
              HISTORY: anyone uploads
            </button>
            <button
              className="bw-btn bw-btn-small bw-btn-whatif"
              onClick={() => onChooseBranch("licensedOnly")}
            >
              WHAT IF: licensed-only
            </button>
            <button
              className="bw-btn bw-btn-small"
              onClick={() => onSetChapter("2005")}
            >
              BACK TO 2005 — THE ENCYCLOPEDIA
            </button>
          </div>
        </div>
      )}

      <p className="bw-bubble">
        Google: "$1.65 billion in Google stock" — announced October 9, 2006,
        finalized November 13, 2006 (B12).
      </p>
    </div>
  );
}

/* 2009 — line status: dial-up → broadband → the FCC goal */

function Line2009({
  state,
  onReadPlan,
}: {
  state: BroadbandState;
  onReadPlan: () => void;
}) {
  const { planRead } = state;

  return (
    <div className="bw-line">
      <h3 className="bw-pane-h">A NETWORK FOR EVERYONE — 2009</h3>
      <p className="bw-pane-sub">
        Dial-up "typically do not exceed a speed of 56 [kbit/s]"; "in
        subsequent years dial-up declined in favor of broadband access" (B15).
      </p>

      <ul className="bw-linestatus" aria-label="Line status (illustrative)">
        {LINE_STATUS.map((row) => (
          <li key={row.id} className="bw-track">
            <span className="bw-track-name">{row.name}</span>
            <span className={`bw-status-tag bw-status-${row.id}`}>{row.status}</span>
            <span className="bw-track-size">{row.note}</span>
          </li>
        ))}
      </ul>

      <button className="bw-btn" onClick={onReadPlan} disabled={planRead}>
        READ THE BROADBAND PLAN
      </button>
      {planRead && (
        <div className="bw-kazaa">
          <p className="bw-kazaa-h">NATIONAL BROADBAND PLAN — 2010</p>
          <p>
            Public comments April 2009 – February 2010, then the FCC's plan:
            "at least 100 million U.S. homes… actual download speeds of at
            least 100 megabits per second… by the year 2020" (B16).
          </p>
        </div>
      )}

      <p className="bw-bubble">
        "In September 2007, a majority of U.S. survey respondents reported
        having broadband internet at home" (B14).
      </p>
      <p className="bw-bubble">
        Wikipedia: 2 million articles on September 9, 2007 — "the largest
        encyclopedia ever assembled" — 3 million in August 2009 (B5).
      </p>
    </div>
  );
}