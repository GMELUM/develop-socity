import { classes } from 'package';
import { FC, useState } from 'react';
import "./Avatar.css";

interface IAvatar {
    src: string;
    size?: number | "auto";
};

const Avatar: FC<IAvatar> = ({
    src,
    size = "auto"
}) => {

    const [isLoad, setIsload] = useState(true);

    const sizeAvatar = size === "auto" ? "100%" : size;
    const styleImage = {
        opacity: isLoad ? 0 : 1,
        height: sizeAvatar,
        width: sizeAvatar
    }

    const onLoad = () => { setIsload(false) }
    const onError = () => { }

    return (
        <div className={classes('Avatar', {
            'Avatar--hidden': isLoad,
            'Avatar--visible': !isLoad
        })}>
            {isLoad && <div className='Avatar_loader'></div>}
            <img src={src}
                alt="avatar"
                style={styleImage}
                onLoad={onLoad}
                onError={onError}
            />
        </div>
    )
}

export default Avatar;
