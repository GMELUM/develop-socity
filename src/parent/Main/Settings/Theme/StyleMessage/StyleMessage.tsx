import { FC, HTMLAttributes } from 'react';
import { useRoute } from 'engine';
import { Feed, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';

interface IStyleMessage extends HTMLAttributes<HTMLDivElement> {
    nav: string;
};

const StyleMessage: FC<IStyleMessage> = ({ ...prevProps }) => {
    const { backPage } = useRoute();

    return (
        <Panel {...prevProps}>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Стиль сообщений'} substring={'Настройка сообщений'} />
            </PanelHeader>
            <Feed columns={1}>

            </Feed>
        </Panel >
    )
}

export default StyleMessage;
