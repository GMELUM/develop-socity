import { classes } from 'package';
import { FC, HTMLAttributes, ReactNode } from 'react';
import "./PanelHeaderContent.css";

interface IPanelHeaderContent extends HTMLAttributes<HTMLDivElement> {
    string?: string | ReactNode;
    substring?: string | ReactNode;
};

const PanelHeaderContent: FC<IPanelHeaderContent> = ({
    string,
    substring
}) => {
    return (
        <div className={classes('PanelHeaderContent', {
            "PanelHeaderContent--only_title": !substring,
            "PanelHeaderContent--default": !!substring && !!string
        })}>
            <div className='PanelHeaderContent_title'>{string}</div>
            <div className='PanelHeaderContent_description'>{substring}</div>
        </div>
    )
}

export default PanelHeaderContent;
