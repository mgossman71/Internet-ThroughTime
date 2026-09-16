/**
 * Expansion70sScene — the "1971–1982 · A Network of Networks" era.
 *
 * Exhibit 02: the ARPANET growth story — terminals (TIPs), email,
 * the first international nodes, and the TCP/IP specifications that
 * matured before the 1983 cutover (next era).
 */
import { useEffect } from 'react';
import {
  EXPANSION_CONTEXT,
  EXPANSION_NODES,
  MILESTONES,
} from '../../simulations/expansion70s/expansionData';
import { useExpansionSim } from '../../simulations/expansion70s/useExpansionSim';
import { ExpansionMap } from '../../simulations/expansion70s/ExpansionMap';
import { ExpansionPanel } from '../../simulations/expansion70s/ExpansionPanel';
import { TypewriterText } from '../../components/TypewriterText';
import '../../styles/eras/expansion70s.css';

export function Expansion70sScene() {
  const sim = useExpansionSim();

  // Safety: drop any pending scripted timeouts on unmount.
  useEffect(() => sim.clearScript, [sim.clearScript]);

  const node = EXPANSION_NODES.find((n) => n.id === sim.selectedNode) ?? null;

  return (
    <section className="exp-scene">
      <header className="era-head">
        <p className="era-head-kicker">EXHIBIT 02 · 1971–1982</p>
        <h2 className="era-head-title">A NETWORK OF NETWORKS</h2>
        <TypewriterText
          className="era-head-lede"
          text={EXPANSION_CONTEXT.lead}
          speed={12}
          startDelay={350}
        />
      </header>

      <div className="exp-grid">
        <div className="exp-left">
          <ExpansionMap
            year={sim.year}
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
                status: <strong>{node.year <= sim.year ? 'ONLINE' : `JOINS IN ${node.year}`}</strong>
              </p>
            </div>
          )}
        </div>

        <ExpansionPanel
          year={sim.year}
          yearBounds={sim.yearBounds}
          logs={sim.logs}
          stats={sim.stats}
          selectedNode={sim.selectedNode}
          onNodeClick={sim.selectNode}
          onYearChange={sim.setYear}
          onSend={(f, t) => sim.send(f, t)}
          onReplay={sim.replayDecade}
        />
      </div>

      <section className="panel exp-milestones" aria-label="Milestones of the 1970s">
        <h3 className="panel-title">MILESTONES · 1970–1982</h3>
        <ol className="exp-mile-list">
          {MILESTONES.map((m) => (
            <li key={m.year} className={m.year <= sim.year ? 'is-past' : 'is-future'}>
              <span className="exp-mile-year">{m.year}</span>
              <span className="exp-mile-title">{m.title}</span>
              <span className="exp-mile-detail">{m.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <ul className="era-facts">
        {EXPANSION_CONTEXT.facts.map((f) => (
          <li key={f.slice(0, 40)}>{f}</li>
        ))}
      </ul>

      <p className="era-footnote">{EXPANSION_CONTEXT.footnote}</p>
    </section>
  );
}
