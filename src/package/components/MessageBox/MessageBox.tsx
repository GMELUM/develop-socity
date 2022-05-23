import classes from 'package/libs/classes';
import { FC, ReactNode } from 'react';
import "./MessageBox.css";

interface IMessageBox {
    align?: "right" | "left";
    attach?: ReactNode;
    time?: string;
    isRead?: boolean;
};

const MessageBox: FC<IMessageBox> = ({
    align = "right",
    attach,
    time,
    isRead,
    children
}) => {
    return (
        <div className={classes('MessageBox', {
            'MessageBox--left': align === 'left',
            'MessageBox--right': align === 'right'
        })}>
            <div className='MessageBox_inner'>
                {attach && <div className='MessageBox_attach'>{attach}</div>}
                <span className='MessageBox_text'>
                    {children}
                    <span className='MessageBox_info'>
                        <span></span><span>11:20</span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default MessageBox;
