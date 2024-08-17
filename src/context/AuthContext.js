import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api/'; // Updated base URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('refreshToken', refreshToken);
    }, [authToken, refreshToken]);

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_BASE_URL}token/`, { email, password });
            setAuthToken(response.data.access);
            setRefreshToken(response.data.refresh);
            setIsAuthenticated(true);
            setAuthError(null);
            await fetchUser(response.data.access);
            navigate('/'); // Navigate to the home or dashboard page
            setIsLoading(false);
            return true;
        } catch (error) {
            setAuthError(error.response?.data?.detail || 'An error occurred. Please try again.');
            setIsLoading(false);
            return false;
        }
    };

    const refreshAuthToken = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}token/refresh/`, { refresh: refreshToken });
            setAuthToken(response.data.access);
            setAuthError(null);
        } catch (error) {
            setAuthError('Session expired. Please log in again.');
            logout();
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}logout/`, {}, { headers: { Authorization: `Bearer ${authToken}` } });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setAuthToken('');
            setRefreshToken('');
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        }
    };

    const fetchUser = async (token) => {
        try {
            const userResponse = await axios.get(`${API_BASE_URL}auth/users/me/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(userResponse.data);
        } catch (error) {
            console.error('Fetch user error:', error.response?.data?.detail || 'An error occurred.');
        }
    };

    useEffect(() => {
        localStorage.setItem('authToken', authToken);
        if (authToken) {
            // Fetch user details
            axios.get(`${API_BASE_URL}auth/users/me/`, {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then(response => setUser(response.data))
            .catch(error => {
                setAuthToken('');
                setIsAuthenticated(false);
                localStorage.removeItem('authToken');
                navigate('/login');
            })
            .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [authToken, navigate]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (isAuthenticated && refreshToken) {
                refreshAuthToken();
            }
        }, 30 * 60 * 1000); // Refresh every 30 minutes

        return () => clearInterval(interval);
    }, [isAuthenticated, refreshToken]);

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout, authError, user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
