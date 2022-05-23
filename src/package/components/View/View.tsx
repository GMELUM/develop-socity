import { classes } from 'package';
import { SaveContext } from 'package/hooks/useSaveScroll';
import { FC, HTMLAttributes, Children, useState, useEffect, useRef, createContext, cloneElement } from 'react';

import './View.css';

interface IView extends HTMLAttributes<HTMLDivElement> {
    activePanel: string;
    delay?: number;
    safe?: boolean;
    nav?: string;
};

export const ScrollContext = createContext<SaveContext>(new SaveContext({}));

const View: FC<IView> = ({
    activePanel,
    delay = 400,
    safe = true,
    children
}) => {
    const scrollContext = useRef<SaveContext>(new SaveContext({})).current;

    const [[back, active, animation, show], setNav] = useState(['', activePanel, false, true]);

    const views = Children.toArray(children) as React.ReactElement[];
    const viewsNav = useRef(views.map((i) => i.props.nav)).current;

    const indexBack = viewsNav.indexOf(back);
    const indexActive = viewsNav.indexOf(activePanel);

    const isBack = indexActive < indexBack;
    const isNext = indexActive > indexBack;

    const pageBack = views.find((elem) => elem.props.nav === back);
    const pageActive = views.find((elem) => elem.props.nav === active);
    const elementActive = pageActive && cloneElement(pageActive, { key: active, className: 'View_active' });
    const elementBack = show && back && pageBack && cloneElement(pageBack, { key: back, className: 'View_back' });

    useEffect(() => {
        if (active !== activePanel) {
            setNav([active, activePanel, true, true]);
            const timer = window.setTimeout(() => {
                setNav([active, activePanel, true, false]);
            }, delay);
            return () => window.clearTimeout(timer);
        }
    }, [activePanel]);

    return (
        <div className={classes('View', {
            'View_safe': safe,
            'View_down': isBack && animation && show,
            'View_next': isNext && animation && show,
            'View_visible': !animation || !show
        })}>
            <ScrollContext.Provider value={scrollContext}>
                {elementActive}
                {elementBack}
            </ScrollContext.Provider>
        </div>
    )
}

export default View;
