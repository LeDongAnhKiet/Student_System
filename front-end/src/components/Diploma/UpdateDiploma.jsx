import React, { useState, useEffect } from 'react';
import DiplomaService from '../../services/User/DiplomaService';
import {useNavigate, useParams} from 'react-router-dom';

function UpdateDiploma() {
    const { id } = useParams();
    const [copy, setCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [diplomaYear, setDiplomaYear] = useState(1970);
    const [diplomaCode, setDiplomaCode] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            DiplomaService.getDiploma(id).then((res) => {
                let diploma = res.data;
                // Set cac gia tri cho diploma
                setCopy(diploma.copy);
                setPhoneContact(diploma.phoneContact);
                setEmail(diploma.email);
                setDiplomaYear(diploma.diplomaYear);
                setDiplomaCode(diploma.diplomaCode);
            });
    }, [id]);

    const updateDiploma = (e) => {
        e.preventDefault();
        // tao doi tuong tu cac gia tri
        const diploma = {
            copy,
            phoneContact,
            email,
            diplomaYear,
            diplomaCode,
        };

        DiplomaService.updateDiploma(diploma, id).then((res) => {
            nav(`/user/service/diploma/${id}`);
        });
    };

    const changeCopyHandler = (event) => {
        setCopy(event.target.value);
    };

    const changePhoneHandler = (event) => {
        setPhoneContact(event.target.value);
    };

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };

    const changeYearHandler = (event) => {
        setDiplomaYear(event.target.value);
    };

    const changeCodeHandler = (event) => {
        setDiplomaCode(event.target.value);
    };

    const cancel = () => { nav(`/user/service/diploma`); }

    const getTitle = () => {
        if (id === 'add') return <h3 className="text-center">Thêm bằng cấp</h3>;
        else return <h3 className="text-center">Chỉnh sửa bằng cấp</h3>;
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-5">
                        { getTitle }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Số lượng bản sao: </label>
                                    <input placeholder="Copy" name="copy" className="form-control"
                                           value={copy} onChange={changeCopyHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại: </label>
                                    <input placeholder="Phone Contact" name="phoneContact" className="form-control"
                                        value={phoneContact} onChange={changePhoneHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input placeholder="Email Address" name="email" className="form-control"
                                        value={email} onChange={changeEmailHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Năm tốt nghiệp: </label>
                                    <input placeholder="Year" name="year" className="form-control"
                                        value={diplomaYear} onChange={changeYearHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Mã bằng: </label>
                                    <input placeholder="Code" name="code" className="form-control"
                                        value={diplomaCode} onChange={changeCodeHandler} />
                                </div>
                                <button className="btn btn-primary m-1" onClick={updateDiploma} >Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel} >Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateDiploma;
