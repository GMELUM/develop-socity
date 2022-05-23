import { FC, HTMLAttributes } from 'react';
import "./TapWave.css";

interface ITapWave extends HTMLAttributes<HTMLDivElement> {
};

const TapWave: FC<ITapWave> = ({ children, ...prevProps }) => {
    return (
        <div className={'TapWave'} {...prevProps}>
            <div className='TapWave_children'>
                {children}
            </div>
        </div>
    )
}

export default TapWave;