import axios from "axios";

const ROOM_API_ADMIN_URL = 'http://localhost:8080/admin/room';
const SCHEDULE_API_ADMIN_URL = 'http://localhost:8080/admin/schedule-info';

class ScheduleService {
    getRoom() { return axios.get(ROOM_API_ADMIN_URL + '/get'); }
    addRoom(room) { return axios.get(ROOM_API_ADMIN_URL + '/add', room); }
    updateRoom(room, id) { return axios.get(ROOM_API_ADMIN_URL + '/update/' + id, room); }
    deleteRoom(id) { return axios.get(ROOM_API_ADMIN_URL + '/delete/' + id); }

    getSchedule() { return axios.get(SCHEDULE_API_ADMIN_URL + '/getall'); }
    addSchedule(schedule) { return axios.get(SCHEDULE_API_ADMIN_URL + '/add', schedule); }
    updateSchedule(schedule, id) { return axios.get(SCHEDULE_API_ADMIN_URL + '/update/' + id, schedule); }
    deleteSchedule(id) { return axios.get(SCHEDULE_API_ADMIN_URL + '/delete/' + id); }
}

export default new ScheduleService()