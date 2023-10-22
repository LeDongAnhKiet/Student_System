import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import StudentService from "../../../services/Admin/StudentService";
import {useNavigate} from "react-router-dom";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        StudentService.getDepartment().then((res) => {
            setDepartments(res.data);
        });
    }, []);

    return (
        <div className='mb-5 pd-5'>
            <Container fluid>
                <h3 className ="App">Danh sách các khoa</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Tên khoa</th>
                            <th>Các ngành</th>
                            <th>Ghi chú</th>
                        </tr></thead>
                        <tbody>
                        {departments.map((department) => (
                            <>
                                <tr key={department.id}>
                                    <td rowSpan={department.majors ? department.majors.length + 1 : 1}>
                                        {department.departmentName}
                                    </td>
                                    {department.majors && department.majors.length > 0 ? (
                                        <td>{department.majors[0].majorName}</td>
                                    ) : (
                                        <td></td>
                                    )}
                                    <td>{department.description}</td>
                                </tr>
                                {department.majors &&
                                    department.majors.slice(1).map((major) => (
                                        <tr key={major.id}>
                                            <td>{major.majorName}</td>
                                        </tr>
                                    ))}
                            </>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={() => {nav('/home')}}>Quay lại
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default DepartmentList;