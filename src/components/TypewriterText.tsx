import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { sound } from '../audio/SoundManager';

interface Props {
  text: string;
  /** ms per character (default 16). */
  speed?: number;
  /** ms to wait before typing starts. */
  startDelay?: number;
  className?: string;
  /** Emit a subtle key click every N characters (0 = never). */
  clickEvery?: number;
  onDone?: () => void;
}

/**
 * Terminal typing effect.
 * - Full text is exposed to screen readers immediately (sr-only).
 * - With prefers-reduced-motion, renders instantly (spec §4).
 */
export function TypewriterText({
  text,
  speed = 16,
  startDelay = 0,
  className,
  clickEvery = 3,
  onDone,
}: Props) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(() => (reduced ? text.length : 0));
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      onDoneRef.current?.();
      return;
    }

    let raf = 0;
    let acc = -startDelay;
    let last: number | null = null;
    let typed = 0;
    let sinceClick = 0;

    const step = (t: number) => {
      if (last !== null) acc += Math.min(100, t - last); // clamp long frames
      last = t;

      if (acc >= 0) {
        const add = Math.max(1, Math.floor(acc / speed));
        acc -= add * speed;
        sinceClick += add;
        typed = Math.min(text.length, typed + add);
        if (clickEvery > 0 && sinceClick >= clickEvery) {
          sinceClick = 0;
          sound.keyClick();
        }
        setCount(typed);
      }

      if (typed < text.length) {
        raf = requestAnimationFrame(step);
      } else if (typed === text.length && acc >= 0) {
        // Guard: fire onDone exactly once, on the frame we finish.
        if (Math.floor(t / 16) > 0) onDoneRef.current?.();
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced, speed, startDelay]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {count < text.length && <span className="tw-cursor">▌</span>}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
