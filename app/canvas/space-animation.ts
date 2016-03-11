import {Space, SpaceCallback} from '../model/space';
import {draw} from '../canvas/space-drawing';

export class SpaceAnimation {
    private running = false;
    private drawingCallback:SpaceCallback;
    private allowedFps:number[] = [30, 60];
    private _forcedSpace:Space;
    private _animationFrame = true;
    private _fps:number = 60;

    constructor(context:CanvasRenderingContext2D, private _space:Space, fps:number = 60) {
        this.drawingCallback = draw(context);
        this.fps = fps;
    }

    get isRunning():boolean { return this.running }
    get fps():number {return this._fps; }

    get animationFrame():boolean {
        this._animationFrame = !this._animationFrame;

        return this._animationFrame;
    }

    set fps(fps:number) {
        if (this.allowedFps.indexOf(fps) === -1) {
            throw 'Invalid parameter "'+fps+'", allowed: '+this.allowedFps.join(' ');
        }

        this._fps = fps;
    }

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
                this.handleFrame();
                this.animate();
            });
        }
    }

    private handleFrame() {
        if (this.fps == 30) {
            // 30fps - one frame for calculation, one for drawing
            if (this.animationFrame) {
                this.drawingCallback(this._space);
            } else {
                this._space = this.space.move();
            }
        } else {
            this._space = this.space.move();
            this.drawingCallback(this._space);
        }
    }
}

export function createSpaceAnimation(context:CanvasRenderingContext2D, space:Space):SpaceAnimation {
    return new SpaceAnimation(context, space);
}