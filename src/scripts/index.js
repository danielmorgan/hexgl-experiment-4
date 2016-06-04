'use strict';

import PIXI from 'pixi.js';
import GameLoop from './GameLoop';
import Map from './Map';

class Game {
    constructor() {
        this.stage = new PIXI.Container();
    }

    addToStage(displayObject) {
        this.stage.addChild(displayObject);
    }
}

// Set up the game singleton
let game = new Game()
export default game;

// Set up stuff in the game
let map = new Map();
game.addToStage(map);

// Start the game loop
let gameLoop = new GameLoop();
gameLoop.loop();
