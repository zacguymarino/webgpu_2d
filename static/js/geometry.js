export class QuadGeometry {
    vertices;
    indices;

    constructor() {

        const x = 10;
        const y = 10;
        const w = 99;
        const h = 75;

        this.vertices = [
            // x y          u v         r g b
            x, y,       0.0, 0.0,    1.0, 1.0, 1.0,   //top left
            x+w, y,     1.0, 0.0,    1.0, 1.0, 1.0,   //top right
            x+w, y+h,   1.0, 1.0,    1.0, 1.0, 1.0,   //bottom right
            x, y+h,     0.0, 1.0,    1.0, 1.0, 1.0,   //bottom left
        ];

        this.indices = [
            0, 1, 2,
            2, 3, 0
        ];
    }
}