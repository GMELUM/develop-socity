import { Children, FC, ReactElement, ReactNode, useMemo, useState } from 'react';
import TabsItem, { ITabsItem } from '../TabsItem/TabsItem';
import "./Tabs.css";

interface ITabs {
    defaultTab: string;
    onChange?(value: string): void;
};

const Tabs: FC<ITabs> = ({
    defaultTab,
    onChange,
    children
}) => {

    const [active, setActive] = useState(defaultTab);
    const arrayChild = Children.toArray(children) as ReactElement<ITabsItem>[];
    const activeElement = arrayChild.find((child) => child.props.title === active);

    return (
        <div className='Tabs'>
            <div className='Tabs_header'>
                {arrayChild.map((child, index) => {
                    const { title } = child.props;
                    return (
                        <div>{title}</div>
                    )
                })}
            </div>
            <div className='Tabs_active'>{activeElement}</div>
        </div>
    )
}

export default Tabs;
