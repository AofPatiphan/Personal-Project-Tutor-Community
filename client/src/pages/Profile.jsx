import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Postbar from '../components/Postbar';
import PostItemProfile from '../components/PostItemProfile';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import ProfileHeader from '../components/ProfileHeader';
import PostProfile from '../components/PostProfile';
import PostitemHome from '../components/PostItemHome';

function Profile() {
    const location = useLocation();
    console.log(location);
    const { postProfile } = useContext(PostContext);
    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <ProfileHeader />
                <Postbar />
                {postProfile.map((el) => {
                    return <PostitemHome postitemHome={el} key={el.id} />;
                })}
            </div>
        </>
    );
}

export default Profile;
