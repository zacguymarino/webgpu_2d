import { Texture } from "../texture.js";
import { Rect } from "../rect.js";
import { SpriteRenderer } from "../spriteRenderer.js";
import { Content } from "../content.js";
import { vec2 } from "gl-matrix";


const PLAYER_SPEED = 0.25;

export class Player {
    //Setup sprite stuff
    #movementDirection = vec2.create();
    #drawRect;
    #sourceRect;
    #texture;
    #inputManager;
    #gameWidth;
    #gameHeight;

    constructor(inputManager, gameWidth, gameHeight) {
        const playerSprite = Content.sprites["playerShip1_blue"];
        this.#texture = playerSprite.texture;
        this.#sourceRect = playerSprite.sourceRect.copy();
        this.#drawRect = playerSprite.drawRect.copy();
        this.#inputManager = inputManager;
        this.#gameWidth = gameWidth;
        this.#gameHeight = gameHeight;
    }

    clampToBounds() {
        // x bounds
        if (this.#drawRect.x < 0) {
            this.#drawRect.x = 0;
        }
        else if (this.#drawRect.x + this.#drawRect.width > this.#gameWidth) {
            this.#drawRect.x = this.#gameWidth - this.#drawRect.width;
        }
        // y bounds
        if (this.#drawRect.y < 0) {
            this.#drawRect.y = 0;
        }
        else if (this.#drawRect.y + this.#drawRect.height > this.#gameHeight) {
            this.#drawRect.y = this.#gameHeight - this.#drawRect.height;
        }
    }

    update(dt) {
        this.#movementDirection[0] = 0;
        this.#movementDirection[1] = 0;

        // x direction
        if (this.#inputManager.isKeyDown("ArrowLeft")) {
            this.#movementDirection[0] = -1;
        }
        else if (this.#inputManager.isKeyDown("ArrowRight")) {
            this.#movementDirection[0] = 1;
        }
        // y direction
        if (this.#inputManager.isKeyDown("ArrowUp")) {
            this.#movementDirection[1] = -1;
        }
        else if (this.#inputManager.isKeyDown("ArrowDown")) {
            this.#movementDirection[1] = 1;
        }

        vec2.normalize(this.#movementDirection, this.#movementDirection);
        this.#drawRect.x += this.#movementDirection[0] * PLAYER_SPEED * dt;
        this.#drawRect.y += this.#movementDirection[1] * PLAYER_SPEED * dt;

        this.clampToBounds();
    }

    draw(spriteRenderer) {
        spriteRenderer.drawSpriteSource(this.#texture, this.#drawRect, this.#sourceRect);
    }
}