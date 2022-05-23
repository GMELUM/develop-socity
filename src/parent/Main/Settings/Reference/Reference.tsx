import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IReference {
    nav: string;
};

const Reference: FC<IReference> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Справка'} substring={'Справка о сервисе'} />
            </PanelHeader>
        </Panel>
    )
}

export default Reference;
