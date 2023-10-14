import React, {useEffect, useState} from 'react'
import SemesterService from "../../../services/Admin/SemesterService";
import {useNavigate} from "react-router-dom";
import '../../../styles/App.css';

function AddSemester(props) {
    const [id, setId] = useState(props.match.params.id);
    const [semesterName, setSemesterName] = useState('');
    const [note, setNote] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
            SemesterService.getAvailableSemester().then((res) => {
                let semester = res.data;
                setSemesterName(semester.semesterName);
                setNote(semester.note);
            })
    }, [id]);

    const saveOrUpdateSemester = (e) => {
        e.preventDefault();
        const semester = {
            semesterName,
            note,
        };

        if (id === '_add') {
            SemesterService.addSemester(semester).then(() => {
                nav('/admin/semester/add');
            });
        } else {
            SemesterService.updateSemester(semester, id).then(() => {
                nav(`/admin/semester/update/${id}`);
            });
        }
    };

    const changeSemesterNameHandler = (e) => { setSemesterName(e.target.value); }

    const changeNoteHandler = (e) => { setNote(e.target.value); }

    const cancel = () => { nav(`/user/service/semester/getavailable`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="App">Thêm học kỳ</h3>
        else
            return <h3 className="App">Chỉnh sửa học kỳ</h3>
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
                                    <label>Tên học kỳ: </label>
                                    <input placeholder="học kỳ... khóa..." name="name" className="form-control"
                                           value={semesterName} onChange={changeSemesterNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Ghi chú: </label>
                                    <input placeholder="ghi chú..." name="note" className="form-control"
                                           value={note} onChange={changeNoteHandler}/>
                                </div>
                                <button className="btn btn-primary m-1" onClick={saveOrUpdateSemester}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSemester