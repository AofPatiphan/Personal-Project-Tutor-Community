import axios from '../config/axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const SocketContext = createContext();

function SocketContextProvider(props) {
    const { socket, setSocket } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [roomId, setRoomId] = useState([]);

    //receive message

    // send message

    useEffect(() => {
        socket?.on('receive_message', ({ message }) => {
            setMessages((currentMessage) => [...currentMessage, ...message]);
        });
        socket?.on('room-data', ({ roomData, chatRoomId }) => {
            console.log(roomData);
            setRoomId(chatRoomId);
            const temp = roomData.map((item) => {
                return {
                    message: item.message,
                    userId: item.User.id,
                    profileUrl: item.User.profileUrl,
                    firstName: item.User.firstName,
                    lastName: item.User.lastName,
                    time: item.createdAt,
                };
            });
            setMessages(temp);
        });
    }, [socket]);

    const sendMessage = ({ message, userId }) => {
        console.log(message);
        socket.emit('send_message', {
            message,
            userId,
        });
    };

    const fetchMessage = async (id) => {
        socket.emit('join', { friendId: id });
    };

    return (
        <SocketContext.Provider value={{ sendMessage, messages, fetchMessage }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
export { SocketContext };
