import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('api/v1/user/all_users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
    }, []);
    const remove = async (id) => {
        await fetch(`/api/v1/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedUsers = [...users].filter(i => i.id !== id);
            setUsers(updatedUsers);
        });
    }

    if (loading) return <p>Loading...</p>;
    const userList = users.map(user => {
        return <tr key={user.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{user.fullName}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.email}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.phone}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.gender}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.dayOfBirth}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{user.major}</td>
            <td><ButtonGroup>
                <Button size="sn" color="primary" tag={Link}
                    to={"/users/" + user.id}>Edit</Button>
                <Button size="sn" color="danger" onClick={
                    () => remove(user.id)}>Delete</Button>
            </ButtonGroup></td>
        </tr>
    });
    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/new">Add user</Button>
                </div>
                <h3>Thông tin sinh viên</h3>
                <Table className="mt-6">
                    <thead><tr>
                        <th width="20%">Họ và Tên</th>
                        <th width="20%">Email</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th width="20%">Ngành</th>
                    </tr></thead>
                    <tbody>{userList}</tbody>
                </Table>
            </Container>
        </div>
    );
};

export default UserList;