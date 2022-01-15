import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/LogIn';
import Profile from '../pages/Profile';
import About from '../pages/About';

const routes = {
    guest: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/login" replace={true} /> },
    ],
    user: [
        { path: '/profile', element: <Profile /> },
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
};

function Router() {
    const { user } = useContext(AuthContext);
    const role = user ? 'user' : 'guest';
    return (
        <Routes>
            {routes[role].map((item) => (
                <Route
                    path={item.path}
                    element={item.element}
                    key={item.path}
                />
            ))}
        </Routes>
    );
}

export default Router;
