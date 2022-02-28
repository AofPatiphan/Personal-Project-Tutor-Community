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
        await axios.post(`/comment/${id}`, {
            commentContent: commentText,
        });
        fetchPost();
    };

    const updateComment = async (id, value) => {
        await axios.put(`/comment/${id}`, {
            commentContent: value,
        });
    };

    const deleteComment = async (id) => {
        await axios.delete(`/comment/${id}`);
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
