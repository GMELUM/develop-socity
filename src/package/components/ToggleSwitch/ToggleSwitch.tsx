import classes from 'package/libs/classes';
import { FC, HTMLAttributes, useState } from 'react';
import "./ToggleSwitch.css";

interface IToggleSwitch extends Omit<HTMLAttributes<HTMLInputElement>, "onChange" | "defaultValue"> {
    onChange?(value: boolean): void;
    value?: boolean;
    disable?: boolean;
};

const ToggleSwitch: FC<IToggleSwitch> = ({
    onChange,
    value = false,
    disable = true
}) => {
    const handleClick = () => {
        !disable && onChange && onChange(!value);
    };
    return (
        <span onClick={handleClick} className={classes('ToggleSwitch', {
            'ToggleSwitch--active': value,
            'ToggleSwitch--unactive': !value,
            'ToggleSwitch--disable': disable
        })}>
            <span className={'ToggleSwitch_toddler'} />
        </span>
    )
}

export default ToggleSwitch;
