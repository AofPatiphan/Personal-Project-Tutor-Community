import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

function PostProfile({ postItemProfile }) {
    const { user } = useContext(AuthContext);
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>
                            {user.username}
                        </h6>
                        <p style={{ fontSize: '11px' }}>
                            {/* {new Date(postItem.createdAt).toDateString()} */}
                        </p>
                    </div>
                </div>
                <div>
                    <button className="btn" type="submit">
                        <i
                            className="bi bi-three-dots"
                            style={{ marginRight: '20px' }}
                        ></i>
                    </button>
                </div>
            </div>
            <div>{postItemProfile.postContent}</div>
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
                    {postItemProfile.like} Like
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
                    <button style={{ border: 0, background: 'none' }}>
                        <i
                            className="bi bi-chat-square"
                            style={{ marginRight: '35px' }}
                        ></i>
                    </button>
                </div>
            </div>
            <div style={{ paddingTop: '10px' }}>
                <form className="d-flex">
                    <input
                        className="form-control me-2"
                        type="text"
                        placeholder="Comment"
                        aria-label="Search"
                        style={{ borderRadius: '30px' }}
                    />
                    <button className="btn" type="submit">
                        Comment
                    </button>
                </form>
            </div>
        </>
    );
}

export default PostProfile;
