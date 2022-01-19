import React, { useContext } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import './messenger.css';
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';
import { useState } from 'react';

export default function Messenger() {
    const [inputText, setInputText] = useState('');
    const { userData } = useContext(UserContext);
    const { sendMessage, messages } = useContext(SocketContext);
    console.log(messages);
    const handleClickSend = (e) => {
        e.preventDefault();
        sendMessage({ message: inputText, userId: userData.id, receiverId: 1 });
        setInputText('');
    };
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        type="search"
                        placeholder="Search for friend"
                        className="chatMenuInput"
                    />
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {messages.map((item, index) => (
                            <Message
                                message={item.message}
                                key={index}
                                own={userData.id === item.userId}
                                userData={userData}
                            />
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            className="chatMessageInput"
                            placeholder="write somthing..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        ></textarea>
                        <button
                            className="chatSubmitButton"
                            onClick={handleClickSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
    );
}
