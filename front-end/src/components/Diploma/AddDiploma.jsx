import React, {useState} from 'react'
import DiplomaService from "../../services/User/DiplomaService";
import {useNavigate} from "react-router-dom";

function AddDiploma() {
    const nav = useNavigate();
    const [err, setErr] = useState('');
    const [copy, setCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [diplomaYear, setDiplomaYear] = useState(1970);
    const [diplomaCode, setDiplomaCode] = useState('');

    const saveDiploma = (e) => {
        e.preventDefault();
        if (copy === null || phoneContact === '' || email === '' || diplomaYear === null || diplomaCode === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (copy <= 0 || diplomaYear <= 1970)
            setErr('Số nhập không hợp lệ');
        else {
            const diploma = {
                copy,
                phoneContact,
                email,
                diplomaYear,
                diplomaCode,
            };

            DiplomaService.addDiploma(diploma).then((res) => {
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
                setErr('Đăng ký thành công.');
            });
        }
    }

    const changeCopyHandler = (e) => {
        setCopy(e.target.value);
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

    const changeYearHandler = (e) => {
        setDiplomaYear(e.target.value);
        setErr('');
    }

    const changeCodeHandler = (e) => {
        setErr('');
        setDiplomaCode(e.target.value);
    }
    
    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="text-center mt-2">Cấp bản sao bằng tốt nghiệp</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Số lượng bản sao: </label>
                                    <input placeholder="Copy" name="copy" className="form-control"
                                           value={copy} onChange={changeCopyHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Phone Contact" name="phoneContact" className="form-control"
                                           value={phoneContact} onChange={changePhoneHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Email: </label>
                                    <input placeholder="Email Address" name="email" className="form-control"
                                           value={email} onChange={changeEmailHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Năm tốt nghiệp: </label>
                                    <input placeholder="Year" name="year" className="form-control"
                                           value={diplomaYear} onChange={changeYearHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã bằng: </label>
                                    <input placeholder="Code" name="code" className="form-control"
                                           value={diplomaCode} onChange={changeCodeHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveDiploma}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                        {err && <div className="alert alert-danger"
                                     onMouseEnter={() => setErr('')}>{err}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDiploma