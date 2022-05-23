import { classes } from 'package';
import { FC } from 'react';
import "./Centered.css";

interface ICentered {
    type?: "vertical" | "horizontal" | "all";
};

const Centered: FC<ICentered> = ({ type = "all", children }) =>
    <div className={classes('Centered', { [`Centered--${type}`]: true })}>{children}</div>

export default Centered;
