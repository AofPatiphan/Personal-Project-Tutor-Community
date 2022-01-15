import React from 'react';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import Editblock from './Editblock';

function PostHome({
    postitemHome: { id, postContent, like, createdAt, updatedAt, userId },
    setVisible,
    visible,
}) {
    const [hideboxEdit, setHideboxEdit] = useState(false);
    const { userData } = useContext(UserContext);
    const { deletePost } = useContext(PostContext);

    const newUser = userData.find(({ id }) => id === userId);

    const handleClickShowEditbox = (e) => {
        e.preventDefault();
        setHideboxEdit(true);
    };

    const handleClickDeletePost = (e) => {
        e.preventDefault();
        deletePost(id);
    };

    return (
        <>
            <Editblock
                postitemHome={{
                    id,
                    postContent,
                    like,
                    createdAt,
                    updatedAt,
                    userId,
                    setHideboxEdit,
                    hideboxEdit,
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
                            <Link to={'/profile'}>
                                <img
                                    src="https://sv1.picz.in.th/images/2022/01/07/n9jVAy.webp"
                                    alt="Profile logo"
                                    style={{
                                        width: 50,
                                        height: 50,
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
                                {newUser.firstName}
                            </h6>
                            <p style={{ fontSize: '11px' }}>
                                {new Date(createdAt).toDateString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn"
                            type="submit"
                            onClick={handleClickShowEditbox}
                        >
                            <i className="bi bi-three-dots"></i>
                        </button>
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
                    </div>
                </div>
                <div>{postContent}</div>
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
                        {like} Like
                    </div>
                    <div
                        style={{
                            paddingTop: '10px',
                            fontSize: '13px',
                        }}
                    >
                        3 Comment
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
                        <button style={{ border: 0, background: 'none' }}>
                            <i
                                className="bi bi-hand-thumbs-up"
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

export default PostHome;
