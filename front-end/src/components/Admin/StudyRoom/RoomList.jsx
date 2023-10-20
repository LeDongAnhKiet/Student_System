import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import ScheduleService from "../../../services/Admin/ScheduleService";
import {useNavigate} from "react-router-dom";

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        ScheduleService.getRoom().then((res) => {
            setRooms(res.data);
        });
    }, []);

    const addRoom = () => { nav('/admin/room/add'); }

    const deleteRoom = (id) => {
        ScheduleService.deleteRoom(id).then(() => {
            setRooms(rooms.filter(room => room.id !== id));
        })
    }

    const updateRoom = (id) => { nav(`/admin/room/update/${id}`); }

    return (
        <div>
            <Container fluid>
                <h3 className ="App">Danh sách các phòng học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Phòng học</th>
                            <th>Tình trạng</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { rooms.map( room => (
                            <tr key={room.id}>
                                <td>{room.studyRoomName}</td>
                                <td>{room.isAvailable ? 'Còn trống' : 'Đã đầy'}</td>
                                <td className="btn-group">
                                    <button className="btn-success btn m-1"
                                            onClick={() => {updateRoom(room.id)}}>Chỉnh sửa
                                    </button>
                                    <button className="btn-success btn m-1"
                                            onClick={() => {deleteRoom(room.id)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addRoom}>Thêm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default RoomList;