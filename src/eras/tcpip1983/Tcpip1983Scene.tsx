/**
 * Tcpip1983Scene — the "1983 · The Great Protocol Switch" era.
 *
 * Exhibit 03: the NCP → TCP/IP cutover. Operators switch hosts one at
 * a time (the roll-out), or run the mandatory FLAG DAY of January 1,
 * 1983 — after which a cross-protocol send fails, one site keeps NCP
 * by exception (mid-1983 stragglers), and MILNET splits off.
 */
import { useEffect } from 'react';
import {
  MILNET_NODE,
  PROTOCOL_CONTEXT,
  SWITCH_MILESTONES,
  SWITCH_NODES,
} from '../../simulations/protocol1983/protocolData';
import { useProtocolSim } from '../../simulations/protocol1983/useProtocolSim';
import { ProtocolMap } from '../../simulations/protocol1983/ProtocolMap';
import { ProtocolPanel } from '../../simulations/protocol1983/ProtocolPanel';
import { TypewriterText } from '../../components/TypewriterText';
import '../../styles/eras/tcpip1983.css';

export function Tcpip1983Scene() {
  const sim = useProtocolSim();

  // Safety: drop any pending scripted timeouts on unmount.
  useEffect(() => sim.clearScript, [sim.clearScript]);

  const node =
    SWITCH_NODES.find((n) => n.id === sim.selectedNode) ??
    (sim.selectedNode === MILNET_NODE.id ? MILNET_NODE : null);

  const selectedProto = node ? sim.state.protocols[node.id] : null;

  return (
    <section className="ps-scene">
      <header className="era-head">
        <p className="era-head-kicker">EXHIBIT 03 · 1983</p>
        <h2 className="era-head-title">THE GREAT PROTOCOL SWITCH</h2>
        <TypewriterText
          className="era-head-lede"
          text={PROTOCOL_CONTEXT.lead}
          speed={12}
          startDelay={350}
        />
      </header>

      <div className="ps-grid">
        <div className="ps-left">
          <ProtocolMap
            state={sim.state}
            packetsRef={sim.packetsRef}
            advance={sim.advance}
            onNodeClick={sim.selectNode}
            selectedNode={sim.selectedNode}
          />
          {node && (
            <div className="panel node-card">
              <p className="panel-title">
                NODE FILE · {node.label} {node.international ? '· FIRST INTERNATIONAL' : ''}
              </p>
              <p className="node-card-name">{node.organization}</p>
              <p className="node-card-meta">
                protocol:{' '}
                <strong>{selectedProto === 'ncp' ? 'NCP' : 'TCP/IP'}</strong>
                {sim.state.straggler === node.id ? ' · BY EXCEPTION (P4)' : ''}
              </p>
            </div>
          )}
        </div>

        <ProtocolPanel
          state={sim.state}
          counts={sim.counts}
          fullyOn={sim.fullyOn}
          logs={sim.logs}
          stats={sim.stats}
          onNodeSelect={sim.selectNode}
          onSwitchHost={sim.switchHost}
          onFlagDay={sim.runFlagDay}
          onSend={(f, t) => sim.send(f, t)}
        />
      </div>

      <section className="panel ps-milestones" aria-label="Milestones of 1983">
        <h3 className="panel-title">1981 → MID 1983</h3>
        <ol className="ps-mile-list">
          {SWITCH_MILESTONES.map((m) => (
            <li key={m.id} className={`is-${sim.milestoneStates[m.id]}`}>
              <span className="ps-mile-year">{m.year}</span>
              <span className="ps-mile-title">{m.title}</span>
              <span className="ps-mile-detail">{m.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <ul className="era-facts">
        {PROTOCOL_CONTEXT.facts.map((f) => (
          <li key={f.slice(0, 40)}>{f}</li>
        ))}
      </ul>

      <p className="era-footnote">{PROTOCOL_CONTEXT.footnote}</p>
    </section>
  );
}
