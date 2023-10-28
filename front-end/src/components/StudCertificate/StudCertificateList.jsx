import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import StudCertificateService from "../../services/User/StudCertificateService";
import {useNavigate, useParams} from "react-router-dom";

function StudCertificateList() {
    const { id } = useParams();
    const [studCertificates, setStudCertificates] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        StudCertificateService.getStudCertificate(id).then(res => {
            setStudCertificates(res.data);
        });
    }, []);

    const addStudCertificate = () => { nav('/user/service/stud-cert/add'); };

    const updateStudCertificate = (studCertificate) => {
        nav(`/user/service/stud-cert/update/${studCertificate.onlineService.id}`, {
            state: {
                vietCopy: studCertificate.vietCopy,
                engCopy: studCertificate.engCopy,
                email: studCertificate.email,
                phoneContact: studCertificate.phoneContact,
                content: studCertificate.content,
            }
        });
    }

    return (
        <Container>
            <h3 className ="App">Chứng nhận sinh viên</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App"><tr>
                        <th>Email</th>
                        <th>Bản sao tiếng Việt</th>
                        <th>Bản sao tiếng Anh</th>
                        <th>Số điện thoại</th>
                        <th>Nội dung</th>
                        <th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                    { studCertificates.map( studCertificate => (
                        <tr key={studCertificate.id}>
                            <td>{studCertificate.email}</td>
                            <td>{studCertificate.vietCopy}</td>
                            <td>{studCertificate.engCopy}</td>
                            <td>{studCertificate.phoneContact}</td>
                            <td>{studCertificate.content}</td>
                            <td><Button color="success"
                                        onClick={() => updateStudCertificate(studCertificate)}>Sửa chứng nhận
                            </Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary" onClick={addStudCertificate}>Đăng ký chứng nhận</Button>
            </Row>
        </Container>
    );
}
export default StudCertificateList;