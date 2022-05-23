import { FC } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderContent,
    Feed,
    MessageCell
} from 'package';
import Avatar from 'package/components/Avatar/Avatar';

interface IDialogs {
    nav: string
};

const Dialogs: FC<IDialogs> = ({ nav }) => {

    return (
        <Panel nav={nav} header={<PanelHeader >
            <PanelHeaderContent string={'Сообщения'} substring={'Нет сообщений'} />
        </PanelHeader>}>

            <Feed columns={1}>
                {Array(100).fill("").map((items, index) =>
                    <MessageCell key={`mesage_${index}`} 
                    before={<Avatar size={54} src='https://sun1-97.userapi.com/s/v1/ig2/t4ADWtdfDrZSCXqXN5kt_G8ETKZvJ53VMs4ZIUNloWla_fic14hOCv6K2zTerITINbP4Xjfjc0g4RdjHI5ImSMsY.jpg?size=200x200&quality=95&crop=0,351,1120,1120&ava=1'/>}
                    after={<></>}
                    title={"Ангелина Индюкова"}
                    subtext={"Привет! Что насчет собраться на шашлыки в следующуую пятницу"}/>
                )}
            </Feed>

        </Panel>
    )
}

export default Dialogs;