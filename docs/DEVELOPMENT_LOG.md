# Development Log

Short dated entries for significant work. Newest first.

## 2026-09-16 — Docker Compose support

- `Dockerfile`: multi-stage — `node:22-alpine` builds (npm ci + `npm run
  build`), `nginx:1.27-alpine` serves; healthcheck via busybox wget.
- `docker-compose.yml`: `web` (build + 8080:80, unless-stopped,
  healthcheck) and optional `dev` profile (node:22-alpine, bind-mounted
  src, Vite HMR on 5173, named `node_modules` volume).
- `nginx.conf`: SPA try_files fallback, gzip, immutable /assets caching.
- `.dockerignore`: node_modules, dist, .git, logs, tsbuildinfo, docs.
- README: Docker Compose section (canonical run commands).
- Verified: compose build + up + curl (see gate notes below once done).

## 2026-09-16 — Phase 0 (foundation) + Phase 1 (ARPANET era)

**Phase 0 — foundation (all green: build + tests):**
- Manual Vite 5 + React 18 + TypeScript scaffold (create-vite v9 proved
  interactive; hand-rolled for control). Node 26 / npm 11.
- `src/app/timelineStore.ts` — central era state (pub/sub, localStorage
  persistence, test reset). React binding via `useSyncExternalStore`
  (`src/app/useTimeline.ts`).
- `src/app/eraRegistry.ts` — single data→scene coupling point; `BUILT` set
  gates built vs. coming-soon eras.
- `src/data/eraList.ts` — 13 ordered era descriptors (intro → future),
  including the speculative `future` era.
- `src/components/` — CRTShell (scanlines/vignette/speculative banner),
  TimelineNav, SoundToggle, TypewriterText (reduced-motion aware, sr-only
  full text), EraPlaceholder.
- `src/audio/SoundManager.ts` — Web Audio API synth (tone/noise primitives +
  named era effects: keyClick, relayClick, uiTick, successChime, errorBuzz,
  modemDial, modemHandshake, labHum). No audio files. Mute persisted,
  default OFF, no autoplay.
- `src/hooks/` — useRaf, useReducedMotion, useLocalStorage.
- `src/styles/base.css` + `themes.css` — token system; 8 era themes
  (intro, arpanet green, amber, web90 teal/silver, 2000s, mobile, modern,
  future magenta). Reduced-motion media query disables animation.
- Vitest + Testing Library + jsdom wired in `vite.config.ts`.

**Phase 1 — ARPANET era (exhibit 01):**
- `src/simulations/arpanet/` — arpanetData.ts (4 nodes, links, grounded
  copy), useArpanetSim.ts (state: node power, packets in ref for 60fps,
  log, stats, first-message replay script), ArpanetMap.tsx (canvas draw:
  links, packets with trails, node glow; HTML buttons for accessibility),
  ArpanetPanel.tsx (console: node power list, send form, terminal log).
- `src/simulations/packet-routing/` — routingEngine.ts (pure BFS + latency
  + loss; RNG-injectable) + 9 unit tests; RoutingSim.tsx (SVG diamond
  diagram, failover toggles, latency/loss sliders, hop animation,
  teaching notes).
- `src/eras/arpanet/ArpanetScene.tsx` — composes exhibit header (typewriter
  lede), map + node card, operator console, routing exhibit, fact list,
  "simplified simulation" footnote.
- `src/styles/eras/arpanet.css` — era styles.
- History verification (see docs/SOURCES.md): ARPANET 1969–1990, ARPA
  1966/Taylor/Roberts, Baran+Davies, BBN IMPs/NCP (Heart, Kahn), first four
  hosts, "LO" story attributed as standard account. Internet Society + CHM
  pages blocked/404 — noted in SOURCES.md with TODOs.

**Gates:** `npm run build` green (tsc -b + vite), `npm test` 13/13 green.

## 2026-09-16 — initial scaffold
- Repo initialized (git, main branch). Project approved: React 18 + TS +
  Vite, deep-first build order (ARPANET → dial-up/BBS → early web).
