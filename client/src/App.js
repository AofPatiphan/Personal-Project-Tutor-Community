import './App.css';
import Router from './components/Router';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <div style={{ height: '100vh' }}>
                    <Router />
                </div>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
