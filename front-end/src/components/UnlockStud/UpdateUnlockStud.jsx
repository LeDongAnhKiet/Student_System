import React, {useEffect, useState} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function UpdateUnlockStud() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const {image, content} = loc.state || {};
    const [imageInput, setImageInput] = useState(image || '');
    const [contentInput, setContentInput] = useState(content || '');

    useEffect(() => {
            UnlockStudService.getUnlockStud(id).then((res) => {
                let unlockStud = res.data;
                setImageInput(unlockStud.image);
                setContentInput(unlockStud.content);
            })
    }, [id]);

    const saveUnlockStud = (e) => {
        e.preventDefault();
        if (image === '' || content === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else {
            const unlockStud = {
                image: setImageInput,
                content: setContentInput,
            };
            UnlockStudService.updateUnlockStud(unlockStud, id).then(() => {
                nav(`/user/service/unlock-stud/${id}`);
            })
        }
    };

    const changeImageHandler = (e) => {
        setImageInput(e.target.value);
        setErr('');
    }

    const changeContentHandler = (e) => {
        setContentInput(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        <h3 className="text-center mt-2">Chỉnh sửa mở khóa</h3>
                        <div className = "card-body">
                            <form>
                                <div className="form-group">
                                    <label>Ảnh đại diện</label>
                                    <br/>
                                    <input type="file" className="form-control-file"
                                           value={imageInput} onChange={changeImageHandler} />
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="Nội dung" name="content" className="form-control"
                                           value={contentInput} onChange={changeContentHandler}/>
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

export default UpdateUnlockStud;
