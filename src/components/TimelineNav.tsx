import { eraRegistry } from '../app/eraRegistry';
import { useTimelineActions } from '../app/useTimeline';
import { sound } from '../audio/SoundManager';

interface Props {
  activeEraId: string;
}

/**
 * Bottom timeline: prev/next + era chips.
 * The active chip is highlighted; upcoming eras dim slightly.
 */
export function TimelineNav({ activeEraId }: Props) {
  const { next, prev, isFirst, isLast, goTo } = useTimelineActions();
  const activeIndex = eraRegistry.findIndex((e) => e.id === activeEraId);

  return (
    <nav className="timeline-nav" aria-label="Timeline of eras">
      <button
        type="button"
        className="tl-arrow"
        onClick={() => {
          sound.uiTick();
          prev();
        }}
        disabled={isFirst()}
        aria-label="Previous era"
      >
        ‹
      </button>

      <div className="tl-track" role="list">
        {eraRegistry.map((era, i) => {
          const state =
            i === activeIndex ? 'is-active' : i < activeIndex ? 'is-past' : 'is-future';
          return (
            <button
              key={era.id}
              type="button"
              role="listitem"
              className={`tl-chip ${state}`}
              onClick={() => {
                sound.uiTick();
                goTo(era.id);
              }}
              aria-current={i === activeIndex ? 'step' : undefined}
            >
              <span className="tl-year">{era.shortYear}</span>
              <span className="tl-title">{era.title}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="tl-arrow"
        onClick={() => {
          sound.uiTick();
          next();
        }}
        disabled={isLast()}
        aria-label="Next era"
      >
        ›
      </button>
    </nav>
  );
}
