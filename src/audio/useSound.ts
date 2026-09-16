import { useCallback, useSyncExternalStore } from 'react';
import { sound } from './SoundManager';

/**
 * React binding for the sound preference.
 * Returns [muted, setMuted].
 */
export function useSoundPref(): [boolean, (muted: boolean) => void] {
  const muted = useSyncExternalStore(sound.subscribe, () => sound.isMuted);
  const setMuted = useCallback((m: boolean) => sound.setMuted(m), []);
  return [muted, setMuted];
}
