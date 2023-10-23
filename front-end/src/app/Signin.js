import React, {useContext, useState} from 'react';
import logo from '../styles/image/ou.png';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "./App";
import {Form, Input, Label} from "reactstrap";
import AuthService, {auth, endpoints} from "../services/Guest/AuthService";
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

                if (data !== null || user !== null) {
                    setError('Đăng nhập thành công.');
                    nav('/home');
                }
                else {
                    setError('Lỗi đăng nhập.');
                    console.error('Lỗi xác thực:', error);
                }
            } catch (error) { setError('Sai tài khoản hoặc mật khẩu.'); }
        }
    }

    return (
        <div className="pt-5 bg-primary shadow-lg py-5 rounded-5"
             style={{marginLeft: "18%", marginRight: "18%"}}>
            <div className="px-5 rounded-5">
                <div className="bg-white d-flex justify-content-center rounded-5">
                    <Form onSubmit={handleSubmit}>
                    <img className="App-logo mx-auto my-3 d-block rounded-5" src={logo} alt="logo"/>
                    <h2 className="mb-4">Đăng nhập vào hệ thống</h2>
                    <div className="mb-3">
                        <Label className="form-label">Tài khoản</Label>
                        <Input type="text" className="form-control"
                            value={email} onChange={handleEmailChange} />
                    </div>
                    <div className="mb-3">
                        <Label className="form-label">Mật khẩu</Label>
                        <Input type="password" className="form-control"
                            value={password} onChange={handlePasswordChange} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-end">
                        <button type="submit" className="mb-5 btn btn-primary">Đăng nhập</button>
                    </div>
                </Form>
                </div>
            </div>
        </div>
    );
}

export default Signin