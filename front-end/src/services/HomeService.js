import axios from "axios";

const HOME_API_BASE_URL = 'http://localhost:8080/api/guest';

class HomeService {
    getCate() { return axios.get(HOME_API_BASE_URL + '/service-cate/get'); }
    getCateById(id) { return axios.get(HOME_API_BASE_URL + '/service-cate/get/' + id); }
    getSemester() { return axios.get(HOME_API_BASE_URL + '/semester/getall'); }
}

export default new HomeService()