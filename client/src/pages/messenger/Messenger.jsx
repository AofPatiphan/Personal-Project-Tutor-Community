import React, { useContext, useEffect } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import './messenger.css';
import { UserContext } from '../../contexts/UserContext';
import { SocketContext } from '../../contexts/SocketContext';
import { ChatContext } from '../../contexts/ChatContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

export default function Messenger() {
    const [inputText, setInputText] = useState('');
    const { userData } = useContext(UserContext);
    const { sendMessage, messages, fetchMessage } = useContext(SocketContext);
    const { chatRoom, fetchFriendList } = useContext(ChatContext);
    const chatboxRef = useRef(null);

    console.log(messages);
    const handleClickSend = (e) => {
        e.preventDefault();
        sendMessage({ message: inputText, userId: userData.id });
        setInputText('');
    };
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetchMessage(id);
        }
        fetchFriendList();
    }, [id]);

    useEffect(() => {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    });

    // if(chatroom){

    // }
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        type="search"
                        placeholder="Search for friend"
                        className="chatMenuInput"
                    />
                    {chatRoom.map((item) => (
                        <Conversation
                            room={item}
                            key={item.id}
                            userData={userData}
                            fetchMessage={fetchMessage}
                        />
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop" ref={chatboxRef}>
                        {messages.map((item, index) => (
                            <Message
                                message={item}
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
