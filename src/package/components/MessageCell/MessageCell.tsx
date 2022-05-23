import { Separator } from 'package';
import { FC, ReactNode } from 'react';
import Cell from '../Cell/Cell';
import "./MessageCell.css";

interface IMessageCell {
    before?: ReactNode;
    after?: ReactNode;
    title?: string;
    subtext?: string;
};

const MessageCell: FC<IMessageCell> = ({
    before,
    after,
    title,
    subtext
}) => {
    return (
        <div className='MessageCell'>
            <Cell
                before={before}
                after={after}>
                <div className='MessageCell_content'>
                    <span className='MessageCell_title'>{title}</span>
                    <span className='MessageCell_subtext'>{subtext}</span>
                </div>
            </Cell>
            {/* <div className='MessageCell_inner'>
                <div className='MessageCell_before'>{before}</div>
                <div className='MessageCell_content'>
                    <span className='MessageCell_title'>{title}</span>
                    <span className='MessageCell_subtext'>{subtext}</span>
                </div>
                <div className='MesageCell_after'>{after}</div>
            </div> */}
        </div>
    )
}

export default MessageCell;
