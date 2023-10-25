import React, { useState, useEffect } from 'react';
import UserService from "../../services/User/UserService";
import {Container, Table} from "reactstrap";
import { format } from 'date-fns';
import axios from "axios";

function PaymentStatus() {
    const [status, setStatus] = useState({});

    useEffect(() => {
        UserService.getPaymentStatus().then((res) => {
            setStatus(res.data);
            console.log(res.data.vnp_ReturnUrl);
        })
            .catch((error) => {
                console.error('Lỗi thanh toán:', error);
            });
    }, []);

    const formatDate = (date) => {
        let d = new Date(date);
        return format(d, "HH:mm:ss - dd/MM/yyyy");
    }

    const verify = () => {

    }

    const getStatus = () => {
        axios.get('/api/user/payment/payment-status', {
            params: {
                status: status,
            },
        })
            .then(res => {
                const url = res.data.vnp_ReturnUrl;// Xử lý kết quả thành công (response) từ server sau khi gọi API.
                console.log('Kết quả:', url);
            })
            .catch(error => {
                // Xử lý lỗi nếu có.
                console.error('Lỗi:', error);
            });
    }

    return (
        <div>
            {status ? (
                <Container fluid>
                    <h3 className="App">Thanh toán</h3>
                    <div className="row">
                        <Table className="mt-5">
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Tên</th>
                                <td>{status.title}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Trạng thái</th>
                                <td>{status.status}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Ngày lập</th>
                                <td>{status.date ? formatDate(status.createdDate) : ''}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Số tiền</th>
                                <td>{status.amount}</td>
                            </tr>
                            <tr className="border-bottom" style={{height:'50px'}}>
                                <th>Nội dung</th>
                                <td>{status.message}</td>
                            </tr>
                        </Table>
                    </div>
                    <button className="btn btn-primary" onClick={verify}>Xác nhận</button>
                </Container>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}

export default PaymentStatus
