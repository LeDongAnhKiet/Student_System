package com.hd.student.service.impl;

import com.hd.student.entity.ServiceCate;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.request.ServiceCateRequest;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.response.ServiceCateResponse;
import com.hd.student.repository.ServiceCateRepository;
import com.hd.student.service.ServiceCateService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceCateServiceImpl implements ServiceCateService {

    @Autowired
    private ServiceCateRepository serviceCateRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<ServiceCateResponse> getAllDV() {
        List<ServiceCate> serviceCates = this.serviceCateRepository.findAll();
        return serviceCates.stream().map((element)
                -> modelMapper.map(element, ServiceCateResponse.class)).collect(Collectors.toList());
    }

    @Override
    public ServiceCateResponse getServiceById(int id){
        ServiceCate sc = this.serviceCateRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy loại dịch vụ"));
        return modelMapper.map(sc, ServiceCateResponse.class);
    }

    @Override
    public ApiResponse updateService(ServiceCateRequest rq, int id) {
//        ServiceCate sc = serviceCateRepository.findById(id).orElseThrow(
//                () -> new ResourceNotFoundException("Không tìm thấy dịch vụ", "id", id)
//        );
        if(this.serviceCateRepository.existsById(id)) {
            ServiceCate sc = modelMapper.map(rq, ServiceCate.class);
            sc.setId(id);
            this.serviceCateRepository.save(sc);
            return new ApiResponse("success", true);
        }
        else throw new ResourceNotFoundException("Không tìm thấy dịch vụ");
    }
    @Override
    public ApiResponse changeAvailableService(int id){
        ServiceCate sc = serviceCateRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy dịch vụ")
        );
        sc.setIsAvailable(!sc.getIsAvailable());
        this.serviceCateRepository.save(sc);

        return new ApiResponse("success", true);
    }
}
