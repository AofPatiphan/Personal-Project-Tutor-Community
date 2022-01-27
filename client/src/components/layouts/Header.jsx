import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import { useState } from 'react';

function Header() {
    const { logout, user } = useContext(AuthContext);
    const { userData } = useContext(UserContext);
    const [nav, setNav] = useState('Home');

    return (
        <div>
            <div style={{ position: 'fixed', width: '100%', zIndex: '2' }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse d-flex"
                            id="navbarTogglerDemo01"
                            style={{ justifyContent: 'space-between' }}
                        >
                            <div>
                                <Link
                                    to={'/'}
                                    className="navbar-brand"
                                    style={{ color: '#1877F2' }}
                                    onClick={() => setNav('Home')}
                                >
                                    <img
                                        src="https://sv1.picz.in.th/images/2022/01/04/nN4KJR.png"
                                        alt="Tutor Logo"
                                        style={{ width: 35, height: 35 }}
                                    />
                                </Link>
                            </div>
                            <div style={{ marginLeft: '80px' }}>
                                <ul className="navbar-nav  mb-2 mb-lg-0">
                                    <li
                                        className="nav-item "
                                        style={{
                                            borderTop: `${
                                                nav === 'Home'
                                                    ? '2px solid #1877F2'
                                                    : ''
                                            }`,
                                            width: '100px',
                                            // marginRight: '50px',
                                        }}
                                    >
                                        <Link
                                            to={'/'}
                                            className="nav-link "
                                            aria-current="page"
                                            style={{
                                                color: `${
                                                    nav === 'Home'
                                                        ? '#1877F2'
                                                        : ''
                                                }`,
                                                textAlign: 'center',
                                            }}
                                            onClick={() => setNav('Home')}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item "
                                        style={{
                                            borderTop: `${
                                                nav === 'Search'
                                                    ? '2px solid #1877F2'
                                                    : ''
                                            }`,
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Link
                                            to={'/search'}
                                            className="nav-link "
                                            style={{
                                                color: `${
                                                    nav === 'Search'
                                                        ? '#1877F2'
                                                        : ''
                                                }`,
                                                textAlign: 'center',
                                            }}
                                            onClick={() => setNav('Search')}
                                        >
                                            Search
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item "
                                        style={{
                                            borderTop: `${
                                                nav === 'Chat'
                                                    ? '2px solid #1877F2'
                                                    : ''
                                            }`,
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Link
                                            to={'/messenger'}
                                            className="nav-link "
                                            style={{
                                                color: `${
                                                    nav === 'Chat'
                                                        ? '#1877F2'
                                                        : ''
                                                }`,
                                            }}
                                            onClick={() => setNav('Chat')}
                                        >
                                            Chat
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item "
                                        style={{
                                            borderTop: `${
                                                nav === 'Friend'
                                                    ? '2px solid #1877F2'
                                                    : ''
                                            }`,
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Link
                                            to={'/findfriend'}
                                            className="nav-link "
                                            style={{
                                                color: `${
                                                    nav === 'Friend'
                                                        ? '#1877F2'
                                                        : ''
                                                }`,
                                            }}
                                            onClick={() => setNav('Friend')}
                                        >
                                            Friends
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="d-flex">
                                    <div
                                        className="ms-4"
                                        style={{
                                            backgroundColor: `${
                                                nav === 'Profile' ? 'blue' : ''
                                            }`,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '40px',
                                            width: '40px',
                                        }}
                                    >
                                        <Link
                                            to={`/profile/${user.username}`}
                                            onClick={() => setNav('Profile')}
                                        >
                                            <img
                                                src={`${userData.profileUrl}`}
                                                alt="Profile logo"
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    objectFit: 'cover',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </Link>
                                    </div>
                                    <Link to={'/login'}>
                                        <button
                                            className="btn"
                                            onClick={logout}
                                        >
                                            <i
                                                className="bi bi-box-arrow-right"
                                                style={{ fontSize: '20px' }}
                                            ></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
