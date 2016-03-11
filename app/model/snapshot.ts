import {Space} from './space';
import {createSpaceThumbnail} from '../canvas/space-thumbnail';

export function createSnapshot(space:Space):Snapshot {
    return new Snapshot(space);
}

export class Snapshot {
    private _createdAt:Date;
    private _image:HTMLImageElement;

    constructor(private _space:Space) {
        this._createdAt = new Date();
        this._image = createSpaceThumbnail(_space, 1/4);
    }

    get createdAt():Date { return this._createdAt; }
    get image():HTMLImageElement { return this._image; }
    get space():Space { return this._space; }
}