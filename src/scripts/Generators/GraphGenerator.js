'use strict';

import Hex from '../Coordinates/Hex';
import Corner from '../Coordinates/Corner';
import Edge from '../Coordinates/Edge';

export default class GraphGenerator {
    static generate(w, h) {
        let graph = [];

        for (let r = 0; r < h; r++) {
            graph[r] = [];
            for (let q = 0; q < w; q++) {
                graph[r][q] = new Hex(q, r);

                for (let i = 0; i < 6; i++) {
                    // neighbours
                    let neighbor = Hex.neighbour(graph[r][q], i);
                    graph[r][q].neighbors.push(neighbor);
                    
                    // corners
                    let corner = Hex.corner(graph[r][q], i);
                    graph[r][q].corners.push(corner);
                }
            }
        }

        return graph;
    }
}