'use strict';

export default class Edge {
    constructor(v0 = null, v1 = null, d0 = null, d1 = null) {
        this.d0 = d0; // Hex
        this.d1 = d1; // Hex

        this.v0 = v0; // Corner
        this.v1 = v1; // Corner
    }

    get midpoint() {
        return null;
    }
}
