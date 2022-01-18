import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useContext } from 'react';
import { PostContext } from './PostContext';

const CommentContext = createContext();

function CommentContextProvider(props) {
    const { fetchPost, post } = useContext(PostContext);

    const [comment, setComment] = useState([]);

    const [commentText, setCommentText] = useState('');
    // Get data home
    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get('/comment');
            setComment(res.data.comments);
        };
        fetchComment();
    }, []);

    const addComment = async (commentText, id) => {
        const res = await axios.post(`/comment/${id}`, {
            commentContent: commentText,
        });
        fetchPost();
        // const nextComment = [...comment, res.data.comment];
        // console.log(res.data);
        // setComment(nextComment);
    };

    const updateComment = async (id, value) => {
        // console.log(id);
        // const idx = comment.findIndex((item) => item.id === id);
        // const newComment = [...comment];

        const res = await axios.put(`/comment/${id}`, {
            commentContent: value,
        });

        // newComment[idx] = res.data.post;

        // setComment(newComment);
    };

    const deleteComment = async (id) => {
        const res = await axios.delete(`/comment/${id}`);
        // const newComment = comment.filter((item) => item.id !== id);
        // setComment(newComment);
    };

    return (
        <CommentContext.Provider
            value={{
                commentText,
                setCommentText,
                addComment,
                deleteComment,
                updateComment,
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
}

export default CommentContextProvider;
export { CommentContext };
