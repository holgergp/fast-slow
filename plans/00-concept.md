# fast-slow — Concept

## Core premise
The hero moves very slow. The world moves fast. The hero's inputs are muted and delayed — actions start immediately but take a long time to resolve (animation commitment, not input latency).

## Design pillars
- **Nightmarish, overwhelming feel.** The player should feel outnumbered and outpaced.
- **Souls DNA, turned up.** Stamina-style commitment to actions, deliberate movement, death as a teacher.
- **Fair despite overwhelming.** Every death should feel like "I could have read that," never "that was impossible."
- **Agency through tools.** I-frames on dodges, invincibility windows, HP cushion — ways to survive without breaking the fantasy.

## Key design decisions so far
- **Perspective:** 2D top-down (easier to prototype, no platforming physics, enemies can approach from any angle which amplifies overwhelm).
- **Delay model:** Animation commitment (long swings/recoveries) — NOT input latency. The first frustrates, the second creates dread and rewards planning.
- **Tech:** Kaplay (JS) loaded from CDN. No build step. Plain `index.html` + `game.js`.

## Open design questions (not yet decided)
- Should there be a dedicated slow-mo / focus resource to give the player a pressure-release valve?
- How aggressive should telegraphs be? Very long tells feel fair but can look silly. Too short is unfair given the hero's speed.
- Ranged enemies — they'd change the game significantly (forcing movement even when not in melee range). Deferred.
- Meta-progression (upgrades between runs) vs. pure arcade. Deferred.
