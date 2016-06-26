'use strict';

export default class Maths {
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
}
