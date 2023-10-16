import axios from "axios";
import config from "../config";

const TRANSCRIPT_API_BASE_URL = 'http://localhost:8080/api/user/service/transcript';

class TranscriptService {
    getTranscript(transcriptId) { return axios.get(TRANSCRIPT_API_BASE_URL + '/' + transcriptId, config); }
    addTranscript(transcript) { return axios.post(TRANSCRIPT_API_BASE_URL + '/add', transcript, config); }
    updateTranscript(transcript, transcriptId) { return axios.put(TRANSCRIPT_API_BASE_URL + '/update/' + transcriptId, transcript, config); }
}

export default new TranscriptService()