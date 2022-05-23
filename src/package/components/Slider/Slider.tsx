import { FC, ReactNode } from 'react';
import "./Slider.css";

interface ISlider {
    before?: ReactNode;
    after?: ReactNode;
    poins?: Array<string | number>;
};

const Slider: FC<ISlider> = ({

}) => {
    return (
        <input type="range" className='Range'>

        </input>
    )
}

export default Slider;
