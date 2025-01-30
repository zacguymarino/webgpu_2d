import { Content } from "../content.js";
import { vec2 } from "gl-matrix";

const METEOR_KEYS = [
    "meteorBrown_big1",
    "meteorBrown_big2",
    "meteorBrown_big3",
    "meteorBrown_big4",
    "meteorBrown_med1",
    "meteorBrown_med3",
    "meteorGrey_big1",
    "meteorGrey_big2",
    "meteorGrey_big3",
    "meteorGrey_big4",
    "meteorGrey_med1",
    "meteorGrey_med2",
];

const METEOR_MIN_SPEED = 0.05;
const METEOR_MAX_SPEED = 0.25;

export class MeteorEnemy {
    active = true;
    speed = 0;
    drawRect;
    #texture;
    #sourceRect;
    #rotation = 0;
    #rotationSpeed = 0;
    #rotationOrigin = vec2.fromValues(0.5, 0.5);

    constructor(gameWidth, gameHeight) {
        const key = METEOR_KEYS[Math.floor(Math.random() * METEOR_KEYS.length)];

        const meteorSprite = Content.sprites[key];
        this.#texture = meteorSprite.texture;
        this.#sourceRect = meteorSprite.sourceRect.copy();
        this.drawRect = meteorSprite.drawRect.copy();
        this.speed = Math.random() * (METEOR_MAX_SPEED - METEOR_MIN_SPEED) + METEOR_MIN_SPEED;
        this.#rotationSpeed = (Math.random() - 0.5) * 0.005;
    }

    update(dt) {
        this.drawRect.y += this.speed * dt;
        this.#rotation += this.#rotationSpeed * dt;
    };

    draw(spriteRenderer) {
        spriteRenderer.drawSpriteSource(this.#texture, this.drawRect, this.#sourceRect, undefined, this.#rotation, this.#rotationOrigin);
    };

}