/**
 * Shown for eras that are not yet built.
 * Keeps the timeline navigable end-to-end from day one.
 */
export function EraPlaceholder() {
  return (
    <section className="era-placeholder" aria-label="Exhibit under construction">
      <div className="ph-terminal" role="log">
        <p>
          <span className="ph-prompt">&gt;</span> initializing exhibit…
        </p>
        <p>
          <span className="ph-prompt">&gt;</span> status: <span className="ph-warn">UNDER CONSTRUCTION</span>
        </p>
        <p>
          <span className="ph-prompt">&gt;</span> this era is scheduled for an upcoming update
        </p>
        <p>
          <span className="ph-prompt">&gt;</span> continue through the timeline below to visit
          completed exhibits
        </p>
      </div>
    </section>
  );
}
