const TOKEN = 'token';
const setToken = (token) => localStorage.setItem(TOKEN, token);
const getToken = () => localStorage.getItem(TOKEN);
const removeToken = () => localStorage.removeItem(TOKEN);

export { setToken, getToken, removeToken };

// completed
