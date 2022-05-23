import { FC } from 'react';
import "./FooterCells.css";

interface IFooterCells { };

const FooterCells: FC<IFooterCells> = ({
    children
}) => {
    return (
        <div className='FooterCells'>
            {children}
        </div>
    )
}

export default FooterCells;
