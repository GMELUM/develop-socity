import { FC, HTMLAttributes } from 'react';
import "./MessageList.css";

interface IMessageList extends HTMLAttributes<HTMLDivElement> {
    reverse?: boolean;
};

const MessageList: FC<IMessageList> = ({
    children,
    ...prevProps
}) => {
    return (
        <div {...prevProps} className='MessageList'>
            {children}
        </div>
    )
}

export default MessageList;
