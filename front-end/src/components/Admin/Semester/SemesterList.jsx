import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Row, Table} from 'reactstrap';
import SemesterService from "../../../services/Admin/SemesterService";
import {useNavigate} from "react-router-dom";

function SemesterList() {
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();
    const [success, setSuccess] = useState('');

    useEffect(() => {
        SemesterService.getAvailableSemester().then(res => {
            setSemesters(res.data);
        });
    }, []);

    const addSemester = () => { nav('/admin/semester/add'); }

    const deleteSemester = (semester) => {
        SemesterService.deleteSemester(semester.id).then(() => {
            setSemesters(semesters.filter(s => s.id !== semester.id));
        })
        setSuccess(`Xóa ${semester.semesterName} thành công.`)
    }

    const updateSemester = (semester) => {
        nav(`/admin/semester/update/${semester.id}`, {
            state: {
                semesterName: semester.semesterName,
                note: semester.note,
            }
        });
    }

    return (
        <Container fluid className='mb-5'>
            <h3 className ="App">Danh sách các học kỳ đang hoạt động</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App"><tr>
                        <th>Học kỳ</th>
                        <th>Ghi chú</th>
                        <th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                    { semesters.map( semester => (
                        <tr key={semester.id}>
                            <td>{semester.semesterName}</td>
                            <td>{semester.note}</td>
                            <td className="App">
                                <Button className="m-1" color="success"
                                        onClick={() => {updateSemester(semester)}}>Chỉnh sửa
                                </Button>
                                <Button className="m-1" color="danger"
                                        onClick={() => {deleteSemester(semester)}}>Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <button color="primary" onClick={addSemester}>Thêm</button>
            </Row>
            {success && <Alert color="success" className="fixed-bottom"
               style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
               onMouseEnter={() => setSuccess('')}>{success}</Alert>}
        </Container>
    );
}
export default SemesterList;