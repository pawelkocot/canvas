import {Space, SpaceCallback} from '../model/space';
import {draw} from '../canvas/space-drawing';

export class SpaceAnimation {
    private running = false;
    private drawingCallback:SpaceCallback;
    private _forcedSpace:Space;

    constructor(context:CanvasRenderingContext2D, private _space:Space) {
        this.drawingCallback = draw(context);
    }

    get isRunning():boolean { return this.running }

    get space():Space {
        if (this._forcedSpace) {
            this._space = this._forcedSpace;
            this._forcedSpace = null;
        }
        return this._space;
    }

    set space(space:Space) {
        this._space = space;
        if (!this.running) {
            this.animate(true);
        }
    }

    start(once = false):SpaceAnimation {
        this.running = !once;
        this.animate(once);

        return this;
    }

    stop():SpaceAnimation {
        this.running = false;

        return this;
    }

    toggle():SpaceAnimation {
        if (this.running) {
            return this.stop();
        }

        return this.start();
    }

    private animate(once = false) {
        if (this.running || once) {
            window.requestAnimationFrame(() => {
                this._space = this.space.move();
                this.drawingCallback(this._space);
                this.animate();
            });
        }
    }
}

export function createSpaceAnimation(context:CanvasRenderingContext2D, space:Space):SpaceAnimation {
    return new SpaceAnimation(context, space);
}