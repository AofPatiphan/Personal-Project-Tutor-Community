import axios from '../config/axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import * as localStorageService from '../services/localStorage';
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);
    const navigate = useNavigate();
    console.log(user);
    const login = (token) => {
        localStorageService.setToken(token);
        setUser(jwtDecode(token));
        navigate('/');
    };

    const logout = () => {
        localStorageService.removeToken();
        setUser(null);
        navigate('/login');
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;
export { AuthContext };
