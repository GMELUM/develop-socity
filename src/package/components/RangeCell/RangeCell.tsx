import { FC, ReactNode, useState } from 'react';
import Cell from '../Cell/Cell';
import InputRange, { IInputRange } from '../InputRange/InputRange';
import Range, { IRange } from '../Range/Range';
import "./RangeCell.css";

interface IRangeCell extends IInputRange {
    before?: ReactNode;
    after?: ReactNode;
    defaultValue?: number;
};

const RangeCell: FC<IRangeCell> = ({
    before,
    after,
    children,
    defaultValue,
    onChange,
    ...prevProps
}) => {

    const [value, setValue] = useState(defaultValue);

    const handleChange = (value: number) => {
        setValue(value);
        onChange && onChange(value)
    }
    return (
        <div className='RangeCell'>
            <Cell
                before={before}
                after={after}
            ><InputRange onChange={handleChange} value={value} {...prevProps} /></Cell>
        </div>
    )
}

export default RangeCell;
