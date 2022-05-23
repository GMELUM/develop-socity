import { RecoilRoot } from 'recoil';
import { render } from 'react-dom';
import { startup } from 'engine';
import { StrictMode } from 'react';
import bridge from '@vkontakte/vk-bridge';
import App from './App';
import client from 'engine/elum.socket/client';

import 'style.css';

document.addEventListener("contextmenu", (e) => e.preventDefault());

startup((params) => {

    const auth = Object.fromEntries(params);

    client.open({
        url: "wss://dev.elum.team/socket",
        params: auth
    })

    const app = document.getElementById('app');
    render(
        <RecoilRoot>
            <StrictMode>
                <App />
            </StrictMode>
        </RecoilRoot>,
        app, () => bridge.send("VKWebAppInit")
    );

});
