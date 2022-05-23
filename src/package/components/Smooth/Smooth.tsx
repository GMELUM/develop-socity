import { FC, useEffect, useState } from 'react';
import "./Smooth.css";

interface ISmooth { };

const Smooth: FC<ISmooth> = ({ children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {}, []);

    return (
        <div className='Smooth'>
            {children}
        </div>
    )
}

export default Smooth;
