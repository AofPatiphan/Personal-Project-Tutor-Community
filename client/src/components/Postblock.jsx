import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';

function Postblock() {
    const { title, setTitle, addPost } = useContext(PostContext);
    const handleSubmitPost = (e) => {
        e.preventDefault();
        addPost({ title });
        setTitle('');
    };
    return (
        <>
            <div id="id01" className="w3-modal">
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
                            onClick={() =>
                                (document.getElementById('id01').style.display =
                                    'none')
                            }
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
                            <h5>Patiphan Manawanich</h5>
                        </div>
                        <div style={{ flexGrow: '10' }}>&nbsp;</div>
                    </div>
                    <form onSubmit={handleSubmitPost}>
                        <div style={{ paddingLeft: '55px' }}>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="What’s on you mind, Patiphan?"
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
