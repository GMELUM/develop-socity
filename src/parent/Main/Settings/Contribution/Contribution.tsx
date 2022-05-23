import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IContribution {
    nav: string;
};

const Contribution: FC<IContribution> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Сотрудничество'} substring={'Сотрудничество и реклама'} />
            </PanelHeader>
        </Panel>
    )
}

export default Contribution;
