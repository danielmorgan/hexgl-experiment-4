'use strict';

import PIXI from 'pixi.js';
import game from './index';
import Maths from './Utils/Maths';

export default class HexGraphic extends PIXI.Graphics {
    constructor(center = new PIXI.Point(0, 0), height = 0) {
        super();

        this.layout = game.layout;
        this.center = center;
        this.color = this.heightToTerrainColor(height);

        this.beginFill(this.color, 0.8);
        this.lineStyle(3, this.color, 1);
        this.drawPolygon(this.perturb(this.points()));
        this.endFill();
    }

    points() {
        let points = [];

        for (let i = 1; i <= 6; i++) {
            let point = this.corner(this.center, i);
            points.push(new PIXI.Point(point.x, point.y));
        }

        return points;
    }

    perturb(points) {
        let perturbedPoints = [];

        for (let i = 0; i < points.length; i++) {
            let nextIndex = (i == points.length - 1) ? 0 : i + 1;
            let midPoint = new PIXI.Point(
                Maths.lerp(points[i].x, points[nextIndex].x, 0.5) + Maths.randomPosNeg() * 5,
                Maths.lerp(points[i].y, points[nextIndex].y, 0.5) + Maths.randomPosNeg() * 5
            );
            perturbedPoints.push(points[i]);
            perturbedPoints.push(midPoint);
            perturbedPoints.push(points[nextIndex]);
        }

        return perturbedPoints;
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
        } else if (value <= 230 && value > 210) {
            return '0xd1bc7b'; // coast low
        } else if (value <= 210 && value > 190) {
            return '0xdbc480'; // coast med
        } else if (value <= 190 && value > 180) {
            return '0xd4be7d'; // coast high
        } else if (value <= 180 && value > 150) {
            return '0x889d57'; // grass low
        } else if (value <= 150 && value > 120) {
            return '0x849753'; // grass med
        } else if (value <= 120 && value > 100) {
            return '0x7b8d4e'; // grass high
        } else if (value <= 100 && value > 80) {
            return '0x705c47'; // mountains low
        } else if (value <= 80 && value > 50) {
            return '0x665441'; // mountains med
        } else if (value <= 50 && value > 30) {
            return '0x5c4c3b'; // mountains high
        } else if (value <= 30) {
            return '0xeaece9'; // snow caps
        }
    }
}
