/**
 * CloudPhone — the era's artifact: a period-style phone screen.
 *   2010 = the home screen (app grid + signal panel — CHECK THE PHONE)
 *   2012 = the cloud (sync queue — echoes the 2007 upload queue) + the fork
 *   2015 = the app store (install queue — echoes the 2001 share queue)
 *
 * ALL chrome is ILLUSTRATIVE (status bar, signal bars, home-screen icons,
 * sync-queue rows, app-queue rows) — labeled inline. Historical claims
 * and quotes live in the scene's fact cards and carry M-tags
 * (docs/SOURCES.md §M, verified 2026-09-17).
 */

import type { BranchId, ChapterId } from "./mobileData";
import {
  APP_POOL,
  HOME_SCREEN,
  PHONE_STATUS,
  SYNC_POOL,
} from "./mobileData";
import {
  MAX_INSTALLS,
  MAX_SYNCS,
  type MobileState,
} from "./mobileEngine";

export interface CloudPhoneProps {
  state: MobileState;
  onCheckPhone: () => void;
  onSyncFiles: () => void;
  onInstallApp: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}

export function CloudPhone({
  state,
  onCheckPhone,
  onSyncFiles,
  onInstallApp,
  onSetChapter,
  onChooseBranch,
}: CloudPhoneProps) {
  const { chapter } = state;

  return (
    <div className="mc-phone" role="group" aria-label={`Phone screen — ${chapter}`}>
      <div className="mc-statusbar" aria-hidden="true">
        <span className="mc-sb-time">9:41 AM</span>
        <span className="mc-sb-sig">
          <i className={`mc-bar${state.phoneChecked ? " mc-bar-on" : ""}`} />
          <i className={`mc-bar${state.phoneChecked ? " mc-bar-on" : ""}`} />
          <i className={`mc-bar${state.phoneChecked ? " mc-bar-on" : ""}`} />
          <i className="mc-bar" />
        </span>
        <span className="mc-sb-net">{state.phoneChecked ? "LTE" : "EDGE"}</span>
        <span className="mc-sb-bat">82%</span>
      </div>

      <div className="mc-screen">
        {chapter === "2010" && (
          <Phone2010 state={state} onCheckPhone={onCheckPhone} />
        )}
        {chapter === "2012" && (
          <Cloud2012
            state={state}
            onSyncFiles={onSyncFiles}
            onSetChapter={onSetChapter}
            onChooseBranch={onChooseBranch}
          />
        )}
        {chapter === "2015" && (
          <Apps2015 state={state} onInstallApp={onInstallApp} />
        )}
      </div>

      <p className="mc-chrome-note">
        screen, icons and status bar are illustrative recreations (not a real
        phone)
      </p>
    </div>
  );
}

/* 2010 — home screen + signal panel (all values illustrative) */

function Phone2010({
  state,
  onCheckPhone,
}: {
  state: MobileState;
  onCheckPhone: () => void;
}) {
  const { phoneChecked } = state;

  return (
    <div className="mc-home">
      <h3 className="mc-pane-h">THE PHONE BECOMES THE COMPUTER — 2010</h3>
      <p className="mc-pane-sub">
        "A smartphone… combines the functionality of a traditional mobile
        phone (feature phone) with advanced computing capabilities" (M1).
      </p>

      <div className="mc-grid" aria-hidden="true">
        {HOME_SCREEN.map((app) => (
          <span key={app} className="mc-icon">
            {app}
          </span>
        ))}
      </div>

      <button className="mc-btn" onClick={onCheckPhone} disabled={phoneChecked}>
        CHECK THE PHONE
      </button>

      {phoneChecked && (
        <>
          <ul className="mc-rows" aria-label="Signal panel (illustrative)">
            {PHONE_STATUS.map((row) => (
              <li key={row.id} className="mc-track">
                <span className="mc-track-name">{row.name}</span>
                <span className={`mc-status-tag mc-status-${row.id}`}>
                  {row.status}
                </span>
                <span className="mc-track-size">{row.note}</span>
              </li>
            ))}
          </ul>
          <div className="mc-callout">
            <p className="mc-callout-h">FIRST PUBLIC LTE SERVICE</p>
            <p>
              Oslo and Stockholm, December 14, 2009 — "a data connection with
              a USB modem" (M4).
            </p>
          </div>
        </>
      )}

      <p className="mc-bubble">
        The tablet joins the era: "The first-generation iPad was introduced on
        January 27, 2010" (M2).
      </p>
      <p className="mc-bubble">
        ITU, early 2010: on-the-go web access "likely to exceed web access
        from desktop computers within the following five years" (M7).
      </p>
    </div>
  );
}

/* 2012 — the cloud: sync queue (illustrative) + the fork */

function Cloud2012({
  state,
  onSyncFiles,
  onSetChapter,
  onChooseBranch,
}: {
  state: MobileState;
  onSyncFiles: () => void;
  onSetChapter: (chapter: ChapterId) => void;
  onChooseBranch: (branch: BranchId) => void;
}) {
  const { branch, syncs } = state;
  const full = syncs >= MAX_SYNCS;
  const cloud = branch === "cloud";
  const localOnly = branch === "localOnly";

  return (
    <div className="mc-cloud">
      <h3 className="mc-pane-h">YOUR STUFF MOVES TO THE CLOUD — 2012</h3>
      <p className="mc-pane-sub">
        Google Drive, April 24, 2012: "store files in the cloud (on Google
        servers), synchronize files across devices, and share files" (M10).
      </p>

      <ul className="mc-queue" aria-label="Sync queue (illustrative)">
        {syncs === 0 && <li className="mc-queue-empty">no files queued — sync one</li>}
        {SYNC_POOL.slice(0, syncs).map((f, i) => (
          <li key={i} className={`mc-track${cloud ? "" : " mc-track-off"}`}>
            <span className="mc-track-name">{f.name}</span>
            <span className={`mc-status-tag ${cloud ? "mc-status-incloud" : "mc-status-local"}`}>
              {cloud ? "IN THE CLOUD" : "ON THIS DEVICE"}
            </span>
            <span className="mc-track-size">{cloud ? f.dest : "stays local"}</span>
          </li>
        ))}
      </ul>

      <button className="mc-btn" onClick={onSyncFiles} disabled={full}>
        SYNC FILES ({syncs}/{MAX_SYNCS})
      </button>

      {cloud && (
        <>
          <div className="mc-callout">
            <p className="mc-callout-h">THE CLOUD WINS (HISTORY)</p>
            <p>
              iCloud: "enables users to store and sync data across devices"
              (M9); Dropbox: "cloud storage, file synchronization" (M11).
              Spotify: "a Swedish freemium music streaming service" (M12).
            </p>
          </div>
          <p className="mc-status mc-status-grown">
            HISTORY: your stuff lives in two places — on you and on the net.
            If the phone dies, the cloud still has it (M10).
          </p>
        </>
      )}
      {localOnly && (
        <p className="mc-status mc-status-frozen">
          WHAT IF: everything stays on the device — no sync, no streaming.
          If the phone or the disk dies, the files die with it
          (illustrative, not recorded history).
        </p>
      )}

      {branch === null && (
        <div className="mc-forkmini">
          <p className="mc-forkmini-h">THE FORK — WHERE DOES YOUR STUFF LIVE?</p>
          <div className="mc-forkmini-row">
            <button
              className="mc-btn mc-btn-small"
              onClick={() => onChooseBranch("cloud")}
            >
              THE CLOUD WINS (HISTORY)
            </button>
            <button
              className="mc-btn mc-btn-small mc-btn-whatif"
              onClick={() => onChooseBranch("localOnly")}
            >
              STAYS ON DEVICE (WHAT IF)
            </button>
            <button
              className="mc-btn mc-btn-small"
              onClick={() => onSetChapter("2010")}
            >
              BACK TO 2010 — THE PHONE
            </button>
          </div>
        </div>
      )}

      <p className="mc-bubble">
        Netflix: streaming "launched in 2007, nearly a decade after… its
        pioneering DVD-by-mail movie rental service" (M13).
      </p>
      <p className="mc-bubble">
        What is a "cloud"? NIST: "On-demand self-service" — you provision
        "server time and network storage… automatically" (M8).
      </p>
    </div>
  );
}

/* 2015 — the app store: install queue (illustrative) */

function Apps2015({
  state,
  onInstallApp,
}: {
  state: MobileState;
  onInstallApp: () => void;
}) {
  const { installs } = state;
  const full = installs >= MAX_INSTALLS;

  return (
    <div className="mc-apps">
      <h3 className="mc-pane-h">THE APP ECONOMY — 2015</h3>
      <p className="mc-pane-sub">
        The App Store opened July 10, 2008 (M14); Android Market, announced
        August 28, 2008, became Google Play in March 2012 (M15).
      </p>

      <ul className="mc-queue" aria-label="App install queue (illustrative)">
        {installs === 0 && <li className="mc-queue-empty">nothing installed yet</li>}
        {APP_POOL.slice(0, installs).map((a, i) => (
          <li key={i} className="mc-track">
            <span className="mc-track-name">{a.name}</span>
            <span className="mc-status-tag mc-status-incloud">INSTALLED</span>
            <span className="mc-track-size">{a.size}</span>
          </li>
        ))}
      </ul>

      <button className="mc-btn" onClick={onInstallApp} disabled={full}>
        INSTALL APP ({installs}/{MAX_INSTALLS})
      </button>

      <div className="mc-callout">
        <p className="mc-callout-h">THE NUMBERS LAND</p>
        <p>
          "Global smartphone sales surpassed the sales figures for feature
          phones in early 2013" (M16).
        </p>
      </div>
      <p className="mc-status mc-status-grown">
        The ITU's 2010 five-year window closes: mobile leads the web (M7).
      </p>
    </div>
  );
}