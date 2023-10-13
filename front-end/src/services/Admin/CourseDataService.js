import axios from "axios";

const COURSE_API_ADMIN_URL = 'http://localhost:8080/api/admin/course-data';

class CourseService {
    getCourse() { return axios.get(COURSE_API_ADMIN_URL + '/getAll'); }
    removeCourse(id) { return axios.get(COURSE_API_ADMIN_URL + '/remove-schedule' + id); }
    addCourse(course) { return axios.post(COURSE_API_ADMIN_URL + '/add', course); }
    updateCourse(course, id) { return axios.put(COURSE_API_ADMIN_URL + '/update/' + id, course); }
    deleteCourse(id) { return axios.delete(COURSE_API_ADMIN_URL + '/delete/' + id); }
}

export default new CourseService()