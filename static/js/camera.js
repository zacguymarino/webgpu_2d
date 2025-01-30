import { mat4 } from 'gl-matrix'

export class Camera {
    #projection;
    #view;

    projectionViewMatrix;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.projectionViewMatrix = mat4.create();
    }

    update() {
        this.#projection = mat4.ortho(mat4.create(), 0, this.width, this.height, 0, -1, 1);
        this.#view = mat4.lookAt(mat4.create(), [0,0,1], [0,0,0], [0,1,1]); //[Where the camera is], [then where it looks], [then which way is up]

        mat4.multiply(this.projectionViewMatrix, this.#projection, this.#view);
    }
}