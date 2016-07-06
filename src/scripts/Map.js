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

        // Bounds
        this.bounds = function() {
            return {
                left: -(game.layout.size.width * this.scale.x),
                top: -(game.layout.size.height * this.scale.y),
                right: window.innerWidth - (this.horizWidth * this.scale.x),
                bottom: window.innerHeight - (this.vertHeight * this.scale.y)
            };
        };
        console.log(this.bounds());

        // Default zoom
        this.scale.x = this.scale.y = this.minScale();

        // Default position
        this.x = this.bounds().left;
        this.y = this.bounds().top;

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

        let newScale = this.scale.x * factor;
        let minScale = this.minScale();

        // Offset so we zoom on mouse cursor
        let dx = -((e.x - this.x) * (factor - 1));
        let dy = -((e.y - this.y) * (factor - 1));
        let delta = new PIXI.Point(dx, dy);

        // Clamp zoom in
        if (newScale > 1) {
            this.scale = new PIXI.Point(1, 1);
        }
        // Clamp zoom out
        else if (newScale < minScale) {
            this.scale = new PIXI.Point(minScale, minScale);
        }
        // Zoom
        else {
            this.scale = new PIXI.Point(newScale, newScale);
        }

        this.pan(delta);
    }

    pan(delta) {
        let targetX = this.x + delta.x;
        let targetY = this.y + delta.y;

        let moved = false;

        // X-axis
        if (targetX <= this.bounds().left && targetX >= this.bounds().right) {
            this.x = targetX;
            moved = true;
        } else {
            // Correction
            if (targetX > this.bounds().left) this.x = this.bounds().left;
            if (targetX < this.bounds().right) this.x = this.bounds().right;
        }

        // Y-axis
        if (targetY <= this.bounds().top && targetY >= this.bounds().bottom) {
            this.y = targetY;
            moved = true;
        } else {
            // Correction
            if (targetY > this.bounds().top) this.y = this.bounds().top;
            if (targetY < this.bounds().bottom) this.y = this.bounds().bottom;
        }

        if (moved) {
            return true;
        } else {
            return false;
        }
    }
}
