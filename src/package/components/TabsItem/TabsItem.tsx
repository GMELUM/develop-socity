import { FC } from 'react';
import "./TabsItem.css";

export interface ITabsItem {
    title: string;
};

const TabsItem: FC<ITabsItem> = ({
    title,
    children
}) => {
    return (
        <div className='TabsItem'>
            {title}
        </div>
    )
}

export default TabsItem;
