'use strict';

import PIXI from 'pixi.js';
import FastSimplexNoise from 'fast-simplex-noise';
import WorldGenerator from './Generators/WorldGenerator';
import GradientMask from './Generators/GradientMask'
import Maths from './Utils/Maths';
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
        let gradient = GradientMask.heightMap(this.data);
        let noise = new FastSimplexNoise({
            frequency: 0.07,
            max: 255,
            min: 0,
            octaves: 1
        });

        for (let r = 0; r < this.data.length; r++) {
            for (let q = 0; q < this.data[r].length; q++) {
                let point = this.data[r][q].toPixel();
                let height = Maths.clamp(Math.floor(noise.in2D(q, r) + gradient[r][q]), 0, 255);
                this.addChild(new HexGraphic(point, height));
            }
        }

        this.cacheAsBitmap = true;
    }
}