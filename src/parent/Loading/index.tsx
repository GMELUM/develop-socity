import { FC } from 'react';
import {
    Centered,
    Panel,
    View,
    Spinner,
    useTimeout
} from 'package';
import { useRecoilValue } from 'recoil';
import { ACTIVE_PANEL} from 'engine/state';
import { useRoute } from 'engine';

interface ILoading {
    nav: string
};

const Loading: FC<ILoading> = () => {

    const { nextPage } = useRoute();
    const activePanel = useRecoilValue(ACTIVE_PANEL);
    
    useTimeout(() => {
        nextPage({ activeView: "main" });
    }, 5000);

    return (
        <View activePanel={activePanel}>
            <Panel fixed nav='default'>
                <Centered>
                    <Spinner size='large' />
                </Centered>
            </Panel>
        </View>
    )
}

export default Loading;