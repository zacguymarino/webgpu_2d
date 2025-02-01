import { mat4 } from 'gl-matrix'

export class DynamicCamera {
    #projection;
    #view;

    projectionViewMatrix;

    constructor(width = 800, height = 600) {
        this.width = width;
        this.height = height;
        this.projectionViewMatrix = mat4.create();
    }

    update(x, y, offsetX = 0, offsetY = 0) {
        this.#projection = mat4.ortho(mat4.create(), 0, this.width, this.height, 0, -1, 1);
        this.#view = mat4.lookAt(mat4.create(), [x-(this.width/2)+offsetX,y-(this.height/2)+offsetY,1], [x-(this.width/2)+offsetX,y-(this.height/2)+offsetY,0], [0,1,0]); //[Where the camera is], [then where it looks], [then which way is up]

        mat4.multiply(this.projectionViewMatrix, this.#projection, this.#view);
    }
}