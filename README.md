# THE INTERNET THROUGH TIME

An interactive museum of computer networking history — from 1969 packet
switching through the ARPANET, dial-up BBS culture, the birth of the World
Wide Web, and on to modern global infrastructure and a clearly-marked
speculative future.

Visitors don't just read about the technology: they **operate simplified
simulations** of it — boot ARPANET nodes, send packets through a routing
diamond, (soon) dial a modem and log into a BBS.

## Status

| Era | Status |
| --- | --- |
| Intro (prologue) | ✅ built |
| 1969 ARPANET + packet-routing sim | ✅ built |
| 1971–1982 expansion | 🔜 coming soon |
| 1983 protocol switch | 🔜 coming soon |
| BBS & dial-up | 🔜 coming soon |
| CERN & the Web | 🔜 coming soon |
| Early web / GeoCities | 🔜 coming soon |
| 2000s → mobile → infrastructure → AI | 🔜 coming soon |
| Speculative future | 🔜 coming soon |

See `AI_CHECKPOINT.md` for the authoritative development state.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run build      # type-check (tsc -b) + production build → dist/
npm test           # run vitest suite (unit + component tests)
npm run preview    # serve the production build locally
```

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
