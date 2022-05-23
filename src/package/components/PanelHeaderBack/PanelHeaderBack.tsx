import { FC, HTMLAttributes, memo } from 'react';
import { Icon28ChevronBack } from '@vkontakte/icons';
import "./PanelHeaderBack.css";
import TapWave from '../TapWave/TapWave';

interface IPanelHeaderBack extends HTMLAttributes<HTMLDivElement> { };

const PanelHeaderBack: FC<IPanelHeaderBack> = ({ onClick, ...restProps }) => {
    return (<div className='PanelHeaderBack' {...restProps} >
        <TapWave onClick={onClick}>
            <Icon28ChevronBack />
        </TapWave>
    </div>)
}

export default memo(PanelHeaderBack);