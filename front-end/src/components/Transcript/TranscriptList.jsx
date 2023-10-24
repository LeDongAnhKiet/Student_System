import React, {useEffect, useState} from 'react';
import { Container, Table } from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import TranscriptService from "../../services/User/TranscriptService";

function TranscriptList() {
    const { id } = useParams();
    const [transcripts, setTranscripts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        TranscriptService.getTranscript(id).then((res) => {
            setTranscripts(res.data);
        });
    }, [id]);

    const addTranscript = () => { nav('/user/service/transcript/add'); };

    const updateTranscript = (transcript) => {
        nav(`/user/service/transcript/update/${transcript.id}`, {
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
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Bảng điểm sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead  className="text-center"><tr>
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
                                <td className="text-center">
                                    <button className="btn-success btn"
                                            onClick={() => updateTranscript(transcript)}>Sửa bảng điểm
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addTranscript}>Đăng ký cấp bảng điểm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default TranscriptList;