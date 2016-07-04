'use strict';

export default class GradientMask {
    static heightMap(graph) {
        let heightMap = [];

        for (let r = 0; r < graph.length; r++) {
            heightMap[r] = [];
            for (let q = 0; q < graph[r].length; q++) {
                let y = r / graph.length * 2 - 1;
                let x = q / graph[r].length * 2 - 1;
                let value = Math.max(Math.abs(x), Math.abs(y));

                heightMap[r][q] = Math.floor(this.curve(value) * 255);
            }
        }

        return heightMap;
    }

    static curve(value) {
        let a = 1; // suddenness of falloff (higher = sharper)
        let b = 4; // how close to the outer edge falloff occurs (higher = closer to edge)

        return Math.pow(value, a) / (Math.pow(value, a) + Math.pow(b - b * value, a));
    }
}
