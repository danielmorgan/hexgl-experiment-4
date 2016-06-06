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

    bindEvents() {
        gesture.panable(this);
        this.on('panmove', e => this.pan(e));
    }

    setup() {
        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        this.background = new PIXI.extras.TilingSprite(parchmentTexture, window.innerWidth, window.innerHeight);
        this.background.alpha = 0.75;

        this.addChild(this.background);
    }

    pan(e) {
        this.background.tilePosition.x += e.deltaX;
        this.background.tilePosition.y += e.deltaY;
    }
}