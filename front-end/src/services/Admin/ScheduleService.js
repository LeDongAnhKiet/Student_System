import axios from "axios";
import config from "../config";

const ROOM_API_ADMIN_URL = 'http://localhost:8080/api/admin/room';
const SCHEDULE_API_ADMIN_URL = 'http://localhost:8080/api/admin/schedule-info';

class ScheduleService {
    getRoom() { return axios.get(ROOM_API_ADMIN_URL + '/get', config); }
    addRoom(room) { return axios.post(ROOM_API_ADMIN_URL + '/add', room, config); }
    updateRoom(room, id) { return axios.put(ROOM_API_ADMIN_URL + '/update/' + id, room, config); }
    deleteRoom(id) { return axios.delete(ROOM_API_ADMIN_URL + '/delete/' + id, config); }

    getSchedule() { return axios.get(SCHEDULE_API_ADMIN_URL + '/getall', config); }
    addSchedule(schedule) { return axios.post(SCHEDULE_API_ADMIN_URL + '/add', schedule, config); }
    updateSchedule(schedule, id) { return axios.put(SCHEDULE_API_ADMIN_URL + '/update/' + id, schedule, config); }
    deleteSchedule(id) { return axios.delete(SCHEDULE_API_ADMIN_URL + '/delete/' + id, config); }
}

export default new ScheduleService()