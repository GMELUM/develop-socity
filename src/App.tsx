import { useRoute } from 'engine';
import { useEvents } from 'engine/elum.socket/client';
import { ACTIVE_VIEW } from 'engine/state';
import { Root } from 'package';
import { Loading, Main } from 'parent';
import { FC, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

interface IApp { };

const App: FC<IApp> = () => {
    const { backPage } = useRoute();
    const activeView = useRecoilValue(ACTIVE_VIEW);

    useEffect(() => {
        window.addEventListener('popstate', () => backPage());
        window.history.pushState(undefined, "");
    }, []);

    useEvents((event, value) => {
        switch (event) {
            case "OPEN": console.log(event); break;
            case "CONNECT": console.log(event); break;
            case "CLOSE": console.log(event); break;
            case "ERROR": console.log(event); break;
            case "ABORT": console.log(event); break;
        }
    })

    return (
        <Root activeView={activeView}>
            <Loading nav='loading' />
            <Main nav='main' />
        </Root>
    )
}

export default App;
