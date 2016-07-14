'use strict';

import PIXI from 'pixi.js';

export default class Corner extends PIXI.Point {
    constructor(position) {
        super(position.x, position.y);

        this.touches = []; // Hex
        this.protrudes = []; // Edge
        this.adjacent = []; // Corner
    }
}
