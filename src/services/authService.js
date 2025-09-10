import api from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post(`/auth/login`, credentials);
        // The backend returns 'accessToken', not 'token'
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        return token;
    },

    register: async (userData) => {
        return api.post(`/auth/register`, userData);
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }
};
