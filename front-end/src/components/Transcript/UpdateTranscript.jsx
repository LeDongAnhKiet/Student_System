import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useNavigate, useParams} from "react-router-dom";

function UpdateTranscript() {
    const { id } = useParams();
    const [language, setLanguage] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [isSealed, setIsSealed] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            TranscriptService.getTranscript(id).then((res) => {
                let transcript = res.data;
                setLanguage(transcript.language);
                setPhoneContact(transcript.phoneContact);
                setFromSemester(transcript.fromSemester);
                setToSemester(transcript.toSemester);
                setQuantity(transcript.quantity);
                setIsSealed(transcript.isSealed);
            })
    }, [id]);

    const saveTranscript = (e) => {
        e.preventDefault();
        const transcript = {
            language,
            phoneContact,
            fromSemester,
            toSemester,
            quantity,
            isSealed,
        };

            TranscriptService.updateTranscript(transcript, id).then((res) => {
                nav(`/user/service/transcript/update/${id}`);
            })
    };

    const changeLanguageHandler = (e) => { setLanguage(e.target.value); }

    const changePhoneHandler = (e) => { setPhoneContact(e.target.value); }

    const changeFromSemesterHandler = (e) => { setFromSemester(e.target.value); }

    const changeToSemesterHandler = (e) => { setToSemester(e.target.value); }

    const changeQuantityHandler = (e) => { setQuantity(e.target.value); }

    const changeSealedHandler = (e) => { setIsSealed(e.target.value); }

    const cancel = () => { nav(`/user/service/transcript`); }

    const setTitle = () => {
        if (id === 'add')
            return <h3 className="text-center mt-2">Cấp bảng điểm</h3>
        else
            return <h3 className="text-center mt-2">Chỉnh sửa bảng điểm</h3>
    }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="mt-2 text-center">Chỉnh sửa bảng điểm</h3>                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Ngôn ngữ: </label>
                                    <input placeholder="Tiếng Việt" name="language" className="form-control"
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
                                    <label className="form-check-label">Đánh dấu</label>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveTranscript}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTranscript;
