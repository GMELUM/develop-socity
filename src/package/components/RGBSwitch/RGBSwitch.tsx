import { FC } from 'react';
import RangeCell from '../RangeCell/RangeCell';
import "./RGBSwitch.css";

interface IRGBSwitch { };



const RGBSwitch: FC<IRGBSwitch> = () => {
    return (
        <div className='RGBSwitch'>
            {/* <div className='RGBSwitch_inner'>
                <div className='RGBSwitch_cursor' />
            </div> */}
            <RangeCell min={0} max={100}/>
        </div>
    )
}

export default RGBSwitch;
