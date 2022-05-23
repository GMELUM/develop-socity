import classes from 'package/libs/classes';
import { FC, useState, MouseEvent, useEffect, HTMLAttributes, ReactNode } from 'react';
import "./Button.css";

interface IButton extends HTMLAttributes<HTMLButtonElement> {
    size?: "x" | "l" | "s";
    type?: "default" | "";
    mode?: "default" | "outline";
    streched?: boolean;
    after?: ReactNode;
    before?: ReactNode;
    disabled?: boolean;
};

const Button: FC<IButton> = ({
    size = 'x',
    type = 'default',
    mode = 'default',
    streched = false,
    after,
    before,
    children,
    disabled = false,
    onClick,
    ...prevProps
}) => {

    const [[touch, X, Y, scale], setWave] = useState([true, 0, 0, 0]);

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const X = event.nativeEvent.offsetX;
        const Y = event.nativeEvent.offsetY;
        setWave([false, X, Y, 0]);
        onClick && onClick(event);
    }

    useEffect(() => { scale !== 1 && setWave([true, X, Y, 1]); }, [touch, X, Y, scale])

    const waveStyle = {
        WebkitTransform: `translateX(${X - 200}px) translateY(${Y - 200}px) scale(${scale})`,
        transform: `translateX(${X - 200}px) translateY(${Y - 200}px) scale(${scale})`,
        WebkitTransition: touch ? ".6s" : "none",
        transition: touch ? ".6s" : "none",
        opacity: touch ? 0 : 1
    }

    return (
        <button className={classes('Button', {
            [`Button_size--${size}`]: true,
            [`Button_type--${type}`]: true,
            [`Button_mode--${mode}`]: true,
            'Button--streched': streched,
            'Button--disabled': disabled,
        })} onClick={handleClick} {...prevProps}>
            <div className='Button_wave' style={waveStyle} />
            <div className='Button_before'>{before}</div>
            <div className='Button_children'>{children}</div>
            <div className='Button_after'>{after}</div>
        </button >
    )
}

export default Button;
