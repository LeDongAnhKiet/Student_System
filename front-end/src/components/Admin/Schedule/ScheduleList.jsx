import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import {useNavigate, useParams} from "react-router-dom";
import ScheduleService from "../../../services/Admin/ScheduleService";

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);
    const nav = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        ScheduleService.getSchedule().then((res) => {
            setSchedules(res.data);
        })
    }, [id]);

    const addSchedule = () => { nav('/admin/schedule-info/add'); }

    const deleteSchedule = (id) => {
        ScheduleService.deleteSchedule(id).then(() => {
            setSchedules(schedules.filter(schedule => schedule.id !== id));
        })
    }

    const updateSchedule = (id) => { nav(`/admin/schedule-info/update/${id}`); }


    return (
        <div>
            <Container fluid>
                <h3 className ="App">Thời khóa biểu</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Thứ</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>Phòng học</th>
                        </tr></thead>
                        <tbody>
                        { schedules.map( schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.weekdays}</td>
                                <td>{schedule.startAt}</td>
                                <td>{schedule.endAt}</td>
                                <td>{schedule.studyRoom.studyRoomName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
}
export default ScheduleList;