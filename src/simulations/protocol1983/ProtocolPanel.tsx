/**
 * ProtocolPanel — the operator's console for the 1983 exhibit:
 * protocol desk (NCP/TCP/IP tally, FLAG DAY control, NCP vs TCP/IP
 * desk), host list with per-host SWITCH, message send form, and the
 * terminal log.
 *
 * Reuses the shared panel classes defined for exhibit 01
 * (.panel, .node-list, .send-row, .log-terminal, …).
 */
import { useEffect, useRef, useState } from 'react';
import { MILNET_NODE, PROTOCOL_DESK, SWITCH_NODES } from './protocolData';
import type { SwitchState } from './switchEngine';
import type { LogLine, SwitchStats } from './useProtocolSim';
import { sound } from '../../audio/SoundManager';

interface Props {
  state: SwitchState;
  counts: { ncp: number; tcpi: number };
  fullyOn: boolean;
  logs: LogLine[];
  stats: SwitchStats;
  onNodeSelect: (id: string) => void;
  onSwitchHost: (id: string) => void;
  onFlagDay: () => void;
  onSend: (from: string, to: string) => void;
}

export function ProtocolPanel({
  state,
  counts,
  fullyOn,
  logs,
  stats,
  onNodeSelect,
  onSwitchHost,
  onFlagDay,
  onSend,
}: Props) {
  const [from, setFrom] = useState('ucla');
  const [to, setTo] = useState('sri');

  // Keep the selects valid as the online host set changes (MILNET joins).
  const milnetLive = 'milnet' in state.protocols;
  const online = milnetLive ? [...SWITCH_NODES, MILNET_NODE] : [...SWITCH_NODES];
  const fromValid = online.some((n) => n.id === from) ? from : (online[0]?.id ?? 'ucla');
  const toValid = online.some((n) => n.id === to)
    ? to
    : (online.find((n) => n.id !== fromValid)?.id ?? 'sri');

  const statusText = !state.flagDayDone
    ? 'the deadline has passed — the network still speaks NCP'
    : !fullyOn
      ? 'one host keeps NCP by exception — switch it to finish (P4)'
      : 'one protocol — the ARPANET and MILNET now reach each other';

  return (
    <div className="ps-panel">
      <section className="panel ps-desk" aria-label="Protocol desk">
        <h3 className="panel-title">PROTOCOL DESK</h3>
        <p className="ps-counts" aria-live="polite">
          <span className="ps-count ps-count-ncp">{counts.ncp}</span> NCP ·{' '}
          <span className="ps-count ps-count-tcpi">{counts.tcpi}</span> TCP/IP
        </p>
        <p className="ps-status" aria-live="polite">
          {statusText}
        </p>
        <button
          type="button"
          className="btn-primary ps-flagday"
          disabled={state.flagDayDone}
          onClick={() => {
            sound.keyClick();
            onFlagDay();
          }}
        >
          {state.flagDayDone ? 'FLAG DAY DONE — JAN 1, 1983' : 'RUN FLAG DAY — JAN 1, 1983'}
        </button>
        <div className="ps-desk-table">
          <div className="ps-desk-head" aria-hidden="true">
            <span>ASPECT</span>
            <span>NCP</span>
            <span>TCP/IP</span>
          </div>
          {PROTOCOL_DESK.map((r) => (
            <div key={r.aspect} className="ps-desk-row">
              <span className="ps-desk-aspect">{r.aspect}</span>
              <span>{r.ncp}</span>
              <span>{r.tcpi}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel ps-hosts" aria-label="Hosts">
        <h3 className="panel-title">HOSTS</h3>
        <ul className="node-list">
          {SWITCH_NODES.map((n) => {
            const isTcpi = state.protocols[n.id] === 'tcpi';
            const exc = state.straggler === n.id;
            return (
              <li key={n.id} className="node-row">
                <span className={`led ${isTcpi ? 'is-on' : ''}`} aria-hidden="true" />
                <button
                  type="button"
                  className="host-id"
                  onClick={() => onNodeSelect(n.id)}
                  aria-label={`Select ${n.label}`}
                >
                  {n.label}
                </button>
                <span
                  className={`proto-badge ${isTcpi ? 'proto-tcpi' : 'proto-ncp'} ${exc ? 'proto-exc' : ''}`}
                >
                  {isTcpi ? 'TCP/IP' : 'NCP'}
                  {exc ? ' · EXC' : ''}
                </span>
                {!isTcpi && (
                  <button
                    type="button"
                    className="btn-ghost node-btn"
                    onClick={() => onSwitchHost(n.id)}
                    aria-label={`Switch ${n.label} to TCP/IP`}
                  >
                    SWITCH
                  </button>
                )}
              </li>
            );
          })}
          {milnetLive && (
            <li className="node-row">
              <span className="led is-on" aria-hidden="true" />
              <button
                type="button"
                className="host-id"
                onClick={() => onNodeSelect(MILNET_NODE.id)}
                aria-label="Select MILNET"
              >
                MILNET
              </button>
              <span className="proto-badge proto-tcpi">TCP/IP</span>
              <span className="proto-note">split off 1983</span>
            </li>
          )}
        </ul>
      </section>

      <section className="panel ps-send" aria-label="Send a message">
        <h3 className="panel-title">SEND A MESSAGE</h3>
        <div className="send-row">
          <label className="send-field">
            <span>FROM</span>
            <select value={fromValid} onChange={(e) => setFrom(e.target.value)}>
              {online.map((n) => (
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
              {online.map((n) => (
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
            className="btn-primary ps-send-btn"
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
          sent: {stats.sent} · delivered: {stats.delivered} · failed: {stats.failed}
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
    <div className="panel ps-log-panel">
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

