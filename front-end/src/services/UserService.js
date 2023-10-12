import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/api/user';

class UserService {
    getUser() { return axios.get(USER_API_BASE_URL + '/info'); }
    getSemester() { return axios.get(USER_API_BASE_URL + '/semester'); }
    getCourse(id) { return axios.get(USER_API_BASE_URL + '/semester/' + id + '/course'); }
}

export default new UserService()