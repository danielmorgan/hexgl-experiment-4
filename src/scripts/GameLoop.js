'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import Stats from 'stats.js';
import game from './index';

export default class GameLoop {
    constructor() {
        this.renderer = new PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight,
            { transparent: true }
        );

        this.$container = $('#game');
        this.$container.append(this.renderer.view);

        this.stats = new Stats();
        this.stats.mode = 1;
        $('body').append(this.stats.dom);
    }

    loop() {
        this.stats.begin();
        this.update();
        this.render();
        this.stats.end();
        requestAnimationFrame(() => this.loop());
    }

    update() {
    }

    render() {
        this.renderer.render(game.stage);
    }
}