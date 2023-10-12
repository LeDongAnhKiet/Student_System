import React, {useEffect, useState} from 'react';
import { Container, Table } from 'reactstrap';
import Header from '../../app/Header';
import {useNavigate} from "react-router-dom";
import TranscriptService from "../../services/TranscriptService";

function TranscriptList() {
    const [transcripts, setTranscripts] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        TranscriptService.getTranscript().then((res) => {
            setTranscripts(res.data);
        });
    }, []);

    const addTranscript = () => { nav('/api/user/service/transcript/add'); };

    const getTranscript = (id) => { nav(`/api/user/service/transcript/${id}`); }

    const updateTranscript = (id) => { nav(`/api/user/service/transcript/update/${id}`); }

    return (
        <div>
            <Header />
            <Container fluid>
                <h3 className ="App">Bảng điểm sinh viên</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead  className="text-center align-middle"><tr>
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
                                <td>{transcript.isSealed}</td>
                                <td>
                                    <button className="btn-success btn m-1"
                                            onClick={updateTranscript}>Sửa bảng điểm
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addTranscript}>In bảng điểm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default TranscriptList;