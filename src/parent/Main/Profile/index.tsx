import { FC, useState } from 'react';
import {
    Panel,
    PanelHeader,
    ProfileCard,
    SafeDiv,
    PanelHeaderContent,
    LineItems,
    ItemInfo,
    Button,
    Feed,
    Separator,
    RatioDiv,
    InputRange
} from 'package';

interface IProfile {
    nav: string
};

const posts = [
    'https://sun9-23.userapi.com/impg/jL_8Z7lB-e9d4nllAzXKtyrb-QE2N6574HvsiA/DH2bRJ_NUUI.jpg?size=842x1080&quality=95&sign=4ffd7c2584024b26ad42818455520778&type=album',
    'https://sun9-23.userapi.com/impg/N3bR-afs5s2Qs26COTPovD1tljhTFX-09APOmw/Dub1aE03dKk.jpg?size=801x1080&quality=96&sign=4718f8e8d9ee378fd516f6097f162aa5&type=album',
    'https://sun9-34.userapi.com/impg/QQyNU5z9xaF4wsBP3QX-d5WgZV3pFHDpOGGz_Q/8rpavNzshPc.jpg?size=802x1080&quality=96&sign=7973d04d540f2c4d9c14de7fdeebe8e0&type=album',
    'https://sun9-46.userapi.com/impf/c850608/v850608363/3a982/1MzTFDa2o0Y.jpg?size=852x1080&quality=96&sign=d27439d57e721392232dd58af67c5fb6&type=album',
    'https://sun9-88.userapi.com/impf/c855720/v855720771/d38f3/loZTjDUskXw.jpg?size=810x1080&quality=96&sign=31cbd56f40e5818789256022b0eaf61b&type=album',
    'https://sun9-87.userapi.com/impf/c850420/v850420831/150169/nc1SLVSJ6Sk.jpg?size=810x1080&quality=96&sign=bb252a67161c6b917b0ad4211059df8b&type=album',
    'https://sun9-80.userapi.com/impf/c855036/v855036109/75038/1B1BREFH0dk.jpg?size=810x1080&quality=96&sign=e4d33eb112d123454e5e9f744aef48d7&type=album',
    // 'https://sun9-1.userapi.com/impf/c849220/v849220074/f14fe/iJb3hAVf3zY.jpg?size=613x1080&quality=96&sign=c7db8fe7ad00ee43f0319d27f232d0fe&type=album',
    // 'https://sun9-32.userapi.com/impf/c846218/v846218375/fad81/4Uqd4dDa1_4.jpg?size=794x1080&quality=96&sign=7eec08cd0fccb849ba1769cc1e43e542&type=album',
    // 'https://sun9-82.userapi.com/impf/c851324/v851324475/6194a/eawgKHlVIE0.jpg?size=681x1080&quality=96&sign=e5a29aead4a47650f53b75e994621288&type=album',
    // 'https://sun9-5.userapi.com/impf/c847221/v847221140/1b7e4d/1W85_6gtRBM.jpg?size=810x1080&quality=96&sign=11a3616504b35b1f327fe053ac59a508&type=album',
    // 'https://sun9-39.userapi.com/impf/c852320/v852320831/14ff1f/diy1pngzm30.jpg?size=810x1080&quality=96&sign=d0863b45a2241a4aa3171bac6361be81&type=album',
    // 'https://sun9-14.userapi.com/impg/btqiLJILIHxcFbV-VgaTXcf64NOi_SVj8zO2BA/uyJ7w8OjW9M.jpg?size=595x1080&quality=96&sign=31bb45818f5e7f459e857240a168c539&type=album',
    // 'https://sun9-79.userapi.com/impf/c853516/v853516044/11908a/2wvGCEZcOkY.jpg?size=1280x960&quality=96&sign=e4f9e0c02ebf9849d6eb2ef5b7df04f8&type=album',

]

const Profile: FC<IProfile> = ({ nav }) => {

    const supportRecord = () => {
        // const getUserMedia = (navigator as any).getUserMedia ||
        //     (navigator as any).webkitGetUserMedia ||
        //     (navigator as any).mozGetUserMedia;


        if ("getUserMedia" in navigator) { 
            console.log("support microphone")
         }


        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((media) => {
                const record = new MediaRecorder(media);
                record.start();
                console.log(record.state);
            })
            .catch((err) => console.log(err))
    }

    const [[r1, r2, r3, r4], setRange] = useState<Array<string | number>>([0, 0, 0, 0])

    return (
        <Panel nav={nav} header={<PanelHeader >
            <PanelHeaderContent string={'Профиль'} substring={"@indyukova0"} />
        </PanelHeader>}>
            <SafeDiv>
                <ProfileCard />
                <LineItems>
                    <ItemInfo string={`${posts.length}`} substring='Постов' />
                    <ItemInfo string='1к' substring='Подписчиков' />
                    <ItemInfo string='731' substring='Подписок' />
                </LineItems>
                <LineItems>
                    <Button disabled streched size='l' mode='default'>Сообщения</Button>
                    <Button onClick={supportRecord} streched size='l' mode='default'>Подписаться</Button>
                </LineItems>
                <Separator size='large' />
                <Feed columns={1}>
                    <InputRange min={0} max={100} value={r1} onChange={(c) => setRange([c, r2, r3, r4])} />
                    <InputRange mode='bubbles' min={13} max={23} value={r2} onChange={(c) => setRange([r1, c, r3, r4])} />
                    <InputRange mode='strokes' min={0} max={10} value={r3} onChange={(c) => setRange([r1, r2, c, r4])} />
                    <InputRange title='Акцент' mode='hue' min={0} max={360} value={r4} onChange={(c) => setRange([r1, r2, r3, c])} />
                </Feed>
            </SafeDiv>
        </Panel>
    )
}

export default Profile;