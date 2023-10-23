import React, { useState, useEffect } from 'react';
import DiplomaService from '../../services/User/DiplomaService';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

function UpdateDiploma() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');
    
    const { copy, phoneContact, email, diplomaYear, diplomaCode } = loc.state || {};
    const [copyInput, setCopyInput] = useState(copy || 0);
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [emailInput, setEmailInput] = useState(email || '');
    const [diplomaYearInput, setDiplomaYearInput] = useState(diplomaYear || 1970);
    const [diplomaCodeInput, setDiplomaCodeInput] = useState(diplomaCode || '');

    useEffect(() => {
        DiplomaService.getDiploma(id).then((res) => {
            let diploma = res.data;
            // Set cac gia tri cho diploma
            setCopyInput(diploma.copy);
            setPhoneContactInput(diploma.phoneContact);
            setEmailInput(diploma.email);
            setDiplomaYearInput(diploma.diplomaYear);
            setDiplomaCodeInput(diploma.diplomaCode);
        });
    }, [id]);

    const updateDiploma = (e) => {
        e.preventDefault();
        if (phoneContactInput === '' || copyInput === null || emailInput === ''
                || diplomaYearInput === null || diplomaCodeInput === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (copyInput <= 0 || diplomaYearInput < 1970)
            setErr('Số không hợp lệ');
        else {
            const diploma = {
                copy: copyInput,
                phoneContact: phoneContactInput,
                email: emailInput,
                diplomaYear: diplomaYearInput,
                diplomaCode: diplomaCodeInput,
            };

            DiplomaService.updateDiploma(diploma, id).then(() => {
                nav(`/user/service/diploma/${id}`);
            });
        }
    }

    const changeCopyHandler = (e) => {
        setCopyInput(e.target.value);
        setErr('');
    };

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setErr('');
    };

    const changeEmailHandler = (e) => {
        setEmailInput(e.target.value);
        setErr('');
    };

    const changeYearHandler = (e) => {
        setDiplomaYearInput(e.target.value);
        setErr('');
    };

    const changeCodeHandler = (e) => {
        setDiplomaCodeInput(e.target.value);
        setErr('');
    };

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center mt-2">Chỉnh sửa bản sao bằng tốt nghiệp</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Số lượng bản sao: </label>
                                    <input placeholder="Copy" name="copy" className="form-control"
                                           value={copyInput} onChange={changeCopyHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="0123456789" name="phoneContact" className="form-control"
                                        value={phoneContactInput} onChange={changePhoneHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input placeholder="Địa chỉ email" name="email" className="form-control"
                                        value={emailInput} onChange={changeEmailHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Năm tốt nghiệp: </label>
                                    <input placeholder="20xx" name="year" className="form-control"
                                        value={diplomaYearInput} onChange={changeYearHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Mã bằng: </label>
                                    <input placeholder="123..." name="code" className="form-control"
                                        value={diplomaCodeInput} onChange={changeCodeHandler} />
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={updateDiploma} >Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel} >Hủy</button>
                                </div>
                            </form>
                        </div>
                        {err && <div className="alert alert-danger">{err}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateDiploma;
