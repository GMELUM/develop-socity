import classes from 'package/libs/classes';
import { FC, HTMLAttributes } from 'react';
import "./Text.css";

interface IText extends HTMLAttributes<HTMLSpanElement> {
    weight?: 'light' | 'normal' | 'bold';
    size?: 'small' | 'normal' | 'medium' | 'large';
    transform?: 'lowercase' | 'uppercase' | 'normal';
};

const Text: FC<IText> = ({
    weight = 'normal',
    size = 'normal',
    transform = 'normal',
    children,
    ...prevProps
}) => <span {...prevProps} className={classes('Text', {
    [`Text_weight--${weight}`]: true,
    [`Text_size--${size}`]: true,
    [`Text_transform--${transform}`]: true
})}>{children}</span>


export default Text;
