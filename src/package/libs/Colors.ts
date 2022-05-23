
function rgbToHex(value: Array<number>) {
    const hex = value.map((n) => {
        const item = n.toString(16);
        return item.length === 1 ? "0" + item : item;
    }).join("")
    return "#" + hex;
}

function hsvToHex(h: number, s: number, v: number) {
    const f = (n: number, k = (n + h / 60) % 6) =>
        ~~((v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)) * 255);
    return rgbToHex([f(5), f(3), f(1)]);
}

export class HUE {
    public static toRGB(h: number, u: number, e: number) { }
    public static toHEX(h: number, u: number, e: number) { return hsvToHex(h, u, e) }
}