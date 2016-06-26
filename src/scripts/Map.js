'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import gesture from 'pixi-simple-gesture';
import World from './World';

export default class Map extends PIXI.Container {
    constructor() {
        super();

        this.addBackground();
        this.addWorld();
        this.bindEvents();
    }

    addBackground() {
        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        this.background = new PIXI.extras.TilingSprite(parchmentTexture, 2500, 2500);
        this.background.alpha = 1;
        this.addChild(this.background);
    }
    
    addWorld() {
        let world = new World();
        this.addChild(world);
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
        if (newScale > 2.5 || newScale < 0.25) return;

        // Zoom
        this.scale = new PIXI.Point(newScale, newScale);

        // Offset so we zoom on mouse cursor
        let dx = -((e.x - this.x) * (factor - 1));
        let dy = -((e.y - this.y) * (factor - 1));
        let delta = new PIXI.Point(dx, dy);
        this.pan(delta);
    }

    pan(delta) {
        this.x += delta.x;
        this.y += delta.y;
    }
}