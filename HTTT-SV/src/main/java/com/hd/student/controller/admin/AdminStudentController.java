package com.hd.student.controller.admin;

import com.hd.student.payload.response.DepartmentResponse;
import com.hd.student.payload.response.UserInfoResponse;
import com.hd.student.service.DepartmentService;
import com.hd.student.service.MajorService;
import com.hd.student.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminStudentController {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private MajorService majorService;
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/student")
    public ResponseEntity<?> getAllUser(){
        List<UserInfoResponse> rp = this.userService.findAll(0);
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @GetMapping("/student/{majorId}")
    public ResponseEntity<?> getAllUserByMajor(@PathVariable(required = false) int majorId){
        List<UserInfoResponse> rp = this.userService.findAll(majorId);
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @GetMapping("/department")
    public ResponseEntity<?> getAllDepartment(){
        List<DepartmentResponse> rp = this.departmentService.findAllDepartment();
        return new ResponseEntity<>(rp, HttpStatus.OK);
    }

    @GetMapping("/department/{id}")
    public ResponseEntity<?> getAllDepartmentById(@PathVariable int id){
        return new ResponseEntity<>(this.departmentService.findDepartmentById(id), HttpStatus.OK);
    }


}
