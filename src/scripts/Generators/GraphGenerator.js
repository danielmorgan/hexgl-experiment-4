'use strict';

import HashMap from 'hashmap';
import Hex from '../Coordinates/Hex';
import Corner from '../Coordinates/Corner';
import Edge from '../Coordinates/Edge';

export default class GraphGenerator {
    constructor(w, h) {
        this.width = w;
        this.height = h;

        this.centers = [];
        this.corners = [];
        this.edges = [];
    }

    generate() {
        let stages = [];
        let points;

        stages.push(['Generating centers of hexagons...', () => {
            points = this._generatePoints();
            this.grid = points;
        }]);

        stages.push(['Building graph sructure...', () => {
            this._buildGraph(points);
        }]);

        for (let stage of stages) {
            console.log(stage[0]);
            stage[1].call(this);
        }

        return this;
    }

    _generatePoints() {
        let points = [];

        for (let r = 0; r < this.height; r++) {
            points[r] = [];
            for (let q = 0; q < this.width; q++) {
                points[r][q] = new Hex(q, r);
            }
        }

        return points;
    }

    _buildGraph(points) {
        // Centers
        let centersHashMap = new HashMap();
        for (let row of points) {
            for (let hex of row) {
                let point = hex.toPixel();
                this.centers.push(point);
                centersHashMap.set(point.x + ',' + point.y, hex);
            }
        }

        // Corners
        let cornersHashMap = new HashMap();
    }
}
