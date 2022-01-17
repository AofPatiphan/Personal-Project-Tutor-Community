import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CommentContext } from '../contexts/CommentContext';
import { PostContext } from '../contexts/PostContext';

function Comment({ commentItem, postitem }) {
    const { username } = useParams();

    const { deleteCommentHome, deleteCommentProfile } =
        useContext(CommentContext);
    const { deletePost, fetchPost, post, deletePostProfile, fetchPostProfile } =
        useContext(PostContext);

    console.log(commentItem);

    const handleClickDeleteComment = async (e) => {
        e.preventDefault();

        if (!username) {
            await deleteCommentHome(commentItem.id);
            fetchPost();
            fetchPostProfile(username);
        } else {
            await deleteCommentProfile(commentItem.id);
            fetchPost();
            fetchPostProfile(username);
        }
    };

    return (
        <>
            {commentItem.postId === postitem.id ? (
                <div style={{ padding: '20px 10px', display: 'flex' }}>
                    <div style={{ flexGrow: '1' }}>
                        <Link to={'/profile'}>
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
                        <p
                            style={{
                                fontSize: '13px',
                                marginBottom: '5px',
                                width: '500px',
                            }}
                        >
                            {commentItem.commentContent}
                        </p>
                    </div>
                    <div style={{ flexGrow: '8', textAlign: 'end' }}>
                        <button className="btn" type="submit">
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
