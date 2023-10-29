import React, { useState, useEffect } from 'react';
import UserService from "../../services/User/UserService";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Row, Table} from "reactstrap";
import { format } from 'date-fns';

function CreatePayment() {
    const { id } = useParams();
    const nav = useNavigate();
    const [payment, setPayment] = useState({});
    const[color, setColor] = useState('');

    useEffect(() => {
        UserService.createPayment(payment, id).then(res => {
                setPayment(res.data);
            })
            .catch((error) => {
                console.error('Lỗi thanh toán:', error);
            });
    }, [payment, id]);

    const formatDate = (date) => {
        let d = new Date(date);
        return format(d, "HH:mm:ss - dd/MM/yyyy");
    }

    return (
        <div>
            {payment ? (
                <Container fluid>
                    <h3 className="App">Thanh toán</h3>
                    <Row>
                        <Table className="mt-5 table-striped">
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Thành tiền</th>
                                <td>{payment.price}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Ngày lập</th>
                                <td>{payment.createdDate ? formatDate(payment.createdDate) : ''}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Trạng thái</th>
                                <td>{payment.status}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Mã giao dịch</th>
                                <td>{payment.vnpayTxnred}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Link VNPay</th>
                                <td onClick={() => nav('/user/payment/status', { state: { id: id } })}>
                                    <a onMouseEnter={() => setColor('blue')}
                                       onMouseLeave={() => setColor('gray')}
                                       target="_blank" style={{color: color}} type="button" href={payment.url}>
                                    Tại đây</a>
                                </td>
                            </tr>
                        </Table>
                    </Row>
                </Container>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}

export default CreatePayment
