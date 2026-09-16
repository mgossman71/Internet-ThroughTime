# Internet Through Time — AI Development Checkpoint

_Last updated: 2026-09-16 (Phase 0 + Phase 1 + Docker Compose + Phase 2 "1971–1982 expansion" + Phase 3 "1983 protocol switch" + Phase 4 "dial-up/BBS" + Phase 5 "CERN & the Web (1989–1993)" + Phase 6 "Browsers & Personal Pages (1993–1996)" complete + Phase 6 follow-up: 1993 first-run guidance fix + Phase 6 restructure: three-chapter narrative + **Phase 6 REPLACED: "Linux, 1991–1996" (The Code Becomes a Commons)** + **Phase 7: "Portals, P2P & Search" (2000–2004)**)._

## Current Project State

Working React 18 + TypeScript + Vite 5 app. **Runs via Docker Compose**
(`docker compose up --build` → http://localhost:8080, verified healthy).
Build green (`tsc -b && vite build`), tests green (96/96, vitest + Testing Library).

Playable today:
- **Intro era** — prologue scene with typewriter lede + "Enter the Museum".
- **1969 ARPANET era (exhibit 01)** — four-node canvas map (SRI/UCLA/UCSB/
  UTAH) with node power-on, animated packet travel, operator console with
  terminal log, "replay the first message" scripted sequence (the standard
  LOGIN/"LO" account, clearly attributed), grounded fact list.
- **1971–1982 expansion era (exhibit 02)** — year stepper (1969→1982) +
  slider; named sites light up by documented year (BBN 1970, first TIP 1971,
  London + Norway 1973); aggregated population dots render the documented
  site counts (24/37/62/111 — never interpolated); milestone strip
  1970–1981 (past/future states); message send over the year-filtered
  topology (reuses `routingEngine`); "replay the decade" script.
- **1983 protocol switch era (exhibit 03)** — all 8 hosts start on NCP;
  per-host SWITCH (NCP→TCP/IP) or scripted FLAG DAY (Jan 1, 1983 sweep,
  P1); the catch: cross-protocol sends fail with PROTOCOL MISMATCH (P7);
  the straggler — one host keeps NCP by permission into mid-1983 (P4,
  illustrative stand-in) — must be switched to finish; MILNET splits off
  on flag day and appears as a live TCP/IP node (P5); NCP vs TCP/IP
  protocol desk (RFC 801 quotes, P2); milestone strip 1981 → mid-1983
  (past/active/future states).
- **Packet-routing exhibit** — SVG diamond topology (SOURCE → Router A/B →
  DESTINATION) with failover toggles, latency/loss sliders, hop-by-hop
  animation, teaching notes. Built on a pure, unit-tested routing engine.
- **Dial-up / BBS era (exhibit 04)** — pick a modem standard (V.22 1200 /
  V.22bis 2400 / V.32 9600 / V.32bis 14.4k), dial the board (ATDT + ring +
  handshake), log in, browse seeded ASCII messages, and post a reply
  (240-char limit); hang up and the board survives. Built on a pure,
  unit-tested `dialupEngine` (dial → carrier → login → menu → post) with
  synthesized modem sounds.
- **CERN & the Web era (exhibit 05, 1989–1993)** — pick a year: 1989
  (proposal stage, "NO WEB YET"), 1990 (first browser + server, project page
  only), 1991 (the first website is live — follow the links), 1993 (public
  domain — grab the free source). The WorldWideWeb browser's reach grows as
  the years pass; every claim is W-tagged (W1–W7) to `docs/SOURCES.md`.
  Built on a pure, unit-tested `cernwebEngine`.
- **Linux era (exhibit 06, 1991–1996)** — told in THREE CHAPTERS around
  one fork: CH 1 (1991) "A hobby, announced in a forum" — the
  comp.os.minix announcement in the kernel-mail terminal (visible with
  zero clicks; illustrative recreation built on the verified fragments
  "hobby operating system" and "free of all commercial interest", L1);
  CH 2 (1992) "The fork: open or closed" — RELEASE UNDER THE GNU GPL
  (history, L2) vs. KEEP IT CLOSED (a LABELED HYPOTHETICAL — real Linux
  went GPL); CH 3 (1996) "It runs the Web" — open branch: RECEIVE A
  PATCH → 0.12 → 1.0 (5 patches) → 2.0 (12 patches) + "where it runs"
  (web servers, TOP500, L5); closed branch: the story ends at 0.12
  (hypothetical). Skipping to 1996 undecided gets a recovery path back to
  the fork. A curator's closing card ("WHAT YOU SAW") ends the era. Every
  claim is L-tagged (L1–L5) to `docs/SOURCES.md`. Built on a pure,
  unit-tested `linuxEngine` (state tracks `chapter`, `branch` (locked
  once chosen; REVISE rescinds it), `contributors`, `versionIdx`).
- **Portals, P2P & Search era (exhibit 07, 2000–2004)** — told in THREE
  CHAPTERS around one fork, rendered in a period-style browser window:
  CH 1 (2000) "The Front Door" — the portal home page (visible with zero
  clicks: link grid, search box, blinking "NEW!" badge, hit counter — all
  labeled illustrative) + the portal-as-home-page claims (P1) + the
  dot-com bubble context (P2) + household adoption (P5); CH 2 (2001)
  "Files Move" — a P2P share queue (FIND TRACK, capped at 5) + the fork:
  HISTORY: THE RECORD LABELS WIN (Napster "shut down in July 2001",
  Roxio $5.3M subscription relaunch, P3; Kazaa appears — "Napster lasted
  just three years, Kazaa survived much longer", P4) vs. WHAT IF: THE
  COURTS SIDE WITH NAPSTER (a LABELED HYPOTHETICAL — the queue keeps
  growing); CH 3 (2004) "Meaning & Mail" — RUN SEARCH (capped at 4,
  illustrative results) + Google IPO story (P6) + webmail: Hotmail 1996
  (P8) → Gmail 2004, 1 GB (P7). Skipping to 2004 undecided gets a
  recovery path back to the fork (or a quick call). A closing card ("WHAT
  YOU SAW") + START OVER. Every claim is P-tagged (P1–P8) to
  `docs/SOURCES.md`. Built on a pure, unit-tested `portalEngine` (state
  tracks `chapter`, `branch` (locked once chosen; REVISE rescinds it),
  `queue`, `searches`, `mailRead`).
- All other 5 eras render a styled "UNDER CONSTRUCTION" placeholder so the
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
- [x] Expansion 1971–1982 era (exhibit 02): expansionData + growthEngine
      (pure, 6 unit tests) + useExpansionSim + canvas growth map (aggregated
      population dots, ghost future nodes) + operator panel + scene (3 tests)
- [x] RoutingSim: failover, latency/loss sliders, hop animation, counts
- [x] 8 era themes (intro/arpanet/amber/web90/2000s/mobile/modern/future)
- [x] App smoke tests + ArpanetScene component tests (4 tests)
- [x] **Docker Compose**: multi-stage Dockerfile (node:22-alpine build →
      nginx:1.27-alpine serve, healthcheck), docker-compose.yml (`web` +
      optional `dev` profile with Vite HMR), nginx.conf (SPA fallback,
      gzip, immutable asset caching), .dockerignore — verified: build,
      up, curl root/assets 200, status healthy
- [x] README.md, docs/SOURCES.md (ARPANET claims A1–A6 + access notes),
      docs/DEVELOPMENT_LOG.md
- [x] `prefers-reduced-motion` respected in CSS + JS paths

## Current Work

Exhibit 07 is now the **Portals, P2P & Search** era (2000–2004):
three chapters (2000 front door → 2001 Napster fork → 2004 search + mail)
rendered in a period-style browser window, with the slot in `eraList.ts`
(`portal2000s`, 2000–2004, theme-2000s) wired to the real scene in
`eraRegistry.ts` (BUILT). New files: `src/simulations/portal2000s/`
(portalData, portalEngine + 10 unit tests, usePortalSim, PortalBrowser)
and `src/eras/portal2000s/` (PortalScene + 6 component tests) +
`src/styles/eras/portal2000s.css`. Claims verified 2026-09-16 →
`docs/SOURCES.md` §P (P1–P8); the "WHAT IF: the courts side with Napster"
branch is a LABELED HYPOTHETICAL (real Napster was shut down July 2001,
P3); all browser chrome (portal page, share queue, mock search results,
inbox) is a LABELED ILLUSTRATIVE recreation (scene footnote). Gates all
green: `tsc --noEmit`, `vite build`, `npm test` (96/96).

## Next Actions (prioritized)

1. ~~**Commit** current state (Phase 6 files, docs, registry).~~ — done.
2. ~~**Phase 7 — 2000s portal era** (`portal2000s`)~~ — done (exhibit 07,
   2000–2004, three chapters + Napster fork; claims P1–P8 in SOURCES.md;
   named services/pages are ILLUSTRATIVE recreations, labeled as such).
3. **Phase 8 — broadband2000s** (`broadband2000s`, 2005–2009, next in
   `eraList.ts` order, "Broadband & the Open Web"): Wikipedia, YouTube,
   and a network for everyone — verify dates/claims first → new section in
   SOURCES.md ("Other eras") before any UI copy; named services/pages are
   ILLUSTRATIVE recreations and must be labeled as such.
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
  map (packet trails, node button alignment at all viewports) and the
  expansion 1971–1982 growth map (population-dot field, ghost nodes).
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
- **Phase 6 restructure (three-chapter narrative, exhibit 06)**: the era is
  now TOLD — CH 1 (1993) "The Web you can see" / CH 2 (1994) "The Web you
  can own" / CH 3 (1996) "The Web they fought over" — replacing the old
  year-desk + browser-box + demo-toggle layout (the toggle was the recurring
  source of "looks like a bug" feedback). `earlywebData.ts`: `CHAPTERS`,
  `DOORWAYS`, `EPILOGUE`, `CLOSING`, rewritten `LEDE`; removed `YEARS`,
  `BROWSERS`, `BROWSERS_IN_YEAR`, `HINTS`. `earlywebEngine.ts`: `doorway:
  'netscape' | 'ie'` + `setDoorway` (2 new unit tests) replacing
  `browser`/`setBrowser`. New `ImageComparison.tsx` (static side-by-side,
  reuses `DemoImage`); `GeoCitiesPage.tsx` ("YOUR PAGE" label, doorway
  chrome, war note E7, "← Back to Chapter 2" recovery CTA);
  `PageBuilder.tsx` (browser box + locked state removed);
  `EarlyWebScene.tsx` (chapter stepper + per-chapter composition + closing
  curator card); `earlyweb.css` (comparison/stepper/doorway/closing styles,
  dead rules removed); `EarlyWebScene.test.tsx` rewritten as 5 tests around
  the visitor arc. Gates: build green, 77/77 tests green, headless-Chrome
  walkthrough of all three chapters — zero console/page errors.
- **Phase 6 follow-up 2 — 1993–1996 E2 demo rework (exhibit 06)**:
  feedback "this box always says …and the image sits RIGHT HERE" — the
  inline-image demo (lone 🖼 emoji + museum-label sentences inside the fake
  browser) read as a broken page. Rebuilt as the SAME mini 1993 page
  rendered two ways: new original-SVG `DemoImage.tsx` (globe on a stand;
  no external/copyrighted assets) — Mosaic state: image inline between the
  paragraphs; pre-Mosaic: dotted placeholder in the text + the same image
  in a small separate window. `GeoCitiesPage.tsx` rework; `HINTS` demo
  copy split into `demoInline`/`inlineNext` + `demoPre`/`preNext`;
  `earlyweb.css` gains `.ew-fakepage`/`.ew-fp-*`/`.ew-img-ph`/
  `.ew-imgwin*`/`.ew-demo-caption` (dead `.ew-img*` rules removed); the
  demo test now asserts the E2 caption swap. Gates: build green, 78/78
  tests green, live headless re-check of both states (zero errors).
- **Phase 6 follow-up — 1993 first-run guidance fix (exhibit 06)**:
  reporter feedback "I select boxes under PAGE BUILDER and nothing happens"
  traced to the 1993 opening state being a discoverability dead end (builder
  locked by design, pre-Mosaic box already selected, no pointer to the
  next step) — engine/tests were correct all along. Added `HINTS` copy
  constants to `earlywebData.ts`; `PageBuilder.tsx` locked state now shows
  the 🔒 note + "⏩ Fast-forward to 1994" button (existing
  `sim.setYear(1994)`, no engine change) and a step-by-step subtitle;
  `GeoCitiesPage.tsx` gets next-step hints under both image-demo states and
  a "⏩ Jump to 1994" button in the no-page panel; `earlyweb.css` gains
  `.ew-cta` / `.ew-locked-row` / `.ew-demo-hint`. Two new component tests
  (fast-forward flow + demo-state hints) in `EarlyWebScene.test.tsx`.
  Gates: build green, 78/78 tests green.
- **Phase 6 — Browsers & Personal Pages era (exhibit 06, 1993–1996)**:
  `src/simulations/earlyweb/` (earlywebData, earlywebEngine + 12 unit tests,
  useEarlywebSim, PageBuilder, GeoCitiesPage),
  `src/eras/early-web/EarlyWebScene.tsx` + 4 component tests,
  `src/styles/eras/earlyweb.css`, `early-web` moved to `BUILT` in
  `src/app/eraRegistry.ts`, SOURCES.md E1–E8 section (verified 2026-09-16;
  Mosaic inline-images is the defining feature and it was NOT the first
  browser, E2; GeoCities six original neighborhoods, E5; Netscape 15 Dec
  1994 + the Windows-bundling "monopolistic and illegal" ruling, E8;
  assembled page is an ILLUSTRATIVE recreation — labeled in the footnote),
  README row flipped. Gates: build green, 76/76 tests green.
- **Phase 5 — CERN & the Web era (exhibit 05, 1989–1993)**:
  `src/simulations/cernweb/` (cernwebData, cernwebEngine + 9 unit tests,
  useCernwebSim, BrowserWindow), `src/eras/cern-web/CernWebScene.tsx` +
  4 component tests, `src/styles/eras/cernweb.css`, `cern-web` moved to
  `BUILT` in `src/app/eraRegistry.ts`, SOURCES.md W1–W7 section (verified
  2026-09-16; 1990 browser attributed to CERN not W3C, "second half of
  1990" not the popular 30 April 1990 date; browser pages are an
  ILLUSTRATIVE recreation of info.cern.ch — labeled in the footnote),
  README row flipped. Gates: build green, 60/60 tests green.
- **Phase 4 — dial-up / BBS era (exhibit 04)**:
  `src/simulations/dialup/` (dialupData, dialupEngine + 9 unit tests,
  useDialupSim, BbsTerminal), `src/eras/dialup/DialupScene.tsx` +
  4 component tests, `src/styles/eras/dialup.css`, `dialup` moved to
  `BUILT` in `src/app/eraRegistry.ts`, SOURCES.md D1–D7 section (verified
  2026-09-16; V.22 = 1200 bit/s, 2400 = V.22bis), README row flipped.
- **Phase 3 — 1983 protocol switch era (exhibit 03)**:
  `src/simulations/protocol1983/` (protocolData, switchEngine + 8 unit
  tests, useProtocolSim, ProtocolMap, ProtocolPanel),
  `src/eras/tcpip1983/Tcpip1983Scene.tsx` + 4 component tests,
  `src/styles/eras/tcpip1983.css`, `tcpip1983` moved to `BUILT` in
  `src/app/eraRegistry.ts`, SOURCES.md P1–P7 section (verified
  2026-09-16; RFC 801 primary) + A6 correction (RFC 1009 is not NCP),
  README row flipped. Gates: build green, 34/34 tests green.
- **Phase 2 — 1971–1982 expansion era (exhibit 02)**:
  `src/simulations/expansion70s/` (expansionData, growthEngine + 6 unit
  tests, useExpansionSim, ExpansionMap, ExpansionPanel),
  `src/eras/expansion70s/Expansion70sScene.tsx` + 3 component tests,
  `src/styles/eras/expansion70s.css`, `expansion70s` moved to `BUILT` in
  `src/app/eraRegistry.ts`, SOURCES.md E1–E10 section (verified 2026-09-16;
  1980s IMP counts + Copenhagen intentionally omitted), README row flipped.
  Gates: build green, 22/22 tests green.
- **Docker Compose support**: Dockerfile (multi-stage), docker-compose.yml
  (web + dev profile), nginx.conf, .dockerignore. Verified end-to-end:
  image build, container healthy, HTTP 200 for page/JS/CSS/SPA fallback.
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
  (96/96: 9 routingEngine unit tests, 6 growthEngine unit tests, 8
  switchEngine unit tests, 9 dialupEngine unit tests, 9 cernwebEngine unit
  tests, 14 linuxEngine unit tests, 10 portalEngine unit tests, 2 App smoke
  tests, 2 ArpanetScene component tests, 3 Expansion70sScene component
  tests, 4 Tcpip1983Scene component tests, 4 DialupScene component tests,
  4 CernWebScene component tests, 6 LinuxScene component tests covering
  the three-chapter visitor arc (1991 announcement with zero clicks, 1992
  fork decision both branches, 1996 open-branch patch→release arc +
  closed-branch what-if, skip-ahead recovery path, closing cards), 6
  PortalScene component tests covering the three-chapter visitor arc
  (2000 portal with zero clicks, 2001 fork both branches + queue cap +
  Kazaa beat, 2004 search + mail arc, skip-ahead recovery, closing cards)).
- **Unverified**: real-browser visuals (canvas trails, node button
  alignment, SVG hop animation, expansion growth map: population dots +
  ghost nodes at all viewports, 1983 flag-day sweep: NCP→TCP/IP colors,
  MILNET ghost→lit, straggler red flag, BBS terminal: dial sequence
  pacing + cursor blink + auto-scroll, linux90s: terminal auto-scroll +
  cursor blink + fork/patch panels), audio output (synthesized tones
  untested on hardware, incl. modemDial/modemHandshake), mobile layout
  pass, reduced-motion live behavior.

## Commands

```bash
# Docker (canonical)
docker compose up --build          # production → http://localhost:8080
docker compose --profile dev up    # Vite HMR in container → http://localhost:5173
docker compose down                # teardown
docker compose ps                  # health (web should be "healthy")

# Native dev
npm install        # setup (already done in this workspace)
npm run dev        # dev server
npm run build      # GATE: type-check + production build
npm test           # GATE: vitest (96 tests expected)
npm run preview    # serve dist/
```

## Immediate Resume Instructions

1. Committed (Exhibit 07: Portals, P2P & Search, 2000–2004 — three-chapter
   portal narrative + Napster fork — build+tests green (96/96)).
2. Begin Phase 8 (broadband/open-web era, `broadband2000s`, 2005–2009).
   Follow the established pattern:
   - Verify every claim → new section in `docs/SOURCES.md` (numbered tags)
     BEFORE writing any UI copy (see SOURCES.md "Other eras").
   - `src/simulations/<name>/` — pure data + pure logic (RNG/state injectable)
     + `.test.ts` (≥6 unit tests) + `use<Name>Sim.ts` hook + component(s).
   - `src/eras/<id>/<Scene>.tsx` + component tests (≥3, incl. one full user
     arc); `src/styles/eras/<era>.css` (theme `.theme-2000s` already exists).
   - Add the scene to the registry `scenes` map + `broadband2000s` to
     `BUILT` in `src/app/eraRegistry.ts` once gated.
3. Gate before moving on: `npm run build` + `npm test` green, then update
   this checkpoint + `docs/DEVELOPMENT_LOG.md` + `docs/SOURCES.md`.
