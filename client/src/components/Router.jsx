import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Register from '../components/auths/Register';
import Home from '../pages/Home';
import Login from '../components/auths/LogIn';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Findfriend from '../pages/Findfriend';
import Messenger from '../pages/messenger/Messenger';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import ChatContextProvider from '../contexts/ChatContext';
import SocketContextProvider from '../contexts/SocketContext';
import PostContextProvider from '../contexts/PostContext';
import UserContextProvider from '../contexts/UserContext';
import CommentContextProvider from '../contexts/CommentContext';
import Search from '../pages/search/Search';

const routes = {
    guest: [
        { path: '/', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
    user: [
        { path: '/profile/:username', element: <Profile /> },
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/findfriend', element: <Findfriend /> },
        { path: '/messenger/:id', element: <Messenger /> },
        { path: '/messenger/', element: <Messenger /> },
        { path: '/search/', element: <Search /> },
        { path: '*', element: <Navigate to="/" replace={true} /> },
    ],
};

function Router() {
    const { user, role } = useContext(AuthContext);

    if (role == 'user' && !user) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    return (
        <>
            {role == 'user' ? (
                <>
                    <UserContextProvider>
                        <PostContextProvider>
                            <CommentContextProvider>
                                <SocketContextProvider>
                                    <ChatContextProvider>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<MainLayout />}
                                            >
                                                {routes[role].map((item) => (
                                                    <Route
                                                        path={item.path}
                                                        element={item.element}
                                                        key={item.path}
                                                    />
                                                ))}
                                            </Route>
                                        </Routes>
                                    </ChatContextProvider>
                                </SocketContextProvider>
                            </CommentContextProvider>
                        </PostContextProvider>
                    </UserContextProvider>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        {routes[role].map((item) => (
                            <Route
                                path={item.path}
                                element={item.element}
                                key={item.path}
                            />
                        ))}
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default Router;
