import { FC, HTMLAttributes } from 'react';
import { useRoute } from 'engine';
import { Feed, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, SimpleCell } from 'package';
import {
    Icon28PaletteOutline,
    Icon28PictureStackOutline,
    Icon24TextOutline,
    Icon28MessagesOutline
} from '@vkontakte/icons';

interface ITheme extends HTMLAttributes<HTMLDivElement> {
    nav: string;
};

const Theme: FC<ITheme> = ({ ...prevProps }) => {
    
    const { backPage, nextPage } = useRoute();
    const propsIcon = { width: 28, height: 28 }
    const handleClick = (value: string) => nextPage({ activePanel: value });

    return (
        <Panel {...prevProps}>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Внешний вид'} substring={'Кастомизация внешнего вида'} />
            </PanelHeader>
            <Feed columns={1}>

                <SimpleCell before={<Icon28PaletteOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_theme_scheme")}>Цветовая схема</SimpleCell>

                <SimpleCell before={<Icon28PictureStackOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_theme_background")}>Фон бесед</SimpleCell>

                <SimpleCell before={<Icon24TextOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_theme_textsize")}>Размер текста</SimpleCell>

                <SimpleCell before={< Icon28MessagesOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_theme_message")}>Стиль сообщений</SimpleCell>

            </Feed>
        </Panel >
    )
}

export default Theme;
