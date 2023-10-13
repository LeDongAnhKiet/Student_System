import React, {useContext, useState} from 'react';
import logo from './ou.png';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {AuthContext} from "./Auth";
import {UserContext} from "./App";

function Signin() {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Sử dụng AuthContext để xác định kiểu dữ liệu của useAuth
    const { signin } = useContext(AuthContext);
    const nav = useNavigate();
    const [q] = useSearchParams();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === '')
            setError('Vui lòng nhập đầy đủ thông tin.');
        else {
            const request = {
                'email': email,
                'password': password,
            };

            signin(request);

            if (user !== null) {
                setError('Đăng nhập thành công.');
                return nav(q.get('next') || '/');
            }
            else setError('Sai tài khoản hoặc mật khẩu.');
        }
    }

    return (
        <div className="mt-3 ms-5 me-5 d-flex justify-content-center align-items-center border-primary border-3 border rounded-5">
            <form onSubmit={handleSubmit}>
                <img className="my-auto d-block App-logo rounded-pill" src={logo} alt="logo"/>
                <h3 className="mb-5 text-center">Đăng nhập</h3>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control"
                        value={email} onChange={handleEmailChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input type="password" className="form-control"
                        value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-end"><button type="submit" className="mb-3 btn btn-primary">Đăng nhập</button></div>
            </form>
        </div>
    );
}

export default Signin