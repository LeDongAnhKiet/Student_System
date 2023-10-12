import React, {useEffect, useState} from 'react';
import { Container, Table } from 'reactstrap';
import Header from '../../app/Header';
import {useNavigate} from "react-router-dom";
import UnlockStudService from "../../services/UnlockStudService";

function UnlockStudList() {
    const [unlockStuds, setUnlockStuds] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        UnlockStudService.getUnlockStud().then((res) => {
            setUnlockStuds(res.data);
        });
    }, []);

    const addUnlockStud = () => { nav('/user/service/unlock-stud/add'); };

    const getUnlockStud = (id) => { nav(`/user/service/unlock-stud/${id}`); }

    const updateUnlockStud = (id) => { nav(`/user/service/unlock-stud/update/${id}`); }

    return (
        <div>
            <Header />
            <Container fluid>
                <h3 className ="App">Mở khóa sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead  className="text-center align-middle"><tr>
                            <th className="w-75">Nội dung</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { unlockStuds.map( unlockStud => (
                            <tr key={unlockStud.id}>
                                <td>{unlockStud.content}</td>
                                <td>{unlockStud.image}</td>
                                <td>
                                    <button className="btn-success btn m-1"
                                            onClick={updateUnlockStud}>Sửa mở khóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addUnlockStud}>Xin mở khóa
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default UnlockStudList;