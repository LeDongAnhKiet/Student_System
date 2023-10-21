import React, { Component } from 'react';
import { Container, Table } from 'reactstrap';
import UserService from "../../services/User/UserService";
import {useNavigate} from "react-router-dom";

class UserInfoList extends Component {
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
    nav = useNavigate();

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
                        <Table className="mt-5">
                            <tr className="border-bottom">
                                <th>Họ và tên</th>
                                <td>{user.fullName}</td>
                            </tr>
                            <tr className="border-bottom">
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr className="border-bottom">
                                <th>Khoa</th>
                                <td>{user.department_name}</td>
                            </tr>
                            <tr className="border-bottom">
                                <th>Ngành</th>
                                <td>{user.major_name}</td>
                            </tr>
                        </Table>
                    </div>
                    <div className="float-end row">
                        <button className="btn-primary btn"
                                onClick={() => user.nav('/home')}>Quay lại
                        </button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default UserInfoList;