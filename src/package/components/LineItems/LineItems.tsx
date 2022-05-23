import { FC } from 'react';
import "./LineItems.css";

interface ILineItems { };

const LineItems: FC<ILineItems> = ({
    children
}) => {
    return (
        <div className='LineItems'>
            {children}
        </div>
    )
}

export default LineItems;
