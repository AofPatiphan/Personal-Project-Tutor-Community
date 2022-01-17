import Comment from './Comment';
import Post from './Post';
import { Link, useParams } from 'react-router-dom';

import { useContext, useState } from 'react';
import { CommentContext } from '../contexts/CommentContext';
import { PostContext } from '../contexts/PostContext';
import CommentBar from './CommentBar';

export default function Postitem({ postitem }) {
    const [visible, setVisible] = useState(false);
    const [toggleComment, setToggleComment] = useState(false);
    const { commentText, setCommentText, addComment } =
        useContext(CommentContext);
    const { fetchPostProfile } = useContext(PostContext);
    const { username } = useParams();

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        await addComment(commentText, postitem.id);
        setCommentText('');
        setVisible(false);
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
                postitem={postitem}
            />
            {visible ? (
                <CommentBar handleSubmitComment={handleSubmitComment} />
            ) : (
                ''
            )}
            <div style={{ textAlign: 'end', padding: '10px 25px 0 0' }}>
                <button
                    className="btn "
                    style={{ fontSize: '12px' }}
                    onClick={() => setToggleComment(!toggleComment)}
                >
                    {`${toggleComment ? 'Hide' : 'Show'} comment`}
                </button>
            </div>
            {toggleComment ? (
                <>
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
