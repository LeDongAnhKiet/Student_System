package com.hd.student.controller.moderator;


import com.hd.student.payload.request.ServiceCateRequest;
import com.hd.student.payload.response.OnlineServiceResponse;
import com.hd.student.service.IOnlineService;
import com.hd.student.service.PaymentService;
import com.hd.student.service.ServiceCateService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@Tag(name = "06. Quản lý yêu cầu dịch vụ", description = "Quản lý yêu cầu dịch vụ cho mod")
@RequestMapping("/api/moderator/")
public class ModeratorServiceController {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IOnlineService onlineService;
    @Autowired
    private ServiceCateService serviceCateService;
    @Autowired
    private PaymentService paymentService;


    @GetMapping("/get-request")
    public ResponseEntity<?> getRequest() {
        List<OnlineServiceResponse> rp = this.onlineService.findAll();
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @GetMapping("/get-request/{cateId}")
    public ResponseEntity<?> getRequest(@PathVariable int cateId) {
        List<OnlineServiceResponse> rp = this.onlineService.findByCateId(cateId);
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @PutMapping("/service/{id}/accept")
    public ResponseEntity<?> acceptTheRequest(@PathVariable int id) {
        return new ResponseEntity<>(this.onlineService.acceptService(id), HttpStatus.OK);
    }


    @DeleteMapping("/service/delete/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable int id) {
        return new ResponseEntity<>(this.onlineService.deleteRequest(id), HttpStatus.OK);
    }

    @GetMapping("/service/search")
    public ResponseEntity<?> searchRequest(@DateTimeFormat(pattern = "dd/MM/yyyy") @RequestParam(value = "fromDate", required = false) LocalDate fromDate,
                                           @DateTimeFormat(pattern = "dd/MM/yyyy") @RequestParam(value = "toDate", required = false) LocalDate toDate) {
        return new ResponseEntity<>(this.onlineService.searchRequest(fromDate, toDate), HttpStatus.OK);
    }

    @PutMapping("/service-cate/update/{id}")
    public ResponseEntity<?> updateService(@PathVariable int id, @Valid @RequestBody ServiceCateRequest rq) {
        return new ResponseEntity<>(this.serviceCateService.updateService(rq, id), HttpStatus.OK);
    }

    @PutMapping("/service-cate/change/{id}")
    public ResponseEntity<?> setAvailable(@PathVariable int id) {
        return new ResponseEntity<>(this.serviceCateService.changeAvailableService(id), HttpStatus.OK);
    }

}
