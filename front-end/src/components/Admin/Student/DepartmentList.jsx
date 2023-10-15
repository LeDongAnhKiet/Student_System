import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import DepartmentService from "../../../services/Admin/StudentService";
import {useNavigate, useParams} from "react-router-dom";
<<<<<<< Updated upstream
import StudentService from "../../../services/Admin/StudentService";
=======
>>>>>>> Stashed changes

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            DepartmentService.getDepartmentById().then((res) => {
                setDepartments(res.data);
            });
<<<<<<< Updated upstream
        else DepartmentService.getDepartment().then((res) => {
            setDepartments(res.data);
=======
        else DepartmentService.getDepartment().then((res) => {            setDepartments(res.data);
>>>>>>> Stashed changes
        });
    }, []);

    return (
        <div>
            <Container fluid>
                <h3 className ="App">Danh sách các khoa</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Tên khoa</th>
                            <th>Các ngành</th>
                            <th>Ghi chú</th>
                        </tr></thead>
                        <tbody>
                        { departments.map( department => (
                            <tr key={department.id}>
                                <td>{department.departmentName}</td>
                                <td>{department.description}</td>
                                <td>{department.majors.map(major => (
                                    <tr key={major.id}>
                                        <td>{major.majorName}</td>
                                    </tr>
                                ))}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={() => {nav(-1)}}>Quay lại
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default DepartmentList;