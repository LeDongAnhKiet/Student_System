import axios from "axios";
import config from "../config";

const DIPLOMA_API_BASE_URL = 'http://localhost:8080/api/user/service/diploma';

class DiplomaService {
    getDiploma(diplomaId) { return axios.get(DIPLOMA_API_BASE_URL + '/' + diplomaId, config); }
    addDiploma(diploma) { return axios.post(DIPLOMA_API_BASE_URL + '/add', diploma, config); }
    updateDiploma(diploma, diplomaId) { return axios.put(DIPLOMA_API_BASE_URL + '/update/' + diplomaId, diploma, config); }
}

export default new DiplomaService()