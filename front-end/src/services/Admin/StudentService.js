import axios from "axios";

const STUDENT_API_ADMIN_URL = 'http://localhost:8080/admin/student';
const DEPARTMENT_API_ADMIN_URL = 'http://localhost:8080/admin/department';

class StudentService {
    getStudent() { return axios.get(STUDENT_API_ADMIN_URL); }
    getStudentByCourseId(id) { return axios.get(STUDENT_API_ADMIN_URL + '/' + id); }

    getDepartment() { return axios.get(DEPARTMENT_API_ADMIN_URL); }
    getDepartmentById(id) { return axios.get(DEPARTMENT_API_ADMIN_URL + '/' + id); }
}

export default new StudentService()