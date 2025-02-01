import { Rect } from "../rect.js";
import { Content } from "../content.js";

export class Background {
    #drawRect;

    constructor(gameWidth, gameHeight) {
        this.#drawRect = new Rect(0, 0, gameWidth, gameHeight);
    }

    draw(spriteRenderer) {
        spriteRenderer.drawSprite(Content.backgroundTexture, this.#drawRect);
    }
}