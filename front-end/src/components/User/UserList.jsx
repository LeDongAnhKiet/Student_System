import React, {Component} from 'react';
import { Container, Table } from 'reactstrap';
import UserService from "../../services/UserService";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        UserService.getUser().then(res => {
            this.setState({users: res.data});
        });
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <h3 className ="App">Thông tin sinh viên</h3>
                    <div className="row">
                        <Table className="mt-3 table table-striped table-bordered">
                            <thead className="text-center align-middle"><tr>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>Khoa</th>
                                <th>Ngành</th>
                            </tr></thead>
                            <tbody>
                            { this.state.users.map( user => (
                                <tr key={user.id}>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.department_name}</td>
                                    <td>{user.major_name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        );
    }
}
export default UserList;