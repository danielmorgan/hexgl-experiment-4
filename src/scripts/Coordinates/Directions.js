'use strict';

import Hex from './Hex';

export const Directions = [
    new Hex(+1, -1,  0), new Hex(+1,  0, -1), new Hex(0, +1, -1),
    new Hex(-1, +1,  0), new Hex(-1,  0, +1), new Hex(0, -1, +1)
];

export const Diagonals = [
    new Hex(+2, -1, -1), new Hex(+1, -2, +1), new Hex(-1, -1, +2),
    new Hex(-2, +1, +1), new Hex(-1, +2, -1), new Hex(+1, +1, -2)
];
