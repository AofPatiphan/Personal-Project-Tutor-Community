import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';

function Postblock() {
    const { title, setTitle, addPost, hideboxPost, setHideboxPost } =
        useContext(PostContext);
    const { user } = useContext(AuthContext);

    const handleSubmitPost = (e) => {
        e.preventDefault();
        addPost({ title });
        setTitle('');
        setHideboxPost(false);
    };

    const handleClickHideboxPost = (e) => {
        e.preventDefault();
        setHideboxPost(false);
    };
    return (
        <>
            <div
                id="id01"
                className="w3-modal"
                style={{ display: `${hideboxPost ? 'block' : 'none'}` }}
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
                            onClick={handleClickHideboxPost}
                            className="w3-button w3-display-topright"
                        >
                            &times;
                        </span>
                        <h2>Create post</h2>
                    </header>
                    <div className="w3-container" style={{ display: 'flex' }}>
                        <div style={{ flexGrow: '1' }}>
                            <Link to={'/profile'}>
                                <img
                                    src="https://sv1.picz.in.th/images/2022/01/07/n9jVAy.webp"
                                    alt="Profile logo"
                                    style={{
                                        width: 35,
                                        height: 35,
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
                            <h5>{user.firstName}</h5>
                        </div>
                        <div style={{ flexGrow: '10' }}>&nbsp;</div>
                    </div>
                    <form onSubmit={handleSubmitPost}>
                        <div style={{ paddingLeft: '55px' }}>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder={`What’s on you mind, ${user.firstName}?`}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '400px', border: '0' }}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mb-3"
                            style={{ width: '405px', marginLeft: '25px' }}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Postblock;
