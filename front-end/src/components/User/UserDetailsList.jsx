import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import UserService from "../../services/User/UserService";
import {useNavigate, useParams} from "react-router-dom";

function UserDetailsList() {
    const [details, setDetails] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        UserService.getDetails(id).then(res => {
            setDetails(res.data);
        });
    }, [id]);

    const goBack = () => { nav(-1); }

    return (
        <div>
            <Container fluid>
                <h3 className ="App">Thời khóa biểu học kỳ</h3>
                {details.length === 0 ? (<>
                    <h3 className='display-6 m-3'>Không có môn học nào!</h3>
                </>) : (<>
                    <Row>
                        <Table className="mt-3 table-striped table-bordered">
                            <thead  className="App"><tr>
                                <th>Tên môn học</th>
                                <th>Số tín chỉ</th>
                                <th>Điểm</th>
                                <th>Kết quả</th>
                            </tr></thead>
                            <tbody>
                            { details.map( detail => (
                                <tr key={detail.id}>
                                    <td>{detail.courseData.course.courseName}</td>
                                    <td>{detail.courseData.course.creditsNum}</td>
                                    <td>{detail.score}</td>
                                    <td className='App fw-bold'>{detail.isPassed ? (
                                        <span className='text-success'
                                              dangerouslySetInnerHTML={{ __html: '&check;' }}></span>
                                    ) : (
                                        <span className='text-danger'
                                              dangerouslySetInnerHTML={{ __html: '&cross;' }}></span>
                                    )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Row>
                </>)}
                <Row className="float-end">
                    <Button color="primary" onClick={goBack}>Quay lại</Button>
                </Row>
            </Container>
        </div>
    );
}
export default UserDetailsList;