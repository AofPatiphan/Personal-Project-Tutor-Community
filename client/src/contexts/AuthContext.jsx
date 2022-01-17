import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);
    const { fetchUser, setUserData } = useContext(UserContext);

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
        navigate('/');
        setRole('user');
        fetchUser(token);
    };

    const logout = () => {
        localStorageService.removeToken();
        setUser(null);
        navigate('/login');
        setRole('guest');
        setUserData(null);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(localStorageService.getRole());
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        axios
            .post('/auth/login', { email, password })
            .then((res) => {
                login(res.data.token);
            })
            .catch((err) => {
                console.log(err);
                setError('Invalid username or password');
                setTimeout(() => setError(''), 5000);
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
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
                setError('Pleast completed form');
                // setTimeout(() => setError(''), 5000);
            });

        // .then((res) => {
        //     navigate('/login');
        // })
        // .catch((err) => {
        //     console.log(err);
        //     setError('Pleast completed form');
        //     // setTimeout(() => setError(''), 5000);
        // });
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
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
export { AuthContext };
