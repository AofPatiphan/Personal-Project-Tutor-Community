import './App.css';
import Router from './components/Router';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import UserContextProvider from './contexts/UserContext';
import CommentContextProvider from './contexts/CommentContext';
import SocketContextProvider from './contexts/SocketContext';

function App() {
    return (
        <UserContextProvider>
            <AuthContextProvider>
                <SocketContextProvider>
                    <PostContextProvider>
                        <CommentContextProvider>
                            <div style={{ height: '100vh' }}>
                                <Router />
                            </div>
                        </CommentContextProvider>
                    </PostContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </UserContextProvider>
    );
}

export default App;
