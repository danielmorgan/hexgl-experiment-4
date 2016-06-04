'use strict';

import PIXI from 'pixi.js';
import GameLoop from './GameLoop';

class Game {
    constructor() {
        this.stage = new PIXI.Container();
    }
}

let game = new Game()
console.log(game);
export default game;

let gameLoop = new GameLoop();
gameLoop.loop();
