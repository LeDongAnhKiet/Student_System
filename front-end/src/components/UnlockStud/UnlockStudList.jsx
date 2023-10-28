import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import UnlockStudService from "../../services/User/UnlockStudService";

function UnlockStudList() {
    const { id } = useParams();
    const [unlockStuds, setUnlockStuds] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        UnlockStudService.getUnlockStud(id).then(res => {
            setUnlockStuds(res.data);
        });
    }, [id]);

    const addUnlockStud = () => { nav('/user/service/unlock-stud/add'); };

    const updateUnlockStud = (stud) => {
        nav(`/user/service/unlock-stud/update/${stud.onlineService.id}`, {
            state: {
                image: stud.image,
                content: stud.content
            }
        });
    }

    return (
        <Container>
            <h3 className ="App">Mở khóa sinh viên</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead  className="App"><tr>
                        <th className="w-75">Nội dung</th>
                        <th>Hình ảnh</th>
                        <th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                    { unlockStuds.map( unlockStud => (
                        <tr key={unlockStud.id}>
                            <td>{unlockStud.content}</td>
                            <td>{unlockStud.image}</td>
                            <td className="App">
                                <Button color="success"
                                        onClick={() => updateUnlockStud(unlockStud)}>Chỉnh sửa
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary" onClick={addUnlockStud}>Đăng ký mở khóa</Button>
            </Row>
        </Container>
    );
}
export default UnlockStudList;