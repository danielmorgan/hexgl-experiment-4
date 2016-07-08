'use strict';

export default class Maths {
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(a, b, t) {
    	return a + t * (b - a);
    }

    static randomPosNeg() {
    	return Math.round(Math.random()) * 2 - 1;
    }
}
