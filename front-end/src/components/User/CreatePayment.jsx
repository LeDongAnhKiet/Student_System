import React, { useState, useEffect } from 'react';
import UserService from "../../services/User/UserService";
import {useParams} from "react-router-dom";

const CreatePayment = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState('');

    useEffect(() => {
        UserService.createPayment(id).then((res) => {
                setPayment(res.data);
            })
            .catch((error) => {
                console.error('Lỗi thanh toán:', error);
            });
    }, []);

    useEffect(() => {
        if (payment) {
            window.location.href = payment.url;
        }
    }, [payment]);

    return (
        <div>
            {payment ? (
                <div>
                    <h1>Thông tin thanh toán</h1>
                    {/*<p>ID: {payment.id}</p>*/}
                    <p>Thành tiền: {payment.price}</p>
                    <p>Ngày lập: {payment.createdDate}</p>
                    <p>Trạng thái: {payment.status}</p>
                    <p>Mã giao dịch: {payment.vnpayTxnred}</p>
                    <p>Link: {payment.url}</p>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default CreatePayment;
