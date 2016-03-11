export default function(start:number, stop:number, step:number = 1):number[] {
    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const range = Array(length);

    for (let idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
    }

    return range;
}