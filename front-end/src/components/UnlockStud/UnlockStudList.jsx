import React, {useEffect, useState} from 'react';
import { Container, Table } from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import UnlockStudService from "../../services/User/UnlockStudService";

function UnlockStudList() {
    const { id } = useParams();
    const [unlockStuds, setUnlockStuds] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        UnlockStudService.getUnlockStud(id).then((res) => {
            setUnlockStuds(res.data);
        });
    }, [id]);

    const addUnlockStud = () => { nav('/user/service/unlock-stud/add'); };

    const updateUnlockStud = (stud) => {
        nav(`/user/service/unlock-stud/update/${stud.id}`, {
            state: {
                image: stud.image,
                content: stud.content
            }
        });
    }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Mở khóa sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead  className="text-center"><tr>
                            <th className="w-75">Nội dung</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { unlockStuds.map( unlockStud => (
                            <tr key={unlockStud.id}>
                                <td>{unlockStud.content}</td>
                                <td>{unlockStud.image}</td>
                                <td className="text-center">
                                    <button className="btn-success btn"
                                            onClick={() => updateUnlockStud(unlockStud)}>Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addUnlockStud}>Đăng ký mở khóa
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default UnlockStudList;