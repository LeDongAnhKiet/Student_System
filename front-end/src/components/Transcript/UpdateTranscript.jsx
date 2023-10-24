import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function UpdateTranscript() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const {language, phoneContact, fromSemester, toSemester, quantity, isSealed} = loc.state || {};
    const [languageInput, setLanguageInput] = useState(language || '');
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [fromSemesterInput, setFromSemesterInput] = useState(fromSemester || 0);
    const [toSemesterInput, setToSemesterInput] = useState(toSemester || 0);
    const [quantityInput, setQuantityInput] = useState(quantity || '');
    const [isSealedInput, setIsSealedInput] = useState(isSealed || false);

    useEffect(() => {
        TranscriptService.getTranscript(id).then((res) => {
            let transcript = res.data;
            setLanguageInput(transcript.language);
            setPhoneContactInput(transcript.phoneContact);
            setFromSemesterInput(transcript.fromSemester.id);
            setToSemesterInput(transcript.toSemester.id);
            setQuantityInput(transcript.quantity);
            setIsSealedInput(transcript.isSealed);
        })
    }, [id]);

    const saveTranscript = (e) => {
        e.preventDefault();
        if (phoneContactInput === '' || fromSemesterInput === null || languageInput === ''
            || toSemesterInput === null || quantityInput === null)
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (toSemesterInput.toString() <= 0 || fromSemesterInput.toString() <= 0 || quantityInput.toString() <= 0)
            setErr('Số nhập không hợp lệ');
        else {
            const transcript = {
                language: setLanguageInput,
                phoneContact: setPhoneContactInput,
                fromSemester: setFromSemesterInput,
                toSemester: setToSemesterInput,
                quantity: setQuantityInput,
                isSealed: setIsSealedInput,
            };

            TranscriptService.updateTranscript(transcript, id).then(() => {
                nav(`/user/service/transcript/${id}`);
            })
        }
    };

    const changeLanguageHandler = (e) => {
        setLanguageInput(e.target.value);
        setErr('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setErr('');
    }

    const changeFromSemesterHandler = (e) => {
        setFromSemesterInput(e.target.value);
        setErr('');
    }

    const changeToSemesterHandler = (e) => {
        setToSemesterInput(e.target.value);
        setErr('');
    }

    const changeQuantityHandler = (e) => {
        setQuantityInput(e.target.value);
        setErr('');
    }

    const changeSealedHandler = (e) => {
        setIsSealedInput(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="mt-2 text-center">Chỉnh sửa bảng điểm</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngôn ngữ: </label>
                                    <input placeholder="Tiếng Việt, Anh ..." name="language" className="form-control"
                                           value={languageInput} onChange={changeLanguageHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Học kỳ bắt đầu: </label>
                                    <input placeholder="1" name="fromSemester" className="form-control"
                                           value={fromSemesterInput} onChange={changeFromSemesterHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Học kỳ kết thúc: </label>
                                    <input placeholder="2" name="toSemester" className="form-control"
                                           value={toSemesterInput} onChange={changeToSemesterHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                           value={phoneContactInput} onChange={changePhoneHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số bản sao: </label>
                                    <input placeholder="Số bản" name="quantity" className="form-control"
                                           value={quantityInput} onChange={changeQuantityHandler}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                           checked={isSealedInput} onChange={changeSealedHandler}/>
                                    <label className="form-check-label">Niêm phong (trường hợp gửi qua nước ngoài)</label>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveTranscript}>Lưu</button>
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

export default UpdateTranscript;
