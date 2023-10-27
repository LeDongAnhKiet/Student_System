import React, {useContext, useState} from 'react';
import logo from '../styles/image/ou.png';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "./App";
import {Card, Alert, Button, Form, FormGroup, Input, Label, CardBody} from "reactstrap";
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
        <Card className="bg-primary shadow-lg py-2 rounded-5"
             style={{marginLeft: "20%", marginRight: "20%"}}>
            <CardBody className="px-4 rounded-5">
                <CardBody className="bg-white d-flex justify-content-center rounded-5">
                    <Form onSubmit={handleSubmit}>
                        <img className="App-logo mx-auto my-3 d-block rounded-5" src={logo} alt="logo"/>
                        <h2 className="mb-4">Đăng nhập vào hệ thống</h2>
                        <FormGroup className="mb-3">
                            <Label>Tài khoản</Label>
                            <Input type="text" value={email} onChange={handleEmailChange} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label>Mật khẩu</Label>
                            <Input type="password" value={password} onChange={handlePasswordChange} />
                        </FormGroup>
                        {error && <Alert color="danger" className="fixed-top"
                                         style={{marginTop:"10%", marginRight:"25%", marginLeft:"25%"}}
                                         onMouseEnter={() => setError('')}>{error}</Alert>}
                        <div className="text-end">
                            <Button color="primary" type="submit" className="mb-5">Đăng nhập</Button>
                        </div>
                    </Form>
                </CardBody>
            </CardBody>
        </Card>
    );
}

export default Signin