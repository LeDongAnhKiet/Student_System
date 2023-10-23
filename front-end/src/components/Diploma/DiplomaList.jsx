import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import DiplomaService from "../../services/User/DiplomaService";
import {useNavigate, useParams} from "react-router-dom";

function DiplomaList() {
    const { id } = useParams();
    const [diplomas, setDiplomas] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        DiplomaService.getDiploma(id).then((res) => {
            setDiplomas(res.data);
        });
    }, []);

    const addDiploma = () => { nav('/user/service/diploma/add'); };

    const updateDiploma = (diploma) => {
        nav(`/user/service/diploma/update/${diploma.id}`, {
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
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Cấp bản sao bằng tốt nghiệp</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Số lượng bản sao</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Năm tốt nghiệp</th>
                            <th>Mã bằng</th>
                            <th>Ngày đăng ký</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { diplomas.map( diploma => (
                            <tr key={diploma.id}>
                                <td>{diploma.copy}</td>
                                <td>{diploma.phoneContact}</td>
                                <td>{diploma.email}</td>
                                <td>{diploma.diplomaYear}</td>
                                <td>{diploma.diplomaCode}</td>
                                <td>{diploma.onlineService.createdDate}</td>
                                <td className="text-center">
                                    <button className="btn-success btn"
                                        onClick={() => updateDiploma(diploma)}>Sửa bằng cấp
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addDiploma}>Đăng ký cấp bằng
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default DiplomaList;