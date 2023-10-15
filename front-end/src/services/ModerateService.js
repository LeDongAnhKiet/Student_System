import axios from "axios";
import config from "./config";

const CATE_API_MODERATOR_URL = 'http://localhost:8080/api/moderator';

class ModerateService {
    addCate(ServiceCate) { return axios.post(CATE_API_MODERATOR_URL + '/service-cate/add', ServiceCate, config) }
    updateCate(ServiceCate, id) { return axios.put(CATE_API_MODERATOR_URL + '/service-cate/update/' + id, ServiceCate, config) }
    changeCate(id) { return axios.put(CATE_API_MODERATOR_URL + '/service-cate/change/' + id, config) }

    getRequest() { return axios.get(CATE_API_MODERATOR_URL + '/get-request', config) }
    getRequestById(id) { return axios.get(CATE_API_MODERATOR_URL + '/get-request/' + id, config) }
    acceptRequest(id) { return axios.put(CATE_API_MODERATOR_URL + '/service/' + id + '/accept', config) }
    deleteRequest(id) { return axios.delete(CATE_API_MODERATOR_URL + '/service/delete/' + id, config) }
    searchRequest() { return axios.get(CATE_API_MODERATOR_URL + '/service/search', config) }
}
export default new ModerateService()