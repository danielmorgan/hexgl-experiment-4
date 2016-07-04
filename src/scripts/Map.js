'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import gesture from 'pixi-simple-gesture';
import World from './World';

export default class Map extends PIXI.Container {
    constructor() {
        super();

        let world = new World(50, 50);
        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        let background = new PIXI.extras.TilingSprite(parchmentTexture, world.width, world.height);
        this.addChild(background);
        this.addChild(world);

        // Default zoom and position
        this.scale.x = this.scale.y = 0.25;

        this.bindEvents();
    }

    bindEvents() {
        $(window).on('wheel', e => this.zoom(e.originalEvent));

        gesture.panable(this);
        this.on('panmove', e => this.pan(new PIXI.Point(e.deltaX, e.deltaY)));
    }

    zoom(e, factor = 0.95) {
        // In or out?
        if (e.deltaY < 0) factor = 1 / factor;

        // Clamp between 25% and 250% zoom
        let newScale = this.scale.x * factor;
        if (newScale > 1 || newScale < 0.2) return;

        // Zoom
        this.scale = new PIXI.Point(newScale, newScale);

        // Offset so we zoom on mouse cursor
        let dx = -((e.x - this.x) * (factor - 1));
        let dy = -((e.y - this.y) * (factor - 1));
        let delta = new PIXI.Point(dx, dy);
        this.pan(delta);
    }

    pan(delta) {
        let w = this.width - window.innerWidth;
        let h = this.height - window.innerHeight;
        let x = this.x + delta.x;
        let y = this.y + delta.y;

        console.log(-w, -h);

        if (x < 0 && x >= -w) this.x = x;
        if (y < 0 && y >= -h) this.y = y;

        console.log(this.x, this.y);
    }
}