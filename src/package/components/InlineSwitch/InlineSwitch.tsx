import { Children, cloneElement, FC, ReactElement } from 'react';
import { IInlineButton } from '../InlineButton/InlineButton';
import "./InlineSwitch.css";

interface IInlineSwitch {
    active: string;
    onChange?(value: string): void;
};

const InlineSwitch: FC<IInlineSwitch> = ({
    active,
    onChange,
    children
}) => {
    const buttons = Children.toArray(children) as ReactElement<IInlineButton>[];

    const handlerChange = (value: string) => {
        onChange && onChange(value);
    }

    return (
        <div className='InlineSwitch'>
            {buttons.map((element) => cloneElement(element, {
                onClick: () => handlerChange(element.props.name),
                selected: element.props.name === active
            }))}
        </div>
    )
}

export default InlineSwitch;
