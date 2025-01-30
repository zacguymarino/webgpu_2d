export class InputManager {
    #keyDown = {};

    constructor() {
        window.addEventListener("keydown", (e) => this.#keyDown[e.key] = true);
        window.addEventListener("keyup", (e) => this.#keyDown[e.key] = false);
    }

    isKeyDown(key) {
        return this.#keyDown[key];
    }

    isKeyUp(key) {
        return !this.#keyDown[key];
    }
}