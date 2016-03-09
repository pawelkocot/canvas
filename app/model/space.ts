import {Asteroid} from './asteroid';
import {line, Line} from './line';

export interface SpaceCallback {
    (space: Space): any
}

export interface SpaceDimensions {
    width:number,
    height:number
}

export function createSpace(width:number, height:number, asteroids:Asteroid[], lines:Line[] = null):Space {
    if (lines === null) {
        lines = calculateLines(asteroids);
    }

    return new Space(width, height, asteroids, lines);
}

export class Space {
    constructor(private _width:number, private _height:number, private _asteroids:Asteroid[], private _lines:Line[]) {}

    get dimensions():SpaceDimensions { return {width: this._width, height: this._height}; }
    get asteroids():Asteroid[] { return this._asteroids; }
    get lines():Line[] { return this._lines; }

    move():Space {
        let asteroids = this.asteroids.map((asteroid:Asteroid) => asteroid.moveWithinSpace(this.dimensions));

        asteroids = asteroids.map((asteroid:Asteroid) => {
            asteroids.filter(asteroid2 => asteroid !== asteroid2).forEach((asteroid2:Asteroid) => asteroid = asteroid.handleCollisionWith(asteroid2));

            return asteroid;
        });

        return createSpace(this._width, this._height, asteroids, calculateLines(asteroids));
    }
}

function calculateLines(asteroids:Asteroid[]):Line[] {
    const lines = [];
    //return lines;
    asteroids.forEach((asteroid1:Asteroid, index) => {
        asteroids.slice(index+1).forEach((asteroid2:Asteroid) => {
            const indicator = calculateDistanceIndicator(asteroid1, asteroid2, 4);
            if (indicator > 0) {
                lines.push(line(asteroid1.position, asteroid2.position, indicator));
            }
        });
    });

    return lines;
}

function calculateDistanceIndicator(asteroid1:Asteroid, asteroid2:Asteroid, distanceMultiplier:number):number {
    const distanceBetween = asteroid1.position.distanceTo(asteroid2.position);
    const sumOfRadius = (asteroid1.radius + asteroid2.radius)*distanceMultiplier;

    const value = 1 - (distanceBetween/sumOfRadius);

    return (Math.round(value * 100) / 100);
}


