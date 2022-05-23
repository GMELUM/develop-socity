const clamp = (value: number, min: number, max: number) =>
    value <= max ? value >= min ? value : min : max;

export default clamp;