import type { ComponentType } from 'react';

/**
 * A single era in the timeline.
 *
 * Era data (copy, years, theme) lives in src/data/eraList.ts.
 * Rendering (Scene) is attached in src/app/eraRegistry.ts.
 */
export interface EraDescriptor {
  /** Stable unique id, e.g. "arpanet". Used for routing + localStorage. */
  id: string;
  /** Short label shown in the timeline nav, e.g. "1969". */
  shortYear: string;
  /** Display title, e.g. "ARPANET". */
  title: string;
  /** One-line subtitle shown under the title in nav/scenes. */
  subtitle: string;
  /** CSS class applied to the app shell to select this era's theme tokens. */
  themeClass: string;
  /** True for the speculative future section. Rendered with a distinct visual language. */
  speculative: boolean;
  /** "built" eras are playable; "coming-soon" show the placeholder exhibit. */
  status: 'built' | 'coming-soon';
  /** The React component that renders the era scene. */
  Scene: ComponentType;
}
