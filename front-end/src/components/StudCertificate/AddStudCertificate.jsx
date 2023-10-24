import React, {useState} from 'react'
import StudCertificateService from "../../services/User/StudCertificateService";
import {useNavigate} from "react-router-dom";

function AddStudCertificate() {
    const [vietCopy, setVietCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [engCopy, setEngCopy] = useState(0);
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const saveStudCertificate = (e) => {
        e.preventDefault();
        if (phoneContact === '' || vietCopy === null || email === ''
            || engCopy === null || content === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (vietCopy.toString() < 0 || engCopy.toString() < 0
            || (vietCopy.toString() === '0' && engCopy.toString() === '0'))
            setErr('Số nhập không hợp lệ');
        else {
            const studCertificate = {
                vietCopy,
                engCopy,
                email,
                phoneContact,
                content,
            };

            StudCertificateService.addStudCertificate(studCertificate).then(() => {
                nav(`/user/payment/create/${studCertificate.id}`);
            });
        }
    }

    const changeVietCopyHandler = (e) => {
        setVietCopy(e.target.value);
        setErr('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContact(e.target.value);
        setErr('');
    }

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
        setErr('');
    }

    const changeEngCopyHandler = (e) => {
        setEngCopy(e.target.value);
        setErr('');
    }

    const changeContentHandler = (e) => {
        setContent(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="text-center mt-2">Cấp chứng nhận sinh viên</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Bản sao tiếng Việt: </label>
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
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveStudCertificate}>Lưu</button>
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

export default AddStudCertificate;
