'use strict';

class Orientation {
    constructor(f0, f1, f2, f3, b0, b1, b2, b3, startAngle) {
        this.f0 = f0;
        this.f1 = f1;
        this.f2 = f2;
        this.f3 = f3;
        this.b0 = b0;
        this.b1 = b1;
        this.b2 = b2;
        this.b3 = b3;
        this.startAngle = startAngle;
    }
}

let sqrt3 = Math.sqrt(3);
export const ORIENTATION_POINTY = new Orientation(
    sqrt3, sqrt3/2, 0, 3/2,
    sqrt3/3, -1/3, 0, 2/3,
    30);
export const LAYOUT_FLAT = new Orientation(
    3/2, 0, sqrt3/2, sqrt3,
    2/3, 0, -1/3, sqrt3/3,
    0);
