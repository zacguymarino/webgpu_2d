import { Engine } from "./engine.js";
import { Player } from "./playground/player.js";
import { Background } from "./playground/background.js";
import { EnemyManager } from "./game/enemyManager.js";
import { DynamicCamera } from "./dynamicCamera.js";

const engine = new Engine();
const camera = new DynamicCamera(engine.gameBounds[0], engine.gameBounds[1]);
engine.initialize().then(() => {
    const player = new Player(engine.inputManager, engine.gameBounds[0], engine.gameBounds[1]);
    const background = new Background(engine.gameBounds[0], engine.gameBounds[1]);
    const enemyManager = new EnemyManager(engine.gameBounds[0], engine.gameBounds[1]);

    engine.onUpdate = (dt) => {
        player.update(dt);
        enemyManager.update(dt);
    };

    engine.onDraw = (spriteRenderer, passEncoder) => {
        camera.update(player.getDrawRect().x, player.getDrawRect().y, player.getDrawRect().width/2, player.getDrawRect().height/2);
        spriteRenderer.framePass(passEncoder, camera);
        background.draw(engine.spriteRenderer);
        player.draw(engine.spriteRenderer);
        enemyManager.draw(engine.spriteRenderer);
    };

    engine.draw();
});
