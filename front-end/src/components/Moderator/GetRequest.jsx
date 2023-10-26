import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ModerateService from "../../services/Mod/ModerateService";
import HomeService from "../../services/Guest/HomeService";

function GetRequest() {
    const [services, setServices] = useState([]);
    const [cates, setCates] = useState([]);
    const [selectedCate, setSelectedCate] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (id)
            ModerateService.getRequestById(id).then(res => {
                setServices(res.data);
            })
        else
            ModerateService.getRequest().then(res => {
                setServices(res.data);
            })
        HomeService.getCate().then(res => {
            setCates(res.data);
        })
    }, [id]);

    const selectChange = (e) => {
        HomeService.getCateById(e.target.value).then(res => {
            setSelectedCate(res.data);
        });
    }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className="App mt-2">Quản lý dịch vụ</h3>
                <div className="form-group">
                    <label className="m-1">Lọc dịch vụ</label>
                    <select name="cate" className="custom-select rounded-3 p-1"
                            value={selectedCate} onChange={selectChange}>
                        <option value="">Chọn loại</option>
                        {cates.map((cate) => (
                            <option key={cate.id} value={cate.id}>{cate.serviceCateName}</option>
                        ))}
                    </select>
                </div>
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
                            (!selectedCate.id || selectedCate.serviceCateName === service.serviceCateName) && (
                                <tr key={service.id}>
                                    <td>{service.serviceCateName}</td>
                                    <td>{service.createdDate}</td>
                                    <td>{service.status}</td>
                                    <td>{service.price}</td>
                                    <td>{service.isShipped ? "Đã giao" : "Chưa giao"}</td>
                                    <td className="text-center">
                                        <button className="btn-success btn"
                                                onClick={() => { ModerateService.acceptRequest(service.id) }}>Duyệt
                                        </button>
                                        <button className="ms-2 btn-danger btn"
                                                onClick={() => { ModerateService.deleteRequest(service.id) }}>Xóa
                                        </button>
                                    </td>
                                </tr>
                            )
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-info btn"
                            onClick={ModerateService.searchRequest}>Tìm kiếm
                    </button>
                </div>
            </Container>
        </div>
    );
}

export default GetRequest
