import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import UserService from "../../services/User/UserService";

function SemesterList() {
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        UserService.getSemester().then(res => {
            setSemesters(res.data);
        });
    }, []);

    const viewSemester = (id) => { nav('/user/semester/' + id + '/course'); }
    const goBack = () => { nav('/home'); }

    return (
        <Container fluid className='mb-5'>
            <h3 className ="App">Xem thời khóa biểu học kỳ</h3>
            {!semesters ? <>
                <h3 className='display-6 m-3'>Không có học kỳ nào!</h3>
            </> : <>
                <Row>
                    <Table className="mt-3 table-striped table-bordered">
                        <thead className="App"><tr>
                            <th>Học kỳ</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { semesters.map( semester => (
                            <tr key={semester.id}>
                                <td>{semester.semesterName}</td>
                                <td>{semester.status}{/* ? 'Còn hoạt động' : 'Đã kết thúc'*/}</td>
                                <td className='App'>
                                    <button className="btn-primary btn"
                                            onClick={() => viewSemester(semester.id)}>Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            </>}
            <Row className="float-end">
                <Button color="primary" onClick={goBack}>Quay lại</Button>
            </Row>
        </Container>
    );
}
export default SemesterList;