import './chatOnline.css';
import { useNavigate } from 'react-router-dom';

export default function ChatOnline({ item }) {
    const navigate = useNavigate();

    const handleClickOpenChat = async () => {
        navigate(`/messenger/${item.id}`);
    };
    return (
        <div className="chatOnlineFriend" onClick={handleClickOpenChat}>
            <div className="chatOnlineImgContainer">
                <img
                    className="chatOnlineImg"
                    src={`${item.profileUrl}`}
                    alt=""
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">
                {item.firstName} {item.lastName}
            </span>
        </div>
    );
}
