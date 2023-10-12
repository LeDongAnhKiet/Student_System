import axios from "axios";

const SEMESTER_API_ADMIN_URL = 'http://localhost:8080/admin/semester';

class SemesterService {
    getSemester() { return axios.get(SEMESTER_API_ADMIN_URL + '/getAll'); }
    getAvailableSemester() { return axios.get(SEMESTER_API_ADMIN_URL + '/getavailable'); }
    getSemesterById(id) { return axios.get(SEMESTER_API_ADMIN_URL + '/get/' + id); }
    setFinish(id) { return axios.get(SEMESTER_API_ADMIN_URL + '/setFinish/' + id); }
    addSemester(semester) { return axios.get(SEMESTER_API_ADMIN_URL + '/add', semester); }
    updateSemester(semester, id) { return axios.get(SEMESTER_API_ADMIN_URL + '/update/' + id, semester); }
    deleteSemester(id) { return axios.get(SEMESTER_API_ADMIN_URL + '/delete/' + id); }
    addSemesterUser(semester) { return axios.get(SEMESTER_API_ADMIN_URL + '-user', semester); }
    addSemesterDetail(semester) { return axios.get(SEMESTER_API_ADMIN_URL + '-detail', semester); }
}

export default new SemesterService()