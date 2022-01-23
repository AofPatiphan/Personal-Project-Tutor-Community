import './conversation.css';
import { useNavigate } from 'react-router-dom';

export default function Conversation({ room }) {
    const navigate = useNavigate();
    return (
        <div
            className="conversation"
            onClick={() => {
                navigate(`/messenger/${room.friendId}`);
            }}
        >
            <img src={room.profileUrl} alt="" className="conversationImg" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="conversationName"></span>
                {room.firstName} {room.lastName}
                <span className="conversationName" style={{ fontSize: '13px' }}>
                    {room.message}
                </span>
            </div>
        </div>
    );
}
