import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';

const PostContext = createContext();

function PostContextProvider(props) {
    const [post, setPostHome] = useState([]);
    const [postProfile, setPostProfile] = useState([]);
    const [title, setTitle] = useState('');
    const [visible, serVisible] = useState(false);
    const [hideboxPost, setHideboxPost] = useState(false);
    // Get data home
    const fetchPost = async () => {
        const res = await axios.get('/post/');
        setPostHome(res.data.usersPost);
    };

    useEffect(() => {
        fetchPost();
    }, []);
    // Get data profile
    const fetchPostProfile = async (username) => {
        const res = await axios.get(`/post/${username}`);
        setPostProfile(res.data.posts);
    };
    useEffect(() => {
        fetchPostProfile();
    }, []);

    const addPost = async ({ title, picture }) => {
        const res = await axios.post('/post', {
            caption: title,
            pictureUrl: picture,
        });
        const nextPost = [res.data.post, ...post];
        setPostHome(nextPost);
        fetchPost();
    };

    const addPostProfile = async ({ title, picture }) => {
        const res = await axios.post('/post', {
            caption: title,
            pictureUrl: picture,
        });
        const nextPost = [res.data.post, ...postProfile];
        setPostProfile(nextPost);
    };

    const updatePost = async (id, value) => {
        const idx = post.findIndex((item) => item.id === id);
        const newPost = [...post];

        const res = await axios.put(`/post/${id}`, { caption: value });

        newPost[idx] = res.data.post;

        setPostHome(newPost);
    };

    const updatePostProfile = async (id, value) => {
        const idx = postProfile.findIndex((item) => item.id === id);
        const newPost = [...postProfile];

        const res = await axios.put(`/post/${id}`, { caption: value });

        newPost[idx] = res.data.post;

        setPostProfile(newPost);
    };

    const deletePost = async (id) => {
        const res = await axios.delete(`/post/${id}`);
        const newPost = post.filter((item) => item.id !== id);
        setPostHome(newPost);
    };

    const deletePostProfile = async (id) => {
        const res = await axios.delete(`/post/${id}`);
        const newPost = postProfile.filter((item) => item.id !== id);
        setPostProfile(newPost);
    };

    return (
        <PostContext.Provider
            value={{
                post,
                postProfile,
                setPostProfile,
                addPost,
                title,
                setTitle,
                updatePost,
                deletePost,
                visible,
                serVisible,
                hideboxPost,
                setHideboxPost,
                fetchPost,
                addPostProfile,
                updatePostProfile,
                deletePostProfile,
                fetchPostProfile,
            }}
        >
            {props.children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;
export { PostContext };
