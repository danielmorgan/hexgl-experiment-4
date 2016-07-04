'use strict';

import PIXI from 'pixi.js';
import $ from 'jquery';
import { ORIENTATION_POINTY } from './Coordinates/Orientation';
import Layout from './Coordinates/Layout';

export default class Game {
    constructor() {
        this.$container = $('#game');
        this.stage = new PIXI.Container();
        let radius = 50;
        this.layout = new Layout(
            ORIENTATION_POINTY,
            { width: radius, height: radius },
            new PIXI.Point(0, 0)
        );
    }

    addToStage(displayObject) {
        this.stage.addChild(displayObject);
    }
}