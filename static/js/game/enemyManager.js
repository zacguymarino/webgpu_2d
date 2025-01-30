import { MeteorEnemy } from "./meteorEnemy";

const SPAWN_INTERVAL = 1000;

export class EnemyManager {
    #gameWidth;
    #gameHeight;
    #timeToSpawn = 0;
    #pool = [];

    constructor(gameWidth, gameHeight) {
        this.#gameHeight = gameHeight;
        this.#gameWidth = gameWidth;
    }

    spawnEnemy() {
        if (this.#timeToSpawn > SPAWN_INTERVAL) {
            this.#timeToSpawn = 0;
            let enemy = this.#pool.find(e => !e.active);

            if(!enemy) {
                enemy = new MeteorEnemy(this.#gameWidth, this.#gameHeight);
                this.#pool.push(enemy);
            }

            enemy.active = true;
            enemy.drawRect.x = Math.random() * (this.#gameWidth - enemy.drawRect.width);
            enemy.drawRect.y = -enemy.drawRect.height;
        }
    }

    update(dt) {
        this.#timeToSpawn += dt;
        this.spawnEnemy();

        for (const enemy of this.#pool) {
            if (enemy.active) {
                enemy.update(dt);

                if (enemy.drawRect.y > this.gameHeight) {
                    enemy.active = false;
                }
            }
        }
    }

    draw(spriteRenderer) {
        for (const enemy of this.#pool) {
            if (enemy.active) {
                enemy.draw(spriteRenderer);
            }
        }
    }
}