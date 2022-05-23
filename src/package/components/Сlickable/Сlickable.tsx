import { Children, cloneElement, FC, ReactElement, useRef } from 'react';
import { isTouchSupport } from '../Touch/Touch';

enum TypeClick { LEFT, CENTER, RIGHT }

type CustomEvent = TouchEvent | MouseEvent;

interface IСlickable {
    delay?: number;
    onTouch?(event: CustomEvent): void;
    onSingle?(event: CustomEvent): void;
    onDouble?(event: CustomEvent): void;
    onLong?(event: CustomEvent): void;
    onContext?(event: MouseEvent): void;
};

const Сlickable: FC<IСlickable> = ({
    delay = 300,
    onTouch, // любое касание
    onSingle, // одинарное нажатие
    onDouble, // двойной клик ЛКМ или тапами
    onLong, // долгое нажатие
    onContext, // ПКМ только событие мышки
    children
}) => {

    let timer = useRef<NodeJS.Timeout>(null).current;
    let timerClick = useRef<NodeJS.Timeout>(null).current;
    let countClick = useRef<number>(0).current;

    function onStart(event: TouchEvent | MouseEvent) {

        const type: TypeClick = (event as any)?.nativeEvent?.button;
        if (type && type === TypeClick.RIGHT) { return; }

        if (!onDouble && !onLong) {
            onSingle && onSingle(event);
            return;
        }

        onTouch && onTouch(event);

        if (++countClick >= 2) {
            onDouble && onDouble(event)
            timerClick && clearTimeout(timerClick);
            countClick = 0;
            return;
        }

        timer && clearTimeout(timer);
        timer = setTimeout(() => onLong && onLong(event), delay * 2);
        timerClick = setTimeout(() => {
            !timer && countClick === 1 && onSingle && onSingle(event);
            countClick = 0;
        }, delay);
    }

    function onContextMenu(event: MouseEvent) {
        event.preventDefault();
        onContext && onContext(event);
    }

    function onEnd(event: TouchEvent | MouseEvent) {
        const type: TypeClick = (event as any)?.nativeEvent?.button;
        if (type && type === TypeClick.RIGHT) { return; }

        onTouch && onTouch(event);
        timer && window.clearTimeout(timer);
        timer = null;
    }

    const [child] = Children.toArray(children) as ReactElement[];
    const propsEvent = isTouchSupport ? {
        onTouchStart: onStart,
        onTouchEnd: onEnd,
    } : {
        onContextMenu: onContextMenu,
        onMouseDown: onStart,
        onMouseUp: onEnd,
    };

    return cloneElement(child, propsEvent);
}

export default Сlickable;
