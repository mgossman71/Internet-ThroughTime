import { useActiveEra } from './app/useTimeline';
import { CRTShell } from './components/CRTShell';

/**
 * Application root: resolves the active era and renders its scene
 * inside the CRT shell. All era state flows through the central
 * timeline store (see src/app/timelineStore.ts).
 */
export default function App() {
  const era = useActiveEra();
  const Scene = era.Scene;

  return (
    <CRTShell era={era}>
      <Scene />
    </CRTShell>
  );
}
