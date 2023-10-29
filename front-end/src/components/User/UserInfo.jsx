import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import UserService from "../../services/User/UserService";
import { useNavigate } from "react-router-dom";

function UserInfo() {
    const [user, setUser] = useState({});
    const nav = useNavigate();

    useEffect(() => {
        UserService.getUser().then(res => {
            setUser(res.data);
        });
    }, []);

    return (
        <Container fluid>
            <h3 className="App">Thông tin sinh viên</h3>
            <Row>
                <Table className="mt-5 table-striped">
                    <tr className="border-bottom" style={{height:'50px'}}>
                        <th>Họ và tên</th>
                        <td>{user.fullName}</td>
                    </tr>
                    <tr className="border-bottom" style={{height:'50px'}}>
                        <th>Ảnh đại diện</th>
                        {user.avatar !== '' && user.avatar !== null ? (<> {user.avatar}</>) : (
                            <td dangerouslySetInnerHTML={{ __html: '&#x1F464;' }}></td>
                        )}
                    </tr>
                    <tr className="border-bottom" style={{height:'50px'}}>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr className="border-bottom" style={{height:'50px'}}>
                        <th>Khoa</th>
                        <td>{user.department_name}</td>
                    </tr>
                    <tr className="border-bottom" style={{height:'50px'}}>
                        <th>Ngành</th>
                        <td>{user.major_name}</td>
                    </tr>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary" onClick={() => nav('/home')}>Quay lại</Button>
            </Row>
        </Container>
    );
}

export default UserInfo;
