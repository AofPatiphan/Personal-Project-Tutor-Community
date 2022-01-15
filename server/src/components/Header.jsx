import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

function Header() {
    const { logout } = useContext(AuthContext);
    return (
        <div>
            <div style={{ position: 'fixed', width: '100%' }}>
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
                                >
                                    <img
                                        src="https://sv1.picz.in.th/images/2022/01/04/nN4KJR.png"
                                        alt="Tutor Logo"
                                        style={{ width: 35, height: 35 }}
                                    />
                                </Link>
                            </div>
                            <div style={{ marginRight: '130px' }}>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li
                                        className="nav-item "
                                        style={{
                                            borderTop: '2px solid #1877F2',
                                            width: '100px',
                                            marginRight: '50px',
                                        }}
                                    >
                                        <Link
                                            to={'/'}
                                            className="nav-link "
                                            aria-current="page"
                                            style={{
                                                color: '#1877F2',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item "
                                        style={{
                                            width: '100px',
                                            textAlign: 'center',
                                            marginRight: '50px',
                                        }}
                                    >
                                        <Link to={'/'} className="nav-link">
                                            Notification
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item "
                                        style={{
                                            width: '100px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Link to={'/'} className="nav-link ">
                                            Search
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="d-flex">
                                    <div>
                                        <form className="d-flex">
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                                style={{ borderRadius: '30px' }}
                                            />
                                            <button
                                                className="btn"
                                                type="submit"
                                            >
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </form>
                                    </div>
                                    <div
                                        className="ms-4"
                                        style={{
                                            backgroundColor: 'blue',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '40px',
                                            width: '40px',
                                        }}
                                    >
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
