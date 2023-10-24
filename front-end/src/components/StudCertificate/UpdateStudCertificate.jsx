import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import StudCertificateService from "../../services/User/StudCertificateService";

function UpdateStudCertificate() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const { vietCopy, engCopy, email, phoneContact, content } = loc.state || {};
    const [vietCopyInput, setVietCopyInput] = useState(vietCopy || 0);
    const [engCopyInput, setEngCopyInput] = useState(engCopy || 0);
    const [emailInput, setEmailInput] = useState(email || '');
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [contentInput, setContentInput] = useState(content || '');

    useEffect(() => {
        StudCertificateService.getStudCertificate(id).then((res) => {
            let studCertificate = res.data;
            setVietCopyInput(studCertificate.vietCopy);
            setPhoneContactInput(studCertificate.phoneContact);
            setEmailInput(studCertificate.email);
            setEngCopyInput(studCertificate.engCopy);
            setContentInput(studCertificate.content);
        })
    }, [id]);

    const updateStudCertificate = (e) => {
        e.preventDefault();
        if (phoneContactInput === '' || vietCopyInput === null || emailInput === ''
                || engCopyInput === null || contentInput === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (vietCopyInput.toString() < 0 || engCopyInput.toString() < 0
                || (vietCopyInput.toString() === '0' && engCopyInput.toString() === '0'))
            setErr('Số nhập không hợp lệ');
        else {
            const studCertificate = {
            vietCopy: setVietCopyInput,
            engCopy: setEngCopyInput,
            email: setEngCopyInput,
            phoneContact: setPhoneContactInput,
            content: setContentInput,
        };
        StudCertificateService.updateStudCertificate(studCertificate, id).then(() => {
            nav(`/user/service/stud-cert/${id}`);
        });
    }
    }

    const changeVietCopyHandler = (e) => {
        setVietCopyInput(e.target.value);
        setErr('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setErr('');
    }

    const changeEmailHandler = (e) => {
        setEmailInput(e.target.value);
        setErr('');
    }

    const changeEngCopyHandler = (e) => {
        setEngCopyInput(e.target.value);
        setErr('');
    }

    const changeContentHandler = (e) => {
        setContentInput(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-4">
                        <h3 className="text-center mt-2">Chỉnh sửa chứng nhận sinh viên</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Bản sao tiếng Việt: </label>
                                    <input placeholder="Bản Việt" name="vietCopy" className="form-control"
                                           value={vietCopyInput} onChange={changeVietCopyHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Bản sao tiếng Anh: </label>
                                    <input placeholder="Bản Anh" name="engCopy" className="form-control"
                                           value={engCopyInput} onChange={changeEngCopyHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                           value={phoneContactInput} onChange={changePhoneHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Email: </label>
                                    <input placeholder="Địa chỉ email" name="email" className="form-control"
                                           value={emailInput} onChange={changeEmailHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="Nội dung" name="content" className="form-control"
                                           value={contentInput} onChange={changeContentHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateStudCertificate}>Lưu</button>
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

export default UpdateStudCertificate