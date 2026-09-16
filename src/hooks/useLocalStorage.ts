import { useCallback, useState } from 'react';

/**
 * Small persisted-state helper (sound preference, visited exhibits, etc.).
 * Only use for non-critical preferences — never for history or user content.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw) as T;
    } catch {
      /* corrupted or unavailable — use default */
    }
    return initialValue;
  });

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* non-fatal */
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set] as const;
}
