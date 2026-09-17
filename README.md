# THE INTERNET THROUGH TIME

An interactive museum of computer networking history — from 1969 packet
switching through the ARPANET, dial-up BBS culture, the birth of the World
Wide Web, and on to modern global infrastructure and a clearly-marked
speculative future.

Visitors don't just read about the technology: they **operate simplified
simulations** of it — boot ARPANET nodes, send packets through a routing
diamond, dial a modem and log into a BBS, and step through the years that
brought the World Wide Web into being.

## Status

| Era | Status |
| --- | --- |
| Intro (prologue) | ✅ built |
| 1969 ARPANET + packet-routing sim | ✅ built |
| 1971–1982 expansion | ✅ built |
| 1983 protocol switch | ✅ built |
| BBS & dial-up | ✅ built |
| CERN & the Web (1989–1993) | ✅ built |
| Linux, 1991–1996 | ✅ built |
| Portals, broadband, mobile, connected, AI (2000 → 2026) | ✅ built |
| Speculative future (The Road Ahead, beyond 2026) | ✅ built |

See `AI_CHECKPOINT.md` for the authoritative development state.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # type-check (tsc -b) + production build → dist/
npm test           # run vitest suite (unit + component tests)
npm run preview    # serve the production build locally
```

## Docker Compose

The canonical way to run the site is Docker Compose:

```bash
docker compose up --build      # production: build + nginx → http://localhost:8080
docker compose --profile dev up   # dev: Vite hot-reload in a container → http://localhost:5173
docker compose down            # teardown
docker compose ps              # health status (web should be "healthy")
```

- Production image: multi-stage `Dockerfile` (Node 22 builds, nginx:1.27-alpine
  serves), SPA fallback, gzip, immutable caching for hashed assets.
- The `dev` profile bind-mounts `src/` and runs Vite with HMR; a named
  volume keeps `node_modules` inside Docker.
- `.dockerignore` keeps the build context lean (no `node_modules`/`dist`/`.git`).

## Stack

- React 18 + TypeScript + Vite 5
- Vitest + Testing Library (jsdom)
- Plain CSS with per-era theme tokens (no CSS framework)
- Web Audio API — **all sound is synthesized**, no audio files, no
  copyrighted recordings; sound is off by default and never autoplays
- Canvas 2D for the ARPANET map, SVG for the routing diagram

## Structure

```
src/
  app/            timeline store, era registry, React bindings
  audio/          Web Audio SoundManager (synthesized era sounds)
  components/     shell, nav, sound toggle, typewriter, placeholder
  data/           pure data (era list)
  eras/<id>/      era scenes (intro, arpanet, …)
  simulations/    arpanet/, packet-routing/, … (logic split from rendering)
  hooks/          useRaf, useReducedMotion, useLocalStorage
  styles/         base.css, themes.css, eras/<era>.css
  types/          shared types
docs/
  SOURCES.md              historical claims → sources (required for new copy)
  DEVELOPMENT_LOG.md      dated work journal
AI_CHECKPOINT.md          AI handoff document — READ THIS FIRST
```

## Project rules (for humans and AI agents)

1. **History policy**: no invented facts. New historical claims require a
   `docs/SOURCES.md` entry. Uncertain claims are attributed ("the standard
   account…"). Simulations are labeled as simplified.
2. **File size**: keep source files under ~400 lines; split logic/data/render.
3. **Motion**: honor `prefers-reduced-motion` (see `useReducedMotion`).
4. **Sound**: never autoplay; everything synthesized via `SoundManager`.
5. **Checkpoint**: update `AI_CHECKPOINT.md` at every significant change.
