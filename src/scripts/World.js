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
                let hex = this.graph.grid[r][q];

                // Draw hex
                let height = Maths.clamp(Math.floor(noise.in2D(q, r) + gradient[r][q]), 0, 255);
                //this.addChild(new HexGraphic(point, height));

                // Draw corners
                for (let corner of hex.corners) {
                    let g = new PIXI.Graphics();
                    g.beginFill(0xff0000, 0.5);
                    g.drawRect(corner.x, corner.y, 5, 5);
                    g.endFill();
                    //this.addChild(g);
                }

                // Draw edges
                for (let edge of hex.edges) {
                    let v = new PIXI.Graphics();
                    v.lineStyle(2, 0x00ff00, 0.5);
                    v.moveTo(edge.v0.x, edge.v0.y);
                    v.lineTo(edge.v1.x, edge.v1.y);
                    this.addChild(v);
                }

                // Coord text
                var text = new PIXI.Text(q + ',' + r ,{
                    font: '24px Arial',
                    fill: 0xffff00,
                    align: 'center'
                });
                text.anchor = new PIXI.Point(0.5, 0.5);
                text.x = hex.toPixel().x;
                text.y = hex.toPixel().y;
                this.addChild(text);
            }
        }

        // delauney edge debugging
        for (let i = 0; i < 6; i++) {
            let qOffset = Math.floor(i /2);
            let hex = this.graph.grid[i+5][i+5 - qOffset];
            let point = hex.toPixel();

            let edge = hex.edges[3];
            let d = new PIXI.Graphics();
            d.lineStyle(5, 0xff00ff, 1);
            d.moveTo(edge.d0.x, edge.d0.y);
            d.lineTo(edge.d1.x, edge.d1.y);
            this.addChild(d);

            // Draw center
            let g = new PIXI.Graphics();
            g.beginFill(0xffffff, 1);
            g.drawRect(point.x - 5, point.y - 5, 10, 10);
            g.endFill();
            this.addChild(g);
        }

        /**
         * @TODO: Split map into chunks and mipmap for scale like gmaps
         *
         * Caching as a bitmap can cause it to fail to render if the size is
         * higher than the GPU's max texture resolution. But it improves the
         * frame rate.
         */
        this.cacheAsBitmap = true;
    }
}
