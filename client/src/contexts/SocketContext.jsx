import axios from '../config/axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const SocketContext = createContext();

function SocketContextProvider(props) {
    const { socket, setSocket } = useContext(UserContext);
    const [messages, setMessages] = useState([]);

    //receive message

    // send message

    useEffect(() => {
        socket?.on('receive_message', ({ message }) => {
            setMessages((currentMessage) => [...currentMessage, ...message]);
        });
    }, [socket]);

    const sendMessage = ({ message, userId, receiverId }) => {
        console.log(message);
        socket.emit('send_message', {
            message,
            userId,
            receiverId,
        });
    };

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider;
export { SocketContext };
