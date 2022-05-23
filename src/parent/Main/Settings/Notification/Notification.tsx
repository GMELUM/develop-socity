import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface INotification {
    nav: string;
};

const Notification: FC<INotification> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Уведомления'} substring={'Уведомиления в сервисе'} />
            </PanelHeader>
        </Panel>
    )
}

export default Notification;
