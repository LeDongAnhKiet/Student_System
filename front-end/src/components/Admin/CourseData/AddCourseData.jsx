import React, {useEffect, useState} from 'react'
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';
import CourseService from "../../../services/Admin/CourseService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
//import {format, parse} from "date-fns";

function AddCourseData() {
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    const [courses, setCourses] = useState([]);
    const [lectures, setLectures] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [lectureId, setLectureId] = useState(0);

    useEffect(() => {
        getCourses().then();
        getLectures().then();
    }, [])

    const getCourses = async () => {
        try {
            const res = await CourseService.getCourse();
            setCourses(res.data);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách môn học: ', err);
        }
    };

    const getLectures = async () => {
        try {
            const res = await CourseService.getLecture();
            setLectures(res.data);
        } catch (resp) {
            console.error('Lỗi khi lấy danh sách giảng viên: ', resp);
        }
    };

    const saveCourseData = (e) => {
        e.preventDefault();
        if (startDate === '' || endDate === '' || courseId === undefined || lectureId === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (courseId <= 0)
            setResp('Không có mã môn học này trong dữ liệu');
        else if (lectureId <= 0)
            setResp('Không có mã giảng viên này trong dữ liệu');
        else {
            const courseData = {
                startDate,//: format(parse(startDate, 'yyyyMMdd', new Date()), 'dd-MM-yyyy'),
                endDate,//: format(parse(endDate, 'yyyyMMdd', new Date()), 'dd-MM-yyyy'),
                courseId: courseId,
                lectureId: lectureId,
            }

            CourseDataService.addCourse(courseData).then(() => {
                setResp('Thêm lớp học thành công.');
            })
        }
    };

    const changeStartDateHandler = (e) => {
        setStartDate(e.target.value);
        setResp('');
    }

    const changeEndDateHandler = (e) => {
        setEndDate(e.target.value);
        setResp('');
    }

    const changeCourseHandler = (e) => {
        setCourseId(parseInt(e.target.value));
        setResp('');
    }

    const changeLectureHandler = (e) => {
        setLectureId(parseInt(e.target.value));
        setResp('');
    }
    
    const cancel = () => { nav(`/admin/course-data/all`); }

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
                    <h3 className="App mt-2">Thêm lớp học</h3>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Ngày bắt đầu</Label>
                                <Input name="startDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                       type="date" value={startDate} onChange={changeStartDateHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ngày kết thúc</Label>
                                <Input name="endDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                       type="date" value={endDate} onChange={changeEndDateHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Môn học</Label>
                                <Input type="select" name="course" value={courseId} onChange={changeCourseHandler}>
                                    <option value="">Chọn môn học</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.courseName}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Giảng viên</Label>
                                <Input type="select" name="lecture" value={lectureId} onChange={changeLectureHandler}>
                                    <option value="">Chọn giảng viên</option>
                                    {lectures.map((lecture) => (
                                        <option key={lecture.id} value={lecture.id}>{lecture.lectureName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveCourseData}>Lưu</Button>
                                <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                            </div>
                        </Form>
                    </CardBody>
                    {alert}
                </Card>
            </Row>
        </Container>
    )
}

export default AddCourseData