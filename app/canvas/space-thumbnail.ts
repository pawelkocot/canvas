import {draw} from './space-drawing';
import {Space} from '../model/space';

export function createSpaceThumbnail(space:Space, scale:number):HTMLImageElement {
    const image = new Image();
    const resizer = new Image();
    resizer.onload = () => {
        const width = space.dimensions.width * scale;
        const height = space.dimensions.height * scale;

        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = width;
        tmpCanvas.height = height;
        tmpCanvas.getContext('2d').drawImage(resizer, 0, 0, width, height);

        image.src = tmpCanvas.toDataURL('image/png');
    };

    const canvas = document.createElement('canvas');
    canvas.width = space.dimensions.width;
    canvas.height = space.dimensions.height;
    draw(canvas.getContext('2d'))(space);
    resizer.src = canvas.toDataURL('image/png');

    return image;
}

