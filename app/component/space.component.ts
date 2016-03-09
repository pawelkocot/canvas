import {Component, ElementRef} from 'angular2/core';
import {createSpace, Space} from '../model/space';
import {createAsteroid} from '../model/asteroid';
import {createSnapshot, Snapshot} from '../model/snapshot';
import {createSpaceAnimation, SpaceAnimation} from '../canvas/space-animation';
import {createVector} from '../utils/vector/vector';
import range from '../utils/functions/range';
import random from '../utils/functions/random';
import {createSpaceThumbnail} from '../canvas/space-thumbnail';
import {SnapshotComponent} from './snapshot.component';

@Component({
    selector: 'space',
    template: `
        <button (click)='toggleAnimation()'>{{ animation.isRunning ? 'stop' : 'start' }}</button>
        <button (click)='snapshot(animation.space)'>snapshot</button>
        <button (click)='resetSpace()'>reset</button>
        <hr />
        <canvas id='space' width='{{ width }}' height='{{ height }}' style='border: 1px solid black;'></canvas>
        <div class='snapshots'>
            <snapshot *ngFor='#snapshot of snapshots' [snapshot]='snapshot' (clicked)='restoreSnapshot($event)'></snapshot>
        </div>
    `,
    directives: [SnapshotComponent]
})
export class SpaceComponent {
    private width = 1200;
    private height = 500;
    private animation:SpaceAnimation;
    private snapshots:Snapshot[] = [];

    constructor(private el:ElementRef) {}

    ngOnInit() {
        const canvas = this.el.nativeElement.querySelector('#space');

        this.animation = createSpaceAnimation(canvas.getContext('2d'), this.createRandomSpace());
        this.animation.start();
    }

    resetSpace() {
        this.animation.space = this.createRandomSpace();
    }

    toggleAnimation() {
        this.animation.toggle();
    }

    snapshot(space:Space) {
        this.snapshots.push(createSnapshot(space, createSpaceThumbnail(space, 1/4)));
    }

    restoreSnapshot(snapshot:Snapshot) {
        this.animation.space = snapshot.space;
    }

    private createRandomSpace():Space {
        const asteroids = [];
        range(35, 1190, 160).forEach(i => {
            range(35, 490, 160).forEach(j => {
                asteroids.push(createAsteroid(random(10, 30), createVector(i, j), createVector(random(-1, 1), random(-1, 1))));
            });
        });

        return createSpace(this.width, this.height, asteroids);
    }
}