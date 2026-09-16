/**
 * ArpanetPanel — the operator's console for the 1969 exhibit:
 * node power list, message send form, and the terminal log.
 */
import { useEffect, useRef, useState } from 'react';
import { ARPANET_NODES_1969 } from './arpanetData';
import type { ArpanetStats, LogLine } from './useArpanetSim';
import { sound } from '../../audio/SoundManager';

interface Props {
  online: Record<string, boolean>;
  logs: LogLine[];
  stats: ArpanetStats;
  selectedNode: string | null;
  onNodeClick: (id: string) => void;
  onSend: (from: string, to: string) => void;
  onReplayFirst: () => void;
}

export function ArpanetPanel({
  online,
  logs,
  stats,
  selectedNode,
  onNodeClick,
  onSend,
  onReplayFirst,
}: Props) {
  const [from, setFrom] = useState('ucla');
  const [to, setTo] = useState('sri');

  return (
    <div className="arpanet-panel">
      <section className="panel arpanet-nodes" aria-label="Network nodes">
        <h3 className="panel-title">NETWORK CONSOLE · 1969</h3>
        <ul className="node-list">
          {ARPANET_NODES_1969.map((n) => {
            const isOn = !!online[n.id];
            return (
              <li key={n.id} className="node-row">
                <span className={`led ${isOn ? 'is-on' : ''}`} aria-hidden="true" />
                <span className="node-id">{n.label}</span>
                <span className="node-org">{n.organization}</span>
                <button
                  type="button"
                  className={
                    n.id === selectedNode ? 'btn-ghost node-btn is-selected' : 'btn-ghost node-btn'
                  }
                  onClick={() => onNodeClick(n.id)}
                >
                  {isOn ? 'INSPECT' : 'POWER ON'}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="panel arpanet-send" aria-label="Send a message">
        <h3 className="panel-title">SEND A MESSAGE</h3>
        <div className="send-row">
          <label className="send-field">
            <span>FROM</span>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {ARPANET_NODES_1969.map((n) => (
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
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {ARPANET_NODES_1969.map((n) => (
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
            className="btn-primary arpanet-send-btn"
            disabled={from === to}
            onClick={() => {
              sound.uiTick();
              onSend(from, to);
            }}
          >
            SEND
          </button>
          <button type="button" className="btn-ghost" onClick={onReplayFirst}>
            REPLAY FIRST MESSAGE
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
    <div className="panel arpanet-log-panel">
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
