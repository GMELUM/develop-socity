import { ACTIVE_PAGE, ACTIVE_PANEL } from 'engine/state';
import { Action, ActionItem, View } from 'package';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Profile from './Profile';
import Feeds from './Feeds';
import Dialogs from './Dialogs';
import Settings from './Settings';

import {
    Icon28Profile,
    Icon28Cards2Outline,
    Icon28SettingsOutline,
    Icon28MessageOutline
} from '@vkontakte/icons';

import Avatar from 'package/components/Avatar/Avatar';
import Theme from './Settings/Theme/Theme';
import Function from './Settings/Function/Function';
import Billing from './Settings/Billing/Billing';
import Notification from './Settings/Notification/Notification';
import Bug from './Settings/Bug/Bug';
import Contribution from './Settings/Contribution/Contribution';
import Policies from './Settings/Policies/Policies';
import UserData from './Settings/UserData/UserData';
import Reference from './Settings/Reference/Reference';
import TextSize from './Settings/Theme/TextSize/TextSize';
import Scheme from './Settings/Theme/Scheme/Scheme';
import Background from './Settings/Theme/Background/Background';
import StyleMessage from './Settings/Theme/StyleMessage/StyleMessage';

interface IMain {
    nav: string;
};

const Main: FC<IMain> = () => {

    const activePanel = useRecoilValue(ACTIVE_PANEL);
    const activePage = useRecoilValue(ACTIVE_PAGE);

    const [panel, setPanel] = useState("profile");

    return (
        <View activePanel={activePanel}>

            <Action className='' activePage={panel} nav='default' bar={<>
                <ActionItem
                    selected={panel === "profile"}
                    onClick={() => setPanel("profile")}>{false ? <Icon28Profile /> : <Avatar size={28} src='https://sun1-97.userapi.com/s/v1/ig2/t4ADWtdfDrZSCXqXN5kt_G8ETKZvJ53VMs4ZIUNloWla_fic14hOCv6K2zTerITINbP4Xjfjc0g4RdjHI5ImSMsY.jpg?size=200x200&quality=95&crop=0,351,1120,1120&ava=1' />}</ActionItem>
                <ActionItem
                    selected={panel === "dialogs"}
                    onClick={() => setPanel("dialogs")}><Icon28MessageOutline /></ActionItem>
                <ActionItem
                    selected={panel === "feeds"}
                    onClick={() => setPanel("feeds")}><Icon28Cards2Outline /></ActionItem>
                <ActionItem
                    selected={panel === "settings"}
                    onClick={() => setPanel("settings")}><Icon28SettingsOutline /></ActionItem>
            </>}>
                <Profile nav='profile' />
                <Feeds nav='feeds' />
                <Dialogs nav='dialogs' />
                <Settings nav='settings' />
            </Action>

            <Theme nav='setting_theme' />
            <Scheme nav='setting_theme_scheme' />
            <Background nav='setting_theme_background' />
            <TextSize nav='setting_theme_textsize' />
            <StyleMessage nav='setting_theme_message' />

            <Function nav='setting_function' />
            <Billing nav='setting_billing' />
            <Notification nav='setting_notification' />

            <Reference nav='setting_reference' />
            <Bug nav='setting_bug' />
            <Contribution nav='setting_contribution' />
            <Policies nav='setting_policies' />
            <UserData nav='setting_user_data' />

        </View>
    )
}

export default Main;