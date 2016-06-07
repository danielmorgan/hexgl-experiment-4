'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import gesture from 'pixi-simple-gesture';

export default class Map extends PIXI.Container {
    constructor() {
        super();

        this.setup();
        this.bindEvents();
    }

    setup() {
        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        this.background = new PIXI.extras.TilingSprite(parchmentTexture, window.innerWidth, window.innerHeight);
        this.background.alpha = 1;

        this.addChild(this.background);
    }

    bindEvents() {
        $(window).on('wheel', e => this.zoom(e.originalEvent));

        gesture.panable(this);
        this.on('panmove', e => this.pan(new PIXI.Point(e.deltaX, e.deltaY)));
    }

    zoom(e, factor = 0.8) {
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