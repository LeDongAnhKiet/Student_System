package com.hd.student.service;

import com.hd.student.entity.ServiceCate;
import com.hd.student.payload.request.ServiceCateRequest;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.response.ServiceCateResponse;

import java.util.List;

public interface ServiceCateService {
    List<ServiceCateResponse> getAllDV();

    ServiceCateResponse getServiceById(int id);
    ApiResponse updateService(ServiceCateRequest rq, int id);
    ApiResponse changeAvailableService(int id);
}
