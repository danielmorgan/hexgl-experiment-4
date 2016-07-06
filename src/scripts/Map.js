'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import World from './World';
import game from './index'
import 'pepjs';

export default class Map extends PIXI.Container {
    constructor() {
        super();

        this.world = new World(35, 25);

        this.horizWidth = this.world.getBounds().width - (game.layout.size.width * 2);
        this.vertHeight = this.world.getBounds().height - (game.layout.size.height * 2);

        this.background = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage('img/parchment.jpg'),
            this.horizWidth, this.vertHeight);

        // Offset layers
        this.world.x = this.background.x = game.layout.size.width;
        this.world.y = this.background.y = game.layout.size.height;

        // Add layers
        this.addChild(this.background);
        this.addChild(this.world);

        // Default zoom and position
        this.scale.x = this.scale.y = this.minScale();
        this.x = 0 - (game.layout.size.width * this.scale.x);
        this.y = 0 - (game.layout.size.height * this.scale.y);

        this.bindEvents();
    }

    bindEvents() {
        $(window).on('wheel', e => {
            e.preventDefault();

            this.zoom(e.originalEvent);
        });

        $(window).on('pointerdown', e => {
            e.preventDefault();

            this.panning = true;
            this.pointerPreviousPosition = new PIXI.Point(e.clientX, e.clientY);
        });

        $(window).on('pointermove', e => {
            e.preventDefault();

            if (! this.panning) return;

            let x = e.clientX - this.pointerPreviousPosition.x;
            let y = e.clientY - this.pointerPreviousPosition.y;
            let delta = new PIXI.Point(x, y);

            this.pan(delta);

            this.pointerPreviousPosition = new PIXI.Point(e.clientX, e.clientY);
        });

        $(window).on('pointerup', e => {
            e.preventDefault();
            
            this.panning = false;
        });
    }

    minScale() {
        let minScaleWidth = window.innerWidth / this.horizWidth;
        let minScaleHeight = window.innerHeight / this.vertHeight;
        return Math.max(minScaleWidth, minScaleHeight);
    }

    zoom(e, factor = 0.95) {
        // In or out?
        if (e.deltaY < 0) factor = 1 / factor;

        // Clamp between 20% and 100% zoom
        let newScale = this.scale.x * factor;
        let minScale = this.minScale() + 0.05;
        if (newScale > 1 || newScale < minScale) return;

        // Zoom
        this.scale = new PIXI.Point(newScale, newScale);

        // Offset so we zoom on mouse cursor
        let dx = -((e.x - this.x) * (factor - 1));
        let dy = -((e.y - this.y) * (factor - 1));
        let delta = new PIXI.Point(dx, dy);
        this.pan(delta);
    }

    pan(delta) {
        let left = -game.layout.size.width;
        let top = -game.layout.size.height;
        let right = window.innerWidth - this.width + game.layout.size.width / 2;
        let bottom = window.innerHeight - this.height + game.layout.size.height / 2;
        let targetX = this.x + delta.x;
        let targetY = this.y + delta.y;

        if (targetX <= left && targetX >= right) this.x = targetX;
        if (targetY <= top && targetY >= bottom) this.y = targetY;
    }
}
