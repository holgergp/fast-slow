# fast-slow

A browser prototype for a top-down action game where the **hero moves slow and the world moves fast**. Attacks commit to long animations, enemies strike in quick bursts. Souls-style overwhelm.

## Play

Open `index.html` in a browser. No build step, no install.

Or play the deployed version on GitHub Pages (see below).

## Controls

- **WASD** — move
- **SPACE** — attack (long wind-up, full commitment)
- **SHIFT** — dodge (i-frames during the dash)
- **R** — restart after death

## Stack

- [Kaplay](https://kaplayjs.com/) loaded from CDN
- Plain HTML + a single JS file — no build tooling

All feel-defining constants (speeds, wind-ups, telegraphs) live at the top of `game.js`.

## Project layout

```
index.html                     # loads Kaplay, shows controls
game.js                        # all game logic
plans/                         # design notes
.github/workflows/deploy.yml   # GitHub Pages deploy
```

## Deploy

Pushes to `main` deploy to GitHub Pages automatically via `.github/workflows/deploy.yml`. Only `index.html` and `game.js` are published — `plans/` and other files stay out of the site.

## Design notes

See [`plans/`](plans/) for the concept, current prototype scope, and next steps.
