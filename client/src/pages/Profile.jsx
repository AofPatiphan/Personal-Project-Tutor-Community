import React from 'react';
import Postbar from '../components/Postbar';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import ProfileHeader from '../components/ProfileHeader';
import Postitem from '../components/PostItem';
import axios from '../config/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

function Profile() {
    const { user } = useContext(AuthContext);

    const { allFriend } = useContext(UserContext);
    const { postProfile, setPostProfile } = useContext(PostContext);
    const { username } = useParams();
    const [person, setPerson] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`/post/${username}`);
            setPostProfile(res.data.posts);
        };
        fetchPost();
    }, [username]);

    console.log(allFriend);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/user/${username}`);
            setPerson(res.data.user);
        };

        fetchUser();
    }, [username]);

    const result = allFriend.findIndex((item) => item.username === username);
    console.log(result !== -1 || user.username === username);
    //    if(result===-1)

    if (!person) {
        return <></>;
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <ProfileHeader person={person} />
                {user.username === username ? <Postbar person={person} /> : ''}
                {postProfile.map((el) => {
                    if (result !== -1 || user.username === username) {
                        return (
                            <Postitem
                                postitem={el}
                                key={el.id}
                                person={person}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}

export default Profile;
