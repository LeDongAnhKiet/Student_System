import axios from "axios";
import config from "../config";

const HOME_API_BASE_URL = 'http://localhost:8080/api/guest';

class HomeService {
    getCate() { return axios.get(HOME_API_BASE_URL + '/service-cate/get', config); }
    getCateById(id) { return axios.get(HOME_API_BASE_URL + '/service-cate/get/' + id, config); }
    getSemester() { return axios.get(HOME_API_BASE_URL + '/semester/getall', config); }
}

export default new HomeService()