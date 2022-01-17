import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
const UserContext = createContext();

function UserContextProvider(props) {
    const [userData, setUserData] = useState([]);

    // Get data home
    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const res = await axios.get('/post/all');
    //         setPostHome(res.data.posts);
    //     };
    //     fetchPost();
    // }, []);

    // Get data profile
    const token = localStorage.getItem('token');
    const fetchUser = async (tokenInput) => {
        const a = jwtDecode(token || tokenInput);
        const res = await axios.get(`/user/${a.username}`);
        setUserData(res.data.user);
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    // const addPost = async ({ title }) => {
    //     const res = await axios.post('/post', {
    //         caption: title,
    //     });
    //     const nextPost = [res.data.post, ...post];
    //     console.log(res.data);
    //     setPostHome(nextPost);
    // };

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
        <UserContext.Provider value={{ userData, fetchUser, setUserData }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
