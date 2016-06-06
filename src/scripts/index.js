'use strict';

import Game from './Game';
import Map from './Map';
import GameLoop from './GameLoop';

// Set up the game singleton
let game = window.game = new Game();
export default game;

// Add stuff to the game
let map = new Map();
game.addToStage(map);

// Start the game loop
new GameLoop();