import { useSoundPref } from '../audio/useSound';
import { sound } from '../audio/SoundManager';

/**
 * Global mute control. Sound is OFF by default and never autoplays (spec §5).
 */
export function SoundToggle() {
  const [muted, setMuted] = useSoundPref();

  const toggle = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (!nextMuted) sound.uiTick(); // proves sound works the moment it's enabled
  };

  return (
    <button
      type="button"
      className={`sound-toggle ${muted ? 'is-muted' : 'is-on'}`}
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Enable sound' : 'Mute sound'}
      title={muted ? 'Sound off (click to enable)' : 'Sound on (click to mute)'}
    >
      <span className="sound-icon" aria-hidden="true">
        {muted ? '✕' : '♪'}
      </span>
      {muted ? 'SOUND OFF' : 'SOUND ON'}
    </button>
  );
}
