import './App.css';
import Router from './components/Router';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import UserContextProvider from './contexts/UserContext';
import CommentContextProvider from './contexts/CommentContext';
import SocketContextProvider from './contexts/SocketContext';
import ChatContextProvider from './contexts/ChatContext';

function App() {
    return (
        <UserContextProvider>
            <AuthContextProvider>
                <SocketContextProvider>
                    <PostContextProvider>
                        <CommentContextProvider>
                            <ChatContextProvider>
                                <div style={{ height: '100vh' }}>
                                    <Router />
                                </div>
                            </ChatContextProvider>
                        </CommentContextProvider>
                    </PostContextProvider>
                </SocketContextProvider>
            </AuthContextProvider>
        </UserContextProvider>
    );
}

export default App;
