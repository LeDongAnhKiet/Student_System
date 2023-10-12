import axios from "axios";

const CATE_API_BASE_URL = 'http://localhost:8080/user/service-cate';
const CATE_API_MOD_URL = 'http://localhost:8080/mod/service-cate';

class CateService {
    getCate() { return axios.get(CATE_API_BASE_URL); }
    getCateById(id) { return axios.get(CATE_API_BASE_URL + '/' + id); }
    addCate(ServiceCate) {  return axios.get(CATE_API_MOD_URL + '/add', ServiceCate)}
    updateCate(ServiceCate, id) {  return axios.get(CATE_API_MOD_URL + '/update/' + id, ServiceCate)}
    changeCate(id) {  return axios.get(CATE_API_MOD_URL + '/change/' + id)}
}

export default new CateService()