import React, { useEffect, useState } from 'react';
import {Alert, Button, Container, Row, Table} from 'reactstrap';
import DiplomaService from "../../services/User/DiplomaService";
import { useNavigate, useParams } from "react-router-dom";

function DiplomaList() {
    const { id } = useParams();
    const [diploma, setDiploma] = useState({
        copy: 0,
        phoneContact: '',
        email: '',
        diplomaYear: 1970,
        diplomaCode: '',
        onlineService: {}
    });
    const nav = useNavigate();

    useEffect(() => {
        DiplomaService.getDiploma(id).then(res => {
            setDiploma(res.data);console.log(res.data)
        });
    }, [id]);

    const addDiploma = () => { nav('/user/service/diploma/add'); };

    const updateDiploma = (diploma) => {
        nav(`/user/service/diploma/update/${diploma.onlineService.id}`, {
            state: {
                copy: diploma.copy,
                phoneContact: diploma.phoneContact,
                email: diploma.email,
                diplomaYear: diploma.diplomaYear,
                diplomaCode: diploma.diplomaCode,
            }
        });
    }

    return (
        <Container fluid className='mb-5'>
            <h3 className="App">Cấp bản sao bằng tốt nghiệp</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App">
                        <tr>
                            <th>Số lượng bản sao</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Năm tốt nghiệp</th>
                            <th>Mã bằng</th>
                            <th>Ngày đăng ký</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={diploma.id}>
                            <td>{diploma.copy}</td>
                            <td>{diploma.phoneContact}</td>
                            <td>{diploma.email}</td>
                            <td>{diploma.diplomaYear}</td>
                            <td>{diploma.diplomaCode}</td>
                            <td>{diploma.onlineService.createdDate}</td>
                            <td className="App">
                                <Button color="success"
                                        onClick={() => updateDiploma(diploma)}>Chỉnh sửa
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary" className="m-1"
                        onClick={addDiploma}>Đăng ký cấp bản sao
                </Button>
                <Button color="secondary" className="m-1"
                        onClick={() => nav('/home')}>Quay lại
                </Button>
            </Row>
        </Container>
    );
}

export default DiplomaList;
