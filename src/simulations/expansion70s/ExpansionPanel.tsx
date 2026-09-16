/**
 * ExpansionPanel — the operator's console for the 1971–1982 exhibit:
 * timeline control (year stepper + slider), site-count readout, node
 * list, message send form, and the terminal log.
 *
 * Reuses the shared panel classes defined for exhibit 01
 * (.panel, .node-list, .send-row, .log-terminal, …).
 */
import { useEffect, useRef, useState } from 'react';
import { EXPANSION_NODES } from './expansionData';
import { graphAtYear, milestoneFor, nextMilestone, siteCountAt } from './growthEngine';
import type { ExpansionStats, LogLine } from './useExpansionSim';
import { sound } from '../../audio/SoundManager';

interface Props {
  year: number;
  yearBounds: { min: number; max: number };
  logs: LogLine[];
  stats: ExpansionStats;
  selectedNode: string | null;
  onNodeClick: (id: string) => void;
  onYearChange: (year: number) => void;
  onSend: (from: string, to: string) => void;
  onReplay: () => void;
}

export function ExpansionPanel({
  year,
  yearBounds,
  logs,
  stats,
  selectedNode,
  onNodeClick,
  onYearChange,
  onSend,
  onReplay,
}: Props) {
  const active = graphAtYear(year).nodes;
  const [from, setFrom] = useState('ucla');
  const [to, setTo] = useState('sri');

  // Keep the selects valid as the active node set changes with the year.
  const fromValid = active.some((n) => n.id === from) ? from : (active[0]?.id ?? 'ucla');
  const toValid = active.some((n) => n.id === to) ? to : (active[1]?.id ?? active[0]?.id ?? 'sri');

  const count = siteCountAt(year);
  const current = milestoneFor(year);
  const next = nextMilestone(year);

  return (
    <div className="exp-panel">
      <section className="panel exp-timeline" aria-label="Timeline control">
        <h3 className="panel-title">TIMELINE · 1969–1982</h3>
        <p className="exp-year-big" aria-live="polite">
          {year}
        </p>
        <div className="exp-year-controls">
          <button
            type="button"
            className="btn-ghost"
            disabled={year <= yearBounds.min}
            onClick={() => onYearChange(year - 1)}
          >
            ‹ YEAR
          </button>
          <button
            type="button"
            className="btn-ghost"
            disabled={year >= yearBounds.max}
            onClick={() => onYearChange(year + 1)}
          >
            YEAR ›
          </button>
          <button type="button" className="btn-ghost" onClick={onReplay}>
            REPLAY THE DECADE
          </button>
        </div>
        <input
          className="exp-slider"
          type="range"
          min={yearBounds.min}
          max={yearBounds.max}
          step={1}
          value={year}
          aria-label="Timeline year"
          onChange={(e) => {
            sound.uiTick();
            onYearChange(Number(e.target.value));
          }}
        />
        <p className="exp-readout" aria-live="polite">
          sites on record: {count !== null ? count : '—'}
          {current ? ` · ${current.title}` : ''}
          {next ? ` · next: ${next.year} — ${next.title}` : ''}
        </p>
      </section>

      <section className="panel exp-nodes" aria-label="Network nodes">
        <h3 className="panel-title">NODES</h3>
        <ul className="node-list">
          {EXPANSION_NODES.map((n) => {
            const isOn = n.year <= year;
            return (
              <li key={n.id} className="node-row">
                <span className={`led ${isOn ? 'is-on' : ''}`} aria-hidden="true" />
                <span className="node-id">{n.label}</span>
                <span className="node-org">{isOn ? `online since ${n.year}` : `joins in ${n.year}`}</span>
                {isOn && (
                  <button
                    type="button"
                    className={
                      n.id === selectedNode ? 'btn-ghost node-btn is-selected' : 'btn-ghost node-btn'
                    }
                    onClick={() => onNodeClick(n.id)}
                  >
                    INSPECT
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="panel exp-send" aria-label="Send a message">
        <h3 className="panel-title">SEND A MESSAGE</h3>
        <div className="send-row">
          <label className="send-field">
            <span>FROM</span>
            <select value={fromValid} onChange={(e) => setFrom(e.target.value)}>
              {active.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </label>
          <span className="send-arrow" aria-hidden="true">
            →
          </span>
          <label className="send-field">
            <span>TO</span>
            <select value={toValid} onChange={(e) => setTo(e.target.value)}>
              {active.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="send-actions">
          <button
            type="button"
            className="btn-primary exp-send-btn"
            disabled={fromValid === toValid}
            onClick={() => {
              sound.uiTick();
              onSend(fromValid, toValid);
            }}
          >
            SEND
          </button>
        </div>
        <p className="send-stats" aria-live="polite">
          sent: {stats.sent} · delivered: {stats.delivered}
        </p>
      </section>

      <LogTerminal logs={logs} />
    </div>
  );
}

function LogTerminal({ logs }: { logs: LogLine[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div className="panel exp-log-panel">
      <h3 className="panel-title">CONSOLE LOG</h3>
      <div className="log-terminal" ref={ref} role="log" aria-live="polite">
        {logs.map((l) => (
          <p key={l.id} className={`log-line log-${l.kind}`}>
            <span className="log-prompt">&gt;</span>
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}
