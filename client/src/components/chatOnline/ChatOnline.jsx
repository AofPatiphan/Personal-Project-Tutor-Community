import './chatOnline.css';

export default function ChatOnline() {
    return (
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img
                    className="chatOnlineImg"
                    src="https://res.cloudinary.com/dbtlgaii3/image/upload/v1642433118/wnq1u0q941xkkrmjwjej.jpg"
                    alt=""
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">John Doe</span>
        </div>
    );
}
