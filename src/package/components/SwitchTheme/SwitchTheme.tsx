import classes from 'package/libs/classes';
import { FC, useState } from 'react';
import "./SwitchTheme.css";

interface ISwitchTheme {
    onChange?(value: boolean): void;
    value?: boolean;
    disable?: boolean;
};

const SwitchTheme: FC<ISwitchTheme> = ({
    onChange,
    value = true,
    disable = false
}) => {

    const [active, setActive] = useState(value);

    const handleClick = () => {
        setActive(!active);
        onChange && onChange(!active);
    }

    const handleCheck = (value: boolean) => {
        setActive(value)
        onChange && onChange(value);
    }

    return (
        <div className='SwitchTheme'>
            <span className={classes('SwitchTheme_dark', {
                'SwitchTheme_dark--active': !active
            })} onClick={() => handleCheck(false)}>Темная</span>
            <span className={classes('SwitchTheme_inner', {
                'SwitchTheme--light': active,
                'SwitchTheme--dark': !active
            })} onClick={handleClick}>
                <span className={'SwitchTheme_toddler'}>
                    <span className='SwitchTheme_toodler_inner' />
                </span>
            </span>
            <span className={classes('SwitchTheme_light', {
                'SwitchTheme_light--active': active
            })} onClick={() => handleCheck(true)}>Светлая</span>
        </div>

    )
}

export default SwitchTheme;
