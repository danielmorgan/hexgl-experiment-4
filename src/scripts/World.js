'use strict';

import PIXI from 'pixi.js';
import WorldGenerator from './WorldGenerator';
import Hex from './Coordinates/Hex';
import HexGraphic from './HexGraphic';

export default class World extends PIXI.Container {
    constructor(width = 100, height = 100) {
        super();

        this.width = width;
        this.height = height;
        this.data = WorldGenerator.generate(width, height);

        this.draw();
    }

    draw() {
        for (let r of this.data) {
            for (let q of r) {
                let graphic = new HexGraphic(q.toPixel(), 200);
                this.addChild(graphic);
            }
        }

        this.cacheAsBitmap = true;
    }
}