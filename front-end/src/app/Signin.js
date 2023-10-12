import React, { useState } from 'react';
import logo from './ou.png';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const nav = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
        setSuccess('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setSuccess('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === '' || password === ''){
            setError('Vui lòng nhập đầy đủ thông tin');
            setSuccess('');
        }
    else {
            const requestBody = {
                email: email,
                password: password,
            };
            fetch('/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.email) {
                        setError('');
                        setSuccess('Đăng nhập thành công');
                        nav('/home');
                    } else {
                        setError('Sai tài khoản hoặc mật khẩu.');
                        setSuccess('');
                    }
                }).catch(() => {
                    setError('Đã xảy ra lỗi khi đăng nhập.');
                    setSuccess('');
            });
        }
    };
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
                {success && <div className="alert alert-success">{success}</div>}
                <div className="text-end"><button type="submit" className="mb-3 btn btn-primary">Đăng nhập</button></div>
            </form>
        </div>
    );
}

export default Signin;