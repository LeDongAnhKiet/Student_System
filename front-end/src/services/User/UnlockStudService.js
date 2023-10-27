import axios from "axios";
import config from "../config";

const UNLOCK_STUD_API_BASE_URL = 'http://localhost:8080/api/user/service/unlock';

class UnlockStudService {
    getUnlockStud(serviceId) { return axios.get(UNLOCK_STUD_API_BASE_URL + '-student/' + serviceId, config); }
    addUnlockStud(unlockStud) { return axios.post(UNLOCK_STUD_API_BASE_URL + '-student/add', unlockStud, config); }
    updateUnlockStud(unlockStud, unlockStudId) { return axios.put(UNLOCK_STUD_API_BASE_URL + '/update/' + unlockStudId, unlockStud, config); }
}

export default new UnlockStudService()