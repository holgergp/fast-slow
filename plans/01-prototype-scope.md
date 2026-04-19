# Prototype Scope (current)

**Goal:** prove that "slow hero vs. fast world" is compelling for ~60 seconds of play. Nothing else.

## In scope
### Hero
- 8-directional movement at ~70 px/s (intentionally slow)
- 3 HP
- One attack: ~450ms wind-up → ~150ms active hitbox → ~300ms recovery. Full animation commitment, no cancel.
- One dodge: ~200ms dash with i-frames, ~400ms recovery
- Facing tracked from last movement direction (used for swing direction)

### Enemy
- ONE type: fast melee rusher (~160 px/s, ~2.3× hero)
- States: chase → telegraph (flashes yellow ~550ms) → lunge (fast burst ~520 px/s for 250ms) → recovery
- Dies in one hit

### Arena
- Single square room, no obstacles
- Wave-based: count scales (1 → 2 → 3 …) until death

### Other
- HP display, wave counter
- Hit feedback (screen shake, knockback)
- Death screen + restart (R)

## Explicitly NOT in scope
- Art / sprites (colored rectangles only)
- Sound / music
- Menus, score, level progression
- Multiple enemy types, ranged enemies
- Multiple attacks / weapons
- Upgrades, meta-progression
- Mobile / touch controls

## Files
- `index.html` — shell, CDN load of Kaplay, control hints
- `game.js` — all game logic in one file (intentionally — easy to tune)

## Tuning knobs
All feel-defining constants live at the top of `game.js`:
`HERO_SPEED`, `HERO_DODGE_SPEED`, `HERO_DODGE_DURATION`, `HERO_DODGE_RECOVERY`,
`HERO_ATTACK_WINDUP`, `HERO_ATTACK_ACTIVE`, `HERO_ATTACK_RECOVERY`, `HERO_MAX_HP`,
`ENEMY_SPEED`, `ENEMY_LUNGE_SPEED`, `ENEMY_TELEGRAPH_TIME`, `ENEMY_LUNGE_TIME`,
`ENEMY_RECOVERY_TIME`, `ENEMY_LUNGE_TRIGGER_DIST`.

Tune one at a time. Play 2–3 rounds between changes.
