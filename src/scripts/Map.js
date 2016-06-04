'use strict';

import PIXI from 'pixi.js';

export default class Map extends PIXI.Container {
    constructor() {
        super();

        let parchmentTexture = PIXI.Texture.fromImage('img/parchment.jpg');
        let background = new PIXI.extras.TilingSprite(parchmentTexture, window.innerWidth, window.innerHeight);
        background.alpha = 0.75;
        this.addChild(background);

        let townTexture = PIXI.Texture.fromImage('img/town.png');
        let town = new PIXI.Sprite(townTexture);
        this.addChild(town);
        town.scale.x = town.scale.y = 0.5;
        town.anchor = new PIXI.Point(0.5, 0.5);
        town.x = (window.innerWidth / 2) + 100;
        town.y = window.innerHeight / 2;

        let castleTexture = PIXI.Texture.fromImage('img/castle.png');
        let castle = new PIXI.Sprite(castleTexture);
        this.addChild(castle);
        castle.scale.x = castle.scale.y = 0.5;
        castle.anchor = new PIXI.Point(0.5, 0.5);
        castle.x = (window.innerWidth / 2) - 100;
        castle.y = window.innerHeight / 2;
    }
}