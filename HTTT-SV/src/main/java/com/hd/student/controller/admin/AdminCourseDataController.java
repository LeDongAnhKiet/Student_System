package com.hd.student.controller.admin;

import com.hd.student.payload.request.CourseDataRequest;
import com.hd.student.service.CourseDataService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@Tag(name = "08. CourseData", description = "QL thong tin mon hoc")
@RequestMapping("/api/admin/")
public class AdminCourseDataController {

    @Autowired
    private CourseDataService courseDataService;

    @GetMapping("/course-data/getAll")
    public ResponseEntity<?> getAllCourse(@RequestParam(required = false) String search){
        return new ResponseEntity<>(this.courseDataService.getAll(search), HttpStatus.OK);
    }

    @PostMapping("/course-data/add")
    public ResponseEntity<?> addCourseData(@Valid @RequestBody CourseDataRequest rq){
        return new ResponseEntity<>(this.courseDataService.addNewCourseData(rq), HttpStatus.OK);
    }

    @PutMapping ("/course-data/update/{id}")
    public ResponseEntity<?> updateCourseData(@Valid @RequestBody CourseDataRequest rq, @PathVariable int id){
        return new ResponseEntity<>(this.courseDataService.updateCourseData(rq, id), HttpStatus.OK);
    }


    @DeleteMapping("/course-data/delete/{id}")
    public ResponseEntity<?> deleteCourseData(@PathVariable int id){
        return new ResponseEntity<>(this.courseDataService.deleteCourseData(id), HttpStatus.OK);
    }
}