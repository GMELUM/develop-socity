import { FC, ReactNode } from 'react';
import Cell from '../Cell/Cell';
import "./Footer.css";

interface IFooter {
    before?: ReactNode;
    after?: ReactNode;
};

const Footer: FC<IFooter> = ({
    before,
    after,
    children
}) => {
    return (
        <div className='Footer'>
            <Cell
                before={before}
                after={after}>
                {children}
            </Cell>
        </div>
    )
}

export default Footer;
