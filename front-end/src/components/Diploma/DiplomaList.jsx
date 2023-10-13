import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import DiplomaService from "../../services/DiplomaService";
import {useNavigate} from "react-router-dom";

function DiplomaList() {
    const [diplomas, setDiplomas] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        DiplomaService.getDiploma().then((res) => {
            setDiplomas(res.data);
        });
    }, []);

    const addDiploma = () => { nav('/user/service/diploma/add'); };

    const getDiploma = (id) => { nav(`/user/service/diploma/${id}`); }

    const updateDiploma = (id) => { nav(`/user/service/diploma/update/${id}`); }

    return (
        <div>
            <Container fluid>
                <h3 className ="App">Cấp bằng tốt nghiệp</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
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
                                <td>
                                    <button className="btn-success btn m-1"
                                        onClick={updateDiploma}>Sửa bằng cấp
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addDiploma}>Đăng ký cấp bằng
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default DiplomaList;