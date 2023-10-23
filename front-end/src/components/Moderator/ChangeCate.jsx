import React, { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import CateService from '../../services/Guest/HomeService';
import { useNavigate, useParams } from 'react-router-dom';

function ChangeCate() {
    const [cates, setCates] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            // Trường hợp có id - Lấy dịch vụ cụ thể
            CateService.getCateById(id).then((res) => {
                setCates(res.data);
            });
        else
            // Trường hợp không có id - Lấy tất cả các dịch vụ
            CateService.getCate().then((res) => {
                setCates(res.data);
            });
    }, [id]);

    const addCate = () => { nav('/user/service/add'); }
    const getCate = () => { nav('/user/service/add'); }
    const getRequest = () => { nav('/user/service/my-request'); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className="App mt-2">Đăng ký dịch vụ</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center">
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Đơn giá</th>
                            <th>Trạng thái</th>
                            <th>Nội dung</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cates.map((cate) => (
                            <tr key={cate.id}>
                                <td>{cate.serviceCateName}</td>
                                <td>{cate.price}</td>
                                <td>{cate.isAvailable ? 'Còn trống' : 'Hết trống'}</td>
                                <td>{cate.description}</td>
                                <td className="text-center">
                                    <button className="btn-info btn"
                                            onClick={() => {getCate(cate.id)}}>Xem
                                    </button>
                                    <button className="ms-2 btn-primary btn"
                                            onClick={() => {addCate(cate.id)}}>Đăng ký
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-info btn"
                            onClick={getRequest}>Lịch sử đăng ký
                    </button>
                </div>
            </Container>
        </div>
    );
}

export default ChangeCate;
