import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IBilling {
    nav: string;
};

const Billing: FC<IBilling> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Подписка'} substring={'Управление подпиской'} />
            </PanelHeader>
        </Panel>
    )
}

export default Billing;
