import { FC, ReactNode } from 'react';
import "./ItemInfo.css";

interface IItemInfo {
    string: string | ReactNode;
    substring?: string | ReactNode;
};

const ItemInfo: FC<IItemInfo> = ({
    string,
    substring
}) => {
    return (
        <div className='ItemInfo'>
            <div className='ItemInfo_string'>{string}</div>
            <div className='ItemInfo_substring'>{substring}</div>
        </div>
    )
}

export default ItemInfo;
