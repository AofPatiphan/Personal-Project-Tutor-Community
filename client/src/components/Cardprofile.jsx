import React from 'react';

import { Link, useParams } from 'react-router-dom';
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
    const { request, getAllFriendRequest } = useContext(UserContext);

    const [friendById, setFriendById] = useState({});
    const [buttonStatus, setButtonStatus] = useState('');

    const getFriendRequestById = async (id) => {
        const res = await axios.get(`/friend/${id}/${profileData.id}`);
        setFriendById(res.data.friend || {});
    };

    const cancelRequest = async (id) => {
        const res = await axios.delete(`/friend/${id}/${profileData.id}`);
        setFriendById(res.data.friend || {});
    };

    const acceptRequest = async (id) => {
        const res = await axios.put(`/friend/${id}/${profileData.id}`);
        setFriendById(res.data.friend || {});
        fetchPost();
        fetchPostProfile();
        getAllFriendRequest();
    };

    const unFriend = async (id) => {
        const res = await axios.delete(`/friend/${id}/${profileData.id}`);
        setFriendById(res.data.friend || {});
        fetchPost();
        fetchPostProfile();
    };

    useEffect(() => {
        getFriendRequestById(user.id);
    }, [username]);
    useEffect(() => {
        checkfriend();
    }, [friendById]);

    const handleClickRequest = async (e) => {
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
    };

    const handleClickReject = async (e) => {
        e.preventDefault();
        if (friendById.status) {
            await unFriend(user.id);
        }
    };

    const checkfriend = () => {
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
    };

    return (
        <div
            className="card mb-3"
            style={{ borderRadius: '8px', width: '450px' }}
        >
            <div className="row g-0">
                <div className="col-md-4">
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
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            {`${profileData.firstName} ${profileData.lastName}`}
                        </h5>
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
