import React, {useState} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useNavigate} from "react-router-dom";

function AddUnlockStud() {
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const saveUnlockStud = (e) => {
        e.preventDefault();
        if (image === '' || content === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else {
            const unlockStud = {
                image,
                content,
            };

            UnlockStudService.addUnlockStud(unlockStud).then(() => {
                nav(`/user/payment/create/${unlockStud.id}`);
            });
        }
    };

    const changeImageHandler = (e) => {
        setImage(e.target.value);
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
                        <h3 className="text-center mt-2">Đăng ký mở khóa sinh viên</h3>
                        <div className = "card-body">
                            <form>
                                <div className="form-group">
                                    <label>Ảnh đại diện</label>
                                    <br/>
                                    <input type="file" className="form-control-file" onChange={changeImageHandler} />
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="Nội dung" name="content" className="form-control"
                                           value={content} onChange={changeContentHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveUnlockStud}>Lưu</button>
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

export default AddUnlockStud;
