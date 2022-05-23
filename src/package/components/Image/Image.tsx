import { FC, HTMLAttributes, useState } from 'react';
import "./Image.css";

interface IImage extends HTMLAttributes<HTMLDivElement> {
    src: string;
};

const Image: FC<IImage> = ({
    ...prevProps
}) => {
    const [load, setLoad] = useState(true);

    function onLoad() { setLoad(false); }
    function onError() { }

    return (
        <div className='Image'>
            <img {...prevProps}
                style={{ opacity: load ? 0 : 1 }}
                alt="image"
                onLoad={onLoad}
                onError={onError}
            />
        </div>
    )
}

export default Image;
