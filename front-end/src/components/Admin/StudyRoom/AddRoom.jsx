import React, {useEffect, useState} from 'react'
import ScheduleService from "../../../services/Admin/ScheduleService";
import {useNavigate} from "react-router-dom";
import '../../../styles/App.css';

function AddRoom(props) {
    const [id, setId] = useState(props.match.params.id);
    const [studyRoomName, setStudyRoomName] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
            ScheduleService.getRoom().then((res) => {
                let room = res.data;
                setStudyRoomName(room.studyRoomName);
                setIsAvailable(room.isAvailable);
            })
    }, [id]);

    const saveOrUpdateRoom = (e) => {
        e.preventDefault();
        const room = {
            studyRoomName,
            isAvailable,
        };

        if (id === '_add') {
            ScheduleService.addRoom(room).then(() => {
                nav('/admin/room/add');
            });
        } else {
            ScheduleService.updateRoom(room, id).then(() => {
                nav(`/admin/room/update/${id}`);
            });
        }
    };

    const changeStudyRoomNameHandler = (e) => { setStudyRoomName(e.target.value); }

    const changeIsAvailableHandler = (e) => { setIsAvailable(e.target.value); }

    const cancel = () => { nav(`/user/service/room/get`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="App">Thêm phòng học</h3>
        else
            return <h3 className="App">Chỉnh sửa phòng học</h3>
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
                                    <label>Tên phòng: </label>
                                    <input placeholder="phòng số..." name="name" className="form-control"
                                           value={studyRoomName} onChange={changeStudyRoomNameHandler}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <label>Còn trống </label>
                                    <input className="form-check-input" type="checkbox"
                                           checked={isAvailable} onChange={changeIsAvailableHandler}/>
                                </div>
                                <button className="btn btn-primary m-1" onClick={saveOrUpdateRoom}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoom