import axios from "axios";

const CATE_API_MODERATOR_URL = 'http://localhost:8080/api/moderator';

class ModerateService {
    updateCate(ServiceCate, id) { return axios.put(CATE_API_MODERATOR_URL + '/service-cate/update/' + id, ServiceCate) }
    changeCate(id) { return axios.put(CATE_API_MODERATOR_URL + '/service-cate/change/' + id) }

    getRequest() { return axios.get(CATE_API_MODERATOR_URL + '/get-request') }
    getRequestById(id) { return axios.get(CATE_API_MODERATOR_URL + '/get-request/' + id) }
    acceptRequest(id) { return axios.put(CATE_API_MODERATOR_URL + '/service/' + id + '/accept') }
    deleteRequest(id) { return axios.delete(CATE_API_MODERATOR_URL + '/service/delete/' + id) }
    searchRequest() { return axios.get(CATE_API_MODERATOR_URL + '/service/search') }
}
export default new ModerateService()