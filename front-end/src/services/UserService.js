import axios from "axios";

const USER_API_BASE_URL = 'http://localhost:8080/api/user';
const USER_API_SERVICE_URL = 'http://localhost:8080/api/user/service';
const USER_API_PAYMENT_URL = 'http://localhost:8080/api/user/payment';

class UserService {
    getUser() { return axios.get(USER_API_BASE_URL + '/info'); }
    getSemester() { return axios.get(USER_API_BASE_URL + '/semester'); }
    getCourse(id) { return axios.get(USER_API_BASE_URL + '/semester/' + id + '/course'); }

    getServiceRequest() { return axios.get(USER_API_SERVICE_URL + '/my-request'); }
    cancelMyRequest(id, request) { return axios.put(USER_API_SERVICE_URL + '/cancel/' + id, request); }
    cancelServiceRequest(serviceId, service) { return axios.put(USER_API_SERVICE_URL + '/cancel/' + serviceId, service); }

    getPaymentStatus() { return axios.get(USER_API_PAYMENT_URL + '/payment-status'); }
    getPaymentInfo(id) { return axios.get(USER_API_PAYMENT_URL + '/get/' + id); }
    verifyPayment(id) { return axios.get(USER_API_PAYMENT_URL + '/verify/' + id); }
    createPayment(payment, id) { return axios.post(USER_API_PAYMENT_URL + '/create-payment/' + id, payment); }
}

export default new UserService()