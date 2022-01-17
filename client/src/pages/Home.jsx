import React from 'react';
import Postbar from '../components/Postbar';
import { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';
import PostItem from '../components/PostItem';

function Home() {
    const { post } = useContext(PostContext);
    return (
        <>
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
                {post.map((el) => {
                    return <PostItem postitem={el} key={el.id} />;
                })}
            </div>
        </>
    );
}

export default Home;
