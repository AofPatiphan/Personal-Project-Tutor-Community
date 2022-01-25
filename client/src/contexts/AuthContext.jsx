import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ErrContext } from '../contexts/ErrContext';
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    // const { fetchUser, setUserData } = useContext(UserContext);
    const { error, setError } = useContext(ErrContext);
    const [isLogin, setIsLogin] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const navigate = useNavigate();

    const login = async (token) => {
        await localStorageService.setToken(token);
        setUser(jwtDecode(token));
        setRole('user');
        // fetchUser(token);
        setIsLogin('Login Completed');
        navigate('/');
    };

    const logout = () => {
        localStorageService.removeToken();
        setUser(null);
        setRole('guest');
        // setUserData(null);
        setIsLogin('');
        navigate('/login');
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(localStorageService.getRole());
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [registerCompleted, setRegisterCompleted] = useState('');

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        axios
            .post('/auth/login', { email, password })
            .then((res) => {
                login(res.data.token);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
                setTimeout(() => setError(''), 3000);
            });
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        axios
            .post('/auth/register', {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
                profileUrl: imageUrl,
            })
            .then((res) => {
                setRegisterCompleted('You has already registered');
                navigate('/login');
                setTimeout(() => setRegisterCompleted(''), 5000);
            })
            .then((res) => {
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPassword('');
            })

            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
                setTimeout(() => setError(''), 3000);
            });
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                email,
                setEmail,
                password,
                setPassword,
                error,
                setError,
                handleSubmitLogin,
                handleSubmitRegister,
                login,
                logout,
                firstName,
                setFirstName,
                lastName,
                setLastName,
                confirmPassword,
                setConfirmPassword,
                username,
                setUsername,
                role,
                setRole,
                loading,
                setLoading,
                imageUrl,
                setImageUrl,
                isLogin,
                registerCompleted,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
export { AuthContext };
