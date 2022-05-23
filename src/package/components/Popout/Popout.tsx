import { FC, ReactNode, useState } from 'react';
import { Сlickable } from 'package';
import "./Popout.css";

interface IPopout {
    context: ReactNode;
};

const Popout: FC<IPopout> = ({
    context,
    children
}) => {
    const [active, setActive] = useState(false);

    function handlerPopout(event: TouchEvent & MouseEvent) {
        const X = event.clientX || event?.touches[0].clientX || 0;
        const Y = event.clientY || event?.touches[0].clientY || 0;

        console.log(X, Y)
    }

    return (
        <div className='Popout' >
            {active && <div className='Popout_inner'>{context}</div>}
            <Сlickable
                onSingle={handlerPopout}
                onContext={handlerPopout}
            ><div>{children}</div></Сlickable>
        </div>
    )
}

export default Popout;
