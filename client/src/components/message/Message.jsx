import './message.css';

export default function Message({ own, message, userData }) {
    console.log(message);
    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        own
                            ? userData.profileUrl
                            : 'https://res.cloudinary.com/dbtlgaii3/image/upload/v1642433118/wnq1u0q941xkkrmjwjej.jpg'
                    }
                    alt=""
                />
                <p className="messageText">{message}</p>
            </div>
            <div className="messageBottim">1 hour ago</div>
        </div>
    );
}
