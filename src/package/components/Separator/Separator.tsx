import { classes } from 'package';
import { FC } from 'react';
import "./Separator.css";

interface ISeparator {
    size?: 'small' | 'medium' | 'large' | 'wide';
};

const Separator: FC<ISeparator> = ({
    size = 'wide'
}) => <div className={classes('Separator', { [`Separator--${size}`]: true })} />;

export default Separator;
