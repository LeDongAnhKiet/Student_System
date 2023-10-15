import React, {useContext, useState} from 'react';
import logo from '../styles/ou.png';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../layouts/App";
import {Form, Input, Label} from "reactstrap";
import AuthService, {auth, endpoints} from "../services/AuthService";
import cookie from "react-cookies";

function Signin() {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();

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
            try {
                const res = await AuthService.post(endpoints['signin'], {
                    'email': email,
                    'password': password
                });
                cookie.save('token', res.data);
                let { data } = await auth().get(endpoints['user']);
                cookie.save('user', data);
                setUser({
                    'type': 'signin',
                    'payload': data
                });

                if (data !== null) {
                    setError('Đăng nhập thành công.');
                    return nav('/home');
                }
                else setError('Sai tài khoản hoặc mật khẩu.');
            } catch (error) {
                setError('Lỗi đăng nhập.');
                console.error('Lỗi xác thực:', error);
            }
        }
    }

    return (
        <div className="mt-3 ms-5 me-5 d-flex justify-content-center align-items-center border-primary border-3 border rounded-5">
            <Form onSubmit={handleSubmit}>
                <img className="my-auto d-block App-logo rounded-pill" src={logo} alt="logo"/>
                <h3 className="mb-5 text-center">Đăng nhập</h3>
                <div className="mb-3">
                    <Label className="form-Form.Label">Email</Label>
                    <Input type="text" className="form-control"
                        value={email} onChange={handleEmailChange} />
                </div>
                <div className="mb-3">
                    <Label className="form-Label">Mật khẩu</Label>
                    <Input type="password" className="form-control"
                        value={password} onChange={handlePasswordChange} />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="text-end"><button type="submit" className="mb-3 btn btn-primary">Đăng nhập</button></div>
            </Form>
        </div>
    );
}

export default Signin