import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useNavigate, useParams} from "react-router-dom";

function AddTranscript() {
    const [language, setLanguage] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isSealed, setIsSealed] = useState(false);
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const saveTranscript = (e) => {
        e.preventDefault();
        if (phoneContact === '' || fromSemester === null || language === ''
            || toSemester === null || quantity === null)
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (toSemester.toString() <= 0 || fromSemester.toString() <= 0 || quantity.toString() <= 0)
            setErr('Số nhập không hợp lệ');
        else {
            const transcript = {
                language,
                phoneContact,
                fromSemester,
                toSemester,
                quantity,
                isSealed,
            };

            TranscriptService.addTranscript(transcript).then(() => {
                nav('/user/service/transcript/add');
            });
        }
    };

    const changeLanguageHandler = (e) => {
        setLanguage(e.target.value);
        setErr('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContact(e.target.value);
        setErr('');
    }

    const changeFromSemesterHandler = (e) => {
        setFromSemester(e.target.value);
        setErr('');
    }

    const changeToSemesterHandler = (e) => {
        setToSemester(e.target.value);
        setErr('');
    }

    const changeQuantityHandler = (e) => {
        setQuantity(e.target.value);
        setErr('');
    }

    const changeSealedHandler = (e) => {
        setIsSealed(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="mt-2 text-center">Cấp bảng điểm</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngôn ngữ: </label>
                                    <input placeholder="Tiếng Việt, Anh ..." name="language" className="form-control"
                                           value={language} onChange={changeLanguageHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Học kỳ bắt đầu: </label>
                                    <input placeholder="1" name="fromSemester" className="form-control"
                                           value={fromSemester} onChange={changeFromSemesterHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Học kỳ kết thúc: </label>
                                    <input placeholder="2" name="toSemester" className="form-control"
                                           value={toSemester} onChange={changeToSemesterHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                           value={phoneContact} onChange={changePhoneHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số bản sao: </label>
                                    <input placeholder="Số bản" name="quantity" className="form-control"
                                           value={quantity} onChange={changeQuantityHandler}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                           value={isSealed.toString()} onChange={changeSealedHandler}/>
                                    <label className="form-check-label">Có đánh dấu</label>
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

export default AddTranscript;
