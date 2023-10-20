import axios from "axios";
import config from "../config";

const USER_API_BASE_URL = 'http://localhost:8080/api/user';
const USER_API_SERVICE_URL = 'http://localhost:8080/api/user/service';
const USER_API_PAYMENT_URL = 'http://localhost:8080/api/user/payment';

class UserService {

    getUser() { return axios.get(USER_API_BASE_URL + '/info', config); }
    getSemester() { return axios.get(USER_API_BASE_URL + '/semester', config); }
    getDetails(id) { return axios.get(USER_API_BASE_URL + '/semester/' + id + '/course', config); }

    getRequest() { return axios.get(USER_API_SERVICE_URL + '/my-request', config); }
    cancelRequest(id, request) { return axios.put(USER_API_SERVICE_URL + '/cancel/' + id, request, config); }

    getPaymentStatus() { return axios.get(USER_API_PAYMENT_URL + '/payment-status', config); }
    getPaymentInfo(id) { return axios.get(USER_API_PAYMENT_URL + '/get/' + id, config); }
    verifyPayment(id) { return axios.get(USER_API_PAYMENT_URL + '/verify/' + id, config); }
    createPayment(payment, id) { return axios.post(USER_API_PAYMENT_URL + '/create-payment/' + id, payment, config); }
}

export default new UserService()