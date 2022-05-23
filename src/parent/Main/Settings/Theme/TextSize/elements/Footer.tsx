import { Icon24TextOutline } from '@vkontakte/icons';
import { useRoute } from 'engine';
import { TEXT_SIZE } from 'engine/state';
import { Footer, FooterCells, RangeCell, SimpleCell } from 'package';
import { FC, Fragment, HTMLAttributes, useRef } from 'react';
import { useRecoilState } from 'recoil';

interface ISlider extends HTMLAttributes<HTMLDivElement> { };

const Slider: FC<ISlider> = () => {

    const { backPage } = useRoute();

    const [size, setSize] = useRecoilState(TEXT_SIZE);
    let localSize = useRef(size).current;

    const updateVariable = (value: number) =>
        document.body.style.setProperty('--preview-text-size', `${value}px`);

    const handlerChange = (value: number) => {
        console.log(value)
        localSize = value;
        updateVariable(value);
    };

    const handlerReset = () => {
        updateVariable(size);
        backPage();
    }

    const handlerSave = () => {
        setSize(localSize);
        updateVariable(localSize);
        backPage();
    }

    return (
        <Fragment>
            <Footer>
                <RangeCell
                    min={13}
                    max={23}
                    mode="bubbles"
                    before={<Icon24TextOutline width={22} height={22} />}
                    after={<Icon24TextOutline width={28} height={28} />}
                    defaultValue={size}
                    onChange={handlerChange} />
            </Footer>
            <FooterCells>
                <SimpleCell onClick={handlerReset}>Отмена</SimpleCell>
                <SimpleCell onClick={handlerSave}>Принять</SimpleCell>
            </FooterCells >
        </Fragment>
    )
}

export default Slider;
