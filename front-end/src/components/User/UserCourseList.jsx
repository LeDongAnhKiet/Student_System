import React, {Component} from 'react';
import { Container, Table } from 'reactstrap';
import UserService from "../../services/User/UserService";

class UserCourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        UserService.getCourse().then(res => {
            this.setState({courses: res.data});
        });
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <h3 className ="App">Thời khóa biểu</h3>
                    <div className="row">
                        <Table className="mt-3 table table-striped table-bordered">
                            <thead  className="text-center align-middle"><tr>
                                <th>Tên môn học</th>
                                <th>Số tín chỉ</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Giảng viên</th>
                            </tr></thead>
                            <tbody>
                            { this.state.courses.map( course => (
                                <tr key={course.id}>
                                    <td>{course.course.courseName}</td>
                                    <td>{course.course.creditsNum}</td>
                                    <td>{course.startDate}</td>
                                    <td>{course.endDate}</td>
                                    <td>{course.lecture.lectureName}</td>
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
export default UserCourseList;