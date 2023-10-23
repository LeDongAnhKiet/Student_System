import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CourseDataService from "../../../services/Admin/CourseDataService";

function UpdateCourseData() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const { startDate, endDate, courseId, lectureId } = loc.state || {};
    const [startDateInput, setStartDateInput] = useState(startDate || '');
    const [endDateInput, setEndDateInput] = useState(endDate || '');
    const [courseIdInput, setCourseIdInput] = useState(courseId || 0);
    const [lectureIdInput, setLectureIdInput] = useState(lectureId || 0);

    useEffect(() => {
        CourseDataService.getCourse().then((res) => {
            let courseData = res.data;
            setStartDateInput(courseData.startDate);
            setEndDateInput(courseData.endDate);
            setCourseIdInput(courseData.courseId);
            setLectureIdInput(courseData.lectureId);
        })
    }, []);

    const updateCourseData = (e) => {
        e.preventDefault();
        if (startDateInput === '' || endDateInput === '' || courseIdInput === '' || lectureIdInput === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (courseIdInput <= 0 || courseIdInput > 10)
            setErr('Không có mã môn học này trong dữ liệu');
        else if (lectureIdInput > 10 || lectureIdInput <= 0)
            setErr('Không có mã giảng viên này trong dữ liệu');
        else {
            const courseData = {
                startDate: startDateInput,
                endDate: endDateInput,
                courseId: courseIdInput,
                lectureId: lectureIdInput,
            };

            CourseDataService.updateCourse(courseData, id).then(() => {
                nav(`/admin/course-data/all`);
            })
        }
    };

    const changeStartDateHandler = (e) => {
        setStartDateInput(e.target.value);
        setErr('');
    }

    const changeEndDateHandler = (e) => {
        setEndDateInput(e.target.value);
        setErr('');
    }

    const changeCourseHandler = (e) => {
        setCourseIdInput(e.target.value);
        setErr('');
    }

    const changeLectureHandler = (e) => {
        setLectureIdInput(e.target.value);
        setErr('');
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
                                    <label>Ngày bắt đầu: </label>
                                    <input name="startDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={startDateInput} onChange={changeStartDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ngày kết thúc: </label>
                                    <input name="endDate" className="form-control" min="2023-01-01" max="2024-12-31"
                                           type="date" value={endDateInput} onChange={changeEndDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã môn: </label>
                                    <input placeholder="Mã môn..." name="course" className="form-control"
                                           value={courseIdInput} onChange={changeCourseHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã giảng viên: </label>
                                    <input placeholder="Mã giảng viên..." name="lecture" className="form-control"
                                           value={lectureIdInput} onChange={changeLectureHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateCourseData}>Lưu</button>
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

export default UpdateCourseData;
