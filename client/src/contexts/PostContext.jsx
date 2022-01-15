import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PostContext = createContext();

function PostContextProvider(props) {
    const [postHome, setPostHome] = useState([]);
    const [postProfile, setPostProfile] = useState([]);
    const [title, setTitle] = useState('');
    const [visible, serVisible] = useState(false);
    const [hideboxPost, setHideboxPost] = useState(false);
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

    const updatePost = async (id, value) => {
        const idx = postHome.findIndex((item) => item.id === id);
        const newPost = [...postHome];
        if (idx !== -1) {
            newPost[idx] = { ...newPost[idx], ...{ postContent: value } };
        }
        console.log(newPost[idx]);
        const res = await axios.put(`/post/${id}`, newPost[idx]);
        setPostHome(newPost);
    };

    const deletePost = async (id) => {
        const res = await axios.delete(`/post/${id}`);
        const newPost = postHome.filter((item) => item.id !== id);
        setPostHome(newPost);
    };

    return (
        <PostContext.Provider
            value={{
                postHome,
                postProfile,
                addPost,
                title,
                setTitle,
                updatePost,
                deletePost,
                visible,
                serVisible,
                hideboxPost,
                setHideboxPost,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;
export { PostContext };
