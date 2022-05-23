import classes from 'package/libs/classes';
import { FC, HTMLAttributes, ReactNode } from 'react';
import Text from '../Text/Text';
import "./InlineButton.css";

export interface IInlineButton {
    name: string;
    title: ReactNode;
    description?: ReactNode;
    selected?: boolean;
    onClick?(): void;
};

const InlineButton: FC<IInlineButton> = ({
    title,
    description,
    selected = false,
    onClick,
    children
}) => {
    return (
        <div onClick={onClick} className={classes('InlineButton', {
            'InlineButton--selected': selected,
            'InlineButton--single': !!!description
        })}>
            <div className='InlineButton_title'>
                <Text size='small' transform='uppercase'>{title}</Text>
            </div>
            {description && <div className='InlineButton_description'>
                <Text size='small'>{description}</Text>
            </div>}
        </div>
    )
}

export default InlineButton;
