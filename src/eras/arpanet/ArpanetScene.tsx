import { useEffect, useState } from 'react';
import { ARPANET_CONTEXT, ARPANET_NODES_1969 } from '../../simulations/arpanet/arpanetData';
import { useArpanetSim } from '../../simulations/arpanet/useArpanetSim';
import { ArpanetMap } from '../../simulations/arpanet/ArpanetMap';
import { ArpanetPanel } from '../../simulations/arpanet/ArpanetPanel';
import { RoutingSim } from '../../simulations/packet-routing/RoutingSim';
import { TypewriterText } from '../../components/TypewriterText';
import '../../styles/eras/arpanet.css';

/**
 * EXHIBIT 01 — ARPANET, 1969.
 * Composes: narrative header, live four-node map, operator console,
 * the generic packet-routing exhibit, and grounded fact notes.
 */
export function ArpanetScene() {
  const sim = useArpanetSim();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Clear any scripted timeouts (first-message replay) on unmount.
  useEffect(() => sim.clearScript, [sim.clearScript]);

  const handleNodeClick = (id: string) => {
    if (!sim.online[id]) sim.bootNode(id);
    setSelectedNode(id);
  };

  const node = ARPANET_NODES_1969.find((n) => n.id === selectedNode) ?? null;

  return (
    <section className="arpanet-scene">
      <header className="era-head">
        <p className="era-head-kicker">EXHIBIT 01 · LATE 1969</p>
        <h2 className="era-head-title">ARPANET</h2>
        <TypewriterText
          className="era-head-lede"
          text={ARPANET_CONTEXT.lead}
          speed={14}
          startDelay={350}
        />
      </header>

      <div className="arpanet-grid">
        <div className="arpanet-left">
          <ArpanetMap
            online={sim.online}
            packetsRef={sim.packetsRef}
            advance={sim.advance}
            onNodeClick={handleNodeClick}
            selectedNode={selectedNode}
          />
          {node && (
            <div className="panel node-card">
              <p className="panel-title">NODE FILE</p>
              <p className="node-card-name">
                {node.label} — {node.organization}
              </p>
              <p className="node-card-meta">
                host: {node.host} · status:{' '}
                <strong>{sim.online[node.id] ? 'ONLINE' : 'OFFLINE'}</strong>
              </p>
            </div>
          )}
        </div>

        <ArpanetPanel
          online={sim.online}
          logs={sim.logs}
          stats={sim.stats}
          selectedNode={selectedNode}
          onNodeClick={handleNodeClick}
          onSend={sim.send}
          onReplayFirst={sim.replayFirstMessage}
        />
      </div>

      <section className="arpanet-routing panel" aria-label="Packet routing exhibit">
        <h3 className="panel-title">INTERACTIVE · HOW A PACKET FINDS ITS WAY</h3>
        <RoutingSim />
      </section>

      <ul className="era-facts">
        {ARPANET_CONTEXT.facts.map((f) => (
          <li key={f.slice(0, 32)}>{f}</li>
        ))}
      </ul>

      <p className="era-footnote">{ARPANET_CONTEXT.footnote}</p>
    </section>
  );
}
