import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CourseDataService from "../../../services/Admin/CourseDataService";
import CourseService from "../../../services/Admin/CourseService";
import {Alert} from "reactstrap";
import {format, parse} from "date-fns";

function UpdateCourseData() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    const [courses, setCourses] = useState([]);
    const [lectures, setLectures] = useState([]);

    const { startDate, endDate, courseId, lectureId } = loc.state || {};
    const [startDateInput, setStartDateInput] = useState(startDate || '');
    const [endDateInput, setEndDateInput] = useState(endDate || '');
    const [courseIdInput, setCourseIdInput] = useState(courseId || 0);
    const [lectureIdInput, setLectureIdInput] = useState(lectureId || 0);

    useEffect(() => {
        CourseDataService.getCourse().then(res => {
            let courseData = res.data;
            setStartDateInput(courseData.startDate);
            setEndDateInput(courseData.endDate);
            setCourseIdInput(courseData.courseId);
            setLectureIdInput(courseData.lectureId);
        })
        getCourses().then();
        getLectures().then();
    }, [])

    const getCourses = async () => {
        try {
            const res = await CourseService.getCourse();
            setCourses(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách môn học: ', error);
        }
    };

    const getLectures = async () => {
        try {
            const res = await CourseService.getLecture();
            setLectures(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách giảng viên: ', error);
        }
    };

    const updateCourseData = (e) => {
        e.preventDefault();
        if (startDateInput === undefined || endDateInput === undefined || courseIdInput === undefined || lectureIdInput === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (courseIdInput <= 0)
            setResp('Không có mã môn học này trong dữ liệu');
        else if (lectureIdInput <= 0)
            setResp('Không có mã giảng viên này trong dữ liệu');
        else {
            const courseData = {
                startDate: startDateInput,
                endDate: endDateInput,
                courseId: courseIdInput,
                lectureId: lectureIdInput,
            };

            CourseDataService.updateCourse(courseData, id).then(() => {
                setResp('Chỉnh sửa lớp học thành công.');
            })
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

    const changeStartDateHandler = (e) => {
        const parsedDate = parse(e.target.value, 'yyyy-MM-dd', new Date());
        const formattedDate = format(parsedDate, 'dd-MM-yyyy');
        setStartDateInput(formattedDate);
        setResp('');
    }

    const changeEndDateHandler = (e) => {
        const parsedDate = parse(e.target.value, 'yyyy-MM-dd', new Date());
        const formattedDate = format(parsedDate, 'dd-MM-yyyy');
        setEndDateInput(formattedDate);
        setResp('');
    }

    const changeCourseHandler = (e) => {
        setCourseIdInput(parseInt(e.target.value));
        setResp('');
    }

    const changeLectureHandler = (e) => {
        setLectureIdInput(parseInt(e.target.value));
        setResp('');
    }

    const cancel = () => { nav(`/admin/course-data/all`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Chỉnh sửa lớp học</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngày bắt đầu</label>
                                    <input name="startDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={startDateInput} onChange={changeStartDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ngày kết thúc</label>
                                    <input name="endDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={endDateInput} onChange={changeEndDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Môn học</label>
                                    <select name="course" className="form-control custom-select"
                                            value={courseIdInput} onChange={changeCourseHandler}>
                                        <option value="">Chọn môn học</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>{course.courseName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className = "form-group">
                                    <label>Giảng viên</label>
                                    <select name="lecture" className="form-control custom-select"
                                            value={lectureIdInput} onChange={changeLectureHandler}>
                                        <option value="">Chọn giảng viên</option>
                                        {lectures.map((lecture) => (
                                            <option key={lecture.id} value={lecture.id}>{lecture.lectureName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateCourseData}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel}>Hủy</button>
                                </div>
                            </form>
                        </div>
                        {alert()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCourseData;
