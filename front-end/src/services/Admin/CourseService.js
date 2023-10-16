import axios from "axios";
import config from "../config";

const COURSE_API_ADMIN_URL = 'http://localhost:8080/api/admin/course';
const LECTURE_API_ADMIN_URL = 'http://localhost:8080/api/admin/lecture';

class CourseService {
    getCourse() { return axios.get(COURSE_API_ADMIN_URL + '/getall'); }
    getCourseById(id) { return axios.get(COURSE_API_ADMIN_URL + '/' + id); }
    addCourse(course) { return axios.post(COURSE_API_ADMIN_URL + '/add', course, config); }
    updateCourse(course, id) { return axios.put(COURSE_API_ADMIN_URL + '/update/' + id, course, config); }
    deleteCourse(id) { return axios.delete(COURSE_API_ADMIN_URL + '/delete/' + id, config); }

    getLecture(id) { return axios.get(LECTURE_API_ADMIN_URL + '/getall', config); }
    addLecture(lecture) { return axios.post(LECTURE_API_ADMIN_URL + '/add', lecture, config); }
    updateLecture(lecture, id) { return axios.put(LECTURE_API_ADMIN_URL + '/update/' + id, lecture, config); }
    deleteLecture(id) { return axios.delete(LECTURE_API_ADMIN_URL + '/delete/' + id, config); }
}

export default new CourseService()