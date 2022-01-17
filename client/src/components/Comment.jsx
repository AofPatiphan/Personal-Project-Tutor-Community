import React from 'react';
import { Link } from 'react-router-dom';

function Comment({ commentItem, postitem }) {
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
                            <i
                                className="bi bi-three-dots"
                                style={{ paddingRight: '25px' }}
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
