import React, {useEffect, useState} from 'react'
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate} from "react-router-dom";
import '../../../styles/App.css';
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function AddCourse() {
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const [courseName, setCourseName] = useState('');
    const [creditsNum, setCreditsNum] = useState(0);
    const [note, setNote] = useState('');

    useEffect(() => {
        CourseService.getCourse().then(res => {
            let course = res.data;
            setCourseName(course.courseName);
            setCreditsNum(course.creditsNum);
            setNote(course.note);
        })
    }, []);

    const saveCourse = (e) => {
        e.preventDefault();
        if (courseName === '' || note === '' || creditsNum === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (creditsNum <= 0 || creditsNum > 5)
            setResp('Vượt quá tín chỉ cho phép');
        else {
            const course = {
                courseName: courseName,
                creditsNum: creditsNum,
                note: note,
            };

            CourseService.addCourse(course).then(() => {
                setResp('Thêm môn học thành công.');
            });
        }
    };

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

    const changeCourseNameHandler = (e) => {
        setCourseName(e.target.value);
        setResp('');
    }

    const changeCreditsNumHandler = (e) => {
        setCreditsNum(parseInt(e.target.value));
        setResp('');
    }

    const changeNoteHandler = (e) => {
        setNote(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/admin/course/all`); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <h3 className="justify-content-center pb-2 mt-2 border-bottom row">Thêm môn học</h3>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Tên môn học</Label>
                                <Input placeholder="tên môn..." name="name" className="form-control"
                                       value={courseName} onChange={changeCourseNameHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số tín chỉ</Label>
                                <Input placeholder="tín chỉ..." name="credits" className="form-control"
                                       type="number" min="1" value={creditsNum} onChange={changeCreditsNumHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ghi chú</Label>
                                <Input placeholder="ghi chú..." name="note" className="form-control"
                                       value={note} onChange={changeNoteHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveCourse}>Lưu</Button>
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

export default AddCourse