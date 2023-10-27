import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import CourseService from "../../../services/Admin/CourseService";
import {Alert} from "reactstrap";

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
        if (courseNameInput === undefined || creditsNumInput === undefined)
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
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Chỉnh sửa môn học</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên môn học</label>
                                    <input placeholder="tên môn..." name="name" className="form-control"
                                           value={courseNameInput} onChange={changeCourseNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số tín chỉ</label>
                                    <input placeholder="tín chỉ..." name="credits" type="number" min="1" className="form-control"
                                           value={creditsNumInput} onChange={changeCreditsNumHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú</label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={noteInput} onChange={changeNoteHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateCourse}>Lưu</button>
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

export default UpdateCourse;
