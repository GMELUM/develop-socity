import { useRoute } from 'engine';
import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent } from 'package';
import { FC } from 'react';

interface IBug {
    nav: string;
};

const Bug: FC<IBug> = ({ ...prevProps }) => {
    const { backPage } = useRoute();
    return (
        <Panel { ...prevProps }>
            <PanelHeader before={<PanelHeaderBack onClick={() => backPage()} />}>
                <PanelHeaderContent string={'Сообщить о баге'} substring={'Сообщить о неисправности'} />
            </PanelHeader>
        </Panel>
    )
}

export default Bug;
