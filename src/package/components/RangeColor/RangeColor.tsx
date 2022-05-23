import useEventListener from 'package/hooks/useEventListener';
import { CSSProperties, FC, SyntheticEvent, useRef, useState } from 'react';
import { isTouchSupport } from '../Touch/Touch';
import "./RangeColor.css";

interface IRangeColor {
    defaultColor?: number | string;
};

const RangeColor: FC<IRangeColor> = ({
    defaultColor = 0,
    ...prevProps
}) => {

    const [value, setValue] = useState<number | string>(defaultColor);
    const [color, setColor] = useState<string>(hsvToHex(Number(value), 1, 1));
    const inputRef = useRef<HTMLInputElement>(null);

    function handlerInput(event: SyntheticEvent<HTMLInputElement>) {
        const val = event.currentTarget.value;
        const hex = hsvToHex(Number(val), 1, 1)
        setValue(val);
        setColor(hex);
    }

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

    const styleRange = {
        '--range-thumb-color': color
    } as CSSProperties;

    useEventListener("touchstart", (event) => {
        let touch = event.touches[0] || event.changedTouches[0];
        if (inputRef.current) {
            event.offsetX = touch.clientX;
            event.offsetY = touch.clientY;
        }
    }, inputRef, { passive: false });

    return (
        <div className='RangeColor'>
            <div className='RangeColor_track' />
            <input {...prevProps}
                ref={inputRef}
                style={styleRange}
                type="range"
                min={0}
                max={360}
                value={value}
                onInput={handlerInput}
                onChange={(e) => console.log(e)}
            />
        </div>
    )
}

export default RangeColor;
