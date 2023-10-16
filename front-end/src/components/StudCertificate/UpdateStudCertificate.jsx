import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import StudCertificateService from "../../services/User/StudCertificateService";

function UpdateStudCertificate() {
    const { id } = useParams();
    const [vietCopy, setVietCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [engCopy, setEngCopy] = useState(0);
    const [content, setContent] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            StudCertificateService.getStudCertificate(id).then((res) => {
                let studCertificate = res.data;
                setVietCopy(studCertificate.vietCopy);
                setPhoneContact(studCertificate.phoneContact);
                setEmail(studCertificate.email);
                setEngCopy(studCertificate.engCopy);
                setContent(studCertificate.content);
            })
    }, [id]);

    const updateStudCertificate = (e) => {
        e.preventDefault();
        const studCertificate = {
            vietCopy,
            phoneContact,
            email,
            engCopy,
            content,
        };

        StudCertificateService.updateStudCertificate(studCertificate, id).then((res) => {
            nav(`/user/service/stud-cert/${id}`);
        });
    };

    const changeVietCopyHandler = (e) => { setVietCopy(e.target.value); }

    const changePhoneHandler = (e) => { setPhoneContact(e.target.value); }

    const changeEmailHandler = (e) => { setEmail(e.target.value); }

    const changeEngCopyHandler = (e) => { setEngCopy(e.target.value); }

    const changeContentHandler = (e) => { setContent(e.target.value); }

    const cancel = () => { nav(`/user/service/studCertificate/${id}`); }

    const getTitle = () => {
        if (id === 'add') return <h3 className="text-center">Thêm chứng nhận</h3>;
        else return <h3 className="text-center">Chỉnh sửa chứng nhận</h3>;
    };
    return (
        <div>
            <br></br>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-5">
                        { getTitle }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Bản sao tiếng Việt: </label>c
                                    <input placeholder="Bản Việt" name="vietCopy" className="form-control"
                                           value={vietCopy} onChange={changeVietCopyHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Bản sao tiếng Anh: </label>
                                    <input placeholder="Bản Anh" name="engCopy" className="form-control"
                                           value={engCopy} onChange={changeEngCopyHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                           value={phoneContact} onChange={changePhoneHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Email: </label>
                                    <input placeholder="Địa chỉ email" name="email" className="form-control"
                                           value={email} onChange={changeEmailHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="Nội dung" name="content" className="form-control"
                                           value={content} onChange={changeContentHandler}/>
                                </div>
                                <button className="btn btn-primary m-1" onClick={updateStudCertificate}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateStudCertificate