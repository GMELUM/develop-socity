import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IUserData {
    nav: string;
};

const UserData: FC<IUserData> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel {...prevProps}>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Запросить данные'} substring={'Ваши данные'} />
            </PanelHeader>
        </Panel>
    )
}

export default UserData;
