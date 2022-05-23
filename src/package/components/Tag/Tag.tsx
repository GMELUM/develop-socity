import { FC } from 'react';
import "./Tag.css";

interface ITag {
    color?: string;
};

const Tag: FC<ITag> = ({
    color = "#000000",
    children
}) => {
    const styleTag = { backgroundColor: color }
    return (
        <div className='Tag'>
            <span style={styleTag}/>
            {children}
        </div>
    )
}

export default Tag;
