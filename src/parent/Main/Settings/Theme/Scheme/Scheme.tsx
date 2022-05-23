import { useRoute } from 'engine';
import { Feed, MessageBox, MessageList, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, RangeCell, RGBSwitch, ToggleCell } from 'package';
import { FC, HTMLAttributes } from 'react';
import SchemeFooter from './elements/SchemeFooter';

interface IScheme extends HTMLAttributes<HTMLDivElement> {
    nav: string;
};

const mixedColor = (
    theme: Array<number>,
    tone: Array<number>,
    intensive: number
) => theme.map((themeColor, index) => {
    const toneColor = (tone.at(index) || 0) / intensive;
    const mixColor = themeColor + toneColor;
    return spanNumber(~~mixColor, 0, 255);
});

const spanNumber = (value: number, min: number, max: number) =>
    value <= max ? value >= min ? value : min : max;

const Scheme: FC<IScheme> = ({ ...prevProps }) => {
    const { backPage } = useRoute();

    return (
        <Panel safeBottom={false} {...prevProps}
            footer={<SchemeFooter />}
            header={<PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Цветовая схема'} substring={'Настройка темы'} />
            </PanelHeader>}>
            <MessageList reverse style={{ fontSize: `var(--preview-text-size)` }}>
                <MessageBox align='right'>Угадай с трёх раз)</MessageBox>
                <MessageBox align='left'>А ты вообще кто?</MessageBox>
                <MessageBox align='right'>Это анонимный мессенджер. Удобное приложение для анонимного общения и знакомств)</MessageBox>
                <MessageBox align='left'>Ой, куда это мы попали?</MessageBox>
                <MessageBox align='right'>Угадай с трёх раз)</MessageBox>
                <MessageBox align='left'>А ты вообще кто?</MessageBox>
                <MessageBox align='right'>Это анонимный мессенджер. Удобное приложение для анонимного общения и знакомств)</MessageBox>
                <MessageBox align='left'>Ой, куда это мы попали?</MessageBox>
                <MessageBox align='right'>Угадай с трёх раз)</MessageBox>
                <MessageBox align='left'>А ты вообще кто?</MessageBox>
                <MessageBox align='right'>Это анонимный мессенджер. Удобное приложение для анонимного общения и знакомств)</MessageBox>
                <MessageBox align='left'>Ой, куда это мы попали?</MessageBox>
                <MessageBox align='right'>Угадай с трёх раз)</MessageBox>
                <MessageBox align='left'>А ты вообще кто?</MessageBox>
                <MessageBox align='right'>Это анонимный мессенджер. Удобное приложение для анонимного общения и знакомств)</MessageBox>
                <MessageBox align='left'>Ой, куда это мы попали?</MessageBox>
                <MessageBox align='right'>Угадай с трёх раз)</MessageBox>
                <MessageBox align='left'>А ты вообще кто?</MessageBox>
                <MessageBox align='right'>Это анонимный мессенджер. Удобное приложение для анонимного общения и знакомств)</MessageBox>
                <MessageBox align='left'>Ой, куда это мы попали?</MessageBox>
            </MessageList>
        </Panel>
    )
}

export default Scheme;
