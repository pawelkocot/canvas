export function createThumbnail(canvas:HTMLCanvasElement, scale:number):HTMLImageElement {
    const image = new Image();

    const resizer = new Image();
    resizer.onload = () => {
        const width = canvas.width * scale;
        const height = canvas.height * scale;

        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = width;
        tmpCanvas.height = height;
        tmpCanvas.getContext('2d').drawImage(resizer, 0, 0, width, height);

        image.src = tmpCanvas.toDataURL('image/png');
    };

    resizer.src = canvas.toDataURL('image/png');

    return image;
}