import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import StudentService from "../../../services/Admin/StudentService";
import {useNavigate, useParams} from "react-router-dom";

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            StudentService.getDepartmentById(id).then(res => {
                setDepartments(res.data);
            });
        else
                StudentService.getDepartment().then(res => {
            setDepartments(res.data);
        });
    }, [id]);

    return (
        <Container fluid className='mb-5 pd-5'>
            <h3 className ="App">Danh sách các khoa</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App"><tr>
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
                                ))
                            }
                        </>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary"
                        onClick={() => {nav('/home')}}>Quay lại
                </Button>
            </Row>
        </Container>
    );
}
export default DepartmentList;