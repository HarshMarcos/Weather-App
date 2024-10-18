import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const backendURL = import.meta.env.VITE_API_URL;

    const login = async (username, password) => {
        const response = await axios.post(`${backendURL}/api/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        setUser(username);
    };

    const register = async (username, password) => {
        await axios.post(`${backendURL}/api/register`, { username, password });
        await login(username, password);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(JSON.parse(atob(token.split('.')[1])).username);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
