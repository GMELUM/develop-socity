import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IPolicies {
    nav: string;
};

const Policies: FC<IPolicies> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Политика конфиденциальности'} substring={'Политика хранения данных'} />
            </PanelHeader>
        </Panel>
    )
}


export default Policies;
