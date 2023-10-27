import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useNavigate} from "react-router-dom";
import {Container} from "reactstrap";
import HomeService from "../../services/Guest/HomeService";

function AddTranscript() {
    const [language, setLanguage] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isSealed, setIsSealed] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const saveTranscript = (e) => {
        e.preventDefault();
        if (phoneContact === undefined || fromSemester === undefined || language === undefined
            || toSemester === undefined || quantity === undefined)
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (quantity <= 0)
            setErr('Số bản nhập không hợp lệ');
        else if (toSemester < fromSemester)
            setErr('Học kỳ chọn không hợp lệ');
        else {
            const transcript = {
                language,
                fromSemester,
                toSemester,
                quantity,
                phoneContact,
                isSealed,
            };

            TranscriptService.addTranscript(transcript).then(res => {
                let data = res.data;
                nav(`/user/service/transcript/${data.onlineService.id}`);
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
        setFromSemester(parseInt(e.target.value));
        setErr('');
    }

    const changeToSemesterHandler = (e) => {
        setToSemester(parseInt(e.target.value));
        setErr('');
    }

    const changeQuantityHandler = (e) => {
        setQuantity(parseInt(e.target.value));
        setErr('');
    }

    const changeSealedHandler = (e) => {
        setIsSealed(e.target.checked);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    useEffect(() => {
        const getSemesters = async () => {
            try {
                const res = await HomeService.getSemester();
                setSemesters(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách học kỳ:', error);
            }
        };

        getSemesters().then();
    }, [])

    return (
        <Container>
            <div className = "row">
                <div className = "card col-md-6 offset-md-3">
                    <h3 className="mt-2 text-center">Cấp bảng điểm</h3>
                    <div className = "card-body">
                        <form>
                            <div className = "form-group">
                                <label>Ngôn ngữ</label>
                                <input placeholder="Tiếng Việt, Anh ..." name="language" className="form-control"
                                       value={language} onChange={changeLanguageHandler}/>
                            </div>
                            <div className = "form-group">
                                <label>Học kỳ bắt đầu</label>
                                <select name="from semester" className="form-control"
                                        value={fromSemester} onChange={changeFromSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className = "form-group">
                                <label>Học kỳ kết thúc</label>
                                <select name="to semester" className="form-control custom-select"
                                        value={toSemester} onChange={changeToSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className = "form-group">
                                <label>Số điện thoại</label>
                                <input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                       value={phoneContact} onChange={changePhoneHandler}/>
                            </div>
                            <div className = "form-group">
                                <label>Số bản sao</label>
                                <input placeholder="Số bản" name="quantity" className="form-control" min="1"
                                       type="number" value={quantity} onChange={changeQuantityHandler}/>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox"
                                       checked={isSealed} onChange={changeSealedHandler} />
                                <label className="form-check-label">Niêm phong (trường hợp gửi qua nước ngoài)</label>
                            </div>
                            <div className="text-end mt-2">
                                <button className="btn btn-primary me-1" onClick={saveTranscript}>Lưu</button>
                                <button className="btn btn-secondary ms-1" onClick={cancel}>Hủy</button>
                            </div>
                        </form>
                    </div>
                    {err && <div className="alert alert-danger">{err}</div>}
                </div>
            </div>
        </Container>
    )
}

export default AddTranscript;
