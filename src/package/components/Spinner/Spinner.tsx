import { classes } from 'package';
import { FC, memo, useEffect, useState } from 'react';
import "./Spinner.css";

interface ISpinner {
    size?: "small" | "regular" | "large" | "medium" | "auto";
};

const Spinner: FC<ISpinner> = ({ size = "regular" }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setShow(true), 1000);
        return () => window.clearTimeout(timer);
    }, [])

    return (
        <div className={classes('Spinner', {
            [`Spinner--${size}`]: true,
            "Spinner--hidden": !show,
            'Spinner--visible': show
        })}>
            <svg viewBox="0 0 50 50" >
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    )
}


export default memo(Spinner);