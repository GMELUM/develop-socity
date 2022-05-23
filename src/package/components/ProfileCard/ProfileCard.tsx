import { FC } from 'react';
import Avatar from '../Avatar/Avatar';
import "./ProfileCard.css";

interface IProfileCard { };

const ProfileCard: FC<IProfileCard> = () => {
    return (
        <div className='ProfileCard'>
            <div className='ProfileCard_avatar'>
                <span><Avatar src='https://sun1-97.userapi.com/s/v1/ig2/t4ADWtdfDrZSCXqXN5kt_G8ETKZvJ53VMs4ZIUNloWla_fic14hOCv6K2zTerITINbP4Xjfjc0g4RdjHI5ImSMsY.jpg?size=200x200&quality=95&crop=0,351,1120,1120&ava=1' /></span></div>
            <div className='ProfileCard_info'>
                <div className='ProfileCard_top'><span>Ангелина</span></div>
                <div className='ProfileCard_center'><span>Индюкова</span></div>
                <div className='ProfileCard_bottom'><span>@indyukova0</span></div>
            </div>
        </div>
    )
}

export default ProfileCard;
