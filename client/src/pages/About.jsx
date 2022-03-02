import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function About() {
    const { userData } = useContext(UserContext);
    return (
        <>
            <div
                style={{
                    margin: '14px 0',
                    backgroundColor: 'white',
                    width: '800px',
                    color: '#788292',
                    borderRadius: '8px',
                    padding: '50px',
                }}
            >
                <h1 style={{ marginBottom: '50px' }}>About</h1>
                <div style={{ marginBottom: '10px' }}>
                    Caption : <br /> {userData.About.caption}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Gender : {userData.About.gender}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Charactor : {userData.About.charactor}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Subject : {userData.About.subject}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Level : {userData.About.level}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Phone Number : {userData.About.phoneNumber}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Education Level : {userData.About.educationLevel}
                </div>
            </div>
        </>
    );
}

export default About;
