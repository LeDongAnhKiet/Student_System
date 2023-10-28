import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CourseService from "../../../services/Admin/CourseService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateCourse() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const { courseName, creditsNum, note } = loc.state || {};
    const [courseNameInput, setCourseNameInput] = useState(courseName || '');
    const [creditsNumInput, setCreditsNumInput] = useState(creditsNum || 0);
    const [noteInput, setNoteInput] = useState(note || '');

    useEffect(() => {
        CourseService.getCourse().then(res => {
            let course = res.data;
            setCourseNameInput(course.courseName);
            setCreditsNumInput(course.creditsNum);
            setNoteInput(course.note);
        })
    }, [id]);

    const updateCourse = (e) => {
        e.preventDefault();
        if (courseNameInput === '' || creditsNumInput === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (creditsNumInput <= 0 || creditsNumInput > 5)
            setResp('Số tín chỉ không hợp lệ');
        else {
            const course = {
            courseName: courseNameInput,
            creditsNum: creditsNumInput,
            note: noteInput,
        };

        CourseService.updateCourse(course, id).then(() => {
            setResp('Chỉnh sửa môn học thành công.');
        });
        }
    };

    const changeCourseNameHandler = (e) => {
        setCourseNameInput(e.target.value);
        setResp('');
    }

    const changeCreditsNumHandler = (e) => {
        setCreditsNumInput(parseInt(e.target.value));
        setResp('');
    }

    const changeNoteHandler = (e) => {
        setNoteInput(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/admin/course/all`); }

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

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Chỉnh sửa môn học</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Tên môn học</Label>
                                <Input placeholder="tên môn..." name="name" className="form-control"
                                       value={courseNameInput} onChange={changeCourseNameHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số tín chỉ</Label>
                                <Input placeholder="tín chỉ..." name="credits" type="number" min="1" className="form-control"
                                       value={creditsNumInput} onChange={changeCreditsNumHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ghi chú</Label>
                                <Input placeholder="ghi chú..." name="note" className="form-control"
                                       value={noteInput} onChange={changeNoteHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={updateCourse}>Lưu</Button>
                                <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                            </div>
                        </Form>
                    </CardBody>
                    {alert()}
                </Card>
            </Row>
        </Container>
    )
}

export default UpdateCourse;
