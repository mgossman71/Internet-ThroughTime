import { useTimelineActions } from '../../app/useTimeline';
import { TypewriterText } from '../../components/TypewriterText';
import { sound } from '../../audio/SoundManager';

/**
 * Prologue / museum entrance.
 * No historical claims here — just framing (safe, no citations needed).
 */
export function IntroScene() {
  const { next } = useTimelineActions();

  return (
    <section className="intro-scene">
      <p className="intro-kicker">AN INTERACTIVE EXHIBIT</p>
      <h1 className="intro-title">
        THE INTERNET
        <br />
        THROUGH TIME
      </h1>

      <TypewriterText
        className="intro-typed"
        text="From four linked laboratories in 1969 to a planetary system of cables, routers, and satellites — travel the history of computer networking, era by era, machine by machine."
        speed={12}
        startDelay={400}
      />

      <p className="intro-copy">
        This is not a book. Most exhibits let you{' '}
        <strong>operate simplified simulations</strong> of the technology — switch on ARPANET
        nodes, dial a modem, browse a 1990s homepage. Simulations are clearly labeled as
        simplified; historical claims are grounded in primary sources (see the Sources page in
        the repository docs).
      </p>

      <div className="intro-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            sound.relayClick();
            next();
          }}
        >
          ENTER THE MUSEUM →
        </button>
      </div>

      <ul className="intro-notes">
        <li>⌨ 12+ interactive eras, from 1969 packet switching to the AI era</li>
        <li>🔊 Sound is synthesized and off by default — enable it in the top-right</li>
        <li>📜 Documented history and speculation are always visually separated</li>
      </ul>
    </section>
  );
}
