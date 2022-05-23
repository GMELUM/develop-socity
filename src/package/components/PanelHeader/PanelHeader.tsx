import { FC, ReactNode } from 'react';
import "./PanelHeader.css";

interface IPanelHeader {
    before?: ReactNode;
    after?: ReactNode;
};

const PanelHeader: FC<IPanelHeader> = ({
    before,
    after,
    children
}) => {

    const a = [];
    a.push("")
    
    return (
        <div className='PanelHeader'>
            <div className='PanelHeader_before'>{before}</div>
            <div className='PanelHeader_content'>{children}</div>
            <div className='PanelHeader_after'>{after}</div>
        </div>
    )
}

export default PanelHeader;