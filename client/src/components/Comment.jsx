import React from 'react';
import { Link } from 'react-router-dom';

function Comment() {
    return (
        <div style={{ padding: '20px 10px', display: 'flex' }}>
            <div style={{ flexGrow: '1' }}>
                <Link to={'/profile'}>
                    <img
                        src="https://sv1.picz.in.th/images/2022/01/07/n9jVAy.webp"
                        alt="Profile logo"
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: '50%',
                        }}
                    />
                </Link>
            </div>
            <div style={{ flexGrow: '1' }}>
                <h6 style={{ fontSize: '15px', marginBottom: '5px' }}>
                    Patiphan Manawanich
                </h6>
                <p
                    style={{
                        fontSize: '12px',
                        marginBottom: '5px',
                        width: '500px',
                    }}
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ratione qui eligendi sint reiciendis quia doloribus!
                    Aspernatur aperiam facere nemo dolores.
                </p>
            </div>
            <div style={{ flexGrow: '8', textAlign: 'end' }}>
                <button className="btn" type="submit">
                    <i
                        className="bi bi-three-dots"
                        style={{ paddingRight: '25px' }}
                    ></i>
                </button>
            </div>
        </div>
    );
}

export default Comment;