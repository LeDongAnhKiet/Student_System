import React, {useEffect, useState} from 'react'
import SemesterService from "../../../services/Admin/SemesterService";
import {useNavigate, useParams} from "react-router-dom";
import '../../../styles/App.css';

function AddSemester() {
    const { id } = useParams();
    const nav = useNavigate();
    const [err, setErr] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        SemesterService.getAvailableSemester().then((res) => {
            let semester = res.data;
            setSemesterName(semester.semesterName);
            setNote(semester.note);
        })
    }, [id]);

    const saveSemester = (e) => {
        e.preventDefault();
        if (semesterName === '') setErr('Vui lòng nhập đầy đủ thông tin');
        else {
            const semester = {
            semesterName,
            note,
            };

            SemesterService.addSemester(semester).then(() => {
                nav('/admin/semester/add');
            });
        }
    };

    const changeSemesterNameHandler = (e) => {
        setSemesterName(e.target.value);
        setErr('');
    }

    const changeNoteHandler = (e) => {
        setNote(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/admin/semester/available`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="App mt-2">Thêm học kỳ</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên học kỳ: </label>
                                    <input placeholder="học kỳ... khóa..." name="name" className="form-control"
                                           value={semesterName} onChange={changeSemesterNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú: </label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={note} onChange={changeNoteHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveSemester}>Lưu</button>
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

export default AddSemester