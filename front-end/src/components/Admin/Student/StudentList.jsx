import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import StudentService from "../../../services/Admin/StudentService";
import {useNavigate, useParams} from "react-router-dom";

function StudentList() {
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
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Danh sách sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
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
                <button className="btn btn-primary m-1" onClick={() => nav('/home')} >Quay lại</button>
            </Container>
        </div>
    );
}
export default StudentList;