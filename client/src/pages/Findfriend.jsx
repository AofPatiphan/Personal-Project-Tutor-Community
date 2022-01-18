import React from 'react';
import Cardprofile from '../components/Cardprofile';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

function Findfriend() {
    const { profileCard } = useContext(UserContext);

    return (
        <div
            style={{
                paddingTop: '100px',
                margin: '0px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',

                // justifyContent: 'center',
            }}
        >
            {profileCard.map((el) => {
                return <Cardprofile profileData={el} key={el.id} />;
            })}
        </div>
    );
}

export default Findfriend;
