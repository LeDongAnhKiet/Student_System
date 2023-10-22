import React, {useEffect, useState} from 'react'
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';

function AddCourse() {
    const { id } = useParams();
    const [courseName, setCourseName] = useState('');
    const [creditsNum, setCreditsNum] = useState(0);
    const [note, setNote] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            CourseService.getCourse().then((res) => {
                let course = res.data;
                setCourseName(course.courseName);
                setCreditsNum(course.creditsNum);
                setNote(course.note);
            })
    }, [id]);

    const saveOrUpdateCourse = (e) => {
        e.preventDefault();
        const course = {
            courseName,
            creditsNum,
            note,
        };

        if (id === 'add') {
            CourseService.addCourse(course).then(() => {
                nav('/admin/course/add');
            });
        } else {
            CourseService.updateCourse(course, id).then(() => {
                nav(`/admin/course/update/${id}`);
            });
        }
    };

    const changeCourseNameHandler = (e) => { setCourseName(e.target.value); }

    const changeCreditsNumHandler = (e) => { setCreditsNum(e.target.value); }

    const changeNoteHandler = (e) => { setNote(e.target.value); }

    const cancel = () => { nav(`/admin/course/all`); }

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
                                <div className="text-end">
                                    <button className="btn btn-primary m-1" onClick={saveOrUpdateCourse}>Lưu</button>
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

export default AddCourse