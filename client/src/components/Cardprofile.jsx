import React from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Cardprofile({ profileData }) {
    const { username } = useParams();
    const { user } = useContext(AuthContext);
    const { fetchPost, fetchPostProfile } = useContext(PostContext);
    const { request } = useContext(UserContext);
    const [friendById, setFriendById] = useState({});
    const [buttonStatus, setButtonStatus] = useState('');
    const location = useLocation();

    const getFriendRequestById = async (id) => {
        try {
            const res = await axios.get(`/friend/${id}/${profileData.id}`);
            setFriendById(res.data.friend || {});
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getFriendRequestById(user.id);
    }, [username]);

    const cancelRequest = async (id) => {
        try {
            const res = await axios.delete(`/friend/${id}/${profileData.id}`);
            setFriendById(res.data.friend || {});
        } catch (err) {
            console.log(err);
        }
    };

    const acceptRequest = async (id) => {
        try {
            const res = await axios.put(`/friend/${id}/${profileData.id}`);
            setFriendById(res.data.friend || {});
            fetchPost();
            fetchPostProfile();
        } catch (err) {
            console.log(err);
        }
    };

    const unFriend = async (id) => {
        try {
            const res = await axios.delete(`/friend/${id}/${profileData.id}`);
            setFriendById(res.data.friend || {});
            fetchPost();
            fetchPostProfile();
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickRequest = async (e) => {
        try {
            e.preventDefault();
            if (!friendById.status) {
                await request({ receiver: profileData.id, requester: user.id });
            }
            if (
                friendById.status === 'PENDONG' &&
                user.id === friendById.request_by_id
            ) {
                await cancelRequest(user.id);
            }
            if (
                friendById.status === 'PENDONG' &&
                user.id === friendById.request_to_id
            ) {
                await acceptRequest(user.id);
            }
            if (friendById.status === 'FRIEND') {
                await unFriend(user.id);
            }
            await getFriendRequestById(user.id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleClickReject = async (e) => {
        try {
            e.preventDefault();
            if (friendById.status) {
                await unFriend(user.id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const checkfriend = () => {
        try {
            if (!friendById.status) {
                return setButtonStatus('Request');
            }
            if (friendById.status === 'FRIEND') {
                return setButtonStatus('Friend');
            }
            if (
                friendById.status === 'PENDONG' &&
                user.id === friendById.request_by_id
            ) {
                return setButtonStatus('Cancel request');
            }
            if (
                friendById.status === 'PENDONG' &&
                user.id === friendById.request_to_id
            ) {
                return setButtonStatus('Accept request');
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        checkfriend();
    }, [friendById]);

    return (
        <div
            className="card mb-3 mt-3"
            style={{
                borderRadius: '8px',
                width: '100%',
            }}
        >
            <div className="row g-0">
                <div className="col-md-2">
                    <Link to={`/profile/${profileData.username}`}>
                        <img
                            src={`${profileData.profileUrl}`}
                            alt="Profile img"
                            style={{
                                margin: '10px 40px 10px 25px',
                                borderRadius: '50%',
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                            }}
                        />
                    </Link>
                </div>
                <div className="col-md-10 d-flex">
                    <div className="card-body">
                        <h5 className="card-title">
                            {`${profileData.firstName} ${profileData.lastName}`}
                        </h5>
                        {location.pathname === '/search' ? (
                            <></>
                        ) : (
                            <p> {profileData.mutualFriend} mutual friend</p>
                        )}
                    </div>
                    <div style={{ paddingTop: '28px' }}>
                        <div style={{ marginTop: '20px' }}>
                            <button
                                style={{
                                    borderRadius: '8px',
                                    background: '#E5E6EB',
                                    border: '0',
                                    padding: '3px 15px',
                                    marginRight: '30px',
                                }}
                                onClick={handleClickRequest}
                            >
                                {buttonStatus}
                            </button>
                            {friendById.status === 'PENDONG' &&
                            friendById.request_by_id === profileData.id &&
                            user.id === friendById.request_to_id ? (
                                <button
                                    style={{
                                        borderRadius: '8px',
                                        background: '#E5E6EB',
                                        border: '0',
                                        padding: '3px 15px',
                                        marginRight: '30px',
                                    }}
                                    onClick={handleClickReject}
                                >
                                    {'Reject'}
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardprofile;
