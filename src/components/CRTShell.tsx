import type { ReactNode } from 'react';
import type { EraDescriptor } from '../types/era';
import { TimelineNav } from './TimelineNav';
import { SoundToggle } from './SoundToggle';

interface Props {
  era: EraDescriptor;
  children: ReactNode;
}

/**
 * App shell: era theme, CRT scanlines/vignette, header, footer timeline.
 * The scene is re-keyed per era so each exhibit starts fresh.
 */
export function CRTShell({ era, children }: Props) {
  return (
    <div className={`crt-shell ${era.themeClass}`}>
      <div className="crt-frame">
        <header className="crt-header">
          <div className="crt-brand" aria-label="The Internet Through Time">
            <span className="crt-brand-dot" aria-hidden="true" />
            THE INTERNET <span className="crt-brand-sep">·</span> THROUGH TIME
          </div>
          <div className="crt-header-right">
            <SoundToggle />
          </div>
        </header>

        <main className="crt-main" aria-live="polite">
          {era.speculative && (
            <div className="speculative-banner" role="note">
              SPECULATIVE SECTION — NOT HISTORICAL RECORD
            </div>
          )}
          <div key={era.id} className="era-enter">
            {children}
          </div>
        </main>

        <footer className="crt-footer">
          <TimelineNav activeEraId={era.id} />
        </footer>

        <div className="crt-scanlines" aria-hidden="true" />
        <div className="crt-vignette" aria-hidden="true" />
      </div>
    </div>
  );
}
