import React, { useState, useEffect } from 'react';
import UserService from "../../services/User/UserService";
import {useParams} from "react-router-dom";

const CreatePayment = () => {
    const { id } = useParams();
    //const [price, setPrice] = useState('');
    //const [createdDate, setCreatedDate] = useState('');
    //const [status, setStatus] = useState('');
    //const [vnpayTxnred, setVnpayTxnred] = useState('');
    //const [url, setUrl] = useState('');
    const [payment, setPayment] = useState({});

    useEffect(() => {
        UserService.createPayment(payment, id).then((res) => {
                setPayment(res.data);
            })
            .catch((error) => {
                console.error('Lỗi thanh toán:', error);
            });
    }, [id]);

    return (
        <div>
            {payment ? (
                <div>
                    <h3 className="App">Thanh toán</h3>
                    {/*<p>ID: {payment.id}</p>*/}
                    <p>Thành tiền: {payment.price}</p>
                    <p>Ngày lập: {payment.createdDate}</p>
                    <p>Trạng thái: {payment.status}</p>
                    <p>Mã giao dịch: {payment.vnpayTxnred}</p>
                    <p>Link xác nhận: <a>{payment.url}</a></p>
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
};

export default CreatePayment;
