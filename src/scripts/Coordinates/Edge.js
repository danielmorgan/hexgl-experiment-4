'use strict';

export default class Edge {
    constructor(v0 = null, v1 = null) {
        this.d0 = null; // Hex
        this.d1 = null; // Hex

        this.v0 = v0; // Corner
        this.v1 = v1; // Corner

        this.midpoint = null;
    }
}
