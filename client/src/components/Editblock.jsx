import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PostContext } from '../contexts/PostContext';

function Editblock({
    postitem: { id, caption, setHideboxEdit, hideboxEdit, User },
}) {
    const { updatePost, updatePostProfile, fetchPost, fetchPostProfile } =
        useContext(PostContext);
    const [editText, setEditText] = useState(caption);
    const { username } = useParams();
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (editText) {
            if (!username) {
                await updatePost(id, editText);
                fetchPost();
                fetchPostProfile(username);
            } else {
                await updatePostProfile(id, editText);
                fetchPost();
                fetchPostProfile(username);
            }
            setHideboxEdit(false);
        }
    };

    const handleClickHideModal = (e) => {
        e.preventDefault();
        setHideboxEdit(false);
        setEditText(caption);
    };
    return (
        <>
            <div
                id="id02"
                className="w3-modal"
                style={{ display: `${hideboxEdit ? 'block' : 'none'}` }}
            >
                <div
                    className="w3-modal-content w3-animate-top w3-card-4"
                    style={{
                        width: '500px',
                        borderRadius: '8px',
                        padding: '20px 10px',
                    }}
                >
                    <header
                        className="w3-container"
                        style={{ marginBottom: '20px' }}
                    >
                        <span
                            onClick={handleClickHideModal}
                            className="w3-button w3-display-topright"
                        >
                            &times;
                        </span>
                        <h2>Update post</h2>
                    </header>
                    <div className="w3-container" style={{ display: 'flex' }}>
                        <div style={{ flexGrow: '1' }}>
                            <Link to={'/profile'}>
                                <img
                                    src={`${User.profileUrl}`}
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
                        <div
                            style={{
                                flexGrow: '10',
                                textAlign: 'start',
                            }}
                        >
                            <h5>{User.firstName}</h5>
                        </div>
                        <div style={{ flexGrow: '10' }}>&nbsp;</div>
                    </div>
                    <form onSubmit={handleSubmitEdit}>
                        <div style={{ paddingLeft: '55px' }}>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="What’s on you mind, Patiphan?"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                style={{ width: '400px', border: '0' }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mb-3"
                            style={{ width: '405px', marginLeft: '25px' }}
                        >
                            Edit Post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Editblock;
