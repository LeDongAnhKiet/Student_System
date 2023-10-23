import React, {useEffect, useState} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useNavigate, useParams} from "react-router-dom";

function AddUnlockStud() {
    const { id } = useParams();
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            UnlockStudService.getUnlockStud(id).then((res) => {
                let unlockStud = res.data;
                setImage(unlockStud.image);
                setContent(unlockStud.content);
            })
    }, [id]);

    const saveUnlockStud = (e) => {
        e.preventDefault();
        const unlockStud = {
            image,
            content,
        };

        if (id === 'add') {
            UnlockStudService.addUnlockStud(unlockStud).then((res) => {
                nav('/user/service/unlock-stud/add');
            });
        } else {
            UnlockStudService.updateUnlockStud(unlockStud, id).then((res) => {
                nav(`/user/service/unlock-stud/update/${id}`);
            });
        }
    };

    const changeImageHandler = (e) => { setImage(e.target.value); }

    const changeContentHandler = (e) => { setContent(e.target.value); }

    const cancel = () => { nav(`/user/service/unlock-stud`); }

    const setTitle = () => {
        if (id === 'add')
            return <h3 className="text-center mt-2">Mở khóa</h3>
        else
            return <h3 className="text-center mt-2">Chỉnh sửa khóa</h3>
    }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3">
                        { setTitle }
                        <div className = "card-body">
                            <form>
                                <div className="form-group">
                                    <label>Ảnh đại diện</label>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUnlockStud;
