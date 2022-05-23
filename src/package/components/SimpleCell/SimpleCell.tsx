import classes from 'package/libs/classes';
import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import Cell from '../Cell/Cell';
import { isTouchSupport } from '../Touch/Touch';
import "./SimpleCell.css";

interface ISimpleCell extends HTMLAttributes<HTMLDivElement> {
    before?: ReactNode;
    after?: ReactNode;
};

const SimpleCell: FC<ISimpleCell> = ({
    before,
    after,
    onClick,
    children
}) => {

    const [[isHover, isActive], setStatus] = useState([false, false]);

    function onStart() {
        if (!isActive) { setStatus([isHover, true]) }
    }

    function onEnd() {
        if (isHover || isActive) {
            setStatus([false, false])
        }
    }

    function onMouseMove() {
        if (!isHover) { setStatus([true, isActive]) }
    }

    function onMouseLeave() {
        if (isHover) { setStatus([false, false]) }
    }

    const propsEvent = isTouchSupport ? {
        onTouchStart: onStart,
        onTouchEnd: onEnd,
        onTouchMove: onMouseMove,
    } : {
        onMouseMove: onMouseMove,
        onMouseLeave: onMouseLeave,
        onMouseDown: onStart,
        onMouseUp: onEnd,
    };

    return (
        <div {...propsEvent} className={classes('SimpleCell', {
            'SimpleCell--hover': isHover,
            'SimpleCell--active': isActive
        })} onClick={onClick}>
            <Cell
                before={before}
                after={after}>
                {children}
            </Cell>
        </div>
    )
}

export default SimpleCell;
