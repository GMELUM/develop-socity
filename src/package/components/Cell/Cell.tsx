import { FC, ReactNode, memo } from 'react';
import "./Cell.css";

interface ICell {
    before?: ReactNode;
    after?: ReactNode;
};

const Cell: FC<ICell> = ({
    before,
    after,
    children
}) => {
    return (
        <div className='Cell'>
            {before && <div className='Cell_before'>{before}</div>}
            <div className='Cell_children'>{children}</div>
            {after && <div className='Cell_after'>{after}</div>}
        </div>
    )
}

export default Cell;
