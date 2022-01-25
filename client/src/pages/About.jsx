import React from 'react';
import ProfileHeader from '../components/ProfileHeader';

function About() {
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
                    Caption : <br /> Lorem ipsum dolor sit amet consectetur,
                    adipisicing elit. Mollitia, dolorum repellendus rem cum
                    perferendis unde, iusto, reiciendis sit minima laudantium
                    temporibus delectus nobis sunt nulla fugiat neque excepturi
                    rerum a.
                </div>
                <div style={{ marginBottom: '10px' }}>Gender : Male</div>
                <div style={{ marginBottom: '10px' }}>Charactor : Tutor</div>
                <div style={{ marginBottom: '10px' }}>
                    Subject : Mathematics
                </div>
                <div style={{ marginBottom: '10px' }}>Level : High school</div>
                <div style={{ marginBottom: '10px' }}>
                    Phone Number : 0889697882
                </div>
                <div style={{ marginBottom: '10px' }}>
                    Education Level : Bachelor's degree
                </div>
            </div>
        </>
    );
}

export default About;
