'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import gesture from 'pixi-simple-gesture';
import World from './World';
import game from './index'

export default class Map extends PIXI.Container {
    constructor() {
        super();

        let world = new World(50, 50);
        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        this.background = new PIXI.extras.TilingSprite(parchmentTexture, world.width, world.height);
        this.addChild(this.background);
        this.addChild(world);

        // Default zoom and position
        this.scale.x = this.scale.y = 1;//0.75;
        this.x = 0;//-window.innerWidth / 2;
        this.y = 0;//-window.innerHeight / 2;

        this.bindEvents();
    }

    bindEvents() {
        $(window).on('wheel', e => {
            e.preventDefault();
            this.zoom(e.originalEvent);
        });

        gesture.panable(this);
        this.on('panmove', e => this.pan(new PIXI.Point(e.deltaX, e.deltaY)));
    }

    zoom(e, factor = 0.95) {
        // In or out?
        if (e.deltaY < 0) factor = 1 / factor;

        // Clamp between 20% and 100% zoom
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
        let hexWidth = Math.sqrt(3) / 2 * game.layout.size.height;
        let hexHeight = game.layout.size.height * 2;
        let horizBound = window.innerWidth - this.width + (hexWidth * 4);
        let vertBound = window.innerWidth - this.width + hexHeight;
        let targetX = this.x + delta.x;
        let targetY = this.y + delta.y;

        if (targetX >= horizBound && targetX < 0) this.x = targetX;
        if (targetY >= vertBound && targetY < 0) this.y = targetY;
    }
}
