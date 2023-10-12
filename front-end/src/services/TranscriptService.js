import axios from "axios";

const TRANSCRIPT_API_BASE_URL = 'http://localhost:8080/api/user/service/transcript/{serviceId}';

class TranscriptService {
    getTranscript(transcriptId) { return axios.get(TRANSCRIPT_API_BASE_URL + '/' + transcriptId); }
    addTranscript(transcript) { return axios.post(TRANSCRIPT_API_BASE_URL + '/add/', transcript); }
    updateTranscript(transcript, transcriptId) { return axios.get(TRANSCRIPT_API_BASE_URL + '/update/' + transcriptId, transcript); }
}

export default new TranscriptService()