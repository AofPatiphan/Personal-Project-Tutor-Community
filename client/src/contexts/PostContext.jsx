import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const PostContext = createContext();

function PostContextProvider(props) {
    const [postHome, setPostHome] = useState([]);
    const [postProfile, setPostProfile] = useState([]);
    const [title, setTitle] = useState('');

    // Get data home
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get('/post/all');
            setPostHome(res.data.posts);
        };
        fetchPost();
    }, []);

    // Get data profile
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get('/post/');
            setPostProfile(res.data.posts);
        };
        fetchPost();
    }, []);

    const addPost = async ({ title }) => {
        const res = await axios.post('/post', {
            postContent: title,
        });
        const nextPost = [res.data.post, ...postHome];
        console.log(res.data);
        setPostHome(nextPost);
    };

    // const updateTodo = async (id, value) => {
    //     const idx = todoList.findIndex((item) => item.id === id);
    //     const newTodoList = [...todoList];
    //     if (idx !== -1) {
    //         newTodoList[idx] = { ...newTodoList[idx], ...{ title: value } };
    //     }
    //     console.log(newTodoList[idx]);
    //     const res = await axios.put(`/post/${id}`, newTodoList[idx]);
    //     setTodoList(newTodoList);
    // };

    // const deleteTodo = async (id) => {
    //     const res = await axios.delete(`/post/${id}`);
    //     const newTodo = todoList.filter((item) => item.id !== id);
    //     setTodoList(newTodo);
    // };

    return (
        <PostContext.Provider
            value={{
                postHome,
                postProfile,
                addPost,
                title,
                setTitle,
                // todoList,
                // addTodo,
                // setTodoList,
                // updateTodo,
                // deleteTodo,
                // text,
                // setText,
                // status,
                // setStatus,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;
export { PostContext };
