import classes from 'package/libs/classes';
import { Children, FC, HTMLAttributes, ReactNode } from 'react';
import "./Action.css";

interface IAction extends HTMLAttributes<HTMLDivElement> {
    nav: string;
    bar?: ReactNode;
    activePage: string;
};

const Action: FC<IAction> = ({
    bar,
    activePage,
    className,
    children
}) => {

    const pages = Children.toArray(children) as React.ReactElement[];
    const active = pages.find((e) => e.props.nav === activePage)

    return (
        <div className={classes('Action', className)}>
            <div className='Action_before' />
            <div className='Action_content'>{active}</div>
            <div className='Action_bar' >{bar}</div>
            <div className='Action_after' />
        </div>
    )
}

export default Action;
