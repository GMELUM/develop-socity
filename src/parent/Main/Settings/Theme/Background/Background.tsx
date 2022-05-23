import { FC, HTMLAttributes } from 'react';
import { useRoute } from 'engine';
import { Feed, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';;

interface IBackground extends HTMLAttributes<HTMLDivElement> {
    nav: string;
};

const Background: FC<IBackground> = ({ ...prevProps }) => {
    const { backPage } = useRoute();

    return (
        <Panel {...prevProps}>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Фон бесед'} substring={'Настройка фона'} />
            </PanelHeader>
            <Feed columns={1}>

            </Feed>
        </Panel >
    )
}

export default Background;
