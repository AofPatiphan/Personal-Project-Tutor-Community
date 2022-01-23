import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import Editblock from './Editblock';
import axios from 'axios';
import timeSince from '../services/timeSince';

function Post({
    postitem: {
        id,
        caption,
        like,
        createdAt,
        updatedAt,
        userId,
        User,
        Likes,
        Comments,
        pictureUrl,
    },
    setVisible,
    visible,
}) {
    const { username } = useParams();

    const { deletePost, fetchPost, post, deletePostProfile, fetchPostProfile } =
        useContext(PostContext);
    const { userData } = useContext(UserContext);
    const { user } = useContext(AuthContext);
    const [hideboxEdit, setHideboxEdit] = useState(false);
    const [isLike, setIsLike] = useState(
        Likes.findIndex((item) => item.userId === userData.id) !== -1
    );
    const handleClickShowEditbox = (e) => {
        e.preventDefault();
        setHideboxEdit(true);
    };

    // const countComment = post.find((item) => item.id === id);

    const handleClickDeletePost = async (e) => {
        e.preventDefault();

        if (!username) {
            await deletePost(id);
            fetchPost();
            fetchPostProfile(username);
        } else {
            await deletePostProfile(id);
            fetchPost();
            fetchPostProfile(username);
        }
    };

    const likePost = () => {
        axios.post(`/post/like/${id}`).then((res) => {
            setIsLike(true);
            fetchPost();
            fetchPostProfile(username);
        });
    };

    const unLikePost = () => {
        axios.delete(`/post/like/${id}`).then((res) => {
            setIsLike(false);
            fetchPost();
            fetchPostProfile(username);
        });
    };

    return (
        <>
            <Editblock
                postitem={{
                    id,
                    caption,
                    like,
                    createdAt,
                    updatedAt,
                    userId,
                    setHideboxEdit,
                    hideboxEdit,
                    User,
                }}
            />
            <>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div>
                            <Link to={`/profile/${User.username}`}>
                                <img
                                    src={`${User.profileUrl}`}
                                    alt="Profile logo"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                />
                            </Link>
                        </div>
                        <div>
                            <h6
                                style={{
                                    fontSize: '15px',
                                    marginBottom: '5px',
                                }}
                            >
                                {User.firstName}
                            </h6>
                            <p style={{ fontSize: '11px' }}>
                                {timeSince(createdAt)}
                            </p>
                        </div>
                    </div>
                    <div>
                        {User.id !== user.id ? (
                            ''
                        ) : (
                            <button
                                className="btn"
                                type="submit"
                                onClick={handleClickShowEditbox}
                            >
                                <i className="bi bi-three-dots"></i>
                            </button>
                        )}
                        {User.id !== user.id ? (
                            ''
                        ) : (
                            <button
                                className="btn"
                                type="submit"
                                onClick={handleClickDeletePost}
                            >
                                <i
                                    className="bi bi-trash"
                                    style={{ marginRight: '20px' }}
                                ></i>
                            </button>
                        )}
                    </div>
                </div>
                <div>{caption}</div>
                {pictureUrl ? (
                    <div>
                        <img
                            src={`${pictureUrl}`}
                            alt="Post Picture"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'fit',

                                borderRadius: '8px',
                            }}
                        />
                    </div>
                ) : (
                    ''
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        paddingRight: '35px',
                    }}
                >
                    <div
                        style={{
                            paddingTop: '10px',
                            fontSize: '13px',
                            marginRight: '10px',
                        }}
                    >
                        {Likes.length} Like
                    </div>
                    <div
                        style={{
                            paddingTop: '10px',
                            fontSize: '13px',
                        }}
                    >
                        {Comments.length} Comment
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <div style={{ marginTop: '10px' }}>
                        <button
                            style={{ border: 0, background: 'none' }}
                            onClick={isLike ? unLikePost : likePost}
                        >
                            <i
                                className={`bi bi-hand-thumbs-up${
                                    isLike ? '-fill' : ''
                                }`}
                                style={{ marginRight: '20px' }}
                            ></i>
                        </button>
                        <button
                            style={{ border: 0, background: 'none' }}
                            onClick={() => setVisible(!visible)}
                        >
                            <i
                                className="bi bi-chat-square"
                                style={{ marginRight: '35px' }}
                            ></i>
                        </button>
                    </div>
                </div>
            </>
        </>
    );
}

export default Post;
