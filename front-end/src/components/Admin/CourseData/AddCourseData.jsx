import React, {useEffect, useState} from 'react'
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';

function AddCourseData() {
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [courseId, setCourseId] = useState(1970);
    const [lectureId, setLectureId] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            CourseDataService.getCourse().then((res) => {
                let courseData = res.data;
                setStartDate(courseData.startDate);
                setEndDate(courseData.endDate);
                setCourseId(courseData.courseId);
                setLectureId(courseData.lectureId);
            })
    }, [id]);

    const saveOrUpdateCourseData = (e) => {
        e.preventDefault();
        const courseData = {
            startDate,
            endDate,
            courseId,
            lectureId,
        };

        if (id === 'add') {
            CourseDataService.addCourse(courseData).then(() => {
                nav('/admin/course-data/add');
            });
        } else {
            CourseDataService.updateCourse(courseData, id).then(() => {
                nav(`/admin/course-data/update/${id}`);
            });
        }
    };

    const changeStartDateHandler = (e) => { setStartDate(e.target.value); }

    const changeEndDateHandler = (e) => { setEndDate(e.target.value); }

    const changeCourseHandler = (e) => { setCourseId(e.target.value); }

    const changeLectureHandler = (e) => { setLectureId(e.target.value); }
    
    const cancel = () => { nav(`/admin/course-data/add`); }

    const setTitle = () => {
        if (id === 'add')
            return <h3 className="App">Thêm môn học</h3>
        else
            return <h3 className="App">Chỉnh sửa môn học</h3>
    }

    return (
        <div>
            <br></br>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-5">
                        { setTitle }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngày bắt đầu: </label>
                                    <input name="startDate" className="form-control" min="2023-01-01" max="2023-12-31"
                                           type="date" value={startDate} onChange={changeStartDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ngày kết thúc: </label>
                                    <input name="endDate" className="form-control" min="2023-01-01" max="2023-12-31"
                                           type="date" value={endDate} onChange={changeEndDateHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã môn: </label>
                                    <input placeholder="Mã môn..." name="course" className="form-control"
                                           value={courseId} onChange={changeCourseHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã giảng viên: </label>
                                    <input placeholder="Mã giảng viên..." name="lecture" className="form-control"
                                           value={lectureId} onChange={changeLectureHandler}/>
                                </div>
                                <div className="text-end">
                                    <button className="btn btn-primary m-1" onClick={saveOrUpdateCourseData}>Lưu</button>
                                    <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourseData