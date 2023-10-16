package com.hd.student.service.impl;

import com.hd.student.entity.OnlineService;
import com.hd.student.entity.ServiceCate;
import com.hd.student.entity.UnlockStudent;
import com.hd.student.entity.enums.ServiceStatus;
import com.hd.student.exception.ResourceExistException;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.request.UnlockStudentRequest;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.response.UnlockStudentResponse;
import com.hd.student.repository.OnlineServiceRepository;
import com.hd.student.repository.ServiceCateRepository;
import com.hd.student.repository.UnlockStudentRepository;
import com.hd.student.service.IOnlineService;
import com.hd.student.service.UnlockStudentService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class UnlockStudentServiceImpl implements UnlockStudentService {

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private UnlockStudentRepository unlockStudentRepository;
    @Autowired
    private IOnlineService onlineService;
    @Autowired
    private ServiceCateRepository serviceCateRepository;
    @Autowired
    private OnlineServiceRepository onlineServiceRepository;


    @Override
    @Transactional
    public UnlockStudentResponse addNewUnlockStudent(UnlockStudentRequest rq, int userId) {
        try {
            ServiceCate serviceCate = this.serviceCateRepository.findById(5).orElseThrow(
                    ()->new ResourceNotFoundException("Không tìm thấy loại dịch vụ")
            );
            UnlockStudent us = modelMapper.map(rq, UnlockStudent.class);

            OnlineService onlineService = this.onlineService.addOnlineService(userId,5, serviceCate.getPrice());
            us.setOnlineService(onlineService);


            return modelMapper.map(this.unlockStudentRepository.save(us), UnlockStudentResponse.class);
        }catch (RuntimeException ex){
            throw new RuntimeException("Lỗi server");
        }
    }

    public UnlockStudentResponse findByOnlineServiceId(int id, int userId) {
        OnlineService on = this.onlineService.findByIdWithAccess(id, userId);

        UnlockStudent tr = on.getUnlockStudent();
        if(tr == null)
            throw new ResourceNotFoundException("Không tìm thấy yêu cầu của bạn");
        return modelMapper.map(tr, UnlockStudentResponse.class);
    }

    @Override
    public UnlockStudentResponse updateUnlockStudent(UnlockStudentRequest rq, int id, int userId) {
        UnlockStudent us = this.unlockStudentRepository.findById(id).orElseThrow(()
                ->new ResourceNotFoundException("Không tìm thấy yêu cầu cấp"));

        OnlineService on = us.getOnlineService();

        if (on.getStatus() == ServiceStatus.PENDING) {
            if (this.onlineService.checkAccess(on.getId(), userId)) {
                us = modelMapper.map(rq, UnlockStudent.class);
                on.setPrice(on.getServiceCate().getPrice());
                this.onlineServiceRepository.save(on);
                us.setId(id);
                us.setOnlineService(on);

                return modelMapper.map(this.unlockStudentRepository.save(us), UnlockStudentResponse.class);
            }
            else throw new AccessDeniedException("Bạn không có quyền làm điều này");
        }
        else throw new ResourceExistException("Yêu cầu đã xác nhận hoặc hủy bỏ");
    }
}
