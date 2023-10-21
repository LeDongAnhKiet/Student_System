import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../../services/User/UserService";
import CateService from "../../services/Guest/HomeService";

function PaymentList() {
    const [payments, setPayments] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id)
            UserService.getPaymentInfo(id).then((res) => {
                setPayments(res.data);
            });
        else
            UserService.getPaymentStatus().then((res) => {
            setPayments(res.data);
        });
    }, []);

    const viewPayment = (id) => { nav('/user/payment/' + id + '/course'); }
    const goBack = () => { nav(-1); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Xem thời khóa biểu học kỳ</h3>
                {!payments ? <>
                    <h3 className='display-6 m-3'>Không có học kỳ nào!</h3>
                </> : <>
                    <div className="row">
                        <Table className="mt-3 table table-striped table-bordered">
                            <thead className="text-center"><tr>
                                <th>Học kỳ</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr></thead>
                            <tbody>
                            { payments.map( payment => (
                                <tr key={payment.id}>
                                    <td>{payment.paymentName}</td>
                                    <td>{payment.status}{/* ? 'Còn hoạt động' : 'Đã kết thúc'*/}</td>
                                    <td className='text-center'>
                                        <button className="btn-primary btn"
                                                onClick={() => viewPayment(payment.id)}>Xem
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </>}
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={goBack}>Quay lại
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default PaymentList;