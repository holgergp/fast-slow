# Next Steps

Ordered roughly by what should happen first. Don't do them all — only what actually improves the core feel.

## 1. Play and tune the current prototype
Before adding ANYTHING, play the existing prototype for a few sessions. Answer:
- Does dying feel fair? Does it feel overwhelming?
- Is the swing wind-up too long? Too short?
- Does the dodge feel like a reward or a chore?
- Does the enemy telegraph read clearly enough?

Expected tuning passes: adjust 1–2 constants at a time, play again. This is the most important step.

**Kill criterion:** if after honest tuning it still isn't fun, the core premise needs rethinking — don't paper over it with content.

## 2. Juice (only after tuning is close)
Small additions that disproportionately improve feel:
- Hit-stop: freeze the game for 2–3 frames on a successful hit
- Screen shake on enemy lunges near the hero (not just on damage)
- Slowdown/tween on the enemy telegraph (visually "winding up")
- Attack trail / arc visual for the swing
- Simple SFX (even placeholder beeps help a lot — Kaplay has `burp()` style helpers)

## 3. Second enemy type
Only once the first type feels great. Candidates that test different skills:
- **Ranged caster:** stands still, lobs a slow projectile. Forces movement during combat.
- **Shield brute:** blocks from the front, must be dodged around. Teaches the dodge's i-frame value.
Pick one. Don't add both at once.

## 4. Level / room variety
- A single non-square arena shape
- One or two obstacles (pillars) that block movement and line of sight
- This changes combat more than expected — good next test.

## 5. Mechanics ideas (deferred, pick at most one)
- **Focus / slow-mo meter:** builds when not hit, spend to slow the world briefly. Gives a pressure valve.
- **Heavy attack:** even longer wind-up, bigger hitbox / knockback. Tests whether the commitment curve is interesting.
- **Parry window:** early frames of swing deflect incoming attacks. Rewards reading enemy telegraphs.

## 6. If this ever moves past prototype
- Art pass — 2D pixel art or simple vector shapes
- Sound design (probably the highest leverage single addition)
- 3D: the user's original vision was 3D. This is a port question, NOT a prototype question. If the 2D prototype proves the feel, switching engines (Godot / Unity) for a 3D version becomes a reasonable investment.

## What to NOT do next
- Don't add menus, scoring, save files, settings screens
- Don't refactor the single-file structure until it actually hurts
- Don't add art before the mechanics feel good
- Don't build a framework / engine abstraction — this is a prototype
