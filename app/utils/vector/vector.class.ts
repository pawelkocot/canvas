export class Vector {
    constructor(private _x:number, private _y:number) {}

    get x():number {
        return this._x;
    }

    get y():number {
        return this._y;
    }

    distanceTo(v:Vector):number {
        let x = (v.x - this.x);
        let y = (v.y - this.y);

        return Math.sqrt((x * x) + (y * y));
    }

    add(v:Vector):Vector {
        return createVector(this.x + v.x, this.y + v.y);
    }

    multiply(scalar:number):Vector {
        return createVector(this.x * scalar, this.y * scalar);
    }

    normalise():Vector {
        const distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const newX = this.x * (1.0 / distance);
        const newY = this.y * (1.0 / distance);

        return createVector(newX, newY);
    }

    dot(v:Vector):number {
        return ((this.x * v.x) + (this.y * v.y));
    }
}

export function createVector(x:number, y:number):Vector {
    return new Vector(x, y);
}