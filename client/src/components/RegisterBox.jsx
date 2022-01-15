import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function RegisterBox() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        confirmPassword,
        setConfirmPassword,
        handleSubmitRegister,
        username,
        setUsername,
    } = useContext(AuthContext);
    return (
        <div className="loginform">
            <div className="loginformcontainer p-5">
                <form onSubmit={handleSubmitRegister}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '60px',
                            paddingTop: '10px',
                        }}
                    >
                        <div>
                            <input
                                type="radio"
                                className="btn-check"
                                autoComplete="off"
                                defaultChecked
                            />
                            <label
                                className="btn btn-outline-primary"
                                htmlFor="success-outlined"
                                style={{ borderRadius: '10px' }}
                            >
                                Register
                            </label>
                        </div>
                        <div>
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                }}
                            >
                                <input
                                    type="radio"
                                    className="btn-check"
                                    autoComplete="off"
                                />
                                <label
                                    className="btn btn-outline-primary"
                                    htmlFor="danger-outlined"
                                    style={{ borderRadius: '10px' }}
                                >
                                    Sign in
                                </label>
                            </Link>
                        </div>
                    </div>
                    <div className="registerText">
                        <h1>Create Account</h1>
                    </div>
                    <div className="mt-2">
                        <div className="mb-4 d-flex " style={{ gap: '20px' }}>
                            <input
                                type="text"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <input
                                type="text"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="text"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 d-flex " style={{ gap: '20px' }}>
                            <input
                                type="password"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                type="password"
                                className="form-control"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-2 form-check"></div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                            }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterBox;
