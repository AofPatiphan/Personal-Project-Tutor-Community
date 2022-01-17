import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { PostContext } from './PostContext';

const CommentContext = createContext();

function CommentContextProvider(props) {
    const { fetchPost } = useContext(PostContext);

    // const [comment, setComment] = useState([]);
    const [commentText, setCommentText] = useState('');

    // Get data home
    // useEffect(() => {
    //     const fetchComment = async () => {
    //         const res = await axios.get('/comment');
    //         setComment(res.data.comments);
    //     };
    //     fetchComment();
    // }, []);

    // // Get data profile
    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const res = await axios.get('/post/');
    //         setPostProfile(res.data.posts);
    //     };
    //     fetchPost();
    // }, []);

    const addComment = async (commentText, id) => {
        const res = await axios.post(`/comment/${id}`, {
            commentContent: commentText,
        });
        fetchPost();
        // const nextComment = [...comment, res.data.comment];
        // console.log(res.data);
        // setComment(nextComment);
    };

    // const updateComment = async (id, value) => {
    //     const idx = post.findIndex((item) => item.id === id);
    //     const newPost = [...post];
    //     if (idx !== -1) {
    //         newPost[idx] = { ...newPost[idx], ...{ caption: value } };
    //     }
    //     console.log(newPost[idx]);
    //     const res = await axios.put(`/post/${id}`, newPost[idx]);
    //     setPostHome(newPost);
    // };

    // const deleteComment = async (id) => {
    //     const res = await axios.delete(`/comment/${id}`);
    //     const newComment = commentHome.filter((item) => item.id !== id);
    //     setPostHome(newComment);
    // };

    return (
        <CommentContext.Provider
            value={{
                // comment,
                commentText,
                setCommentText,
                addComment,
                // post,
                // postProfile,
                // addPost,
                // title,
                // setTitle,
                // updatePost,
                // deletePost,
                // visible,
                // serVisible,
                // hideboxPost,
                // setHideboxPost,
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
        </CommentContext.Provider>
    );
}

export default CommentContextProvider;
export { CommentContext };
