import React, {useEffect, useState} from 'react';
import { Container, Table } from 'reactstrap';
import StudCertificateService from "../../services/User/StudCertificateService";
import {useNavigate} from "react-router-dom";

function StudCertificateList() {
    const [studCertificates, setStudCertificates] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        StudCertificateService.getStudCertificate().then((res) => {
            setStudCertificates(res.data);
        });
    }, []);

    const addStudCertificate = () => { nav('/user/service/stud-cert/add'); };

    const updateStudCertificate = (id) => { nav(`/user/service/stud-cert/update/${id}`); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Chứng nhận sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
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
                                <td><button className="btn-success btn"
                                            onClick={updateStudCertificate}>Sửa chứng nhận
                                </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addStudCertificate}>Đăng ký chứng nhận
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default StudCertificateList;