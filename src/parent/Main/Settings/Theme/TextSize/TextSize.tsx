import { useRoute } from 'engine';
import { MessageBox, MessageList, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC, HTMLAttributes } from 'react';
import Footer from './elements/Footer';

interface ITextSize extends HTMLAttributes<HTMLDivElement> {
    nav: string;
};

const TextSize: FC<ITextSize> = ({ ...prevProps }) => {
    const { backPage } = useRoute();

    return (
        <Panel {...prevProps} safeBottom={false} footer={<Footer />}>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Размер текста'} substring={'Настройка текста'} />
            </PanelHeader>
            <MessageList reverse style={{ fontSize: `var(--preview-text-size)` }}>
                <MessageBox align='right'>Это же фильм "Достучаться до небес"?</MessageBox>
                <MessageBox align='left'>"На небе только и разговоров, что о море и о закате. Там говорят о том, как чертовски здорово наблюдать за огромным огненным шаром, как он тает в волнах. И еле видимый свет, словно от свечи, горит где-то в глубине…"</MessageBox>
                <MessageBox align='right'>Привет, какой твой любимый фильм?</MessageBox>
            </MessageList>
        </Panel>
    )
}

export default TextSize;
