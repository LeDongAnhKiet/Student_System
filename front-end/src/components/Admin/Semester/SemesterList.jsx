import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import SemesterService from "../../../services/Admin/SemesterService";
import {useNavigate} from "react-router-dom";

function SemesterList() {
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        SemesterService.getAvailableSemester().then((res) => {
            setSemesters(res.data);
        });
    }, []);

    const addSemester = () => { nav('/admin/semester/add'); }

    const deleteSemester = (id) => {
        SemesterService.deleteSemester(id).then(() => {
            setSemesters(semesters.filter(semester => semester.id !== id));
        })
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
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Danh sách các học kỳ đang hoạt động</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Học kỳ</th>
                            <th>Ghi chú</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { semesters.map( semester => (
                            <tr key={semester.id}>
                                <td>{semester.semesterName}</td>
                                <td>{semester.note}</td>
                                <td className="text-center">
                                    <button className="btn-success btn"
                                            onClick={() => {updateSemester(semester)}}>Chỉnh sửa
                                    </button>
                                    <button className="ms-2 btn-danger btn"
                                            onClick={() => {deleteSemester(semester.id)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addSemester}>Thêm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default SemesterList;