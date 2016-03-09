import {Space} from './space';

export function createSnapshot(space:Space, image:HTMLImageElement):Snapshot {
    return new Snapshot(space, image);
}

export class Snapshot {
    private _createdAt:Date;

    constructor(private _space:Space, private _image:HTMLImageElement) {
        this._createdAt = new Date();
    }

    get createdAt():Date { return this._createdAt; }
    get image():HTMLImageElement { return this._image; }
    get space():Space { return this._space; }
}