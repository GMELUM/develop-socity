import clamp from 'package/libs/clamp';
import classes from 'package/libs/classes';
import { HUE } from 'package/libs/Colors';
import { CSSProperties, FC, SyntheticEvent, useRef, useState } from 'react';
import { isTouchSupport } from '../Touch/Touch';
import "./InputRange.css";

type InputValue = string | number;

export interface IInputRange {
    min?: InputValue;
    max?: InputValue;
    value?: InputValue;
    step?: number;
    title?: string;
    mode?: "hue" | "clasic" | "bubbles" | "strokes";
    onChange?(value: InputValue): void;
};

const InputRange: FC<IInputRange> = ({
    min = 0,
    max = 100,
    value = 0,
    step = 1,
    title,
    mode = 'clasic',
    onChange,
    children,
    ...prevProps
}) => {

    const rangeMin = Number(min);
    const rangeMax = Number(max);
    const rangeDiff = rangeMax - rangeMin;

    const [[touch, thumb], setState] = useState([false, false]);
    const thumbHueRef = useRef<HTMLDivElement>(null)

    function getProgress(value: number | string) { return (Number(value) - Number(min)) * 100 / rangeDiff }

    function dropThumb(event: SyntheticEvent<HTMLDivElement, TouchEvent | MouseEvent>) {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const nativeEvent = event.nativeEvent;
        const clientX = nativeEvent instanceof TouchEvent ?
            nativeEvent.touches[0].clientX : nativeEvent.clientX;
        const minX = left + 12;
        const maxX = width - minX;
        const value = (clientX - minX) * 100 / maxX;
        const count = rangeMin + (value * rangeDiff / 100);
        const res = clamp(Math.round(count), rangeMin, rangeMax);
        onChange && onChange(res);
    }

    function onStart(event: SyntheticEvent<HTMLDivElement, TouchEvent | MouseEvent>) {
        setState([true, !!(event.nativeEvent instanceof TouchEvent)]); dropThumb(event);
    }

    function onMove(event: SyntheticEvent<HTMLDivElement, TouchEvent | MouseEvent>) {
        if (touch) {
            dropThumb(event);
        }
    }

    function onEnd() { setState([false, false]) }

    const propsEvent = isTouchSupport ? {
        onTouchStart: onStart,
        onTouchMove: onMove,
        onTouchEnd: onEnd,
        ...prevProps
    } : {
        onMouseDown: onStart,
        onMouseMove: onMove,
        onMouseLeave: onEnd,
        onMouseUp: onEnd,
        ...prevProps
    }

    const position = (Number(max) / 2) < value;

    console.log((Number(max) / 2), value)

    const styleThumb = mode === 'hue' ? {
        transition: thumb ? 'transform .1s .24s' : 'transform .1s 0s',
        transform: thumb ? 'translateY(-35px)' : '',
        // flexDirection: position ? 'row-reverse' : 'row'
    } as CSSProperties : {};

    const stypePopout = position ? {
        paddingRight: '36px',
        transform: 'translateX(calc(-100% + 34px))'

    } : {
        paddingLeft: '36px',
        transform: 'translateX(0)'
    }

    const colorThumb = HUE.toHEX(getProgress(value) * 3.6, 1, 1);

    const background = ["bubbles", "strokes"].includes(mode) && (
        <div className='InputRange_back'>
            {Array.from(Array((rangeDiff * 2) + 1)).map((_, i) => {
                const index = Number(value) - Number(min);
                const isActive = index * 2 > i;
                return <span key={`span_${i}`} className={classes('', {
                    'InputRange_span--active': isActive,
                    'InputRange_span--unactive': !isActive
                })} />
            })}
        </div>
    )

    return (
        <div {...propsEvent} className={classes('InputRange', `InputRange--${mode}`)}>
            {background}
            <div className='InputRange_track'>
                <div className='InputRange_track_progress'
                    style={{ width: `${getProgress(value)}%` }} >
                    {mode === "hue" && <div className='InputRange_thumb_hue' style={styleThumb}>
                        <div className='InputRange_thumb_hue_color' style={{ backgroundColor: colorThumb }} />

                        <div ref={(e) => console.dir(e?.clientWidth)} className={classes('InputRange_thumb_hue_content', {
                            'InputRange_thumb_hue_content--left': position,
                            'InputRange_thumb_hue_content--right': !position
                        })} >
                            <div className='hue_content'>
                                {title && <span className='title'>{title}</span>}
                                <span className={title ? "hex" : "title"}>{colorThumb}</span>
                            </div>
                        </div>

                    </div>}
                    {mode !== "hue" && <div className='InputRange_thumb' style={styleThumb} />}
                </div>
            </div>
        </div>
    )

}

export default InputRange;
