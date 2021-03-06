'use strict';

import PIXI from 'pixi.js';
import Corner from './Corner';
import Edge from './Edge';
import HexGraphic from '../HexGraphic';
import game from '../index.js';

export default class Hex {
    constructor(q, r, s = null) {
        if (s === null) {
            s = -q - r;
        }

        if (q + r + s === 0) {
            this.q = q;
            this.r = r;
            this.s = s;
        } else {
            throw new Error('Invalid Hex coordinates', 'Coordinates must equal 0 when summed.');
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

    static createFromOffset(q, r) {
        let newQ = q;
        let newS = (q % 2 === 0) ? r - (q + 1) / 2 : r - q / 2;
        let newR = -newQ - newS;

        return new Hex(newQ, newR, newS);
    }

    static add(a, b) {
        let q = a.q + b.q;
        let r = a.r + b.r;

        function isEven(num) { return (num % 2 == 0); }

        if (! isEven(r)) { // Every other row
            if (b.r < 0) { // Up
                q += 1;
            } else {
                q -= 1;
            }
        } else {
        }

        return new Hex(q, r);
    }

    static subtract(a, b) {
        return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
    }

    static scale(a, k) {
        return new Hex(a.q * k, a.r * k, a.s * k);
    }

    static direction(direction) {
        return Directions[direction];
    }

    static neighbour(hex, direction) {
        return this.add(hex, this.direction(direction));
    }

    static diagonal(diagonal) {
        return Diagonals[diagonal];
    }

    static diagonalNeighbour(hex, diagonal) {
        return this.add(hex, this.diagonal(diagonal));
    }

    static length(hex) {
        return ((Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2);
    }

    static distance(a, b) {
        return this.length(this.subtract(a, b));
    }

    static ring(hex, radius) {
        var results = []
        var newHex = this.add(hex, this.scale(new Hex(-1, 1, 0), radius))

        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < radius; j ++) {
                results.push(newHex);
                newHex = Hex.neighbour(newHex, i);
            }
        }

        return results;
    }
    
    static corner(hex, direction) {
        let hexGraphic = new HexGraphic();
        let point = hexGraphic.corner(hex.toPixel(), direction);
        
        return new Corner(point);
    }

    get corners() {
        let corners = [];

        for (let i = 0; i < 6; i++) {
            corners.push(Hex.corner(this, i));
        }

        return corners;
    }

    static edge(hex, direction) {
        let hexGraphic = new HexGraphic();
        let v0 = hexGraphic.corner(hex.toPixel(), direction);
        let v1 = hexGraphic.corner(hex.toPixel(), direction + 1);
        let d0 = hex.toPixel();
        let d1 = Hex.neighbour(hex, direction).toPixel();

        return new Edge(v0, v1, d0, d1);
    }

    get edges() {
        let edges = [];

        for (let i = 0; i < 6; i++) {
            edges.push(Hex.edge(this, i));
        }

        return edges;
    }
}

export const Directions = [
    new Hex(+1, -1,  0), new Hex(+1,  0, -1), new Hex(0, +1, -1),
    new Hex(-1, +1,  0), new Hex(-1,  0, +1), new Hex(0, -1, +1)
];

export const Diagonals = [
    new Hex(+2, -1, -1), new Hex(+1, -2, +1), new Hex(-1, -1, +2),
    new Hex(-2, +1, +1), new Hex(-1, +2, -1), new Hex(+1, +1, -2)
];
