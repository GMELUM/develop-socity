import { useRoute } from 'engine';
import { TEXT_SIZE } from 'engine/state';
import { Feed, Footer, FooterCells, InlineButton, InlineSwitch, ItemInfo, LineItems, Popout, RangeCell, SafeDiv, Separator, SimpleCell, SwitchTheme, Tag, Text } from 'package';
import { FC, Fragment, HTMLAttributes, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import {
    Icon16Moon,
    Icon16Sun,
    Icon56PictureInPicture
} from '@vkontakte/icons';

interface ISchemeFooter extends HTMLAttributes<HTMLDivElement> { };

const SchemeFooter: FC<ISchemeFooter> = () => {

    const { backPage } = useRoute();

    const [size, setSize] = useRecoilState(TEXT_SIZE);
    let localSize = useRef(size).current;

    const updateVariable = (value: number) =>
        document.body.style.setProperty('--preview-text-size', `${value}px`);

    const handlerChange = (value: number) => {
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

    const [theme, setTheme] = useState("system");

    const handleTheme = (value: string) => {
        setTheme(value);
        document.body.setAttribute("scheme", value);
    }

    return (
        <Fragment>
            <Footer>
                <Feed columns={1}>

                    <Separator size='small' />

                    <InlineSwitch active={theme} onChange={handleTheme}>
                        <InlineButton name={"system"} title={'Системная'} description={<>Тема вашего<br />устройства</>} />
                        <InlineButton name={"dark"} title={<Icon16Moon width={32} height={32} />} />
                        <InlineButton name={"light"} title={<Icon16Sun width={32} height={32} />} />
                    </InlineSwitch>

                    <Separator size='small' />

                    <RangeCell
                    title='Оттенок'
                        mode='hue'
                        min={1}
                        max={359}
                    />

                    <RangeCell
                        title='Акцент'
                        mode='hue'
                        min={1}
                        max={359}
                    />

                    <div style={{ height: '12px' }} />

                </Feed>
            </Footer>
            <FooterCells>
                <SimpleCell onClick={handlerReset}>Отмена</SimpleCell>
                <SimpleCell onClick={handlerSave}>Принять</SimpleCell>
            </FooterCells >
        </Fragment>
    )
}

export default SchemeFooter;
