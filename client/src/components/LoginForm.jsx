import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { Link } from 'react-router-dom';

function LoginBox() {
    const { email, setEmail, password, setPassword, handleSubmitLogin } =
        useContext(AuthContext);
    return (
        <div className="loginform">
            <div className="loginformcontainer p-5">
                <form onSubmit={handleSubmitLogin}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '60px',
                            paddingTop: '10px',
                        }}
                    >
                        <div>
                            <Link
                                to="/register"
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="options-outlined"
                                    id="success-outlined"
                                    autoComplete="off"
                                />
                                <label
                                    className="btn btn-outline-primary"
                                    htmlFor="success-outlined"
                                    style={{ borderRadius: '10px' }}
                                >
                                    Register
                                </label>
                            </Link>
                        </div>
                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                name="options-outlined"
                                id="danger-outlined"
                                autoComplete="off"
                                defaultChecked
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="danger-outlined"
                                style={{ borderRadius: '10px' }}
                            >
                                Sign in
                            </label>
                        </div>
                    </div>
                    <div className="signInText">
                        <h1>Sign in</h1>
                    </div>
                    <div className="mt-2">
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                            />
                        </div>
                        <div
                            className="mb-3 form-check"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: '#1690EB',
                            }}
                        >
                            <div>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                marginTop: '20px',
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginBox;
