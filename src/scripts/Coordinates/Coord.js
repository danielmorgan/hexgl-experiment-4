'use strict';

import PIXI from 'pixi.js';
import game from '../index';

export default class Coord {
    constructor(q, r, s = null) {
        if (s === null) {
            s = -q - r;
        }

        if (q + r + s === 0) {
            this.q = q;
            this.r = r;
            this.s = s;
        } else {
            throw new Error('Invalid coordinates', 'Coordinates must equal 0 when summed.');
        }
    }

    toPixel() {
        let layout = game.layout;

        let o = layout.orientation;
        let w = layout.size.width;
        let h = layout.size.height;

        // Rectangle
        let r = this.r;
        let rOffset = Math.floor(r / 2);
        let q = this.q - rOffset;

        let x = (o.f0 * q + o.f1 * r) * w;
        x += layout.origin.x;

        let y = (o.f2 * q + o.f3 * r) * h;
        y += layout.origin.y;

        return new PIXI.Point(x, y);
    }
}