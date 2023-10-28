import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import SemesterService from "../../../services/Admin/SemesterService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateSemester() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const { semesterName, note } = loc.state || {};
    const [semesterNameInput, setSemesterNameInput] = useState(semesterName || '');
    const [noteInput, setNoteInput] = useState(note || '');

    useEffect(() => {
        SemesterService.getSemesterById(id)
            .then(res => {
                let semester = res.data;
                setSemesterNameInput(semester.semesterName);
                setNoteInput(semester.note);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404)
                    setResp('404');
                else console.error("Lỗi không xác định: ", error);
            });
    }, [id]);
    const updateSemester = (e) => {
        e.preventDefault();
        if (semesterNameInput === '') setResp('Vui lòng nhập đầy đủ thông tin');
        else {
            const semester = {
                semesterName: semesterNameInput,
                note: noteInput,
            };

            SemesterService.updateSemester(semester, id).then(() => {
                setResp('Chỉnh sửa học kỳ thành công.');
            })
        }
    };

    const changeSemesterNameHandler = (e) => {
        setSemesterNameInput(e.target.value);
        setResp('');
    }

    const changeNoteHandler = (e) => {
        setNoteInput(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/admin/semester/available`); }
    const alert = () => {
        if (resp.includes('thành công'))
            return (
                <Alert color="success" className="fixed-bottom"
                       style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
                       onMouseEnter={() => setResp('')}>{resp}
                </Alert>
            )
        else if (resp)
            return (
                <Alert color="danger" className="fixed-bottom"
                       style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
                       onMouseEnter={() => setResp('')}>{resp}
                </Alert>
            )
    }


    return ( <>
        {resp === '404' ? ( <>
                <h1>Không tìm thấy học kỳ.</h1>
                <Button color="primary" onClick={cancel}>Quay lại</Button>
            </>
        ) : (
            <Container fluid>
                <Row className="mt-3">
                    <Card className = "col-md-6 offset-md-3">
                        <h3 className="justify-content-center pb-2 mt-2 border-bottom row">Thêm học kỳ</h3>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>Tên học kỳ</Label>
                                    <Input placeholder="học kỳ... khóa..." name="name" className="form-control"
                                           value={semesterNameInput} onChange={changeSemesterNameHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ghi chú</Label>
                                    <Input placeholder="ghi chú..." name="note" className="form-control"
                                           value={noteInput} onChange={changeNoteHandler}/>
                                </FormGroup>
                                <div className="text-end mt-2">
                                    <Button color="primary" className="m-1" onClick={updateSemester}>Lưu</Button>
                                    <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                                </div>
                            </Form>
                        </CardBody>
                        {alert()}
                    </Card>
                </Row>
            </Container>
        )}
        </>
    )
}

export default UpdateSemester;
