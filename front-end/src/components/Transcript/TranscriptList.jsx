import React, {useEffect, useState} from 'react';
import {Button, Container, Row, Table} from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import TranscriptService from "../../services/User/TranscriptService";

function TranscriptList() {
    const { id } = useParams();
    const [transcripts, setTranscripts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        TranscriptService.getTranscript(id).then(res => {
            setTranscripts(res.data);
        });
    }, [id]);

    const addTranscript = () => { nav('/user/service/transcript/add'); };

    const updateTranscript = (transcript) => {
        nav(`/user/service/transcript/update/${transcript.onlineService.id}`, {
            state: {
                language: transcript.language,
                fromSemester: transcript.fromSemester,
                toSemester: transcript.toSemester,
                quantity: transcript.quantity,
                contactPhone: transcript.contactPhone,
                isSealed: transcript.isSealed,
            }
        });
    }

    return (
        <Container fluid className='mb-5'>
            <h3 className ="App">Bảng điểm sinh viên</h3>
            <Row>
                <Table className="mt-3 table-striped table-bordered">
                    <thead  className="App"><tr>
                        <th>Ngôn ngữ</th>
                        <th>Số bản sao</th>
                        <th>Học kỳ bắt đầu</th>
                        <th>Học kỳ kết thúc</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr></thead>
                    <tbody>
                    {transcripts.map( transcript => (
                        <tr key={transcript.id}>
                            <td>{transcript.language}</td>
                            <td>{transcript.fromSemester.semesterName}</td>
                            <td>{transcript.toSemester.semesterName}</td>
                            <td>{transcript.quantity}</td>
                            <td>{transcript.contactPhone}</td>
                            <td>{transcript.isSealed ? 'Đã niêm phong' : 'Chưa niêm phong'}</td>
                            <td className="App">
                                <Button color="success"
                                        onClick={() => updateTranscript(transcript)}>Sửa bảng điểm
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Row>
            <Row className="float-end">
                <Button color="primary" onClick={addTranscript}>Đăng ký cấp bảng điểm</Button>
            </Row>
        </Container>
    );
}
export default TranscriptList;