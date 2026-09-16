import { useEffect, useRef } from 'react';

/**
 * requestAnimationFrame loop with cleanup.
 * The callback receives the high-resolution timestamp (ms).
 * Pass `active: false` to pause the loop (e.g. tab hidden, sim idle).
 */
export function useRaf(
  callback: (timestamp: number, deltaMs: number) => void,
  active = true,
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!active) return;
    let frameId = 0;
    let last = 0;

    const loop = (t: number) => {
      const delta = last === 0 ? 0 : Math.min(64, t - last); // clamp long frames
      last = t;
      cbRef.current(t, delta);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [active]);
}
