import {Vector, createVector} from '../utils/vector/vector.class';
import {SpaceDimensions} from '../model/space';

export function createAsteroid(radius:number, position:Vector, velocity:Vector, previousPosition:Vector = null):Asteroid {
    return new Asteroid(radius, position, velocity, previousPosition);
}

export class Asteroid {
    constructor(private _radius:number, private _position:Vector, private _velocity:Vector, private _previousPosition:Vector = null) {}

    get radius():number { return this._radius }
    get mass():number { return Math.PI*Math.pow(this.radius, 2) }
    get position():Vector { return this._position }
    get velocity():Vector { return this._velocity }
    get previousPosition():Vector {
        if (!this._previousPosition) {
            throw 'Previous position is not defined';
        }

        return this._previousPosition;
    }

    moveWithinSpace(spaceDimensions:SpaceDimensions) {
        const newPosition = this.position.add(this.velocity);
        let position = newPosition;
        let velocity = this.velocity;

        if (newPosition.x + this.radius > spaceDimensions.width || newPosition.x - this.radius < 0) {
            velocity = createVector(-velocity.x, velocity.y);
            position = this.position;
        }
        if (newPosition.y + this.radius > spaceDimensions.height || newPosition.y - this.radius < 0) {
            velocity = createVector(velocity.x, -velocity.y);
            position = this.position;
        }

        return createAsteroid(this.radius, position, velocity, this.position);
    }

    handleCollisionWith(asteroid:Asteroid):Asteroid {
        if (!this.collideWith(asteroid)) {
            return this;
        }

        return createAsteroid(this.radius, this.previousPosition, this.getCollisionVector(asteroid), this.previousPosition);
    }

    collideWith(asteroid:Asteroid):boolean {
        const sumOfRadius = this.radius + asteroid.radius;
        const distance = this.position.distanceTo(asteroid.position);

        return (distance < sumOfRadius);
    }

    // not my code
    private getCollisionVector(asteroid:Asteroid):Vector {
        const normalVector = createVector((asteroid.previousPosition.x - this.previousPosition.x), (asteroid.previousPosition.y - this.previousPosition.y)).normalise();
        const tangentVector = createVector((-normalVector.y), normalVector.x);

        const asteroid1ScalarNormalAfter = (normalVector.dot(createVector(this.velocity.x, this.velocity.y)) * (this.mass - asteroid.mass) + 2 * asteroid.mass * normalVector.dot(new Vector(asteroid.velocity.x, asteroid.velocity.y))) / (this.mass + asteroid.mass);

        return tangentVector.multiply(tangentVector.dot(createVector(this.velocity.x, this.velocity.y))).add(normalVector.multiply(asteroid1ScalarNormalAfter));
    }
}