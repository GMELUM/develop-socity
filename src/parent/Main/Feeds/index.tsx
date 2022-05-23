import { FC } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderContent,
    SafeDiv,
    Feed,
    Сlickable,
} from 'package';

interface IFeeds {
    nav: string
};

const Feeds: FC<IFeeds> = ({ nav }) => {
    return (
        <Panel nav={nav} header={<PanelHeader >
            <PanelHeaderContent string={'Лента'} substring={'Популярные люди'} />
        </PanelHeader>}>
            <SafeDiv>
                <Feed columns={3}>
                    {Array(70).fill("").map((items, index) =>
                        <Сlickable key={index}
                            onTouch={(e) => console.log(e.type)}
                            onSingle={() => console.log("single")}
                            onDouble={() => console.log("double")}
                            onLong={() => console.log("long click")}
                            onContext={(e) => console.log("right click")}
                        ><div>{index}</div></Сlickable>)}
                </Feed>
            </SafeDiv>
        </Panel>
    )
}

export default Feeds;
