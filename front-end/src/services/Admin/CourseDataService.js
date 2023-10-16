import axios from "axios";
import config from "../config";

const COURSE_API_ADMIN_URL = 'http://localhost:8080/api/admin/course-data';

class CourseService {
    getCourse() { return axios.get(COURSE_API_ADMIN_URL + '/getAll'); }
    removeCourse(id) { return axios.get(COURSE_API_ADMIN_URL + '/remove-schedule' + id, config); }
    addCourse(course) { return axios.post(COURSE_API_ADMIN_URL + '/add', course, config); }
    updateCourse(course, id) { return axios.put(COURSE_API_ADMIN_URL + '/update/' + id, course, config); }
    deleteCourse(id) { return axios.delete(COURSE_API_ADMIN_URL + '/delete/' + id, config); }
}

export default new CourseService()