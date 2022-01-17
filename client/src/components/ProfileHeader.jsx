import React from 'react';
import { Link } from 'react-router-dom';

function ProfileHeader({ person }) {
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
                                borderBottom: '2px solid #1877F2',
                                width: '100px',
                            }}
                        >
                            <Link
                                to={'/profile'}
                                className="nav-link "
                                aria-current="page"
                                style={{
                                    color: '#1877F2',
                                    textAlign: 'center',
                                }}
                            >
                                Post
                            </Link>
                        </li>
                        <li
                            style={{
                                width: '100px',
                                textAlign: 'center',
                            }}
                        >
                            <Link
                                to={'/'}
                                className="nav-link"
                                href="#"
                                style={{
                                    color: '#66676B',
                                    textAlign: 'center',
                                }}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
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
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
