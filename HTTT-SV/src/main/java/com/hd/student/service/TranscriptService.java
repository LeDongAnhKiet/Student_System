package com.hd.student.service;


import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.request.TranscriptRequest;
import com.hd.student.payload.response.TranscriptResponse;

public interface TranscriptService {
    TranscriptResponse addNewTranscript(TranscriptRequest rq, int userId);
    TranscriptResponse findByOnlineServiceId(int id, int userId);

    TranscriptResponse updateMyTranscript(TranscriptRequest rq, int id, int userId);
}
