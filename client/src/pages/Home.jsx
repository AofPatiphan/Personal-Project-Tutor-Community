import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Postbar from '../components/Postbar';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import PostItemHome from '../components/PostItemHome';
import { CommentContext } from '../contexts/CommentContext';

function Home() {
    const location = useLocation();
    const { postHome } = useContext(PostContext);

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
                <div style={{ height: '58px', marginBottom: '30px' }}>
                    &nbsp;
                </div>
                <Postbar />
                {postHome.map((el) => {
                    return <PostItemHome postitemHome={el} key={el.id} />;
                })}
            </div>
        </>
    );
}

export default Home;
