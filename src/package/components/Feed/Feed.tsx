import { FC } from 'react';
import "./Feed.css";

interface IFeed {
    columns?: number;
};

const Feed: FC<IFeed> = ({
    columns = 3,
    children
}) => {

    return (
        <div
            className={'Feed'}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {children}
        </div >
    )
}

export default Feed;
