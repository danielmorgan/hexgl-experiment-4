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

        game.$container.append(this.renderer.view);

        this.stats = new Stats();
        this.stats.mode = 1;
        $('body').append(this.stats.dom);

        this.$debug = $('<div id="debug"></div>');
        $('body').append(this.$debug);

        this.loop();
    }

    loop() {
        this.stats.begin();
        this.update();
        this.render();
        this.$debug.html('<p>X: <strong>' + window.debug.x.toFixed(0)  + '</strong>, Y: <strong>' + window.debug.y.toFixed(0) + '</strong></p>');
        this.stats.end();
        requestAnimationFrame(() => this.loop());
    }

    update() {
    }

    render() {
        this.renderer.render(game.stage);
    }
}