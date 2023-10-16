import axios from "axios";
import config from "../config";

const SEMESTER_API_ADMIN_URL = 'http://localhost:8080/api/admin/semester';

class SemesterService {
    getAvailableSemester() { return axios.get(SEMESTER_API_ADMIN_URL + '/getavailable'); }
    getSemesterById(id) { return axios.get(SEMESTER_API_ADMIN_URL + '/get/' + id); }
    setFinish(id, semester) { return axios.put(SEMESTER_API_ADMIN_URL + '/setFinish/' + id, semester, config); }
    addSemester(semester) { return axios.post(SEMESTER_API_ADMIN_URL + '/add', semester, config); }
    updateSemester(semester, id) { return axios.put(SEMESTER_API_ADMIN_URL + '/update/' + id, semester, config); }
    deleteSemester(id) { return axios.delete(SEMESTER_API_ADMIN_URL + '/delete/' + id, config); }
    addSemesterUser(semester) { return axios.put(SEMESTER_API_ADMIN_URL + '-user', semester, config); }
    addSemesterDetail(semester) { return axios.post(SEMESTER_API_ADMIN_URL + '-detail', semester, config); }
}

export default new SemesterService()