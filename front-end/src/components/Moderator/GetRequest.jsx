import React, { useEffect, useState } from 'react';
import {Button, Container, FormGroup, Input, Label, Row, Table} from 'reactstrap';
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
        <Container fluid className='mb-5'>
            <h3 className="App mt-2">Quản lý dịch vụ</h3>
            <FormGroup>
                <Label className="m-1">Lọc dịch vụ</Label>
                <Input type="select" name="cate" className="custom-select rounded-3 p-1"
                        value={selectedCate} onChange={selectChange}>
                    <Option value="">Chọn loại</Option>
                    {cates.map((cate) => (
                        <Option key={cate.id} value={cate.id}>{cate.serviceCateName}</Option>
                    ))}
                </Input>
            </FormGroup>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App">
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
                                <td className="App">
                                    <Button className="m-1" color="success"
                                            onClick={() => { ModerateService.acceptRequest(service.id) }}>Duyệt
                                    </Button>
                                    <Button className="m-1" color="danger"
                                            onClick={() => { ModerateService.deleteRequest(service.id) }}>Xóa
                                    </Button>
                                </td>
                            </tr>
                        )
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="info"
                        onClick={ModerateService.searchRequest}>Tìm kiếm
                </Button>
            </Row>
        </Container>
    );
}

export default GetRequest
