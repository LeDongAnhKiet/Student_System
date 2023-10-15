package com.hd.student.service.impl;

import com.hd.student.entity.OnlineService;
import com.hd.student.entity.ServiceCate;
import com.hd.student.entity.enums.ServiceStatus;
import com.hd.student.entity.Transcript;
import com.hd.student.exception.ResourceExistException;
import com.hd.student.exception.ResourceNotFoundException;
import com.hd.student.payload.response.ApiResponse;
import com.hd.student.payload.request.TranscriptRequest;
import com.hd.student.payload.response.TranscriptResponse;
import com.hd.student.repository.*;
import com.hd.student.service.IOnlineService;
import com.hd.student.service.TranscriptService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class TranscriptServiceImpl implements TranscriptService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IOnlineService onlineService;
    @Autowired
    private TranscriptRepository transcriptRepository;
    @Autowired
    private SemesterRepository semesterRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ServiceCateRepository serviceCateRepository;


    @Override
    @Transactional
    public TranscriptResponse addNewTranscript(TranscriptRequest rq, int userId) {
        try {
            ServiceCate serviceCate = this.serviceCateRepository.findById(1).orElseThrow(
                    ()->new ResourceNotFoundException("Không tìm thấy loại dịch vụ")
            );
            Transcript tr = new Transcript();

            tr.setContactPhone(rq.getContactPhone());
            tr.setLanguage(rq.getLanguage());
            tr.setFromSemester(semesterRepository.findById(rq.getFromSemester()).orElseThrow(()
                    -> new ResourceNotFoundException("Không tìm thấy học kỳ")));
            tr.setToSemester(semesterRepository.findById(rq.getToSemester()).orElseThrow(()
                    -> new ResourceNotFoundException("Không tìm thấy học kỳ")));
            tr.setQuantity(rq.getQuantity());
            tr.setIsSealed(rq.getIsSealed());

            OnlineService onlineService = this.onlineService.addOnlineService(userId, 1,
                    serviceCate.getPrice()*tr.getQuantity());


            tr.setOnlineService(onlineService);
            return modelMapper.map(this.transcriptRepository.save(tr), TranscriptResponse.class);
        }catch (RuntimeException ex){
            throw new RuntimeException("Lỗi server");
        }
    }

    @Override
    public TranscriptResponse findByOnlineServiceId(int id, int userId) {
        OnlineService on = this.onlineService.findByIdWithAccess(id, userId);

        Transcript tr = on.getTranscript();
        if(tr == null)
            throw new ResourceNotFoundException("Không tìm thấy yêu cầu của bạn");
        return modelMapper.map(tr, TranscriptResponse.class);
    }

    @Override
    public TranscriptResponse updateMyTranscript(TranscriptRequest rq, int id, int userId){
        Transcript tr = this.transcriptRepository.findById(id).orElseThrow(()
                ->new ResourceNotFoundException("Không tìm thấy yêu cầu cấp bảng điểm"));
        OnlineService on = tr.getOnlineService();
        if (on.getStatus() == ServiceStatus.PENDING) {
            if (onlineService.checkAccess(on.getId(), userId)) {
                modelMapper.typeMap(TranscriptRequest.class, Transcript.class)
                        .addMapping(TranscriptRequest::getFromSemester, Transcript::setFromSemester);
                modelMapper.typeMap(TranscriptRequest.class, Transcript.class)
                        .addMapping(TranscriptRequest::getToSemester, Transcript::setToSemester);
                tr = modelMapper.map(rq, Transcript.class);
                tr.setId(id);

                on.setPrice(rq.getQuantity() * on.getServiceCate().getPrice());
                tr.setOnlineService(on);
                tr.setFromSemester(semesterRepository.findById(rq.getFromSemester()).orElseThrow(()
                        -> new ResourceNotFoundException("Không tìm thấy học kỳ")));
                tr.setToSemester(semesterRepository.findById(rq.getToSemester()).orElseThrow(()
                        -> new ResourceNotFoundException("Không tìm thấy học kỳ")));

                this.transcriptRepository.save(tr);

                return modelMapper.map(this.transcriptRepository.save(tr), TranscriptResponse.class);
            }
            else
                throw new AccessDeniedException("Bạn không có quyền làm điều này");
        }
        else throw new ResourceExistException("Yêu cầu đã xác nhận hoặc hủy bỏ");

    }

}
