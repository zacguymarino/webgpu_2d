export class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y= y;
        this.width = width;
        this.height = height;
    }

    copy() {
        return new Rect(this.x, this.y, this.width, this.height);
    }
}