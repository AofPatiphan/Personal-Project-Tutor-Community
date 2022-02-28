import Comment from './Comment';
import Post from './Post';
import { useParams } from 'react-router-dom';

import { useContext, useState } from 'react';
import { CommentContext } from '../contexts/CommentContext';
import { PostContext } from '../contexts/PostContext';
import CommentBar from './CommentBar';

export default function Postitem({ postitem }) {
    const [visible, setVisible] = useState(false);
    const { commentText, setCommentText, addComment } =
        useContext(CommentContext);
    const { fetchPostProfile } = useContext(PostContext);

    const { username } = useParams();

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await addComment(commentText, postitem.id);
        setCommentText('');
        fetchPostProfile(username);
    };

    return (
        <div
            style={{
                margin: '14px 0',
                backgroundColor: 'white',
                width: '800px',
                color: '#788292',
                borderRadius: '8px',
                padding: '20px',
            }}
        >
            <Post
                postitem={postitem}
                setVisible={setVisible}
                visible={visible}
            />
            {visible ? (
                <>
                    <CommentBar handleSubmitComment={handleSubmitComment} />
                    {postitem.Comments.map((el) => {
                        return (
                            <Comment
                                commentItem={el}
                                key={el.id}
                                postitem={postitem}
                            />
                        );
                    })}
                </>
            ) : (
                ''
            )}
        </div>
    );
}
