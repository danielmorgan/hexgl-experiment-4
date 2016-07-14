'use strict';

import PIXI from 'pixi.js';
import FastSimplexNoise from 'fast-simplex-noise';
import GraphGenerator from './Generators/GraphGenerator';
import GradientMask from './Generators/GradientMask'
import Maths from './Utils/Maths';
import HexGraphic from './HexGraphic';

export default class World extends PIXI.Container {
    constructor(width = 100, height = 100, seed = 1) {
        super();

        this.width = width;
        this.height = height;
        this.seed = seed;

        let generator = new GraphGenerator(width, height);
        this.graph = generator.generate();
        console.log(this.graph);

        this.draw();
    }

    draw() {
        let gradient = GradientMask.heightMap(this.graph.grid);
        let noise = new FastSimplexNoise({
            frequency: 0.07,
            max: 255,
            min: 0,
            octaves: 1,
            random: () => this.seed
        });

        for (let r = 0; r < this.graph.grid.length; r++) {
            for (let q = 0; q < this.graph.grid[r].length; q++) {
                let point = this.graph.grid[r][q].toPixel();
                let height = Maths.clamp(Math.floor(noise.in2D(q, r) + gradient[r][q]), 0, 255);
                this.addChild(new HexGraphic(point, height));
            }
        }

        /**
         * @TODO: Split map into chunks and mipmap for scale like gmaps
         *
         * Caching as a bitmap can cause it to fail to render if the size is
         * higher than the GPU's max texture resolution. But it improves the
         * frame rate.
         */
        //this.cacheAsBitmap = true;
    }
}
