import { Button } from 'package';
import classes from 'package/libs/classes';
import useSaveScroll from 'package/hooks/useSaveScroll';
import { FC, ReactNode, useRef, useState, MouseEvent, useEffect, HTMLAttributes } from 'react';
import { Icon16DropdownFlippedOutline } from '@vkontakte/icons';

import "./Panel.css";

interface IPanel extends HTMLAttributes<HTMLDivElement> {
    nav: string;
    header?: ReactNode;
    footer?: ReactNode;
    fixed?: boolean;
    safeTop?: boolean;
    safeBottom?: boolean;
};

const Panel: FC<IPanel> = ({
    nav,
    header,
    footer,
    fixed,
    className,
    safeTop = true,
    safeBottom = true,
    children
}) => {

    const panelRef = useRef<HTMLDivElement>(null);
    const [overflow, setOverflow] = useState(true);
    const [top, setTop] = useState(false);
    useSaveScroll(nav, panelRef, handlerScroll);

    function handlerScroll(event: MouseEvent<HTMLDivElement>) {
        if (event.target instanceof HTMLDivElement) {
            const scroll = event.target.scrollTop;
            const show = scroll > 200;
            show !== top && setTop(show);
        }
    }

    useEffect(() => {
        if (!overflow) {
            panelRef.current?.scrollTo({ top: 0 });
            setOverflow(true);
        }
    }, [overflow])

    return (
        <div className={classes('Panel', className)}>
            {safeTop && <div className='Panel_before'></div>}
            <div className='Panel_header'>{header}</div>
            <div className={classes('Panel_outer', {
                "Panel_overflow": overflow && !fixed
            })} ref={panelRef}>
                {top && <div className='Panel_to_top'>
                    <Button size='s'
                        before={<Icon16DropdownFlippedOutline />}
                        onClick={() => setOverflow(false)}>Вверх</Button>
                </div>}
                <div className='Panel_inner'>{children}</div>
            </div>
            <div className='Panel_footer'>{footer}</div>
            {safeBottom && <div className='Panel_after'></div>}
        </div>
    )
}

export default Panel;