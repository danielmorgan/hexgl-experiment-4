'use strict';

import Coord from './Coord';
import { Directions, Diagonals } from './Directions';

export default class Hex extends Coord {
    constructor(q, r, s = null) {
        super(q, r, s);

        this.neighbours = this.getNeighbours(); // Hex
        this.borders = []; // Edge
        this.corners = []; // Corner
    }

    getNeighbours() {
        let neighbours = [];

        for (let i = 0; i < 6; i++) {
            neighbours.push(Hex.neighbour(this, i));
        }

        return neighbours;
    }

    static createFromOffset(q, r) {
        let newQ = q;
        let newS = (q % 2 === 0) ? r - (q + 1) / 2 : r - q / 2;
        let newR = -newQ - newS;

        return new Hex(newQ, newR, newS);
    }

    static add(a, b) {
        return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
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
}
