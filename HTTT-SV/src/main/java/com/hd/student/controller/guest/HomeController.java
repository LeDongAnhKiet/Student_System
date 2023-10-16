package com.hd.student.controller.guest;

import com.hd.student.payload.request.ServiceCateRequest;
import com.hd.student.service.PaymentService;
import com.hd.student.service.SemesterService;
import com.hd.student.service.ServiceCateService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RequestMapping("/api/guest/")
@RestController
@CrossOrigin
@Tag(name = "02. Home", description = "Home")
public class HomeController {




    @Autowired
    private ServiceCateService serviceCateService;
    @Autowired
    private SemesterService semesterService;
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/service-cate/get")
    public ResponseEntity<?> getAllServiceCate() {
        return new ResponseEntity<>(this.serviceCateService.getAllDV(), HttpStatus.OK);
    }
    @GetMapping("/service-cate/get/{id}")
    public ResponseEntity<?> getServiceCateById(@PathVariable int id) {
        return new ResponseEntity<>(this.serviceCateService.getServiceById(id), HttpStatus.OK);
    }

    @GetMapping("/semester/getall")
    public ResponseEntity<?> getSemester() {
        return ResponseEntity.ok().body(this.semesterService.getAll());
    }


}
