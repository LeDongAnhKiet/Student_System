import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import UserService from "../../services/User/UserService";

function SemesterList() {
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        UserService.getSemester().then((res) => {
            setSemesters(res.data);
        });
    }, []);

    const viewSemester = (id) => { nav('api/user/semester/' + id + '/course'); }
    const goBack = () => { nav(-1); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Xem thời khóa biểu</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Học kỳ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { semesters.map( semester => (
                            <tr key={semester.id}>
                                <td>{semester.semesterName}</td>
                                <td>{semester.status ? 'Còn hoạt động' : 'Đã kết thúc'}</td>
                                <td className='text-center'>
                                    <button className="btn-primary btn m-1"
                                            onClick={() => viewSemester(semester.id)}>Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={goBack}>quay lại
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default SemesterList;