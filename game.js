kaplay({
    width: 800,
    height: 600,
    background: [20, 20, 24],
    letterbox: true,
    global: true,
});

const HERO_SPEED = 70;
const HERO_DODGE_SPEED = 320;
const HERO_DODGE_DURATION = 0.2;
const HERO_DODGE_RECOVERY = 0.4;
const HERO_ATTACK_WINDUP = 0.45;
const HERO_ATTACK_ACTIVE = 0.15;
const HERO_ATTACK_RECOVERY = 0.3;
const HERO_MAX_HP = 3;

const ENEMY_SPEED = 160;
const ENEMY_LUNGE_SPEED = 520;
const ENEMY_TELEGRAPH_TIME = 0.55;
const ENEMY_LUNGE_TIME = 0.25;
const ENEMY_RECOVERY_TIME = 0.5;
const ENEMY_LUNGE_TRIGGER_DIST = 130;

scene("game", () => {
    const arenaPad = 20;
    add([
        rect(width() - arenaPad * 2, height() - arenaPad * 2),
        pos(arenaPad, arenaPad),
        color(30, 30, 36),
        outline(2, rgb(60, 60, 72)),
    ]);

    const hero = add([
        rect(28, 28),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(220, 220, 230),
        area(),
        health(HERO_MAX_HP),
        "hero",
        {
            facing: vec2(1, 0),
            state: "idle",
            stateTimer: 0,
            iframes: 0,
        },
    ]);

    const hpText = add([
        text(`HP: ${hero.hp()}`, { size: 20 }),
        pos(16, height() - 32),
        color(230, 90, 90),
    ]);

    const waveText = add([
        text("Wave 1", { size: 20 }),
        pos(width() - 120, height() - 32),
        color(200, 200, 210),
    ]);

    let wave = 1;
    let enemiesAlive = 0;

    function spawnWave(n) {
        waveText.text = `Wave ${wave}`;
        for (let i = 0; i < n; i++) {
            const edge = randi(4);
            let x, y;
            if (edge === 0) { x = rand(40, width() - 40); y = 40; }
            else if (edge === 1) { x = width() - 40; y = rand(40, height() - 40); }
            else if (edge === 2) { x = rand(40, width() - 40); y = height() - 40; }
            else { x = 40; y = rand(40, height() - 40); }
            spawnEnemy(vec2(x, y));
        }
    }

    function spawnEnemy(p) {
        enemiesAlive++;
        add([
            rect(22, 22),
            pos(p),
            anchor("center"),
            color(200, 70, 70),
            area(),
            "enemy",
            {
                state: "chase",
                stateTimer: 0,
                lungeDir: vec2(0, 0),
            },
        ]);
    }

    spawnWave(wave);

    onUpdate("hero", (h) => {
        if (h.iframes > 0) h.iframes -= dt();
        h.stateTimer -= dt();

        if (h.state === "idle") {
            const dir = vec2(0, 0);
            if (isKeyDown("a") || isKeyDown("left")) dir.x -= 1;
            if (isKeyDown("d") || isKeyDown("right")) dir.x += 1;
            if (isKeyDown("w") || isKeyDown("up")) dir.y -= 1;
            if (isKeyDown("s") || isKeyDown("down")) dir.y += 1;

            if (dir.x !== 0 || dir.y !== 0) {
                const n = dir.unit();
                h.facing = n;
                h.move(n.scale(HERO_SPEED));
            }
        } else if (h.state === "dodge") {
            h.move(h.facing.scale(HERO_DODGE_SPEED));
            if (h.stateTimer <= 0) {
                h.state = "dodgeRecovery";
                h.stateTimer = HERO_DODGE_RECOVERY;
                h.color = rgb(220, 220, 230);
            }
        } else if (h.state === "dodgeRecovery") {
            if (h.stateTimer <= 0) h.state = "idle";
        } else if (h.state === "windup") {
            h.color = rgb(255, 230, 140);
            if (h.stateTimer <= 0) {
                h.state = "swing";
                h.stateTimer = HERO_ATTACK_ACTIVE;
                spawnSwing(h);
            }
        } else if (h.state === "swing") {
            if (h.stateTimer <= 0) {
                h.state = "swingRecovery";
                h.stateTimer = HERO_ATTACK_RECOVERY;
                h.color = rgb(220, 220, 230);
            }
        } else if (h.state === "swingRecovery") {
            if (h.stateTimer <= 0) h.state = "idle";
        }

        h.pos.x = clamp(h.pos.x, 30, width() - 30);
        h.pos.y = clamp(h.pos.y, 30, height() - 30);
    });

    function spawnSwing(h) {
        const offset = h.facing.scale(28);
        const swing = add([
            rect(40, 40),
            pos(h.pos.add(offset)),
            anchor("center"),
            color(255, 240, 160),
            opacity(0.6),
            area(),
            lifespan(HERO_ATTACK_ACTIVE),
            "swing",
        ]);
        swing.onCollide("enemy", (e) => {
            addKaboom(e.pos);
            destroy(e);
            enemiesAlive--;
            if (enemiesAlive <= 0) {
                wait(0.8, () => {
                    wave++;
                    spawnWave(wave);
                });
            }
        });
    }

    onKeyPress("space", () => {
        if (hero.state === "idle") {
            hero.state = "windup";
            hero.stateTimer = HERO_ATTACK_WINDUP;
        }
    });

    onKeyPress("shift", () => {
        if (hero.state === "idle") {
            const dir = vec2(0, 0);
            if (isKeyDown("a") || isKeyDown("left")) dir.x -= 1;
            if (isKeyDown("d") || isKeyDown("right")) dir.x += 1;
            if (isKeyDown("w") || isKeyDown("up")) dir.y -= 1;
            if (isKeyDown("s") || isKeyDown("down")) dir.y += 1;
            if (dir.x !== 0 || dir.y !== 0) hero.facing = dir.unit();
            hero.state = "dodge";
            hero.stateTimer = HERO_DODGE_DURATION;
            hero.iframes = HERO_DODGE_DURATION;
            hero.color = rgb(120, 180, 255);
        }
    });

    onUpdate("enemy", (e) => {
        e.stateTimer -= dt();
        const toHero = hero.pos.sub(e.pos);
        const dist = toHero.len();

        if (e.state === "chase") {
            if (dist > 1) e.move(toHero.unit().scale(ENEMY_SPEED));
            if (dist < ENEMY_LUNGE_TRIGGER_DIST) {
                e.state = "telegraph";
                e.stateTimer = ENEMY_TELEGRAPH_TIME;
            }
        } else if (e.state === "telegraph") {
            const flash = Math.floor(e.stateTimer * 10) % 2 === 0;
            e.color = flash ? rgb(255, 230, 80) : rgb(200, 70, 70);
            if (e.stateTimer <= 0) {
                e.lungeDir = hero.pos.sub(e.pos).unit();
                e.state = "lunge";
                e.stateTimer = ENEMY_LUNGE_TIME;
                e.color = rgb(255, 120, 120);
            }
        } else if (e.state === "lunge") {
            e.move(e.lungeDir.scale(ENEMY_LUNGE_SPEED));
            if (e.stateTimer <= 0) {
                e.state = "recovery";
                e.stateTimer = ENEMY_RECOVERY_TIME;
                e.color = rgb(140, 60, 60);
            }
        } else if (e.state === "recovery") {
            if (e.stateTimer <= 0) {
                e.state = "chase";
                e.color = rgb(200, 70, 70);
            }
        }
    });

    onCollide("hero", "enemy", (h, e) => {
        if (h.iframes > 0) return;
        h.hurt(1);
        h.iframes = 0.8;
        hpText.text = `HP: ${h.hp()}`;
        shake(8);
        const knock = h.pos.sub(e.pos).unit().scale(80);
        h.pos = h.pos.add(knock);
    });

    hero.onDeath(() => {
        add([
            text("you died", { size: 48 }),
            pos(width() / 2, height() / 2 - 20),
            anchor("center"),
            color(230, 90, 90),
        ]);
        add([
            text("press R to restart", { size: 18 }),
            pos(width() / 2, height() / 2 + 30),
            anchor("center"),
            color(200, 200, 210),
        ]);
        hero.paused = true;
        get("enemy").forEach((e) => e.paused = true);
    });

    onKeyPress("r", () => go("game"));
});

go("game");
