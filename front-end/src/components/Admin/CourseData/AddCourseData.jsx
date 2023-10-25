import React, {useEffect, useState} from 'react'
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';
import CourseService from "../../../services/Admin/CourseService";

function AddCourseData() {
    const { id } = useParams();
    const nav = useNavigate();
    const [err, setErr] = useState('');
    const [courses, setCourses] = useState([]);
    const [lectures, setLectures] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [courseId, setCourseId] = useState(0);
    const [lectureId, setLectureId] = useState(0);

    useEffect(() => {
        getCourses().then();
        getLectures().then();
    })

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

    const saveCourseData = (e) => {
        e.preventDefault();
        if (startDate === '' || endDate === '' || courseId === null || lectureId === null)
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (courseId <= 0)
            setErr('Không có mã môn học này trong dữ liệu');
        else if (lectureId <= 0)
            setErr('Không có mã giảng viên này trong dữ liệu');
        else {
            const courseData = {
                startDate,
                endDate,
                courseId,
                lectureId,
            }
    
            CourseDataService.addCourse(courseData).then(() => {
                nav('/admin/course-data/all');
            })
        }
    };

    const changeStartDateHandler = (e) => {
        setStartDate(e.target.value);
        setErr('');
    }

    const changeEndDateHandler = (e) => {
        setEndDate(e.target.value);
        setErr('');
    }

    const changeCourseHandler = (e) => {
        setCourseId(e.target.value);
        setErr('');
    }

    const changeLectureHandler = (e) => {
        setLectureId(e.target.value);
        setErr('');
    }
    
    const cancel = () => { nav(`/admin/course-data/all`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Thêm môn học</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngày bắt đầu</label>
                                    <input name="startDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={startDate} onChange={changeStartDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ngày kết thúc</label>
                                    <input name="endDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={endDate} onChange={changeEndDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Môn học</label>
                                    <select name="course" className="form-control custom-select"
                                            value={courseId} onChange={changeCourseHandler}>
                                        <option value="">Chọn môn học</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>{course.courseName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className = "form-group">
                                    <label>Giảng viên</label>
                                    <select name="lecture" className="form-control custom-select"
                                            value={lectureId} onChange={changeLectureHandler}>
                                        <option value="">Chọn giảng viên</option>
                                        {lectures.map((lecture) => (
                                            <option key={lecture.id} value={lecture.id}>{lecture.lectureName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveCourseData}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                        {err && <div className="alert alert-danger">{err}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourseData