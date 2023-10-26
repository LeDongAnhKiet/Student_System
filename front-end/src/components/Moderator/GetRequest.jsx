import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ModerateService from "../../services/Mod/ModerateService";

function GetRequest() {
    const [services, setServices] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        ModerateService.getRequest().then((res) => {
            setServices(res.data);
        });
    }, []);

    const addCate = () => { nav('/user/service/add'); }
    const updateCate = () => { nav('/user/service/add'); }
    const searchRequest = () => { nav('/user/service/my-request'); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className="App mt-2">Quản lý dịch vụ</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center">
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Ngày yêu cầu</th>
                            <th>Trạng thái</th>
                            <th>Thành tiền</th>
                            <th>Giao hàng</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.serviceCateName}</td>
                                <td>{service.createdDate}</td>
                                <td>{service.status}</td>
                                <td>{service.price}</td>
                                <td>{service.isShipped}</td>
                                <td className="text-center">
                                    <button className="btn-success btn"
                                            onClick={() => {updateCate(service.id)}}>Chỉnh sửa
                                    </button>
                                    <button className="ms-2 btn-warning btn"
                                            onClick={() => {addCate(service.id)}}>Kiểm duyệt
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-info btn"
                            onClick={searchRequest}>Tìm kiếm
                    </button>
                </div>
            </Container>
        </div>
    );
}

export default GetRequest;
