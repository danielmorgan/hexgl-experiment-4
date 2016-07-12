'use strict';

export default class Corner {
    constructor(position) {
        this.position = position;

        this.touches = []; // Hex
        this.protrudes = []; // Edge
        this.adjacent = []; // Corner
    }
}
