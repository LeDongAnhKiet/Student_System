import axios from "axios";
import config from "../config";

const STUD_CERTIFICATE_API_BASE_URL = 'http://localhost:8080/api/user/service/stud-certification';

class StudCertificateService {
    getStudCertificate(serviceId) { return axios.get(STUD_CERTIFICATE_API_BASE_URL + '/' + serviceId, config); }
    addStudCertificate(studCertificate) { return axios.post(STUD_CERTIFICATE_API_BASE_URL + '/add', studCertificate, config); }
    updateStudCertificate(studCertificate, studCertificateId) { return axios.put(STUD_CERTIFICATE_API_BASE_URL + '/update/' + studCertificateId, studCertificate, config); }
}

export default new StudCertificateService()