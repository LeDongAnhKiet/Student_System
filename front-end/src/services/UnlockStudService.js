import axios from "axios";

const UNLOCK_STUD_API_BASE_URL = 'http://localhost:8080/api/user/service/unlock-stud';

class UnlockStudService {
    getUnlockStud(unlockStudId) { return axios.get(UNLOCK_STUD_API_BASE_URL + '/' + unlockStudId); }
    addUnlockStud(unlockStud) { return axios.post(UNLOCK_STUD_API_BASE_URL + '/add', unlockStud); }
    updateUnlockStud(unlockStud, unlockStudId) { return axios.put(UNLOCK_STUD_API_BASE_URL + '/update/' + unlockStudId, unlockStud); }
}

export default new UnlockStudService()