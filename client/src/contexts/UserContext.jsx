import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
const UserContext = createContext();

function UserContextProvider(props) {
    const [userData, setUserData] = useState([]);
    const [friend, setFriend] = useState([]);
    const [allFriend, setAllFriend] = useState([]);
    // Get data profile
    const token = localStorage.getItem('token');
    const fetchUser = async (tokenInput) => {
        const a = jwtDecode(token || tokenInput);
        const res = await axios.get(`/user/${a.username}`);
        setUserData(res.data.user);
    };
    console.log(allFriend);

    useEffect(() => {
        if (token) {
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
        console.log(res.data.users);
    };
    useEffect(() => {
        getAllFriend();
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
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
