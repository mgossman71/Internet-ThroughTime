/**
 * The 1991–1996 "Linux" era scene (exhibit 06 — replaces the 1993–1996
 * "Browsers & Personal Pages" scene). Three chapters around one fork:
 *   1991 — the announcement (zero clicks)
 *   1992 — the fork: GNU GPL (history) vs. closed (labeled hypothetical)
 *   1996 — what it became: patches → 0.12 → 1.0 → 2.0 → it runs the Web
 *
 * Left column = chapters + per-chapter interactive panel + closing cards;
 * right column = the kernel-mail terminal (LinuxTerminal).
 * Facts carry [L#] tags (docs/SOURCES.md §L).
 */

import '../../styles/eras/linux90s.css';
import { LinuxTerminal } from '../../simulations/linux90s/LinuxTerminal';
import { useLinuxSim } from '../../simulations/linux90s/useLinuxSim';
import {
  BRANCHES,
  BRANCH_BY_ID,
  CHAPTERS,
  FACTS,
  MILESTONES,
  RUNS,
  VERSIONS,
} from '../../simulations/linux90s/linuxData';

export function LinuxScene() {
  const sim = useLinuxSim();
  const { state } = sim;
  const chapter = CHAPTERS.find((c) => c.year === state.chapter) ?? CHAPTERS[0];
  const branchDef = state.branch ? BRANCH_BY_ID[state.branch] : null;

  return (
    <div className="lx-scene">
      <div className="lx-grid">
        <div className="lx-left">
          {/* chapter stepper */}
          <nav className="lx-steps" aria-label="Chapters">
            {CHAPTERS.map((c) => (
              <button
                key={c.year}
                className={`lx-step${state.chapter === c.year ? ' lx-step-on' : ''}`}
                aria-pressed={state.chapter === c.year}
                onClick={() => sim.setChapter(c.year)}
              >
                <span className="lx-step-kicker">{c.kicker}</span>
                <span className="lx-step-title">{c.title}</span>
              </button>
            ))}
          </nav>

          <section className="lx-card">
            <p className="lx-kicker">{chapter.kicker}</p>
            <h2 className="lx-title">{chapter.title}</h2>
            <p className="lx-story">{chapter.story}</p>
            <p className="lx-takeaway">
              <strong>KEY TAKEAWAY</strong> {chapter.takeaway}{' '}
              <em className="lx-tag">[{chapter.tag}]</em>
            </p>
          </section>

          {/* chapter 2: the fork */}
          {state.chapter === 1992 && (
            <section className="lx-card">
              <h3 className="lx-panel-h">THE FORK — WHERE DOES THE CODE GO?</h3>
              <div className="lx-fork">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    className={`lx-fork-opt${state.branch === b.id ? ' lx-fork-on' : ''}`}
                    aria-pressed={state.branch === b.id}
                    onClick={() => sim.chooseBranch(b.id)}
                  >
                    <span className="lx-fork-name">{b.name}</span>
                    <span className="lx-fork-sub">{b.sub}</span>
                  </button>
                ))}
              </div>
              {branchDef && (
                <p className="lx-note">
                  Decision recorded: <strong>{branchDef.name}</strong> — the branch is locked.{' '}
                  <button className="lx-link" onClick={() => sim.reconsider()}>
                    REVISE DECISION
                  </button>
                </p>
              )}
            </section>
          )}

          {/* chapter 3, open branch: the release line + where it runs */}
          {state.chapter === 1996 && state.branch === 'open' && (
            <section className="lx-card">
              <h3 className="lx-panel-h">THE RELEASE LINE — WHAT THE OPEN FORK SHIPPED</h3>
              <ol className="lx-versions">
                {VERSIONS.map((v, i) => (
                  <li
                    key={v.ver}
                    className={`lx-ver${i <= state.versionIdx ? ' lx-ver-on' : ''}`}
                  >
                    <span className="lx-ver-name">Linux {v.ver}</span>
                    <span className="lx-ver-when">{v.when}</span>
                    <span className="lx-ver-note">{v.note}</span>
                  </li>
                ))}
              </ol>
              <p className="lx-hint">
                RECEIVE A PATCH in the terminal → every patch becomes a release, and every
                release becomes a reason for someone else to patch (L3–L5).
              </p>
              <h4 className="lx-panel-h">WHERE IT RUNS BY 1996</h4>
              <div className="lx-runs">
                {RUNS.map((r) => (
                  <div key={r.id} className="lx-run">
                    <span className="lx-run-label">{r.label}</span>
                    <span className="lx-run-text">
                      {r.text} <em className="lx-tag">[{r.tag}]</em>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* chapter 3, closed branch: the what-if */}
          {state.chapter === 1996 && state.branch === 'closed' && (
            <section className="lx-card lx-card-dim">
              <h3 className="lx-panel-h">THE "WHAT IF" — CLOSED (HYPOTHETICAL)</h3>
              <p className="lx-story">
                No license means no public tree, no patches, no 1.0, no 2.0 — the story ends at
                0.12. This is the hypothetical branch: real Linux went GPL in September 1992 (L2).
              </p>
              <p className="lx-ver lx-ver-off">
                <span className="lx-ver-name">Linux 0.12</span>
                <span className="lx-ver-when">Sept 1992</span>
                <span className="lx-ver-note">— the last release anyone would have seen (hypothetical)</span>
              </p>
              <button className="lx-btn lx-btn-ghost" onClick={() => sim.reconsider()}>
                REVISE DECISION — SEE WHAT ACTUALLY HAPPENED
              </button>
            </section>
          )}

          {/* chapter 3, undecided: the recovery path */}
          {state.chapter === 1996 && state.branch === null && (
            <section className="lx-card">
              <h3 className="lx-panel-h">THE FORK IS UNDECIDED</h3>
              <p className="lx-story">
                The story needs your choice: kept private, or released under the GPL? (L2)
              </p>
              <button className="lx-btn" onClick={() => sim.setChapter(1992)}>
                BACK TO CHAPTER 2 — DECIDE THE FORK
              </button>
            </section>
          )}

          {/* closing */}
          <section className="lx-card lx-closing">
            <h3 className="lx-panel-h">WHAT YOU SAW</h3>
            <p className="lx-story">
              One hobby kernel, one license decision, and a platform that outlived its author's
              intentions. The open branch is history; the closed branch is the question it
              answers (L1–L2).
            </p>
          </section>

          <section className="lx-card">
            <h3 className="lx-panel-h">MILESTONES</h3>
            <ul className="lx-milestones">
              {MILESTONES.map((m) => (
                <li key={m.when} className={m.inEra ? '' : 'lx-ms-out'}>
                  <span className="lx-ms-when">{m.when}</span>
                  {m.label}
                </li>
              ))}
            </ul>
          </section>

          <section className="lx-card">
            <h3 className="lx-panel-h">FACTS (SOURCE-VERIFIED)</h3>
            <ul className="lx-facts">
              {FACTS.map((f) => (
                <li key={f.tag}>
                  {f.claim} <em className="lx-tag">[{f.tag}]</em>
                </li>
              ))}
            </ul>
          </section>

          <p className="lx-footnote">
            SIMPLIFIED SIMULATION — the patch-mail in the terminal is illustrative (not real
            messages), and "RECEIVE A PATCH" compresses a community into a button. Facts and
            quotes are verified (docs/SOURCES.md §L). The "KEEP IT CLOSED" branch is a labeled
            hypothetical — real Linux went GPL (L2).
          </p>
        </div>

        <LinuxTerminal
          lines={state.lines}
          chapter={state.chapter}
          branch={state.branch}
          contributors={state.contributors}
          onPatch={() => sim.receivePatch()}
          onReconsider={() => sim.reconsider()}
          onGoToFork={() => sim.setChapter(1992)}
        />
      </div>
    </div>
  );
}