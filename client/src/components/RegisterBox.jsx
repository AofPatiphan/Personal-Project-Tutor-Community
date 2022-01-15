import React from 'react';
import { Link } from 'react-router-dom';

function RegisterBox() {
    return (
        <div className="loginform">
            <div className="loginformcontainer p-5">
                <form action="">
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
                                name="options-outlined"
                                id="success-outlined"
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
                                    name="options-outlined"
                                    id="danger-outlined"
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
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="First name"
                            />

                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Last name"
                            />
                        </div>
                        <div className="mb-4 ">
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-4 d-flex " style={{ gap: '20px' }}>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Password"
                            />

                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                style={{
                                    borderRadius: '10px',
                                    background: '#1690EB20',
                                }}
                                placeholder="Confirm password"
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