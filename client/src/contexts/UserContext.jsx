import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { API_ENDPOINT_URL } from '../config/env';
import io from 'socket.io-client';
const UserContext = createContext();

function UserContextProvider(props) {
    const [userData, setUserData] = useState([]);
    const [friend, setFriend] = useState([]);
    const [allFriend, setAllFriend] = useState([]);
    const [profileCard, setProfileCard] = useState([]);
    const [socket, setSocket] = useState(null);
    // Get data profile

    // Get data profile
    const token = localStorage.getItem('token');

    const fetchUser = async (tokenInput) => {
        const a = jwtDecode(token || tokenInput);
        const res = await axios.get(`/user/${a.username}`);
        setUserData(res.data.user);
    };
    useEffect(() => {
        if (token) {
            const newSocket = io.connect(API_ENDPOINT_URL, {
                query: {
                    token: localStorageService.getToken(),
                },
            });
            console.log('connect');
            setSocket(newSocket);
            fetchUser();
        }
    }, [token]);

    const getAllFriendRequest = async () => {
        const res = await axios.get('/friend');
        setFriend(res.data.friends);
    };
    useEffect(() => {
        getAllFriendRequest();
    }, []);

    // request friend
    const request = async ({ receiver, requester }) => {
        console.log(receiver);
        const res = await axios.post(`/friend`, {
            requestToId: receiver,
            requestById: requester,
        });
    };

    // Get Allfriends
    const getAllFriend = async (id) => {
        const res = await axios.get(`/friend/`);
        setAllFriend(res.data.users || {});
    };
    useEffect(() => {
        getAllFriend();
    }, []);

    const getUserById = async (name) => {
        const res = await axios.get(`/user/name/${name}`);
        setProfileCard(res.data.user || {});
    };
    useEffect(() => {
        getUserById();
    }, []);

    // const updatePost = async (id, value) => {
    //     const idx = post.findIndex((item) => item.id === id);
    //     const newPost = [...post];
    //     if (idx !== -1) {
    //         newPost[idx] = { ...newPost[idx], ...{ caption: value } };
    //     }
    //     console.log(newPost[idx]);
    //     const res = await axios.put(`/post/${id}`, newPost[idx]);
    //     setPostHome(newPost);
    // };

    // // const deleteTodo = async (id) => {
    // //     const res = await axios.delete(`/post/${id}`);
    // //     const newTodo = todoList.filter((item) => item.id !== id);
    // //     setTodoList(newTodo);
    // // };

    return (
        <UserContext.Provider
            value={{
                userData,
                fetchUser,
                setUserData,
                request,
                friend,
                allFriend,
                profileCard,
                getAllFriendRequest,
                getUserById,
                socket,
                setSocket,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
