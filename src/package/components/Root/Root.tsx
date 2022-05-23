import { classes } from "package";
import { FC, Children, useEffect, useState } from "react";

import './Root.css';

interface IRoot {
    activeView: string;
    delay?: number;
}

const Root: FC<IRoot> = ({
    activeView,
    delay = 400,
    children
}) => {
    const [[back, active, animation, show], setNav] = useState(["", activeView, false, true]);

    const views = Children.toArray(children) as React.ReactElement[];
    const pageBack = views.find((elem) => elem.props.nav === back);
    const pageActive = views.find((elem) => elem.props.nav === active);

    useEffect(() => {
        if (active !== activeView) {
            setNav([active, activeView, true, true]);
            const timer = window.setTimeout(() => {
                setNav([active, activeView, true, false]);
            }, delay);
            return () => { window.clearTimeout(timer) };
        }
    }, [activeView]);

    return (
        <div className="Root">
            <div key={back} className="Root_back">{show && back && pageBack}</div>
            <div key={active} className={classes('Root_active', {
                "Root_active--animate": animation && show,
                "Root_active--visible": !animation || !show
            })}>{pageActive}</div>
        </div>
    )
}

export default Root;




