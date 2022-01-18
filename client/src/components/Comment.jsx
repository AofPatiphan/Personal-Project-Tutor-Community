import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CommentContext } from '../contexts/CommentContext';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';

function Comment({ commentItem, postitem }) {
    const { username } = useParams();

    const { deleteComment, updateComment } = useContext(CommentContext);
    const { fetchPost, fetchPostProfile } = useContext(PostContext);
    const { user } = useContext(AuthContext);

    const [editText, setEditText] = useState(commentItem.commentContent);
    const [visible, setVisible] = useState(false);

    const handleClickDeleteComment = async (e) => {
        if (user.id === postitem.userId) {
            await deleteComment(commentItem.id);
        } else if (user.id === commentItem.userId) {
            await deleteComment(commentItem.id);
        } else {
            return;
        }
        fetchPost();
        fetchPostProfile(username);
    };

    const handleClickUpdateComment = async (e) => {
        e.preventDefault();
        await updateComment(commentItem.id, editText);
        fetchPost();
        fetchPostProfile(username);
        setVisible(!visible);
    };

    return (
        <>
            {commentItem.postId === postitem.id ? (
                <div style={{ padding: '20px 10px', display: 'flex' }}>
                    <div style={{ flexGrow: '1' }}>
                        <Link to={`/profile/${commentItem.User.username}`}>
                            <img
                                src={`${commentItem.User.profileUrl}`}
                                alt="Profile logo"
                                style={{
                                    width: 35,
                                    height: 35,
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ flexGrow: '1' }}>
                        <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>
                            {commentItem.User.firstName}
                        </h6>
                        <form
                            className="d-flex"
                            onSubmit={handleClickUpdateComment}
                        >
                            {!visible ? (
                                <p
                                    style={{
                                        fontSize: '13px',
                                        marginBottom: '5px',
                                        width: '500px',
                                    }}
                                >
                                    {commentItem.commentContent}
                                </p>
                            ) : (
                                <>
                                    <input
                                        className="form-control "
                                        type="text"
                                        value={editText}
                                        style={{
                                            borderRadius: '30px',
                                            height: '40px',
                                        }}
                                        onChange={(e) =>
                                            setEditText(e.target.value)
                                        }
                                    />
                                    <button className="btn" type="submit">
                                        <i
                                            className="bi bi-pencil-square"
                                            style={{ fontSize: '1.2em' }}
                                        ></i>
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={() => setVisible(!visible)}
                                    >
                                        <i
                                            className="bi bi-x-square"
                                            style={{ fontSize: '1.2em' }}
                                        ></i>
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                    <div style={{ flexGrow: '8', textAlign: 'end' }}>
                        <button
                            className="btn"
                            type="submit"
                            onClick={() => setVisible(!visible)}
                        >
                            <i className="bi bi-three-dots"></i>
                        </button>
                        <button
                            className="btn"
                            type="submit"
                            onClick={handleClickDeleteComment}
                        >
                            <i
                                className="bi bi-trash"
                                style={{ marginRight: '20px' }}
                            ></i>
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default Comment;
