import { FC, ReactNode, useEffect, useState } from 'react';
import Cell from '../Cell/Cell';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import "./ToggleCell.css";

interface IToggleCell {
    before?: ReactNode;
    value?: boolean;
    disable?: boolean;
    onChange?(value: boolean): void;
};

const ToggleCell: FC<IToggleCell> = ({
    before,
    value = false,
    disable = false,
    onChange,
    children
}) => {

    const [active, setActive] = useState(value);

    const handleClick = () => {
        if (!disable) {
            onChange && onChange(!active);
            setActive(!active);
        }
    }

    useEffect(() => {
        if (active !== value) {
            setActive(value);
        }
    }, [value])

    return (
        <div className='ToggleCell' onClick={handleClick}>
            <Cell
                before={before}
                after={<ToggleSwitch
                    disable={disable}
                    onChange={handleClick}
                    value={active} />}>
                {children}
            </Cell>
        </div>
    )
}

export default ToggleCell;
