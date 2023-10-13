import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, {auth, endpoints} from "../services/AuthService";
import cookie from "react-cookies";
import {UserContext} from "./App";

export const AuthContext = createContext();

export const useAuth = () => { return useContext(AuthContext); }

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useContext(UserContext);

    const signin = async (userData) => {
        // Thực hiện đăng nhập và cập nhật state user
        let res = await AuthService.post(endpoints['signin'], {userData});
        cookie.save('token', res.data);
        let {data} = await auth.get(endpoints['user']);
        cookie.save('user', data);
        setUser(data);
        setUser({
            'type': 'signin',
            'payload': data
        });
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    const signout = async () => {
        try {
            // Thực hiện đăng xuất và cập nhật state user
            await AuthService.post(endpoints['signout'], {
                method: 'POST',
            });
            setUser(null);
        } catch (error) {
            console.error('Lỗi đăng xuất: ', error);
        }
        sessionStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}
