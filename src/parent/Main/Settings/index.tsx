import { FC } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Feed,
    Footer,
    SimpleCell,
    Separator,
    ToggleCell,
    LineItems,
    ItemInfo
} from 'package';

import {
    Icon28ImageFilterOutline,
    Icon243SquareOutline,
    Icon28Notifications,
    Icon28PaymentCardOutline,
    Icon28BugOutline,
    Icon28Users3Outline,
    Icon28CubeBoxOutline,
    Icon28ArticleOutline,
    Icon28HelpOutline
} from '@vkontakte/icons';
import { useRoute } from 'engine';

interface ISettings {
    nav: string
};

const Settings: FC<ISettings> = ({ nav }) => {
    const { nextPage } = useRoute();

    const propsIcon = { width: 28, height: 28 }

    const handleClick = (value: string) => nextPage({ activePanel: value });

    return (
        <Panel nav={nav} header={
            <PanelHeader >
                <PanelHeaderContent string={'Настройки'} substring={'Настройка приложения'} />
            </PanelHeader>
        }>
            <Feed columns={1}>

                <SimpleCell before={<Icon28ImageFilterOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_theme")}>Внешний вид</SimpleCell>

                <SimpleCell before={<Icon243SquareOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_function")}>Дополнительные функции</SimpleCell>

                <SimpleCell before={<Icon28PaymentCardOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_billing")}>Подписка</SimpleCell>

                <SimpleCell before={<Icon28Notifications {...propsIcon} />}
                    onClick={() => handleClick("setting_notification")}>Уведомления</SimpleCell>

                <Separator size='large' />

                <SimpleCell before={<Icon28HelpOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_reference")}>Справка</SimpleCell>

                <SimpleCell before={<Icon28BugOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_bug")}>Сообщить о баге</SimpleCell>

                <SimpleCell before={<Icon28Users3Outline {...propsIcon} />}
                    onClick={() => handleClick("setting_contribution")}>Сотрудничество</SimpleCell>

                <SimpleCell before={<Icon28ArticleOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_policies")}>Политика конфиденциальности</SimpleCell>

                <SimpleCell before={<Icon28CubeBoxOutline {...propsIcon} />}
                    onClick={() => handleClick("setting_user_data")}>Запросить данные</SimpleCell>

                <Footer>
                    <LineItems>
                        <ItemInfo string="v3.0.0" />
                        {/* <ItemInfo string="ELUM UI" substring="v1.0.0" /> */}
                    </LineItems>
                </Footer>
            </Feed>
        </Panel>
    )
}

export default Settings;