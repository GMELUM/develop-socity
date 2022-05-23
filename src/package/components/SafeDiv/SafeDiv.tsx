import { FC, HTMLAttributes } from 'react';
import "./SafeDiv.css";

interface ISafeDiv extends HTMLAttributes<HTMLDivElement> { };

const SafeDiv: FC<ISafeDiv> = ({
    children,
    ...prevProps
}) => <div {...prevProps} className='SafeDiv'>{children}</div>;

export default SafeDiv;
