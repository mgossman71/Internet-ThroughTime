import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function read(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Respect the user's reduced-motion preference (spec: visual quality §4).
 * Animations should degrade to instant/static rendering when true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(read);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
