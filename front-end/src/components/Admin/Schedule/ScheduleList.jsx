import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import StudentService from "../../../services/Admin/StudentService";
import {useNavigate, useParams} from "react-router-dom";

function ScheduleList() {
    const [students, setStudents] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
        StudentService.getStudentByCourseId().then((res) => {
            setStudents(res.data);
        });
        else StudentService.getStudent().then((res) => {
            setStudents(res.data);
        })
    }, [id]);

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
                        { students.map( student => (
                            <tr key={student.id}>
                                <td>{student.fullName}</td>
                                <td>{student.email}</td>
                                <td>{student.department_name}</td>
                                <td>{student.major_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}
export default ScheduleList;