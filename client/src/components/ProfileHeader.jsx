import React from 'react';

import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PostContext } from '../contexts/PostContext';
import { UserContext } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import axios from '../config/axios';

function ProfileHeader({ person, setIsAboutPage, isAboutPage }) {
    const { username } = useParams();
    const { user } = useContext(AuthContext);
    const { fetchPost, fetchPostProfile } = useContext(PostContext);
    const { request, getAllRequest } = useContext(UserContext);
    const [isRequest, setIsRequest] = useState(false);
    const [friendById, setFriendById] = useState({});
    const [buttonStatus, setButtonStatus] = useState('');
    useEffect(() => {
        fetchPost();
    }, [isRequest]);
    const getFriendRequestById = async (id) => {
        const res = await axios.get(`/friend/${id}/${person.id}`);
        setFriendById(res.data.friend || {});
    };

    const cancelRequest = async (id) => {
        const res = await axios.delete(`/friend/${id}/${person.id}`);
        setFriendById(res.data.friend || {});
    };

    const acceptRequest = async (id) => {
        const res = await axios.put(`/friend/${id}/${person.id}`);
        setFriendById(res.data.friend || {});
        fetchPost();
        fetchPostProfile(username);
        getAllRequest(id);
    };

    const unFriend = async (id) => {
        const res = await axios.delete(`/friend/${id}/${person.id}`);
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
            await request({ receiver: person.id, requester: user.id });
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
        setIsRequest(!isRequest);
        await fetchPost();
    };

    const handleClickReject = async (e) => {
        e.preventDefault();
        if (friendById.status === 'FRIEND') {
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
            style={{
                display: 'flex',
                height: '400px',
                width: '900px',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '60px',
            }}
        >
            <div
                style={{
                    backgroundImage:
                        'url("https://sv1.picz.in.th/images/2022/01/11/nK6VPD.jpg")',
                    borderRadius: '8px',
                    width: '900px',
                    height: '250px',
                    textAlign: 'center',
                }}
            >
                <div style={{ paddingTop: '160px' }}>
                    <img
                        src={`${person.profileUrl}`}
                        alt="Profile picture"
                        style={{
                            width: '130px',
                            height: '130px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                </div>
            </div>
            <div>
                <h2 style={{ paddingTop: '50px', textAlign: 'center' }}>
                    {`${person.firstName} ${person.lastName} `}
                </h2>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '20px',
                    borderTop: '2px solid #CFD0D4',
                    width: '800px',
                    marginTop: '10px',
                }}
            >
                <div>
                    <ul
                        style={{
                            display: 'flex',
                            listStyle: 'none',
                            padding: '0',
                        }}
                    >
                        <li
                            style={{
                                borderBottom: isAboutPage
                                    ? ``
                                    : `2px solid #1877F2`,
                                width: '100px',
                            }}
                        >
                            <Link
                                to={'#'}
                                className="nav-link "
                                aria-current="page"
                                style={{
                                    color: isAboutPage ? '#66676B' : '#1877F2',
                                    textAlign: 'center',
                                }}
                                onClick={() => setIsAboutPage(false)}
                            >
                                Post
                            </Link>
                        </li>
                        <li
                            style={{
                                borderBottom: !isAboutPage
                                    ? ``
                                    : `2px solid #1877F2`,
                                width: '100px',
                                textAlign: 'center',
                            }}
                        >
                            <Link
                                to={'#'}
                                className="nav-link"
                                style={{
                                    color: !isAboutPage ? '#66676B' : '#1877F2',
                                    textAlign: 'center',
                                }}
                                onClick={() => setIsAboutPage(true)}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {user.username !== username ? (
                        <>
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
                            friendById.request_by_id === person.id &&
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
                        </>
                    ) : (
                        <></>
                    )}
                    {user.username === username ? (
                        <button
                            style={{
                                borderRadius: '8px',
                                background: '#E5E6EB',
                                border: '0',
                                padding: '3px 15px',
                            }}
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
