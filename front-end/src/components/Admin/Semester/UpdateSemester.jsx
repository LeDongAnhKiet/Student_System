import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import SemesterService from "../../../services/Admin/SemesterService";

function UpdateSemester() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const { semesterName, note } = loc.state || {};
    const [semesterNameInput, setSemesterNameInput] = useState(semesterName || '');
    const [noteInput, setNoteInput] = useState(note || '');

    useEffect(() => {
        SemesterService.getSemesterById(id).then((res) => {
            let semester = res.data;
            setSemesterNameInput(semester.semesterName);
            setNoteInput(semester.note);
        })
    }, [id]);

    const updateSemester = (e) => {
        e.preventDefault();
        if (semesterNameInput === '') setErr('Vui lòng nhập đầy đủ thông tin');
        else {
            const semester = {
                semesterName: semesterNameInput,
                note: noteInput,
            };

            SemesterService.updateSemester(semester, id).then(() => {
                nav(`/admin/semester/available`);
            })
        }
    };

    const changeSemesterNameHandler = (e) => {
        setSemesterNameInput(e.target.value);
        setErr('');
    }

    const changeNoteHandler = (e) => {
        setNoteInput(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/admin/semester/available`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Chỉnh sửa học kỳ</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên học kỳ: </label>
                                    <input placeholder="học kỳ... khóa..." name="name" className="form-control"
                                           value={semesterNameInput} onChange={changeSemesterNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú: </label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={noteInput} onChange={changeNoteHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateSemester}>Lưu</button>
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

export default UpdateSemester;
