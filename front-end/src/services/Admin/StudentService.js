import axios from "axios";
import config from "../config";

const STUDENT_API_ADMIN_URL = 'http://localhost:8080/api/admin/student';
const DEPARTMENT_API_ADMIN_URL = 'http://localhost:8080/api/admin/department';

class StudentService {
    getStudent() { return axios.get(STUDENT_API_ADMIN_URL, config); }
    getStudentByCourseId(id) { return axios.get(STUDENT_API_ADMIN_URL + '/' + id, config); }

    getDepartment() { return axios.get(DEPARTMENT_API_ADMIN_URL, config); }
    getDepartmentById(id) { return axios.get(DEPARTMENT_API_ADMIN_URL + '/' + id, config); }
}

export default new StudentService()