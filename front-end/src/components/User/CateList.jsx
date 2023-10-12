import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import Header from '../../app/Header';
import CateService from '../../services/HomeService';
import { useNavigate, useParams } from 'react-router-dom';

function CateList() {
    const [cates, setCates] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            // Trường hợp có id - Lấy dịch vụ cụ thể
            CateService.getCateById(id).then((res) => {
                setCates([res.data]);
            });
        else
            // Trường hợp không có id - Lấy tất cả các dịch vụ
            CateService.getCate().then((res) => {
                setCates(res.data);
            });
    }, [id]);

    return (
        <div>
            <Header />
            <Container fluid>
                <h3 className="App">Đăng ký dịch vụ</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle">
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Đơn giá</th>
                            <th>Trạng thái</th>
                            <th>Nội dung</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cates.map((cate) => (
                            <tr key={cate.id}>
                                <td>{cate.serviceCateName}</td>
                                <td>{cate.price}</td>
                                <td>{cate.isAvailable}</td>
                                <td>{cate.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}

export default CateList;
