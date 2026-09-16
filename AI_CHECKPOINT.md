# Internet Through Time — AI Development Checkpoint

_Last updated: 2026-09-16 (Phase 0 + Phase 1 complete)._

## Current Project State

Working React 18 + TypeScript + Vite 5 app. Build green (`tsc -b && vite
build`), tests green (13/13, vitest + Testing Library).

Playable today:
- **Intro era** — prologue scene with typewriter lede + "Enter the Museum".
- **1969 ARPANET era (exhibit 01)** — four-node canvas map (SRI/UCLA/UCSB/
  UTAH) with node power-on, animated packet travel, operator console with
  terminal log, "replay the first message" scripted sequence (the standard
  LOGIN/"LO" account, clearly attributed), grounded fact list.
- **Packet-routing exhibit** — SVG diamond topology (SOURCE → Router A/B →
  DESTINATION) with failover toggles, latency/loss sliders, hop-by-hop
  animation, teaching notes. Built on a pure, unit-tested routing engine.
- All other 11 eras render a styled "UNDER CONSTRUCTION" placeholder so the
  timeline is navigable end-to-end.

Global systems working: central timeline store, era theme switching (8
themes), CRT shell (scanlines/vignette), synthesized sound (off by default,
no autoplay, persisted mute), reduced-motion support, responsive layout.

## Architecture

- **Stack**: React 18, TS strict, Vite 5, Vitest 2 + jsdom + Testing
  Library. Plain CSS (no framework). Node 26 / npm 11 on this machine.
- **State**: ONE central timeline store (`src/app/timelineStore.ts`,
  framework-agnostic pub/sub + localStorage persistence). Era components
  own only local sim state. React binding: `useSyncExternalStore`.
- **Data ↔ rendering split**: `src/data/eraList.ts` (pure era data) →
  `src/app/eraRegistry.ts` (ONLY place coupling data to scene components;
  `BUILT` set decides built vs. coming-soon).
- **Simulation split** (per feature under `src/simulations/<name>/`):
  - `arpanetData.ts` (data + copy) / `useArpanetSim.ts` (state+actions) /
    `ArpanetMap.tsx` (canvas draw only) / `ArpanetPanel.tsx` (controls/log)
  - `packet-routing/routingEngine.ts` (pure logic, RNG-injectable, tested)
    / `RoutingSim.tsx` (presentation)
- **Perf pattern**: in-flight packets live in a ref, advanced by the
  canvas rAF loop (`advance(delta)`); React state changes only on discrete
  events. Do not regress this to per-frame React state.
- **Sound**: `src/audio/SoundManager.ts` — Web Audio API synthesis only
  (oscillators + white noise). No audio files, no copyrighted material.
  Default muted; context created only on user gesture.
- **Styles**: `src/styles/base.css` (layout/components) + `themes.css`
  (era token sets) + `src/styles/eras/<era>.css` (era-specific, imported by
  that era's scene file).

## Completed Features

- [x] Vite/TS scaffold (hand-rolled; create-vite v9 was interactive)
- [x] Timeline store + persistence + React hooks + actions
- [x] Era registry + 13-era list (incl. speculative `future` era, flagged)
- [x] CRT shell: header, footer timeline nav (prev/next + era chips),
      scanlines, vignette, speculative banner, era enter transition
- [x] SoundManager: keyClick, relayClick, uiTick, successChime, errorBuzz,
      modemDial, modemHandshake, labHum; mute toggle + persistence
- [x] TypewriterText (reduced-motion aware, sr-only full text, key clicks)
- [x] Intro scene; EraPlaceholder for unbuilt eras
- [x] ARPANET sim: node power, packet animation w/ trails, console log,
      first-message replay, node file card
- [x] routingEngine (BFS + latency + loss) + 9 unit tests
- [x] RoutingSim: failover, latency/loss sliders, hop animation, counts
- [x] 8 era themes (intro/arpanet/amber/web90/2000s/mobile/modern/future)
- [x] App smoke tests + ArpanetScene component tests (4 tests)
- [x] README.md, docs/SOURCES.md (ARPANET claims A1–A6 + access notes),
      docs/DEVELOPMENT_LOG.md
- [x] `prefers-reduced-motion` respected in CSS + JS paths

## Current Work

Phase 1 (ARPANET era) was just completed and gated (build + 13/13 tests).
Immediate remaining item when this checkpoint was being written: finalizing
this file + first git commit.

## Next Actions (prioritized)

1. **Commit** current state (checkpoint, docs, all src).
2. **Phase 2 — Dial-up / BBS era** (`src/eras/dialup/` +
   `src/simulations/bbs/`):
   - modem state machine (dialing → carrier → handshake → 2400/9600
     connect) using existing `sound.modemDial()/modemHandshake()`;
     activity LEDs; keep waits short (< ~6s total).
   - BBS simulation: login prompt → main menu → boards/files/userlist/chat
     (pure state machine + tests, rendering separate).
   - Terminal sim (ping/traceroute/telnet/ftp/finger/whois) as educational
     local output.
   - Mark `dialup` built in `src/app/eraRegistry.ts` (`BUILT` set + scenes
     map) once gated.
3. **Phase 3 — Early Web**: CERN narrative (verify dates per SOURCES.md
   TODOs first!), WorldWideWeb/Mosaic/Netscape-inspired browser frames
   (label as inspired recreations), GeoCities-style personal homepage.
4. Later eras per plan; each phase ends at build+test green + checkpoint.

## Known Issues

- **Historical-source gaps (SOURCES.md TODOs)**: Internet Society pages
  403'd and CHM Kleinrock oral-history URL 404'd during verification. The
  "LO"/LOGIN story and exact per-node dates (SRI 30 Sep / UCLA 29 Oct /
  UCSB 16 Nov / Utah 15 Dec 1969) are NOT asserted with exact dates in UI
  copy — re-verify against a stable CHM/Internet Society URL before adding
  exact dates anywhere.
- `npm install` on npm 11 printed an "install-scripts ... allowScripts"
  warning for esbuild postinstall; build works (esbuild ships platform
  binaries via optional deps). If a future machine's build fails with an
  esbuild/rollup binary error, run `npm rebuild esbuild rollup` or approve
  the scripts.
- Terminal capture in this environment is flaky (shell-integration
  heuristics); when command output looks garbled, redirect to a tmp file
  and read it, and re-verify side effects (node_modules, .git) explicitly.
- Canvas + SVG visuals are NOT covered by tests (jsdom has no canvas
  backend); visual pass on a real browser is still owed for the ARPANET
  map (packet trails, node button alignment at all viewports).
- `TypewriterText` fires `onDone` with a slightly odd guard
  (`Math.floor(t/16) > 0`) — works, but clean it if you touch that file.
- No CI configured (no repo remote). `npm run build` + `npm test` are the
  manual gates.

## Important Files

Read in this order to resume:

1. `AI_CHECKPOINT.md` — this file
2. `src/app/eraRegistry.ts` — where eras become playable (BUILT set + scenes map)
3. `src/data/eraList.ts` — ordered eras + themes
4. `src/eras/arpanet/ArpanetScene.tsx` — the reference "built era" composition
5. `src/simulations/arpanet/useArpanetSim.ts` — reference sim-state pattern
6. `src/simulations/packet-routing/routingEngine.ts` (+ `.test.ts`) — pure-logic pattern
7. `src/audio/SoundManager.ts` — sound API for new eras
8. `src/styles/themes.css` + `src/styles/eras/arpanet.css` — theming pattern
9. `docs/SOURCES.md` — MUST update before adding historical copy

## Important Decisions

- **One central timeline state** (store in `src/app/timelineStore.ts`), not
  per-era state. Era components own only local sim state.
- **Era registry is the only data→component coupling point**; a new era =
  row in `eraList.ts` + entry in registry `scenes` + (if built) add to
  `BUILT`.
- **All sound synthesized via Web Audio API** — no audio files, ever.
  No autoplay. Mute persists in localStorage (`itt.sound.muted`).
- **Canvas 2D (not WebGL)** for network maps; aggregate rendering, never
  literal billions of objects.
- **Sim logic is pure + RNG-injectable** so it is unit-testable without DOM.
- **History policy**: no invented facts; attribute uncertain claims;
  simulations labeled "simplified"; SOURCES.md entry required for new copy.
- **File discipline**: source files < ~400 lines; split data/logic/render.
- **Reduced motion**: `useReducedMotion()` + CSS media query — every
  animation must have a static fallback.
- React 18 chosen by the user (not React 19). Keep it unless user says
  otherwise.

## Recent Changes

(2026-09-16)
- Built Phase 0 foundation + Phase 1 ARPANET exhibit from scratch.
- Fixed `eraRegistry` missing `status` field (added BUILT-derived status).
- Fixed ArpanetScene relative import paths (`../../` for sims/styles).
- routingEngine: zero jitter no longer consumes an RNG roll
  (deterministic-when-asked); test adjusted to match.
- App test: `getAllByText` (ARPANET appears in nav + intro copy).
- ArpanetScene test: exact-name query for POWER ON (aria-labels contain
  the phrase too).

## Testing Status

- **Gated green**: `npm run build` (tsc -b + vite build) and `npm test`
  (13/13: 9 routingEngine unit tests, 2 App smoke tests, 2 ArpanetScene
  component tests).
- **Unverified**: real-browser visuals (canvas trails, node button
  alignment, SVG hop animation), audio output (synthesized tones untested
  on hardware), mobile layout pass, reduced-motion live behavior.

## Commands

```bash
npm install        # setup (already done in this workspace)
npm run dev        # dev server
npm run build      # GATE: type-check + production build
npm test           # GATE: vitest (13 tests expected)
npm run preview    # serve dist/
```

## Immediate Resume Instructions

1. If not committed yet: `git add -A && git commit -m "Phase 0+1:
   foundation + ARPANET era (build+tests green)"`.
2. Begin Phase 2 (Dial-up / BBS era). Create:
   - `src/simulations/bbs/bbsEngine.ts` (pure menu state machine) + tests
   - `src/simulations/bbs/BbsSim.tsx` (terminal rendering)
   - `src/simulations/dialup/useDialupSim.ts` (modem state machine using
     `sound.modemDial()/modemHandshake()`)
   - `src/eras/dialup/DialupScene.tsx` + `src/styles/eras/dialup.css`
     (amber theme already exists: `.theme-amber`)
   - Add `dialup` to the registry `BUILT` set + `scenes` map in
     `src/app/eraRegistry.ts` once gated.
3. Gate before moving on: `npm run build` + `npm test` green, then update
   this checkpoint + `docs/DEVELOPMENT_LOG.md` + `docs/SOURCES.md` (verify
   BBS/dial-up era claims before writing copy — see SOURCES.md "Other eras").
