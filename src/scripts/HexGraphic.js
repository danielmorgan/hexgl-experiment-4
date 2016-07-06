'use strict';

import PIXI from 'pixi.js';
import game from './index';

export default class HexGraphic extends PIXI.Graphics {
    constructor(center = new PIXI.Point(0, 0), height = 0) {
        super();

        this.layout = game.layout;
        this.center = center;
        this.color = this.heightToTerrainColor(height);

        this.beginFill(this.color, 0.8);
        this.lineStyle(3, this.color, 1);
        this.drawPolygon(this.points());
        this.endFill();
    }

    points() {
        let points = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.corner(this.center, i);
            points.push(point.x, point.y);
        }

        return points;
    }

    corner(center, i) {
        let angleDeg = 60 * i + this.layout.orientation.startAngle;
        let angleRad = Math.PI / 180 * angleDeg;
        let x = center.x + this.layout.size.width * Math.cos(angleRad);
        let y = center.y + this.layout.size.height * Math.sin(angleRad);

        return new PIXI.Point(x, y);
    }

    heightToTerrainColor(value) {
        if (value > 230) {
            return '0xa6acbe'; // water
        } else if (value <= 230 && value > 180) {
            return '0xd4be7d'; // coast
        } else if (value <= 180 && value > 100) {
            return '0x889d57'; // grass
        } else if (value <= 100 && value > 30) {
            return '0x665441'; // mountains
        } else if (value <= 30) {
            return '0xeaece9'; // snow caps
        }
    }
}
