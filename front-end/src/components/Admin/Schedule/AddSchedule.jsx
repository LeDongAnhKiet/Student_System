import React, {useEffect, useState} from 'react'
import ScheduleService from "../../../services/Admin/ScheduleService";
import {useNavigate} from "react-router-dom";
import '../../../styles/App.css';

function AddSchedule(props) {
    const [id, setId] = useState(props.match.params.id);
    const [weekdays, setWeekdays] = useState('');
    const [startAt, setStartAt] = useState(0);
    const [endAt, setEndAt] = useState(0);
    const [studyRoom, setStudyRoom] = useState(0);
    const nav = useNavigate();

    useEffect(() => {
        if (id !== '_add')
            ScheduleService.getSchedule().then((res) => {
                let schedule = res.data;
                setWeekdays(schedule.weekdays);
                setStartAt(schedule.startAt);
                setEndAt(schedule.endAt);
                setStudyRoom(schedule.studyRoom);
            })
    }, [id]);

    const saveOrUpdateSchedule = (e) => {
        e.preventDefault();
        const schedule = {
            weekdays,
            startAt,
            endAt,
            studyRoom,
        };

        if (id === '_add') {
            ScheduleService.addSchedule(schedule).then(() => {
                nav('/admin/schedule-info/add');
            });
        } else {
            ScheduleService.updateSchedule(schedule, id).then(() => {
                nav(`/admin/schedule-info/update/${id}`);
            });
        }
    };

    const changeWeekdaysHandler = (e) => { setWeekdays(e.target.value); }

    const changeStartAtHandler = (e) => { setStartAt(e.target.value); }

    const changeScheduleHandler = (e) => { setEndAt(e.target.value); }

    const changeStudyRoomHandler = (e) => { setStudyRoom(e.target.value); }
    
    const cancel = () => { nav(`/user/service/schedule-info/getall`); }

    const setTitle = () => {
        if (id === '_add')
            return <h3 className="App">Thêm thời khóa biểu</h3>
        else
            return <h3 className="App">Chỉnh sửa thời biểu</h3>
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
                                    <label>Thứ ngày: </label>
                                    <input placeholder="thứ..." name="weekdays" className="form-control"
                                           value={weekdays} onChange={changeWeekdaysHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Bắt đầu: </label>
                                    <input placeholder="từ 1 đến 7" name="startAt" className="form-control"
                                           value={startAt} onChange={changeStartAtHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Kết thúc: </label>
                                    <input placeholder="từ 1 đến 7" name="endAt" className="form-control"
                                           value={endAt} onChange={changeScheduleHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Mã phòng: </label>
                                    <input placeholder="phòng học số..." name="studyRoom" className="form-control"
                                           value={studyRoom} onChange={changeStudyRoomHandler}/>
                                </div>
                                <button className="btn btn-primary m-1" onClick={saveOrUpdateSchedule}>Lưu</button>
                                <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddSchedule