import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
const UserContext = createContext();

function UserContextProvider(props) {
    const [userData, setUserdata] = useState([]);

    // Get data home
    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const res = await axios.get('/post/all');
    //         setPostHome(res.data.posts);
    //     };
    //     fetchPost();
    // }, []);

    // Get data profile
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/user');
            setUserdata(res.data.users);
        };
        fetchUser();
    }, []);

    // const addPost = async ({ title }) => {
    //     const res = await axios.post('/post', {
    //         postContent: title,
    //     });
    //     const nextPost = [res.data.post, ...postHome];
    //     console.log(res.data);
    //     setPostHome(nextPost);
    // };

    // const updatePost = async (id, value) => {
    //     const idx = postHome.findIndex((item) => item.id === id);
    //     const newPost = [...postHome];
    //     if (idx !== -1) {
    //         newPost[idx] = { ...newPost[idx], ...{ postContent: value } };
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
        <UserContext.Provider value={{ userData }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
export { UserContext };
