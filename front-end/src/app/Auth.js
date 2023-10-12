import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kiểm tra cookie hoặc xác thực ở đây và cập nhật state user
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Thực hiện kiểm tra xác thực ở đây và cập nhật state user
                const response = await fetch('/api/user/info');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Lỗi xác thực:', error);
            }
        };

        checkAuth().then();
    }, []);

    const signin = async (userData) => {
        try {
            // Thực hiện đăng nhập và cập nhật state user
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 200) {
                const user = await response.json();
                setUser(user);
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        }
    };

    const signout = async () => {
        try {
            // Thực hiện đăng xuất và cập nhật state user
            await fetch('/api/auth/signout', {
                method: 'POST',
            });
            setUser(null);
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
