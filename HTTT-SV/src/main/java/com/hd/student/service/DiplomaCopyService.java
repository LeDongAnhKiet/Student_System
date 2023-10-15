package com.hd.student.service;

import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.request.DiplomaCopyRequest;
import com.hd.student.payload.response.DiplomaCopyResponse;

public interface DiplomaCopyService {
    DiplomaCopyResponse addNewDiplomaCopy(DiplomaCopyRequest rq,int userId);

    DiplomaCopyResponse findByOnlineServiceId(int id, int userId);

    DiplomaCopyResponse updateMyDiplomaCopy(DiplomaCopyRequest rq,int id, int userId);
}
