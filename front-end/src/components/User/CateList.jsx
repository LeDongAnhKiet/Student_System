import React, { useEffect, useState } from 'react';
import {Alert, Button, Container, Row, Table} from 'reactstrap';
import CateService from '../../services/Guest/HomeService';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from "../../services/User/UserService";
import ModerateService from "../../services/Mod/ModerateService";

function CateList() {
    const [user, setUser] = useState({});
    const [cates, setCates] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await UserService.getUser();
                setUser(res.data);
            }
            catch (error) { console.error('Lỗi lấy data: ', error); }
        }
        getUser().then();

        if (id)
            // Trường hợp có id - Lấy dịch vụ cụ thể
            CateService.getCateById(id).then(res => {
                setCates(res.data);
            });
        else
            // Trường hợp không có id - Lấy tất cả các dịch vụ
            CateService.getCate().then(res => {
                setCates(res.data);
            });
    }, [id]);

    const addService = (id, available) => {
        setError('');
        if (available)
            switch(id) {
                case 1:
                    nav('/user/service/transcript/add');
                    break;
                case 2:
                    nav('/user/service/stud-cert/add');
                    break;
                case 3:
                    nav('/user/service/diploma/add');
                    break;
                case 5:
                    nav('/user/service/unlock-stud/add');
                    break;
                default:
                    setError('Dịch vụ còn trong quá trình phát triển.');
            }
        else setError('Dịch vụ đã đóng.');
    }

    const updateCate = (cate) => {
        nav(`/moderator/service-cate/update/${cate.id}`, {
            state: {
                serviceCateName: cate.serviceCateName,
                price: cate.price,
                isAvailable: cate.isAvailable,
                description: cate.description,
                numOfDate: cate.numOfDate,
            }
        });
    }

    return (
        <Container fluid className='mb-5'>
            <h3 className="App">Đăng ký dịch vụ</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead className="App">
                    <tr>
                        <th>Dịch vụ</th>
                        <th>Đơn giá</th>
                        <th>Trạng thái</th>
                        <th>Nội dung</th>
                        <th>Thời gian cấp</th>
                        <th>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cates.map((cate) => (
                        <tr key={cate.id}>
                            <td>{cate.serviceCateName}</td>
                            <td>{cate.price}</td>
                            <td>{cate.isAvailable ? 'Còn mở' : 'Đã đóng'}</td>
                            <td>{cate.description}</td>
                            <td>{cate.numOfDate} ngày</td>
                            <td className="App">
                                <Button color="primary" className="m-1"
                                        onClick={() => {addService(cate.id, cate.isAvailable)}}>Đăng ký
                                </Button>
                                {user.role === 'MODERATOR' ? <>
                                    <Button color="success" className="m-1"
                                            onClick={() => {updateCate(cate)}}>Chỉnh sửa
                                    </Button>
                                    <Button color="warning" className="m-1"
                                            onClick={() => {ModerateService.changeCate(cate.id)}}>
                                        { cate.isAvailable ? 'Đóng dịch vụ' : 'Mở dịch vụ' }
                                    </Button>
                                </> : <></>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end" style={{paddingBottom: '15%'}}>
                <Button color="info" onClick={() => nav('/home')}>Lịch sử đăng ký</Button>
            </Row>
            { error ? <Alert color="danger" className="fixed-bottom"
                   style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
                   onMouseEnter={() => setError('')}>{error}
            </Alert> : <></> }
        </Container>
    );
}

export default CateList;
