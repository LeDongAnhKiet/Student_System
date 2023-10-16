package com.hd.student.service.impl;

import com.hd.student.entity.DiplomaCopy;
import com.hd.student.entity.OnlineService;
import com.hd.student.entity.ServiceCate;
import com.hd.student.entity.enums.ServiceStatus;
import com.hd.student.exception.AccessDeniedException;
import com.hd.student.exception.ResourceExistException;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.request.DiplomaCopyRequest;
import com.hd.student.payload.response.DiplomaCopyResponse;
import com.hd.student.repository.DiplomaCopyRepository;
import com.hd.student.repository.ServiceCateRepository;
import com.hd.student.service.DiplomaCopyService;
import com.hd.student.service.IOnlineService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class DiplomaCopyServiceImpl implements DiplomaCopyService {

    @Autowired
    private DiplomaCopyRepository diplomaCopyRepository;
    @Autowired
    private IOnlineService onlineService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ServiceCateRepository serviceCateRepository;


    @Override
    @Transactional
    public DiplomaCopyResponse addNewDiplomaCopy(DiplomaCopyRequest rq, int userId) {

        try {
            ServiceCate serviceCate = this.serviceCateRepository.findById(3).orElseThrow(
                    ()->new ResourceNotFoundException("Không tìm thấy loại dịch vụ hoặc dịch vụ tạm " +
                            "thời không hoạt động")
            );
            DiplomaCopy copy = modelMapper.map(rq, DiplomaCopy.class);
            OnlineService onlineService = this.onlineService.addOnlineService(userId,
                    3, serviceCate.getPrice()* copy.getCopy());

            copy.setOnlineService(onlineService);

            return modelMapper.map(this.diplomaCopyRepository.save(copy), DiplomaCopyResponse.class);
        }catch (RuntimeException ex){
            throw new RuntimeException("Lỗi server");
        }
    }

    @Override
    public DiplomaCopyResponse findByOnlineServiceId(int id, int userId) {
        OnlineService on = this.onlineService.findByIdWithAccess(id, userId);

        DiplomaCopy dp = on.getDiplomaCopy();
        if(dp == null)
            throw new ResourceNotFoundException("Không tìm thấy yêu cầu của bạn");
        return modelMapper.map(dp, DiplomaCopyResponse.class);
    }

    @Override
    public DiplomaCopyResponse updateMyDiplomaCopy(DiplomaCopyRequest rq,int id, int userId) {
        DiplomaCopy copy = this.diplomaCopyRepository.findById(id).orElseThrow(
                ()->new ResourceNotFoundException("Không tìm thấy yêu cầu"));
        OnlineService on = copy.getOnlineService();
        if(on.getStatus() == ServiceStatus.PENDING) {
            if (this.onlineService.checkAccess(on.getId(), userId)) {
                copy = modelMapper.map(rq, DiplomaCopy.class);
                on.setPrice(on.getServiceCate().getPrice()* copy.getCopy());

                copy.setId(id);
                copy.setOnlineService(on);
                return modelMapper.map(this.diplomaCopyRepository.save(copy), DiplomaCopyResponse.class);
            }
            else
                throw new AccessDeniedException("Bạn không có quyền truy cập tài nguyên này");
        }
        else
            throw new ResourceExistException("Yêu cầu đã xác nhận hoặc hủy bỏ");
    }
}
