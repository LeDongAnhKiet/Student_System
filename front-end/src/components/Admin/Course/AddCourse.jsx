import React, {useEffect, useState} from 'react'
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';

function AddCourse() {
    const { id } = useParams();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const [courseName, setCourseName] = useState('');
    const [creditsNum, setCreditsNum] = useState(0);
    const [note, setNote] = useState('');

    useEffect(() => {
        CourseService.getCourse().then((res) => {
            let course = res.data;
            setCourseName(course.courseName);
            setCreditsNum(course.creditsNum);
            setNote(course.note);
        })
    }, [id]);

    const saveCourse = (e) => {
        e.preventDefault();
        if (courseName === '' || note === '' || creditsNum === null)
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (creditsNum <= 0 || creditsNum > 5)
            setErr('Vượt quá tín chỉ cho phép');
        else {
            const course = {
                courseName,
                creditsNum,
                note,
            };
            CourseService.addCourse(course).then(() => {
                nav('/admin/course/add');
            });
        }
    };

    const changeCourseNameHandler = (e) => {
        setCourseName(e.target.value);
        setErr('');
    }

    const changeCreditsNumHandler = (e) => {
        setCreditsNum(e.target.value);
        setErr('');
    }

    const changeNoteHandler = (e) => {
        setNote(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/admin/course/all`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Thêm môn học</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên môn học: </label>
                                    <input placeholder="tên môn..." name="name" className="form-control"
                                           value={courseName} onChange={changeCourseNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số tín chỉ: </label>
                                    <input placeholder="tín chỉ..." name="credits" className="form-control"
                                           value={creditsNum} onChange={changeCreditsNumHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú: </label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={note} onChange={changeNoteHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveCourse}>Lưu</button>
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

export default AddCourse