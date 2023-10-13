import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import AUTHORIZATION_API from "../services/AuthService";

const Signout = () => {
    const nav = useNavigate();
    const { signout } = useAuth();

    useEffect(() => {
        // Gọi hàm signout khi trang được tải
        signout()
            .then(() => {
                nav(`${AUTHORIZATION_API}/signin`);
            })
            .catch((error) => {
                // Xử lý lỗi nếu cần
                console.error('Lỗi đăng xuất:', error);
                nav(`${AUTHORIZATION_API}/signin`);
            });
    }, [nav, signout]);
};

export default Signout;
