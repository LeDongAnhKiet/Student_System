import React, {useEffect, useState} from 'react'
import DiplomaService from "../../services/User/DiplomaService";
import {useNavigate, useParams} from "react-router-dom";

function AddDiploma() {
    const { id } = useParams();
    const [copy, setCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [diplomaYear, setDiplomaYear] = useState(1970);
    const [diplomaCode, setDiplomaCode] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
            DiplomaService.getDiploma(id).then((res) => {
                let diploma = res.data;
                // set state cho diploma
                setCopy(diploma.copy);
                setPhoneContact(diploma.phoneContact);
                setEmail(diploma.email);
                setDiplomaYear(diploma.diplomaYear);
                setDiplomaCode(diploma.diplomaCode);
            })
    }, [id]);

    const saveOrUpdateDiploma = (e) => {
        e.preventDefault();
        // khoi tao diploma
        const diploma = {
            copy,
            phoneContact,
            email,
            diplomaYear,
            diplomaCode,
        };

        if (id === '_add') {
            DiplomaService.addDiploma(diploma).then((res) => {
                nav('/user/service/diploma/add');
            });
        } else {
            DiplomaService.updateDiploma(diploma, id).then((res) => {
                nav(`/user/service/diploma/update/${id}`);
            });
        }
    };

    const changeCopyHandler = (e) => { setCopy(e.target.value); }

    const changePhoneHandler = (e) => { setPhoneContact(e.target.value); }

    const changeEmailHandler = (e) => { setEmail(e.target.value); }

    const changeYearHandler = (e) => { setDiplomaYear(e.target.value); }

    const changeCodeHandler = (e) => { setDiplomaCode(e.target.value); }
    
    const cancel = () => { nav(`/user/service/diploma`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="text-center">Thêm bằng cấp</h3>
        else
            return <h3 className="text-center">Chỉnh sửa bằng cấp</h3>
    }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-5">
                        { setTitle }
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
                                <div className="text-end">
                                    <button className="btn btn-primary m-1" onClick={saveOrUpdateDiploma}>Lưu</button>
                                    <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDiploma