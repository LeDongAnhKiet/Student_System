import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import UserService from "../../services/User/UserService";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 0,
                email: '',
                fullName: '',
                avatar: '',
                role: '',
                major_name: '',
                department_name: ''
            }
        }
    }

    componentDidMount() {
        UserService.getUser().then(res => {
            this.setState({ user: res.data });
        });
    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <Container fluid>
                    <h3 className="App">Thông tin sinh viên</h3>
                    <div className="row">
                        <Table className="mt-3 table table-striped table-bordered">
                            <thead className="text-center align-middle">
                            <tr>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>Khoa</th>
                                <th>Ngành</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.department_name}</td>
                                <td>{user.major_name}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        );
    }
}

export default UserList;
