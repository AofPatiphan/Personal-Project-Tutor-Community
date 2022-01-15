import './App.css';
import Router from './components/Router';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import UserContextProvider from './contexts/UserContext';
import CommentContextProvider from './contexts/CommentContext';

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <CommentContextProvider>
                    <UserContextProvider>
                        <div style={{ height: '100vh' }}>
                            <Router />
                        </div>
                    </UserContextProvider>
                </CommentContextProvider>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
