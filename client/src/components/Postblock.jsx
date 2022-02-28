import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import axios from '../config/axios';
import { useState } from 'react';

function Postblock() {
    const { username } = useParams();

    const {
        title,
        setTitle,
        addPost,
        addPostProfile,
        hideboxPost,
        setHideboxPost,
        fetchPost,
        fetchPostProfile,
    } = useContext(PostContext);
    const { user, setLoading, loading } = useContext(AuthContext);
    const { userData } = useContext(UserContext);

    const [picture, setPicture] = useState('');

    const handleFileInputChange = async (e) => {
        setLoading(true);
        if (!e.target.value) return;

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = async () => {
            await uploadImage(reader.result);
        };
        e.target.value = '';
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await axios.post('/upload', {
                data: base64EncodedImage,
            });
            setPicture(res.data.url);

            setLoading(false);
        } catch (err) {
            alert('File size too large.');
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();

        if (!username) {
            await addPost({ title, picture });
            fetchPost();
            fetchPostProfile(username);
        } else {
            await addPostProfile({ title, picture });
            fetchPost();
            fetchPostProfile(username);
        }
        setPicture('');
        setTitle('');
        setHideboxPost(false);
    };

    const handleClickHideboxPost = (e) => {
        e.preventDefault();
        setHideboxPost(false);
        setPicture('');
        setTitle('');
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
                                    src={`${userData.profileUrl}`}
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
                            <h5>{user.firstName}</h5>
                        </div>
                        <div style={{ flexGrow: '10' }}>&nbsp;</div>
                    </div>
                    <form onSubmit={handleSubmitPost}>
                        <div style={{ paddingLeft: '55px' }}>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder={`What’s on you mind, ${user.firstName}?`}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                    width: '400px',
                                    border: '0',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            ></textarea>
                        </div>
                        {picture ? (
                            <div
                                style={{
                                    paddingLeft: '25px',
                                    height: 'auto',
                                }}
                            >
                                <img
                                    src={`${picture}`}
                                    alt="Post img"
                                    style={{
                                        width: '250px',
                                        height: 'auto',
                                        borderRadius: '8px',
                                        objectFit: 'fit',
                                        margin: '20px',
                                    }}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div
                            className="input-group mb-3"
                            style={{ textAlign: 'center', padding: ' 0 30px' }}
                        >
                            <input
                                type="file"
                                className="form-control "
                                style={{
                                    borderRadius: '8px',
                                    marginLeft: '20px',
                                }}
                                // ref={imgInputEl}
                                onChange={handleFileInputChange}
                            />
                        </div>
                        {title || !loading ? (
                            <button
                                type="submit"
                                className="btn btn-primary mb-3 "
                                style={{ width: '405px', marginLeft: '25px' }}
                            >
                                Post
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary mb-3 "
                                style={{ width: '405px', marginLeft: '25px' }}
                                disabled
                            >
                                Post
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
// }

export default Postblock;
