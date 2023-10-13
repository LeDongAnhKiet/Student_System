import React, {useEffect, useState} from 'react'
import UnlockStudService from "../../services/UnlockStudService";
import {useNavigate} from "react-router-dom";

function UpdateUnlockStud(props) {
    const [id, setId] = useState(props.match.params.id);
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
            UnlockStudService.getUnlockStud(id).then((res) => {
                let unlockStud = res.data;
                setImage(unlockStud.image);
                setContent(unlockStud.content);
            })
    }, [id]);

    const saveOrUpdateUnlockStud = (e) => {
        e.preventDefault();
        const unlockStud = {
            image,
            content,
        };
            UnlockStudService.updateUnlockStud(unlockStud, id).then((res) => {
                nav(`/user/service/unlock-stud/${id}`);
        })
    };

    const changeImageHandler = (e) => { setImage(e.target.value); }

    const changeContentHandler = (e) => { setContent(e.target.value); }

    const cancel = () => { nav(`/user/service/unlock-stud/${id}`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="text-center">Mở khóa</h3>
        else
            return <h3 className="text-center">Chỉnh sửa khóa</h3>
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
                                <div className="form-group">
                                    <label>Ảnh đại diện</label>
                                    <input type="file" className="form-control-file" onChange={changeImageHandler} />
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="Nội dung" name="content" className="form-control"
                                           value={content} onChange={changeContentHandler}/>
                                </div>
                                <button className="btn btn-primary m-1" onClick={saveOrUpdateUnlockStud}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUnlockStud;
