import { Rect } from "../rect.js";
import { Content } from "../content.js";

const BACKGROUND_SCROLL_SPEED = 0.25;

export class Background {
    #drawRect;
    #drawRect2;
    #gameHeight;
    #gameWidth;

    constructor(gameWidth, gameHeight) {
        this.#gameWidth = gameWidth;
        this.#gameHeight = gameHeight;
        this.#drawRect = new Rect(0, 0, gameWidth, gameHeight);
        this.#drawRect2 = new Rect(0, -gameHeight, gameWidth, gameHeight);
    }

    update(dt) {
        this.#drawRect.y += BACKGROUND_SCROLL_SPEED * dt;
        this.#drawRect2.y = this.#drawRect.y - this.#gameHeight;

        if (this.#drawRect.y > this.#gameHeight) {
            this.#drawRect.y = 0;
        }

    }

    draw(spriteRenderer) {
        spriteRenderer.drawSprite(Content.backgroundTexture, this.#drawRect);
        spriteRenderer.drawSprite(Content.backgroundTexture, this.#drawRect2);
    }
}