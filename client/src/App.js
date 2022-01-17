import './App.css';
import Router from './components/Router';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import UserContextProvider from './contexts/UserContext';
import CommentContextProvider from './contexts/CommentContext';

function App() {
    return (
        <UserContextProvider>
            <AuthContextProvider>
                <PostContextProvider>
                    <CommentContextProvider>
                        <div style={{ height: '100vh' }}>
                            <Router />
                        </div>
                    </CommentContextProvider>
                </PostContextProvider>
            </AuthContextProvider>
        </UserContextProvider>
    );
}

export default App;
