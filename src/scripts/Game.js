'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';

export default class Game {
    constructor() {
        this.$container = $('#game');
        this.stage = new PIXI.Container();
    }

    addToStage(displayObject) {
        this.stage.addChild(displayObject);
    }
}