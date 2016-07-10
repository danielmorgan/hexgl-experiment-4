'use strict';

export default class Corner {
	constructor(position) {
		this.position = position;

		this.touches = []; // Center
		this.protrudes = []; // Edge
		this.adjacent = []; // Corner
	}
}