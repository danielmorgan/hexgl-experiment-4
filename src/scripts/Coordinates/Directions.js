'use strict';

import Coord from './Coord';

export const Directions = [
    new Coord(+1, -1,  0), new Coord(+1,  0, -1), new Coord(0, +1, -1),
    new Coord(-1, +1,  0), new Coord(-1,  0, +1), new Coord(0, -1, +1)
];

export const Diagonals = [
    new Coord(+2, -1, -1), new Coord(+1, -2, +1), new Coord(-1, -1, +2),
    new Coord(-2, +1, +1), new Coord(-1, +2, -1), new Coord(+1, +1, -2)
];
