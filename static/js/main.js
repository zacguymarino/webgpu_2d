import { Engine } from "./engine.js";
import { Player } from "./game/player.js";
import { Background } from "./game/background.js";
import { EnemyManager } from "./game/enemyManager.js";
import { Camera } from "./camera.js";

const engine = new Engine();
const camera = new Camera(engine.gameBounds[0], engine.gameBounds[1]);
engine.initialize().then(() => {
    const player = new Player(engine.inputManager, engine.gameBounds[0], engine.gameBounds[1]);
    const background = new Background(engine.gameBounds[0], engine.gameBounds[1]);
    const enemyManager = new EnemyManager(engine.gameBounds[0], engine.gameBounds[1]);

    engine.onUpdate = (dt) => {
        player.update(dt);
        background.update(dt);
        enemyManager.update(dt);
    };

    engine.onDraw = (spriteRenderer, passEncoder) => {
        camera.update();
        spriteRenderer.framePass(passEncoder, camera);
        background.draw(engine.spriteRenderer);
        player.draw(engine.spriteRenderer);
        enemyManager.draw(engine.spriteRenderer);
    };

    engine.draw();
});
