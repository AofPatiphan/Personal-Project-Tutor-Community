import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { API_ENDPOINT_URL } from '../config/env';
import io from 'socket.io-client';
const UserContext = createContext();

function UserContextProvider(props) {
    const [userData, setUserData] = useState(null);
    const [allFriend, setAllFriend] = useState([]);
    const [allRequestFriend, setAllRequestFriend] = useState([]);
    const [profileCard, setProfileCard] = useState([]);
    const [socket, setSocket] = useState(null);
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
            setSocket(newSocket);
            fetchUser();
        }
    }, [token]);

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
        const res = await axios.get(`/friend`);
        setAllFriend(res.data.users || {});
    };
    useEffect(() => {
        getAllFriend();
    }, []);

    // Get Allfriends Request ใช้กับหน้า search
    const getAllRequest = async (id) => {
        const res = await axios.get(`/friend/${id}`);
        setAllRequestFriend(res.data.users || {});
    };
    useEffect(() => {
        getAllRequest();
    }, []);

    // search จากชื่อ
    const getUserById = async (name) => {
        const res = await axios.get(`/user/name/${name}`);
        setProfileCard(res.data.user || {});
    };
    useEffect(() => {
        getUserById();
    }, []);

    if (!userData) {
        return <></>;
    }

    return (
        <UserContext.Provider
            value={{
                userData,
                fetchUser,
                setUserData,
                request,
                allFriend,
                profileCard,
                getUserById,
                socket,
                setSocket,
                getAllFriend,
                allRequestFriend,
                getAllRequest,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
