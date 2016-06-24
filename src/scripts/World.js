'use strict';

import PIXI from 'pixi.js';
import WorldGenerator from './WorldGenerator';
import HexGraphic from './HexGraphic';

export default class World extends PIXI.Container {
    constructor(width = 100, height = 100) {
        super();

        this.width = width;
        this.height = height;
        this.worldData = WorldGenerator.generate(width, height);

        this.draw();
    }

    draw() {
        let point = new PIXI.Point(50, 50);
        let height = 220;
        this.addChild(new HexGraphic(point, height));
        this.cacheAsBitmap = true;
    }
}