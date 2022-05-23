import { CSSProperties, FC } from 'react';
import "./RatioDiv.css";

interface IRatioDiv {
    ratio?: "auto" | string;
};

const RatioDiv: FC<IRatioDiv> = ({
    ratio = "1/1",
    children
}) => {
    const [width, height] = ratio.split("/");

    const styleRatio = {
        "--ratio-div": `${(+height / +width) * 100}%`
    } as CSSProperties;

    return (
        <div className='RatioDiv' style={styleRatio}>
            <div className='RatioDiv_children'>{children}</div>
        </div>
    )
}

export default RatioDiv;
