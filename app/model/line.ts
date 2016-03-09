import {Vector} from '../utils/vector/vector.class';

export function line(position1:Vector, position2:Vector, indicator:number):Line {
    return new Line(position1, position2, indicator);
}

export class Line {
    constructor(private _position1:Vector, private _position2:Vector, private _indicator:number) {}

    get position1():Vector { return this._position1; }
    get position2():Vector { return this._position2; }
    get indicator():number { return this._indicator; }
}