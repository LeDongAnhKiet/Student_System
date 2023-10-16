package com.hd.student.service.impl;


import com.hd.student.entity.*;
import com.hd.student.entity.enums.PaymentStatus;
import com.hd.student.entity.enums.Role;
import com.hd.student.entity.enums.ServiceStatus;
import com.hd.student.exception.AccessDeniedException;
import com.hd.student.exception.BadRequestException;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.response.OnlineServiceResponse;
import com.hd.student.repository.*;
import com.hd.student.service.EmailService;
import com.hd.student.service.IOnlineService;
import com.twilio.twiml.voice.Pay;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OnlineServiceImpl implements IOnlineService {
    @Autowired
    private ServiceCateRepository serviceCateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OnlineServiceRepository onlineServiceRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TranscriptRepository transcriptRepository;
    @Autowired
    private StudCertificationRepository studCertificationRepository;
    @Autowired
    private UnlockStudentRepository unlockStudentRepository;
    @Autowired
    private DiplomaCopyRepository diplomaCopyRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PaymentRepository paymentRepository;


    @Override
    public OnlineService addOnlineService(int userId, int serviceCate, double price){
        User user = this.userRepository.findById(userId).orElseThrow(()
                -> new ResourceNotFoundException("Không tìm thấy user đang đăng nhập"));
        ServiceCate sc = this.serviceCateRepository.findById(serviceCate).orElseThrow(()
                -> new ResourceNotFoundException("Không tìm thấy dịch vụ"));

        if(sc.getIsAvailable()) {
            OnlineService onlineService = new OnlineService();
            onlineService.setPrice(price);
            onlineService.setUser(user);
            onlineService.setStatus(ServiceStatus.PENDING);
            onlineService.setCreatedDate(LocalDate.now());
            onlineService.setIsShipped(false);
            onlineService.setServiceCate(sc);
            this.onlineServiceRepository.save(onlineService);
            return onlineService;
        }
        else throw new BadRequestException("Dịch vụ hiện tại đang khóa");
    }

    @Override
    public boolean checkAccess(int id, int userId){
        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy dịch vụ"));
        if(on.getUser().getId() != userId)
            throw new AccessDeniedException("Bạn không có quyền làm điều này");

        return true;
    }
    @Override
    public List<OnlineServiceResponse> findAllByUserId(Integer userId) {
        List<OnlineService> services = onlineServiceRepository.findAllByUserId(userId);
        modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
        Converter<ServiceStatus, String> enumConverter =
                ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
        modelMapper.addConverter(enumConverter);
        List<OnlineServiceResponse> rp = new ArrayList<>();
        for (OnlineService service : services) {
            OnlineServiceResponse map = modelMapper.map(service, OnlineServiceResponse.class);
            rp.add(map);
        }
        return rp;
    }

    @Override
    public OnlineService findByIdWithAccess(int id, int userId) {
        User user = this.userRepository.findById(userId).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy user đang đăng nhập"));

        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu"));
        if (!(on.getUser().getId() == userId || user.getUserRole() == Role.MODERATOR)) {
            throw new AccessDeniedException("Bạn không có quyền truy cập tài nguyên này");
        }
        return on;
    }

    @Override
    public List<OnlineServiceResponse> findAll(){
        List<OnlineService> services = this.onlineServiceRepository.findAll();
        modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
        Converter<ServiceStatus, String> enumConverter =
                ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
        modelMapper.addConverter(enumConverter);

        List<OnlineServiceResponse> rp = new ArrayList<>();
        for (OnlineService service : services) {
            OnlineServiceResponse map = modelMapper.map(service, OnlineServiceResponse.class);
            rp.add(map);
        }
        return rp;
    }

    @Override
    public List<OnlineServiceResponse> findByCateId(int cateId) {
        modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
        Converter<ServiceStatus, String> enumConverter =
                ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
        modelMapper.addConverter(enumConverter);

        List<OnlineService> services = onlineServiceRepository.findByServiceCate_Id(cateId);

        List<OnlineServiceResponse> rp = new ArrayList<>();
        for (OnlineService service : services) {
            OnlineServiceResponse map = modelMapper.map(service, OnlineServiceResponse.class);
            rp.add(map);
        }
        return rp;
    }

    @Override
    public OnlineServiceResponse acceptService(int id){
        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu")
        );
        if(on.getStatus().equals(ServiceStatus.ACCEPT))
            return modelMapper.map(on, OnlineServiceResponse.class);
        Payment payment = this.paymentRepository.findByServiceOnline_Id(id).orElseThrow(()->
                new ResourceNotFoundException("Bạn chưa thanh toán"));
        if(payment.getPaymentStatus().equals(PaymentStatus.PAID)) {
            on.setStatus(ServiceStatus.ACCEPT);
            this.onlineServiceRepository.save(on);
            modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                    -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
            Converter<ServiceStatus, String> enumConverter =
                    ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
            modelMapper.addConverter(enumConverter);
            this.emailService.sendNotifyAccept(on);
            return modelMapper.map(on, OnlineServiceResponse.class);
        }
        else throw new BadRequestException("Bạn cần thực hiện thanh toán");
    }

    @Override
    public OnlineServiceResponse cancelService(int serviceId, int userId){
        OnlineService on = this.onlineServiceRepository.findById(serviceId).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu")
        );
        if(!on.getUser().getId().equals(userId)) {
            on.setStatus(ServiceStatus.CANCEL);
            this.onlineServiceRepository.save(on);
            modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                    -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
            Converter<ServiceStatus, String> enumConverter =
                    ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
            modelMapper.addConverter(enumConverter);
            return modelMapper.map(on, OnlineServiceResponse.class);
        }else throw new AccessDeniedException("Bạn không có quền làm dều này");
    }
    @Override
    public OnlineServiceResponse shippingService(int id){
        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu")
        );
        if(on.getStatus().equals(ServiceStatus.ACCEPT)) {
            on.setStatus(ServiceStatus.SHIPPING);
            this.onlineServiceRepository.save(on);
            modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                    -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
            Converter<ServiceStatus, String> enumConverter =
                    ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
            modelMapper.addConverter(enumConverter);
            return modelMapper.map(on, OnlineServiceResponse.class);
        }
        else throw new BadRequestException("Cần xem xét lại tình trạng thanh toán");
    }

    @Override
    public OnlineServiceResponse receivedService(int id){
        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu")
        );
        on.setStatus(ServiceStatus.RECEIVED);
        this.onlineServiceRepository.save(on);
        modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class)
                .addMapping(OnlineService -> OnlineService.getServiceCate().getServiceCateName(),
                        OnlineServiceResponse::setServiceCateName);
        Converter<ServiceStatus, String> enumConverter =
                ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
        modelMapper.addConverter(enumConverter);return modelMapper.map(on, OnlineServiceResponse.class);
    }

    @Override
    public ApiResponse deleteRequest(int id) {
        OnlineService on = this.onlineServiceRepository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Không tìm thấy yêu cầu")
        );
        if (!on.getStatus().equals(ServiceStatus.PENDING))
            throw new RuntimeException("Yêu cầu đã được xử lý hủy bỏ");
        try {
            switch (on.getServiceCate().getId()) {
                case 1:
                    Transcript tr = on.getTranscript();
                    this.transcriptRepository.delete(tr);
                    break;
                case 2:
                    StudCertification sc = on.getStudCertification();
                    this.studCertificationRepository.delete(sc);
                    break;
                case 3:
                    DiplomaCopy dc = on.getDiplomaCopy();
                    this.diplomaCopyRepository.delete(dc);
                    break;
                case 5:
                    UnlockStudent us = on.getUnlockStudent();
                    this.unlockStudentRepository.delete(us);
                default:
                    break;

            }

            this.onlineServiceRepository.delete(on);
            return new ApiResponse("Success", true);
        }
        catch (Exception ex) {
            return new ApiResponse(ex.getMessage(), false);
        }
    }

    @Override
    public List<OnlineServiceResponse> searchRequest(LocalDate fromDate, LocalDate toDate){
        List<OnlineService> ons = new ArrayList<>();
        if(toDate != null && fromDate != null){
            ons = this.onlineServiceRepository.findByCreatedDateBetween(fromDate, toDate);
        } else if(fromDate != null)
            ons = this.onlineServiceRepository.findByCreatedDateAfter(fromDate);
        else if (toDate != null) {
            ons = this.onlineServiceRepository.findByCreatedDateBefore(toDate);
        } else
            ons = this.onlineServiceRepository.findAll();

        modelMapper.typeMap(OnlineService.class, OnlineServiceResponse.class).addMapping(OnlineService
                -> OnlineService.getServiceCate().getServiceCateName(), OnlineServiceResponse::setServiceCateName);
        Converter<ServiceStatus, String> enumConverter =
                ctx -> ctx.getSource() == null ? null : ctx.getSource().name();
        modelMapper.addConverter(enumConverter);

        List<OnlineServiceResponse> rp = new ArrayList<>();
        for (OnlineService on : ons) {
            OnlineServiceResponse map = modelMapper.map(on, OnlineServiceResponse.class);
            rp.add(map);
        }
        return rp;
    }
}
