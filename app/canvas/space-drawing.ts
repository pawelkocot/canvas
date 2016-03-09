import {Space, SpaceCallback} from '../model/space';
import {Asteroid} from '../model/asteroid';
import {Line} from '../model/line';

export function draw(context:CanvasRenderingContext2D):SpaceCallback {
    return (space:Space) => {
        clear(context, space);
        space.asteroids.forEach((asteroid:Asteroid) => drawAsteroid(context, asteroid));
        space.lines.forEach((line:Line) => drawLine(context, line));
    };
}

function clear(context:CanvasRenderingContext2D, space:Space) {
    context.beginPath();
    context.fillStyle = '#BCCCD1';
    context.fillRect(0, 0, space.dimensions.width, space.dimensions.height);
}

function drawAsteroid(context:CanvasRenderingContext2D, asteroid:Asteroid) {
    context.beginPath();
    context.arc(asteroid.position.x, asteroid.position.y, asteroid.radius, 0, 2*Math.PI, false);
    context.fillStyle = 'rgba(177,29,23,0.7)';

    context.strokeStyle = 'rgba(10,10,10,0.6)';
    context.lineWidth = 1;

    context.fill();
    context.stroke();
    context.closePath();
}

function drawLine(context, line:Line) {
    context.beginPath();
    context.moveTo(line.position1.x, line.position1.y);
    context.lineTo(line.position2.x, line.position2.y);

    context.strokeStyle = 'rgba(0,0,0,'+line.indicator+')';
    context.lineWidth = 1;

    context.stroke();
    context.closePath();
}