import { useRoute } from 'engine';
import { Feed, FooterCells, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, SimpleCell, ToggleCell, ToggleSwitch } from 'package';
import { FC, useState } from 'react';

interface IFunction {
    nav: string;
};

const Function: FC<IFunction> = ({ ...prevProps }) => {
    const { backPage } = useRoute();

    const [value, setValue] = useState(false);

    return (
        <Panel safeBottom={false} {...prevProps} footer={
            <FooterCells>
                <SimpleCell onClick={() => backPage()}>Отмена</SimpleCell>
                <SimpleCell>Принять</SimpleCell>
            </FooterCells >
        }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Дополнительные функции'} substring={'Управление функциями'} />
            </PanelHeader>

            <Feed columns={1}>
                <ToggleCell>Вибрация</ToggleCell>
                <ToggleCell>Приветствие при встряхивании</ToggleCell>
                <ToggleCell>Меню при долгом нажатии</ToggleCell>
                <ToggleCell>Фильтрация вложений</ToggleCell>
            </Feed>


        </Panel>
    )
}

export default Function;
