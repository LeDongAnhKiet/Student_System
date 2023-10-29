import React, { useState, useEffect } from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import { format } from 'date-fns';
import UserService from "../../services/User/UserService";
import {useLocation} from "react-router-dom";

function PaymentStatus() {
    const [status, setStatus] = useState({});
    const loc = useLocation();
    const { id } = loc.state || '';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentStatus = {};
        for (const [key, value] of params) {
            paymentStatus[key] = value;
        }
        setStatus(paymentStatus);
    }, []);

    const formatDate = (date) => {
        let d = new Date(date);
        return format(d, "HH:mm:ss - dd/MM/yyyy");
    }

    const verify = (id) => {
         UserService.verifyPayment(id)
    }

    return (
        <div>
            {status ? (
                <Container fluid>
                    <h3 className="App">Thanh toán</h3>
                    <Row>
                        <Table className="mt-5 table-striped">
                            <tr className="border-bottom" style={{ height: '50px' }}>
                                <th>Tên</th>
                                <td>{status.title}</td>
                            </tr>
                            <tr className="border-bottom" style={{ height: '50px' }}>
                                <th>Trạng thái</th>
                                <td>{status.status}</td>
                            </tr>
                            <tr className="border-bottom" style={{ height: '50px' }}>
                                <th>Ngày lập</th>
                                <td>{status.date ? formatDate(status.createdDate) : ''}</td>
                            </tr>
                            <tr className="border-bottom" style={{ height: '50px' }}>
                                <th>Số tiền</th>
                                <td>{status.amount}</td>
                            </tr>
                            <tr className="border-bottom" style={{ height: '50px' }}>
                                <th>Nội dung</th>
                                <td>{status.message}</td>
                            </tr>
                        </Table>
                    </Row>
                    <Button color="primary" onClick={() => verify(id)}>Xác nhận</Button>
                </Container>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}

export default PaymentStatus;
