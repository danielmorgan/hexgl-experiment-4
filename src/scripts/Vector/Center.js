'use strict';

export default class Center {
	constructor(position, ) {
		this.position = position;
		
		this.neighbours = []; // Center
		this.borders = []; // Edge
		this.corners = []; // Corner
	}
}