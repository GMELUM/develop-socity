import classes from 'package/libs/classes';
import { FC, HTMLAttributes, SyntheticEvent, useState } from 'react';
import "./Range.css";

export interface IRange extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    min: string | number;
    max: string | number;
    mode?: "clasic" | "bubbles" | "strokes";
    defaultValue?: string | number;
    onChange?(value: string | number): void;
};

const Range: FC<IRange> = ({
    min,
    max,
    mode = "clasic",
    defaultValue = 0,
    onChange,
    ...prevProps
}) => {
    const diff = Number(max) - Number(min);
    const count = (diff * 2) + 1;

    const [value, setValue] = useState<string | number>(defaultValue);

    function handlerInput(event: SyntheticEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        setValue(value);
        onChange && onChange(value);
    }

    return (
        <span className='Range'>
            <div className={classes('Range_track', `Range_track--${mode}`)}>
                {Array.from(Array(count)).map((_, i) => {
                    const index = Number(value) - Number(min);
                    const isActive = index * 2 > i;
                    return <span key={`span_${i}`} className={classes('', {
                        'Range_span--active': isActive,
                        'Range_span--unactive': !isActive
                    })} />
                })}
            </div>
            <input {...prevProps} type="range"
                min={min}
                max={max}
                value={value}
                onInput={handlerInput}
            />
        </span>
    )
}

export default Range;
