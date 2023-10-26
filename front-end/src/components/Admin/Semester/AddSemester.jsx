import React, {useEffect, useState} from 'react'
import SemesterService from "../../../services/Admin/SemesterService";
import {useNavigate} from "react-router-dom";
import '../../../styles/App.css';
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";

function AddSemester() {
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        SemesterService.getAvailableSemester().then(res => {
            let semester = res.data;
            setSemesterName(semester.semesterName);
            setNote(semester.note);
        })
    }, []);

    const saveSemester = (e) => {
        e.preventDefault();
        if (semesterName === '') setResp('Vui lòng nhập đầy đủ thông tin');
        else {
            const semester = {
            semesterName,
            note,
            };

            SemesterService.addSemester(semester).then(() => {
                setResp('Thêm học kỳ thành công.');
            });
        }
    };

    const changeSemesterNameHandler = (e) => {
        setSemesterName(e.target.value);
        setResp('');
    }

    const changeNoteHandler = (e) => {
        setNote(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/admin/semester/available`); }

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
                        <h3 className="App mt-2">Thêm học kỳ</h3>
                        <div className = "card-body">
                            <Form>
                                <FormGroup>
                                    <Label>Tên học kỳ</Label>
                                    <Input placeholder="học kỳ... khóa..." name="name" className="form-control"
                                           value={semesterName} onChange={changeSemesterNameHandler}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Ghi chú</Label>
                                    <Input placeholder="ghi chú..." name="note" className="form-control"
                                           value={note} onChange={changeNoteHandler}/>
                                </FormGroup>
                                <div className="text-end mt-2">
                                    <Button color="primary" className="me-1" onClick={saveSemester}>Lưu</Button>
                                    <Button color="secondary" className="ms-1" onClick={cancel}>Hủy</Button>
                                </div>
                            </Form>
                        </div>
                        {alert()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSemester