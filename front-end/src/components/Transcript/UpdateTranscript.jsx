import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/TranscriptService";
import {useNavigate} from "react-router-dom";

function AddTranscript(props) {
    const [id, setId] = useState(props.match.params.id);
    const [language, setLanguage] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [isSealed, setIsSealed] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
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

    const saveOrUpdateTranscript = (e) => {
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

    const cancel = () => { nav(`/user/service/transcript/${id}`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="text-center">Cấp bảng điểm</h3>
        else
            return <h3 className="text-center">Chỉnh sửa bảng điểm</h3>
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
                                <button className="btn btn-primary m-1" onClick={saveOrUpdateTranscript}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTranscript;
