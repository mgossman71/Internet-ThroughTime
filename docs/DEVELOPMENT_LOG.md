# Development Log

Short dated entries for significant work. Newest first.

## 2026-09-16 — Exhibit 06 REPLACED: Linux, 1991–1996 ("The Code Becomes a Commons")

**Decision (with user):** the 1993–1996 "Browsers & Personal Pages" era is
replaced by a 1991–1996 Linux era — a three-chapter narrative around the
GPL open/closed-source fork, the decision that made Linux Linux.

Design:
- **CH 1 (1991) "A hobby, announced in a forum"** — the comp.os.minix
  announcement in a kernel-mail terminal, visible with zero clicks; an
  illustrative recreation built only on the verified fragments "hobby
  operating system" and "free of all commercial interest" (L1).
- **CH 2 (1992) "The fork: open or closed"** — RELEASE UNDER THE GNU GPL
  (history, L2) vs. KEEP IT CLOSED (a LABELED HYPOTHETICAL — real Linux
  went GPL); the decision is locked once made, REVISE rescinds it.
- **CH 3 (1996) "It runs the Web"** — open branch: RECEIVE A PATCH →
  0.12 (L2) → 1.0 (5 patches, L3) → 2.0 (12 patches, SMP + 64-bit, L4) +
  "WHERE IT RUNS BY 1996" (web servers, TOP500, L5) + a 2026 present-day
  bookend; closed branch: the story ends at 0.12 (hypothetical).
- Skip-ahead recovery: a visitor in 1996 with no decision gets "THE FORK
  IS UNDECIDED" + a path back to chapter 2 (and may decide in place).
- Closing: curator card ("WHAT YOU SAW"), milestones (Jun 1991 → 2026),
  verified-facts list (L1–L5), SIMPLIFIED SIMULATION footnote (patch-mail
  is illustrative; the closed branch is hypothetical).

Changes:
- NEW `src/simulations/linux90s/`: `linuxData.ts` (chapters, branches,
  versions, runs, patch pool, milestones, facts), `linuxEngine.ts` (pure
  state machine: `chapter`, `branch` (locked), `contributors`,
  `versionIdx`, append-only terminal transcript; illegal actions are
  no-ops) + 14 unit tests, `useLinuxSim.ts` (state + sound),
  `LinuxTerminal.tsx` (transcript + chapter-specific action footer).
- NEW `src/eras/linux90s/LinuxScene.tsx` (+6 component tests) and
  `src/styles/eras/linux90s.css` (site tokens only: --fg/--fg-dim/--accent/
  --panel-border/--glow/--radius; `lx-` prefix).
- `eraList.ts`: `early-web` (1993–1996) → `linux90s` (1991–1996);
  `eraRegistry.ts`: import + `scenes` key + `BUILT` set.
- DELETED: `src/simulations/earlyweb/` (8 files),
  `src/eras/early-web/` (2 files), `src/styles/eras/earlyweb.css` — 17
  earlyweb tests removed.
- `docs/SOURCES.md`: §E (Browsers & Personal Pages, E1–E8) →
  §L (Linux, L1–L5, verified 2026-09-16, "deliberately omitted" list
  kept); README exhibit row; AI_CHECKPOINT current-state sections.

Gates: `tsc --noEmit` + `npm test` (80/80) + `npm run build` green
(see Testing Status in AI_CHECKPOINT.md).

## 2026-09-16 — Phase 6 restructure (three-chapter narrative, exhibit 06)

**Feedback pattern: visitors kept reading the 1993–1996 exhibit as broken or
half-rendered — the browser-box toggle read as a bug, 1996 looked empty, and
there was no takeaway.**

Diagnosis: the era was a control panel, not a story. Four competing panels
(year desk, browser box, builder, floating fake browser) each carried a slice
of the teaching, and the one stateful toggle (pre-Mosaic ⇄ Mosaic) was the
recurring source of "this looks like a bug" reports.

Fix — tell it in THREE CHAPTERS, one per year:
- **CH 1 (1993) "The Web you can see"** — the toggle is gone; the same
  mini page renders in a STATIC side-by-side comparison (image in a separate
  window vs. inline, E2/E3). The lesson is visible on load with zero state —
  it cannot be mistaken for a broken control.
- **CH 2 (1994) "The Web you can own"** — the GeoCities builder stays,
  reframed in chapter voice ("BUILD YOUR PAGE", "PICK YOUR STREET"); the
  page area is labeled "YOUR PAGE — Hollywood, street 108".
- **CH 3 (1996) "The Web they fought over"** — a doorway picker (Netscape
  Navigator vs. Internet Explorer, E8 quotes) re-renders the visitor's OWN
  page inside the chosen window chrome; a war note (E7) + the 1999 Yahoo!
  epilogue (E4) close the chapter.
- A curator's closing card ("WHAT YOU SAW" — 38M pages E7 + the window
  lesson) lands after the grid, before milestones/facts.

Changes:
- `earlywebData.ts`: `CHAPTERS` (kicker/title/story/takeaway/source),
  `DOORWAYS`, `EPILOGUE`, `CLOSING`, rewritten `LEDE`; removed `YEARS`,
  `BROWSERS`, `BROWSERS_IN_YEAR`, `HINTS`; footnote updated.
- `earlywebEngine.ts` + tests: `doorway` state + `setDoorway` action (2 new
  unit tests) replacing `browser`/`setBrowser` — the dead state is gone.
- `ImageComparison.tsx` (new, reuses `DemoImage`); `GeoCitiesPage.tsx`
  ("YOUR PAGE" label, doorway chrome, war note, "← Back to Chapter 2"
  recovery CTA); `PageBuilder.tsx` (browser box + locked state removed);
  `EarlyWebScene.tsx` (chapter stepper, per-chapter composition, closing
  card).
- `earlyweb.css`: comparison / stepper / doorway / closing styles added;
  dead rules removed (`.ew-browser-*`, `.ew-locked*`, `.ew-imagedemo`,
  `.ew-demo-*`, `.ew-fakepage`, `.ew-fp-title`).
- `EarlyWebScene.test.tsx`: rewritten as 5 tests around the three-chapter
  visitor arc (incl. the "skip straight to 1996" recovery path).

**Gates:** `npm test` 77/77 green; `npm run build` green
(dist CSS 42.45 kB / JS 251.17 kB); live headless-Chrome walkthrough of all
three chapters (incl. doorway swap + closing card) — zero console/page
errors.

## 2026-09-16 — Phase 6 follow-up 2 (E2 demo rework, exhibit 06)

**Feedback: "This looks like a bug on the page — this box always says 🖼
…and the image sits RIGHT HERE, inline with the text (E2)."**

Not a logic bug (the browser toggle is tested and was verified working in
both directions), but the demo's *presentation* read as a broken page: a
lone 🖼 emoji in a bordered box plus museum-label sentences, sitting inside
the fake 1993 browser.

Fix — show, don't tell. The demo now renders the SAME mini 1993 page two
ways:
- `src/simulations/earlyweb/DemoImage.tsx` (new): one ORIGINAL hand-drawn
  SVG (globe on a stand — the classic 1990s "the Web" picture) shared by
  BOTH states, so the only difference is where the image lives (no
  external/copyrighted assets, spec §5/§6).
- `GeoCitiesPage.tsx`: Mosaic state — the image inline between the
  paragraphs; pre-Mosaic state — a dotted "[ image — not shown here ]"
  slot in the text + the same image in a small separate window. One E2
  caption + one next-step hint per state (meta-text shrank from
  explanation to label).
- `earlywebData.ts`: `HINTS` demo copy split into `demoInline`/`inlineNext`
  and `demoPre`/`preNext` (E2/E4 tags kept).
- `earlyweb.css`: `.ew-fakepage`, `.ew-fp-title/.ew-fp-text/.ew-fp-img`,
  `.ew-img-ph`, `.ew-imgwin(-bar/-img)`, `.ew-demo-caption`; dead
  `.ew-img*` rules removed.
- `EarlyWebScene.test.tsx`: demo test now asserts the E2 caption swap
  (separate-window caption ⇄ inline caption + the 1994 fast-forward hint).

**Gates:** `npm test` 78/78 green; `npm run build` green
(dist CSS 40.63 kB / JS 250.22 kB); live headless-Chrome re-check of both
demo states — zero console/page errors.

## 2026-09-16 — Phase 6 follow-up (1993 first-run guidance, exhibit 06)

**Bug report: "1993–1996 does not appear to be working correctly — I select
boxes under PAGE BUILDER and nothing really happens."**

Diagnosis: not a code bug. The era opens in 1993 with the builder locked
(GeoCities launches Nov 1994 — correct history) and the pre-Mosaic browser
box already selected, so the only interactive feedback was the small
inline-vs-separate image demo. Clicking the already-selected box is a
no-op by design, and nothing pointed at the next step (pick 1994 on the
year desk). Engine + all 76 pre-existing tests were green; the issue was
first-run discoverability — the 1993 state reads as a broken/half-rendered
page.

Fix (presentation + copy only; `earlywebEngine` untouched):
- `earlywebData.ts` — new `HINTS` constants (builder subtitle locked/open,
  🔒 note, "⏩ Fast-forward to 1994", demo-state hints, "⏩ Jump to 1994"),
  all E-tagged.
- `PageBuilder.tsx` — step-by-step subtitle; locked state now offers the
  fast-forward button (existing `sim.setYear(1994)`).
- `GeoCitiesPage.tsx` — next-step hint under both image-demo states
  (pre-Mosaic → "flip to NCSA Mosaic"; inline → "fast-forward to 1994");
  "⏩ Jump to 1994" button in the 1993 no-page panel.
- `earlyweb.css` — `.ew-cta`, `.ew-locked-row`, `.ew-demo-hint` (existing
  theme tokens only).
- `EarlyWebScene.test.tsx` — +2 tests: fast-forward unlocks the builder
  (CTAs present in 1993, gone after); demo-state hint swap on Mosaic.

**Gates:** `npm test` 78/78 green; `npm run build` green
(dist CSS 39.92 kB / JS 248.31 kB).

## 2026-09-16 — Phase 6 (Browsers & Personal Pages era, exhibit 06)

**Exhibit 06 — "Browsers & Personal Pages" (1993–1996), replacing the placeholder:**
- History verified first (docs/SOURCES.md, new E1–E8 section, 2026-09-16):
  Mosaic released Jan 1993 / dev from Dec 1992 (E3), "first browser to
  display images inline with text instead of a separate window" — and NOT
  the first browser (E2); GeoCities started Nov 1994, free of charge (E4),
  six original neighborhoods (E5), mid-1995 free home pages / 2 MB (E6),
  "at least 38 million pages" (E7); Netscape released 15 Dec 1994, dominant
  1990s browser, "Microsoft bundled Internet Explorer with Windows" → ruled
  "monopolistic and illegal" (E8); GeoCities acquired by Yahoo! 28 Jan 1999
  (E4, beyond-era milestone). Deliberately omitted: specific real GeoCities
  page content (assembled page is an ILLUSTRATIVE recreation, labeled in the
  scene footnote), hit-counter values, browser-war share percentages.
- `src/simulations/earlyweb/earlywebData.ts` — pure data: YEARS (1993/1994/
  1996), BROWSERS (pre-Mosaic / Mosaic / Netscape) + BROWSERS_IN_YEAR, the
  six NEIGHBORHOODS (E5), the WIDGETS, MILESTONES (1992→1999), FACTS (E-tags),
  LEDE, FOOTNOTE.
- `src/simulations/earlyweb/earlywebEngine.ts` — pure reducer + `allows()`
  legality table: setYear, setBrowser (Netscape only 1994+; falls back to
  "pre" when moving to a year without it), pickNeighborhood (locked until
  1994; deterministic street number), toggleWidget, addGuest, addVisitor,
  resetPage. Illegal actions are no-ops (same convention as dialupEngine).
- `src/simulations/earlyweb/earlywebEngine.test.ts` — 12 unit tests (initial
  state, per-year legality, neighborhood/street assignment, widget toggle,
  guestbook, visitor counter, browser fallback, reset, append-only log).
- `src/simulations/earlyweb/useEarlywebSim.ts` — hook: state + synthesized
  ticks (uiTick / keyClick / relayClick / successChime). No timers.
- `src/simulations/earlyweb/PageBuilder.tsx` — left control panel: browser
  selector, GeoCities neighborhood picker (locked until 1994), widget
  toggles, "add visitor" hit-counter controls, guestbook sign-in.
- `src/simulations/earlyweb/GeoCitiesPage.tsx` — browser window: period
  chrome + URL bar, the inline-vs-separate-image demo (the E2 feature), and
  the assembled page (hit counter, marquee, under-construction, MIDI,
  "best viewed 800×600", guestbook) or a "no personal pages yet" state.
- `src/eras/early-web/EarlyWebScene.tsx` — era header, year desk + page
  builder (left) + browser window (right), milestone strip 1992→1999,
  verified facts (E-tags), footnote. `EarlyWebScene.test.tsx` — 4 component
  tests incl. the full 1993→1994 build arc and the inline-image demo.
- `src/styles/eras/earlyweb.css` — era styles (`ew-*`), incl. a marquee
  animation with a `prefers-reduced-motion` guard.
- `src/app/eraRegistry.ts` — `early-web: EarlyWebScene` + BUILT set.

**Gates:** `npm test` 76/76 green; `npm run build` green
(dist/assets/index-*.css 39.35 kB / js 247.35 kB).

## 2026-09-16 — Phase 5 (CERN & the Web era, exhibit 05)

**Exhibit 05 — "CERN & the Web" (1989–1993), replacing the placeholder:**
- History verified first (docs/SOURCES.md, new W1–W7 section, 2026-09-16):
  1989 proposal (W1), 1990 first browser/server WorldWideWeb on a NeXT at
  CERN, "second half of 1990" (W2 — NOT the popular "30 April 1990" date),
  1991 first website info.cern.ch + public in Aug 1991 (W3/W4), 1993
  public-domain release 30 April 1993 (W5), W3C formed 1994 as a
  beyond-era milestone (W6). Deliberately omitted: exact sub-page text of
  the first site (browser pages are an ILLUSTRATIVE recreation, labeled in
  the scene footnote).
- `src/simulations/cernweb/cernwebData.ts` — pure data: YEARS (1989/1990/
  1991/1993), PAGES (illustrative first-site pages), REACHABLE (per-year
  link reach), MILESTONES, FACTS, LEDE, FOOTNOTE.
- `src/simulations/cernweb/cernwebEngine.ts` — pure reducer:
  1989 (no browser) → 1990 (project page only) → 1991 (first site, links)
  → 1993 (public domain + one-shot download). Illegal actions are no-ops.
- `src/simulations/cernweb/cernwebEngine.test.ts` — 9 unit tests.
- `src/simulations/cernweb/useCernwebSim.ts` — hook: state, setYear /
  navigate / download (era-appropriate synthesized ticks).
- `src/simulations/cernweb/BrowserWindow.tsx` — WorldWideWeb window:
  title bar + URL bar + page body; links filtered to the current year's
  reach; "NO WEB YET" in 1989; PUBLIC DOMAIN stamp + save-the-source in
  1993.
- `src/eras/cern-web/CernWebScene.tsx` — year desk (left) + browser (right),
  milestone strip 1989→1994, verified facts (W-tags), footnote.
  `src/eras/cern-web/CernWebScene.test.tsx` — 4 component tests incl. the
  full 1990→1991→1993 arc.
- `src/styles/eras/cernweb.css` — era styles (year desk, browser,
  milestones, facts).
- `src/app/eraRegistry.ts` — `cern-web: CernWebScene` + BUILT set.

**Gates:** `npm test` 60/60 green; `npm run build` green
(dist/assets/index-*.css 30.83 kB / js 230.38 kB).

## 2026-09-16 — Phase 3 (1983 protocol switch era)

**Exhibit 03 — "The Great Protocol Switch" (1983), replacing the placeholder:**
- History verified first (docs/SOURCES.md, new P1–P7 section): Jan 1 1983
  mandatory NCP→TCP/IP flag day (Wikipedia NCP article; Google Jan 1 2013 +
  Telegraph Sep 2009 anniversary articles cited via it — both not directly
  fetchable, noted), RFC 801 quotes verbatim from rfc-editor.org (Nov 1981
  "NCP/TCP transition plan": "inadequate", 1973 origin, "Catenet",
  DoD-wide standards, "no later than 1 January 1982"), NCP simplex odd/even
  ports vs TCP duplex (Stevens via Wikipedia NCP), mid-1983 NCP stragglers
  "permitted as a special case" (DoD Network Newsletter 1983-06-17 via
  Wikipedia), MILNET split-off 1983 (Living Internet), NCP name origin
  (RFC 1000 / Postel IEN 11, quoted in Wikipedia NCP). **Corrected** the
  A6 note: RFC 1009 is "Requirements for Internet gateways" (1987), not an
  NCP spec. Deliberately NOT asserted: which sites were the stragglers
  (shown as an illustrative stand-in), flag-day order/timing, anniversary
  article texts.
- `src/simulations/protocol1983/`
  - `protocolData.ts` — 8 named hosts (continued from exhibit 02), MILNET
    node, simplified links (MILNET link post-flag-day), NCP/TCP/IP desk
    rows, 4 milestones (RFC 801 → flag day → MILNET → stragglers),
    grounded facts/lede/footnote copy.
  - `switchEngine.ts` — pure logic (initialState all-NCP; switchNode;
    flagDayComplete — all TCP/IP except the straggler + MILNET online,
    idempotent; canSend — same-protocol rule; counts; fullySwitched;
    edgesFor; milestoneStates).
  - `switchEngine.test.ts` — 8 unit tests.
  - `useProtocolSim.ts` — state, per-host switch, scripted FLAG DAY sweep
    (staggered per host, then exception + MILNET + birthday lines), send
    with PROTOCOL MISMATCH catch, packets in ref (60fps pattern).
  - `ProtocolMap.tsx` — canvas: NCP hosts dim, TCP/IP lit, straggler
    flagged red, MILNET ghost until it splits off, packet trails, HTML
    node buttons for accessibility.
  - `ProtocolPanel.tsx` — protocol desk (NCP/TCP/IP tally + FLAG DAY
    button + NCP vs TCP/IP table), host list with per-host SWITCH, send
    form (sent/delivered/failed), console log.
- `src/eras/tcpip1983/Tcpip1983Scene.tsx` (+ 4 component tests) — header,
  map + node file card, operator panel, milestone strip (past/active/
  future states), facts, simplified-simulation footnote.
- `src/styles/eras/tcpip1983.css` — new `.ps-*` styles (amber theme);
  reuses shared exhibit-01 classes (.panel, .node-list, .send-row,
  .log-terminal).
- `src/app/eraRegistry.ts` — `tcpip1983` moved to `BUILT`.
- README: 1983 row flipped to ✅ built.

**Gates:** `npm run build` green (tsc -b + vite), `npm test` 34/34 green.
**Owed:** real-browser visual pass of the flag-day sweep (canvas colors,
MILNET ghost → lit, node-button alignment) — jsdom cannot cover canvas.

## 2026-09-16 — Phase 2 (1971–1982 expansion era)

**Exhibit 02 — "A Network of Networks" (1971–1982), replacing the placeholder:**
- History verified first (docs/SOURCES.md, new E1–E10 section): documented
  site counts (24/1972, 37/1973, 62/1974, 111/March 1977 — Living Internet,
  corroborated by Wikipedia's ARPANET article), 1973 first international
  nodes (UCL + Norway's RRE), Sept 1971 first TIP, Tomlinson 1971 email/@,
  RFC 675 (Dec 1974) and RFC 791/792/793 (Sept 1981) from rfc-editor.org
  primaries, DCA operation from 1975. Deliberately NOT asserted: 1980s
  exact IMP counts, Copenhagen 1973, "happy accident" quote (logged under
  "Deliberately omitted").
- `src/simulations/expansion70s/`
  - `expansionData.ts` — 8 documented named sites (4×1969 + BBN 1970 +
    TIP#1 1971 + London/Norway 1973), simplified link topology, growth
    checkpoints, 8 milestones, grounded facts/lede/footnote copy.
  - `growthEngine.ts` — pure logic (graphAtYear, siteCountAt — holds last
    documented figure, never interpolates; milestone queries, clamping).
  - `growthEngine.test.ts` — 6 unit tests.
  - `useExpansionSim.ts` — year state, node selection, message send via
    shared `routingEngine.computeRoute` (year-filtered edges), "replay the
    decade" script, packets in ref (60fps pattern).
  - `ExpansionMap.tsx` — canvas: deterministic aggregated population dots
    (labeled illustrative), links, ghost "JOINS 19XX" future nodes,
    INTL tags, packet trails, HTML node buttons for accessibility.
  - `ExpansionPanel.tsx` — year stepper + slider, sites-on-record readout,
    node list with INSPECT, send form (from/to valid at current year),
    console log.
- `src/eras/expansion70s/Expansion70sScene.tsx` (+ 3 component tests) —
  header, map + node file card, operator panel, milestone strip (past/
  future states), facts, simplified-simulation footnote.
- `src/styles/eras/expansion70s.css` — new `.exp-*` styles; reuses shared
  exhibit-01 classes (.panel, .node-list, .send-row, .log-terminal).
- `src/app/eraRegistry.ts` — `expansion70s` moved to `BUILT`.
- README: 1971–1982 row flipped to ✅ built.

**Gates:** `npm run build` green (tsc -b + vite), `npm test` 22/22 green.
**Owed:** real-browser visual pass of the growth map (dot field, ghost
nodes, node-button alignment) — jsdom cannot cover canvas.

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

## 2026-09-16 — 1986–1994 BBS & dial-up era (exhibit 04)

Phase 4 complete. Claims verified first (SOURCES.md "BBS & dial-up"
section, D1–D7, from Wikipedia "Bulletin board system" + "Modem"; note the
`/wiki/BBS` URL is a disambiguation page). Notable verified correction:
**V.22 = 1,200 bit/s**; 2,400 bit/s is V.22bis (1984); V.32 9,600 (early
1990s) never established before V.32bis 14.4k (1992). CBBS: Christensen +
Suess (CACHE), online 16 Feb 1978. The BBS board/handles/messages in the
UI are an explicitly-labeled illustrative recreation (deliberately
omitted list in SOURCES.md).

- `src/simulations/dialup/dialupData.ts` — modem standards (V.22 /
  V.22bis / V.32 / V.32bis), seed board (illustrative), milestones 1978→1995,
  verified facts with D-tags, lede + simplified-simulation footnote.
- `src/simulations/dialup/dialupEngine.ts` — pure reducer:
  idle → dial → carrier → login → main/msgs/view/post → hangup, with an
  explicit `allows()` legality table (illegal actions are no-ops).
- `src/simulations/dialup/dialupEngine.test.ts` — 9 unit tests (select,
  dial rates per standard, one-shot login, browse, post, hangup + redial).
- `src/simulations/dialup/useDialupSim.ts` — hook: state, dial timing
  (RING_MS/LOGIN_MS), `sound.modemDial()` + `modemHandshake()`, timer
  cleanup.
- `src/simulations/dialup/BbsTerminal.tsx` — transcript screen
  (auto-scroll, blinking cursor while ringing), phase controls (DIAL /
  main menu / message list / post form / DIAL AGAIN).
- `src/eras/dialup/DialupScene.tsx` — era header, modem desk (4 standard
  cards), terminal, milestones strip (1978 CBBS → 1995 web), verified
  facts, footnote. `src/eras/dialup/DialupScene.test.tsx` — 4 component
  tests incl. a full real-timer session (dial→login→read→post→hangup).
- `src/styles/eras/dialup.css` — era styles (CRT screen, modem cards,
  reduced-motion cursor guard).
- `src/app/eraRegistry.ts` — `dialup: DialupScene` + BUILT set.

**Gates:** `npm test` 47/47 green; `npm run build` green
(dist/assets/index-*.css 26.33 kB / js 219.60 kB).

## 2026-09-16 — initial scaffold
- Repo initialized (git, main branch). Project approved: React 18 + TS +
  Vite, deep-first build order (ARPANET → dial-up/BBS → early web).
