import { classes } from 'package';
import { FC, HTMLAttributes, memo } from 'react';
import "./ActionItem.css";

interface IActionItem extends HTMLAttributes<HTMLDivElement> {
    selected?: boolean;
};

const ActionItem: FC<IActionItem> = ({
    children,
    selected = false,
    className,
    ...restProps
}) => (
    <div {...restProps} className={classes('ActionItem', {
        'ActionItem--active': selected,
        'ActionItem--unactive': !selected
    })}><div>{children}</div></div>
);

export default memo(ActionItem);
