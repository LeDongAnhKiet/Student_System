import React, {useEffect, useState} from 'react'
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';
import {Alert} from "reactstrap";

function AddCourse() {
    const nav = useNavigate();
    const [resp, setResp] = useState('');

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
    }, []);

    const saveCourse = (e) => {
        e.preventDefault();
        if (courseName === '' || note === '' || creditsNum === null)
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
        setCreditsNum(e.target.value);
        setResp('');
    }

    const changeNoteHandler = (e) => {
        setNote(e.target.value);
        setResp('');
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
                                    <label>Tên môn học</label>
                                    <input placeholder="tên môn..." name="name" className="form-control"
                                           value={courseName} onChange={changeCourseNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số tín chỉ</label>
                                    <input placeholder="tín chỉ..." name="credits" className="form-control"
                                           type="number" min="1" value={creditsNum} onChange={changeCreditsNumHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú</label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={note} onChange={changeNoteHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveCourse}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel.bind(this)}>Hủy</button>
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

export default AddCourse