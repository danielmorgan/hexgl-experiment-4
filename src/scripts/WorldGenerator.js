'use strict';

import Hex from './Coordinates/Hex';

export default class WorldGenerator {
    static generate(w, h) {
        let graph = [];

        for (let r = 0; r < h; r++) {
            graph[r] = [];
            for (let q = 0; q < w; q++) {
                graph[r][q] = new Hex(q, r);
            }
        }

        return graph;
    }
}